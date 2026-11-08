# Faisal Mahmud Abir — AI Software Engineer Portfolio

Next.js 16 + **Payload CMS 3** (SQLite). Every section of the homepage — hero, What I Build,
Technical Skills, projects, research, about, education, contact and SEO — is rendered live from the CMS.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000  (or the next free port)
```

On first start with an empty database, the content is seeded automatically.
Open **/admin** and create your admin account (the first user becomes the admin).

Production:

```bash
npm run build
npm run start
```

## Editing content (/admin)

| Admin section | What it controls |
| --- | --- |
| **Technical Skills → Skill Categories** | The 10 skill categories. Drag rows in the list to reorder categories. Open one to edit its name/description/icon and to add, edit, drag-reorder, feature (★ marquee) or remove skills. |
| **Homepage → What I Build** | The six capability cards. Drag to reorder. |
| **Homepage → Profile & SEO** | Hero text, About, lifecycle, facts, education, leadership, contact, résumé link, website title/meta description/keywords. |
| **Work → Projects** | Project case studies. The *Engineering* tab holds problem, architecture, components, data flow, testing, deployment, challenges and decisions — any empty field is simply hidden. |
| **Work → Research** | Research cards with status, metrics and highlights. |

Changes appear on the public site on the next page load — no code changes or rebuilds.

## Seeding (safe by design)

```bash
npm run seed           # creates only missing items; never overwrites edits or re-creates deleted items
npm run seed:force     # explicit reset of seeded items back to src/seed/data.ts (updates in place, deletes nothing)
```

Each seeded item has a stable key (`skill-categories:<slug>` etc.) recorded in an internal `seed-state` global,
which is what makes re-running the seed idempotent.

## Verification

```bash
npm run verify:skills  # all 10 categories present, every required skill in its correct category
npm run test:admin     # with the server running: login → create/edit/reorder/delete skills & categories via
                       # the admin API and confirm each change on the public homepage (set BASE_URL if not :3000)
```

## Files

- `src/collections/*`, `src/globals/*` — CMS schema
- `src/seed/data.ts` — initial content (from the résumé) and the reference skill list
- `src/components/site/*` — public site sections · `src/app/(frontend)/styles.css` — Light Premium design
- `src/lib/iconRegistry.ts` — icons selectable in the admin (technology logos + line icons)
- `public/resume.pdf`, `public/photo.jpg` — résumé and portrait (replace files to update)

## Deploying

Locally, all CMS content lives in the SQLite file `portfolio.db` — back it up and keep it out of git.

### Vercel (with a Turso database)

Vercel can't keep a local database file, so the hosted site uses [Turso](https://turso.tech) (hosted SQLite, free plan).

1. Create a Turso database and copy its URL (`libsql://…`) and an auth token.
2. Import this GitHub repository in Vercel (framework: Next.js; the defaults are fine).
3. Add these environment variables in Vercel → Settings → Environment Variables:
   - `DATABASE_URL` — the `libsql://…` URL
   - `DATABASE_AUTH_TOKEN` — the Turso token
   - `PAYLOAD_SECRET` — a long random string (not the one from your local `.env`)
   - `NEXT_PUBLIC_SITE_URL` — the site URL, e.g. `https://your-project.vercel.app` (used for canonical and Open Graph URLs)
4. Deploy. On first start the committed migrations in `src/migrations` create the tables, and the seeder fills the
   empty database with the portfolio content. Then create your admin user at `/admin`.

After a schema change (collections or globals), run `npm run payload migrate:create <name>` and commit the new
migration; production applies it automatically on start-up. Files uploaded to the Media collection are not kept on
Vercel; the site itself uses `public/photo.jpg` and `public/resume.pdf`, which deploy with the code.
