
import { signUpApi } from "../../api/auth.api";
import "../../css/Auth styles/signup.css";

import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // простая валидация
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Введите имя";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Введите корректный email";
    }

    if (form.password.length < 8) {
      newErrors.password = "Пароль должен быть минимум 8 символов";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // тут отправка на сервер
    try {
      const user = await signUpApi(form)
      console.log(user)
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Создать аккаунт</h2>
        <p className="register-sub">
          Зарегистрируйтесь для безопасного доступа
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          
          <input
            type="text"
            name="name"
            placeholder="Имя"
            className="input"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error" style={{color: 'red'}} >{errors.name}</p>}

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
          {errors.password && <p className="error" style={{color: 'red'}}>{errors.password}</p>}

          <button className="register-button" type="submit">
            Зарегистрироваться
          </button>
        </form>

        <p className="login-link">
          Уже есть аккаунт? <a href="/auth?mode=login">Войти</a>
        </p>
      </div>
    </div>
  );
};

export default Register;