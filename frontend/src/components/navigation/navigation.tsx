import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectUser } from '../../store/user/selectors';

import styles from './styles.module.css';

function Navigation() {
  const user = useAppSelector(selectUser);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.navigation}>
      <ul className={styles.list}>
        <li>
          <Link className={styles.link} to={`/profile/${user._id}`}>
            Моя страница
          </Link>
        </li>

        <li>
          <Link className={styles.link} to="/">
            Новости
          </Link>
        </li>

        <li>
          <Link className={styles.link} to="/messages">
            Мессенджер
          </Link>
        </li>

        <li>
          <Link className={styles.link} to="/friends">
            Список друзей
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
