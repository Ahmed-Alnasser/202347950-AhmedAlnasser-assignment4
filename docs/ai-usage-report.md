# AI Usage Report

This report documents how AI tools were used during SWE363 Assignment 4 and how their output was reviewed, modified, and integrated responsibly.

## Tools Used And Use Cases

### ChatGPT / Codex

Use cases:

- Reviewed assignment requirements and mapped them to repository files.
- Suggested implementation improvements for professional quality, accessibility, responsiveness, and deployment.
- Helped debug JavaScript behavior in the contact form, modal system, theme handling, and AI summarizer.
- Helped draft documentation files, presentation notes, and deployment instructions.
- Helped configure GitHub Pages deployment through GitHub Actions.

### Claude

Use cases:

- Assisted with general code-generation ideas and alternative wording for documentation.
- Supported brainstorming for UI improvements and portfolio feature descriptions.
- Helped review explanations for clarity and completeness.

### Browser-Based AI Library: Transformers.js

Use case inside the application:

- Powers the "Summarize my message" feature in the contact form.
- Runs summarization locally in the visitor's browser.
- Allows the user to replace a long message with a shorter summary before sending.

## Benefits

- Faster debugging and iteration on small UI and JavaScript issues.
- Better coverage of assignment requirements because the checklist could be reviewed systematically.
- Improved documentation quality by using AI to draft structure, then editing for accuracy.
- More polished user experience through suggestions around accessibility, validation, reduced motion, error handling, and deployment readiness.
- Practical exposure to client-side AI through Transformers.js and local browser inference.

## Challenges And Limitations

- AI suggestions sometimes needed correction to match the existing file structure and project constraints.
- Some generated wording was too generic and had to be rewritten to accurately describe this portfolio.
- Browser AI models can be heavy; the app needs to warn users before local inference freezes the page.
- Third-party libraries and services can fail or load slowly, so AI-suggested integrations required defensive error handling.
- Deployment instructions needed verification against the real GitHub repository rather than relying on assumptions.

## Learning Outcomes

- Learned how to separate a static web app into focused HTML, CSS, and JavaScript files.
- Learned how to document technical architecture in a way that is useful for both graders and future maintainers.
- Learned how GitHub Pages can deploy a static site from GitHub Actions.
- Learned that responsible AI use requires testing, editing, and understanding the final code instead of accepting suggestions blindly.
- Learned how browser-based AI can support a specific user workflow while still preserving privacy.

## Responsible Use And Modifications

AI output was not submitted unchanged. Each suggestion was reviewed and adapted before being kept.

Examples of review and modification:

- Checked generated code against the actual repository structure before applying changes.
- Kept the existing plain HTML/CSS/JavaScript architecture instead of adding unnecessary frameworks.
- Reworked UI text to match Ahmed Alnasser's actual portfolio, projects, and assignment requirements.
- Tested JavaScript syntax with `node --check`.
- Verified local file references and deployment URLs after changes.
- Confirmed that the deployed GitHub Pages site returns `HTTP 200`.

## Academic Integrity Statement

AI tools were used as development assistants for planning, debugging, review, and documentation support.
The final project was reviewed, modified, and assembled by the student.
The submitted work represents the student's understanding of the portfolio structure, features,
deployment process, and AI integration.
