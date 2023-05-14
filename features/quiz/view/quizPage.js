import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';
import Lottie from 'lottie-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NumberCircle } from './numberCircle';
import { RenderOptions } from './renderOptions';


const QuizPage = (props) => {
    // All the props that this requires:
    // 1. questionList.length (qlen)
    // 2. id
    // 3. question
    // 4. showImage
    // 5. imageLink
    // 6. options
    // 7. onPress

    return (
        <View style={styles.background}>
            <ScrollView>
                <View>
                    <Image
                        source={require('../../../assets/images/confetti.png')}
                        style={styles.confetti}
                    />
                </View>
                {props.qlen > 0 ? (
                    <View style={styles.question}>
                        <NumberCircle current={props.id} total={5} />
                        <View style={styles.mainQuestion}>
                            <Text style={styles.mainQuestionText}>
                                {props.question}
                            </Text>
                        </View>
                        {props.showImage ? (
                            <View>
                                <View style={{ paddingVertical: 16 }}>
                                    <Image
                                        source={{ uri: props.imageLink }}
                                        style={styles.image}
                                    />
                                </View>
                                <View style={{ alignSelf: 'center', paddingVertical: 16 }}>
                                    <RenderOptions options={props.options} onPress={props.onPress} selectedOption={props.selectedOption} />
                                </View>
                                <View style={styles.customButton}>
                                    <Text style={styles.buttonText}> Next </Text>
                                    <MaterialIcons name="arrow-forward" size={24} color="#FFF" style={styles.buttonIcon} />
                                </View>
                            </View>
                        ) : (
                            <View></View>
                        )}
                    </View>
                ) : (
                    <Lottie
                        source={require('../../../assets/animations/loading.json')}
                        autoPlay
                        loop
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#AF9CF3',
        flex: 1,
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
        paddingTop: Dimensions.get('window').width / 3 / 2 + 20,
        marginHorizontal: 20,
    },
    mainQuestionText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        alignSelf: 'center',
        width: '70%',
        height: 200,
        resizeMode: 'contain',
    },

    customButton: {
        backgroundColor: '#FF3B3F',
        borderRadius: 100,
        width: Dimensions.get('window').width * 0.8,
        height: 50,
        alignSelf: 'center',
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonIcon: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default QuizPage;