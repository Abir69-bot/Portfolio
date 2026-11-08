import { ArrowRight, ArrowUpRight, Download, FileText, GraduationCap, Mail, MapPin, Phone, Award } from 'lucide-react'
import type { ReactNode } from 'react'

import type { HomeContent } from '@/lib/content'
import { Icon } from './Icon'

type Profile = HomeContent['profile']
type Category = HomeContent['skillCategories'][number]
type Capability = HomeContent['capabilities'][number]
type Project = HomeContent['projects'][number]
type ResearchItem = HomeContent['research'][number]

const pad = (n: number) => String(n).padStart(2, '0')

function SectionHead({ index, eyebrow, title, subtitle }: { index: string; eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="section-head" data-reveal>
      <p className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        {eyebrow}
      </p>
      <h2 className="section-title">{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
  )
}

function Tags({ items, className = '' }: { items?: string[] | null; className?: string }) {
  if (!items?.length) return null
  return (
    <ul className={`tags ${className}`}>
      {items.map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  )
}

/* ───────────────────────────── Hero ───────────────────────────── */

const article = (word: string) => (/^[aeiou]/i.test(word) ? 'An' : 'A')

export function Hero({
  profile,
  stats,
}: {
  profile: Profile
  stats: { value: number; label: string }[]
}) {
  const roles = (profile.subtitle ?? '').split('|').map((s) => s.trim()).filter(Boolean)
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          {profile.availability ? (
            <p className="pill hero__pill" data-reveal>
              <span className="pill__dot" />
              {profile.availability}
            </p>
          ) : null}
          <h1 className="hero__headline" data-reveal>
            <span className="hero__hi">Hi, I&rsquo;m</span> {profile.name}
            <span className="hero__role">
              {article(profile.title)} <strong>{profile.title}</strong>
            </span>
          </h1>
          <ul className="hero__roles" data-reveal aria-label="Professional focus">
            {roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="hero__desc" data-reveal>
            {profile.heroDescription}
          </p>
          <div className="hero__ctas" data-reveal>
            <a className="btn btn--primary" href="#projects">
              View projects <ArrowRight size={16} aria-hidden="true" />
            </a>
            {profile.resumeUrl ? (
              <a className="btn btn--ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                <Download size={16} aria-hidden="true" /> AI Software Engineer résumé
              </a>
            ) : null}
          </div>
          <dl className="hero__stats" data-reveal>
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {profile.photoUrl ? (
          <div className="hero__photo" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.photoUrl} alt={`Portrait of ${profile.name}`} width={480} height={560} fetchPriority="high" />
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* ─────────────────────────── Marquee ─────────────────────────── */

export function TechMarquee({ categories }: { categories: Category[] }) {
  const seen = new Set<string>()
  const featured = categories
    .flatMap((c) => c.skills ?? [])
    .filter((s) => s.featured && !seen.has(s.name) && seen.add(s.name))
  if (!featured.length) return null
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {featured.map((s) => (
        <li key={s.id ?? s.name}>
          <Icon value={s.icon} size={18} />
          {s.name}
        </li>
      ))}
    </ul>
  )
  return (
    <section className="marquee" aria-label="Featured technologies">
      <div className="marquee__track">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}

/* ───────────────────────── What I Build ───────────────────────── */

export function WhatIBuild({ items }: { items: Capability[] }) {
  if (!items.length) return null
  return (
    <section className="section" id="build">
      <div className="container">
        <SectionHead
          index="01"
          eyebrow="Capabilities"
          title="What I Build"
          subtitle="Building intelligent software — from AI/ML and Computer Vision research to full-stack web applications, AI-powered ERP systems, SaaS platforms, and scalable backend solutions."
        />
        <div className="build-grid">
          {items.map((c, i) => (
            <article key={c.id} className="card build-card" data-reveal data-tilt style={{ ['--d' as string]: i }}>
              <div className="build-card__stage" aria-hidden="true">
                <span className="iso">
                  <i className="iso__plate iso__plate--1" />
                  <i className="iso__plate iso__plate--2" />
                  <i className="iso__plate iso__plate--3">
                    <Icon value={c.icon} size={34} />
                  </i>
                </span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <Tags items={c.technologies} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── Technical Skills & Technologies ─────────────────── */

export function TechnicalSkills({ categories }: { categories: Category[] }) {
  return (
    <section className="section section--tinted" id="skills">
      <div className="container">
        <SectionHead
          index="02"
          eyebrow="Skills"
          title="Technical Skills & Technologies"
          subtitle="Technologies and engineering practices I use to build intelligent software systems."
        />
        <div className="skills-grid">
          {categories.map((cat, i) => (
            <article key={cat.id} className="card skill-card" data-reveal data-tilt style={{ ['--d' as string]: i % 2 }} aria-labelledby={`cat-${cat.slug}`}>
              <header className="skill-card__head">
                <span className="skill-card__icon" aria-hidden="true">
                  <Icon value={cat.icon} size={20} />
                </span>
                <div>
                  <h3 id={`cat-${cat.slug}`}>
                    {cat.name}
                  </h3>
                  {cat.description ? <p>{cat.description}</p> : null}
                </div>
              </header>
              <ul className="skill-badges">
                {(cat.skills ?? []).map((s) => (
                  <li key={s.id ?? s.name} className={`skill-badge ${s.featured ? 'skill-badge--featured' : ''}`}>
                    <Icon value={s.icon} size={15} />
                    <span>{s.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Projects ─────────────────────────── */

function Detail({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="detail">
      <h4>{title}</h4>
      {children}
    </div>
  )
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const list = (rows?: { value: string; id?: string | null }[] | null) =>
    rows?.length ? (
      <ul className="bullets">
        {rows.map((r, i) => (
          <li key={r.id ?? i}>{r.value}</li>
        ))}
      </ul>
    ) : null

  const hasDeepDive =
    p.problem || p.architecture || p.components?.length || p.aiStack?.length || p.backend || p.integrations?.length ||
    p.dataFlow?.length || p.testing || p.deployment || p.challenges?.length || p.decisions?.length

  return (
    <article className="card project" data-reveal data-tilt="soft">
      <div className="project__main">
        <div className="project__meta">
          <span className="project__num">{pad(index + 1)}</span>
          {p.category ? <span className="project__cat">{p.category}</span> : null}
          {p.period ? <span className="project__period">{p.period}</span> : null}
        </div>
        <h3 className="project__title">{p.title}</h3>
        <p className="project__tagline">{p.tagline}</p>
        <p className="project__summary">{p.summary}</p>
        <Tags items={p.stack} />
        <div className="project__links">
          {p.githubUrl ? (
            <a className="link" href={p.githubUrl} target="_blank" rel="noreferrer">
              <Icon value="si:github" size={15} /> Source <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
          {p.demoUrl ? (
            <a className="link" href={p.demoUrl} target="_blank" rel="noreferrer">
              Live demo <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>

      {hasDeepDive ? (
        <details className="project__deep">
          <summary>
            <span>Engineering deep-dive</span>
            <span className="project__chev" aria-hidden="true" />
          </summary>
          <div className="project__deep-grid">
            {p.problem ? (
              <Detail title="Problem">
                <p>{p.problem}</p>
              </Detail>
            ) : null}
            {p.architecture ? (
              <Detail title="System architecture">
                <p>{p.architecture}</p>
              </Detail>
            ) : null}
            {p.dataFlow?.length ? (
              <Detail title="Data flow">
                <ol className="flow">
                  {p.dataFlow.map((s, i) => (
                    <li key={s.id ?? i}>{s.value}</li>
                  ))}
                </ol>
              </Detail>
            ) : null}
            {p.components?.length ? (
              <Detail title="Software components">
                <ul className="components">
                  {p.components.map((c, i) => (
                    <li key={c.id ?? i}>
                      <strong>{c.name}</strong>
                      {c.detail ? <span>{c.detail}</span> : null}
                    </li>
                  ))}
                </ul>
              </Detail>
            ) : null}
            {p.aiStack?.length ? (
              <Detail title="AI / ML technologies">
                <Tags items={p.aiStack} className="tags--accent" />
              </Detail>
            ) : null}
            {p.backend ? (
              <Detail title="Backend implementation">
                <p>{p.backend}</p>
              </Detail>
            ) : null}
            {p.integrations?.length ? (
              <Detail title="APIs & integrations">
                <Tags items={p.integrations} className="tags--subtle" />
              </Detail>
            ) : null}
            {p.testing ? (
              <Detail title="Testing approach">
                <p>{p.testing}</p>
              </Detail>
            ) : null}
            {p.deployment ? (
              <Detail title="Deployment">
                <p>{p.deployment}</p>
              </Detail>
            ) : null}
            {p.challenges?.length ? <Detail title="Technical challenges">{list(p.challenges)}</Detail> : null}
            {p.decisions?.length ? <Detail title="Engineering decisions">{list(p.decisions)}</Detail> : null}
          </div>
        </details>
      ) : null}
    </article>
  )
}

export function Projects({ items }: { items: Project[] }) {
  if (!items.length) return null
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead
          index="03"
          eyebrow="Selected work"
          title="Engineering Projects"
          subtitle="Each project is a complete system — interface, API, model and data — with the engineering decisions behind it."
        />
        <div className="projects">
          {items.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Research ─────────────────────────── */

export function Research({ items }: { items: ResearchItem[] }) {
  if (!items.length) return null
  return (
    <section className="section section--tinted" id="research">
      <div className="container">
        <SectionHead
          index="04"
          eyebrow="Research"
          title="Research & Publications"
          subtitle="Efficient models and representation learning — the research that informs how I engineer AI systems."
        />
        <div className="research-grid">
          {items.map((r, i) => (
            <article
              key={r.id}
              className={`card research ${r.status && /^published/i.test(r.status) ? 'research--published' : 'research--pending'}`}
              data-reveal
              data-tilt="soft"
              style={{ ['--d' as string]: i }}
            >
              <div className="research__top">
                {r.shortTitle ? (
                  <span className="research__short">
                    <FileText size={14} aria-hidden="true" /> {r.shortTitle}
                  </span>
                ) : null}
                {r.status ? (
                  <span className="research__stamp">
                    <span className="research__stamp-dot" aria-hidden="true" />
                    {r.status}
                  </span>
                ) : null}
              </div>
              <h3>{r.title}</h3>
              {r.context ? <p className="research__context">{r.context}</p> : null}
              <p className="research__summary">{r.summary}</p>
              {r.metrics?.length ? (
                <dl className="metrics">
                  {r.metrics.map((m, i) => (
                    <div key={m.id ?? i}>
                      <dd>{m.value}</dd>
                      <dt>{m.label}</dt>
                    </div>
                  ))}
                </dl>
              ) : null}
              {r.highlights?.length ? (
                <ul className="bullets">
                  {r.highlights.map((h, i) => (
                    <li key={h.id ?? i}>{h.value}</li>
                  ))}
                </ul>
              ) : null}
              <div className="research__foot">
                <Tags items={r.stack} />
                {r.githubUrl ? (
                  <a className="research__code" href={r.githubUrl} target="_blank" rel="noreferrer">
                    <Icon value="si:github" size={15} /> Code <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── Education & Leadership ─────────────────── */

/** Last four-digit year in a period, e.g. "Spring 2022 – Spring 2026" → "2026". */
const endYear = (period?: string | null) => period?.match(/\d{4}/g)?.at(-1) ?? ''

function ColumnHead({ icon, title, meta }: { icon: ReactNode; title: string; meta: string }) {
  return (
    <div className="bg-head" data-reveal>
      <span className="bg-head__icon" aria-hidden="true">
        {icon}
      </span>
      <h3>{title}</h3>
      <span className="bg-head__meta">{meta}</span>
    </div>
  )
}

export function Background({ profile }: { profile: Profile }) {
  const education = profile.education ?? []
  const leadership = profile.leadership ?? []
  if (!education.length && !leadership.length) return null
  return (
    <section className="section" id="background">
      <div className="container">
        <SectionHead index="05" eyebrow="Background" title="Education & Leadership" />
        <div className="background-grid">
          {education.length ? (
            <div>
              <ColumnHead icon={<GraduationCap size={18} />} title="Education" meta={`${pad(education.length)} stages`} />
              <ol className="journey">
                {education.map((e, i) => (
                  <li key={e.id ?? i} className="journey__item" data-reveal style={{ ['--d' as string]: i }}>
                    <span className={`journey__node${i === 0 ? ' journey__node--live' : ''}`} aria-hidden="true" />
                    <div className="journey__slab" data-tilt="soft">
                      <span className="journey__year" aria-hidden="true">
                        {endYear(e.period)}
                      </span>
                      <div className="journey__body">
                        <div className="journey__top">
                          <strong className="journey__degree">{e.degree}</strong>
                          {e.period ? <span className="journey__period">{e.period}</span> : null}
                        </div>
                        <span className="journey__school">{e.school}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
          {leadership.length ? (
            <div>
              <ColumnHead icon={<Award size={18} />} title="Achievements & Leadership" meta={`${pad(leadership.length)} role${leadership.length > 1 ? 's' : ''}`} />
              <div className="badges">
                {leadership.map((l, i) => (
                  <article key={l.id ?? i} className="badge" data-reveal data-tilt="deep" style={{ ['--d' as string]: i + 1 }}>
                    <span className="badge__skin" aria-hidden="true" />
                    <span className="badge__slot" aria-hidden="true" />
                    <div className="badge__top">
                      <span className="badge__coin" aria-hidden="true">
                        <Award size={22} />
                      </span>
                      {l.period ? <span className="badge__period">{l.period}</span> : null}
                    </div>
                    <h4 className="badge__role">{l.role}</h4>
                    <p className="badge__org">{l.organization}</p>
                    {l.highlights?.length ? (
                      <ol className="badge__list">
                        {l.highlights.map((h, j) => (
                          <li key={h.id ?? j}>
                            <span className="badge__n">{pad(j + 1)}</span>
                            {h.value}
                          </li>
                        ))}
                      </ol>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Contact ─────────────────────────── */

type ContactTile = { key: string; tone: string; icon: ReactNode; label: string; value: string; href?: string; external?: boolean }

export function Contact({ profile }: { profile: Profile }) {
  const tiles: ContactTile[] = []
  if (profile.linkedinUrl)
    tiles.push({
      key: 'linkedin',
      tone: 'blue',
      icon: <span className="contact-tile__in">in</span>,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: profile.linkedinUrl,
      external: true,
    })
  if (profile.githubUrl)
    tiles.push({
      key: 'github',
      tone: 'ink',
      icon: <Icon value="si:github" size={18} />,
      label: 'GitHub',
      value: 'See my code',
      href: profile.githubUrl,
      external: true,
    })
  if (profile.phone)
    tiles.push({
      key: 'phone',
      tone: 'green',
      icon: <Phone size={18} aria-hidden="true" />,
      label: 'Phone',
      // Non-breaking hyphen: the number only wraps at its space.
      value: profile.phone.replace(/-/g, '\u2011'),
      href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`,
    })
  if (profile.location)
    tiles.push({ key: 'location', tone: 'amber', icon: <MapPin size={18} aria-hidden="true" />, label: 'Based in', value: profile.location })

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact" data-reveal>
          <span className="contact__floor" aria-hidden="true" />
          {/* Decorative 3D stack: code editor, a terminal in front of it and a floating </> key. */}
          <div className="contact__stack" aria-hidden="true">
            <div className="code-win code-win--term">
              <div className="code-win__bar">
                <i />
                <i />
                <i />
                <span>terminal</span>
              </div>
              <pre>
                <b className="tk-dim">$</b> docker compose up{'\n'}
                <b className="tk-ok">✓</b> api ready{'\n'}
                <b className="tk-ok">✓</b> agent online
              </pre>
            </div>
            <div className="code-win code-win--editor">
              <div className="code-win__bar">
                <i />
                <i />
                <i />
                <span>agent.py</span>
              </div>
              <pre>
                <b className="tk-kw">from</b> app <b className="tk-kw">import</b> Agent{'\n'}
                {'\n'}
                agent = <b className="tk-fn">Agent</b>({'\n'}
                {"  "}tools=[<b className="tk-str">search</b>, <b className="tk-str">rag</b>],{'\n'}
                ){'\n'}
                agent.<b className="tk-fn">run</b>(<b className="tk-str">&quot;let's build&quot;</b>)
                <b className="code-win__caret" />
              </pre>
            </div>
            <span className="code-key">&lt;/&gt;</span>
          </div>
          <div className="contact__main">
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow__index">06</span>
              Contact · {profile.title}
            </p>
            <h2 className="contact__title">{profile.ctaHeading || `Hire an ${profile.title}`}</h2>
            {profile.ctaText ? <p className="contact__text">{profile.ctaText}</p> : null}
            <div className="contact__actions">
              <a className="btn btn--light" href={`mailto:${profile.email}`}>
                <Mail size={16} aria-hidden="true" /> {profile.email}
              </a>
              {profile.resumeUrl ? (
                <a className="btn btn--outline-light" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  <Download size={16} aria-hidden="true" /> Download résumé
                </a>
              ) : null}
            </div>
          </div>
          {tiles.length ? (
            <ul className="contact__links">
              {tiles.map((t) => {
                const body = (
                  <>
                    <span className={`contact-tile__icon contact-tile__icon--${t.tone}`} aria-hidden="true">
                      {t.icon}
                    </span>
                    {t.href ? <ArrowUpRight className="contact-tile__arrow" size={16} aria-hidden="true" /> : null}
                    <span className="contact-tile__label">{t.label}</span>
                    <span className="contact-tile__value">{t.value}</span>
                  </>
                )
                return (
                  <li key={t.key}>
                    {t.href ? (
                      <a
                        className="contact-tile"
                        href={t.href}
                        data-tilt="soft"
                        {...(t.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="contact-tile" data-tilt="soft">
                        {body}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.name} · {profile.title}
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
