import type { Component } from 'solid-js'
import { createStore } from 'solid-js/store'

import { useForm } from '../lib/useForm'

type Props = {
    message: string
}

const InvalidInputMessage = (props: Props) => {
    return (
        <div class='invisible -mt-5 mb-1 text-sm text-pink-600 text-opacity-90 transition-all peer-invalid:visible'>
            {props.message}
        </div>
    )
}

const App: Component = () => {

    const { validate, formSubmit, errors } = useForm({ errorClass: '' })
    const [inputs, setInputs] = createStore({ email: '', password: '' })

    const submit = (form: HTMLFormElement) => {
        form.submit()
        console.log('submit')
        console.log(form)
    }
    
    function validateEmail() {
        console.log('validate email')
        return 'valid email'
    }

    function validatePassword() {
        console.log('validate password')
        return 'valid password'
    }

    return (
        <div class='flex h-screen w-screen flex-col items-center justify-center bg-gray-50 text-gray-900'>
            <main class='rounded border bg-gray-200 py-10 px-16 shadow-lg'>
                <h1 class='mb-4 text-center text-xl'>Jump Back in!</h1>
                <form 
                    use:formSubmit={submit}
                    autocomplete='off' class='flex flex-col'>
                    <label for='email' class='flex flex-col gap-1'>
                        Email
                        <input
                            id='email'
                            type='email'
                            name='email'
                            //ref={emailRef}
                            required
                            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                            class='peer mb-4 h-10 w-full rounded p-2 transition-colors placeholder-shown:!bg-white invalid:bg-opacity-20 hover:shadow-md focus:shadow-md focus:outline-none'
                            placeholder='You@example.com'
                            //value={email}
                            onChange={(e) => {
                                let target = e.target as HTMLInputElement
                                console.log(target.value)
                                setInputs('email', target.value)
                            }}
                            onBlur={(e) => {
                                console.log(e)
                                //e.target.value && setFinishedTypingEmail(true)
                                //validateEmail(e.target.value)
                            }}
                        />
                        {errors.email && (
                            <InvalidInputMessage message={'please'} />
                        )}
                    </label>

                    <label for='password' class='flex flex-col gap-1'>
                        Password
                        <input
                            use:validate={validateEmail}
                            id='password'
                            //type={showPwd ? 'text' : 'password'}
                            //ref={pwdRef}
                            required
                            pattern='.{6,}'
                            class='peer h-10 w-full rounded p-2 transition-colors invalid:bg-opacity-20 hover:shadow-md focus:shadow-md focus:outline-none'
                            placeholder='Your password'
                            //value={pwd}
                            onChange={(e) => {
                                console.log(e)
                                // handlePassword(e.target.value)
                            }}
                            onBlur={(e) => {
                                console.log(e)
                                //e.target.value &&
                                //setFinishedTypingPassword(true)
                                //validateEmail(e.target.value)
                            }}
                        />
                        <div class='invisible -mt-1 mb-1 text-sm text-pink-600 text-opacity-90 transition-all peer-invalid:visible'>
                            Your password is at least 6 characters
                        </div>
                    </label>

                    <label>
                        <input
                            use:validate={validatePassword}
                            class='mr-2 mb-4 accent-gray-600'
                            type='checkbox'
                            id='show-pwd'
                            //onChange={handleShowPwd}
                        />
                        Show password
                    </label>

                    <label>
                        <input
                            class='mr-2 mb-4 accent-gray-600'
                            type='checkbox'
                            id='remember'
                        />
                        Remember me
                    </label>
                    <button
                        class='h-10 rounded border bg-gray-600 p-2 text-gray-50 invalid:border-pink-500 hover:bg-gray-800 active:bg-gray-900'
                        onClick={(e) => {
                            //handleSubmit(e)
                        }}
                    >
                        Log in
                    </button>
                </form>
                <div class='mt-2 text-left'>
                    <a class='cursor-pointer text-center text-gray-800 hover:underline'>
                        Forgot your password?
                    </a>
                </div>
            </main>
        </div>
    )
}

export default App
