
import { useState } from "react";
import { Link } from "react-router-dom";


import "../../css/Auth styles/login.css";
import { loginApi, signUpApi } from "../../api/auth.api";


const Login = () => {


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [downError, setDownError] = useState('')

  // простая валидация
  const validate = () => {
    const newErrors = {};

    if (!form.email.includes("@")) {
      newErrors.email = "Введите корректный email";
    }

    if (form.password.length < 1) {
      newErrors.password = "Пароль обьязателен!";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  async function loginRequest(e) {
    e.preventDefault(); 
    setErrors({})
    setDownError('')

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // --- ВАЛИДАЦИЯ ---
    // if (!email.trim()) return setErrors("Email обязателен")
    // else if (!/\S+@\S+\.\S+/.test(email)) setErrors("Неверный формат email")

    // if (!password.trim()) return setErrors("Пароль обязателен")


    try{

      const user = await loginApi(form);
      console.log(user)
    } catch(err) {
      setErrors({[err?.details?.path]: err?.details?.message})
      setDownError(err.message ?? '')
    }

  }

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <h2>Войти в аккаунт</h2>
        <p className="login-sub">Введите данные для входа</p>

        <form className="login-form" onSubmit={loginRequest}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error" style={{color: 'red'}} >{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="input"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error" style={{color: 'red'}} >{errors.password}</p>}

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Запомнить меня
            </label>

            <Link className="forgot" to='/auth/forgot' >  Забыли пароль? </Link> 
          </div>

          <button className="login-button" type="submit">
            Войти
          </button>

          <p className="error" style={{color: 'red'}} >{downError}</p>
        </form>

        <p className="register-link">
          Нет аккаунта? <a href="/auth?mode=signup">Регистрация</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
