import React from 'react';
import style from './StatisticsItem.module.css';

function StatisticsItem({ className, item }) {

    return (
    <article className={style.item}>
      <div className={style.progress}>
          <span>{item.grade}</span>/<span>{item.questions_length}</span>
      </div>
      <div className={style.inner}>
        <div className={className}>
          <div className="slice">
            <div className="bar"></div>
            <div className="fill"></div>
          </div>
        </div>
      </div>
        <span className={style.title}>{item.quiz_title}</span>
        <span className={style.title}>{item.endDateTime}</span>
    </article>
  );
}

export default StatisticsItem;
