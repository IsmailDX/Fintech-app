import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
} from 'react-native'
import React, { useState } from 'react'
import { useUser, useAuth } from '@clerk/clerk-expo'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import Colors from '@/constants/Colors'

const Account = () => {
    const { user } = useUser()
    const { signOut } = useAuth()
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [edit, setEdit] = useState(false)

    const onSaveUser = async () => {
        try {
            await user?.update({ firstName: firstName!, lastName: lastName! })
            setEdit(false)
        } catch (error) {
            console.error(error)
        } finally {
            setEdit(false)
        }
    }

    const onCaptureImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: Platform.OS === 'ios' ? true : false,
            aspect: [4, 3],
            quality: 0.75,
            base64: true,
        })

        if (!result.canceled) {
            const base64 = `data:image/png:base64,${result.assets[0].base64}`
            // @ts-ignore
            user?.setProfileImage({
                file: base64,
            })
        }
    }

    return (
        <BlurView
            intensity={80}
            experimentalBlurMethod="dimezisBlurView"
            tint={'dark'}
            style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.05)',
                paddingTop: 130,
            }}
        >
            <View className="items-center">
                <TouchableOpacity
                    onPress={onCaptureImage}
                    className="size-40 items-center justify-center rounded-full bg-gray"
                >
                    {user?.imageUrl && (
                        <Image
                            source={{ uri: user?.imageUrl }}
                            className="size-40 rounded-full bg-gray"
                        />
                    )}
                </TouchableOpacity>

                <View className="flex-row gap-2">
                    {!edit && (
                        <View className="mt-7 flex-1 flex-row items-center justify-center gap-3">
                            <Text className="text-4xl text-white">
                                {firstName} {lastName}
                            </Text>

                            <TouchableOpacity onPress={() => setEdit(true)}>
                                <Ionicons
                                    name="ellipsis-horizontal"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    )}

                    {edit && (
                        <View className="mt-10 flex-1 flex-row items-center justify-center gap-3">
                            <TextInput
                                placeholder="First Name"
                                value={firstName || ''}
                                onChangeText={setFirstName}
                                className="h-11 w-36 rounded-lg border-[1px] border-gray bg-white p-3"
                            />

                            <TextInput
                                placeholder="Last Name"
                                value={lastName || ''}
                                onChangeText={setLastName}
                                className="h-11 w-36 rounded-lg border-[1px] border-gray bg-white p-3"
                            />

                            <TouchableOpacity onPress={onSaveUser}>
                                <Ionicons
                                    name="checkmark-outline"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
            <View
                style={{
                    backgroundColor: 'rgba(256, 256, 256, 0.1)',
                    borderRadius: 16,
                    gap: 0,
                    margin: 20,
                }}
            >
                <TouchableOpacity
                    className="flex-row gap-5 p-4"
                    onPress={() => signOut()}
                >
                    <Ionicons name="log-out" size={24} color={'#fff'} />
                    <Text style={{ color: '#fff', fontSize: 18 }}>Log out</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row gap-5 p-4">
                    <Ionicons name="person" size={24} color={'#fff'} />
                    <Text style={{ color: '#fff', fontSize: 18 }}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row gap-5 p-4">
                    <Ionicons name="bulb" size={24} color={'#fff'} />
                    <Text style={{ color: '#fff', fontSize: 18 }}>Learn</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row gap-5 p-4">
                    <Ionicons name="megaphone" size={24} color={'#fff'} />
                    <Text style={{ color: '#fff', fontSize: 18, flex: 1 }}>
                        Inbox
                    </Text>
                    <View
                        style={{
                            backgroundColor: Colors.primary,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 12 }}>14</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </BlurView>
    )
}

export default Account
