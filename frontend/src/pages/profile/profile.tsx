import { useEffect, useRef, useState } from 'react';
import Post from '../../components/post/post';
import { fallbackImage } from '../../constants/fallback-image';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectPosts, selectUser, selectViewingProfile } from '../../store/user/selectors';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useParams } from 'react-router-dom';
import { createPost, getPosts, getProfile } from '../../store/user/thunks';
import { Controller, useForm } from 'react-hook-form';

import styles from './styles.module.css';

function Profile() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const { id } = useParams();
  const me = useAppSelector(selectUser);
  const user = useAppSelector(selectViewingProfile);
  const fileInputRef = useRef<null | HTMLInputElement>(null);
  const [isInputActive, setIsInputActive] = useState(false);
  const { register, handleSubmit, control, reset } = useForm();
  const { ref, ...rest } = register('image');

  const isMyProfile = id === me._id;

  const fileInputClickHandler = () => {
    fileInputRef.current?.click();
  };

  const openFileInput = () => {
    fileInputClickHandler();
  };

  const onFocusHandler = () => setIsInputActive(true);
  const onBlurHandler = () => setIsInputActive(false);

  const newPostSubmitHandler = async (data: any) => {
    const formData = new FormData();
    formData.set('text', data.text);
    formData.append('image', data.image[0]);

    try {
      await dispatch(createPost(formData)).unwrap();
      reset();
    } catch {
      console.log('Ошибка создания поста');
    }
  };

  useEffect(() => {
    dispatch(getProfile(id!));
    dispatch(getPosts(id!));
  }, [dispatch, id]);

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <img
          className={styles.profileImg}
          src={user.avatar || fallbackImage}
          alt="Иконка профиля"
          width="120"
          height="120"
        />

        <div className={styles.info}>
          <p className={styles.name}>{`${user.firstName} ${user.secondName}`}</p>

          <div className={styles.infoInner}>
            <p>Город: Копейск</p>
            <p>Возраст: 26 лет</p>
          </div>
        </div>
      </header>

      {isMyProfile && (
        <div className={styles.newPost}>
          <img
            className={styles.userImg}
            src={user.avatar || fallbackImage}
            alt="Иконка профиля"
            width="32"
            height="32"
          />
          <form className={styles.form} onSubmit={handleSubmit(newPostSubmitHandler)}>
            <input
              type="file"
              hidden
              accept="image/*"
              {...rest}
              ref={(e) => {
                ref(e);
                fileInputRef.current = e; // you can still assign to ref
              }}
            />
            <Controller
              render={({ field }) => (
                <textarea
                  {...field}
                  className={`${styles.input} ${isInputActive && styles.inputActive}`}
                  placeholder="Что у вас нового?"
                  onFocus={onFocusHandler}
                  onBlur={onBlurHandler}
                />
              )}
              control={control}
              name="text"
              defaultValue=""
              rules={{ required: true }}
            />

            <div className={styles.buttons}>
              <button className={styles.button} type="submit">
                Опубликовать
              </button>
              <button className={styles.button} type="button" onClick={openFileInput}>
                Картинка
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.postList}>
        {posts.map((post: any) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
