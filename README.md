## Solid log

Login form made with solid.js and other things

tailwind
prettier + tailwind plugin
eslint + typescript rules

## TODO

-   make logout button red
-   press send with enter
-   check if `import jsx from solid` in global.d.ts affects bundle size
-   eslint rule to group imports
-   eslint rule to prefer function() JSX elements
-   animate only button for motion-reduced
-   reset api errors on `sending`
-   finish disabled feedback on sending
-   replace 'pwd' with 'password' everywhere

## DONE

-   add loader while fetch is executing: form:inactive, progress animation on top
-   `<Welcome />` placeholder
-   figure out a way for `isAuthed` to persist
-   display api errors in interface
-   fix form widht for pwd too short error
-   _field_ is required vs enter valid _field_ error feedback
-   turn on suggestions for form
-   add light/dark mode
-   move <Label> element
