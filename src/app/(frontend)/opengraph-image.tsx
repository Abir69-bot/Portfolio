import { ImageResponse } from 'next/og'

export const alt = 'Faisal Mahmud Abir | AI Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  const tags = ['AI Agents', 'LLM Applications', 'Computer Vision', 'Backend APIs', 'AI Automation']
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #f6f5f1 0%, #ffffff 55%, #e9ecfb 100%)',
          color: '#111318',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#5b6070' }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#2f4fd8' }} />
          Portfolio
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>Faisal Mahmud Abir</div>
          <div style={{ fontSize: 48, color: '#2f4fd8', fontWeight: 600, letterSpacing: -1 }}>AI Software Engineer</div>
          <div style={{ fontSize: 28, color: '#3b3f4a', maxWidth: 960 }}>
            Building intelligent software that solves real-world problems.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                padding: '10px 20px',
                borderRadius: 999,
                border: '1px solid rgba(17,19,24,0.12)',
                background: '#ffffff',
                fontSize: 22,
                color: '#3b3f4a',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
