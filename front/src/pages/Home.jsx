import React, {useCallback, useContext, useEffect, useState} from 'react';
import { QuizBlock } from '../components';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";

function Home() {
  const {request, loading} = useHttp()
  const {token} = useContext(AuthContext)
  const [user, setUser] = useState([])
  const [quizzes, setQuizzes] = useState([])

  const getUser = useCallback(async () => {
    try{
      const fetched = await request('/api/auth/get-user', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setUser(fetched)

    } catch (e) {
    }
  }, [token, request])

  const getQuizzes = useCallback(async () => {
    const fetched = await request('/api/quiz/get-quizzes', 'GET', null, {
      Authorization: `Bearer ${token}`,
    })
    setQuizzes(fetched)
  }, [request])

  useEffect(() => {
    getUser()
    getQuizzes()
  }, [getUser, getQuizzes])


  if(loading){
    return <Loader/>
  }



  return (
    <div className="container">
      <div className="content__inner">
        <span className="content__title title">Привіт, {user.name} {user.surname}</span>
        <p className="content__text">Доступні тести</p>

        <div className="content__box">
          {/* created component quizzes */}
          <div className="content__items">
            {quizzes && !loading &&
            quizzes.map(quiz => (
                <QuizBlock quiz={quiz}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
