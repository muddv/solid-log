import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Show } from 'solid-js'
import { Navigate, A } from '@solidjs/router'

import { useForm } from '../lib/useForm'
import { validateEmail, validatePassword } from '../lib/validators'
import { useAuth } from './Auth'
import { InputError, ApiError } from './Errors'

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
            <div class='-mt-90 flex min-h-screen w-screen flex-none flex-col items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50'>
                {errors.api && <ApiError message={errors.api} />}
                <main
                    class={`mt-2 w-[22rem] rounded border bg-gray-200 px-12 py-10 shadow-lg dark:border-gray-400 dark:bg-gray-700 md:mt-8`}
                >
                    <h1 class='mb-4 text-center text-xl'>Log in</h1>
                    <form
                        use:formSubmit={submit}
                        method='post'
                        action='http://localhost:8000/login'
                        class='flex flex-col'
                    >
                        <div class='flex flex-col '>
                            <label for='email'>Email</label>
                            <input
                                use:validate={validateEmail}
                                readonly={sending()}
                                id='email'
                                type='email'
                                name='email'
                                required
                                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                                class='mb-6 h-10 w-full rounded p-2 transition-colors read-only:bg-slate-400 hover:shadow-md focus:shadow-md focus:outline-none dark:bg-gray-900 dark:read-only:bg-gray-800'
                                placeholder='You@example.com'
                                onInput={(e) => {
                                    let target = e.target as HTMLInputElement
                                    setInputs('email', target.value)
                                }}
                            />
                            {errors.email && (
                                <InputError
                                    message={errors.email}
                                    element='email'
                                />
                            )}
                        </div>

                        <div class='g flex flex-col'>
                            <label for='password'>Password</label>
                            <input
                                use:validate={validatePassword}
                                readonly={sending()}
                                id='password'
                                name='password'
                                type={showPwd() ? 'text' : 'password'}
                                required
                                minlength={6}
                                class='mb-6 h-10 w-full rounded p-2 transition-colors read-only:bg-slate-400 hover:shadow-md focus:shadow-md focus:outline-none dark:bg-gray-900 dark:read-only:bg-gray-800'
                                placeholder='Your password'
                                onInput={(e) => {
                                    let target = e.target as HTMLInputElement
                                    setInputs('password', target.value)
                                }}
                            />
                            {errors.password && (
                                <InputError
                                    message={errors.password}
                                    element='password'
                                />
                            )}
                        </div>

                        <div>
                            <input
                                disabled={sending()}
                                class='mb-4 mr-2 accent-gray-600'
                                type='checkbox'
                                id='show-password'
                                onChange={() => {
                                    setShowPwd(!showPwd())
                                }}
                            />
                            <label for='show-password'>Show password</label>
                        </div>

                        <div>
                            <input
                                readonly={sending()}
                                class='mb-4 mr-2 accent-gray-600'
                                type='checkbox'
                                id='remember'
                                name='remember'
                            />
                            <label for='remember'>Remember me</label>
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
                        <A
                            href='/reset-password'
                            class='cursor-pointer text-center text-gray-800 hover:underline dark:text-gray-50'
                        >
                            Forgot your password?
                        </A>
                    </div>
                </main>
            </div>
        </Show>
    )
}
