import { StyleSheet, Text, View, Image, Button, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage() {
    return (
        <View style={styles.conatiner}>
            <LinearGradient colors={['transparent', 'rgba(175, 156, 243, 1)']} locations={[0.1, 0.7]} style={styles.background}>
                <View style={styles.logoRow}>
                    <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />
                </View>
                <View style={styles.screenCenter}>
                    <View style={styles.circle}>
                        <Text style={styles.circleText}>Quiz</Text>
                    </View>
                </View>
                <View style={styles.screenBottom}>
                    <Start />
                </View>
            </LinearGradient>
        </View>
    )

};

const Start = () => {
    return (
    <Pressable>
        <View style={styles.customButton}>
            <Text style={styles.buttonText}>Start</Text>
        </View>
    </Pressable>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1
    },
    background: {
        flex: 1,
        width: '100%',
    },
    logoRow: {
        flex: 1,
        alignSelf: 'center',
    },
    logo: {
        width: 150,
        resizeMode: 'contain'
    },
    circle: {
        alignSelf: 'center',
        width: Dimensions.get('window').width - 170,
        height: Dimensions.get('window').width - 185,
        borderRadius: (Dimensions.get('window').width-170) / 2,
        backgroundColor: "#FFFFFF",
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',

    },
    screenCenter: {
        flex: 1,
        alignItems: 'center',
    },
    screenBottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 24,
    },
    customButton: {
        backgroundColor: '#FF3B3F',
        borderRadius: 100,
        width: Dimensions.get('window').width*0.8,
        height: 50,
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    circleText: {
        color: "#FF3B3C",
        fontSize: 48,
        fontWeight: 'bold',

    }
});