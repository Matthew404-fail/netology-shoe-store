import { Outlet } from 'react-router-dom';
import Banner from './Banner';

const Content = () => {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Content;
