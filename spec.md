# Zenvorn

## Current State
Zenvorn is a premium white editorial news platform with 20+ articles across 7 categories, a pulsing LIVE ticker, smart search with hover previews, dark mode toggle, fully responsive layout, article detail pages, and a dark editorial footer. Articles in `FALLBACK_ARTICLES` mostly have an empty `content` field (""), relying on a generic fallback in `ArticleFullContent` that renders 5 short generic paragraphs. The Iran-Israel conflict articles (ids 13-16) share the same `"israel-iran-full-content"` placeholder that triggers the long `IsraelIranArticleContent` component. Dark mode is toggled via `DarkModeToggle` in the navbar, powered by `useTheme` hook.

## Requested Changes (Diff)

### Add
- Full long-form article content (minimum 3 well-developed paragraphs, 400+ words) for every article in `FALLBACK_ARTICLES` that currently has `content: ""`. Each article must have:
  - Opening paragraph: strong, factual summary of the key event
  - Second paragraph: detailed context, background, and geopolitical implications
  - Third paragraph: reactions, consequences, expert analysis, or potential next developments
  - Additional paragraphs as needed to reach depth and journalistic quality
- A `fullContent` string field on each article in `FALLBACK_ARTICLES` (use the existing `content` field or store directly in a map keyed by slug)

### Modify
- `ArticleFullContent` component: replace the generic 5-paragraph fallback with article-specific content rendered from the article's `content` field (parsed as paragraphs). Each article should render its own unique long-form text.
- `FALLBACK_ARTICLES` in `useQueries.ts`: populate `content` field for all 20 articles (excluding id 11 which already uses `"israel-iran-full-content"` and id 13 which also uses it) with fully written long-form article body text (400+ words, 3+ paragraphs each).
- Iran-Israel conflict focus articles (ids 14, 15, 16): give these their own unique long-form content instead of reusing `"israel-iran-full-content"`. Only id 11 and id 13 should use that special flag.
- Remove the dark mode toggle button from the navbar entirely. Remove `DarkModeToggle` component usage from `NavBar`. Remove `theme` and `onThemeToggle` props from `NavBar`. Remove `useTheme` hook usage from `App`. Force light theme permanently (remove dark mode class logic, always use light). Clean up unused imports: `Moon`, `Sun` from lucide.
- `useTheme` hook: can be removed or simplified to always return `"light"` with a no-op toggle — but cleaner to just remove the whole hook and all related code.

### Remove
- Dark mode toggle button from the navbar UI
- `DarkModeToggle` component
- `useTheme` hook
- `theme` and `onThemeToggle` props passed through `NavBar` and `App`
- `Moon` and `Sun` imports from lucide-react
- Any `localStorage.setItem("zenvorn-theme", ...)` calls
- Any `root.classList.add("dark")` logic

## Implementation Plan
1. In `App.tsx`:
   - Remove `useTheme` hook definition
   - Remove `Moon`, `Sun` imports
   - Remove `DarkModeToggle` component
   - Remove `theme` and `onThemeToggle` from `NavBar` props interface and call site
   - Remove `DarkModeToggle` from NavBar render
   - In `App` root, remove `const [theme, toggleTheme] = useTheme()` and related props
   - Ensure `document.documentElement` never gets `.dark` class (no dark mode initialization)

2. In `useQueries.ts`:
   - Populate `content` field for all articles with `content: ""` with fully written 400-500+ word journalistic articles
   - Articles 14, 15, 16 get their own unique content strings (not `"israel-iran-full-content"`)
   - Articles 11 and 13 keep `"israel-iran-full-content"` unchanged

3. In `App.tsx` `ArticleFullContent`:
   - The existing logic already parses `article.content.split("\n\n")` — this will work once content is populated
   - Remove or simplify the fallback branch (the 5-paragraph generic placeholder) since all articles now have real content
   - Keep the `"israel-iran-full-content"` special case for ids 11 and 13
