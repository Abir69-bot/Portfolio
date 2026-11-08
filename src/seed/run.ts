/** `npm run seed` (safe, create-missing only) or `npm run seed:force` (reset seeded items). */
process.env.SKIP_AUTO_SEED = '1'

import { getPayload } from 'payload'

import config from '../payload.config'
import { seed } from './seed'

const payload = await getPayload({ config })
const report = await seed(payload, { force: process.env.SEED_FORCE === '1' })
console.log(JSON.stringify(report, null, 2))
process.exit(0)
