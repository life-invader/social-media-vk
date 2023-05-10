import { fallbackImage } from '../../constants/fallback-image';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectFriends } from '../../store/user/selectors';

import styles from './styles.module.css';

function Friends() {
  const friends = useAppSelector(selectFriends);

  return (
    <div>
      <ul className={styles.list}>
        {friends.map((friend: any) => (
          <li key={friend._id}>
            <div className={styles.friend}>
              <img
                className={styles.img}
                src={friend.avatarUrl || fallbackImage}
                alt="Иконка профиля"
                width="80"
                height="80"
              />
              <p className={styles.name}>{`${friend.firstName} ${friend.secondName}`}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Friends;
