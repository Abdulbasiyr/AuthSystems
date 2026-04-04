
import "../../css/Auth styles/signup.css";

const Register = () => {
  return (
    <div className="register-page">

      <div className="register-card">

        <h2>Создать аккаунт</h2>
        <p className="register-sub">
          Зарегистрируйтесь для безопасного доступа
        </p>

        <form className="register-form">

          <input
            type="text"
            placeholder="Имя"
            className="input"
          />

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

          <button className="register-button">
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