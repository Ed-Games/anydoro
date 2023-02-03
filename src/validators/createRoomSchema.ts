import * as yup from "yup";

export const CreateRoomSchema = yup.object().shape({
  name: yup.string().required("É necessário informar um nome"),
});
