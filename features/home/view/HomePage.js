import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StackActions } from '@react-navigation/native';

// import { sampleData } from '../../quiz/sampleData';
import { Question} from '../../quiz/model/question_model';



export default function HomePage({ navigation }) {

    const [questionList, setQuestionList] = useState([]);

    const getQuestions = async () => {
        try {
            const response = await fetch("/api/questions");
            const data = await response.json();
            const updatedQuestions = Object.keys(data).map((key) => {
                const { id, question, options, answer, showImage, imageLink } =
                    data[key];
                return new Question(
                    id,
                    question,
                    options,
                    answer,
                    showImage,
                    imageLink
                );
            });
            setQuestionList(updatedQuestions);
        } catch (error) {
            console.error('Error:', error);
        }
    };



    useEffect(() => {
        getQuestions();
    }, []);




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
                    <Start navigation={navigation} questionList={questionList} />
                </View>
            </LinearGradient>
        </View>
    )

};

const Start = (props) => {
    return (
        props.questionList.length > 1 ? (
            <Pressable onPress={() => {
                props.navigation.dispatch(
                    StackActions.push("Quiz", { id: 1, questionList: props.questionList })
                );
            }}>
                <View style={styles.customButton}>
                    <Text style={styles.buttonText}>Start</Text>
                </View>
            </Pressable>
        ) : (
            <Pressable>
                <View style={styles.disabledButton}>
                    <Text style={styles.buttonText}>Start</Text>
                </View>
            </Pressable>
        )
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
        borderRadius: (Dimensions.get('window').width - 170) / 2,
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
        width: Dimensions.get('window').width * 0.8,
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

    },
    disabledButton: {
        backgroundColor: '#d9cade'
    }
});