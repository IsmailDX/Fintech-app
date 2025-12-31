import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
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

    const onSignIn = async (type: SignInType) => {
        if (type === SignInType.Phone) {
            // Handle phone sign-in
        } else if (type === SignInType.Email) {
            // Handle email sign-in
        } else if (type === SignInType.Google) {
            // Handle Google sign-in
        } else if (type === SignInType.Apple) {
            // Handle Apple sign-in
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
