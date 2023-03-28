import { JSX } from 'solid-js'

declare module 'solid-js' {
    export namespace JSX {
        interface Directives {
            formSubmit: Function
            validate: Function
        }
    }
}
