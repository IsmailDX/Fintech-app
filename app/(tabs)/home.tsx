import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import RoundButton from '@/components/RoundButton'
import Dropdown from '@/components/Dropdown'
import { useBalanceStore } from '@/store/balanceStore'

const Home = () => {
    const { balance, runTransaction, transactions, clearTransactions } =
        useBalanceStore()

    const onAddMoney = () => {
        runTransaction({
            id: Math.random().toString(),
            amount:
                Math.floor(Math.random() * 1000) *
                (Math.random() > 0.5 ? 1 : -1),
            date: new Date(),
            title: 'Add Money',
        })
    }
    return (
        <ScrollView style={{ backgroundColor: Colors.background }}>
            <View className="m-20 flex items-center">
                <View className="flex-row items-end justify-center">
                    <Text className="text-6xl font-bold">{balance()}</Text>
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
                <RoundButton title="Details" icon={'list'} />
                <Dropdown />
            </View>
        </ScrollView>
    )
}

export default Home
