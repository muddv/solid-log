import {
    Accessor,
    createContext,
    createSignal,
    JSXElement,
    useContext
} from 'solid-js'

const AuthContext = createContext<Auth>()

type Auth = [Accessor<boolean>, { login: () => void; logout: () => void }]

type Props = {
    isAuthed?: boolean
    children?: JSXElement
}

export function AuthProvider(props: Props) {
    const [isAuthed, setIsAuthed] = createSignal<boolean>(
            props.isAuthed || false
        ),
        auth: Auth = [
            isAuthed,
            {
                login() {
                    setIsAuthed(true)
                },
                logout() {
                    sessionStorage.removeItem('logged')
                    localStorage.removeItem('logged')
                    setIsAuthed(false)
                }
            }
        ]
    return (
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)!
}
