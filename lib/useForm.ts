import { createStore, SetStoreFunction } from 'solid-js/store'
import { createSignal } from 'solid-js'

type LogInInput = {
    element: HTMLInputElement
    validator: Function
}

type Inputs = {
    [key: string]: LogInInput
}

type Errors = {
    [key: string]: string
}

function checkValid(
    { element, validator }: LogInInput,
    setErrors: SetStoreFunction<Errors>,
    errorClass: string[]
) {
    return async () => {
        element.setCustomValidity('')
        element.checkValidity()

        let message

        if (element.validity.valueMissing) {
            let elName = element.name[0].toUpperCase() + element.name.slice(1)
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
        if (!message) {
            const text = await validator(element)
            if (text) {
                element.setCustomValidity(text)
            }
            message = element.validationMessage
        }
        if (message) {
            errorClass.forEach((c) => element.classList.toggle(c, true))
            setErrors({ [element.name]: message })
        }
    }
}

export function useForm({ errorClass }: { errorClass: string[] }) {
    const [errors, setErrors] = createStore<Errors>({}),
        [sending, setSending] = createSignal(false),
        fields: Inputs = {}

    const validate = (ref: HTMLInputElement, accessor?: Function) => {
        let validator: Function = () => {}
        accessor && (validator = accessor())
        let config: LogInInput
        fields[ref.name] = config = { element: ref, validator }
        ref.onblur = checkValid(config, setErrors, errorClass)
        ref.oninput = () => {
            if (!errors[ref.name]) return
            setErrors({ [ref.name]: undefined })
            errorClass.forEach((c) => ref.classList.toggle(c, false))
        }
    }

    const formSubmit = (ref: HTMLFormElement, accessor?: Function) => {
        let callback = (ref: HTMLFormElement) => {}
        accessor && (callback = accessor())
        ref.setAttribute('novalidate', '')
        ref.onsubmit = async (e) => {
            e.preventDefault()
            let errored = false
            for (let i in fields) {
                const field = fields[i]
                await checkValid(field, setErrors, errorClass)()
                if (!errored && field.element.validationMessage) {
                    field.element.focus()
                    errored = true
                }
            }
            !errored && callback(ref)
        }
    }

    const postForm = (ref: HTMLFormElement, callback?: Function) => {
        setSending(true)
        let data = new FormData(ref)
        let body: { [key: string]: FormDataEntryValue } = {}
        for (let [key, value] of data) {
            body[key] = value
        }
        console.log(ref.action)
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
                .then((res) => {
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
                                let message =
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
                        let message =
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
