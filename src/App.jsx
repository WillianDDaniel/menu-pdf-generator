import { useEffect, useState } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import RestaurantForm from './components/RestaurantForm';
import Section from './components/Section';
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import ItemForm from './components/ItemForm';

export default function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  const handleCategory = category => {
    setCategories(prev => [...prev, category]);
  };

  return (
    <>
      <Header />
      <Main>
        <Section title='Informações do restaurante'>
          <RestaurantForm />
        </Section>

        <Section title='Adicionar categorias'>
          <CategoryForm categories={categories} handleCategory={handleCategory} />
          <CategoryList categories={categories} setCategories={setCategories} />
        </Section>
      </Main>
    </>
  );
}
