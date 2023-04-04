import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Show } from 'solid-js'

import { useForm } from '../lib/useForm'
import { useAuth } from './Auth'
import { Welcome } from './Weclome'
import { Navigate } from '@solidjs/router'

type Props = {
    message: string
}

function InvalidInputMessage(props: Props) {
    return (
        <div class='-mt-7 mb-1 text-sm text-pink-600 text-opacity-90 transition-all dark:text-rose-200'>
            {props.message}
        </div>
    )
}

function ApiError(props: Props) {
    return (
        <div class='-mt-24 flex h-24 w-96 flex-none items-center justify-center rounded border border-2 border-pink-600 border-opacity-20 bg-gray-200 text-center shadow-lg dark:border-rose-800 dark:border-opacity-50 dark:bg-gray-700 dark:text-gray-50'>
            <span class='mx-8'>{props.message}</span>
        </div>
    )
}

export function Login() {
    const { validate, formSubmit, errors, postForm, sending } = useForm({
        errorClass: [
            'invalid:bg-pink-500',
            'invalid:bg-opacity-20',
            'invalid:dark:bg-rose-800',
            'invalid:dark:bg-opacity-50'
        ]
    })
    const [inputs, setInputs] = createStore({ email: '', password: '' })
    const [showPwd, setShowPwd] = createSignal(false)

    function submit(form: HTMLFormElement) {
        postForm(form, login)
    }

    const [isAuthed, { login, logout }] = useAuth()

    return (
        <Show when={!isAuthed()} fallback={<Navigate href='/' />}>
            <div class='flex min-h-screen w-screen flex-none flex-col items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50'>
                {errors.api && <ApiError message={errors.api} />}
                <main
                    class={`mt-10 w-96 rounded border bg-gray-200 py-10 px-16 shadow-lg dark:border-gray-400 dark:bg-gray-700`}
                >
                    <h1 class='mb-4 text-center text-xl'>Log in</h1>
                    <form
                        use:formSubmit={submit}
                        method='post'
                        action='http://localhost:8000/login'
                        class='flex flex-col'
                    >
                        <div class='flex flex-col gap-1'>
                            <label for='email'>Email</label>
                            <input
                                readonly={sending()}
                                id='email'
                                type='email'
                                name='email'
                                required
                                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                                class='peer mb-6 h-10 w-full rounded p-2 transition-colors read-only:bg-slate-400 hover:shadow-md focus:shadow-md focus:outline-none dark:bg-gray-900 dark:read-only:bg-gray-800'
                                placeholder='You@example.com'
                                onInput={(e) => {
                                    let target = e.target as HTMLInputElement
                                    setInputs('email', target.value)
                                }}
                            />
                            {errors.email && (
                                <InvalidInputMessage message={errors.email} />
                            )}
                        </div>

                        <div class='flex flex-col gap-1'>
                            <label for='password'>Password</label>
                            <input
                                readonly={sending()}
                                id='password'
                                name='password'
                                type={showPwd() ? 'text' : 'password'}
                                required
                                minlength={6}
                                class='peer mb-6 h-10 w-full rounded p-2 transition-colors read-only:bg-slate-400 hover:shadow-md focus:shadow-md focus:outline-none dark:bg-gray-900 dark:read-only:bg-gray-800'
                                placeholder='Your password'
                                onInput={(e) => {
                                    let target = e.target as HTMLInputElement
                                    setInputs('password', target.value)
                                }}
                            />
                            {errors.password && (
                                <InvalidInputMessage
                                    message={errors.password}
                                />
                            )}
                        </div>

                        <div>
                            <input
                                disabled={sending()}
                                class='mr-2 mb-4 accent-gray-600'
                                type='checkbox'
                                id='show-pwd'
                                onChange={() => {
                                    setShowPwd(!showPwd())
                                }}
                            />
                            <label for='show-pwd'>Show password</label>
                        </div>

                        <div>
                            <input
                                disabled={sending()}
                                class='mr-2 mb-4 accent-gray-600'
                                type='checkbox'
                                id='remember'
                            />
                            <label for='remember'>Remember me </label>
                        </div>
                        <button
                            type='submit'
                            disabled={sending()}
                            class={`h-10 rounded border bg-gray-600 p-2 text-gray-50 invalid:border-pink-500 hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-600 dark:border-gray-400 dark:bg-gray-900  ${
                                sending() && 'animate-pulse'
                            }`}
                        >
                            Log in
                        </button>
                    </form>
                    <div class='mt-2 text-left'>
                        <a class='cursor-pointer text-center text-gray-800 hover:underline dark:text-gray-50'>
                            Forgot your password?
                        </a>
                    </div>
                </main>
            </div>
        </Show>
    )
}
