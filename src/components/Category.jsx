import { useState } from 'react';
import { useCategoryContext } from '../hooks/useCategoryContext';

import SectionHeader from './SectionHeader';
import Button from './Button';
import ItemForm from './ItemForm';
import FallbackMessage from './FallbackMessage';

import { CiEdit, CiTrash, CiCirclePlus } from 'react-icons/ci';
import { IoMdRestaurant } from 'react-icons/io';

export default function Category({ category }) {
  const [itemFormOpen, setItemFormOpen] = useState(false);
  const { setCategories, handleEditCategory, handleDeleteCategory } = useCategoryContext();

  return (
    <section className='flex flex-col items-center justify-between border-2 px-4 pb-4 border-gray-300 gap-4'>
      <SectionHeader
        HeadingIcon={<IoMdRestaurant />}
        headingLevel={2}
        headingClassName='text-2xl font-bold'
        headingText={category.name}
        description={category.description}
      >
        <div className='flex gap-2'>
          <Button
            type='button'
            className={'px-2 py-1 bg-amber-400 hover:bg-amber-500'}
            icon={CiEdit}
            onClick={() => handleEditCategory(category.id)}
          >
            Editar
          </Button>

          <Button
            type='button'
            className={'px-2 py-1 bg-red-400 hover:bg-red-500'}
            icon={CiTrash}
            onClick={() => handleDeleteCategory(category.id)}
          >
            Excluir
          </Button>

          <Button
            type='button'
            className={'px-2 py-1 bg-green-400 hover:bg-green-500'}
            icon={CiCirclePlus}
            onClick={() => setItemFormOpen(true)}
          >
            Adicionar Item
          </Button>
        </div>
      </SectionHeader>

      <ItemForm
        category={category}
        setCategories={setCategories}
        isOpen={itemFormOpen}
        setOpened={setItemFormOpen}
      />

      {category.items.length === 0 && !itemFormOpen && (
        <FallbackMessage
          message='Nenhum item cadastrado'
          description='Clique no botão "Adicionar Item" para comecar'
          className='bg-gray-100'
        />
      )}
    </section>
  );
}
