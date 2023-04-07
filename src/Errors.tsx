type Props = {
    message: string
    element?: string
}

export function InputError(props: Props) {
    return (
        <label
            for={props.element}
            class='-mt-6 mb-1 text-sm text-pink-600 text-opacity-90 transition-all dark:text-rose-200'
        >
            {props.message}
        </label>
    )
}

export function ApiError(props: Props) {
    return (
        <div class='-mt-24 flex h-24 w-96 w-[22rem] items-center justify-center rounded border border-2 border-pink-600 border-opacity-20 bg-gray-200 text-center shadow-lg dark:border-rose-800 dark:border-opacity-50 dark:bg-gray-700 dark:text-gray-50'>
            <span class='mx-8'>{props.message}</span>
        </div>
    )
}
