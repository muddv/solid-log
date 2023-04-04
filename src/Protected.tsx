import { Show } from 'solid-js'
import { Navigate, Outlet } from '@solidjs/router'

import { useAuth } from './Auth'

export function Protected() {
    const [isAuthed] = useAuth()
    return (
        <Show when={isAuthed()} fallback={<Navigate href='/login' />}>
            <Outlet />
        </Show>
    )
}
