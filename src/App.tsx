import { Route, Router, Routes } from '@solidjs/router'
import { lazy } from 'solid-js'

import { AuthProvider } from './Auth'
import { Login } from './Login'
import { Protected } from './Protected'
const ForgotPassword = lazy(() => import('./ForgotPassword'))
const Welcome = lazy(() => import('./Weclome'))

export function App() {
    return (
        <Router>
            <AuthProvider
                isAuthed={
                    sessionStorage.getItem('logged') === 'true' ||
                    localStorage.getItem('logged') === 'true'
                }
            >
                <Routes>
                    <Route path='' component={Protected}>
                        <Route path='/' component={Welcome} />
                    </Route>
                    <Route path='/login' component={Login} />
                    <Route path='/reset-password' component={ForgotPassword} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}
