import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import RoundButton from '@/components/RoundButton'
import Dropdown from '@/components/Dropdown'
import { useBalanceStore } from '@/store/balanceStore'
import { Ionicons } from '@expo/vector-icons'
import WidgetList from '@/components/SortableList/WidgetList'
import { useHeaderHeight } from '@react-navigation/elements'

const Home = () => {
    const { balance, runTransaction, transactions, clearTransactions } =
        useBalanceStore()

    const headerHeight = useHeaderHeight()

    const onAddMoney = () => {
        runTransaction({
            id: Math.random().toString(),
            amount:
                Math.floor(Math.random() * 1000) *
                (Math.random() > 0.5 ? 1 : -1),
            date: new Date(),
            title: 'Added Money',
        })
    }
    return (
        <ScrollView
            style={{ backgroundColor: Colors.background }}
            contentContainerStyle={{
                paddingTop: headerHeight,
            }}
        >
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
                <RoundButton
                    title="Exchange"
                    icon={'refresh'}
                    onPress={clearTransactions}
                />
                <RoundButton title="Details" icon={'list'} />
                <Dropdown />
            </View>

            <Text className="sectionHeader">Transactions</Text>

            <View className="mx-5 mb-5 gap-5 rounded-2xl bg-white p-3">
                {transactions.length === 0 && (
                    <Text className="p-3 text-gray">No transactions yet</Text>
                )}

                {transactions.map((transaction) => (
                    <View
                        key={transaction.id}
                        className="flex-row items-center gap-4"
                    >
                        <View className="circleButton size-10 bg-lightGray">
                            <Ionicons
                                name={transaction.amount > 0 ? 'add' : 'remove'}
                                size={24}
                                color={Colors.dark}
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="font-medium">
                                {transaction.title}
                            </Text>
                            <Text className="text-xs text-gray">
                                {transaction.date.toLocaleString()}
                            </Text>
                        </View>
                        <Text>{transaction.amount}$</Text>
                    </View>
                ))}
            </View>

            <Text className="sectionHeader">Widgets</Text>

            <WidgetList />
        </ScrollView>
    )
}

export default Home
