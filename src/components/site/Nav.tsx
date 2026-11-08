'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export const NAV_LINKS = [
  ['What I Build', '#build'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Research', '#research'],
  ['Contact', '#contact'],
] as const

export function Nav({ name, resumeUrl }: { name: string; resumeUrl?: string | null }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__mark">{initials}</span>
          <span className="nav__name">{name}</span>
        </a>
        <nav aria-label="Primary" className="nav__links" id="nav-links">
          {NAV_LINKS.map(([label, href], i) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{ ['--i' as string]: i }}>
              <span className="roll" data-text={label}>
                {label}
              </span>
            </a>
          ))}
          {resumeUrl ? (
            <a className="btn btn--dark btn--sm nav__resume" href={resumeUrl} target="_blank" rel="noreferrer">
              Résumé
            </a>
          ) : null}
        </nav>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}
