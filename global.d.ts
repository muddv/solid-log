import { JSX } from 'solid-js'

declare module 'solid-js' {
    export namespace JSX {
        interface Directives {
            formSubmit: (ref: HTMLFormElement) => void
            validate: boolean
        }
    }
}
