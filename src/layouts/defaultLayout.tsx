import { Outlet } from 'react-router-dom';
import { Header } from '../components/header';
import { Wrapper } from '../components/wrapper';

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
  );
}
