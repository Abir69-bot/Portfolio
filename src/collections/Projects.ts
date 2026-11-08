import type { CollectionConfig } from 'payload'

import { slugField, stringList, techTags } from '../fields/shared'

/**
 * Engineering case studies. Every section except the summary is optional and only renders
 * when filled in — leave a field empty rather than writing something the project can't support.
 */
export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  orderable: true,
  defaultSort: '_order',
  admin: {
    group: 'Work',
    useAsTitle: 'title',
    defaultColumns: ['title', 'period', 'featured', 'updatedAt'],
    description: 'Drag to reorder. Fill in only the engineering details the project actually has.',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              type: 'row',
              fields: [
                { name: 'period', type: 'text', admin: { width: '50%', description: 'e.g. Aug 2026 – Sep 2026' } },
                { name: 'category', type: 'text', admin: { width: '50%', description: 'Short label, e.g. Computer Vision' } },
              ],
            },
            { name: 'tagline', type: 'text', required: true },
            { name: 'summary', type: 'textarea', required: true },
            techTags('stack', 'Tech stack'),
            {
              type: 'row',
              fields: [
                { name: 'githubUrl', label: 'GitHub URL', type: 'text', admin: { width: '50%' } },
                { name: 'demoUrl', label: 'Live demo URL', type: 'text', admin: { width: '50%' } },
              ],
            },
          ],
        },
        {
          label: 'Engineering',
          fields: [
            { name: 'problem', type: 'textarea' },
            { name: 'architecture', label: 'System architecture', type: 'textarea' },
            {
              name: 'components',
              label: 'Software components',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'detail', type: 'textarea' },
              ],
            },
            techTags('aiStack', 'AI / ML technologies'),
            { name: 'backend', label: 'Backend implementation', type: 'textarea' },
            techTags('integrations', 'APIs & integrations'),
            stringList('dataFlow', 'Data flow', 'One step per row, in order.'),
            { name: 'testing', label: 'Testing approach', type: 'textarea' },
            { name: 'deployment', type: 'textarea' },
            stringList('challenges', 'Technical challenges'),
            stringList('decisions', 'Engineering decisions'),
          ],
        },
      ],
    },
    slugField('title'),
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
