import type { Field, FieldHook } from 'payload'

import { ICON_OPTIONS } from '../lib/iconRegistry'
import { slugify } from '../lib/slugify'

/** Fill an empty slug from another field, and normalise any slug the editor types. */
export const formatSlugHook =
  (fallbackField: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.trim()) return slugify(value)
    const source = data?.[fallbackField] ?? originalDoc?.[fallbackField]
    return typeof source === 'string' ? slugify(source) : value
  }

export const slugField = (fallbackField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description:
      'Stable identifier. Generated from the name if left empty. Changing it is safe but rarely needed.',
  },
  hooks: { beforeValidate: [formatSlugHook(fallbackField)] },
})

export const iconField = (overrides: Partial<{ name: string; label: string; description: string }> = {}): Field => ({
  name: overrides.name ?? 'icon',
  label: overrides.label ?? 'Icon',
  type: 'select',
  options: ICON_OPTIONS,
  admin: {
    isClearable: true,
    description:
      overrides.description ?? '“Logo · …” shows a technology logo; “Icon · …” shows a neutral line icon.',
  },
})

/** Simple list of strings stored as `{ value }` rows so editors can drag-reorder them. */
export const stringList = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: 'array',
  labels: { singular: 'Item', plural: 'Items' },
  admin: { description, initCollapsed: false },
  fields: [{ name: 'value', label: 'Text', type: 'textarea', required: true }],
})

export const techTags = (name = 'technologies', label = 'Technologies'): Field => ({
  name,
  label,
  type: 'text',
  hasMany: true,
  admin: { description: 'Type a technology and press Enter.' },
})
