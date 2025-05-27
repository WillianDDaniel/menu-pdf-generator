import { useCategoryContext } from '../hooks/useCategoryContext';

import Button from './Button';
import InputContainer from './InputContainer';

export default function CategoryForm() {
  const {
    categories,
    setCategories,
    categoryFormData,
    setCategoryFormData,
    categoryFormOpen,
    setCategoryFormOpen,
  } = useCategoryContext();

  const handleSubmit = async event => {
    event.preventDefault();

    const category = await handleFormData(event);
    event.target.reset();

    setCategories(prevCat => [...prevCat, category]);

    localStorage.setItem('categories', JSON.stringify([...categories, category]));

    setCategoryFormOpen(false);
  };

  const handleFormData = async event => {
    const { name, description } = event.target.elements;

    const formData = {
      id: Date.now().toString(),
      name: name.value,
      description: description.value,
      items: [],
    };

    return formData;
  };

  const handleEditCategory = async event => {
    event.preventDefault();

    const editedcategory = await handleFormData(event);
    event.target.reset();

    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    const updatedCategories = storedCategories.map(cat => {
      if (cat.id === categoryFormData.id) {
        return editedcategory;
      }
      return cat;
    });

    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    setCategories(updatedCategories);
    setCategoryFormOpen(false);
  };

  return (
    <>
      {categoryFormOpen && (
        <form
          onSubmit={categoryFormData?.id ? handleEditCategory : handleSubmit}
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
      )}
    </>
  );
}
