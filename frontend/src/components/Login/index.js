import styles from '../../../styles/components/Login.module.css';
import Link from 'next/link';

export default () => {
  return (
    <div className={styles.container}>

      <div className={styles.containerHeaderbar}>
        <p>Calcule seu Tempo de Trabalho</p>
        <Link href="/PageCalculate">
          <a>Calcular <img className={styles.imageClock} src="/relogio.png" /></a>
        </Link>
      </div>

      <div>
        <img
          className={styles.containerImage}
          src="/Hora-Extra.jpg"
          alt="Calculo das Horas Tabalhadas"
        />
      </div>

    </div>
  );
}