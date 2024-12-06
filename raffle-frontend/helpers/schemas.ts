import { object, ref, string } from "yup";

export const LoginSchema = object().shape({
  email: string()
    .email("Este campo deve ser um e-mail")
    .required("O e-mail é obrigatório"),
  password: string().required("A senha é obrigatória"),
});

export const RegisterSchema = object().shape({
  name: string().required("O nome é obrigatório"),
  email: string()
    .email("Este campo deve ser um e-mail")
    .required("O e-mail é obrigatório"),
  password: string().required("A senha é obrigatória"),
  confirmPassword: string()
    .required("A senha é obrigatória")
    .oneOf([ref("password")], "As senhas devem corresponder"),
});
