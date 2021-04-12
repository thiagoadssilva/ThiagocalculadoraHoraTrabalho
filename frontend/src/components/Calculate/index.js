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
  const [resultClock, setResultClock] = useState("");
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

      var hours1 = entrance1.split(':');
      var hours2 = entrance2.split(':');
      var hours3 = entrance3.split(':');
      var hours4 = entrance4.split(':');

      hours1 = (parseInt(hours2[0]) - parseInt(hours1[0]));
      hours2 = (parseInt(hours4[0]) - parseInt(hours3[0]));

      var minutes1 = entrance1.split(':');
      var minutes2 = entrance2.split(':');

      var totalsMinutes1 = 0;

      if (parseInt(minutes1[1]) != parseInt(minutes2[1])) {
        var totalsMinutes1;
        if (parseInt(minutes2[1]) < parseInt(minutes1[1])) {
          let diffMinutes1 = (parseInt(minutes1[1]) - parseInt(minutes2[1]));
          totalsMinutes1 = 60 - diffMinutes1;
          hours1 -= 1;
        } else {
          totalsMinutes1 = parseInt(minutes1[1]) + parseInt(minutes2[1]);
        }
      }


      var minutes3 = entrance3.split(':');
      var minutes4 = entrance4.split(':');

      var totalsMinutes2 = 0;

      if (parseInt(minutes3[1]) != parseInt(minutes4[1])) {
        var totalsMinutes2;
        if (parseInt(minutes4[1]) < parseInt(minutes3[1])) {

          let diffMinutes2 = (parseInt(minutes3[1]) - parseInt(minutes4[1]));
          totalsMinutes2 = 60 - diffMinutes2;
          console.log(totalsMinutes2)
          hours2 -= 1;
        } else {
          totalsMinutes2 = parseInt(minutes3[1]) + parseInt(minutes4[1]);
        }
      }


      console.log(hours2);

      var hours = hours1 + hours2;
      var minutes = totalsMinutes1 + totalsMinutes2;

      var parteInteira = Math.floor(minutes / 60);

      if (parteInteira >= 1) {
        hours += parseInt(parteInteira);
      }

      var resto = (minutes % 60);

      if (resto > 0) {
        minutes = resto;
      }

      var horaFinal = hours + "h " + minutes + "m";

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
