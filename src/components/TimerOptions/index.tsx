import { Formik } from "formik";
import { Modal } from "../Modal";
import styles from "./styles.module.scss";
import { timerOptionsSchema } from "../../validators/timerOptionsSchema";
import { TimeInput } from "../TimeInput";
import { textToSenconds } from "../../utils/textToSeconds";
import { useEffect, useState } from "react";
import { useTimer } from "../../hooks/useTimer";
import { secondsToText } from "../../utils/secondsToText";

interface ITimerOptionsProps {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
}

interface ITimerOptions {
  pomodoro: string;
  shortBreak: string;
  longBreak: string;
}

export const TimerOptions = ({
  isVisible,
  setIsVisible,
}: ITimerOptionsProps) => {
  const [initialValues, setInitialValues] = useState<ITimerOptions>();
  const { timerOptions } = useTimer();

  const handleSavePomodoroOptions = (options: ITimerOptions) => {
    const pomodoro = textToSenconds(options.pomodoro);
    const shortBreak = textToSenconds(options.shortBreak);
    const longBreak = textToSenconds(options.longBreak);

    const timerOptions = {
      pomodoro,
      shortBreak,
      longBreak,
    };

    localStorage.setItem("timerOptions", JSON.stringify(timerOptions));

    setIsVisible(false);
  };

  useEffect(()=> {
    if(timerOptions){
      setInitialValues({
        longBreak: secondsToText(timerOptions.longBreak),
        pomodoro: secondsToText(timerOptions.pomodoro),
        shortBreak: secondsToText(timerOptions.shortBreak)
      })
    } 
  }, [timerOptions])

  return (
    <Modal isVisible={isVisible} setIsModalVisible={setIsVisible}>
      { initialValues && (
        <Formik
        initialValues={initialValues}
        validationSchema={timerOptionsSchema}
        onSubmit={(values) => handleSavePomodoroOptions(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <form onSubmit={handleSubmit} className={styles.content}>
            <h3>Configurar Timer</h3>
            <div className={`row-wrapper ${styles.InputContainer}`}>
              <TimeInput
                title="Pomodoro"
                name="pomodoro"
                value={values.pomodoro}
                error={errors.pomodoro}
                showError={touched.pomodoro}
                onChange={handleChange}
              />
              <TimeInput
                title="Short Break"
                name="shortBreak"
                value={values.shortBreak}
                error={errors.shortBreak}
                showError={touched.shortBreak}
                onChange={handleChange}
              />
              <TimeInput
                title="Long Break"
                name="longBreak"
                value={values.longBreak}
                error={errors.longBreak}
                showError={touched.longBreak}
                onChange={handleChange}
              />
            </div>

            <div className={`row-wrapper ${styles.btnContainer}`}>
              <button type="button" onClick={() => setIsVisible(false)}>
                Cancelar
              </button>
              <button type="submit">Salvar</button>
            </div>
          </form>
        )}
      </Formik>
      ) }
    </Modal>
  );
};
