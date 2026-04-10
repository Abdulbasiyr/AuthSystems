
import { useState } from "react";
import { Link } from "react-router-dom";


import "../../css/Auth styles/login.css";
import { loginApi, signUpApi } from "../../api/auth.api";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(""); 


  async function loginRequest(e) {
    e.preventDefault(); 
    setErrors('')

    // --- ВАЛИДАЦИЯ ---
    if (!email.trim()) return setErrors("Email обязателен")
    else if (!/\S+@\S+\.\S+/.test(email)) setErrors("Неверный формат email")

    if (!password.trim()) return setErrors("Пароль обязателен")


    try{

      const user = await loginApi({ email, password });
      setErrors(user?.message)
      
    } catch(err) {
      setErrors(err?.message || 'Request failed, please try later')
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
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Запомнить меня
            </label>

            <Link to='/auth/forgot' > <a className="forgot"> Забыли пароль? </a> </Link>
          </div>

          <button className="login-button" type="submit">
            Войти
          </button>

          <p style={{ color: "red", fontSize: "15px" }}>{errors}</p>
        </form>

        <p className="register-link">
          Нет аккаунта? <a href="/auth?mode=signup">Регистрация</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
