# Zenvorn

## Current State
The project has a basic structure with a Motoko backend and React frontend. Previous build attempts failed due to complexity overload. The existing frontend may have partial Zenvorn news platform code from prior attempts.

## Requested Changes (Diff)

### Add
- Full Zenvorn news platform with 8 navigable pages: Home, World, Middle East, Politics, Analysis, US, Europe, Asia
- Pulsing LIVE breaking news ticker at the top
- Hero section with featured headline and Unsplash editorial photography
- Iran-Israel Conflict Focus section with 4 verified 2026 headlines
- Smart search bar with hover/keyboard-navigable article previews
- Article detail pages with full 500-800 word content, author (MD Aun), publish date (2026), category, reading time
- Dark mode toggle (white default, dark editorial mode)
- Fully responsive layout (mobile, tablet, desktop)
- Footer with Editorial Standards page link and Instagram @zenvorn

### Modify
- Replace any existing frontend with the new Zenvorn design
- Backend to store articles with metadata (id, title, category, content, author, date, readingTime, imageUrl)

### Remove
- Newsletter/subscription form
- Any placeholder or AI-generated illustration images
- Redundant or bloated sections
- Contact and About sections from footer

## Implementation Plan

### Backend
- Article type: id, title, excerpt, content, category, author, date, imageUrl, readingTime, isFeatured, isBreaking
- Seed data: ~20 articles across categories (World, Middle East, Politics, Analysis, US, Europe, Asia), all dated 2026
- Iran-Israel section: 4 specific headline articles as featured/breaking
- Query functions: getArticles, getArticleById, getArticlesByCategory, getFeaturedArticles, searchArticles

### Frontend
- React Router for multi-page navigation (Home, category pages, article detail)
- Navbar with logo "Zenvorn", category links, search bar, dark mode toggle
- Home page: breaking ticker, hero, Iran-Israel focus section, latest updates grid, trending strip
- Category pages: grid of article cards for that category
- Article detail page: full content, metadata, related articles
- Search: floating dropdown with article previews on type/hover
- Footer: Editorial Standards, Instagram @zenvorn, MD Aun credit
- Unsplash URLs for all images (curated editorial photography)
- Tailwind CSS for styling, clean white theme with navy accent
