import { Link } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import { View, Text, TouchableOpacity } from 'react-native'

const Page = () => {
    const videoSource = require('../assets/videos/intro3.mp4')

    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true
        player.muted = true
        player.play()
    })

    return (
        <View className="flex-1 justify-between">
            <VideoView
                player={player}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                }}
                contentFit="cover"
                nativeControls={false}
                fullscreenOptions={{
                    enable: true,
                }}
                allowsPictureInPicture={false}
            />
            <View className="absolute inset-0 z-10 bg-black opacity-40"></View>
            {/* Header */}
            <View className="z-20 mt-20 p-5">
                <Text className="text-[2.6rem] font-black uppercase text-white">
                    Ready to change the way you money?
                </Text>
            </View>

            {/* Buttons */}
            <View className="z-20 mb-16 flex-row justify-center gap-5 px-5">
                <Link href="/sign-in" asChild className="flex-1">
                    <TouchableOpacity className="pillButton bg-dark">
                        <Text className="text-[22px] font-medium text-white">
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </Link>

                <Link href="/sign-up" asChild className="flex-1">
                    <TouchableOpacity className="pillButton bg-white">
                        <Text className="text-[22px] font-medium">Sign up</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    )
}

export default Page
