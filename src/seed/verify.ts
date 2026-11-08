/**
 * `npm run verify:skills` — checks the CMS against the required Technical Skills list:
 * all 10 categories exist, every required skill is in the right category, none is missing.
 * Extra skills added later in the CMS are reported but not treated as failures.
 */
process.env.SKIP_AUTO_SEED = '1'

import { getPayload } from 'payload'

import config from '../payload.config'
import { SKILL_CATEGORIES } from './data'

const payload = await getPayload({ config })
const { docs } = await payload.find({
  collection: 'skill-categories',
  limit: 100,
  sort: '_order',
  depth: 0,
  overrideAccess: true,
})

const problems: string[] = []
const notes: string[] = []
const norm = (s: string) => s.trim().toLowerCase()

if (docs.length < 10) problems.push(`Expected 10 skill categories, found ${docs.length}`)

let required = 0
for (const expected of SKILL_CATEGORIES) {
  const cat = docs.find((d) => d.slug === expected.slug)
  if (!cat) {
    problems.push(`Missing category: ${expected.name}`)
    continue
  }
  if (cat.name !== expected.name) problems.push(`Category “${expected.slug}” is named “${cat.name}”, expected “${expected.name}”`)
  const names = (cat.skills ?? []).map((s) => norm(s.name))
  for (const skill of expected.skills) {
    required++
    if (!names.includes(norm(skill.name))) {
      const elsewhere = docs.find((d) => d.id !== cat.id && (d.skills ?? []).some((s) => norm(s.name) === norm(skill.name)))
      problems.push(
        elsewhere
          ? `“${skill.name}” is in “${elsewhere.name}” but belongs in “${expected.name}”`
          : `Missing skill “${skill.name}” in “${expected.name}”`,
      )
    }
  }
  const extras = (cat.skills ?? []).filter((s) => !expected.skills.some((e) => norm(e.name) === norm(s.name)))
  if (extras.length) notes.push(`${cat.name}: extra skills ${extras.map((s) => s.name).join(', ')}`)
}

console.log(`\nCategories in CMS (${docs.length}), in display order:`)
for (const d of docs) console.log(`  • ${d.name} — ${(d.skills ?? []).length} skills`)
console.log(`\nRequired skills checked: ${required}`)
if (notes.length) console.log(`\nNotes:\n  ${notes.join('\n  ')}`)
if (problems.length) {
  console.log(`\nFAIL — ${problems.length} problem(s):\n  ${problems.join('\n  ')}`)
  process.exit(1)
}
console.log('\nPASS — all 10 categories present and every required skill is in its correct category.')
process.exit(0)
