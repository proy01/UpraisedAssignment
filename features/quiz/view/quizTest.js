import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Lottie from 'lottie-react-native';
import * as Progress from 'react-native-progress';

// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


class Question {
  constructor(id, question, options, answer, showImage, imageLink) {
    this.id = id;
    this.question = question;
    this.options = options;
    this.answer = answer;
    this.showImage = showImage;
    this.imageLink = imageLink;
  }
}
// const sampleData = {};
const sampleData = {
  "1": {
    "id": 1,
    "question": "Which artist released the hit single 'Shape of You'? Which artist released the hit single 'Shape of You'?",
    "options": [
      "Ed Sheeran",
      "Justin Bieber",
      "Bruno Mars",
      "Taylor Swift",
      "Adele",
      "Shawn Mendes",
      "Drake"
    ],
    "answer": "Ed Sheeran",
    "showImage": true,
    "imageLink": "https://drive.google.com/file/d/12u0Q06DmCQVETsUPwfGk8eo1AqbR5ULi/preview"
  },
  "2": {
    "id": 2,
    "question": "Which band is known for the song 'Hey Jude'?",
    "options": [
      "The Beatles",
      "Coldplay",
      "Queen",
      "Led Zeppelin",
      "U2",
      "Nirvana",
      "AC/DC"
    ],
    "answer": "The Beatles",
    "showImage": true,
    "imageLink": "https://drive.google.com/file/d/1tAZrm6arqsFp41UCOO-00YznYk8Q_MLY/preview"
  },
  "3": {
    "id": 3,
    "question": "Who won the 'Album of the Year' at the 2021 Grammy Awards?",
    "options": [
      "Taylor Swift",
      "Dua Lipa",
      "Beyoncé",
      "Post Malone",
      "Billie Eilish",
      "Harry Styles",
      "Ariana Grande"
    ],
    "answer": "Taylor Swift",
    "showImage": true,
    "imageLink": "https://drive.google.com/file/d/1Jcw1V6ht0hyvRLdjgx1sJne4poQHGBTq/preview"
  },
  "4": {
    "id": 4,
    "question": "Which artist released the album 'Lemonade'?",
    "options": [
      "Beyoncé",
      "Rihanna",
      "Kendrick Lamar",
      "Drake",
      "Adele",
      "Justin Timberlake",
      "The Weeknd"
    ],
    "answer": "Beyoncé",
    "showImage": true,
    "imageLink": "https://drive.google.com/file/d/11Hg06-knw4rsiRVgNVY-WIArWkKxFeE8/preview"
  },
  "5": {
    "id": 5,
    "question": "Who performed the Super Bowl halftime show in 2020?",
    "options": [
      "Jennifer Lopez and Shakira",
      "Justin Timberlake",
      "Coldplay",
      "Beyoncé",
      "Lady Gaga",
      "Katy Perry",
      "Bruno Mars"
    ],
    "answer": "Jennifer Lopez and Shakira",
    "showImage": true,
    "imageLink": "https://drive.google.com/file/d/1ipgUJsFiu-d0kjIDOE0chQGdPySgfT5r/preview"
  }
}


const YourComponent = () => {

  const [questionList, setQuestionList] = useState([]);

  const getQuestions = () => {
    try {
      const data = sampleData;
      // const data = await response.json();
      const updatedQuestions = Object.keys(data).map((key) => {
        const { id, question, options, answer, showImage, imageLink } = data[key];
        // console.log(data[key]);
        return new Question(id, question, options, answer, showImage, imageLink);
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
    <View style={styles.background}>
      <View>
        <Image source={require('../../../assets/images/confetti.png')} style={styles.confetti} />
      </View>
      {questionList.length > 0 ? (
        <View style={styles.question}>
          <NumberCircle current={1} total={5} />
          <View style={styles.mainQuestion}>
            <Text style={styles.mainQuestionText}>{questionList[0].question}</Text>
          </View>
          {questionList[0].showImage ? (
            <View>
              <Image source={{ uri: "https://images2.imgbox.com/8a/cd/2X3yoZW4_o.jpeg" }} style={styles.image} />
            </View>
          ) : (
            <Lottie source={require('../../../assets/animations/loading.json')} autoPlay loop />
          )}
        </View>
      ) : (
        <Lottie source={require('../../../assets/animations/loading.json')} autoPlay loop />
      )}

    </View>
  );
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
        strokeCap='round'
        formatText={() => (
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.currentPage}>{`${props.current}`}</Text>
            <Text style={styles.totalQuestion}>/{props.total}</Text>
          </View>
        )} />
    </View>
  );
};

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
  circle: {
    alignSelf: 'center',
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderRadius: (Dimensions.get('window').width / 3) / 2,
    backgroundColor: "#FFFFFF",
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
    color: "#7C827E",
    fontWeight: 'bold',
    textAlignVertical: 'bottom',
    fontStyle: 'italic',
  },
  mainQuestion: {
    paddingTop: ((Dimensions.get('window').width / 3) / 2) + 20,
    marginHorizontal: 20,
  },
  mainQuestionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    alignSelf: 'center',
    width: "70%", 
    height: 200, 
    resizeMode: 'contain',
  }
});

export default YourComponent;