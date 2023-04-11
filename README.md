# Solid log

Login form made with SolidJS\

![image](https://user-images.githubusercontent.com/73133951/231157436-c8c52ec9-001a-4db4-a26e-30bcedf554eb.png)
![image](https://user-images.githubusercontent.com/73133951/231157509-702ddcb5-3bff-48e3-af6e-5e8981bec905.png)

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
