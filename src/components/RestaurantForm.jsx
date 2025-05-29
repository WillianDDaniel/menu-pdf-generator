import { useEffect, useState } from 'react';

import { notifySuccess } from './ToastNotifications';

import InputContainer from './InputContainer';
import Button from './Button';
import FigureInput from './FigureInput';

import { convertToBase64 } from '../assets/convertToBase64';

export default function RestaurantForm() {
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    const storedRestaurant = localStorage.getItem('restaurant');
    if (storedRestaurant) {
      setRestaurant(JSON.parse(storedRestaurant));
    }
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    const restaurant = await handleFormData(event);

    localStorage.setItem('restaurant', JSON.stringify(restaurant));

    setRestaurant(restaurant);

    notifySuccess('Restaurante salvo com sucesso!');
  };

  const handleFormData = async event => {
    const { name, phone, address, logo } = event.target.elements;

    const formData = {
      name: name.value,
      phone: phone.value,
      address: address.value,
    };

    if (logo.files.length > 0) {
      const base64 = await convertToBase64(logo.files[0]);
      formData.logo = base64;
    }

    return formData;
  };

  return (
    <form className='flex gap-8 p-8 border border-gray-200' onSubmit={handleSubmit}>
      <FigureInput
        src={restaurant.logo || 'your-logo.png'}
        alt={'Logo do restaurante'}
        labelText='Adicionar logo'
        name='logo'
        id='restaurant-logo'
        imgClassName='rounded-full'
        onChange={e =>
          setRestaurant({ ...restaurant, logo: URL.createObjectURL(e.target.files[0]) })
        }
      />

      <div className='flex flex-col flex-1 justify-between gap-0.5'>
        <InputContainer
          label='Nome do restaurante'
          type='text'
          name='name'
          placeholder='Nome do restaurante'
          id='restaurant-name'
          value={restaurant.name || ''}
          onChange={e => setRestaurant({ ...restaurant, name: e.target.value })}
          required
        />

        <InputContainer
          label='Telefone'
          type='tel'
          name='phone'
          placeholder='Telefone'
          id='phone'
          value={restaurant.phone || ''}
          onChange={e => setRestaurant({ ...restaurant, phone: e.target.value })}
          required
        />

        <InputContainer
          label='Endereço'
          type='text'
          name='address'
          placeholder='Endereço'
          id='address'
          value={restaurant.address || ''}
          onChange={e => setRestaurant({ ...restaurant, address: e.target.value })}
          required
        />

        <Button type='submit'>Salvar</Button>
      </div>
    </form>
  );
}
