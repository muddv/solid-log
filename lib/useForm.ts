import { createStore, SetStoreFunction } from 'solid-js/store'

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
        fields: Inputs = {}
    const validate = (ref: HTMLInputElement, accessor?: Function) => {
        let validator: Function = () => {}
        accessor && (validator = accessor())
        let config: LogInInput
        fields[ref.name] = config = { element: ref, validator }
        ref.onblur = checkValid(config, setErrors, errorClass)
        ref.oninput = () => {
            //Maybe remove this?
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

    const postForm = (ref: HTMLFormElement) => {
        let data = new FormData(ref)
        let body: {[key: string]: FormDataEntryValue} = {}
        for (let [key, value] of data) {
            body[key] = value
        }
        fetch(ref.action, { method: 'post', headers: {"Content-Type": "application/json"},  body: JSON.stringify(body) })
        .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.json()
            })
            .then((data) => {
                console.log('Success')
                console.log(data)
                //redirect
            })
            .catch((error: Response) => {
                if (typeof error.json === 'function') {
                    error
                        .json()
                        .then((jsonError) => {
                            console.log('Json error from API')
                            console.log(jsonError)
                        })
                        .catch((genericError) => {
                            console.log('Generic error from API')
                            console.log(genericError.statusText)
                        })
                } else {
                    console.log('Fetch error')
                    console.log(error)
                }})
    }

    return { validate, formSubmit, errors, postForm }
}

