import React, { useState} from 'react';
import classNames from 'classnames';

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






  function trueItem() {
              return answer.right == true
                  ? (setClass('correct'), setActiveBtn('active'))
                  : (setClass('selected'), setActiveBtn('active'));
          }





  return (
    <div
      className={classNames('item', activeClass, classCorrect, disabledClass)}
      onClick={() => {

          let b = JSON.parse(localStorage.getItem('answers'))
          b.push(answer)
          localStorage.setItem('answers', JSON.stringify(b))

        trueItem();
      }}>
      <span className="desc">{answer.answer_text}</span>
    </div>
  );
};

export default ButtonQuestAnsw;
