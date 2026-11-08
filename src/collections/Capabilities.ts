import type { CollectionConfig } from 'payload'

import { iconField, slugField, techTags } from '../fields/shared'

/** “What I Build” — presentation-level capability areas (not the 10 skill categories). */
export const Capabilities: CollectionConfig = {
  slug: 'capabilities',
  labels: { singular: 'Capability', plural: 'What I Build' },
  orderable: true,
  defaultSort: '_order',
  admin: {
    group: 'Homepage',
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    description: 'Cards in the “What I Build” section. Drag to reorder.',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    iconField(),
    { name: 'description', type: 'textarea', required: true },
    techTags(),
  ],
}
