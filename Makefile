# Calgentik / VerifiedSignal marketing site — common workflows
# Requires: GNU Make, Node.js 20+, npm
# Windows: use Git Bash, WSL, or run the npm commands from README directly.

.DEFAULT_GOAL := help

.PHONY: help setup setup-ci configure dev run local lint typecheck unit build test ci start clean distclean deploy deploy-check

help: ## Show all Make targets and what they do
	@printf "\nCalgentik website — Make targets\n\n"
	@grep -E '^[a-zA-Z][a-zA-Z0-9_-]*:.*##' Makefile | sort | sed 's/:.*## /  →  /'

setup: ## Install dependencies (npm install — good for first clone or day-to-day)
	npm install

setup-ci: ## Install exactly from lockfile (npm ci — matches GitHub Actions)
	npm ci

configure: ## Create .env.local from .env.example if it does not exist yet
	@if [ ! -f .env.local ]; then \
		cp .env.example .env.local; \
		echo "Created .env.local — edit values for your environment."; \
	else \
		echo ".env.local already exists — leaving it unchanged."; \
	fi

dev: ## Run Next.js dev server (http://localhost:3000)
	npm run dev

run: dev ## Same as dev
local: dev ## Same as dev

lint: ## Run ESLint
	npm run lint

typecheck: ## Run TypeScript without emitting files
	npm run typecheck

build: ## Production Next.js build (.next output)
	npm run build

unit: ## Run unit tests once (Vitest)
	npm run test

test: lint typecheck unit build ## lint + typecheck + Vitest + production build
	@echo "All checks passed."

ci: test ## Same steps as .github/workflows/ci.yml (after install)

start: ## Start production server on :3000 (run `make build` first if `.next` is missing)
	@test -d .next || { echo "No .next directory — run: make build"; exit 1; }
	npm run start

clean: ## Remove Next.js build output (.next)
	rm -rf .next

distclean: clean ## Remove .next and node_modules (full reset)
	rm -rf node_modules

deploy-check: test ## Verify build + tests (no AWS calls)
	@echo "deploy-check: OK — push to GitHub for Amplify/Actions to deploy."

deploy: deploy-check ## Show how production deployment happens (no cloud upload from Make)
	@echo ""
	@echo "Deployment is not run from Make (no AWS credentials in this repo)."
	@echo "Preferred: connect this repo in AWS Amplify — see guides/aws-amplify.md"
	@echo "Alternative (static export): GitHub Actions — guides/aws-s3-cloudfront.md"
	@echo "Overview: guides/deployment.md"
	@echo ""
