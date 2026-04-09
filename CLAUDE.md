# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (auto-opens browser)
npm run build      # Production build
npm run lint       # ESLint check
npm run lint-fix   # ESLint auto-fix
npm run format     # Prettier format
npm test           # Run all tests (vitest)
npx vitest run src/path/to/file.test.jsx  # Run a single test file
```

Husky runs `lint-staged` on commit, which auto-fixes ESLint issues on staged `.jsx`/`.js` files.

## Architecture

**Stack:** React 19, Vite, React Router v7, Firebase (Auth + Realtime Database), styled-components, Vitest + Testing Library.

**Entry point:** `src/main.tsx` → `src/App.jsx` → `src/TopRoutes.jsx`

**Routing has two tiers:**

1. `TopRoutes.jsx` — top-level routes: main site (`/*`), admin (`/admin/*`), pastor application, `/ce/` (removed/legacy page)
2. `MainWrapper.jsx` — all public pages under `/*`, wrapped in `GlobalStoreWrapper` (React context + `useReducer`)

All route path strings are centralized in `src/routePaths.js` (Proxy-guarded: accessing an undefined key throws). Always use this object rather than hardcoding path strings.

**Firebase integration:**

- `src/firebaseApp.js` initializes the Firebase app (Realtime Database + Auth)
- `src/main/Calendar/calendarDatesUtils.js` loads calendar events from Firebase on module load and exposes a pub/sub `listen`/`unlisten` API; `withDatesSubscription.jsx` is the HOC that subscribes components to calendar updates
- `src/main/Admin/Admin.jsx` handles Google Auth sign-in and permission checks against `user_groups/admins` in Firebase

**Global state (`src/stores/`):**

- `GlobalStoreWrapper.jsx` provides a React context with `useReducer`; manages a shopping cart (persisted via cookie) and view state
- `dailyVersesYear.js` — static array of 365 daily Bible verse references (one per day of the year)
- `weeklyMeditationsYear.jsx` — static array of weekly devotional content (JSX, one per week)
- `getVerseInfo.js` — fetches verse text from the Scripture API Bible (api.scripture.api.bible, ASV translation), with in-memory memoization

**Bible verse display:** Uses the Scripture API Bible (`ASV_ID = '06125adad2d5898a-01'`) with a hardcoded API key in `src/stores/getVerseInfo.js`.

**Pages (`src/main/`):**

- Public: `HomePage`, `ProfilePage`, `CalendarPage`, `WatchPage`, `MeditationsPage`, `BibleStudyPage`, `GivingPage`, `ContactPage`
- Admin: `Admin`, `EventAdmin`, `CcVbsAdminBase`, `SubscribedEmailsAdmin`
- Registration: `src/main/RegistrationPages/` — CC (Children's Church) and VBS (Vacation Bible School) registration flows with shared base components

**Shared UI components** live in `src/main/commonComponents/` — `Button`, `Checklist`, `Modal`, `Table`, `Textbox`, `Select`, `Textarea`, `InputLabel`, `InputError`, `ErrorList`, `Verse`, etc.

**Styling:** Global CSS variables are defined in `App.jsx` via `styled-components` `createGlobalStyle`. Use these CSS variables (e.g. `var(--maroon)`, `var(--gutter-space)`) rather than hardcoded values. Individual components use `styled-components` or co-located `.css` files.

**Testing:** Vitest with jsdom environment. Setup in `setupTest.js` (extends jest-dom matchers, stubs `window.scrollTo`). Mocks in `src/__mocks__/` for Firebase, file imports, and style imports.

## Conventions

- Prettier config: single quotes, no bracket spacing (`{foo}` not `{ foo }`)
- Mix of class components (older pages, Admin) and function components (newer code) — prefer function components for new work
- `src/utils/styleVariables.js` exports JS-accessible versions of CSS color/style values for use in styled-components when CSS variables aren't sufficient
