import { createStore, SetStoreFunction } from 'solid-js/store'

function checkValid(
    {
        element,
        validators = []
    }: { element: HTMLInputElement; validators: Function[] },
    setErrors: SetStoreFunction<Errors>,
    errorClass: string
) {
    return async () => {
        element.setCustomValidity('')
        element.checkValidity()
        let message = element.validationMessage
        if (!message) {
            for (const validator of validators) {
                const text = await validator(element)
                if (text) {
                    element.setCustomValidity(text)
                    break
                }
            }
            message = element.validationMessage
        }
        if (message) {
            errorClass && element.classList.toggle(errorClass, true)
            setErrors({ [element.name]: message })
        }
    }
}
type Inputs = {
    [key: string]: {
        element: HTMLInputElement
        validators: Function[]
    }
}
type Errors = {
    [key: string]: string
}
//can be used with {error class} as parameter change element on error
//but i will try to use bool and twind classes
export function useForm({ errorClass }: { errorClass: string }) {
    const [errors, setErrors] = createStore<Errors>({}),
        //pass field as parameters?
        fields: Inputs = {}
    const validate = (ref: HTMLInputElement, accessor?: Function) => {
        let validators: Function[] = []
        accessor && (validators = accessor())
        let config: { element: HTMLInputElement; validators: Function[] }
        fields[ref.name] = config = { element: ref, validators }
        ref.onblur = checkValid(config, setErrors, errorClass)
        ref.oninput = () => {
            if (!errors[ref.name]) return
            setErrors({ [ref.name]: undefined })
            //use twind error class????
            errorClass && ref.classList.toggle(errorClass, false)
        }
    }

    const formSubmit = (ref: HTMLInputElement, accessor?: Function) => {

        console.log(ref)
        console.log('form submit')
        //is this needed here?
        let callback = (ref: HTMLInputElement) => {}
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
