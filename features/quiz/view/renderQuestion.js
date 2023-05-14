import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Question } from '../model/question_model';
import { sampleData } from '../sampleData';
import QuizPage from './quizPage';
import Lottie from 'lottie-react-native';


const RenderQuestion = (props) => {
  // The props this will take is page index to match with id. 
  // This way when the 'next' page is built, the id page is called from here.


  const [questionList, setQuestionList] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (index) => {
    {
      selectedOption !== index
        ? setSelectedOption(index)
        : setSelectedOption(null);
    }
  };

  const getQuestions = () => {
    try {
      const data = sampleData;
      // const data = await response.json();
      const updatedQuestions = Object.keys(data).map((key) => {
        const { id, question, options, answer, showImage, imageLink } =
          data[key];
        // console.log(data[key]);
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
    <View>
      {
        questionList.length > 0 ?
          (
            <QuizPage
              qlen={questionList.length}
              id={props.id}
              question={questionList[props.id].question}
              showImage={questionList[props.id].showImage}
              imageLink={questionList[props.id].imageLink}
              options={questionList[props.id].options}
              onPress={handleOptionPress}
              selectedOption={selectedOption} />
          )
          : (
            <Lottie source={require('../../../assets/animations/loading.json')} autoPlay loop />
          )
      }
    </View>
  );

};


export default RenderQuestion;
