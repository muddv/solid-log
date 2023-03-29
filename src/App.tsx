import { Component, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'

import { useForm } from '../lib/useForm'

type Props = {
    message: string
}

const InvalidInputMessage = (props: Props) => {
    return (
        <div class='-mt-7 mb-1 text-sm text-pink-600 text-opacity-90 transition-all dark:text-rose-200'>
            {props.message}
        </div>
    )
}

const validateEmail = async () => {
    // custom validation logic
    return ''
}

const validatePassword = async () => {
    // custom validation logic
    return ''
}

const App: Component = () => {
    const { validate, formSubmit, errors, postForm } = useForm({
        errorClass: [
            'invalid:bg-pink-500',
            'invalid:bg-opacity-20',
            'invalid:dark:bg-rose-800',
            'invalid:dark:bg-opacity-50'
        ]
    })
    const [inputs, setInputs] = createStore({ email: '', password: '' })
    const [showPwd, setShowPwd] = createSignal(false)

    const submit = (form: HTMLFormElement) => {
        postForm(form)
    }

    return (
        <div class='flex min-h-screen w-screen flex-col items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50'>
            <main class='rounded border bg-gray-200 py-10 px-16 shadow-lg dark:border-gray-400 dark:bg-gray-700'>
                <h1 class='mb-4 text-center text-xl'>Log in</h1>
                <form
                    use:formSubmit={submit}
                    method='post'
                    action='http://localhost:8000/login'
                    class='flex flex-col'
                >
                    <label for='email'></label>
                    <div class='flex flex-col gap-1'>
                        Email
                        <input
                            use:validate={validateEmail}
                            id='email'
                            type='email'
                            name='email'
                            required
                            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                            class='peer mb-6 h-10 w-full rounded p-2 transition-colors hover:shadow-md focus:shadow-md focus:outline-none dark:bg-gray-900'
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

                    <label for='password' class='flex flex-col gap-1'></label>
                    <div class='flex flex-col gap-1'>
                        Password
                        <input
                            use:validate={validatePassword}
                            id='password'
                            name='password'
                            type={showPwd() ? 'text' : 'password'}
                            required
                            minlength={6}
                            class='peer mb-6 h-10 w-full rounded p-2 transition-colors hover:shadow-md focus:shadow-md focus:outline-none dark:bg-gray-900'
                            placeholder='Your password'
                            onInput={(e) => {
                                let target = e.target as HTMLInputElement
                                setInputs('password', target.value)
                            }}
                        />
                        {errors.password && (
                            <InvalidInputMessage message={errors.password} />
                        )}
                    </div>

                    <div>
                        <label for='show password'></label>
                        <input
                            class='mr-2 mb-4 accent-gray-600'
                            type='checkbox'
                            id='show-pwd'
                            onChange={() => {
                                setShowPwd(!showPwd())
                            }}
                        />
                        Show password
                    </div>

                    <div>
                        <label></label>
                        <input
                            class='mr-2 mb-4 accent-gray-600'
                            type='checkbox'
                            id='remember'
                        />
                        Remember me
                    </div>
                    <button
                        type='submit'
                        class='h-10 rounded border bg-gray-600 p-2 text-gray-50 invalid:border-pink-500 hover:bg-gray-800 active:bg-gray-900 dark:border-gray-400 dark:bg-gray-900'
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
    )
}

export default App
