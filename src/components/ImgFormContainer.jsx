import { useEffect, useState } from 'react';
import { convertToBase64 } from '../assets/convertFileToBase64';

export default function ImgFormContainer({ label, name }) {
  const [restaurant, setRestaurant] = useState({ logo: 'your-logo.png' });

  useEffect(() => {
    const localStorageRestaurant = localStorage.getItem('restaurant');

    if (localStorageRestaurant) {
      const parsedRestaurant = JSON.parse(localStorageRestaurant);
      setRestaurant(parsedRestaurant);
    }
  }, []);

  const handleFileChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setRestaurant({ logo: base64 });
    }
  };

  return (
    <figure className='w-1/3 flex flex-col items-center justify-center'>
      <img className='w-1/2' src={restaurant.logo} alt='Logo do restaurante' />

      <label htmlFor={name}> {label} </label>
      <input className='hidden' onChange={handleFileChange} type='file' name={name} id={name} accept='image/*' />
    </figure>
  );
}
