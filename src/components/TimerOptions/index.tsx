import { Formik } from "formik";
import { Modal } from "../Modal";
import styles from "./styles.module.scss";
import { timerOptionsSchema } from "../../validators/timerOptionsSchema";
import { TimeInput } from "../TimeInput";

interface ITimerOptionsProps {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
}

export const TimerOptions = ({
  isVisible,
  setIsVisible,
}: ITimerOptionsProps) => {
  return (
    <Modal isVisible={isVisible} setIsModalVisible={setIsVisible}>
      <Formik
        initialValues={{ pomodoro: "", shortBreak: "", longBreak: "" }}
        validationSchema={timerOptionsSchema}
        onSubmit={(values) => console.log(values)}
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
    </Modal>
  );
};
