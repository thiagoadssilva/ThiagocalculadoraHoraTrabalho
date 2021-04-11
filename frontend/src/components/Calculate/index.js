import { useState } from 'react';
import moment from 'moment';

import styles from '../../../styles/components/Calculate.module.css';
import Link from 'next/link';

import Footer from '../Footer';

export default () => {
  const [entrance1, setEntrance1] = useState();
  const [entrance2, setEntrance2] = useState();
  const [entrance3, setEntrance3] = useState();
  const [entrance4, setEntrance4] = useState();
  const [resultClock, setResultClock] = useState("00:00");
  const [alert, setAlert] = useState();

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

  function validateClock(entrance1, entrance2, entrance3, entrance4) {
    if (entrance1 < "07:50") {
      return "A hora da entrada 01 não pode ser menor que 07:50";
    }
    if (entrance2 < entrance1) {
      return "A hora da entrada 02, não pode ser menor que a entrada 01";
    }
    if (entrance3 < entrance2) {
      return "A hora da entrada 03, não pode ser menor que a entrada 02";
    }
    if (entrance4 < entrance3) {
      return "A hora da entrada 04, não pode ser menor que a entrada 03";
    }
  }

  function calculateTime() {

    var alert = validateClock(entrance1, entrance2, entrance3, entrance4);

    if (alert) {
      setAlert(alert);
    } else {
      setAlert('');
      
      var ms1 = moment(entrance1, "HH:mm:ss").diff(moment(entrance2, "HH:mm:ss"));
      var convert1 = moment.duration(ms1);
      var hours1 = Math.floor(convert1.asHours()) + moment.utc(ms1).format(":mm:ss");

      var ms2 = moment(entrance3, "HH:mm:ss").diff(moment(entrance4, "HH:mm:ss"));
      var convert2 = moment.duration(ms2);
      var hours2 = Math.floor(convert2.asHours()) + moment.utc(ms2).format(":mm:ss");

      var hours1 = hours1.split(':');
      var hours2 = hours2.split(':');
      var hours = parseInt(hours1[0], 10) + parseInt(hours2[0], 10);
      var minutes = parseInt(hours1[1], 10) + parseInt(hours2[1], 10);

      if (minutes >= 60) {
        minutes -= 60; hours += 1;
      }

      if (minutes == '0') {
        minutes = minutes + '0';
      }

      var horaFinal = Math.abs(hours) + ":" + minutes;

      if (horaFinal != 'NaN:NaN') {
        setResultClock(horaFinal);
      }
    }
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

        <p className={styles.alert}>{alert}</p>

        <a className={styles.containerButtonCalculator} onClick={calculateTime}>Calcular</a>

        <div className={styles.containerHours}>
          <p>{resultClock}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
