import React from "react";
import "../css/feauters.css";

const Features = () => {
  return (
    <section className="features">

      <div className="container">

        <h2 className="features-title">
          Почему выбирают нас
        </h2>

        <div className="features-grid">

          {/* Card 1 */}

          <div className="feature-card">
            <div className="feature-icon">🛡</div>

            <h3>Безопасность</h3>

            <p>
              Мы используем современные методы
              шифрования для защиты ваших данных.
            </p>
          </div>

          {/* Card 2 */}

          <div className="feature-card">
            <div className="feature-icon">⚡</div>

            <h3>Простота</h3>

            <p>
              Интуитивно понятный интерфейс
              и быстрая регистрация за пару минут.
            </p>
          </div>

          {/* Card 3 */}

          <div className="feature-card">
            <div className="feature-icon">🔒</div>

            <h3>Надёжность</h3>

            <p>
              Стабильная работа сервиса и
              защита от несанкционированного доступа.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Features;