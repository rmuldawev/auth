import { useState } from "react";
import "../Main/styles.css";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../../components/forms/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const mock = new MockAdapter(axios);

type validUserType = {
  email: string;
  password: string;
};

const validUser: validUserType = {
  email: "rmuldawev@gmail.com",
  password: "abcde12345",
};

mock.onPost("/api/auth").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  if (email === validUser.email && password === validUser.password) {
    return [200, { success: true, message: "Успешная аутентификация" }];
  } else {
    return [401, { success: false, message: "Не правильный логин или пароль" }];
  }
});

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Введите правильную почту")
    .required("Введите почту"),
  password: yup.string().min(8, "Должно быть минимум 8 символов").required(),
});

const Main = () => {
  const [errorMessage, setErrorMessage] = useState<any | null>(null);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const {
    // handleSubmit,
    formState: { isValid, errors },
    getValues,
  } = methods;

  const handleClick = async () => {
    const values = getValues();
    const { email, password } = values;

    try {
      const response = await axios.post("/api/auth", { email, password });
      setErrorMessage(null);
      setTimeout(() => {
        alert("Вы успешно авторизовались");
      }, 1000);

      console.log("Ответ сервера:", response.data);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      console.error("Ошибка:", error.response.data);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="mainContainer">
        <div className="girlImage">
          <p className="welcomeText">С возвращением!</p>
        </div>
        <div className="login">
          <h1 className="title">Вход</h1>
          <CustomInput
            error={errors.email}
            title="Почта"
            name="email"
            placeholder="Введите Email"
          />
          <CustomInput
            error={errors.password}
            title="Пароль"
            name="password"
            placeholder="Введите пароль"
          />
          <div style={{ marginTop: "100px" }}>
            <CustomButton
              isValid={isValid}
              onClick={handleClick}
              title="Войти"
            />
            {errorMessage && (
              <p style={{ color: "red", textAlign: "center" }}>
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Main;
