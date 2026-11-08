/**
 * End-to-end check of the admin workflow against a running server (npm run dev / start):
 * logs in through the same REST API the admin UI uses, then creates, edits, reorders and
 * deletes skills and categories, confirming each change on the public homepage.
 * Everything it changes is restored, and the temporary admin user is removed.
 *
 *   npx cross-env BASE_URL=http://localhost:3000 payload run src/seed/e2e-admin.ts
 */
process.env.SKIP_AUTO_SEED = '1'

import { getPayload } from 'payload'

import config from '../payload.config'

const BASE = process.env.BASE_URL || 'http://localhost:3000'
const payload = await getPayload({ config })
const email = `e2e-${Date.now()}@example.test`
const password = `E2e!${Math.random().toString(36).slice(2)}`
const user = await payload.create({ collection: 'users', data: { email, password }, overrideAccess: true })

const results: [string, boolean][] = []
const check = (name: string, ok: boolean) => {
  results.push([name, ok])
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`)
}

let token = ''
const api = async (path: string, init: RequestInit = {}) => {
  const res = await fetch(`${BASE}/api${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `JWT ${token}` } : {}), ...init.headers },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${path} → ${res.status} ${JSON.stringify(body)}`)
  return body
}
const home = async () => (await fetch(`${BASE}/`, { cache: 'no-store' })).text()
const plain = (html: string) => html.replace(/<!-- -->/g, '').replace(/&amp;/g, '&')
/** Position of `s` inside the Technical Skills section only (the marquee repeats some names). */
const indexOfIn = (html: string, s: string) => {
  const text = plain(html)
  const start = text.indexOf('id="skills"')
  const end = text.indexOf('id="projects"')
  return text.slice(start, end).indexOf(s)
}

type Cat = { id: number; name: string; slug: string; _order: string; skills: { id: string; name: string; key?: string; icon?: string | null; featured?: boolean }[] }

let tempCategoryId: number | undefined
let original: Cat | undefined
try {
  token = (await api('/users/login', { method: 'POST', body: JSON.stringify({ email, password }) })).token
  check('Admin login via REST API', Boolean(token))

  const list = (await api('/skill-categories?sort=_order&limit=100&depth=0')).docs as Cat[]
  check('Admin API lists 10 skill categories', list.length === 10)
  original = list.find((c) => c.slug === 'testing-evaluation')!
  const originalSkills = original.skills.map(({ id, name, key, icon, featured }) => ({ id, name, key, icon, featured }))

  // 1. Create a skill
  const marker = `E2E Skill ${Date.now()}`
  await api(`/skill-categories/${original.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ skills: [...originalSkills, { name: marker, icon: 'lu:Zap', featured: false }] }),
  })
  check('Create skill → appears on public homepage', plain(await home()).includes(marker))

  // 2. Edit the skill
  const edited = `${marker} Edited`
  let current = (await api(`/skill-categories/${original.id}?depth=0`)) as Cat
  await api(`/skill-categories/${original.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ skills: current.skills.map((s) => (s.name === marker ? { ...s, name: edited } : s)) }),
  })
  check('Edit skill → new name on homepage', plain(await home()).includes(edited))

  // 3. Reorder skills within the category (move new skill to the top)
  current = (await api(`/skill-categories/${original.id}?depth=0`)) as Cat
  const moved = [current.skills.find((s) => s.name === edited)!, ...current.skills.filter((s) => s.name !== edited)]
  await api(`/skill-categories/${original.id}`, { method: 'PATCH', body: JSON.stringify({ skills: moved }) })
  let html = await home()
  check('Reorder skills → order reflected on homepage', indexOfIn(html, edited) < indexOfIn(html, 'Pytest'))

  // 4. Delete the skill
  await api(`/skill-categories/${original.id}`, { method: 'PATCH', body: JSON.stringify({ skills: originalSkills }) })
  check('Delete skill → removed from homepage', !plain(await home()).includes(edited))

  // 5. Create a category, reorder it to the top (admin drag-and-drop endpoint), delete it
  const catName = `E2E Category ${Date.now()}`
  const created = (await api('/skill-categories', {
    method: 'POST',
    body: JSON.stringify({ name: catName, description: 'temp', skills: [{ name: 'Temp Skill' }] }),
  })).doc as Cat
  tempCategoryId = created.id
  html = await home()
  check('Create category → appears on homepage', plain(html).includes(catName))
  check('New category is appended last', indexOfIn(html, catName) > indexOfIn(html, 'Testing & Evaluation'))

  const first = list[0]
  await api('/reorder', {
    method: 'POST',
    body: JSON.stringify({
      collectionSlug: 'skill-categories',
      docsToMove: [created.id],
      newKeyWillBe: 'less',
      orderableFieldName: '_order',
      target: { id: first.id, key: first._order },
    }),
  })
  html = await home()
  check('Reorder categories (drag-and-drop API) → moved first on homepage', indexOfIn(html, catName) < indexOfIn(html, first.name))

  await api(`/skill-categories/${created.id}`, { method: 'DELETE' })
  tempCategoryId = undefined
  check('Delete category → removed from homepage', !plain(await home()).includes(catName))

  // 6. Category name/description edits
  const desc = `E2E description ${Date.now()}`
  await api(`/skill-categories/${original.id}`, { method: 'PATCH', body: JSON.stringify({ description: desc }) })
  check('Edit category description → shown on homepage', plain(await home()).includes(desc))
  await api(`/skill-categories/${original.id}`, { method: 'PATCH', body: JSON.stringify({ description: (original as unknown as { description: string }).description }) })

  // 7. Public cannot write
  const anon = await fetch(`${BASE}/api/skill-categories/${original.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'hacked' }),
  })
  check('Anonymous write is rejected', anon.status === 403 || anon.status === 401)

  const after = (await api('/skill-categories?sort=_order&limit=100&depth=0')).docs as Cat[]
  check(
    'Original content restored',
    after.length === 10 && after.find((c) => c.id === original!.id)!.skills.map((s) => s.name).join() === originalSkills.map((s) => s.name).join(),
  )
} catch (err) {
  console.error(err)
  check('No unexpected errors', false)
} finally {
  if (tempCategoryId) await payload.delete({ collection: 'skill-categories', id: tempCategoryId, overrideAccess: true }).catch(() => {})
  await payload.delete({ collection: 'users', id: user.id, overrideAccess: true })
}

const failed = results.filter(([, ok]) => !ok).length
console.log(`\n${results.length - failed}/${results.length} checks passed`)
process.exit(failed ? 1 : 0)
