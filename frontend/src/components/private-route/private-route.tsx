import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectAuth } from '../../store/auth/selectors';

function PrivateRoute({ children }: any) {
  const { isLoggedIn } = useAppSelector(selectAuth);
  const { pathname } = useLocation();

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace={true} state={{ from: pathname }} />;
}

export default PrivateRoute;
