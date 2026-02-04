# ZuraCharge Anime Search Take-Home Assignment  
**Project Plan, Phases, Requirements & Tech Stack**  
*Prepared by: iffat haikal (@iffathaikal7@gmail.com)*  
*Date: February 2026*

## Progress Tracker

- [x] Phase 1 – Project Initialization
- [x] Phase 2 – API Setup & Types
- [x] Phase 3 – Search & Listing Page
- [x] Phase 4 – Pagination & States
- [x] Phase 5 – Detail Page (full details, hero, stats, trailer, relations, links)
- [x] Phase 8 – Performance & Final Polish (Code splitting, Memoization, Progressive Images)
- [x] Phase 9 – Testing, README, Deploy
- [x] Phase 10 – Submission

## Project Overview

Build a **production-ready anime search and discovery application** using the **Jikan API** as a take-home assignment for ZuraCharge (EV charging solutions company, Malaysia).

**Goal**  
Demonstrate strong React + TypeScript skills, clean architecture, responsive UI/UX, proper error handling, and bonus features to show advanced capability.

**Time Estimate**  
- Core requirements: 4–6 hours
- **Actual time spent**: ~8 hours (including all bonus features)

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
- **No UI/component libraries** allowed. must build custom components

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
| Performance            | React.memo, Code Splitting, Progressive Images | Optimized rendering and loading                |
| Dev Tools              | React Query Devtools, ESLint, Prettier | Debugging & code quality                              |

## Core Requirements & Scoring (100 points)

| # | Requirement                              | Points | Status |
|---|------------------------------------------|--------|--------|
| 1 | Search (debounce 300–500ms, empty → popular) | 25     | ✅ Complete |
| 2 | Pagination (prev/next, page numbers, URL sync bonus) | 20     | ✅ Complete |
| 3 | Loading & error states (spinner, retry, 429 handling) | 15     | ✅ Complete |
| 4 | UI/UX (responsive, transitions, accessibility, lazy images) | 20     | ✅ Complete |
| 5 | Code quality (hooks, separation, types, comments, formatting) | 20     | ✅ Complete |

## Bonus Features (up to +25 points)

### Advanced Functionality (+15)

- [x] Filtering (type, status, rating)
- [x] Infinite scroll / Classic pagination toggle
- [x] Expanded detail view
- [x] Favourites / bookmarking (localStorage)
- [x] Sorting (title, score, popularity, date)

### Performance Optimization (+10)

- [x] Caching strategy (TanStack Query)
- [x] Code splitting (Lazy routes)
- [x] Component memoization
- [x] Progressive image loading
- [ ] Virtual scrolling for large lists (Stretch goal - not critical)

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
│   │   ├── AnimeCard.tsx
│   │   ├── SearchInput.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Pagination.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── SortDropdown.tsx
│   │   ├── DarkModeToggle.tsx
│   │   ├── InfiniteScrollToggle.tsx
│   │   └── ProgressiveImage.tsx
│   ├── context/
│   │   └── AppContext.tsx
│   ├── hooks/
│   │   ├── useAnimeSearch.ts
│   │   ├── useAnimeDetail.ts
│   │   └── useDebounce.ts
│   ├── pages/
│   │   ├── ListingPage.tsx
│   │   ├── DetailPage.tsx
│   │   └── FavouritesPage.tsx
│   ├── types/
│   │   └── anime.ts
│   ├── utils/
│   │   ├── debounce.ts
│   │   └── truncate.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── architectures/
│   ├── PROJECT_PLAN.md
│   ├── PERFORMANCE_PLAN.md
│   └── IMAGE_OPTIMIZATION.md
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
├── README.md
└── DEPLOYMENT.md


## Development Phases (planned execution order)

1. **Phase 1 – Project Initialization** (done)  
   - Vite + React + TS  
   - Tailwind, dependencies, QueryClient setup  
   - Folder structure created  
   - Git init & first push

2. **Phase 2 – API Setup & Types** (done)  
   - Define Jikan types  
   - Axios instance  
   - First test query

3. **Phase 3 – Search & Listing Page** (done)  
   - Debounced search input  
   - Anime grid + cards  
   - Empty → popular anime

4. **Phase 4 – Pagination & States** (done)  
   - Pagination controls  
   - Loading spinner (EV battery style)  
   - Error handling + retry

5. **Phase 5 – Detail Page** (done)  
   - Route + fetch full anime data  
   - Hero + stats + synopsis

6. **Phase 6 – UI/UX Polish** (done)  
   - Responsive design  
   - Transitions, accessibility  
   - EV theme (colors, glassmorphism, icons)

7. **Phase 7 – Advanced Bonuses** (done)  
   - Filters & sorting  
   - Infinite scroll toggle
   - Favourites (localStorage + context)

8. **Phase 8 – Performance Bonuses** (done)  
   - Code splitting
   - Component memoization
   - React Query tuning
   - Progressive image loading

9. **Phase 9 – Testing, README, Deploy** (done)  
   - Manual + edge case testing  
   - Write README  
   - Deploy Vercel/Netlify  
   - Final Lighthouse check

10. **Phase 10 – Submission** (done)  
    - Email with URLs & time spent

## Design Theme Notes (EV-inspired)

- Colors: Electric Blue #007BFF, Eco Green #28A745, Anime Red #DC3545  
- Loading: animated battery charging  
- Cards: glassmorphic panels + blue hover accent  
- Score/popularity: battery-style progress circle/bar  
- Dark mode toggle (implemented)

## Next Action
**Project Finalized**  
- ✅ All features implemented
- ✅ Performance optimized
- ✅ Documentation completed
- ✅ Ready for final review and delivery  
---

**Last updated:** February 05, 2026