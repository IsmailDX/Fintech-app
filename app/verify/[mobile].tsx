import Colors from '@/constants/Colors'
import {
    isClerkAPIResponseError,
    useSignIn,
    useSignUp,
} from '@clerk/clerk-expo'
import { Link, useLocalSearchParams } from 'expo-router'
import { Fragment, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field'

const CELL_COUNT = 6

const VerifyPage = () => {
    const { mobile, signin } = useLocalSearchParams<{
        mobile: string
        signin?: string
    }>()
    const [code, setCode] = useState('')
    const { signIn } = useSignIn()
    const { signUp, setActive } = useSignUp()

    // Code input handlers
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    })

    useEffect(() => {
        if (code.length === 6) {
            if (signin) {
                verifySignIn()
            } else {
                verifyCode()
            }
        }
    }, [code])

    const verifyCode = async () => {
        try {
            await signUp!.attemptPhoneNumberVerification({
                code,
            })

            await setActive!({ session: signUp!.createdSessionId })
        } catch (e) {
            console.log('Error verifying code: ', JSON.stringify(e, null, 2))

            if (isClerkAPIResponseError(e)) {
                Alert.alert('Error', e.errors[0].message)
            }
        }
    }

    const verifySignIn = async () => {
        try {
            await signIn!.attemptFirstFactor({
                strategy: 'phone_code',
                code,
            })

            await setActive!({ session: signIn!.createdSessionId })
        } catch (e) {
            console.log('Error verifying code: ', JSON.stringify(e, null, 2))

            if (isClerkAPIResponseError(e)) {
                Alert.alert('Error', e.errors[0].message)
            }
        }
    }
    return (
        <View className="container">
            <Text className="header">6-digit code</Text>
            <Text className="descriptionText">
                Code sent to {mobile} unless you already have an account
            </Text>

            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                testID="my-code-input"
                renderCell={({ index, symbol, isFocused }) => (
                    <Fragment key={index}>
                        <View
                            onLayout={getCellOnLayoutHandler(index)}
                            key={index}
                            style={[
                                styles.cellRoot,
                                isFocused && styles.focusCell,
                            ]}
                        >
                            <Text style={styles.cellText}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        </View>
                        {index === 2 ? (
                            <View
                                key={`seperator-${index}`}
                                style={styles.seperator}
                            />
                        ) : null}
                    </Fragment>
                )}
            />

            <Link href={'/sign-in'} replace asChild>
                <TouchableOpacity>
                    <Text className="textLink">
                        Already have an account? Sign in
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

export default VerifyPage

const styles = StyleSheet.create({
    codeFieldRoot: {
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 12,
    },
    cellRoot: {
        width: 45,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        borderRadius: 8,
        paddingBottom: 5,
    },
    cellText: {
        color: '#000',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    seperator: {
        height: 2,
        width: 10,
        backgroundColor: Colors.gray,
        alignSelf: 'center',
    },
})
