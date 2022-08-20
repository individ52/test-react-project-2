import { useEffect } from 'react';
import { Container, ThemeProvider } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './App.css';
import AppNavbar from './components/AppNavbar';
import AppRouter from './components/AppRouter';
import { useActions } from './hooks/useActions';
import { useAppSelector } from './hooks/useTypedSelector';
import { IUser } from './models/IUser';

function App() {
  const { setIsAuth, setUser } = useActions();
  useEffect(() => {
    const username = localStorage.getItem("username");
    const isAuth = localStorage.getItem("isAuth");
    if (username && isAuth) {
      setIsAuth(true);
      setUser({ username } as IUser);
    }
  }, []);

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <AppNavbar />
      <Container>
        <AppRouter />
      </Container>
    </ThemeProvider>
  );
}

export default App;
