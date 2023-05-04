import React, {useState} from "react";

import questions from '../../resources/questions.json'

import Question from "../Question/Question";
import Answers from "../QuestionActions/Answers";
import Results from "../QuestionActions/Results";
import Actions from "../QuestionActions/Actions";

const styles = {
    display: 'flex',
    justifyContent: 'center'
};

const QuizComponent = (props) => {

    // setup hooków
    const [currentIndex, setIndex] = useState(0);
    const [currentQuestion, setQuestion] = useState(questions[currentIndex]);
    const [currentPoints, setPoints] = useState(0);
    const [allowedToChose, changePermission] = useState(true);
    const [markedAnswer, markAnswer] = useState({
        key: -1,
        variant: '',
    });

    // przechodzenie do pytania
    const quiz_goToNextQuestion = () => {
        const nextVal = currentIndex + 1;
        if(nextVal > questions.length - 1) {
            setIndex(questions.length - 1);
            return;
        }
        setIndex(nextVal);
        setQuestion(questions[nextVal]);
        changePermission(true);
        markAnswer({key: -1, variant: ''});
    }

    const quiz_goToPrevQuestion = () => {
        const prevVal = currentIndex - 1;
        if(prevVal < 0) {
            setIndex(0);
            return;
        }
        setIndex(prevVal);
        setQuestion(questions[prevVal]);
        changePermission(true);
        markAnswer({key: -1, variant: ''});
    }

    // sprawdzenie odpowiedzi
    const quiz_checkForAnswer = (choice, key) => {
        if(!allowedToChose) {
            return;
        }
        if(currentQuestion.correct_answer === choice) {
            const points = currentPoints + 1;
            setPoints(points);
            changePermission(false);
            markAnswer({
                key,
                variant: 'bg-success'
            });
        } else {
            changePermission(false);
            markAnswer({
                key,
                variant: 'bg-danger'
            });
        }
    }

    return (
        <div style={styles}>
            <div className="container">
            <Question 
                className="col-12"
                currentQuestion={currentQuestion.question}
                currentIndex={currentIndex + 1}
                allQuestions={questions.length}
            >
            </Question>
            <Answers 
                className="col-12"
                checkAnswer={quiz_checkForAnswer}
                currentAnswers={currentQuestion.answers}
                markedAnswer={markedAnswer}
                />
            <Results 
                points={currentPoints}
            />
            <Actions 
                disablePrev = {currentIndex > 0}
                disableNext = {currentIndex !== questions.length - 1}
                prev={quiz_goToPrevQuestion}
                next={quiz_goToNextQuestion}
            />
            </div>
        </div>   
    );
}

export default QuizComponent;