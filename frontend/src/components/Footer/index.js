import styles from '../../../styles/components/Footer.module.css';

export default () => {
  return (
    <div className={styles.container}>
      <p> Thiago José da Silva</p>
      
      <a href="https://github.com/thiagoadssilva" alt="Site do GitHub Thiago jose da silva" target="_blank">
        <img src="/02.png" />
      </a>

      <a href="https://www.linkedin.com/in/thiagojosedasilva/" alt="Site do Linkedin Thiago jose da silva" target="_blank">
        <img src="/03.png" />
      </a>

    </div>
  );
}