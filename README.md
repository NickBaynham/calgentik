# Calgentik website

Marketing, documentation, and business site for **Calgentik** and the **VerifiedSignal** product. Built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **MDX** for docs-style pages.

- **Live site (planned / production):** [calgentik.com](https://calgentik.com)  
- **Application (separate product):** [verifiedsignal.io](https://verifiedsignal.io)

**Repositories**

| Repo | Role |
|------|------|
| [NickBaynham/calgentik](https://github.com/NickBaynham/calgentik) | This site only |
| [NickBaynham/verifiedsignal](https://github.com/NickBaynham/verifiedsignal) | Application and backend |

---

## Requirements

- Node.js 20+ (LTS recommended)
- npm
- **GNU Make** (optional but recommended — see [Makefile](./Makefile))

On **Windows**, use **Git Bash**, **WSL**, or run the equivalent `npm` commands below instead of `make`.

---

## Makefile (setup, config, run, test, deploy)

The repo root [`Makefile`](./Makefile) wraps the usual workflows. Run **`make help`** anytime to list targets.

### First-time setup

| Step | Command | What it does |
|------|---------|----------------|
| Install dependencies | `make setup` | Runs `npm install` (flexible versions; good for local dev). |
| Strict install (like CI) | `make setup-ci` | Runs `npm ci` using `package-lock.json` only — use before release or when debugging CI. |
| Environment file | `make configure` | If `.env.local` is missing, copies [`.env.example`](./.env.example) to `.env.local`. If it already exists, it is left unchanged. Edit `.env.local` for your URLs and public config. |

Typical first clone:

```bash
make setup
make configure
```

### Run locally

| Step | Command | What it does |
|------|---------|----------------|
| Development server | `make dev` | Starts Next.js dev server at [http://localhost:3000](http://localhost:3000). Aliases: `make run`, `make local`. |
| Production build | `make build` | Runs `next build` and writes output under `.next/`. |
| Production server | `make start` | Runs `next start` on port 3000. **Requires** `make build` first (fails with a hint if `.next` is missing). |

### Test and quality checks

| Step | Command | What it does |
|------|---------|----------------|
| Lint | `make lint` | ESLint over the project. |
| Typecheck | `make typecheck` | `tsc --noEmit`. |
| Unit tests | `make unit` | Runs **Vitest** once (`npm run test`) — `lib/`, `data/`, and `ContactForm`. |
| Watch tests (TDD) | `npm run test:watch` | Vitest in watch mode (not wrapped in Make). |
| Full local verify | `make test` | Runs **lint → typecheck → unit tests → build** in order. |
| Match CI | `make ci` | Same as `make test` (mirrors [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) after dependencies are installed). |

Before opening a PR or tagging a release:

```bash
make setup-ci
make ci
```

### Deployment

Deployment to AWS is **not** executed from Make (no long-lived credentials in the repo).

| Step | Command | What it does |
|------|---------|----------------|
| Pre-deploy verification | `make deploy-check` | Same as `make test` — confirms the app builds cleanly. |
| Deployment instructions | `make deploy` | Runs `deploy-check`, then prints where to deploy (**Amplify** vs **GitHub Actions + S3**) and points to `docs/`. |

**You still:**

1. Push to GitHub (`main` / `develop` as appropriate).
2. Let **AWS Amplify** (preferred) or **GitHub Actions** ([`deploy-static-example.yml`](./.github/workflows/deploy-static-example.yml)) perform the actual upload.

Details: [docs/deployment.md](./docs/deployment.md), [docs/aws-amplify.md](./docs/aws-amplify.md).

### Cleanup

| Step | Command | What it does |
|------|---------|----------------|
| Drop build output | `make clean` | Deletes `.next/`. |
| Full reset | `make distclean` | Deletes `.next/` and `node_modules/` — run `make setup` again afterward. |

---

## npm scripts (equivalent to Make)

If you prefer not to use Make:

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server (after `build`) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run test` | Unit tests once (Vitest) |
| `npm run test:watch` | Unit tests in watch mode |

Tests live next to code as `*.test.ts` / `*.test.tsx` (see `vitest.config.ts`).

## Environment variables

Copy [`.env.example`](./.env.example) to `.env.local` and adjust, or run **`make configure`** once. All keys are `NEXT_PUBLIC_*` (safe for the browser; no secrets in the example file).

---

## CI (GitHub Actions)

Workflow: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)

**Triggers:** `pull_request`, pushes to `main`, pushes to `develop`.

**Steps:** checkout → Node 20 + npm cache → `npm ci` → `lint` → `typecheck` → `test` → `build`.

---

## Deployment architecture

### Preferred: GitHub → AWS Amplify → calgentik.com

1. Connect **NickBaynham/calgentik** in the [Amplify console](https://console.aws.amazon.com/amplify/).
2. Use repo-root [`amplify.yml`](./amplify.yml) for build phases.
3. Map **main** to production and attach **calgentik.com** under **Custom domains** (ACM certificates are handled by Amplify).

**Branch model**

| Branch | Typical target |
|--------|----------------|
| Feature branches | Development; PR previews (optional in Amplify) |
| `develop` | Staging |
| `main` | Production (`calgentik.com`) |

Detailed steps: [`docs/aws-amplify.md`](./docs/aws-amplify.md).

### Alternative: GitHub Actions → S3 → CloudFront → Route 53

- Requires a **static export** (`output: 'export'` in `next.config.ts`). The default config does **not** set this so full Next.js keeps working locally and on Amplify.
- Example workflow: [`.github/workflows/deploy-static-example.yml`](./.github/workflows/deploy-static-example.yml) (uses **GitHub OIDC**; no long-lived AWS keys).
- The deploy job **does not run** until repository variables `AWS_ROLE_TO_ASSUME` and `S3_BUCKET` are configured.

Detailed steps: [`docs/aws-s3-cloudfront.md`](./docs/aws-s3-cloudfront.md).

### Domain split

| Domain | Serves |
|--------|--------|
| **calgentik.com** | Company, marketing, documentation (this repo) |
| **verifiedsignal.io** | VerifiedSignal application (**verifiedsignal** repo) |

---

## Production checklist

- [ ] **DNS** — `calgentik.com` (and `www` if used) targets Amplify or CloudFront.
- [ ] **TLS** — ACM certificate (Amplify-managed, or us-east-1 cert for CloudFront).
- [ ] **Environment variables** — Set `NEXT_PUBLIC_*` in Amplify or CI as needed.
- [ ] **Build** — CI green; local `make ci` or `npm run build` succeeds.
- [ ] **Cache** — CloudFront invalidation or Amplify cache behavior after releases.
- [ ] **Smoke test** — Home, docs, resources; links to **verifiedsignal.io** work.

---

## Deployment documentation

| Doc | Contents |
|-----|----------|
| [`docs/deployment.md`](./docs/deployment.md) | Overview, OIDC trust/policy **examples**, checklist |
| [`docs/github-oidc.md`](./docs/github-oidc.md) | OIDC summary and links |
| [`docs/aws-amplify.md`](./docs/aws-amplify.md) | Amplify + GitHub, branches, domains |
| [`docs/aws-s3-cloudfront.md`](./docs/aws-s3-cloudfront.md) | Static export, S3 sync, CloudFront, Route 53 |

---

## Project layout (high level)

- `app/` — Next.js App Router pages and layouts  
- `components/` — UI components  
- `data/`, `lib/` — Content and helpers  
- `public/` — Static assets  
- `docs/` — Deployment guides (Markdown) and optional media you add locally  
- `Makefile` — Local setup, run, test, and deploy-helper commands  

---

## License

Private / all rights reserved unless otherwise noted.
