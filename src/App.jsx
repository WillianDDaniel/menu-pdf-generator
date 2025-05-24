import Header from './components/Header';
import Main from './components/Main';
import RestaurantForm from './components/RestaurantForm';
import Section from './components/Section';

export default function App() {
  return (
    <>
      <Header />
      <Main>
        <Section title='Informações do restaurante'>
          <RestaurantForm />
        </Section>
      </Main>
    </>
  );
}
