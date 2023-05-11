import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginInitValues } from './validation';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../../store/auth/thunks';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import type { ILoginFormProps } from './types';
import type { ILoginData } from '../../../types/common';

import styles from './styles.module.css';

function LoginForm({ isActive }: ILoginFormProps) {
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>(LoginInitValues);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formSubmitHandler: SubmitHandler<ILoginData> = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      state.from ? navigate(state.from) : navigate('/');
    } catch {
      console.log('Ошибка логина');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className={`${styles.form} ${isActive && styles.formActive}`}>
      <h2>Войти</h2>

      <div className={styles.body}>
        <div>
          <label className={styles.label} htmlFor="loginEmail">
            Email
          </label>
          <input
            className={styles.input}
            id="loginEmail"
            type="text"
            placeholder="Ваша почта"
            {...register('email')}
          />

          {errors.email && <p className={styles.error}>{errors.email.message?.toString()}</p>}
        </div>

        <div>
          <label className={styles.label} htmlFor="loginPwd">
            Пароль
          </label>
          <input
            className={styles.input}
            id="loginPwd"
            type="password"
            placeholder="Ваш пароль"
            {...register('password')}
          />

          {errors.password && <p className={styles.error}>{errors.password.message?.toString()}</p>}
        </div>
      </div>

      <button className={styles.button} type="submit">
        Поехали!
      </button>
    </form>
  );
}

export default LoginForm;
