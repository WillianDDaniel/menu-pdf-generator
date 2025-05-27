import { useCategoryContext } from '../hooks/useCategoryContext';

import SectionHeader from './SectionHeader';
import Button from './Button';
import CategoryForm from './CategoryForm';
import CategorySection from './CategorySection';
import FallbackMessage from './FallbackMessage';

import { MdMenuBook } from 'react-icons/md';
import { CiCirclePlus } from 'react-icons/ci';

export default function ProductSection() {
  const { categories, handleAddCategory, categoryFormOpen } = useCategoryContext();

  return (
    <section className='w-full py-8 flex flex-col gap-8'>
      <SectionHeader
        HeadingIcon={<MdMenuBook />}
        headingLevel={2}
        headingClassName='text-2xl font-bold'
        headingText='Cadastro do seu Cardápio'
        description='Preencha as informações dos produtos que irão aparecer no cardápio.'
      >
        <Button onClick={handleAddCategory} type='button' className='mt-0' icon={CiCirclePlus}>
          Adicionar categoria
        </Button>
      </SectionHeader>

      <CategoryForm />

      {categories.length === 0 && !categoryFormOpen && (
        <FallbackMessage
          message='Nenhuma categoria cadastrada'
          description='Clique no botão "Adicionar Categoria" para comecar'
          className='bg-gray-100'
        />
      )}

      <CategorySection categories={categories} />
    </section>
  );
}
