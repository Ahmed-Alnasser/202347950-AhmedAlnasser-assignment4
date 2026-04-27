# Technical Documentation

## Project Overview

Ahmed Alnasser Portfolio is a static personal web application built for SWE363 Assignment 4. It presents personal background, skills, projects, achievements, contact options, and an AI-assisted message summarizer.

The application is intentionally lightweight. It uses semantic HTML, modular CSS, and vanilla JavaScript without a build system. This makes the site easy to inspect, run locally, and deploy through GitHub Pages.

## Architecture

The app follows a simple static-site architecture:

```text
Browser
  |
  | loads
  v
index.html
  |
  | references
  v
css/*.css + js/*.js + assets/*
  |
  | optional external services
  v
EmailJS + Transformers.js CDN
```

Key design decisions:

- Keep the HTML document as the source of page content.
- Split CSS by responsibility instead of using one large stylesheet.
- Split JavaScript by feature so each script has a narrow purpose.
- Use progressive enhancement so optional features can fail gracefully.
- Deploy the static site directly from the repository root.

## Main Files

### `index.html`

Responsibilities:

- Defines the page structure and semantic sections.
- Contains SEO metadata, Open Graph metadata, favicon, and external script/style references.
- Provides content for hero, about, skills, projects, achievements, contact form, modals, and footer.
- Loads CSS and JavaScript files.

### `css/base.css`

Responsibilities:

- Theme variables.
- Global reset.
- Typography defaults.
- Shared base styles for images, links, headings, and form typography.

### `css/layout.css`

Responsibilities:

- Header and navigation layout.
- Main content container.
- Footer layout and social links.

### `css/sections.css`

Responsibilities:

- Shared section spacing and reveal behavior.
- Collapsible section heading styles.
- Hero, about, skills, and achievements section styles.

### `css/components.css`

Responsibilities:

- Skip link.
- Project cards.
- Certificate modals and gallery controls.
- Contact form.
- AI summarizer widget.
- Back-to-top button.
- Toast messages and focus indicators.

### `css/responsive.css`

Responsibilities:

- Mobile navigation layout.
- Mobile hero, project, modal, and form adjustments.
- Reduced-motion behavior.
- Print styles.

## JavaScript Modules

### `js/errors.js`

Adds a global safety net for unexpected runtime errors and unhandled promise rejections. It displays a friendly toast message instead of allowing silent failures.

### `js/theme.js`

Controls dark/light mode.

Behavior:

- Reads saved theme from `localStorage`.
- Falls back to the system color preference when no saved value exists.
- Updates the theme button label and accessibility attributes.
- Shows a small notice if theme preference cannot be saved.

### `js/state.js`

Manages persistent UI state for collapsible sections.

Behavior:

- Wraps section content in collapsible containers.
- Stores collapsed section IDs in `localStorage`.
- Updates the "Collapse All / Expand All" button.
- Supports keyboard activation on section headings.

### `js/nav.js`

Controls mobile navigation.

Behavior:

- Opens and closes the hamburger menu.
- Updates `aria-expanded` and the menu button label.
- Closes the menu after clicking a navigation link.
- Closes the menu on Escape or when resizing back to desktop.

### `js/typewriter.js`

Runs the hero tagline typing animation.

Behavior:

- Uses the tagline text already present in HTML.
- Types and deletes the string in a loop.
- Respects `prefers-reduced-motion`.

### `js/modals.js`

Controls achievement certificate dialogs.

Behavior:

- Opens modals from achievement buttons.
- Closes modals using close buttons, Escape, or backdrop click.
- Traps keyboard focus inside the active dialog.
- Restores focus to the triggering element after close.
- Controls the Oxford certificate gallery.

### `js/contact.js`

Controls the contact form.

Behavior:

- Initializes EmailJS when available.
- Validates form fields before sending.
- Updates message character counter.
- Shows success and error status messages.
- Provides direct email fallback text when EmailJS is unavailable.

### `js/summarize.js`

Controls the AI message summarizer.

Behavior:

