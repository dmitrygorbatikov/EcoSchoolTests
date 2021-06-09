import React, { useState, setState, Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import style from './Quest.module.css';

const ButtonQuestAnsw = ({
    question,
    answer,
    // id,
    // correct,
    setActiveBtn,
    classCorrect,
    disabledClass,
    numberStep,
    currentStep,
}) => {

  const [activeClass, setClass] = useState('');

  const [counterState, setCounterState] = useState(0);




  //поиск ид елемента труе
  let findTrueAnswer
  if(answer.right == true){
    findTrueAnswer = answer._id
  }
  // const findTrueAnswer = correct === true ? id : '';

  function trueItem() {
    return answer.right == true
      ? (setClass('correct'), setActiveBtn('active'))
      : (setClass('selected'), setActiveBtn('active'));
  }


  return (
    <div
      className={classNames('item', activeClass, classCorrect, disabledClass)}
      onClick={() => {

          let a = JSON.parse(localStorage.getItem('answers'))
          a.push(answer)
          localStorage.setItem('answers', JSON.stringify(a))

        trueItem();
      }}>
      <span className="desc">{answer.answer_text}</span>
    </div>
  );
};

export default ButtonQuestAnsw;
