# Ahmed Alnasser Portfolio - SWE363 Assignment 4

Personal portfolio web application for Ahmed Alnasser, a KFUPM Computer Science student focused on Artificial Intelligence, applied projects, and technical leadership.

This repository is the final stage of the SWE363 multi-stage portfolio assignment. It refines the Assignment 3 baseline into a complete, deployed, documented, and presentation-ready web application.

## Live Deployment

GitHub Pages:

https://ahmed-alnasser.github.io/202347950-AhmedAlnasser-assignment4/

Repository:

https://github.com/Ahmed-Alnasser/202347950-AhmedAlnasser-assignment4

## Features

- Responsive personal portfolio layout with sections for About, Skills, Projects, Achievements, and Contact.
- Dark/light theme toggle with saved user preference.
- Collapsible sections with persistent state.
- Mobile hamburger navigation.
- Hero typewriter animation with reduced-motion support.
- Project showcase with real screenshots and links to GitHub/PDF artifacts.
- Certificate modals for Oxford and KGSP achievements, including gallery controls.
- EmailJS contact form with validation, live character counter, and user-facing status messages.
- Browser-based AI message summarizer using Transformers.js.
- Back-to-top button and scroll reveal animations.
- SEO metadata, Open Graph tags, inline SVG favicon, and accessible skip link.
- GitHub Pages deployment through GitHub Actions.

## How to Run Locally

The site is static and does not require a build step. A local server is recommended because the app uses JavaScript modules and external browser libraries.

1. Clone the repository:

```bash
git clone https://github.com/Ahmed-Alnasser/202347950-AhmedAlnasser-assignment4.git
```

2. Enter the project folder:

```bash
cd 202347950-AhmedAlnasser-assignment4
```

3. Start a local static server:

```bash
python3 -m http.server 8020
```

4. Open the site:

```text
http://localhost:8020
```

## Project Structure

```text
202347950-AhmedAlnasser-assignment4/
|-- .github/
|   `-- workflows/
|       `-- pages.yml
|-- README.md
|-- index.html
|-- css/
|   |-- base.css
|   |-- components.css
|   |-- layout.css
|   |-- responsive.css
|   `-- sections.css
|-- js/
|   |-- contact.js
|   |-- errors.js
|   |-- modals.js
|   |-- nav.js
|   |-- scroll.js
|   |-- state.js
|   |-- summarize.js
|   |-- theme.js
|   `-- typewriter.js
|-- assets/
|   |-- images/
|   `-- pdf/
|-- docs/
|   |-- ai-usage-report.md
|   `-- technical-documentation.md
|-- presentation/
|   |-- presentation.md
|   |-- slides.html
|   |-- slides.pdf
|   |-- speaker-notes.md
|   `-- recording-checklist.md
`-- .gitignore
```

## Technology Stack

- HTML5 for semantic page structure.
- CSS3 for responsive layout, theme variables, and component styling.
- Vanilla JavaScript for client-side interaction.
- EmailJS for contact form delivery.
- Transformers.js for browser-based AI summarization.
- GitHub Actions and GitHub Pages for deployment.

## AI Usage Summary

AI tools were used for code review, debugging support, UI/UX suggestions, documentation drafting, and improving the browser-based AI summarizer workflow. All AI-assisted suggestions were reviewed, edited, and tested before being kept.

Detailed AI documentation is available in:

```text
docs/ai-usage-report.md
```

## Documentation

- `docs/technical-documentation.md` explains the architecture, modules, data flow, deployment, testing, and maintenance notes.
- `docs/ai-usage-report.md` documents tools used, benefits, challenges, learning outcomes, and responsible use.
- `presentation/presentation.md` summarizes the presentation deliverables and recording workflow.

## Deployment

Deployment is handled by `.github/workflows/pages.yml`.

On every push to `main`, GitHub Actions uploads the repository root as a static site artifact and publishes it to GitHub Pages.

## Known Limitations

- The AI summarizer downloads a browser model on first use, so the first run can be slow.
- Email delivery depends on EmailJS availability and configured service/template credentials.
- The presentation video must be recorded manually as `presentation/demo-video.mp4` before final submission.

## Author

Ahmed Alnasser

- Student ID: 202347950
- Major: Computer Science
- University: King Fahd University of Petroleum and Minerals
- Email: itzzmega2005@gmail.com
- GitHub: https://github.com/megaunit

## License

This project was created for SWE363 Assignment 4. All personal content, images, and documents belong to Ahmed Alnasser unless otherwise stated.
