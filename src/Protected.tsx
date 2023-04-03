import { Show } from 'solid-js'
import { Outlet } from '@solidjs/router'
import App from './App'
import { useAuth } from './Auth'

export const Protected = (props) => {
    const [isAuthed] = useAuth()
    return (
        <Show when={isAuthed()} fallback={<App />}>
            <Outlet />
        </Show>
    )
}
