import { Link } from 'react-router-dom';
import { fallbackImage } from '../../constants/fallback-image';
import type { IPostProps } from './types';

import styles from './styles.module.css';

function Post({ _id, text, image, likes, user }: IPostProps) {
  return (
    <div className={styles.post}>
      <header className={styles.postHeader}>
        <Link className={styles.link} to={`/profile/${user._id}`}>
          <img
            className={styles.postAuthorLogo}
            src={user.avatar || fallbackImage}
            alt="Иконка профиля"
            width="28"
            height="28"
          />
          <p>{`${user.firstName} ${user.secondName}`}</p>
        </Link>
      </header>

      <div className={styles.postBody}>
        {image && <img className={styles.postImg} src={image} alt="Картинка записи" />}
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Post;
