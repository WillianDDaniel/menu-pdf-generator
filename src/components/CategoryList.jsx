import { useState } from 'react';

import Button from './Button';
import ItemForm from './ItemForm';

export default function CategoryList({ categories, setCategories }) {
  const [opened, setOpened] = useState({ status: false, category: null });

  return (
    <div className='flex flex-col gap-4'>
      {categories.map(category => (
        <div
          key={category.id}
          className='flex flex-col items-center justify-between border-2 border-gray-300 p-4 gap-4'
        >
          <div className='w-full flex justify-between items-center gap-4'>
            <div>
              <p>{category.name}</p>
              <p>{category.description}</p>
            </div>

            <Button type='button' onClick={() => setOpened({ status: true, category })}>
              Adicionar item
            </Button>
          </div>

          {opened.status && opened.category.id === category.id && (
            <ItemForm category={category} setCategories={setCategories} setOpened={setOpened} />
          )}

          {category.items && category.items.length > 0 && (
            <div className='w-full flex flex-col gap-4'>
              {category.items.map(item => (
                <div
                  key={item.id}
                  className='flex flex-col items-start border-2 border-gray-200 p-2 w-full'
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {categories.length === 0 && (
        <p className='text-center text-gray-500'>Nenhuma categoria cadastrada</p>
      )}
    </div>
  );
}
