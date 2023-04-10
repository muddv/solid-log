import { Navigate } from '@solidjs/router'
import { JSXElement, Show } from 'solid-js'
import { useAuth } from './Auth'

function Welcome(): JSXElement {
    const [isAuthed, { logout }] = useAuth()
    return (
        <Show when={isAuthed()} fallback={<Navigate href='/login' />}>
            <div class='flex min-h-screen w-screen flex-col items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50'>
                <h1 class='text-2xl font-semibold'>Welcome</h1>
                <button
                    onClick={(): void => logout()}
                    class='mt-5 h-10 rounded border bg-gray-600 p-2 text-gray-50 invalid:border-pink-500 hover:bg-gray-800 active:bg-gray-900 dark:border-gray-400 dark:bg-slate-800 dark:hover:bg-gray-900'
                >
                    log out
                </button>
            </div>
        </Show>
    )
}

export default Welcome
