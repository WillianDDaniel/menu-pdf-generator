import { useCategoryContext } from '../hooks/useCategoryContext';

import Button from './Button';
import InputContainer from './InputContainer';

import { ImCancelCircle } from 'react-icons/im';
import { CiSaveDown1 } from 'react-icons/ci';

export default function CategoryForm() {
  const {
    categoryFormData,
    setCategoryFormData,
    categoryFormOpen,
    setCategoryFormOpen,
    saveCategory,
    updateCategory,
  } = useCategoryContext();

  const handleSubmit = async event => {
    event.preventDefault();

    const { name, description } = event.target.elements;

    const values = {
      name: name.value,
      description: description.value,
    };

    if (categoryFormData?.id) {
      updateCategory(values);
    } else {
      saveCategory(values);
    }

    event.target.reset();
  };

  if (!categoryFormOpen) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className='flex w-full justify-center items-center border-2 border-gray-300 p-4 gap-4 flex-1'
    >
      <InputContainer
        className='flex-1'
        label='Nome da categoria'
        type='text'
        name='name'
        value={categoryFormData?.name || ''}
        onChange={e => {
          setCategoryFormData({
            ...categoryFormData,
            name: e.target.value,
          });
        }}
        placeholder='Ex: Pizza'
        required
      />

      <InputContainer
        className='flex-1'
        label='Descrição da categoria'
        type='text'
        name='description'
        value={categoryFormData?.description || ''}
        onChange={e => {
          setCategoryFormData({
            ...categoryFormData,
            description: e.target.value,
          });
        }}
        placeholder='Ex: Pizzas de diversos sabores'
        required
      />

      <Button
        type='button'
        className={'mt-4 cursor-pointer px-2 py-1 bg-red-400 hover:bg-red-500'}
        icon={ImCancelCircle}
        onClick={() => {
          setCategoryFormOpen(false);
        }}
      >
        Cancelar
      </Button>

      <Button
        type='submit'
        className={'mt-4 cursor-pointer px-2 py-1 bg-green-400 hover:bg-green-500'}
        icon={CiSaveDown1}
      >
        {categoryFormData?.id ? 'Atualizar' : 'Salvar'}
      </Button>
    </form>
  );
}
