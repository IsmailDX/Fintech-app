import React, { ReactNode } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useAnimatedReaction,
    withSpring,
    scrollTo,
    withTiming,
    useSharedValue,
    runOnJS,
    SharedValue,
    AnimatedRef,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
    animationConfig,
    COL,
    getOrder,
    getPosition,
    Positions,
    SIZE,
} from './Config'

interface ItemProps {
    children: ReactNode
    positions: SharedValue<Positions>
    id: string
    editing: boolean
    onDragEnd: (diffs: Positions) => void
    scrollView: AnimatedRef<Animated.ScrollView>
    scrollY: SharedValue<number>
}

const Item = ({
    children,
    positions,
    id,
    onDragEnd,
    scrollView,
    scrollY,
    editing,
}: ItemProps) => {
    const inset = useSafeAreaInsets()
    const containerHeight =
        Dimensions.get('window').height - inset.top - inset.bottom

    // FIX 1: Move shared value access out of the render body.
    // We initialize these with dummy values; they will be updated by the Reaction or Style.
    const isGestureActive = useSharedValue(false)
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

    const contextX = useSharedValue(0)
    const contextY = useSharedValue(0)

    // FIX 2: Use a reaction to set the initial and changing positions
    // This runs on the UI thread, where .value access is safe.
    useAnimatedReaction(
        () => positions.value[id],
        (newOrder) => {
            if (newOrder === undefined) return
            if (!isGestureActive.value) {
                const pos = getPosition(newOrder)
                translateX.value = withTiming(pos.x, animationConfig)
                translateY.value = withTiming(pos.y, animationConfig)
            }
        },
        [id]
    )

    const panGesture = Gesture.Pan()
        .enabled(editing)
        .onStart(() => {
            contextX.value = translateX.value
            contextY.value = translateY.value
            isGestureActive.value = true
        })
        .onChange((event) => {
            translateX.value = contextX.value + event.translationX
            translateY.value = contextY.value + event.translationY

            // Accessing .value inside a worklet is SAFE
            const contentHeight =
                (Object.keys(positions.value).length / COL) * SIZE

            const newOrder = getOrder(
                translateX.value,
                translateY.value,
                Object.keys(positions.value).length - 1
            )

            const oldOrder = positions.value[id]
            if (newOrder !== oldOrder) {
                const idToSwap = Object.keys(positions.value).find(
                    (key) => positions.value[key] === newOrder
                )
                if (idToSwap) {
                    const newPositions = JSON.parse(
                        JSON.stringify(positions.value)
                    )
                    newPositions[id] = newOrder
                    newPositions[idToSwap] = oldOrder
                    positions.value = newPositions
                }
            }

            const lowerBound = scrollY.value
            const upperBound = lowerBound + containerHeight - SIZE
            const maxScroll = contentHeight - containerHeight
            const leftToScrollDown = maxScroll - scrollY.value

            if (translateY.value < lowerBound) {
                const diff = Math.min(lowerBound - translateY.value, lowerBound)
                scrollY.value -= diff
                scrollTo(scrollView, 0, scrollY.value, false)
                contextY.value -= diff
            }
            if (translateY.value > upperBound) {
                const diff = Math.min(
                    translateY.value - upperBound,
                    leftToScrollDown
                )
                scrollY.value += diff
                scrollTo(scrollView, 0, scrollY.value, false)
                contextY.value += diff
            }
        })
        .onEnd(() => {
            const newOrder = positions.value[id]
            if (newOrder !== undefined) {
                const newPosition = getPosition(newOrder)
                translateX.value = withTiming(
                    newPosition.x,
                    animationConfig,
                    (finished) => {
                        if (finished) {
                            isGestureActive.value = false
                            runOnJS(onDragEnd)(positions.value)
                        }
                    }
                )
                translateY.value = withTiming(newPosition.y, animationConfig)
            }
        })

    // @ts-ignore
    const style = useAnimatedStyle(() => {
        const zIndex = isGestureActive.value ? 100 : 0
        const scale = withSpring(isGestureActive.value ? 1.05 : 1)

        return {
            position: 'absolute',
            top: 0,
            left: 0,
            width: SIZE,
            height: SIZE,
            zIndex,
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale },
            ],
        }
    })

    return (
        // @ts-ignore
        <Animated.View style={style}>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={StyleSheet.absoluteFill}>
                    {children}
                </Animated.View>
            </GestureDetector>
        </Animated.View>
    )
}

export default Item
