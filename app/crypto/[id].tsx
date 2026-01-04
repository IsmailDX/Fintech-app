import { View, Text, SectionList, Platform } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'

const Details = () => {
    const { id } = useLocalSearchParams()
    const headerHeight = useHeaderHeight()

    const androidTopPadding = headerHeight > 0 ? headerHeight : 86

    return (
        <>
            <Stack.Screen options={{ title: 'Bitcoin' }} />

            <SectionList
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{
                    paddingTop:
                        Platform.OS === 'android' ? androidTopPadding : 0,
                    paddingBottom: 40,
                }}
                keyExtractor={(i, index) => i.title + index}
                sections={[{ data: [{ title: 'Chart' }] }]}
                ListHeaderComponent={() => (
                    <View className="mx-4 mt-2">
                        <Text className="text-2xl font-bold">BTC</Text>
                    </View>
                )}
                renderItem={() => (
                    <View className="mx-4 mt-5">
                        <Text className="text-gray-400 text-xl font-bold">
                            Overview
                        </Text>
                        <Text className="text-gray-600 mt-2 leading-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </Text>
                    </View>
                )}
            />
        </>
    )
}

export default Details
