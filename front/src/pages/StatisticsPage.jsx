import React, {useCallback, useContext, useEffect, useState} from 'react';
import { StatisticsItem } from '../components';
import Background from '../images/content/quiz-resultbg.jpg';
import style from './StatisticsPage.module.css';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";

function StatisticsPage({}) {

    const {request, loading} = useHttp()
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
    if(loading){
        return <Loader/>
    }

    if(!loading && statistic && statistic.length == 0){
        return <h2 style={{textAlign: 'center', marginTop: '20px'}}>Ти не пройшов жодного тесту</h2>
    }
  return (
    <div
      className={style.inner}
      style={{
        background: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <span className={style.title}>Твій прогрес</span>
      <div className={style.items}>
          {
              !loading && statistic &&
                  statistic.map(item => {
                      return(
                          <>
                          {!loading && statistic && <StatisticsItem className={`c100 p${(item.grade/item.questions_length)*100} green`} item={item}/>}
                          </>
                      )
                  })
          }
        {/*<StatisticsItem className="c100 p1 green" />*/}
        {/*<StatisticsItem className="c100 p100 green" />*/}
        {/*<StatisticsItem className="c100 p60 green" />*/}
        {/*<StatisticsItem className="c100 p30 green" />*/}
        {/*<StatisticsItem className="c100 p10 green" />*/}
        {/*<StatisticsItem className="c100 p70 green" />*/}
      </div>
    </div>
  );
}

export default StatisticsPage;
