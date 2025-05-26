import { useState, useEffect } from 'react';

import SectionHeader from './SectionHeader';
import Button from './Button';
import CategoryForm from './CategoryForm';
import CategorySection from './CategorySection';
import FallbackMessage from './FallbackMessage';

import { MdMenuBook } from 'react-icons/md';
import { CiCirclePlus } from 'react-icons/ci';

export default function ProductSection() {
  const [categoryForm, setCategoryForm] = useState(null);
  const [categories, setCategories] = useState([]);
  const [CategoryFormOpen, setCategoryFormOpen] = useState(false);

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  const handleEditCategory = categoryId => {
    setCategoryFormOpen(true);
    setCategoryForm(categories.find(category => category.id === categoryId));
  };

  return (
    <section className='w-full py-8 flex flex-col gap-8'>
      <SectionHeader
        HeadingIcon={<MdMenuBook />}
        headingLevel={2}
        headingClassName='text-2xl font-bold'
        headingText='Cadastro do seu Cardápio'
        description='Preencha as informações dos produtos que irão aparecer no cardápio.'
      >
        <Button
          onClick={() => setCategoryFormOpen(!CategoryFormOpen)}
          type='button'
          className='mt-0'
          icon={CiCirclePlus}
        >
          Adicionar categoria
        </Button>
      </SectionHeader>

      <CategoryForm
        isOpen={CategoryFormOpen}
        setOpened={setCategoryFormOpen}
        categories={categories}
        setCategories={setCategories}
        categoryForm={categoryForm}
        setCategoryForm={setCategoryForm}
      />

      {categories.length === 0 && (
        <FallbackMessage
          message='Nenhuma categoria cadastrada'
          description='Clique no botão "Adicionar Categoria" para comecar'
          className='bg-gray-100'
        />
      )}

      <CategorySection categories={categories} handleEditCategory={handleEditCategory} />
    </section>
  );
}
