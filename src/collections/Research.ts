import type { CollectionConfig } from 'payload'

import { slugField, stringList, techTags } from '../fields/shared'

export const Research: CollectionConfig = {
  slug: 'research',
  labels: { singular: 'Research', plural: 'Research' },
  orderable: true,
  defaultSort: '_order',
  admin: {
    group: 'Work',
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'updatedAt'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'shortTitle', type: 'text', admin: { description: 'e.g. Distilling-Hate' } },
    slugField('title'),
    {
      type: 'row',
      fields: [
        { name: 'context', type: 'text', admin: { width: '50%', description: 'e.g. Undergraduate Capstone Thesis' } },
        { name: 'status', type: 'text', admin: { width: '50%', description: 'e.g. Manuscript under review at PLOS ONE' } },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    stringList('highlights', 'Highlights'),
    {
      name: 'metrics',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '35%' } },
            { name: 'label', type: 'text', required: true, admin: { width: '65%' } },
          ],
        },
      ],
    },
    techTags('stack', 'Tech stack'),
    { name: 'githubUrl', label: 'GitHub URL', type: 'text' },
  ],
}
