import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";
import {useAuth} from "../hooks/auth.hook";
import {AuthContext} from "../context/AuthContext";

const QuizBlock = ({ quiz }) => {
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [statistic, setStatistic] = useState([])

  const getStatistic = useCallback(async () => {
    const fetched = await request('/api/quiz/get-user-statistics', 'GET', null, {
      Authorization: `Bearer ${token}`,
    })
    setStatistic(fetched)
    console.log(fetched)

  }, [request])

  useEffect(() => {
    getStatistic()
  }, [getStatistic])

  let a = false
  for (let i = 0; i < statistic.length; i++) {
    if(statistic[i].quizId == quiz._id){
      console.log(true)
      a = true
    }
  }

  if(loading){
    return <></>
  }

  return (
      <>


        <Link to={`/quiz/${quiz._id}`} className={a ? 'disabled' : ''}>

          <article id={quiz._id}
                   style={{backgroundColor: a ? '#bfbfbf' : quiz.color}}
                   className="card-eco">
            <div className="card-eco__box">
              <h2 className="card-eco__title">{quiz.quiz_title}</h2>
              <p style={{color: 'red', margin: 0, fontSize: '12px'}} className={!a ? 'quiz_display_none' : ''}>Ви вже проходили цей тест</p>
              {/*<span>клас {quiz.class}</span>*/}
            </div>
            <img className="card-eco__img" src={quiz.img} alt="images quiz" />
          </article>

        </Link>

      </>
  );
};

export default QuizBlock;
