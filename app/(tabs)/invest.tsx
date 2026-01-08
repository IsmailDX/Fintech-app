import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

const Invest = () => {
    return (
        <SafeAreaView className="flex-1 bg-white pb-10">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="px-6">
                    <Text className="text-3xl font-bold">Invest</Text>
                    <Text className="text-gray-500 mt-1">
                        Grow your portfolio over time
                    </Text>
                </View>

                {/* Portfolio Card */}
                <View className="mx-6 mt-6 rounded-3xl bg-black p-6">
                    <Text className="text-gray-400">Total Portfolio Value</Text>

                    <Text className="mt-2 text-4xl font-bold text-white">
                        $12,480.25
                    </Text>

                    <View className="mt-3 flex-row items-center">
                        <Ionicons name="arrow-up" size={16} color="#22c55e" />
                        <Text className="ml-1 text-green-400">
                            +2.45% today
                        </Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View className="mx-6 mt-6 flex-row justify-between">
                    {[
                        { label: 'Buy', icon: 'add' },
                        { label: 'Sell', icon: 'remove' },
                        { label: 'Earn', icon: 'trending-up' },
                    ].map((item) => (
                        <TouchableOpacity
                            key={item.label}
                            className="bg-gray-100 mx-1 flex-1 items-center rounded-2xl py-4"
                        >
                            <Ionicons
                                name={item.icon as any}
                                size={24}
                                color="black"
                            />
                            <Text className="mt-2 font-medium">
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Investment Options */}
                <View className="mt-8 px-6">
                    <Text className="text-xl font-bold">
                        Investment Opportunities
                    </Text>

                    <View className="mt-4 gap-4">
                        {/* Option Card */}
                        <View className="bg-gray-100 rounded-2xl p-5">
                            <Text className="text-lg font-semibold">
                                Crypto Index Fund
                            </Text>
                            <Text className="text-gray-500 mt-1">
                                Diversified, long-term crypto exposure
                            </Text>

                            <View className="mt-3 flex-row justify-between">
                                <Text className="text-green-600">
                                    +8.2% APY
                                </Text>
                                <Text className="font-medium">Low risk</Text>
                            </View>
                        </View>

                        <View className="bg-gray-100 rounded-2xl p-5">
                            <Text className="text-lg font-semibold">
                                Staking Rewards
                            </Text>
                            <Text className="text-gray-500 mt-1">
                                Earn passive income by staking assets
                            </Text>

                            <View className="mt-3 flex-row justify-between">
                                <Text className="text-green-600">
                                    Up to 12% APY
                                </Text>
                                <Text className="font-medium">Medium risk</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Long-term Tip */}
                <View className="mx-6 mt-10 rounded-2xl bg-blue-50 p-5">
                    <Text className="font-semibold text-blue-700">
                        💡 Investment Tip
                    </Text>
                    <Text className="mt-2 text-blue-600">
                        This app was made by IsmailDX, make sure you go thank
                        him for making a nice app.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Invest
