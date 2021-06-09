import classNames from 'classnames';
import React, {useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import { Quest } from '../components';
import style from './QuizAnswer.module.css';

const QuizAnswer = ({ questions, quizTitle }) => {

    const [currentStep, setCurrentStep] = React.useState(0);
    const [counter, setCounter] = React.useState(0);

    let numberStep = questions.length;

    function stepCountThisQuest(currentStep) {
      let newCount = 0;
      if (currentStep < numberStep) {
        return (newCount = currentStep + 1);
      } else {
        return (newCount = 0);
      }
    }

    let newArr = questions.map((el, index) => {
      return (
        <div style={{textAlign: 'center'}} className={classNames(style.card, index == currentStep ? style.active : '')}>
          <Quest
              quizTitle={quizTitle}
              question={el}
              questions_length={questions.length}

              onClick={async (currentStep) => {
                  setCurrentStep((p) => ++p)
              }}
              currentStep={currentStep}
              numberStep={numberStep}
          />
        </div>
      );
    });
    return (
      <div  className={style.wrapper}>
        <div className={style.inner}>
          <svg
            width="20"
            height="14"
            viewBox="0 0 20 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 7C20 6.79375 19.9248 6.59595 19.7908 6.45011C19.6569 6.30426 19.4752 6.22233 19.2858 6.22233H2.43969L6.93512 1.32924C7.00153 1.25694 7.0542 1.1711 7.09014 1.07663C7.12608 0.982158 7.14458 0.880905 7.14458 0.778651C7.14458 0.676397 7.12608 0.575144 7.09014 0.480674C7.0542 0.386204 7.00153 0.300366 6.93512 0.228061C6.86871 0.155757 6.78988 0.0984022 6.70311 0.0592713C6.61635 0.0201405 6.52335 0 6.42944 0C6.33552 0 6.24253 0.0201405 6.15576 0.0592713C6.069 0.0984022 5.99016 0.155757 5.92376 0.228061L0.209835 6.44941C0.14332 6.52165 0.0905481 6.60747 0.0545412 6.70195C0.0185342 6.79642 0 6.89771 0 7C0 7.10229 0.0185342 7.20358 0.0545412 7.29805C0.0905481 7.39253 0.14332 7.47835 0.209835 7.55059L5.92376 13.7719C5.99016 13.8442 6.069 13.9016 6.15576 13.9407C6.24253 13.9799 6.33552 14 6.42944 14C6.52335 14 6.61635 13.9799 6.70311 13.9407C6.78988 13.9016 6.86871 13.8442 6.93512 13.7719C7.00153 13.6996 7.0542 13.6138 7.09014 13.5193C7.12608 13.4249 7.14458 13.3236 7.14458 13.2213C7.14458 13.1191 7.12608 13.0178 7.09014 12.9234C7.0542 12.8289 7.00153 12.7431 6.93512 12.6708L2.43969 7.77767H19.2858C19.4752 7.77767 19.6569 7.69574 19.7908 7.5499C19.9248 7.40405 20 7.20625 20 7Z"
              fill="#353535"
            />
          </svg>

          {/*<span className={style.title}>{quizTitle}</span>*/}
          <Link to="/Home">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L8 8M15 15L8 8M8 8L15 1L1 15" stroke="#353535" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
        <div className={style.breadcrumbs}>
          <span className={style.breadcrumbs__first}>{stepCountThisQuest(currentStep)}</span>/
          <span className={style.breadcrumbs__last}>{numberStep}</span>
        </div>
        <div className={style.items}>{newArr}</div>
      </div>
    );
};

export default QuizAnswer;
