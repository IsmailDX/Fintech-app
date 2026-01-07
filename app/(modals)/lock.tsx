import { View, Text, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Haptics from 'expo-haptics'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as LocalAuthentication from 'expo-local-authentication'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated'

const Lock = () => {
    const { user } = useUser()
    const [firstName, setFirstName] = useState(user?.firstName || '')
    const [code, setCode] = useState<number[]>([])
    const codeLength = Array(6).fill(0)
    const router = useRouter()
    const [supportsFaceID, setSupportsFaceID] = useState(false)

    const offset = useSharedValue(0)

    const style = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value }],
        }
    })

    const OFFSET = 20
    const TIME = 80

    // with a passcode done in the app
    // useEffect(() => {
    //     const validateWithSystem = async () => {
    //         if (code.length === 4) {
    //             // We trigger the system authentication
    //             const result = await LocalAuthentication.authenticateAsync({
    //                 promptMessage: 'Confirm your identity',
    //                 disableDeviceFallback: false,
    //                 cancelLabel: 'Cancel',
    //             })

    //             if (result.success) {
    //                 router.replace('/(tabs)/home')
    //                 setCode([])
    //             } else {
    //                 // Shake animation for the custom dots
    //                 offset.value = withSequence(
    //                     withTiming(-OFFSET, { duration: TIME / 2 }),
    //                     withRepeat(
    //                         withTiming(OFFSET, { duration: TIME }),
    //                         4,
    //                         true
    //                     ),
    //                     withTiming(0, { duration: TIME / 2 })
    //                 )
    //                 Haptics.notificationAsync(
    //                     Haptics.NotificationFeedbackType.Error
    //                 )
    //                 setCode([])
    //             }
    //         }
    //     }

    //     validateWithSystem()
    // }, [code])

    useEffect(() => {
        LocalAuthentication.authenticateAsync({
            promptMessage: 'Unlock',
            disableDeviceFallback: false,
        }).then((result) => {
            if (result.success) {
                router.replace('/(tabs)/home')
            }
        })
    }, [])

    // const onNumberPress = (num: number) => {
    //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    //     setCode([...code, num])
    // }

    // const numberBackspace = () => {
    //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    //     setCode(code.slice(0, -1))
    // }

    // const onBiometricAuthPress = async () => {
    //     // 1️⃣ Does the device even have biometric hardware?
    //     const hasHardware = await LocalAuthentication.hasHardwareAsync()

    //     if (!hasHardware) {
    //         console.log(
    //             '❌ This device does not support biometric authentication'
    //         )
    //         return
    //     }

    //     // 2️⃣ What biometric types are supported?
    //     const supportedTypes =
    //         await LocalAuthentication.supportedAuthenticationTypesAsync()

    //     const supportsFaceID = supportedTypes.includes(
    //         LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
    //     )

    //     if (!supportsFaceID) {
    //         console.log('❌ Face ID is not supported on this device')
    //         return
    //     }

    //     // 3️⃣ Authenticate
    //     const result = await LocalAuthentication.authenticateAsync({
    //         promptMessage: 'Authenticate with Face ID',
    //         fallbackLabel: 'Use Passcode',
    //         cancelLabel: 'Cancel',
    //     })

    //     if (result.success) {
    //         router.replace('/(tabs)/home')
    //     } else {
    //         Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    //     }
    // }

    // useEffect(() => {
    //     const checkBiometrics = async () => {
    //         const hasHardware = await LocalAuthentication.hasHardwareAsync()
    //         if (!hasHardware) {
    //             setSupportsFaceID(false)
    //             return
    //         }

    //         const supportedTypes =
    //             await LocalAuthentication.supportedAuthenticationTypesAsync()

    //         const hasFaceID = supportedTypes.includes(
    //             LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
    //         )

    //         setSupportsFaceID(hasFaceID)
    //     }

    //     checkBiometrics()
    // }, [])

    return (
        <SafeAreaView>
            <Text className="size-full flex-1 items-center justify-center text-center text-3xl font-bold">
                Welcome back, {firstName}!
            </Text>

            {/* <Animated.View
                className="my-24 flex-row items-center justify-center gap-7"
                style={style}
            >
                {codeLength.map((_, index) => (
                    <View
                        key={index}
                        className={`size-6 items-center rounded-full ${code[index] ? 'bg-primary' : 'bg-lightGray'}`}
                    ></View>
                ))}
            </Animated.View>

            <View className="mx-20 gap-16">
                <View className="flex-row justify-between">
                    {[1, 2, 3].map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => onNumberPress(num)}
                        >
                            <Text className="text-5xl">{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="my-3 flex-row justify-between">
                    {[4, 5, 6].map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => onNumberPress(num)}
                        >
                            <Text className="text-5xl">{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="flex-row justify-between">
                    {[7, 8, 9].map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => onNumberPress(num)}
                        >
                            <Text className="text-5xl">{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="flex-row justify-between">
                    {supportsFaceID ? (
                        <TouchableOpacity
                            onPress={onBiometricAuthPress}
                            className="items-center justify-center"
                        >
                            <MaterialCommunityIcons
                                name="face-recognition"
                                size={35}
                                color="black"
                            />
                        </TouchableOpacity>
                    ) : (
                        // keeps layout spacing correct
                        <View className="min-w-11" />
                    )}

                    <TouchableOpacity onPress={() => onNumberPress(0)}>
                        <Text className="text-5xl">0</Text>
                    </TouchableOpacity>

                    <View className="min-w-11">
                        {code.length > 0 && (
                            <TouchableOpacity
                                onPress={numberBackspace}
                                className="items-center justify-center"
                            >
                                <MaterialCommunityIcons
                                    name="backspace-outline"
                                    size={35}
                                    color="black"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <Text className="text-center text-xl font-medium text-primary">
                    Forgot your passcode?
                </Text>
            </View> */}
        </SafeAreaView>
    )
}

export default Lock
