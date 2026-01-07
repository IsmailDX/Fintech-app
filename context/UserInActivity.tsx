import { useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { useMMKV } from 'react-native-mmkv'

const storage = useMMKV({
    id: 'inactivity-storage',
})

export const UserInActivityProvider = ({ children }: any) => {
    const appState = useRef<AppStateStatus>(AppState.currentState)
    const router = useRouter()
    const { isSignedIn } = useAuth()
    const authRef = useRef(isSignedIn)

    useEffect(() => {
        authRef.current = isSignedIn
    }, [isSignedIn])

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            handleAppStateChange
        )

        return () => subscription.remove()
    }, [])

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
            storage.set('startTime', Date.now())
        }

        if (nextAppState === 'active' && appState.current !== 'active') {
            const elapsed = Date.now() - (storage.getNumber('startTime') || 0)

            if (elapsed > 3000 && authRef.current) {
                router.replace('/(modals)/lock')
            }
        }

        appState.current = nextAppState
    }

    return children
}
