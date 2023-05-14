import React, { useEffect, useState } from 'react';
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

    // The params it takes is the id for the page and the list of questions to get the question for this page from.
    const props = route.params;

    // many useState hooks for state managment. These variable are passed through the tree 
    // for calculating score and maintaining overall data throughtout the cycle.
    const [selectedOption, setSelectedOption] = useState(null);
    const [answerList, setAnswers] = useState([]);
    const [answerKey, updateKey] = useState([]);
    const [startTime, setStartTime] = useState(null);

    // Selects the option from list provided
    const handleOptionPress = (index) => {
        {
            selectedOption !== index
                ? setSelectedOption(index)
                : setSelectedOption(null);
        }
    };

    // Sends a request to the api to store the answer from the current quiz page
    const postSelectedAnswer = async (questionId, selectedAnswer) => {
        try {
            const elapsedTime = Math.max(0, Date.now() - startTime);
            const response = await fetch('/api/answers', {
                method: 'POST',
                body: JSON.stringify({
                    questionId,
                    selectedAnswer,
                    elapsedTime,
                }),
            });

            if (response.ok) {
                // Success!
                const data = await response.json();
                return true;
            } else {
                // Handle the error response
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors or exceptions
            console.error('Error:', error);
        }
    };

    // If last page, this calls all the saved answers to check for score calculation
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
            return { answerKey: updatedKey, answerList: data };
        } catch (e) {
            console.error('Error: ', e);
        }
    };

    // A component that only deals with listing clickable components
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

    // This component shows how many questions are done.
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

    // This function calculates the final scores.
    const calculateScore = async (answerKey, answerList) => {

        let correct = 0;
        let wrong = 0;

        for (let i = 0; i < answerKey.length; i++) {
            if (answerKey[i]["answer"] === answerList[i]["selectedAnswer"]) {
                correct++;
            } else {
                wrong++
            }
        };

        return { correct, wrong };

    };


    // Binds the start time to the first render allowing us to measure elapsed time.
    useEffect(() => {
        setStartTime(Date.now());

        return () => {
            setStartTime(null);
        };
    }, []);

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
                        <NumberCircle current={props.id} total={props.questionList.length} />
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
                                    <Pressable onPress={async () => {
                                        await postSelectedAnswer(props.id, props.questionList[props.id - 1].options[selectedOption]);
                                        navigation.dispatch(
                                            StackActions.replace("Quiz", { id: props.id + 1, questionList: props.questionList })
                                        );
                                    }} disabled={selectedOption === null}>
                                        <View style={selectedOption !== null ? styles.customButton : styles.customButtonDisabled}>
                                            <Text style={styles.buttonText}> Next </Text>
                                            <MaterialIcons name="arrow-forward" size={24} color="#FFF" style={styles.buttonIcon} />
                                        </View>
                                    </Pressable>
                                ) : (
                                    <Pressable onPress={async () => {
                                        await postSelectedAnswer(props.id, props.questionList[props.id - 1].options[selectedOption]);
                                        let { answerKey, answerList } = await getAnswers();
                                        let { correct, wrong } = await calculateScore(answerKey, answerList);
                                        navigation.dispatch(
                                            StackActions.push("Score", { correct: correct, wrong: wrong }));
                                    }} disabled={selectedOption === null}>
                                        <View style={selectedOption !== null ? styles.customButton : styles.customButtonDisabled}>
                                            <Text style={styles.buttonText}> Submit </Text>
                                            <MaterialIcons name="arrow-forward" size={24} color="#FFF" style={styles.buttonIcon} />
                                        </View>
                                    </Pressable>
                                )}
                            </View>
                        ) : (
                            <View style={styles.question}>
                                <View style={{ alignSelf: 'center', paddingVertical: 16 }}>
                                    <RenderOptions options={props.questionList[props.id - 1].options} />
                                </View>
                                {props.id !== 5 ? (
                                    <Pressable onPress={async () => {
                                        await postSelectedAnswer(props.id, props.questionList[props.id - 1].options[selectedOption]);
                                        console.log(selectedOption);
                                        navigation.dispatch(
                                            StackActions.push("Quiz", { id: props.id + 1, questionList: props.questionList })
                                        );
                                    }} disabled={selectedOption === null}>
                                        <View style={selectedOption !== null ? styles.customButton : styles.customButtonDisabled}>
                                            <Text style={styles.buttonText}> Next </Text>
                                            <MaterialIcons name="arrow-forward" size={24} color="#FFF" style={styles.buttonIcon} />
                                        </View>
                                    </Pressable>
                                ) : (
                                    <Pressable onPress={async () => {
                                        await postSelectedAnswer(props.id, props.questionList[props.id - 1].options[selectedOption]);
                                        let { answerKey, answerList } = await getAnswers();
                                        let { correct, wrong } = await calculateScore(answerKey, answerList);
                                        navigation.dispatch(
                                            StackActions.push("Score", { correct: correct, wrong: wrong })
                                        );
                                    }} disabled={selectedOption === null}>
                                        <View style={selectedOption !== null ? styles.customButton : styles.customButtonDisabled}>
                                            <Text style={styles.buttonText}> Submit </Text>
                                            <MaterialIcons name="arrow-forward" size={24} color="#FFF" style={styles.buttonIcon} />
                                        </View>
                                    </Pressable>
                                )}
                            </View>
                        )}
                    </View>
                ) : (
                    <Lottie
                        source={require('../../assets/animations/loading.json')}
                        autoPlay
                        loop
                    />
                )
                }
            </ScrollView >
        </View >
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
    customButtonDisabled: {
        backgroundColor: '#FF3B3F',
        borderRadius: 100,
        width: Dimensions.get('window').width * 0.8,
        height: 50,
        alignSelf: 'center',
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        opacity: 0.15,
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