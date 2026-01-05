import {
    View,
    Text,
    SectionList,
    Platform,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    TextInput,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { useQuery } from '@tanstack/react-query'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { CartesianChart, Line, useChartPressState } from 'victory-native'
import { Circle, useFont } from '@shopify/react-native-skia'
import { format } from 'date-fns'
import * as Haptics from 'expo-haptics'
import Animated, {
    SharedValue,
    useAnimatedProps,
} from 'react-native-reanimated'

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
    return <Circle cx={x} cy={y} r={8} color={Colors.primary} />
}

const Details = () => {
    const { id } = useLocalSearchParams()
    const headerHeight = useHeaderHeight()
    const categories = ['Overview', 'News', 'Orders', 'Transactions']
    const [activeIndex, setActiveIndex] = useState(0)
    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12)
    const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } })

    useEffect(() => {
        if (isActive) Haptics.selectionAsync()
    }, [isActive])

    const androidTopPadding = headerHeight > 0 ? headerHeight : 100

    const { data } = useQuery({
        queryKey: ['info', id],
        queryFn: async () => {
            const info = await fetch(`/api/info?ids=${id}`).then((res) =>
                res.json()
            )

            return info[+id]
        },
    })

    const { data: tickers } = useQuery({
        queryKey: ['tickers'],
        queryFn: async (): Promise<any[]> =>
            fetch(`/api/tickers`).then((res) => res.json()),
    })

    const animatedText = useAnimatedProps(() => {
        return {
            text: `${state.y.price.value.value.toFixed(2)} $`,
            defaultValue: '',
        }
    })

    const animatedDate = useAnimatedProps(() => {
        const date = new Date(state.x.value.value)
        return {
            text: `${date.toLocaleDateString()}`,
            defaultValue: '',
        }
    })

    return (
        <>
            <Stack.Screen options={{ title: data?.name }} />

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
                    <>
                        <View className="mx-4 mt-2 flex-row items-center justify-between">
                            <Text className="text-2xl font-bold">
                                {data?.symbol}
                            </Text>
                            <Image
                                source={{ uri: data?.logo }}
                                className="size-16"
                            />
                        </View>

                        <View className="m-3 flex-row gap-2 pb-3">
                            <TouchableOpacity className="pillButtonSmall flex-row gap-3 bg-primary">
                                <Ionicons name="add" size={24} color={'#fff'} />
                                <Text className="buttonText">Buy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="pillButtonSmall flex-row gap-3 bg-primaryMuted">
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color={Colors.primary}
                                />
                                <Text className="buttonText text-primary">
                                    Receive
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                renderSectionHeader={() => (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'space-between',
                            paddingHorizontal: 16,
                            paddingBottom: 15,
                            backgroundColor: Colors.background,
                            borderBottomColor: Colors.lightGray,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    >
                        {categories.map((category, index) => (
                            <TouchableOpacity
                                key={index}
                                className={`items-center justify-center rounded-2xl px-4 py-2 ${activeIndex === index ? 'bg-white' : ''}`}
                                onPress={() => setActiveIndex(index)}
                            >
                                <Text
                                    className={`text-sm text-gray ${activeIndex === index ? 'font-bold text-black' : ''}`}
                                >
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
                renderItem={({ item }) => (
                    <>
                        <View className="block h-[32rem]">
                            {tickers && (
                                <>
                                    {!isActive && (
                                        <View>
                                            <Text className="text-3xl font-bold text-dark">
                                                {tickers[
                                                    tickers.length - 1
                                                ].price.toFixed(2)}{' '}
                                                $
                                            </Text>
                                            <Text className="text-lg text-gray">
                                                Today
                                            </Text>
                                        </View>
                                    )}
                                    {isActive && (
                                        <View>
                                            <AnimatedTextInput
                                                editable={false}
                                                underlineColorAndroid={
                                                    'transparent'
                                                }
                                                className="my-0 py-0 text-3xl font-bold text-dark"
                                                animatedProps={animatedText}
                                            ></AnimatedTextInput>
                                            <AnimatedTextInput
                                                editable={false}
                                                underlineColorAndroid={
                                                    'transparent'
                                                }
                                                className="my-0 py-0 text-lg text-gray"
                                                animatedProps={animatedDate}
                                            ></AnimatedTextInput>
                                        </View>
                                    )}

                                    <CartesianChart
                                        chartPressState={state}
                                        data={tickers}
                                        xKey="timestamp"
                                        yKeys={['price']}
                                        axisOptions={{
                                            font,
                                            tickCount: 5,
                                            labelOffset: { x: -2, y: 0 },
                                            labelColor: Colors.gray,
                                            formatYLabel: (v) => `${v}$ `,
                                            formatXLabel: (ms) =>
                                                format(new Date(ms), 'MM/yy'),
                                        }}
                                    >
                                        {({ points }) => (
                                            <>
                                                <Line
                                                    points={points.price}
                                                    color={Colors.primary}
                                                    strokeWidth={3}
                                                />
                                                {isActive && (
                                                    <ToolTip
                                                        x={state.x.position}
                                                        y={
                                                            state.y.price
                                                                .position
                                                        }
                                                    />
                                                )}
                                            </>
                                        )}
                                    </CartesianChart>
                                </>
                            )}
                        </View>
                        <View className="mx-4 mt-5 block">
                            <Text className="text-gray-400 subtitle text-xl font-bold text-gray">
                                Overview
                            </Text>
                            <Text className="mt-1 leading-6 text-gray">
                                {data?.description}
                            </Text>
                        </View>
                    </>
                )}
            />
        </>
    )
}

export default Details
