import { JSXElement } from "solid-js"

type Props = {
    message: string
    isError?: boolean
    element?: string
}

export function InputError(props: Props): JSXElement {
    return (
        <label
            for={props.element}
            class='-mt-6 mb-1 text-sm text-pink-600 text-opacity-90 transition-all dark:text-rose-200'
        >
            {props.message}
        </label>
    )
}

export function ApiMessage(props: Props): JSXElement {
    if (props.isError === undefined) props.isError = true
    return (
        <div
            class={`-mt-24 flex h-24 w-[22rem] items-center justify-center rounded border-2 border-opacity-20 bg-gray-200 text-center shadow-lg  dark:border-opacity-50 dark:bg-gray-700 dark:text-gray-50 ${
                props.isError && 'border-pink-600 dark:border-rose-800'
            } ${!props.isError && 'border-green-900 dark:border-green-500'}`}
        >
            <span class='mx-8'>{props.message}</span>
        </div>
    )
}
