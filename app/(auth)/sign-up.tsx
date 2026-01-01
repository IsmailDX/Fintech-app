import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'

const SignUp = () => {
    const [countryCode, setCountryCode] = useState('+971')
    const [mobile, setMobile] = useState('')
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 90
    const router = useRouter()
    // @ts-ignore
    const { signUp } = useSignUp()

    const onSignUp = async () => {
        const fullMobileNumber = `${countryCode}${mobile}`
        try {
            await signUp!.create({
                phoneNumber: fullMobileNumber,
            })

            signUp!.preparePhoneNumberVerification()
            router.push({
                pathname: '/verify/[mobile]',
                params: { mobile: fullMobileNumber },
            })
        } catch (e) {
            console.log('Error during sign up: ', e)
        }
    }

    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior="padding"
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <View className="container">
                <Text className="header">Let's get started!</Text>
                <Text className="descriptionText">
                    Enter your mobile number. We will send you a confirmation
                    code there
                </Text>

                <View className="my-10 flex-row">
                    <TextInput
                        className="inputStyle"
                        placeholder="Country Code"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        value={countryCode}
                        onChangeText={setCountryCode}
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

                <Link href={'/sign-in'} asChild replace>
                    <TouchableOpacity>
                        <Text className="textLink">
                            Already have an account? Log in
                        </Text>
                    </TouchableOpacity>
                </Link>

                <View className="flex-1" />

                <TouchableOpacity
                    className={`pillButton mb-5 ${mobile !== '' ? 'enabled' : 'disabled'}`}
                    onPress={onSignUp}
                >
                    <Text className="buttonText">Sign up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignUp
