import { useState } from 'react';
import moment from 'moment';

import styles from '../../../styles/components/Calculate.module.css';
import Link from 'next/link';

export default () => {
  const [entrance1, setEntrance1] = useState();
  const [entrance2, setEntrance2] = useState();
  const [entrance3, setEntrance3] = useState();
  const [entrance4, setEntrance4] = useState();
  const [resultClock, setResultClock] = useState("00:00");

  function catchTime1(event) {
    setEntrance1(event.target.value);
  }
  function catchTime2(event) {
    setEntrance2(event.target.value);
  }
  function catchTime3(event) {
    setEntrance3(event.target.value);
  }
  function catchTime4(event) {
    setEntrance4(event.target.value);
  }
  
  function calculateTime() {

    var ms1 = moment(entrance1, "HH:mm").diff(moment(entrance2, "HH:mm"));
    var convert1 = moment.duration(ms1);
    var hours1 = Math.floor(convert1.asHours()) + moment.utc(ms1).format(":mm:ss");

    var ms2 = moment(entrance3, "HH:mm").diff(moment(entrance4, "HH:mm"));
    var convert2 = moment.duration(ms2);
    var hours2 = Math.floor(convert2.asHours()) + moment.utc(ms2).format(":mm:ss");


    var hours1 = hours1.split(':');
    var hours2 = hours2.split(':');
    var horasTotal = parseInt(hours1[0], 10) + parseInt(hours2[0], 10);
    var minutosTotal = parseInt(hours1[1], 10) + parseInt(hours2[1], 10);

    if (minutosTotal >= 60) {
      minutosTotal -= 60; horasTotal += 1;
    }
    var horaFinal = horasTotal + ":" + minutosTotal;
    //return horaFinal; 
    setResultClock(horaFinal)
    console.log(horaFinal);
  }



  return (
    <div>
      <div className={styles.container}>

        <div className={styles.containerHeaderbar}>
          <p>Calcule seu Tempo de Trabalho</p>
          <Link href="/">
            <a>Sair</a>
          </Link>
        </div>

        <div className={styles.containerHours}>
          <div>
            <p>Entrada 01</p>
            <input type="time" value={entrance1} onChange={catchTime1} />
          </div>
          <div>
            <p>Entrada 02</p>
            <input type="time" value={entrance2} onChange={catchTime2} />
          </div>
          <div>
            <p>Entrada 03</p>
            <input type="time" value={entrance3} onChange={catchTime3} />
          </div>
          <div>
            <p>Entrada 04</p>
            <input type="time" value={entrance4} onChange={catchTime4} />
          </div>
        </div>

        <a className={styles.containerButtonCalculator} onClick={calculateTime}>Calcular</a>

        <div className={styles.containerHours}>
          <p>{resultClock}</p>
        </div>


      </div>
    </div>
  );
}