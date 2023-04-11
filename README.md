# Solid log

Login form made with SolidJS

![image](https://user-images.githubusercontent.com/73133951/230943843-95a9d03b-b98c-4bcd-84bb-3b85ec99717c.png) 
![image](https://user-images.githubusercontent.com/73133951/230943914-f78fa59f-194f-4ecf-8cb2-e48f83746451.png)

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
