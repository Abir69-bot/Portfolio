import type { GlobalConfig } from 'payload'

import { stringList } from '../fields/shared'

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Profile & SEO',
  admin: { group: 'Homepage' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'title', label: 'Professional title', type: 'text', required: true },
            { name: 'headline', type: 'text', required: true },
            { name: 'subtitle', type: 'text', required: true },
            { name: 'heroDescription', type: 'textarea', required: true },
            { name: 'location', type: 'text' },
            { name: 'availability', type: 'text', admin: { description: 'Small status line in the hero, e.g. “Open to AI Software Engineer roles”.' } },
          ],
        },
        {
          label: 'About',
          fields: [
            { name: 'aboutLead', type: 'textarea', required: true },
            stringList('aboutParagraphs', 'Paragraphs'),
            {
              name: 'lifecycle',
              label: 'AI application lifecycle',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'detail', type: 'text' },
              ],
            },
            {
              name: 'facts',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
                    { name: 'value', type: 'text', required: true, admin: { width: '60%' } },
                  ],
                },
              ],
            },
            { name: 'photoUrl', type: 'text', defaultValue: '/photo.jpg' },
          ],
        },
        {
          label: 'Education & Leadership',
          fields: [
            {
              name: 'education',
              type: 'array',
              fields: [
                { name: 'degree', type: 'text', required: true },
                { name: 'school', type: 'text', required: true },
                { name: 'period', type: 'text' },
                { name: 'result', type: 'text' },
              ],
            },
            {
              name: 'leadership',
              type: 'array',
              fields: [
                { name: 'role', type: 'text', required: true },
                { name: 'organization', type: 'text', required: true },
                { name: 'period', type: 'text' },
                stringList('highlights', 'Highlights'),
              ],
            },
          ],
        },
        {
          label: 'Contact & Resume',
          fields: [
            { name: 'email', type: 'email', required: true },
            { name: 'phone', type: 'text' },
            { name: 'linkedinUrl', label: 'LinkedIn URL', type: 'text' },
            { name: 'githubUrl', label: 'GitHub URL', type: 'text' },
            { name: 'resumeUrl', label: 'Resume URL', type: 'text', defaultValue: '/resume.pdf' },
            { name: 'ctaHeading', label: 'Contact heading', type: 'text' },
            { name: 'ctaText', label: 'Contact text', type: 'textarea' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'seoTitle', label: 'Website title', type: 'text', required: true },
            { name: 'seoDescription', label: 'Meta description', type: 'textarea', required: true },
            { name: 'seoKeywords', label: 'Keywords', type: 'text', hasMany: true },
          ],
        },
      ],
    },
  ],
}
