import React from "react";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="container footer-container">

        <div className="footer-logo">
          <span className="logo-icon">🛡</span>
          <span>SafeAuth</span>
        </div>

        <div className="footer-links">

          <a href="/">Главная</a>
          <a href="/about">О нас</a>
          <a href="/contacts">Контакты</a>

        </div>

        <p className="footer-copy">
          © 2026 SafeAuth. Все права защищены.
        </p>

      </div>

    </footer>
  );
};

export default Footer;