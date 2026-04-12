
import "../css/body.css";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <main className="main">
      <div className="container main-container">

        {/* Left Hero */}
        <div className="hero">

          <div className="badge">
            🛡 Безопасная аутентификация нового поколения
          </div>

          <h1 className="hero-title">
            Ваша безопасность <br />
            <span>наш приоритет</span>
          </h1>

          <p className="hero-text">
            Надёжная регистрация, защита данных и простой доступ
            к вашему аккаунту — всё в одном месте.
          </p>

          <div className="hero-buttons">
            <a> 
              <Link to="/auth?mode=signup"  className="create-btn">Создать аккаунт →</Link>
            </a>

            <a> 
              <Link to="/auth?mode=login" className="hero-login" > Войти → </Link> 
            </a>

          </div>

        </div>

        {/* Right Login Card */}

        <div className="login-card">

          <h3>Войти в аккаунт</h3>

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

          <p className="register-link">
            Нет аккаунта? <a href="/register">Регистрация</a>
          </p>

        </div>

      </div>
    </main>
  );
};

export default Main;