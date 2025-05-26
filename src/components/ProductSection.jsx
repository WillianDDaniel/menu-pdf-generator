import { useState, useEffect } from 'react';

import SectionHeader from './SectionHeader';
import Button from './Button';
import CategoryForm from './CategoryForm';
import CategorySection from './CategorySection';

import { MdMenuBook } from 'react-icons/md';
import { CiCirclePlus } from 'react-icons/ci';

export default function ProductSection() {
  const [categories, setCategories] = useState([]);
  const [CategoryFormOpen, setCategoryFormOpen] = useState(false);

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

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
        categories={categories}
        setCategories={setCategories}
      />

      <CategorySection categories={categories} />
    </section>
  );
}
