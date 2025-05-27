import { useCategoryContext } from '../hooks/useCategoryContext';

import Button from './Button';
import InputContainer from './InputContainer';

export default function CategoryForm() {
  const { categoryFormData, setCategoryFormData, categoryFormOpen, saveCategory, updateCategory } =
    useCategoryContext();

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
      className='flex w-full justify-center border-2 border-gray-300 p-4 gap-4 flex-1'
    >
      <InputContainer
        inputClassName='flex-1'
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

      <Button type='submit' className={'mt-4 cursor-pointer'}>
        {categoryFormData?.id ? 'Atualizar' : 'Salvar'}
      </Button>
    </form>
  );
}
