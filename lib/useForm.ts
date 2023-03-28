import { createStore, SetStoreFunction } from 'solid-js/store'

type LogInInput = {
    element: HTMLInputElement,
    validator: Function
}

type Inputs = {
    [key: string]: LogInInput
}

type Errors = {
    [key: string]: string
}

function checkValid({ element, validator }: LogInInput,
    setErrors: SetStoreFunction<Errors>,
    errorClass: string
) {
    return async () => {
        element.setCustomValidity('')
        element.checkValidity()

        let message

        if (element.validity.valueMissing) {
            let elName = element.name[0].toUpperCase() + element.name.slice(1)
            message = `${elName} is required!`
        }

        else if (element.validity.typeMismatch || (element.name === 'email' && element.validity.patternMismatch)) {
            message = `Please enter valid ${element.name}`
        }
        else if (element.validity.tooShort) {
            message = `Your ${element.name} is at least ${element.minLength} characters`
        }

        else { message = element.validationMessage }
        if (!message) {
            const text = await validator(element)
            if (text) {
                element.setCustomValidity(text)
            }
            message = element.validationMessage
        }
        if (message) {
            errorClass && element.classList.toggle(errorClass, true)
            setErrors({ [element.name]: message })
        }
    }
}

//can be used with {error class} as parameter change element on error
//but i will try to use bool and twind classes
export function useForm({ errorClass }: { errorClass: string }) {
    const [errors, setErrors] = createStore<Errors>({}),
        //pass field as parameters?
        fields: Inputs = {}
    const validate = (ref: HTMLInputElement, accessor?: Function) => {
        let validator: Function = () => { }
        accessor && (validator = accessor())
        let config: LogInInput
        fields[ref.name] = config = { element: ref, validator }
        ref.onblur = checkValid(config, setErrors, errorClass)
        ref.oninput = () => {
            if (!errors[ref.name]) return
            setErrors({ [ref.name]: undefined })
            //use twind error class????
            errorClass && ref.classList.toggle(errorClass, false)
        }
    }

    const formSubmit = (ref: HTMLFormElement, accessor?: Function) => {
        //is this needed here?
        let callback = (ref: HTMLFormElement) => { }
        accessor && (callback = accessor())
        ref.setAttribute('novalidate', '')
        ref.onsubmit = async (e) => {
            e.preventDefault()
            let errored = false

            for (const k in fields) {
                const field = fields[k]
                await checkValid(field, setErrors, errorClass)()
                if (!errored && field.element.validationMessage) {
                    field.element.focus()
                    errored = true
                }
            }
            !errored && callback(ref)
        }
    }

    return { validate, formSubmit, errors }
}
