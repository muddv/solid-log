import { createSignal, Show } from 'solid-js'

import { useAuth } from './Auth'
import { validateEmail } from '../lib/validators'
import { useForm } from '../lib/useForm'
import { InputError, ApiMessage } from './Errors'
import { Navigate } from '@solidjs/router'

function ForgotPassword() {
    const { validate, formSubmit, errors, postForm, sending } = useForm({
        errorClass: [
            'invalid:bg-pink-500',
            'invalid:bg-opacity-20',
            'invalid:dark:bg-rose-800',
            'invalid:dark:bg-opacity-50'
        ]
    })
    const [email, setEmail] = createSignal('')

    // placeholder, in real application we would diplay message from backend
    // using postForm
    const [isSent, setIsSent] = createSignal(false)
    function submit(form: HTMLFormElement) {
        setIsSent(true)
    }

    const [isAuthed, { login, logout }] = useAuth()

    return (
        <Show when={!isAuthed()} fallback={<Navigate href='/' />}>
            <div class='flex min-h-screen w-screen flex-col items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50'>
                {isSent() && (
                    <ApiMessage
                        message='Instructions are sent to your email!'
                        isError={false}
                    />
                )}
                {errors.api && <ApiMessage message={errors.api} />}
                <main class='mt-2 w-[22rem] rounded border bg-gray-200 px-12 py-10 shadow-lg dark:border-gray-400 dark:bg-gray-700 md:mt-8'>
                    <form
                        use:formSubmit={submit}
                        method='post'
                        action='https://example/reset-password'
                        class='flex flex-col'
                    >
                        <h1 class='mb-2 text-center text-xl'>
                            Forgot your password?
                        </h1>
                        <div class='mb-4 text-left dark:text-gray-200'>
                            Enter your email to receive reset instructions
                        </div>
                        <label for='email'>Email</label>
                        <input
                            use:validate={validateEmail}
                            readonly={sending()}
                            type='email'
                            name='email'
                            required
                            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                            class='mb-6 w-full rounded p-2 transition-colors read-only:bg-slate-400 hover:shadow-md focus:shadow-md focus:outline-none dark:bg-gray-900 dark:read-only:bg-gray-800'
                            placeholder='You@example.com'
                            onInput={(e) => {
                                let target = e.target as HTMLInputElement
                                setEmail(target.value)
                            }}
                        />
                        {errors.email && (
                            <InputError
                                message={errors.email}
                                element='email'
                            />
                        )}
                        <button
                            type='submit'
                            disabled={sending()}
                            class={`mt-1 rounded border bg-gray-600 p-2 text-gray-50 invalid:border-pink-500 hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-600 dark:border-gray-400 dark:bg-gray-900  ${
                                sending() && 'animate-pulse'
                            }`}
                        >
                            Send reset link
                        </button>
                    </form>
                </main>
            </div>
        </Show>
    )
}

export default ForgotPassword
