import type { GlobalConfig } from 'payload'

/**
 * Internal bookkeeping for the idempotent seeder: remembers which stable keys were already
 * seeded, so re-running the seed never overwrites edited content or resurrects deleted items.
 */
export const SeedState: GlobalConfig = {
  slug: 'seed-state',
  admin: { hidden: true },
  access: { read: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'seededKeys', type: 'json' },
    { name: 'lastSeededAt', type: 'date' },
  ],
}
