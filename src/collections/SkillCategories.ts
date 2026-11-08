import type { CollectionConfig } from 'payload'
import { ValidationError } from 'payload'

import { iconField, slugField } from '../fields/shared'
import { slugify } from '../lib/slugify'

type SkillRow = { id?: string; name?: string; key?: string; icon?: string | null; featured?: boolean | null }

/**
 * Technical Skills & Technologies.
 *  - Categories are drag-reorderable in the list view (`orderable`).
 *  - Skills live inside their category as an array, so the category ↔ skill relationship
 *    can never break, and rows can be added, edited, dragged into a new order or removed.
 *  - Every skill has a stable `key` (slug) used by the seeder and the verification script.
 */
export const SkillCategories: CollectionConfig = {
  slug: 'skill-categories',
  labels: { singular: 'Skill Category', plural: 'Skill Categories' },
  orderable: true,
  defaultSort: '_order',
  admin: {
    group: 'Technical Skills',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    description:
      'Drag rows to reorder categories on the homepage. Open a category to add, edit, reorder, feature or remove its skills.',
  },
  access: { read: () => true },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data || !Array.isArray(data.skills)) return data
        const seen = new Set<string>()
        data.skills = (data.skills as SkillRow[]).map((skill) => {
          const name = (skill.name ?? '').trim()
          const key = skill.key && skill.key.trim() ? slugify(skill.key) : slugify(name)
          if (key && seen.has(key)) {
            throw new ValidationError({
              errors: [{ message: `“${name}” is listed twice in this category.`, path: 'skills' }],
            })
          }
          seen.add(key)
          return { ...skill, name, key }
        })
        return data
      },
    ],
  },
  fields: [
    { name: 'name', label: 'Category name', type: 'text', required: true },
    slugField('name'),
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'One short sentence shown under the category heading.' },
    },
    iconField({ description: 'Icon shown beside the category heading.' }),
    {
      name: 'skills',
      type: 'array',
      labels: { singular: 'Skill', plural: 'Skills' },
      admin: {
        description: 'Drag the handle to reorder. Use the row menu to duplicate or remove a skill.',
        initCollapsed: true,
        components: { RowLabel: '/components/admin/SkillRowLabel#SkillRowLabel' },
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', label: 'Skill', type: 'text', required: true, admin: { width: '45%' } },
            {
              name: 'featured',
              label: 'Featured in technology marquee',
              type: 'checkbox',
              defaultValue: false,
              admin: { width: '35%', style: { alignSelf: 'flex-end' } },
            },
          ],
        },
        iconField({ name: 'icon', description: 'Optional logo or icon for this skill badge.' }),
        {
          name: 'key',
          label: 'Stable key',
          type: 'text',
          admin: {
            description: 'Auto-generated from the skill name when empty. Used to keep seeding idempotent.',
          },
        },
      ],
    },
  ],
}
