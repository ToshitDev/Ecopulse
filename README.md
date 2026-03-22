# EcoPulse

EcoPulse is an AI-powered campus sustainability MVP that helps leftover materials get routed to the right next step before they become waste.

With a single photo, EcoPulse identifies an item, classifies its likely material and condition, and recommends whether it should be:

- reused through the **Marketplace**
- handled through the **Recovery Board** for recycling, donation, or disposal
- tracked through the **Impact Board** for visible sustainability outcomes

EcoPulse is designed to make reuse and recovery easier than throwing things away.

---

## Overview

Campuses generate a large volume of leftover materials every day: cardboard, wood scraps, electronics parts, containers, textiles, furniture, and event materials.

Many of these items are still useful, but they are often discarded because people do not know the right next step and disposal is the easiest option.

EcoPulse turns that problem into a simple workflow:

**Upload → Analyze → Route → Act**

Instead of guessing where something belongs, users get a clear recommendation immediately.

---

## Core Product Flow

### 1. Upload
A student or staff member uploads a single photo of a leftover item.

### 2. Analyze
EcoPulse uses image analysis to identify the item, estimate its material and condition, and determine the most practical next step.

### 3. Route
- **Marketplace** receives reuse-ready items that can be claimed by others on campus
- **Recovery Board** receives non-reuse items that should be recycled, donated, or properly disposed of

### 4. Track
The **Impact Board** makes actions visible through a lightweight points system and leaderboard.

---

## Why It Matters

EcoPulse is built to improve campus sustainability in a practical way.

It helps campuses:

- reduce landfill waste
- keep useful materials in circulation
- make material-routing decisions faster
- improve visibility into sustainability actions
- create accountability without adding heavy operational complexity

---

## Features

- AI-assisted image analysis flow
- Upload page for item intake
- Marketplace for reuse-ready items
- Recovery Board for recycling, donation, and disposal routing
- Impact Board with points and leaderboard
- Seeded demo listings for reliable presentations
- Local persistence using `localStorage`
- Demo reset support

---

## Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Gemini API** for image analysis
- **localStorage** for lightweight persistence

---

## Run Locally

Install dependencies:

```bash
npm install
