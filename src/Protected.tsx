import { Show } from 'solid-js'
import { Outlet } from '@solidjs/router'

import { Login } from './Login'
import { useAuth } from './Auth'

export function Protected() {
    const [isAuthed] = useAuth()
    return (
        <Show when={isAuthed()} fallback={<Login />}>
            <Outlet />
        </Show>
    )
}
