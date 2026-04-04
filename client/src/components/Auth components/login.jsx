
import "../../css/Auth styles/login.css";

const Login = () => {
  return (
    <div className="login-page">

      <div className="login-wrapper">

        <h2>Войти в аккаунт</h2>

        <p className="login-sub">
          Введите данные для входа
        </p>

        <form className="login-form">

          <input
            type="email"
            placeholder="Email"
            className="input"
          />

          <input
            type="password"
            placeholder="Пароль"
            className="input"
          />

          <div className="login-options">

            <label>
              <input type="checkbox" />
              Запомнить меня
            </label>

            <a href="/forgot" className="forgot">
              Забыли пароль?
            </a>

          </div>

          <button className="login-button">
            Войти
          </button>

        </form>

        <p className="register-link">
          Нет аккаунта? <a href="/auth?mode=signup">Регистрация</a>
        </p>

      </div>

    </div>
  );
};

export default Login;