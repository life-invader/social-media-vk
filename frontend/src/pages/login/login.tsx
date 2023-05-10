import { useState } from 'react';
import LoginForm from './login-form/login-form';
import RegisterForm from './register-form/register-form';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectAuth } from '../../store/auth/selectors';
import { Navigate, useLocation } from 'react-router-dom';

import styles from './styles.module.css';

function Login() {
  const { isLoggedIn } = useAppSelector(selectAuth);
  const [activeForm, setActiveForm] = useState(0);
  const { state } = useLocation();

  if (isLoggedIn) {
    return state.from ? (
      <Navigate to={state.from} replace={true} />
    ) : (
      <Navigate to="/" replace={true} />
    );
  }

  const tabClickHandler = (id: number) => () => {
    setActiveForm(id);
  };

  return (
    <div className={styles.loginContainer}>
      <div className="wrapper">
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeForm === 0 ? styles.active : ''}`}
            type="button"
            onClick={tabClickHandler(0)}>
            Войти
          </button>

          <button
            className={`${styles.tab} ${activeForm === 1 ? styles.active : ''}`}
            type="button"
            onClick={tabClickHandler(1)}>
            Регистрация
          </button>
        </div>

        <div className={styles.formContainer}>
          <LoginForm isActive={activeForm === 0} />
          <RegisterForm isActive={activeForm === 1} />
        </div>
      </div>
    </div>
  );
}

export default Login;
