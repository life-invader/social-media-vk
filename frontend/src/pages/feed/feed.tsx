import { useEffect } from 'react';
import Post from '../../components/post/post';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import styles from './styles.module.css';
import { getFeed } from '../../store/user/thunks';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectFeed } from '../../store/user/selectors';

function Feed() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectFeed);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  return (
    <div>
      <ul className={styles.feed}>
        {posts.map((post: any) => (
          <Post key={post._id} {...post} />
        ))}
      </ul>
    </div>
  );
}

export default Feed;
