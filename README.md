# EcoPulse

EcoPulse is a 24-hour MVP for campus sustainability. It helps people keep useful leftover materials out of the trash by using AI to identify items, suggest the best next step, and post them to a shared reuse marketplace.

Users upload a photo of a leftover item, get an AI-style review, post it to the campus marketplace, let another user claim it, and watch the impact board update instantly.

## Why This Exists

Useful leftover materials often get thrown away because reuse takes more effort than disposal.

EcoPulse simplifies that into one clear flow:

1. Upload leftover material
2. Get a fast listing draft
3. Post it for reuse
4. Capture it
5. Show impact with points

## MVP Scope

- Landing page
- Upload page
- Marketplace page
- Impact Board page
- Seeded demo data
- Deterministic AI-style demo analysis
- Local `localStorage` persistence
- Post listing flow
- Capture listing flow
- Immediate leaderboard updates
- Reset Demo Data action

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Demo Flow

1. Start on the landing page
2. Go to `/upload`
3. Choose an image file
4. Review the AI-style analysis
5. Click `Post to Marketplace`
6. Open `/trading-post`
7. Click `Claim`
8. Open `/bounty-board` to see updated points

## Point System

- Post item: `+10`
- Claim item: `+50`
- Verified reuse: `+50` future bonus

## Notes

- This version uses AI-style demo analysis only
- There is no authentication, backend, database, or real-time system
- The app is intentionally scoped to feel believable for a one-day hackathon build

## Future Work

- Replace the AI-style demo analysis with real image understanding
- Store listings in a lightweight backend
- Add a simple verified reuse confirmation flow

## Credits

- Built with Next.js, TypeScript, and Tailwind CSS
- Demo concept and product direction centered on sustainability-first material reuse
