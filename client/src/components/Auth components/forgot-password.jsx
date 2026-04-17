
import { useState } from "react";
import '../../css/Auth styles/forgotAndResetPassword.css'
import { forgotPasswordApi } from "../../api/auth.api.js";


export default function ForgotPassword() {

  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail]             = useState('');
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState('');
  const [loading, setLoading]         = useState(false);

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

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      showAlert('Пожалуйста, введите email', 'error');
      return;
    }

    setLoading(true);

    try {
      const result = await forgotPasswordApi({email})
      console.log('start')
      showAlert(result?.message, 'success');
      setEmail('')
      setLoading(false);
    } catch(err) {
      showAlert(err?.message || 'Something went wrong. Please try again later', 'error')
      setLoading(false);
    }

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

        </div>

      </div>
    </div>
  )
}