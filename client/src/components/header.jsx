import React from "react";
import { Link } from "react-router-dom"; // чтобы кнопки вели на страницы
import '../css/header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>SafeAuth</h1>
        </div>
        <nav className="nav">
          <ul>
            <li className="nav-link active"> Главная </li>
            <li className="nav-link"> О нас </li>
            <li className="nav-link">  Контакты </li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/auth?mode=login" className="btn login-btn">Войти</Link>
          <Link to="/auth?mode=signup" className="btn register-btn">Регистрация</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;