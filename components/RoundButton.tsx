import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity } from 'react-native'

type RoundButtonProps = {
    title: string
    icon: typeof Ionicons.defaultProps
    onPress?: () => void
}

const RoundButton = ({ title, icon, onPress }: RoundButtonProps) => {
    return (
        <TouchableOpacity className="items-center gap-2" onPress={onPress}>
            <View className="size-16 items-center justify-center rounded-full bg-lightGray">
                <Ionicons name={icon} size={30} color={Colors.dark} />
            </View>
            <Text className="text-base font-medium text-dark">{title}</Text>
        </TouchableOpacity>
    )
}

export default RoundButton
