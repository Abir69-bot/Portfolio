'use client'

import { useEffect, useRef, useState } from 'react'

import { NAV_LINKS } from './Nav'

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

/** Tilt strength (degrees) per `data-tilt` value. */
const TILT: Record<string, number> = { soft: 2.5, deep: 9 }

/**
 * Page-wide motion layer:
 *  - 3D “unfold” reveal for every `[data-reveal]` element
 *  - pointer tilt + spotlight border for `[data-tilt]` elements
 *  - magnetic buttons
 *  - scroll progress, hero depth exit and scroll-velocity skew (CSS vars on <html>)
 *  - section rail, active nav link and a trailing cursor ring
 * Everything is skipped for `prefers-reduced-motion`; pointer effects only run on fine pointers.
 */
export function Motion() {
  const [active, setActive] = useState('')
  const [pointer, setPointer] = useState(false)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const cleanups: (() => void)[] = []
    const on = <K extends keyof WindowEventMap>(t: Window | HTMLElement, type: K, fn: (e: WindowEventMap[K]) => void) => {
      t.addEventListener(type, fn as EventListener, { passive: true })
      cleanups.push(() => t.removeEventListener(type, fn as EventListener))
    }

    /* Reveal */
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (reduced || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-visible'))
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        },
        { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
      )
      reveals.forEach((el) => io.observe(el))
      cleanups.push(() => io.disconnect())
    }

    /* Active section */
    const sections = NAV_LINKS.map(([, href]) => document.querySelector<HTMLElement>(href)).filter(
      (s): s is HTMLElement => s !== null,
    )
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => spy.observe(s))
    cleanups.push(() => spy.disconnect())

    /* Scroll: progress, hero exit, velocity */
    const hero = document.querySelector<HTMLElement>('.hero')
    let lastY = window.scrollY
    let queued = false
    let vel = 0
    let target = 0
    let settling = false
    const settle = () => {
      vel += (target - vel) * 0.18
      target *= 0.82
      root.style.setProperty('--vel', vel.toFixed(2))
      if (Math.abs(vel) > 0.02 || Math.abs(target) > 0.02) requestAnimationFrame(settle)
      else {
        root.style.setProperty('--vel', '0')
        settling = false
      }
    }
    const paint = () => {
      queued = false
      const y = window.scrollY
      const max = root.scrollHeight - window.innerHeight
      root.style.setProperty('--scroll', (max > 0 ? y / max : 0).toFixed(4))
      if (hero && !reduced) root.style.setProperty('--hero-p', clamp(y / hero.offsetHeight, 0, 1).toFixed(4))
      if (y < (hero?.offsetHeight ?? 0) * 0.5) setActive('')
      if (!reduced) {
        target = clamp((y - lastY) * 0.35, -10, 10)
        if (!settling) {
          settling = true
          requestAnimationFrame(settle)
        }
      }
      lastY = y
    }
    on(window, 'scroll', () => {
      if (!queued) {
        queued = true
        requestAnimationFrame(paint)
      }
    })
    paint()

    if (reduced || !fine) return () => cleanups.forEach((fn) => fn())

    /* Tilt + spotlight */
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
      const glare = document.createElement('span')
      glare.className = 'tilt-glare'
      glare.setAttribute('aria-hidden', 'true')
      el.appendChild(glare)
      cleanups.push(() => glare.remove())

      const strength = TILT[el.dataset.tilt ?? ''] ?? 7
      let rect = el.getBoundingClientRect()
      on(el, 'pointerenter', () => {
        rect = el.getBoundingClientRect()
        el.classList.add('is-tilting')
      })
      on(el, 'pointermove', (e) => {
        const px = clamp((e.clientX - rect.left) / rect.width, 0, 1)
        const py = clamp((e.clientY - rect.top) / rect.height, 0, 1)
        el.style.setProperty('--tilt-x', `${((0.5 - py) * strength).toFixed(2)}deg`)
        el.style.setProperty('--tilt-y', `${((px - 0.5) * strength).toFixed(2)}deg`)
        el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
        el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
      })
      on(el, 'pointerleave', () => {
        el.classList.remove('is-tilting')
        el.style.setProperty('--tilt-x', '0deg')
        el.style.setProperty('--tilt-y', '0deg')
      })
    })

    /* Magnetic buttons */
    document.querySelectorAll<HTMLElement>('.btn').forEach((el) => {
      on(el, 'pointermove', (e) => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mag-x', `${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px`)
        el.style.setProperty('--mag-y', `${((e.clientY - r.top - r.height / 2) * 0.32).toFixed(1)}px`)
      })
      on(el, 'pointerleave', () => {
        el.style.setProperty('--mag-x', '0px')
        el.style.setProperty('--mag-y', '0px')
      })
    })

    /* Cursor ring */
    setPointer(true)
    let x = -100
    let y = -100
    let rx = x
    let ry = y
    let raf = 0
    const follow = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      ring.current?.style.setProperty('transform', `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`)
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 ? requestAnimationFrame(follow) : 0
    }
    on(window, 'pointermove', (e) => {
      x = e.clientX
      y = e.clientY
      const hot = (e.target as Element | null)?.closest?.('a, button, summary, [data-tilt]')
      ring.current?.classList.toggle('cursor--hot', Boolean(hot))
      ring.current?.classList.add('cursor--on')
      if (!raf) raf = requestAnimationFrame(follow)
    })
    on(window, 'pointerdown', () => ring.current?.classList.add('cursor--down'))
    on(window, 'pointerup', () => ring.current?.classList.remove('cursor--down'))
    cleanups.push(() => cancelAnimationFrame(raf))

    return () => cleanups.forEach((fn) => fn())
  }, [])

  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('.nav__links a[href^="#"]').forEach((a) => {
      if (a.getAttribute('href') === active) a.setAttribute('aria-current', 'location')
      else a.removeAttribute('aria-current')
    })
  }, [active])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <nav className="rail" aria-hidden="true">
        {NAV_LINKS.map(([label, href], i) => (
          <a key={href} href={href} tabIndex={-1} className={active === href ? 'is-active' : undefined}>
            <span className="rail__label">{label}</span>
            <span className="rail__tick">{String(i + 1).padStart(2, '0')}</span>
          </a>
        ))}
      </nav>
      {pointer ? <div ref={ring} className="cursor" aria-hidden="true" /> : null}
    </>
  )
}
