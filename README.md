# Solid log

Login form made with SolidJS
![image](https://user-images.githubusercontent.com/73133951/231156857-e7a058f8-3609-496a-a714-12bb6943c40e.png) 
![image](https://user-images.githubusercontent.com/73133951/231156988-cf15ebc7-9f82-4de8-8906-27542a30285f.png)

**[See it live](https://solid-log.vercel.app)**

**Note: most inputs would produce error, use email `user@example.com` and any password longer than 5 characters to see success state.**

**To launch development build locally**: run `pnpm i` and then `pnpm dev`

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
