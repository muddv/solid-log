import { Route, Router, Routes } from '@solidjs/router'
import { JSXElement, lazy } from 'solid-js'

import { AuthProvider } from './Auth'
import { Login } from './Login'
const ForgotPassword = lazy(() => import('./ForgotPassword'))
const Welcome = lazy(() => import('./Weclome'))

export function App(): JSXElement {
    return (
        <Router>
            <AuthProvider
                isAuthed={
                    sessionStorage.getItem('logged') === 'true' ||
                    localStorage.getItem('logged') === 'true'
                }
            >
                <Routes>
                    <Route path='/' component={Welcome} />
                    <Route path='/login' component={Login} />
                    <Route path='/reset-password' component={ForgotPassword} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}
