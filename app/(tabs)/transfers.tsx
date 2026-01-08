import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

const Transfers = () => {
    return (
        <SafeAreaView className="flex-1 bg-white pb-10">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="px-6 pt-6">
                    <Text className="text-3xl font-bold">Transfers</Text>
                    <Text className="text-gray-500 mt-1">
                        Send or request money instantly
                    </Text>
                </View>

                {/* Amount Card */}
                <View className="mx-6 mt-6 rounded-3xl bg-black p-6">
                    <Text className="text-gray-400">Amount</Text>

                    <View className="mt-2 flex-row items-center">
                        <Text className="text-4xl font-bold text-white">$</Text>
                        <TextInput
                            placeholder="0.00"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            className="ml-2 flex-1 text-4xl font-bold text-white"
                        />
                    </View>
                </View>

                {/* Actions */}
                <View className="mx-6 mt-6 flex-row justify-between">
                    {[
                        { label: 'Send', icon: 'arrow-up' },
                        { label: 'Request', icon: 'arrow-down' },
                        { label: 'Scan', icon: 'qr-code' },
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

                {/* Recent Transfers */}
                <View className="mt-8 px-6">
                    <Text className="text-xl font-bold">Recent Transfers</Text>

                    <View className="mt-4 gap-4">
                        {[
                            {
                                name: 'Ismail Hussein',
                                amount: '-$120.00',
                                status: 'Sent',
                            },
                            {
                                name: 'Mohamed Salah',
                                amount: '+$250.00',
                                status: 'Received',
                            },
                            {
                                name: 'Michael Jackson',
                                amount: '-$45.50',
                                status: 'Sent',
                            },
                        ].map((item, index) => (
                            <View
                                key={index}
                                className="bg-gray-100 flex-row items-center justify-between rounded-2xl p-4"
                            >
                                <View>
                                    <Text className="font-semibold">
                                        {item.name}
                                    </Text>
                                    <Text className="text-gray-500">
                                        {item.status}
                                    </Text>
                                </View>

                                <Text
                                    className={`font-semibold ${
                                        item.amount.startsWith('-')
                                            ? 'text-red-500'
                                            : 'text-green-600'
                                    }`}
                                >
                                    {item.amount}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* CTA */}
                <TouchableOpacity className="mx-6 mt-10 rounded-2xl bg-primary py-4">
                    <Text className="text-center text-lg font-semibold text-white">
                        Continue
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Transfers
