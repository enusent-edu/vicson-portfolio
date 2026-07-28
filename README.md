# Vicson L. Vidallon — Portfolio

Full-Stack Developer portfolio. Next.js 15, TypeScript, TailwindCSS, Framer Motion.
Dark theme, neon-green accent — styled after [arnobt78/Portfolio--NextJS-FullStack](https://github.com/arnobt78/Portfolio--NextJS-FullStack).

## Stack

- Next.js 15 (App Router, **`output: "export"`** — static export)
- TypeScript, TailwindCSS, Framer Motion
- Custom lightweight UI primitives (no external UI lib runtime dep)
- Contact form via **Cloudflare Pages Function** (`functions/api/send-email.ts`) → **Resend API**
- Hosted on **Cloudflare Pages** (project `vicson-portfolio`), Git-connected to `main`

> ⚠️ **`output` must stay `"export"`.** CF Pages builds with `destination_dir: out`, and only
> `"export"` emits `out/`. Setting `"standalone"` emits `.next/standalone/` instead, the build fails,
> and `functions/` never deploys — which makes `POST /api/send-email` return **405** and the contact
> form silently break. This exact regression happened on 2026-07-09; see the devlog below.

## Local dev

```bash
npm install
npm run dev
```

Runs at `http://localhost:3000`.

`npm run dev` does **not** serve `functions/` — the contact form only works against a real Pages
deployment. To exercise it locally, use `npx wrangler pages dev out` after `npm run build`, with
`RESEND_API_KEY` and `EMAIL_TO` set in the environment.

## Environment variables

Set these in the **Cloudflare Pages dashboard** (Settings → Environment variables), for **both**
Production and Preview. They are read at request time by the Pages Function — not baked into the build.

| Var | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key used by `functions/api/send-email.ts` |
| `EMAIL_TO` | Yes | Destination inbox for contact form submissions (falls back to `enusent@gmail.com`) |
| `NEXT_PUBLIC_*` | No | Build-time only — must exist at build, not just runtime, or they won't reach the client bundle |

## Deploy (Cloudflare Pages, Git-connected)

CF Pages project **`vicson-portfolio`** builds straight from GitHub. No manual uploads.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Production branch | `main` |
| Preview branches | all non-production branches |

**Workflow — always preview first:**

```bash
git checkout dev
# ...changes...
npm run build          # must produce out/ with every page
git add -A && git commit -m "msg" && git push origin dev
# -> CF Pages builds a preview at https://<hash>.vicson-portfolio.pages.dev
# -> test there, especially POST /api/send-email
git checkout main && git merge dev && git push origin main
```

`portfolio.powerlife-shop.com` is a **proxied CNAME → `vicson-portfolio.pages.dev`**. It does *not*
go through Cloudflare Tunnel `cf71b844`, and it is not served from HP Server.

**Never deploy by direct/manual upload.** A manual upload of `out/` does not carry `functions/`, so the
contact form breaks, and the live site silently drifts away from the repo. Between 2026-07-10 and
2026-07-28 production was served this way, and two `/work` entries existed only on the live site with
no commit backing them. Verify the deploy source with:

```bash
# a healthy deployment shows a commit hash; a manual upload shows none
curl -s "https://api.cloudflare.com/client/v4/accounts/$ACCT/pages/projects/vicson-portfolio/deployments?per_page=3" \
  -H "X-Auth-Email: $CF_EMAIL" -H "X-Auth-Key: $CF_KEY" | jq '.result[] | {id, env: .environment,
  commit: .deployment_trigger.metadata.commit_hash}'
```

### Legacy Docker path (unused)

`Dockerfile` and `docker-compose.yml` remain from the original HP Server deployment (host port 3015).
That path is **retired** — `vicson.powerlife-shop.com` has no DNS record and its tunnel ingress rule
was removed on 2026-07-28. The files are kept only for reference; the container may still be running
on HP Server and can be stopped.

## Notes

- No `supabase.from()` usage — this project has no database. The contact form posts via `fetch()` to a
  Cloudflare Pages Function, not to a Next.js API route (static export has no server routes).
- All Supabase/RLS/migration rules from the main stack don't apply here (no DB); noted only for
  consistency with the other projects.
- **Known gap:** `ContactPage.tsx` also calls `POST /api/send-auto-reply` (a confirmation to the
  sender), but `functions/api/send-auto-reply.ts` does not exist. The call is fire-and-forget with
  `.catch(() => {})`, so it cannot break submission — it just silently does nothing. Either implement
  the function or drop the call.
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

## Devlog

### 2026-07-28 — Contact form 405 fix + recovering uncommitted work entries

**Symptom.** `POST /api/send-email` returned **405** on `portfolio.powerlife-shop.com/contact`; the
form failed for every visitor. Field names were fine (`fullname`/`email`/`message` matched the
function), and the missing `/api/send-auto-reply` was not the cause (fire-and-forget, `.catch`'d).

**Root cause.** `next.config.mjs` had `output: "standalone"` (set by commit `5c40773`, "fix output
mode to standalone"), a leftover of the retired Docker deployment. CF Pages expects `out/`, which only
`output: "export"` produces — so the Git build failed (deployment `762aac05`). Production was then
kept alive by **manual direct uploads**, and a manual upload of static files does not include
`functions/`. With no function bound to the route, CF served `/api/send-email` as a static asset, and
the static handler answers POST with 405.

**Collateral found before merging.** Because production had been hand-uploaded since 2026-07-10 while
the last commit was 2026-07-09, the live `/work` page carried two cards with no source behind them:
**PharmaPOS** and **School LMS**. Deploying from Git would have deleted both. They were re-added to
`WorkPage.tsx` from the live HTML. School LMS also pointed at `school.powerlife-shop.com`, which has
**no DNS record** (HTTP 000) — a dead "Visit site" link on a public portfolio — repointed to
`lms.powerlife-shop.com` (HP Server `:3016`, live). Both new cards use `status: "in-progress"`;
School LMS previously rendered `Live` despite being on hold.

**Fix.** `output: "export"` (`7109273`) + restored entries and corrected link (`855c6d3`).

**Verified on production** (deploy `144ea8c3`, source `GIT 855c6d34`): contact form returns 200 with a
real Resend delivery; validation gates return 400 on empty / invalid email / over-length across 10
consecutive calls; all 9 pages 200; `/work` shows 13 cards (11 Live + 2 In Progress); all 13 outbound
demo links resolve. A single 405 seen seconds after deploy was one stale edge node and cleared on its
own.

**Lesson.** The README itself pointed at `output: standalone` and a Docker/Nodemailer/Gmail stack that
had already been replaced by CF Pages + Pages Functions + Resend — which is how the wrong value got
set in the first place. Those sections were rewritten in the same pass.
