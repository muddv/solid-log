/* @refresh reload */
import { render } from 'solid-js/web'
import { Route, Router, Routes } from '@solidjs/router'

import './index.css'
import App from './App'
import { AuthProvider, useAuth } from './Auth'
import { Welcome } from './Weclome'
import { Protected } from './Protected'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?'
    )
}

render(
    () => (
        <Router>
            <AuthProvider
                isAuthed={sessionStorage.getItem('logged') === 'true'}
            >
                <Routes>
                    <Route path='' component={Protected}>
                        <Route path='/' component={Welcome} />
                    </Route>
                    <Route path='/login' component={App} />
                </Routes>
            </AuthProvider>
        </Router>
    ),
    root!
)
