import Button from './Button';
import FallbackMessage from './FallbackMessage';

import Item from './Item';

import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin2Line } from 'react-icons/ri';

export default function ItemsSection({ category, setCategories }) {
  const handleDelete = item => {
    const updatedCategory = category.items.filter(i => i.id !== item.id);

    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.id === category.id ? { ...cat, items: updatedCategory } : cat,
      ),
    );

    const storedCategories = JSON.parse(localStorage.getItem('categories'));

    localStorage.setItem(
      'categories',
      JSON.stringify(
        storedCategories.map(cat =>
          cat.id === category.id ? { ...cat, items: updatedCategory } : cat,
        ),
      ),
    );
  };

  return (
    <>
      {category.items?.map(item => (
        <div key={item.id} className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Item item={item}>
            <div className='flex gap-2'>
              <Button
                type='button'
                icon={BiEdit}
                className='bg-amber-500 hover:bg-amber-600 mt-0 px-2 py-1'
              >
                Editar
              </Button>

              <Button
                type='button'
                onClick={() => handleDelete(item)}
                icon={RiDeleteBin2Line}
                className='bg-red-400 hover:bg-red-600 mt-0 px-2 py-1'
              >
                Deletar
              </Button>
            </div>
          </Item>
        </div>
      ))}

      {category.items.length === 0 && (
        <FallbackMessage
          message='Nenhum item cadastrado'
          description='Adicione um item clicando no botão a direita'
          className='bg-gray-100'
        />
      )}
    </>
  );
}
