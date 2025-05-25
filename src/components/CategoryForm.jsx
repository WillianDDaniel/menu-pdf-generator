import Button from './Button';
import InputContainer from './InputContainer';

export default function CategoryForm() {
  return (
    <form className='flex justify-center border-2 border-gray-300 p-4 gap-4 flex-1'>
      <InputContainer label='Nome da categoria' type='text' name='name' placeholder='Ex: Pizza' />

      <InputContainer
        label='Descrição da categoria'
        type='text'
        name='description'
        placeholder='Ex: Pizzas de diversos sabores'
      />

      <Button type='submit' className={'mt-4 cursor-pointer'}>
        Salvar
      </Button>
    </form>
  );
}
