import { Route, Router, Routes } from '@solidjs/router'

import { AuthProvider } from './Auth'
import { Login } from './Login'
import { Protected } from './Protected'
import { Welcome } from './Weclome'

export function App() {
    return (
        <Router>
            <AuthProvider
                isAuthed={sessionStorage.getItem('logged') === 'true'}
            >
                <Routes>
                    <Route path='' component={Protected}>
                        <Route path='/' component={Welcome} />
                    </Route>
                    <Route path='/login' component={Login} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}
