import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import Lottie from 'lottie-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { StackActions } from '@react-navigation/native';


const GetQuiz = ({ route, navigation }) => {

    const props = route.params;

    const [selectedOption, setSelectedOption] = useState(null);
    const [answerList, setAnswers] = useState([]);
    const [answerKey, updateKey] = useState([]);


    const handleOptionPress = (index) => {
        {
            selectedOption !== index
                ? setSelectedOption(index)
                : setSelectedOption(null);
        }
    };

    const postSelectedAnswer = async (questionId, selectedAnswer) => {
        try {
            const response = await fetch('/api/answers', {
                method: 'POST',
                body: JSON.stringify({
                    questionId,
                    selectedAnswer,
                }),
            });

            if (response.ok) {
                // Success!
                const data = await response.json();
            } else {
                // Handle the error response
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors or exceptions
            console.error('Error:', error);
        }
    };

    const getAnswers = async () => {
        try {
            const response = await fetch("/api/answers");
            const data = await response.json()
            const ansKey = await fetch("/api/questions");
            const keys = await ansKey.json();
            const updatedKey = Object.keys(keys).map((key) => {
                const { id, question, options, answer, showImage, imageLink } =
                    keys[key];
                return { "id": id, "questionId": id, "answer": answer }
            });
            setAnswers(data);
            updateKey(updatedKey);
        } catch (e) {
            console.error('Error: ', e);
        }
    };

    const RenderOptions = (props) => {
        return props.options.map((option, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    styles.optionButton,
                    selectedOption === index && styles.selectedOptionButton,
                ]}
                onPress={() => { handleOptionPress(index) }}>
                {selectedOption === index ? (
                    <View style={styles.selectedOption}>
                        <MaterialIcons name="check" size={24} color="#FFF" />
                    </View>
                ) : (
                    <View style={styles.emptyOption} />
                )}
                <Text
                    style={[
                        styles.optionText,
                        selectedOption === index && styles.selectedOptionText,
                    ]}>
                    {option}
                </Text>
            </TouchableOpacity>
        ));
    };

    const NumberCircle = (props) => {
        return (
            <View style={styles.circle}>
                <Progress.Circle
                    size={120}
                    progress={props.current / props.total}
                    thickness={8}
                    color="#44B77B"
                    unfilledColor="#F3F4FA"
                    borderWidth={0}
                    showsText
                    strokeCap="round"
                    formatText={() => (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.currentPage}>{`${props.current}`}</Text>
                            <Text style={styles.totalQuestion}>/{props.total}</Text>
                        </View>
                    )}
                />
            </View>
        );
    };

    return (
        <View style={styles.background}>
            <ScrollView>
                <View>
                    <Image
                        source={require('../../assets/images/confetti.png')}
                        style={styles.confetti}
                    />
                </View>
                {props.questionList.length > 0 ? (
                    <View style={styles.question}>
                        <NumberCircle current={props.id} total={5} />
                        <View style={styles.mainQuestion}>
                            <Text style={styles.mainQuestionText}>
                                {props.questionList[props.id - 1].question}
                            </Text>
                        </View>
                        {props.questionList[props.id - 1].showImage ? (
                            <View>
                                <View style={{ paddingVertical: 16 }}>
                                    <Image
                                        source={{ uri: props.questionList[props.id - 1].imageLink }}
                                        style={styles.image}
                                    />
                                </View>
                                <View style={{ alignSelf: 'center', paddingVertical: 16 }}>
                                    <RenderOptions options={props.questionList[props.id - 1].options} />
                                </View>
                                {props.id !== 5 ? (
                                    <Pressable onPress={() => {
                                        postSelectedAnswer(props.id, props.questionList[props.id - 1].options[selectedOption]);
                                        navigation.dispatch(
                                            StackActions.push("Quiz", { id: props.id + 1, questionList: props.questionList })
                                        );
                                    }}>
                                        <View style={styles.customButton}>
                                            <Text style={styles.buttonText}> Next </Text>
                                            <MaterialIcons name="arrow-forward" size={24} color="#FFF" style={styles.buttonIcon} />
                                        </View>
                                    </Pressable>
                                ) : (
                                    <Pressable onPress={() => {
                                        postSelectedAnswer(props.id, props.questionList[props.id - 1].options[selectedOption])
                                        getAnswers();
                                    }}>
                                        <View style={styles.customButton}>
                                            <Text style={styles.buttonText}> Submit </Text>
                                            <MaterialIcons name="arrow-forward" size={24} color="#FFF" style={styles.buttonIcon} />
                                        </View>
                                    </Pressable>
                                )}
                            </View>
                        ) : (
                            <View>
                            </View>
                        )}
                    </View>
                ) : (
                    <Lottie
                        source={require('../../assets/animations/loading.json')}
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
    circle: {
        alignSelf: 'center',
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
        borderRadius: Dimensions.get('window').width / 3 / 2,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -60,
    },
    currentPage: {
        fontSize: 40,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    totalQuestion: {
        fontSize: 24,
        color: '#7C827E',
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignSelf: 'flex-end',
    },
    optionButton: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.9,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        backgroundColor: '#F3F4FA',
        borderRadius: 20,
        alignItems: 'center',
    },
    selectedOptionButton: {
        borderColor: '#4CAF50',
        borderWidth: 2,
    },
    selectedOption: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4CAF50',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyOption: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 10,
    },
    optionText: {
        fontSize: 16,
    },
    selectedOptionText: {
        fontWeight: 'bold',
    },
});

export default GetQuiz;