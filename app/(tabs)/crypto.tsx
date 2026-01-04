import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { Currency } from '@/interfaces/crypto'
import { Link } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const Crypto = () => {
    const headerHeight = useHeaderHeight()

    const currencies = useQuery({
        queryKey: ['listings'],
        queryFn: () => fetch('/api/listings').then((res) => res.json()),
    })

    const ids = currencies.data
        ?.map((currency: Currency) => currency.id)
        .join(',')

    const { data } = useQuery({
        queryKey: ['info', ids],
        queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
        enabled: !!ids,
    })

    return (
        <ScrollView
            style={{ backgroundColor: Colors.background }}
            contentContainerStyle={{ paddingTop: headerHeight }}
        >
            <Text className="sectionHeader">Latest Crypto</Text>
            <View className="block">
                {currencies.data?.map((currency: Currency) => (
                    <Link
                        href={{
                            pathname: '/crypto/[id]',
                            params: { id: currency.id },
                        }}
                        key={currency.id}
                        asChild
                    >
                        <TouchableOpacity className="flex-row items-center gap-4">
                            <Image
                                source={{ uri: data?.[currency.id].logo }}
                                style={{ width: 40, height: 40 }}
                            />
                            <View className="flex-1 gap-0.5">
                                <Text className="font-semibold text-dark">
                                    {currency.name}
                                </Text>
                                <Text className="text-gray">
                                    {currency.symbol}
                                </Text>
                            </View>

                            <View className="items-end gap-2">
                                <Text>
                                    {currency.quote.EUR.price.toFixed(2)} $
                                </Text>
                                <View className="flex-row items-center gap-1">
                                    <Ionicons
                                        name={`${currency.quote.EUR.percent_change_1h > 0 ? 'caret-up' : 'caret-down'}`}
                                        size={16}
                                        color={`${currency.quote.EUR.percent_change_1h > 0 ? 'green' : 'red'}`}
                                    />
                                    <Text
                                        className={`${currency.quote.EUR.percent_change_1h > 0 ? 'text-green-500' : 'text-red-500'}`}
                                    >
                                        {currency.quote.EUR.percent_change_1h.toFixed(
                                            2
                                        )}{' '}
                                        %
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </ScrollView>
    )
}

export default Crypto
