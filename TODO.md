# TODO List

## Server

- [ ] Upgrade Ubuntu 16.04 to a newer LTS version (currently running very old Node/npm due to OS constraints)

## Church Site

- [ ] Consider simplifying WatchPage archive videos to use YouTube thumbnail JPGs linking to the video instead of embedded iframes
- [ ] Improve the design of the admin pages
- [ ] Review newer mostly AI-written code (SermonAdmin, MeditationAdmin, VersesAdmin, API routes)

## Infrastructure

- [ ] Consider Docker for the nginx/express/react setup

## Future Features

- [ ] Figure out how to have Firebase Google sign-in show a friendly app name instead of the default app identifier
- [ ] Rethink page background colors — home and contact use dark backgrounds while everything else is light, causing awkwardness with shared components (e.g. link colors)
- [ ] Research email/communication sending options for the site — use cases include user-initiated contact forms, API-triggered notifications (data updated), and admin registration requests

## Testing

- [ ] Improve test coverage — aim for full coverage throughout, especially newer AI-written code

## Dev Environment

- [ ] Address 24 npm vulnerabilities flagged by Dependabot (15 high, 8 moderate, 1 low) — see https://github.com/EJLearner/church-site-react/security/dependabot
