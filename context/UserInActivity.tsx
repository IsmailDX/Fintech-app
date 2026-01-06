import { useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { createMMKV } from 'react-native-mmkv'

const storage = createMMKV({
    id: 'inactivity-storage',
})

export const UserInActivityProvider = ({ children }: any) => {
    const appState = useRef(AppState.currentState)
    const router = useRouter()
    const { isSignedIn } = useAuth()

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            handleAppStateChange
        )

        return () => {
            subscription.remove()
        }
    }, [])

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
        if (nextAppState === 'background') {
            recordStartTime()
        } else if (
            nextAppState === 'active' &&
            appState.current.match(/background/)
        ) {
            const elapsedTime =
                Date.now() - (storage.getNumber('startTime') || 0)

            if (elapsedTime > 3000 && isSignedIn) {
                router.replace('/(modals)/lock')
            }
        }
        appState.current = nextAppState
    }

    const recordStartTime = () => {
        const now = Date.now()
        storage.set('startTime', now)
    }
    return children
}
