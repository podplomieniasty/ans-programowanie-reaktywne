import React from "react";
import Table from "../Table/Table";

const Answers = (props) => {
    return (
        <Table
            markedAnswer = {props.markedAnswer}
            checkAnswer = {props.checkAnswer}
            answers = {props.currentAnswers}
            >
        </Table>
    )
}

export default Answers;