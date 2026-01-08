import { View } from 'react-native'
import React from 'react'

const CryptoSkeletonRow = () => {
    return (
        <View className="flex-row items-center gap-4 py-3">
            {/* Logo */}
            <View className="bg-black-200 h-10 w-10 rounded-full" />

            {/* Name & symbol */}
            <View className="flex-1 gap-2">
                <View className="bg-black-200 h-4 w-32 rounded" />
                <View className="bg-black-200 h-3 w-20 rounded" />
            </View>

            {/* Price & change */}
            <View className="items-end gap-2">
                <View className="bg-black-200 h-4 w-20 rounded" />
                <View className="bg-black-200 h-3 w-12 rounded" />
            </View>
        </View>
    )
}

export default CryptoSkeletonRow