- Imports `@xenova/transformers` from a CDN.
- Loads `Xenova/distilbart-cnn-6-6` on demand.
- Requires a minimum message length before summarizing.
- Warns the user before local inference because the page may freeze briefly.
- Lets the user replace the original message with the generated summary.
- Handles model or network failures with a user-facing message.

### `js/scroll.js`

Controls scroll-related enhancements.

Behavior:

- Adds reveal-on-scroll animation using `IntersectionObserver`.
- Respects reduced-motion preferences.
- Shows a back-to-top button after scrolling.

## Data And State

The application does not use a database.

Client-side state:

- `localStorage.theme`: saved dark/light mode.
- `localStorage.portfolioState`: saved collapsed section state.
- Form field values are only held in the browser until submission.

Contact form delivery:

- EmailJS sends form data using configured public client credentials.
- If EmailJS fails to load or send, the user is instructed to email directly.

AI summarization:

- The user's message is processed locally in the browser by Transformers.js.
- The app does not send message content to a custom backend.

## Accessibility And UX

Implemented accessibility and usability features:

- Semantic HTML sections and headings.
- Skip-to-content link.
- Keyboard-visible focus outline.
- Keyboard-operable collapsible sections.
- Modal focus trapping and focus restoration.
- Escape key support for modals and mobile navigation.
- `aria-live` regions for contact and summarizer status messages.
- `aria-expanded`, `aria-controls`, and `aria-hidden` attributes where appropriate.
- Reduced-motion support for users who prefer less animation.
- Responsive layouts for mobile screens.

## Performance

Performance-focused choices:

- Static site with no framework or build bundle.
- CSS split by responsibility for maintainability.
- Deferred JavaScript loading.
- Lazy loading for non-critical images.
- Inline SVG favicon to avoid an extra request.
- Font Awesome loaded with preload/onload swap.
- AI model loaded only when the user clicks the summarizer button.
- Images use explicit width and height attributes to reduce layout shifts.

## Error Handling

Graceful error handling includes:

- Global toast for unexpected JavaScript errors.
- Contact form fallback when EmailJS is missing or fails.
- Summarizer fallback when model loading or inference fails.
- Local storage try/catch blocks for browser privacy or quota restrictions.
- Defensive element checks in JavaScript modules.

## Deployment

The site is deployed with GitHub Pages.

Live URL:

```text
https://ahmed-alnasser.github.io/202347950-AhmedAlnasser-assignment4/
```

Workflow file:

```text
.github/workflows/pages.yml
```

Deployment process:

1. Push changes to the `main` branch.
2. GitHub Actions runs the Pages workflow.
3. The repository root is uploaded as a static site artifact.
4. GitHub Pages publishes the artifact.

## Local Development

Run the static site locally:

```bash
python3 -m http.server 8020
```

Then open:

```text
http://localhost:8020
```

No `npm install`, build step, or backend server is required.

## Testing And Verification

Manual and command-line checks used during development:

- Confirmed the GitHub Pages URL returns `HTTP 200`.
- Confirmed deployed CSS and JavaScript assets return `HTTP 200`.
- Ran JavaScript syntax checks with `node --check`.
- Checked local file references from HTML.
- Used `git diff --check` to catch whitespace issues.
- Verified responsive behavior through CSS media queries and browser resizing.
- Tested modal open/close behavior, Escape handling, focus behavior, and gallery controls.
- Tested contact-form validation and fallback status messages.

## Known Limitations

- First-time AI summarizer use can be slow because the browser downloads the model.
- Browser inference can briefly freeze the page on slower devices.
- EmailJS is a third-party service and can fail if the service is unavailable or rate-limited.
- There is no backend database or admin interface.
- The final `demo-video.mp4` must be recorded manually for presentation submission.

## Maintenance Notes

- Keep new CSS in the file that matches its responsibility.
- Keep each JavaScript file focused on one feature.
- When adding new assets, use clear filenames and update alt text.
- Re-test the GitHub Pages deployment after changing paths or file names.
- Update this documentation when adding features, dependencies, or deployment changes.
