import ImgFormContainer from './ImgFormContainer';
import InputContainer from './InputContainer';

export default function RestaurantForm() {
  return (
    <form className='flex'>
      <ImgFormContainer label='Adicionar logo' name='restaurantLogo' />

      <div className='w-2/3 flex flex-col gap-4'>
        <InputContainer label='Nome do restaurante' type='text' placeholder='Ex: Sabor & Arte' name='restaurantName' />

        <InputContainer label='Endereço do restaurante' type='text' placeholder='Ex: Rua A, 123' name='address' />

        <InputContainer label='Telefone do restaurante' type='text' placeholder='Ex: (11) 91234-5678' name='phone' />
      </div>
    </form>
  );
}
