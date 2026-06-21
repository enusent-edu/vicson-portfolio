# Vicson L. Vidallon — Portfolio

Full-Stack Developer portfolio. Next.js 15, TypeScript, TailwindCSS, Framer Motion.
Dark theme, neon-green accent — styled after [arnobt78/Portfolio--NextJS-FullStack](https://github.com/arnobt78/Portfolio--NextJS-FullStack).

## Stack

- Next.js 15 (App Router, `output: standalone`)
- TypeScript, TailwindCSS, Framer Motion
- Custom lightweight UI primitives (no external UI lib runtime dep)
- Nodemailer contact form (Gmail SMTP)
- Docker, deployed via Cloudflare Tunnel `cf71b844`

## Local dev

```bash
npm install
cp .env.example .env.local   # fill in EMAIL_USER / EMAIL_PASS
npm run dev
```

Runs at `http://localhost:3000`.

## Environment variables

| Var | Required | Notes |
|---|---|---|
| `EMAIL_USER` | Yes | Gmail address used to send contact form mail |
| `EMAIL_PASS` | Yes | Gmail App Password (not your regular password) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Baked at **build time** via Dockerfile `ARG → ENV` |

`NEXT_PUBLIC_*` vars are build-time only — set them as Docker build args, not just runtime env, or they won't appear in the client bundle.

## Deploy (HP Server → Docker → Cloudflare Tunnel → Contabo)

1. Push this repo to `enusent-edu` on GitHub.
2. On HP Server, clone and build:
   ```bash
   git clone <repo-url> vicson-portfolio
   cd vicson-portfolio
   cp .env.example .env   # fill real EMAIL_USER / EMAIL_PASS
   docker compose up -d --build
   ```
3. App listens on host port **3014** (mapped from container's 3000) — chosen to avoid clashing with Bookify (3012) and TenantPro (3013).
4. Route `portfolio.powerlife-shop.com` to `http://100.115.50.106:3014` (HP Server Tailscale IP) via the Cloudflare Tunnel `cf71b844` config — **use the CF API**, never edit `config.yml` directly (per project rule, tunnel is remote-managed via CF Zero Trust).

## Notes

- No `supabase.from()` usage — this project has no database; contact form goes straight through the API routes via `fetch()`.
- All Supabase/RLS/migration rules from the main stack don't apply here (no DB), included in this README only for consistency with other demo projects.
- Avatar (`public/assets/photo.svg`) is an original flat-vector cartoon illustration — no real photo used yet. Swap with a real photo or different illustration anytime; no code changes needed beyond the file itself.

## Project structure

```
app/            Next.js App Router pages + API routes
components/     Page sections, layout, and UI primitives
context/        Language context (i18n-ready, EN only for now)
hooks/          useTypewriter
lib/            utils, translations
public/assets/  Avatar SVG, work images
```
