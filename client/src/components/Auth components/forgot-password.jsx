
import { useState } from "react";
import '../../css/Auth styles/forgotAndResetPassword.css'


export default function ForgotPassword() {

  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail]             = useState('');
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState('');
  const [loading, setLoading]         = useState(false);
  const [userEmail, setUserEmail]     = useState('');

  const showAlert = (message, type = 'error') => {
    if (type === 'error') {
      setError(message);
      setTimeout(() => setError(''), 4000);
    } else {
      setSuccess(message);
      setTimeout(() => setSuccess(''), 4000);
    }
  };

  const getSubtitle = () => {
    if (currentStep === 1) return 'Введите email для восстановления доступа';
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      showAlert('Пожалуйста, введите email', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setUserEmail(email);
      showAlert('Код подтверждения отправлен на вашу почту', 'success');
      setCurrentStep(2);
      setLoading(false);
    }, 1000);
  };


  const goBack = () => {
    setCurrentStep(1);
    setEmail(userEmail);
    setError('');
    setSuccess('');
  };

  return(
    <div className="reset-password-container">
      <div className="bg-decoration bg-decoration-1"></div>
      <div className="bg-decoration bg-decoration-2"></div>

      <div className="container">
        <div className="card">
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="header">
            <div className="lock-icon">🔒</div>
            <h1>Восстановление пароля</h1>
            <p className="header-subtitle">{getSubtitle()}</p>
          </div>

          <div className="progress-steps">
            <div className={`step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">Email</div>
              <div className="step-line"></div>
            </div>
          </div>

          {/* Form 1: Email */}
          {currentStep === 1 && (
            <form className="form" onSubmit={handleEmailSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email адрес</label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Отправка...' : 'Отправить код'}
              </button>
              <div className="form-footer">
                <button
                  type="button"
                  className="back-link"
                  onClick={() => window.location.href = '/auth?mode=login'}
                >
                  ← Вернуться к входу
                </button>
              </div>
            </form>
          )}

          {/* Form 2: Code Verification */}
          {currentStep === 2 && (
          <>
            <p className="input-hint">Проверьте папку спама, если письмо не пришло</p>

            <div className="form-footer">
              <button type="button" className="back-link" onClick={goBack}>
                ← Изменить email
              </button>
            </div>
          </>

          )}

        </div>

      </div>
    </div>
  )
}