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
            <li><Link to="/"          className="nav-link active" >Главная</Link></li>
            <li><Link to="/about"     className="nav-link" >О нас</Link></li>
            <li><Link to="/contact"   className="nav-link" >Контакты</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="btn login-btn">Войти</Link>
          <Link to="/register" className="btn register-btn">Регистрация</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;