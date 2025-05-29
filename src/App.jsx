import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Main from './components/Main';
import ProductSection from './components/ProductSection';
import RestaurantSection from './components/RestaurantSection';

export default function App() {
  return (
    <>
      <Header />
      <Main>
        <RestaurantSection />

        <ProductSection />
      </Main>

      <ToastContainer />
    </>
  );
}
