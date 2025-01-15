# Incard Tech Assessment in React JS

## My submission

[Deployed site](https://incard-tech-assessment-auth.vercel.app/home).
[GitHub repository](https://github.com/jamesdiffeycoding/Incard-tech-assessment-auth).

### Task overview

This tech test assignment was assigned by Incard. Instructions are below:

Create a React app in TS with your preferred tools. We are looking at structure, tools, and any best practices applied to improve productivity.

### Requirements - all met (✔)

- at least two pages: login and home page
- login should take users to home page - use 'incard' for username/password
- handle errors if incorrect details entered or session expired (I implemented data validation and an incorrect credentials message)
- session should be persistent on reload until session expires (I added a login expiration timeout, since the site would contain valuable information)
- support SSR
- create 2-3 unit tests (I added additional E2E tests)
- deploy the app to Vercel

## Decisions and guidance

- NextJS used for SSR
- Vitest used for Unit testing, files end with '.test.ts': currently cover self-built functions, such as confirming valid credential inputs or generating login expiry dates in the future.
- React Hook Form used for sign in form and error handling
- TypeScript used for type-checking
- local storage used for maintaining login expiry
- layout shift from data validation messages minimised
- Playwright used for End-To-End (E2E) testing: currently covers user flow of signing in, authentication and redirects.
- useContext hook used to share authorisation state around multiple pages
- redirects used to ensure up-to-date login status
- helper functions and constants including authorisation duration organised in /utils
- InCard branding used where possible including their logo, favicon and images from [their website](https://www.incard.co/).
