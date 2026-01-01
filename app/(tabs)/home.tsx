import { View, Text, ScrollView, Button } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import RoundButton from '@/components/RoundButton'
import Dropdown from '@/components/Dropdown'

const Home = () => {
    const balance = 1420

    const onAddMoney = () => {}
    return (
        <ScrollView style={{ backgroundColor: Colors.background }}>
            <View className="m-20 flex items-center">
                <View className="flex-row items-end justify-center">
                    <Text className="text-6xl font-bold">{balance}</Text>
                    <Text className="ml-2 text-3xl font-semibold">$</Text>
                </View>
            </View>

            <View className="flex flex-row justify-between p-5">
                <RoundButton
                    title="Add money"
                    icon={'add'}
                    onPress={onAddMoney}
                />
                <RoundButton title="Exchange" icon={'refresh'} />
                <RoundButton
                    title="Details"
                    icon={'list'}
                    onPress={onAddMoney}
                />
                <Dropdown />
            </View>
        </ScrollView>
    )
}

export default Home
