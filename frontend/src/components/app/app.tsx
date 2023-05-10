import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import Navigation from '../navigation/navigation';

import styles from './styles.module.css';

function App() {
  return (
    <>
      <Header />
      <div className={styles.app}>
        <Navigation />
        <div className={styles.appContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
