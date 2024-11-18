"use client";

import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

export const Login = () => {
  const [error, setError] = useState('')
  const router = useRouter();

  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      try {
        const response = await signIn('credentials', {
          redirect: false,
          email: values.email,
          password: values.password
        });
        if (response?.ok) {
          router.refresh()
          router.push("/");
        } else {
          setError('Email ou senha invalido! ')
        }
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    [router]
  );


  return (
    <>
      <div className='text-center text-[25px] font-bold mb-6'>Login</div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      //validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className='flex flex-col w-1/2 gap-4 mb-4'>
              <Input
                variant='bordered'
                label='Email'
                type='email'
                name="email"
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />

              <Input
                variant='bordered'
                label='Password'
                type='password'
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant='flat'
              color='primary'>
              Login
            </Button>
          </>
        )}
      </Formik>
      <>{error && error}</>
      <div className='font-light text-slate-400 mt-4 text-sm'>
        Não tem uma conta?{" "}
        <Link href='/register' className='font-bold'>
          Cadastre-se aqui
        </Link>
      </div>
    </>
  );
};
