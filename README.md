# GVON-G Categories: Landing Page

A modern, fully responsive landing page for GVON-G Categories, a fast-paced
multiplayer word game where players name answers in different categories
before time runs out.

Built from a design mockup with Next.js, TypeScript and custom CSS.
No UI libraries or Tailwind.

## Features

- Responsive from small phones to large desktop screens
- Sticky header with a mobile menu
- Hero section, stats bar and feature cards
- Swipeable themes carousel with arrows and dots
- How It Works and testimonials sections
- Call-to-action banner and footer
- Accessible markup (semantic HTML, aria labels, reduced-motion support)

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- CSS Modules
- Poppins font via `next/font`

## Getting Started

    npm install
    npm run dev

Open http://localhost:3000 in your browser.

## Project Structure

    src/
    ├── app/                     # layout, page, global styles
    └── features/landing/
        ├── containers/          # LandingPage (holds all sections)
        └── components/          # one folder per section

## Status

In progress. Header through How It Works are done. Testimonials,
final CTA and footer are next.# next-js-landing-page
