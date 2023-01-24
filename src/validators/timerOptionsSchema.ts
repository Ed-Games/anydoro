import * as yup from "yup";

export const timerOptionsSchema = yup.object().shape({
  pomodoro: yup
    .string()
    .matches(/^([0-5][0-9]):([0-5][0-9])$/, "Informe um tempo válido (mm:ss)")
    .required("Este campo é obrigatório"),
  shortBreak: yup
    .string()
    .matches(/^([0-5][0-9]):([0-5][0-9])$/, "Informe um tempo válido (mm:ss)")
    .required("Este campo é obrigatório"),
  longBreak: yup
    .string()
    .matches(/^([0-5][0-9]):([0-5][0-9])$/, "Informe um tempo válido (mm:ss)")
    .required("Este campo é obrigatório"),
});
