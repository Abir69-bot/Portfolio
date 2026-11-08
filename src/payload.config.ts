import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Capabilities } from './collections/Capabilities'
import { Media } from './collections/Media'
import { migrations } from './migrations'
import { Projects } from './collections/Projects'
import { Research } from './collections/Research'
import { SkillCategories } from './collections/SkillCategories'
import { Users } from './collections/Users'
import { Profile } from './globals/Profile'
import { SeedState } from './globals/SeedState'
import { hasUnseededItems, seed } from './seed/seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Faisal Mahmud Abir CMS' },
  },
  collections: [SkillCategories, Capabilities, Projects, Research, Media, Users],
  globals: [Profile, SeedState],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  // Local: a SQLite file. Hosted (Vercel): a Turso database (libsql://…) with its auth token.
  // Production applies the committed migrations on start-up, since schema push only runs in development.
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./portfolio.db',
      authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
    },
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [],
  // First boot on an empty database: seed the portfolio content once. Later boots add only items
  // that are new in data.ts. The seeder never overwrites edits or restores deleted items (see src/seed/seed.ts).
  onInit: async (payload) => {
    if (process.env.SKIP_AUTO_SEED === '1') return
    try {
      const { totalDocs } = await payload.count({ collection: 'skill-categories' })
      const state = await payload.findGlobal({ slug: 'seed-state', overrideAccess: true })
      const seededKeys = Array.isArray(state?.seededKeys) ? (state.seededKeys as string[]) : []
      const isEmpty = totalDocs === 0 && !state?.lastSeededAt
      if (isEmpty || (state?.lastSeededAt && hasUnseededItems(seededKeys))) await seed(payload)
    } catch (err) {
      payload.logger.warn({ err, msg: 'Auto-seed skipped' })
    }
  },
})
