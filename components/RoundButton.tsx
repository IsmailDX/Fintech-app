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
            <View className="circleButton size-16 bg-lightGray">
                <Ionicons name={icon} size={30} color={Colors.dark} />
            </View>
            <Text className="text-base font-medium text-dark">{title}</Text>
        </TouchableOpacity>
    )
}

export default RoundButton
