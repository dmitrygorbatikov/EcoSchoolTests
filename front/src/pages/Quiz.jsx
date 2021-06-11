import React, {useCallback, useContext, useEffect, useState} from 'react';
import { QuizAnswer } from '../components';

import Background from '../images/content/quiz-bg.svg';
import style from './Quiz.module.css';

import { useParams } from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";

function Quiz() {
  const { id } = useParams();
    const {request,loading} = useHttp()
    const {token} = useContext(AuthContext)
    const [quizInfo, setQuizInfo] = useState([])

    const getQuizInfo = useCallback(async () => {
        const fetched = await request(`/api/quiz/get-quiz/${id}`, 'GET', null, {
            Authorization: `Bearer ${token}`,
        })
        setQuizInfo(fetched)

    }, [token, request])

    useEffect(() => {
        getQuizInfo()
    }, [getQuizInfo])

    let arr = []
    localStorage.setItem('answers', JSON.stringify(arr))

    if(loading){
        return <Loader/>
    }


  return (
    <div
      className={style.quiz}
      style={{
        backgroundImage: `url(${quizInfo.background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="container">
        <div style={{textAlign: 'center'}} className={style.wrapper}>
            {!loading && quizInfo.questions && quizInfo.quiz_title && <QuizAnswer questions={quizInfo.questions} quizTitle={quizInfo.quiz_title} id={id} />}
        </div>
      </div>
    </div>
  );
}
export default Quiz;
