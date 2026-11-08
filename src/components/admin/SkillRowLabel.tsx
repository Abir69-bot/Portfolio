'use client'

import { useRowLabel } from '@payloadcms/ui'

export const SkillRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ name?: string; featured?: boolean }>()
  const n = String((rowNumber ?? 0) + 1).padStart(2, '0')
  return (
    <span>
      {n} · {data?.name || 'New skill'}
      {data?.featured ? '  ★ featured' : ''}
    </span>
  )
}
