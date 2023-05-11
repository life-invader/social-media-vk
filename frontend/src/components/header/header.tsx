import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectUser } from '../../store/user/selectors';
import { fallbackImage } from '../../constants/fallback-image';

import styles from './styles.module.css';

function Header() {
  const user = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  const menuOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logoLink} to="/">
          iN Touch
        </Link>

        {user && (
          <div className={styles.user} onClick={menuOpenHandler}>
            <img
              className={styles.userImg}
              src={user.avatar || fallbackImage}
              alt="Иконка профиля"
              width="28"
              height="28"
            />

            <div className={styles.menu}>
              <ul className={`${styles.list} ${isOpen && styles.menuOpen}`}>
                <li>
                  <Link className={styles.link} to={`/profile/${user._id}`}>
                    Моя страница
                  </Link>
                </li>

                <li>
                  <Link className={styles.link} to={`/logout`}>
                    Выйти
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
