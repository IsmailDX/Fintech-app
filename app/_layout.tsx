import '../global.css'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Link, Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import 'react-native-reanimated'

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    })

    const router = useRouter()

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error
    }, [error])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="(auth)/sign-up"
                options={{
                    title: '',
                    headerBackTitle: '',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: '#F5F5F5' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color="dark"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="(auth)/sign-in"
                options={{
                    title: '',
                    headerBackTitle: '',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: '#F5F5F5' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color="dark"
                            />
                        </TouchableOpacity>
                    ),

                    headerRight: () => (
                        <Link href="/help" asChild>
                            <TouchableOpacity>
                                <Ionicons
                                    name="help-circle-outline"
                                    size={34}
                                    color="dark"
                                />
                            </TouchableOpacity>
                        </Link>
                    ),
                }}
            />

            <Stack.Screen
                name="help"
                options={{ title: 'Help', presentation: 'modal' }}
            />
        </Stack>
    )
}

const RootLayoutNav = () => {
    return (
        <>
            <StatusBar style="light" />
            <RootLayout />
        </>
    )
}

export default RootLayoutNav
