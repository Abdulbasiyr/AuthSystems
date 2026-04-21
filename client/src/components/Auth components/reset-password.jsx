import { useState } from 'react';
import '../../css/Auth styles/forgotAndResetPassword.css';
import { resetPasswordApi } from '../../api/auth.api';
import { useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const [currentStep, setCurrentStep] = useState(2);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  
  const passwordRegex    = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).+$/;

  const showAlertReset = (message, type = 'error') => {
    if (type === 'error') {
      setError(message);
      setTimeout(() => setError(''), 4000);
    } else {
      setSuccess(message);
      setTimeout(() => setSuccess(''), 4000);
    }
  };

  const getSubtitle = () => {
    return 'Установите новый пароль';
  };


  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword) {
      showAlertReset('Пожалуйста, введите новый пароль', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlertReset('Пароли не совпадают', 'error');
      return;
    }

    if (newPassword.length < 8) {
      showAlertReset('Пароль должен быть не менее 8 символов', 'error');
      return;
    }

    setLoading(true);
    try {
      await resetPasswordApi({newPassword, token})
      showAlertReset('Пароль успешно изменён!', 'success');
      setTimeout(() => {
        resetAll();
        window.location = '/auth?mode=login'
      }, 2000);
      setLoading(false);
    } catch(err) {
      setLoading(false)
    }

  };


  const resetAll = () => {
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
            <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Пароль</div>
            </div>
          </div>


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