import Button from './Button';

import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin2Line } from 'react-icons/ri';

export default function ItemList({ category, setCategories }) {
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
      {category.items && category.items.length > 0 && (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
          {category.items.map(item => (
            <div
              key={item.id}
              className='flex border border-gray-200 rounded-lg p-4 shadow-sm bg-white gap-4'
            >
              <figure className='flex-shrink-0'>
                <img
                  src={item.image || 'your-logo.png'}
                  alt={item.name}
                  className='w-36 h-36 object-cover rounded-md'
                />
              </figure>

              <div className='flex flex-col flex-1'>
                <div className='flex justify-between items-center mb-2'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>{item.name}</h3>
                  <span className='text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded'>
                    {item.size && item.size}
                  </span>
                </div>

                <p className='text-gray-600 px-2 py-0.5 bg-gray-50 text-sm rounded-sm leading-relaxed mb-3 flex-1'>
                  {item.description}
                </p>

                <div className='flex gap-2 justify-between items-center'>
                  <span className='text-xl font-bold text-green-600'>R${item.price}</span>

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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
