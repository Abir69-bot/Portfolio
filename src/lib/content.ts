import 'server-only'

import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

/** Everything the homepage renders, read live from Payload CMS (no hardcoded content). */
export const getHomeContent = cache(async () => {
  const payload = await getPayload({ config })
  const common = { depth: 0, limit: 200, sort: '_order', pagination: false } as const

  const [profile, skillCategories, capabilities, projects, research] = await Promise.all([
    payload.findGlobal({ slug: 'profile', depth: 0 }),
    payload.find({ collection: 'skill-categories', ...common }),
    payload.find({ collection: 'capabilities', ...common }),
    payload.find({ collection: 'projects', ...common }),
    payload.find({ collection: 'research', ...common }),
  ])

  return {
    profile,
    skillCategories: skillCategories.docs,
    capabilities: capabilities.docs,
    projects: projects.docs,
    research: research.docs,
  }
})

export type HomeContent = Awaited<ReturnType<typeof getHomeContent>>
