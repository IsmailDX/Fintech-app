import { View, Text, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { Ionicons } from '@expo/vector-icons'

import Colors from '@/constants/Colors'
import { Currency } from '@/interfaces/crypto'
import CryptoSkeletonRow from '@/components/CryptoSkeletonRow'

const Crypto = () => {
    const headerHeight = useHeaderHeight()

    /* -------------------- Listings Query -------------------- */
    const {
        data: listings,
        isLoading: isListingsLoading,
        isError: isListingsError,
    } = useQuery({
        queryKey: ['listings'],
        queryFn: async () => {
            const res = await fetch('/api/listings')
            return res.json()
        },
    })

    /* -------------------- Build IDs -------------------- */
    const ids = listings?.map((c: Currency) => c.id).join(',')

    /* -------------------- Info Query (Dependent) -------------------- */
    const {
        data: info,
        isLoading: isInfoLoading,
        isFetching: isInfoFetching,
    } = useQuery({
        queryKey: ['info', ids],
        queryFn: async () => {
            const res = await fetch(`/api/info?ids=${ids}`)
            return res.json()
        },
        enabled: !!ids,
    })

    /* -------------------- Combined Loading -------------------- */
    const isLoading = isListingsLoading || isInfoLoading || isInfoFetching

    /* -------------------- Error State -------------------- */
    if (isListingsError) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-red-500">Failed to load crypto data</Text>
            </View>
        )
    }

    return (
        <ScrollView
            style={{ backgroundColor: Colors.background }}
            contentContainerStyle={{ paddingTop: headerHeight }}
        >
            <Text className="sectionHeader">Latest Crypto</Text>

            <View className="block">
                {/* 🔄 Loading Skeleton */}
                {isLoading ? (
                    <>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <CryptoSkeletonRow key={index} />
                        ))}
                    </>
                ) : (
                    listings?.map((currency: Currency) => (
                        <Link
                            key={currency.id}
                            href={{
                                pathname: '/crypto/[id]',
                                params: { id: currency.id },
                            }}
                            asChild
                        >
                            <TouchableOpacity className="flex-row items-center gap-4 py-3">
                                <Image
                                    source={{
                                        uri: info?.[currency.id]?.logo,
                                    }}
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
                                            name={
                                                currency.quote.EUR
                                                    .percent_change_1h > 0
                                                    ? 'caret-up'
                                                    : 'caret-down'
                                            }
                                            size={16}
                                            color={
                                                currency.quote.EUR
                                                    .percent_change_1h > 0
                                                    ? 'green'
                                                    : 'red'
                                            }
                                        />
                                        <Text
                                            className={
                                                currency.quote.EUR
                                                    .percent_change_1h > 0
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                            }
                                        >
                                            {currency.quote.EUR.percent_change_1h.toFixed(
                                                2
                                            )}
                                            %
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    ))
                )}
            </View>
        </ScrollView>
    )
}

export default Crypto
