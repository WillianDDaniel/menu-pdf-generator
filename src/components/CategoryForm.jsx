import Button from './Button';
import InputContainer from './InputContainer';

export default function CategoryForm({ categories, setCategories }) {
  const handleSubmit = async event => {
    event.preventDefault();

    const category = await handleFormData(event);
    event.target.reset();

    setCategories(category);

    localStorage.setItem('categories', JSON.stringify([...categories, category]));
  };

  const handleFormData = async event => {
    const { name, description } = event.target.elements;

    const formData = {
      id: categories.length + 1,
      name: name.value,
      description: description.value,
      items: [],
    };

    return formData;
  };

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
        placeholder='Ex: Pizza'
        required
      />

      <InputContainer
        label='Descrição da categoria'
        type='text'
        name='description'
        placeholder='Ex: Pizzas de diversos sabores'
        required
      />

      <Button type='submit' className={'mt-4 cursor-pointer'}>
        Salvar
      </Button>
    </form>
  );
}
