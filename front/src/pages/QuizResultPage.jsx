import React, {useCallback, useContext, useEffect, useState} from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import happySmail from '../images/happyIcon.svg';
import sadSmail from '../images/sadIcon.svg';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
const QuizResultPage = () => {
  const {request, loading} = useHttp()
  const {token} = useContext(AuthContext)
  // const { trueQuest, numberStep } = useParams();
  const resultId = useParams().id

  const [result, setResult] = useState('')

  const getResult = useCallback(async () => {
    try{
      const fetched = await request(`/api/quiz/get-test-result/${resultId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setResult(fetched)

    } catch (e) {
    }
  }, [token, request])

  useEffect(() => {
    getResult()
  }, [getResult])

  let resultTitle = 'Молодець!';
  let svgPlanet = happySmail;
  let button = '';
  let activClass = '';

  // if more than a half this true happy
  function choiceOfAnswer() {
    if (result.grade < result.questions_length / 2) {
      resultTitle = 'Ти можеш краще!';
      svgPlanet = sadSmail;
      activClass = 'active';
    }
  }
  choiceOfAnswer();

  if(loading){
    return <Loader/>
  }

  return (
    <div class="result__inner">
      <span className={classNames('result__title', activClass)}>{resultTitle}</span>

      <img class="result__planet" src={svgPlanet} alt="smail" />
      <div class="result__points">
        <span>Твій результат</span>:
        <div className="result__box">
          <span className={classNames('result__count', activClass)}>{result.grade}</span>/
          <span className={classNames('result__count result__count--izzy', activClass)}>
            {result.questions_length}
          </span>
        </div>
      </div>
      <Link to="/home">
        <a className={classNames('result__button', activClass)} href="#">
          Повернутися до тестів
        </a>
      </Link>
    </div>
  );
};

export default QuizResultPage;
