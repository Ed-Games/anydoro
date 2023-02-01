import styles from "./styles.module.scss";

interface IProgressBarProps {
  value: number;
}

export const Progressbar = ({ value }: IProgressBarProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span>Progresso</span>
        <span>{value/100 * 4} de 4</span>
      </div>
      <div className={styles.progressBarContainer}>
      <div
        style={{ width: `${value}%` }}
        role="progressbar"
        arial-label="Progresso do pomodoro"
        aria-valuenow={value}
        title="Progresso do pomodoro"
      />
    </div>
    </div>
  );
};
