import { createStore, SetStoreFunction } from 'solid-js/store'
import { Accessor, createSignal } from 'solid-js'

type LogInInput = {
    element: HTMLInputElement
}

type Inputs = {
    [key: string]: LogInInput
}

type Errors = {
    [key: string]: string
}

function checkValid(
    { element }: LogInInput,
    setErrors: SetStoreFunction<Errors>,
    errorClass: string[]
) {
    return async (): Promise<void> => {
        element.setCustomValidity('')
        element.checkValidity()

        let message

        if (element.validity.valueMissing) {
            const elName = element.name[0].toUpperCase() + element.name.slice(1)
            message = `${elName} is required!`
        } else if (
            element.validity.typeMismatch ||
            (element.name === 'email' && element.validity.patternMismatch)
        ) {
            message = `Please enter valid ${element.name}`
        } else if (element.validity.tooShort) {
            message = `Your ${element.name} is at least ${element.minLength} characters`
        } else {
            message = element.validationMessage
        }
        if (message) {
            errorClass.forEach((c) => element.classList.toggle(c, true))
            setErrors({ [element.name]: message })
        }
    }
}

//TODO clean up returns
export function useForm({ errorClass }: { errorClass: string[] }): {
    validate: (ref: HTMLInputElement) => void
    formSubmit: (
        ref: HTMLFormElement,
        accessor?: (() => (ref: HTMLFormElement) => void) | undefined
    ) => void
    errors: Errors
    postForm: (
        ref: HTMLFormElement,
        callback?: (() => void) | undefined
    ) => void
    sending: Accessor<boolean>
} {
    const [errors, setErrors] = createStore<Errors>({}),
        [sending, setSending] = createSignal(false),
        fields: Inputs = {}

    const validate = (ref: HTMLInputElement): void => {
        let config: LogInInput
        fields[ref.name] = config = { element: ref }
        ref.onblur = checkValid(config, setErrors, errorClass)
        ref.oninput = (): void => {
            if (!errors[ref.name]) return
            setErrors({ [ref.name]: undefined })
            errorClass.forEach((c) => ref.classList.toggle(c, false))
        }
    }

    const formSubmit = (
        ref: HTMLFormElement,
        accessor?: () => { (ref: HTMLFormElement): void }
    ): void => {
        ref.setAttribute('novalidate', '')
        ref.onsubmit = async (e): Promise<void> => {
            e.preventDefault()
            let errored = false
            for (const i in fields) {
                const field = fields[i]
                await checkValid(field, setErrors, errorClass)()
                if (!errored && field.element.validationMessage) {
                    field.element.focus()
                    errored = true
                }
            }
            !errored && accessor && accessor()(ref)
        }
    }

    const postForm = (ref: HTMLFormElement, callback?: () => void): void => {
        setSending(true)
        const data = new FormData(ref)
        const body: { [key: string]: FormDataEntryValue } = {}
        for (const [key, value] of data) {
            body[key] = value
        }
        // placeholder logic to showcase behaviour on successful login
        // in deploy with no backend
        if (body.email === 'user@example.com') {
            if (data.get('remember') === 'on') {
                localStorage.setItem('logged', 'true')
            } else {
                localStorage.setItem('logged', 'true')
            }
            // placeholder to showcase "loading" state
            setTimeout(() => {
                setErrors({ api: undefined })
                setSending(false)
                callback && callback()
            }, 800)
            return
        }
        // "real" logic
        else {
            fetch(ref.action, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then((response) => {
                    if (!response.ok) {
                        setSending(false)
                        return Promise.reject(response)
                    }
                    setSending(false)
                    return response.json()
                })
                .then(() => {
                    callback && callback()
                    if (data.get('remember') === 'on') {
                        // placeholder:
                        localStorage.setItem('logged', 'true')
                        // use response data:
                        // localStorage.setItem(res.name, res.value)
                    } else {
                        // placeholder:
                        sessionStorage.setItem('logged', 'true')
                        // use response data:
                        // localStorage.setItem(res.name, res.value)
                    }
                    setErrors({ api: undefined })
                    setSending(false)
                    return errors
                })
                .catch((error: Response) => {
                    if (typeof error.json === 'function') {
                        error
                            .json()
                            .then(() => {
                                const message =
                                    'User not found, check your credentials and retry.'
                                setSending(false)
                                setErrors({ api: message })
                                return errors
                            })
                            .catch((genericError) => {
                                setSending(false)
                                setErrors({ api: genericError })
                                return errors
                            })
                    } else {
                        const message =
                            'Network error, make sure you are connected and try again.'
                        setSending(false)
                        setErrors({ api: message })
                        return errors
                    }
                })
        }
    }

    return { validate, formSubmit, errors, postForm, sending }
}
