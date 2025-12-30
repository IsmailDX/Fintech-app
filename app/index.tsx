import { useEvent } from 'expo'
import { useVideoPlayer, VideoView } from 'expo-video'
import { View, Text, StyleSheet } from 'react-native'

const Page = () => {
    const videoSource = require('../assets/videos/intro2.mp4')

    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true
        player.muted = true
        player.play()
    })

    return (
        <View style={styles.container}>
            <VideoView
                player={player}
                style={styles.video}
                contentFit="cover"
                nativeControls={false}
                allowsFullscreen={false}
                allowsPictureInPicture={false}
            />
            <View style={{ marginTop: 80, padding: 20, zIndex: 1 }}>
                <Text style={styles.header}>
                    Ready to change the way you money?
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    header: {
        fontSize: 36,
        fontWeight: '900',
        textTransform: 'uppercase',
        color: 'white',
    },
})

export default Page
