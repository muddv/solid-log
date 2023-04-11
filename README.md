# Solid log

Login form made with SolidJS

![image](https://user-images.githubusercontent.com/73133951/231157685-612c793b-fbed-4749-8bbe-2f26a8af86ee.png)
![image](https://user-images.githubusercontent.com/73133951/231157623-71812afc-cdad-4a3c-89c9-6a9212f1d15b.png)

**[See it live](https://solid-log.vercel.app)**

**Note: most inputs would produce error, use email `user@example.com` and any password longer than 5 characters to see success state.**

**To launch development build locally**: run `pnpm i` and then `pnpm dev`

## Features:

-   Light/dark mode
-   Native HTML validation
-   Feedback for different types of errors, and different form states
-   Placeholders for different pages, restricted access depending on whether user is logged in or not
-   Small bundle size, perfect lighthouse scores (which is easy for a small app made with Solid)

## Made with

-   `solidjs` and `solid-router`
-   Styles with `tailwind` using `postcss`
-   `eslint` with reccomended and typescript reccomended configs,
    `prettier` with tailwind plugin, typescript
-   Vite
