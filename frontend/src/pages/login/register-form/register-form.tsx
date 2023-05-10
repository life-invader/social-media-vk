import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { LoginInitValues } from './validation';
import { registerUser } from '../../../store/auth/thunks';

import styles from './styles.module.css';

function RegisterForm({ isActive }: any) {
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(LoginInitValues);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formSubmitHandler = async (data: any) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      state.from ? navigate(state.from) : navigate('/');
    } catch {
      console.log('Ошибка регистрации');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className={`${styles.form} ${isActive && styles.formActive}`}>
      <h2>Зарегистрироваться</h2>

      <div className={styles.body}>
        <div>
          <label className={styles.label} htmlFor="firstName">
            Имя
          </label>
          <input
            className={styles.input}
            id="firstName"
            placeholder="Ваше имя"
            type="text"
            {...register('firstName')}
          />

          {errors.firstName && (
            <p className={styles.error}>{errors.firstName.message?.toString()}</p>
          )}
        </div>

        <div>
          <label className={styles.label} htmlFor="secondName">
            Фамилия
          </label>
          <input
            className={styles.input}
            id="secondName"
            placeholder="Ваша фамилия"
            type="text"
            {...register('secondName')}
          />

          {errors.secondName && (
            <p className={styles.error}>{errors.secondName.message?.toString()}</p>
          )}
        </div>

        <div>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            id="email"
            placeholder="Ваш email"
            type="text"
            {...register('email')}
          />

          {errors.email && <p className={styles.error}>{errors.email.message?.toString()}</p>}
        </div>

        <div>
          <label className={styles.label} htmlFor="password">
            Пароль
          </label>
          <input
            className={styles.input}
            id="password"
            placeholder="Ваш пароль"
            type="password"
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

export default RegisterForm;
