import { createContext, createSignal, useContext } from 'solid-js'

const AuthContext = createContext()

export function AuthProvider(props) {
    const [isAuthed, setIsAuthed] = createSignal(props.isAuthed || false),
        auth = [
            isAuthed,
            {
                login() {
                    setIsAuthed(true)
                }
            },
            {
                logout() {
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
    return useContext(AuthContext)
}
