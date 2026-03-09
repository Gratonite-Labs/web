# Gratonite Web

[![Project](https://img.shields.io/badge/project-Gratonite-6d28d9)](https://github.com/CoodayeA/Gratonite)
[![Status](https://img.shields.io/badge/status-active-16a34a)](https://github.com/Gratonite-Labs/web)
[![Docs](https://img.shields.io/badge/source%20of%20truth-main%20repo-2563eb)](https://github.com/CoodayeA/Gratonite)

Web client for Gratonite — a privacy-first, open-source alternative to Discord.

## What This Covers

- **51 frontend pages** and **77 React components**
- Real-time messaging with Socket.IO
- End-to-end encryption for DMs and group DMs (client-side ECDH + AES-GCM)
- Guild management, channels, threads, roles, permissions
- Voice/video channels via LiveKit
- Server discovery with federation support (browse self-hosted servers)
- Moderation tools: automod, word filters, raid protection, ban appeals
- Gamification: XP, leveling, FAME, achievements, leaderboards
- Economy: cosmetics shop, marketplace, auctions, inventory
- Creative tools: whiteboards, mood boards, photo albums, wiki channels
- Community tools: giveaways, starboard, confession boards, quests, tickets
- Theme builder, custom CSS, profile customization
- Global search, bookmarks, scheduled messages, drafts
- Web push notifications, service worker
- OAuth2 authorization flow
- GDPR data export

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | React 18, TypeScript |
| Build | Vite |
| Realtime | Socket.IO Client |
| Voice | LiveKit Client SDK |
| Crypto | Web Crypto API (ECDH, AES-GCM) |
| Styling | CSS Modules |
| Icons | Lucide React |

## Docker Image

```bash
docker pull ghcr.io/coodayea/gratonite-web:latest
```

Served by nginx in production. The Docker image contains a pre-built SPA — no build tools needed to deploy.

## Canonical Source of Truth

All source code lives in the main monorepo:

- [CoodayeA/Gratonite](https://github.com/CoodayeA/Gratonite) — path: `apps/web/`

If anything in this repo conflicts with the main repo, the main repo is authoritative.

## Related Repositories

- [Gratonite-Labs/api](https://github.com/Gratonite-Labs/api) — Backend API
- [Gratonite-Labs/mobile](https://github.com/Gratonite-Labs/mobile) — Mobile client
- [Gratonite-Labs/desktop](https://github.com/Gratonite-Labs/desktop) — Desktop client
- [Gratonite-Labs/self-hosted](https://github.com/Gratonite-Labs/self-hosted) — Self-hosting guide
