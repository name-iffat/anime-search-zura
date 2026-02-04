# ZuraCharge Anime Search Application

A clean, fast, and user-friendly anime search & discovery web app built as a take-home assignment for ZuraCharge (EV charging solutions company, Malaysia).

 **[Live Demo](https://anime-search-zura.vercel.app)**  
 **[GitHub Repository](https://github.com/name-iffat/anime-search-zura)**

---

### 2. Install dependencies
npm install

### 3. Run in development mode (with hot reload)
npm run dev
→ open [http://localhost:5173](http://localhost:5173)

### 4. Build & preview production version
npm run build
npm run preview

##  Technologies Used & Why

| Tool/Library | Purpose | Why chosen |
| :--- | :--- | :--- |
| **React 19 + Vite** | Core framework & build tool | Lightning-fast dev server, instant HMR, tiny production bundles |
| **TypeScript** | Static typing | Catches bugs early, improves maintainability & code quality |
| **Tailwind CSS v4.1** | Styling | Rapid custom UI, no pre-built component libraries (matches constraint) |
| **React Router v6** | Client-side routing | Clean declarative routing — exactly what the assignment recommends |
| **Axios** | HTTP client | Simple query params, interceptors, clean error handling |
| **TanStack Query v5** | Data fetching, caching, infinite scroll | Handles loading/error/retry/caching perfectly, enables all bonuses easily |
| **Context API + hooks** | Client state (theme, favourites) | Built-in, lightweight — no need for Redux on a project this size |
| **react-window** | Virtual scrolling (performance bonus) | Tiny (~2 KB), makes long/infinite lists smooth without lag |
| **react-intersection-observer** | Infinite scroll trigger | Clean hook for detecting when to load more — zero visual impact |

> **Note:** All UI components are custom-built with Tailwind — no Material-UI, Ant Design, Chakra, MUI, etc.

---

##  Design & Feature Decisions

- **Dark mode** — system preference + manual toggle (persisted in localStorage).
- **EV-inspired theme** — electric blue accents, eco green success states, battery-style score indicators, neumorphic cards with green hover glow.
- **Infinite scroll** — primary experience (classic pagination kept as fallback).
- **Favourites** — full anime preview objects stored in localStorage (easier display vs storage size trade-off).
- **Rate limiting** — automatic retry with exponential backoff on 429 errors.
- **Accessibility** — ARIA labels, keyboard focus styles, semantic HTML.
- **Images** — loading="lazy", explicit width/height to prevent layout shifts.

---

##  Known Issues / Limitations

- **Duplicate / same-index anime cards during rapid pagination**
  - When clicking pages extremely quickly (especially on popular/top anime), you may briefly see duplicate cards or the same mal_id repeated during the loading transition.
  - *Cause:* Jikan sometimes returns overlapping high-score anime across pages + placeholderData shows previous page data while new page is fetching.
  - *Mitigation:* Composite keys (`${anime.mal_id}-${page}-${index}`) eliminate React key warnings, but very fast clicking can still cause a visual flash of duplicates. In production builds (minified, no dev overhead) this is almost unnoticeable.
- **Jikan API rate limits (429)**
  - Rapid pagination or many open tabs can trigger “Too Many Requests”.
  - *Mitigation:* Automatic retry with exponential backoff (up to 3 attempts) — delays results by a few seconds but prevents crashes.
- **Favourites storage limit**
  - Full anime objects saved → ~100–200 items max before localStorage quota warning (browser-dependent).
- **Trailer embeds**
  - Some YouTube trailers may not load due to embed restrictions or missing `embed_url` in API response.
- **No server-side rendering / SEO**
  - Pure client-side app — not required for this assignment.

---

##  Tested on
Chrome, Firefox, Edge (desktop & mobile)

## ⏱ Time spent
~6 hours

---

Thanks for reviewing!  
Feel free to reach out if you have questions or feedback.

— **iffat haikal**