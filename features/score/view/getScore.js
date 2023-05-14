import { StackActions } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    Pressable,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { MockServer } from '../../quiz/data/mockapi';

const GetScore = ({ route, navigation }) => {
    const props = route.params;

    console.log(props);

    const CorrectTab = (props) => {
        return (
            <View style={styles.corrects}>
                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                    <View style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: "rgba(68, 183, 123, 1)", marginHorizontal: 20 }} />
                    <Text style={{ alignSelf: 'center', fontSize: 20 }}>{props.correct} Correct</Text>
                </View>
            </View>
        );
    };

    const WrongTab = (props) => {
        return (
            <View style={styles.wrongs}>
                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                    <View style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: "#FF3B3F", marginHorizontal: 20 }} />
                    <Text style={{ alignSelf: 'center', fontSize: 20 }}>{props.wrong} Wrong</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.background}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View>
                    <Image
                        source={require('../../../assets/images/confetti.png')}
                        style={styles.confetti}
                    />
                </View>
                <View style={styles.question}>
                    <View style={styles.mainQuestion}>
                        <Text style={styles.mainQuestionText}>Your Score</Text>
                    </View>
                    <View>
                        <Progress.Circle
                            size={120}
                            progress={(props.correct / (props.correct + props.wrong))}
                            thickness={8}
                            color="#44B77B"
                            unfilledColor="#F3F4FA"
                            borderWidth={0}
                            style={{ alignSelf: 'center', marginVertical: 12 }}
                            showsText
                            strokeCap="round"
                            formatText={() => (
                                <Text style={{fontWeight: 'bold'}}>{(props.correct / (props.correct + props.wrong)) * 100}%</Text>
                            )}
                        />
                        <CorrectTab correct={props.correct} />
                        <WrongTab wrong={props.wrong} />
                    </View>
                    <Pressable onPress={async ()=>{
                        await fetch("/api/answers", {
                            method: "DELETE",
                          });
                        navigation.dispatch(
                            StackActions.popToTop()
                        );
                    }}>
                    <View style={styles.customButton}>
                        <Text style={styles.buttonText}> Start Again </Text>
                    </View>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#AF9CF3',
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    confetti: {
        width: '100%',
        height: 85,
        resizeMode: 'contain',
    },
    question: {
        backgroundColor: 'white',
        marginTop: 50,
        flex: 1,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    mainQuestion: {
        alignSelf: 'center',
        paddingTop: Dimensions.get('window').width / 9,
        marginHorizontal: 20,
    },
    mainQuestionText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    corrects: {
        backgroundColor: "rgba(68, 183, 123, 0.12)",
        width: Dimensions.get('window').width * 0.8,
        height: 100,
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 6,
        marginVertical: 12,
    },
    wrongs: {
        backgroundColor: "rgba(255, 59, 63, 0.12)",
        width: Dimensions.get('window').width * 0.8,
        height: 100,
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 12,
        margin: 6,
    },
    customButton: {
        backgroundColor: '#FF3B3F',
        borderRadius: 100,
        width: Dimensions.get('window').width * 0.8,
        height: 50,
        alignSelf: 'center',
        marginVertical: 30,
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default GetScore;
