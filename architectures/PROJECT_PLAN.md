# ZuraCharge Anime Search Take-Home Assignment  
**Project Plan, Phases, Requirements & Tech Stack**  
*Prepared by: iffat haikal (@iffathaikal7@gmail.com)*  
*Date: February 2026*

## Project Overview

Build a **production-ready anime search and discovery application** using the **Jikan API** as a take-home assignment for ZuraCharge (EV charging solutions company, Malaysia).

**Goal**  
Demonstrate strong React + TypeScript skills, clean architecture, responsive UI/UX, proper error handling, and bonus features to show advanced capability.

**Time Estimate**  
- Core requirements: 4–6 hours  
- Bonuses (all): +2–4 hours  
- Total target: 6–10 hours

**Submission Requirements**  
- Public GitHub repository with clear commit history  
- Deployed live demo (Vercel / Netlify)  
- Detailed README.md  
- Email to: kevinlim@zuracharge.group, yieshenlee@zuracharge.group  
  - GitHub URL  
  - Live URL  
  - Time spent

## Technical Constraints (must follow)

- Framework: **React** (React Router for navigation)  
- Language: **TypeScript** (strongly recommended)  
- Styling: Any (Tailwind CSS chosen) — **no** Material-UI, Ant Design, Chakra, etc. → all UI custom  
- State Management: React hooks, Context API, or Redux → **hooks + Context API** chosen  
- HTTP Client: fetch or axios → **axios** chosen  
- **No UI/component libraries** allowed

## Chosen Tech Stack

| Category               | Tool/Library                          | Reason / Benefit                                      |
|------------------------|---------------------------------------|-------------------------------------------------------|
| Framework              | React 19+ + Vite                      | Fast dev server & build, modern defaults              |
| Routing                | React Router v6                       | Matches assignment preference                         |
| Language               | TypeScript                            | Type safety, better code quality score                |
| Styling                | Tailwind CSS                          | Rapid custom components, responsive, no UI lib        |
| HTTP Client            | Axios                                 | Clean params, interceptors, error handling            |
| Data Fetching & Cache  | TanStack Query v5 (@tanstack/react-query) | Caching, infinite scroll, loading states, retries     |
| State (client/UI)      | React hooks + Context API             | Simple shared state (filters, favourites)             |
| Virtualization (bonus) | react-window                          | Efficient large/infinite lists                        |
| Dev Tools              | React Query Devtools, ESLint, Prettier | Debugging & code quality                              |

## Core Requirements & Scoring (100 points)

| # | Requirement                              | Points | Status |
|---|------------------------------------------|--------|--------|
| 1 | Search (debounce 300–500ms, empty → popular) | 25     | Planned |
| 2 | Pagination (prev/next, page numbers, URL sync bonus) | 20     | Planned |
| 3 | Loading & error states (spinner, retry, 429 handling) | 15     | Planned |
| 4 | UI/UX (responsive, transitions, accessibility, lazy images) | 20     | Planned |
| 5 | Code quality (hooks, separation, types, comments, formatting) | 20     | Planned |

## Bonus Features (up to +25 points)

### Advanced Functionality (+15)

- [ ] Filtering (type, status, rating, year)
- [ ] Infinite scroll instead of classic pagination
- [ ] Expanded detail view (use /full endpoint)
- [ ] Favourites / bookmarking (localStorage)
- [ ] Sorting (title, score, popularity)

### Performance Optimization (+10)

- [ ] Caching strategy (TanStack Query built-in)
- [ ] Virtual scrolling for large lists (react-window)

## Folder Structure (as of Phase 1)
anime-search-zura/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── api/
│   │   └── animeApi.ts
│   ├── assets/
│   ├── components/
│   │   ├── AnimeCard/
│   │   ├── SearchInput.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Pagination.tsx
│   │   └── ErrorAlert.tsx
│   ├── context/
│   │   └── AppContext.tsx
│   ├── hooks/
│   │   ├── useAnimeSearch.ts
│   │   ├── useFavourites.ts
│   │   └── useDebounce.ts
│   ├── pages/
│   │   ├── ListingPage.tsx
│   │   └── DetailPage.tsx
│   ├── types/
│   │   └── anime.ts
│   ├── utils/
│   │   └── truncate.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md


## Development Phases (planned execution order)

1. **Phase 1 – Project Initialization** (done)  
   - Vite + React + TS  
   - Tailwind, dependencies, QueryClient setup  
   - Folder structure created  
   - Git init & first push

2. **Phase 2 – API Setup & Types**  
   - Define Jikan types  
   - Axios instance  
   - First test query

3. **Phase 3 – Search & Listing Page**  
   - Debounced search input  
   - Anime grid + cards  
   - Empty → popular anime

4. **Phase 4 – Pagination & States**  
   - Pagination controls  
   - Loading spinner (EV battery style)  
   - Error handling + retry

5. **Phase 5 – Detail Page**  
   - Route + fetch full anime data  
   - Hero + stats + synopsis

6. **Phase 6 – UI/UX Polish**  
   - Responsive design  
   - Transitions, accessibility  
   - EV theme (colors, neumorphism, icons)

7. **Phase 7 – Advanced Bonuses**  
   - Filters & sorting  
   - Infinite scroll  
   - Favourites (localStorage + context)

8. **Phase 8 – Performance Bonuses**  
   - Caching tuning  
   - Virtual scrolling

9. **Phase 9 – Testing, README, Deploy**  
   - Manual + edge case testing  
   - Write README  
   - Deploy Vercel/Netlify  
   - Final Lighthouse check

10. **Phase 10 – Submission**  
    - Email with URLs & time spent

## Design Theme Notes (EV-inspired)

- Colors: Electric Blue #007BFF, Eco Green #28A745, Anime Red #DC3545  
- Loading: animated battery charging  
- Cards: neumorphic shadows + green hover accent  
- Score/popularity: battery-style progress circle/bar  
- Dark mode toggle (optional stretch goal)

## Next Action

Phase 2: API setup, TypeScript types for Jikan responses, and first successful data fetch with TanStack Query.

---

**Last updated:** February 05, 2026  
**Next milestone:** Complete Phase 2 by [your target date/time]