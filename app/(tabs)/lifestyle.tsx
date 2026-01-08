import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

const LifeStyle = () => {
    return (
        <SafeAreaView className="flex-1  bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Header */}
                <View className="px-6">
                    <Text className="text-3xl font-bold">Lifestyle</Text>
                    <Text className="text-gray-500 mt-1">
                        Experiences, rewards, and everyday perks
                    </Text>
                </View>

                {/* Categories */}
                <View className="mt-6 flex-row flex-wrap justify-between px-6">
                    {[
                        { label: 'Travel', icon: 'airplane' },
                        { label: 'Dining', icon: 'restaurant' },
                        { label: 'Wellness', icon: 'fitness' },
                        { label: 'Shopping', icon: 'cart' },
                    ].map((item) => (
                        <TouchableOpacity
                            key={item.label}
                            className="mb-4 w-[48%] rounded-3xl bg-black/5 p-5"
                        >
                            <Ionicons
                                name={item.icon as any}
                                size={28}
                                color="black"
                            />
                            <Text className="mt-3 text-lg font-semibold">
                                {item.label}
                            </Text>
                            <Text className="text-gray-500 mt-1">
                                Exclusive offers
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Featured */}
                <View className="mt-8 px-6">
                    <Text className="text-xl font-bold">Featured for you</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mt-4"
                    >
                        {[
                            {
                                title: 'Luxury Hotel Stay',
                                subtitle: 'Up to 30% cashback',
                            },
                            {
                                title: 'Fine Dining',
                                subtitle: 'Book & save',
                            },
                            {
                                title: 'Spa & Wellness',
                                subtitle: 'Relax & recharge',
                            },
                        ].map((item, index) => (
                            <View
                                key={index}
                                className="mr-4 w-64 rounded-3xl bg-black p-5"
                            >
                                <Text className="text-lg font-semibold text-white">
                                    {item.title}
                                </Text>
                                <Text className="text-gray-400 mt-1">
                                    {item.subtitle}
                                </Text>

                                <TouchableOpacity className="mt-6 self-start rounded-full bg-white px-4 py-2">
                                    <Text className="font-semibold">
                                        Explore
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* CTA */}
                <TouchableOpacity className="mx-6 mt-10 rounded-2xl bg-primary py-4">
                    <Text className="text-center text-lg font-semibold text-white">
                        View all lifestyle perks
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LifeStyle
