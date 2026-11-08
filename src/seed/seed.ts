import type { Payload } from 'payload'

import { CAPABILITIES, PROFILE, PROJECTS, RESEARCH, SKILL_CATEGORIES } from './data'
import { slugify } from '../lib/slugify'

type SeedOptions = { force?: boolean }
type SeedReport = { created: string[]; updated: string[]; skipped: string[] }
type SeedableCollection = 'skill-categories' | 'capabilities' | 'projects' | 'research'

/**
 * Idempotent, edit-safe seeder.
 *
 * Every item has a stable key (`<collection>:<slug>`). For each key:
 *  - already recorded in seed-state  → skipped (so edited content is never overwritten and
 *                                       items the owner deleted on purpose are not re-created)
 *  - a doc with that slug exists       → recorded and left untouched
 *  - otherwise                         → created
 *
 * `force: true` (npm run seed:force) is the explicit opt-in to reset seeded items back to the
 * values in data.ts. It updates matching docs in place (same ids) and never deletes anything.
 */
export async function seed(payload: Payload, { force = false }: SeedOptions = {}): Promise<SeedReport> {
  const report: SeedReport = { created: [], updated: [], skipped: [] }
  const state = await payload.findGlobal({ slug: 'seed-state', overrideAccess: true })
  const seeded = new Set<string>(Array.isArray(state?.seededKeys) ? (state.seededKeys as string[]) : [])

  const upsert = async (collection: SeedableCollection, slug: string, data: Record<string, unknown>) => {
    const key = `${collection}:${slug}`
    if (seeded.has(key) && !force) {
      report.skipped.push(key)
      return
    }
    const existing = await payload.find({
      collection,
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    })
    const doc = existing.docs[0]
    if (doc && force) {
      await payload.update({ collection, id: doc.id, data: data as never, overrideAccess: true })
      report.updated.push(key)
    } else if (doc) {
      report.skipped.push(key)
    } else {
      await payload.create({ collection, data: { ...data, slug } as never, overrideAccess: true })
      report.created.push(key)
    }
    seeded.add(key)
  }

  for (const category of SKILL_CATEGORIES) {
    await upsert('skill-categories', category.slug, {
      name: category.name,
      description: category.description,
      icon: category.icon,
      skills: category.skills.map((s) => ({
        name: s.name,
        key: slugify(s.name),
        icon: s.icon ?? null,
        featured: Boolean(s.featured),
      })),
    })
  }
  for (const { slug, ...rest } of CAPABILITIES) await upsert('capabilities', slug, rest)
  for (const { slug, ...rest } of PROJECTS) await upsert('projects', slug, rest)
  for (const { slug, ...rest } of RESEARCH) await upsert('research', slug, rest)

  const profileKey = 'global:profile'
  const profile = await payload.findGlobal({ slug: 'profile', overrideAccess: true })
  if (force || (!seeded.has(profileKey) && !profile?.name)) {
    await payload.updateGlobal({ slug: 'profile', data: PROFILE as never, overrideAccess: true })
    ;(profile?.name ? report.updated : report.created).push(profileKey)
  } else {
    report.skipped.push(profileKey)
  }
  seeded.add(profileKey)

  await payload.updateGlobal({
    slug: 'seed-state',
    data: { seededKeys: [...seeded], lastSeededAt: new Date().toISOString() },
    overrideAccess: true,
  })

  payload.logger.info(
    `Seed complete — created ${report.created.length}, updated ${report.updated.length}, skipped ${report.skipped.length}`,
  )
  return report
}
