import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native'

enum SignInType {
    Phone,
    Email,
    Google,
    Apple,
}

const SignIn = () => {
    const [countryCode, setCountryCode] = useState('+971')
    const [mobile, setMobile] = useState('')
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 90
    const router = useRouter()
    const { signIn } = useSignIn()

    const onSignIn = async (type: SignInType) => {
        if (type === SignInType.Phone) {
            try {
                const fullMobileNumber = `${countryCode}${mobile}`
                const { supportedFirstFactors } = await signIn!.create({
                    identifier: fullMobileNumber,
                })

                const firstPhoneFactor = supportedFirstFactors!.find(
                    (factor) => factor.strategy === 'phone_code'
                )

                // @ts-ignore
                const { phoneNumberId } = firstPhoneFactor

                await signIn!.prepareFirstFactor({
                    strategy: 'phone_code',
                    phoneNumberId,
                })

                router.push({
                    pathname: '/verify/[mobile]',
                    params: { mobile: fullMobileNumber, signin: 'true' },
                })
            } catch (e) {
                console.log(
                    'Error during sign in: ',
                    JSON.stringify(e, null, 2)
                )
                if (isClerkAPIResponseError(e)) {
                    if (e.errors[0].code === 'form_identifier_not_found') {
                        Alert.alert('Error', e.errors[0].message)
                    }
                }
            }
        }
    }

    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior="padding"
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <View className="container">
                <Text className="header">Welcome back</Text>
                <Text className="descriptionText">
                    Enter your mobile number associated with your account
                </Text>

                <View className="my-10 flex-row">
                    <TextInput
                        className="inputStyle"
                        placeholder="Country Code"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        value={countryCode}
                    />
                    <TextInput
                        className="inputStyle flex-1"
                        placeholder="Mobile Number"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        value={mobile}
                        onChangeText={setMobile}
                    />
                </View>

                <TouchableOpacity
                    className={`pillButton mb-5 ${mobile !== '' ? 'enabled' : 'disabled'}`}
                    onPress={() => onSignIn(SignInType.Phone)}
                >
                    <Text className="buttonText">Continue</Text>
                </TouchableOpacity>

                <View className="flex-row items-center gap-4">
                    <View className="h-[0.1rem] flex-1 bg-lightGray"></View>
                    <Text className="text-lg text-gray">or</Text>
                    <View className="h-[0.1rem] flex-1 bg-lightGray"></View>
                </View>

                <TouchableOpacity
                    className="pillButton mt-5 flex-row gap-4 bg-white"
                    onPress={() => onSignIn(SignInType.Email)}
                >
                    <Ionicons name="mail" size={24} color="black" />
                    <Text className="buttonText text-black">
                        Continue with email
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="pillButton mt-5 flex-row gap-4 bg-white"
                    onPress={() => onSignIn(SignInType.Google)}
                >
                    <Ionicons name="logo-google" size={24} color="black" />
                    <Text className="buttonText text-black">
                        Continue with Google
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="pillButton mt-5 flex-row gap-4 bg-white"
                    onPress={() => onSignIn(SignInType.Apple)}
                >
                    <Ionicons name="logo-apple" size={24} color="black" />
                    <Text className="buttonText text-black">
                        Continue with Apple
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignIn
