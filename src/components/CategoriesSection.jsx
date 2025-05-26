import { useState, useEffect } from 'react';

import Section from './Section';
import CategoryForm from './CategoryForm';
import Category from './Category';

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [opened, setOpened] = useState({ status: false, category: null });

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  return (
    <Section title='Categorias'>
      <CategoryForm
        categories={categories}
        setCategories={category => setCategories(prev => [...prev, category])}
      />

      <div className='flex flex-col gap-4'>
        {categories.map(category => (
          <Category
            category={category}
            setOpened={setOpened}
            opened={opened}
            setCategories={setCategories}
            key={category.id}
          ></Category>
        ))}

        {categories.length === 0 && (
          <p className='text-center text-gray-500'>Nenhuma categoria cadastrada</p>
        )}
      </div>
    </Section>
  );
}
