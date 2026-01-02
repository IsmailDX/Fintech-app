import '../global.css'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Link, Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import 'react-native-reanimated'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const AppLayout = () => {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    })

    const router = useRouter()
    const { isLoaded, isSignedIn } = useAuth()
    const segments = useSegments()

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error
    }, [error])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    useEffect(() => {
        if (!isLoaded) return

        const inAuthGroup = segments[0] === '(tabs)'

        if (isSignedIn && !inAuthGroup) {
            router.replace('/(tabs)/home')
        } else if (!isSignedIn) {
            router.replace('/')
        }
    }, [isSignedIn])

    if (!loaded || !isLoaded) {
        return <Text>Loading...</Text>
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
                        <Link href="(auth)/help" asChild>
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
                name="(auth)/help"
                options={{ title: 'Help', presentation: 'modal' }}
            />
            <Stack.Screen
                name="verify/[mobile]"
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

            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}

const RootLayoutNav = () => {
    const CLERK_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string
    return (
        <ClerkProvider publishableKey={CLERK_KEY!} tokenCache={tokenCache}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="light" />
                <AppLayout />
            </GestureHandlerRootView>
        </ClerkProvider>
    )
}

export default RootLayoutNav
