import { useState } from 'react';

import Button from './Button';
import ItemForm from './ItemForm';
import ItemList from './ItemList';

export default function CategoryList({ categories, setCategories }) {
  const [opened, setOpened] = useState({ status: false, category: null });

  return (
    <div className='flex flex-col gap-4'>
      {categories.map(category => (
        <div
          key={category.id}
          className='flex flex-col items-center justify-between border-2 px-4 pb-4 border-gray-300 gap-4'
        >
          <div className='w-full flex justify-between items-center gap-4 py-2 border-b border-gray-300'>
            <div>
              <p className='text-lg font-semibold text-gray-800'>{category.name}</p>
              <p className='text-sm text-gray-500'>{category.description}</p>
            </div>

            <Button
              type='button'
              className='mt-0'
              onClick={() => setOpened({ status: true, category })}
            >
              Adicionar item
            </Button>
          </div>

          {opened.status && opened.category.id === category.id && (
            <ItemForm category={category} setCategories={setCategories} setOpened={setOpened} />
          )}

          {category.items.length > 0 ? (
            <ItemList category={category} setCategories={setCategories} />
          ) : (
            <p className='text-center text-gray-500'>Nenhum item cadastrado</p>
          )}
        </div>
      ))}

      {categories.length === 0 && (
        <p className='text-center text-gray-500'>Nenhuma categoria cadastrada</p>
      )}
    </div>
  );
}
