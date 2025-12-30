import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Link } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

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
                fullscreenOptions={{
                    enable: true,
                }}
                allowsPictureInPicture={false}
            />
            <View style={{ marginTop: 80, padding: 20 }}>
                <Text style={styles.header}>
                    Ready to change the way you money?
                </Text>
            </View>

            <View style={styles.buttons}>
                <Link
                    href={'/sign-in'}
                    style={[
                        defaultStyles.pillButton,
                        { flex: 1, backgroundColor: Colors.dark },
                    ]}
                    asChild
                >
                    <TouchableOpacity>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 22,
                                fontWeight: '500',
                            }}
                        >
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </Link>

                <Link
                    href={'/sign-up'}
                    style={[
                        defaultStyles.pillButton,
                        { flex: 1, backgroundColor: '#fff' },
                    ]}
                    asChild
                >
                    <TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: '500',
                            }}
                        >
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </Link>
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
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    header: {
        fontSize: 36,
        fontWeight: '900',
        textTransform: 'uppercase',
        color: 'white',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 60,
        paddingHorizontal: 20,
    },
})

export default Page
