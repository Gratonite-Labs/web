# Gratonite — Web

The main web client for Gratonite. A React 18 single-page application built with Vite, using Zustand for state management, TanStack Query for server state, Socket.io for real-time events, and LiveKit for voice/video.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Testing (E2E)](#testing-e2e)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript 5.7 |
| Framework | React 18.2 |
| Build Tool | Vite 5.4 |
| Routing | React Router 6.28 |
| Server State | TanStack React Query 5.60 |
| Client State | Zustand 5.0 |
| Real-time | Socket.io Client 4 |
| Voice / Video | LiveKit Client 2 |
| Virtualisation | TanStack Virtual 3 |
| E2E Tests | Playwright |

---

## Prerequisites

- **Node.js** ≥ 20
- **pnpm** ≥ 10 — `npm install -g pnpm`
- The **API** must be running on `http://localhost:4000` (or configure `VITE_API_URL`)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Gratonite-Labs/web.git
cd web
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` — see [Environment Variables](#environment-variables) below.

### 4. Start the dev server

```bash
pnpm dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

> The port is `5174` by default (configured in `vite.config.ts`). The API is expected on `4000`.

---

## Environment Variables

All Vite environment variables must be prefixed with `VITE_` to be exposed to the browser.

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL of the Gratonite API | `http://localhost:4000` |
| `VITE_WS_URL` | WebSocket URL for Socket.io | `http://localhost:4000` |
| `VITE_LIVEKIT_URL` | LiveKit WebSocket server URL | `ws://localhost:7880` |
| `VITE_MINIO_URL` | Public MinIO URL for serving media | `http://localhost:9000` |

---

## Project Structure

```
src/
├── main.tsx                  # App entry point
├── App.tsx                   # Root component + router setup
├── router/                   # React Router route definitions
├── pages/                    # Top-level page components (one per route)
│   ├── home/
│   ├── server/
│   ├── dms/
│   ├── friends/
│   ├── settings/
│   └── auth/                 # Login / register / MFA pages
├── components/               # Shared UI components
│   ├── layout/               # App shell (icon rail, sidebar, content area)
│   ├── messages/             # Message list, message input, embeds
│   ├── voice/                # Voice channel UI + LiveKit hooks
│   ├── modals/               # All modal dialogs
│   └── ui/                   # Low-level primitives (Button, Avatar, etc.)
├── hooks/                    # Custom React hooks
├── stores/                   # Zustand stores
│   ├── auth.store.ts         # Current user + JWT
│   ├── gateway.store.ts      # Socket.io connection state
│   └── voice.store.ts        # LiveKit room state
├── lib/
│   ├── api.ts                # Typed fetch wrapper
│   ├── socket.ts             # Socket.io client instance
│   └── queryClient.ts        # TanStack Query client config
├── types/                    # Local TypeScript types (re-exports @gratonite/types)
└── styles/                   # Global CSS + theme variables
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server with HMR on port `5174` |
| `pnpm build` | Type-check + compile to `dist/` |
| `pnpm preview` | Serve the production `dist/` locally |
| `pnpm typecheck` | Run `tsc --noEmit` |
| `pnpm e2e` | Run all Playwright tests (headless) |
| `pnpm e2e:headed` | Run Playwright tests with a visible browser |
| `pnpm e2e:ui` | Open the Playwright interactive UI |
| `pnpm e2e:visual` | Update visual regression snapshots |
| `pnpm e2e:install` | Install Playwright's Chromium browser |

---

## Testing (E2E)

End-to-end tests are written with [Playwright](https://playwright.dev) and live in `tests/`.

```bash
# Install browsers (first time)
pnpm e2e:install

# Run all tests
pnpm e2e

# Run with visible browser window
pnpm e2e:headed

# Open interactive Playwright UI
pnpm e2e:ui
```

Browsers are cached in `.cache/ms-playwright/` to avoid re-downloading on every CI run.

> Tests expect a running API + database. Make sure the full stack is up before running E2E tests.

---

## Building for Production

```bash
pnpm build
```

Output goes to `dist/`. Serve it with any static file server or CDN.

```bash
# Preview the production build locally
pnpm preview
```

Make sure production environment variables are set — particularly `VITE_API_URL` pointing to your deployed API.

---

## Troubleshooting

### Blank screen / nothing loads
- Check that the API is running and reachable at `VITE_API_URL`
- Open the browser console for errors
- Confirm `VITE_WS_URL` matches where Socket.io is listening

### Hot-reload not working
- Restart `pnpm dev`
- Delete `node_modules/.vite` and restart

### `Failed to resolve import "@gratonite/types"`
This package is a workspace dependency. If you're running outside the monorepo, you'll need to build it first:
```bash
cd ../packages/types && pnpm build
```

### Voice channel not connecting
- Confirm LiveKit is running: `curl http://localhost:7880`
- Check `VITE_LIVEKIT_URL` in your `.env`
- Ensure your browser has microphone/camera permission

### Playwright tests fail with "browser not found"
```bash
pnpm e2e:install
```
