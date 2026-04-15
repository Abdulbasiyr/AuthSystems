import { useState } from 'react';
import '../../css/Auth styles/forgotAndResetPassword.css';

export default function ResetPassword() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const passwordRegex    = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).+$/;

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
    if (currentStep === 1) return 'Введите код подтверждения из письма';
    return 'Установите новый пароль';
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

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!code || code.length !== 6) {
      showAlert('Пожалуйста, введите 6-значный код', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setCurrentStep(2);
      setLoading(false);
    }, 1000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword) {
      showAlert('Пожалуйста, введите новый пароль', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert('Пароли не совпадают', 'error');
      return;
    }

    if (newPassword.length < 8) {
      showAlert('Пароль должен быть не менее 8 символов', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      showAlert('Пароль успешно изменён!', 'success');
      setTimeout(() => {
        resetAll();
      }, 2000);
      setLoading(false);
    }, 1000);
  };

  const goBack = () => {
    setCurrentStep(1);
    setEmail(userEmail);
    setCode('');
    setError('');
    setSuccess('');
  };

  const resetAll = () => {
    setCurrentStep(1);
    setEmail('');
    setCode('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  const getPasswordStrength = () => {
    if (!newPassword) return null;
    if (newPassword.length > 100) return 'invalid'
    if (newPassword.length < 10 && !passwordRegex.test(newPassword))  return 'weak'; 
    if (newPassword.length > 10 && !passwordRegex.test(newPassword)) return 'medium';
    return 'strong';
  };

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength();
    if  (strength === 'invalid') return 'Слишком длинный пароль'
    if (strength === 'weak') return 'Слабый пароль';
    if (strength === 'medium') return 'Средний пароль';
    return 'Сильный пароль';
  };

  return (
    <div className="reset-password-container">
      <div className="bg-decoration bg-decoration-1"></div>
      <div className="bg-decoration bg-decoration-2"></div>

      <div className="container">
        <div className="card">
          {success && <div className="alert alert-success">{success}</div>}

          <div className="header">
            <div className="lock-icon">🔒</div>
            <h1>Восстановление пароля</h1>
            <p className="header-subtitle">{getSubtitle()}</p>
          </div>

          <div className="progress-steps">
            <div className={`step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Код</div>
              <div className="step-line"></div>
            </div>
            <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Пароль</div>
            </div>
          </div>

          {/* Form 2: Code Verification */}
          {currentStep === 1 && (
            <form className="form" onSubmit={handleCodeSubmit}>
              <div className="form-group">
                <label htmlFor="code">Код подтверждения</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔐</span>
                  <input
                    type="text"
                    id="code"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    disabled={loading}
                    maxLength="6"
                    inputMode="numeric"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Проверка...' : 'Подтвердить код'}
              </button>
              <div className="form-footer">
                {error && <div className="alert alert-error">{error}</div>}

                <button type="button" className="back-link" onClick={() => window.location.href = '/auth/forgot-password'}>
                  ← Изменить email
                </button>
              </div>
            </form>
          )}

          {/* Form 3: Password Reset */}
          {currentStep === 2 && (
            <form className="form" onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="newPassword">Новый пароль</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔑</span>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    placeholder="Минимум 8 символов"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {newPassword && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div className={`strength-fill ${getPasswordStrength()}`}></div>
                    </div>
                    <span className={`strength-text ${getPasswordStrength()}`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Подтвердите пароль</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔑</span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="Повторите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Изменение...' : 'Изменить пароль'}
              </button>
              <div className="form-footer">
                {error && <div className="alert alert-error">{error}</div>}

                <button type="button" className="back-link" onClick={resetAll}>
                  ← Вернуться к входу
                </button>
              </div>
            </form>
          )}

        </div>

        {/* <div className="security-badge">
          <span className="badge-icon">🛡️</span>
          <span className="badge-text">Защищено SSL шифрованием</span>
        </div> */}
      </div>
    </div>
  );
}