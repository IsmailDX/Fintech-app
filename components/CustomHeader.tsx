import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { BlurView } from 'expo-blur'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const CustomHeader = () => {
    const { top } = useSafeAreaInsets()
    return (
        <BlurView
            intensity={70}
            tint="extraLight"
            experimentalBlurMethod="dimezisBlurView"
            style={{ paddingTop: top, backgroundColor: 'rgba(0,0,0,0.01)' }}
        >
            <View className="h-fit flex-row items-center justify-center gap-2 bg-transparent px-5 pb-3">
                <TouchableOpacity className="circleButton size-12 bg-gray">
                    <Text className="text-lg font-medium text-white">IH</Text>
                </TouchableOpacity>

                <View className="flex-1 flex-row items-center justify-center rounded-3xl bg-lightGray">
                    <Ionicons
                        name="search"
                        size={20}
                        color={Colors.dark}
                        className="p-2 pl-4"
                    />
                    <TextInput
                        className="flex-1 p-3 pl-0 text-dark"
                        placeholder="Search"
                        placeholderTextColor={Colors.dark}
                    />
                </View>

                <View className="circleButton size-14 bg-lightGray">
                    <Ionicons
                        name="stats-chart"
                        size={20}
                        color={Colors.dark}
                    />
                </View>

                <View className="circleButton size-14 bg-lightGray">
                    <Ionicons name="card" size={20} color={Colors.dark} />
                </View>
            </View>
        </BlurView>
    )
}

export default CustomHeader
