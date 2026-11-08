import { getHomeContent } from '@/lib/content'
import { Nav } from '@/components/site/Nav'
import { Motion } from '@/components/site/Motion'
import {
  Background,
  Contact,
  Footer,
  Hero,
  Projects,
  Research,
  TechMarquee,
  TechnicalSkills,
  WhatIBuild,
} from '@/components/site/Sections'

// Always render from the CMS so admin edits appear on the next page load.
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const { profile, skillCategories, capabilities, projects, research } = await getHomeContent()
  const skillCount = skillCategories.reduce((n, c) => n + (c.skills?.length ?? 0), 0)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav name={profile.name} resumeUrl={profile.resumeUrl} />
      <main id="main">
        <Hero
          profile={profile}
          stats={[
            { value: projects.length, label: 'Engineering projects' },
            { value: research.length, label: 'Research manuscripts' },
            { value: skillCount, label: 'Technologies' },
          ]}
        />
        <TechMarquee categories={skillCategories} />
        <WhatIBuild items={capabilities} />
        <TechnicalSkills categories={skillCategories} />
        <Projects items={projects} />
        <Research items={research} />
        <Background profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
      <Motion />
    </>
  )
}
