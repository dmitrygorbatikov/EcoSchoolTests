import React, {useContext} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import { ButtonQuestAnsw } from '../components';
import style from './Quest.module.css';
import image from '../images/content/quest1.jpg';
import classNames from 'classnames';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

const Quest = ({
  quizTitle,
  questions_length,
  question,
  onClickNext,
  currentStep,
  numberStep
}) => {
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    const id = useParams().id
    const history = useHistory()
  const [activeBtn, setActiveBtn] = React.useState('');
  const imageHide = activeBtn === 'active' ? 'disabled' : '';

  function trueLink() {
    if (currentStep == numberStep - 1) {
      return (
          <div className={classNames('quest__link', activeBtn)} onClick={async () => {
              let body = {
                  'answers': JSON.parse(localStorage.getItem('answers')),
                  'quizId': id,
                  'questions_length': questions_length,
                  'quiz_title':quizTitle
              }
              const fetched = await request('/api/quiz/end-test', 'POST', body, {
                  Authorization: `Bearer ${token}`
              })
              history.push(`/quiz-result/${fetched._id}`)
              localStorage.removeItem('answers')
          }
          }>
            Закінчити тестування
          </div>
      );

    } else {
      return (
        <div className={classNames('quest__link', activeBtn)} onClick={onClickNext}>
          Наступне питання
        </div>
      );
    }
  }

  return (
    <div>
      <div className={style.quest}>
        <img className={classNames('quest-images', imageHide)} src={question.img} alt="quest" />

        <p className={classNames('quest-answer', activeBtn)}>{question.description}</p>
        <p className={classNames('quest-text', imageHide)}>{question.question_title}</p>
      </div>
      <div className={style.items}>
        {/* created answers this quest for id quiz */}
        {question &&
          question.answers.map((obj, index) => (
            <ButtonQuestAnsw
                question={question}
                answer={obj}
              setActiveBtn={setActiveBtn}
              classCorrect={obj.right === true ? 'respect' : ''}
              disabledClass={activeBtn === 'active' ? 'disabled' : ''}
              numberStep={numberStep}
              currentStep={currentStep}

            />
          ))}
      </div>
      <div> {trueLink()}</div>
    </div>
  );
};

export default Quest;
