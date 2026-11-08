import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import React from 'react'

import { getHomeContent } from '@/lib/content'
import './styles.css'

const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const dynamic = 'force-dynamic'

export const viewport: Viewport = {
  themeColor: '#f6f5f1',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getHomeContent()
  const title = profile.seoTitle || `${profile.name} | ${profile.title}`
  const description = profile.seoDescription
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: profile.seoKeywords ?? undefined,
    authors: [{ name: profile.name, url: SITE_URL }],
    creator: profile.name,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'profile',
      url: '/',
      siteName: `${profile.name} · ${profile.title}`,
      title,
      description,
      locale: 'en_US',
      firstName: 'Faisal Mahmud',
      lastName: 'Abir',
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { profile, skillCategories, projects } = await getHomeContent()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: profile.name,
        jobTitle: profile.title,
        description: profile.seoDescription,
        url: SITE_URL,
        email: `mailto:${profile.email}`,
        image: profile.photoUrl ? new URL(profile.photoUrl, SITE_URL).toString() : undefined,
        address: profile.location ? { '@type': 'PostalAddress', addressLocality: profile.location } : undefined,
        alumniOf: (profile.education ?? []).slice(0, 1).map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
        sameAs: [profile.linkedinUrl, profile.githubUrl].filter(Boolean),
        knowsAbout: skillCategories.flatMap((c) => (c.skills ?? []).filter((s) => s.featured).map((s) => s.name)),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: profile.seoTitle,
        about: { '@id': `${SITE_URL}/#person` },
      },
      ...projects.map((p) => ({
        '@type': 'SoftwareSourceCode',
        name: p.title,
        description: p.summary,
        codeRepository: p.githubUrl || undefined,
        author: { '@id': `${SITE_URL}/#person` },
      })),
    ],
  }

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
