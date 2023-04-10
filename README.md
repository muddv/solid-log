# Solid log
Login form made with SolidJS\
**[See it live](https://solid-log.vercel.app)**

**To launch development build locally**: run `pnpm i` and then `pnpm dev`

**Note: most inputs would produce error, use email `user@example.com` and any password longer than 5 characters to see success state.**

## Features: 
- Light/dark mode
- Native HTML validation
- Feedback for different types of errors, and different form states
- Placeholders for different pages, restricted access depending on whether user is logged in or not
- Small bundle size, perfect lighthouse scores (which is easy for a small app made with Solid)

## Made with
- `solidjs` and `solid-router`
- Styles with `tailwind` using `postcss`
- `eslint` with reccomended and typescript reccomended configs,
  `prettier` with tailwind plugin, typescript
- Vite

## TODO
-   [ ] clean up `postForm()` vs `formSubmit()`
-   [ ] clean up returns in `postForm()`
-   [x] lazy load welcome and forgot password pages
-   [x] type function returns
-   [x] clean up styles
-   [x] move reusable components and function to a separate file
-   [ ] optimize css file size
-   [x] do not cut off api mistake on mobile
-   [x] add "forgot password" placeholder
-   [x] implement working "remember me" button
-   [ ] make styles in "forgot password" consistant with login form
-   [ ] try to fix gh-pages deploy
-   [ ] try to avoid custom width for form and api error
-   [x] fix width for mobile
-   [x] make sure api error is visible on mobile
-   [x] add favicon to index.html
-   [x] change form action url from localhost
-   [x] add option to display success state for backendless deploy
-   [ ] add branch with mock backend which showcases "real" logic
-   [x] add favicon
-   [x] display correct url when user tries to visit `protected` pages and is sent away
-   [x] clean up code, use `function()` insted of `const = () => {}`
-   [x] add loader while fetch is executing: form:inactive, progress animation on top
-   [x] `<Welcome />` placeholder
-   [x] figure out a way for `isAuthed` to persist
-   [x] display api errors in interface
-   [x] fix form widht for pwd too short error
-   [x] _field_ is required vs enter valid _field_ error feedback
-   [x] turn on suggestions for form
-   [x] add light/dark mode
-   [x] move <Label> element
