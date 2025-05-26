import { useState } from 'react';

import InputContainer from './InputContainer';
import Button from './Button';
import FigureInput from './FigureInput';

import { convertToBase64 } from '../assets/convertToBase64';

export default function ItemForm({ category, setCategories, setOpened, opened }) {
  const [item, setItem] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();

    const itemData = await handleFormData(event);
    event.target.reset();

    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    const updatedCategories = storedCategories.map(cat => {
      if (cat.id === category.id) {
        return { ...cat, items: [...(cat.items || []), itemData] };
      }
      return cat;
    });

    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    setCategories(updatedCategories);
    setOpened({ status: false, category: null });
  };

  const handleFormData = async event => {
    const { name, price, size, description, image } = event.target.elements;

    const formData = {
      id: category.items.length + 1,
      name: name.value,
      price: price.value,
      size: size.value || null,
      description: description.value || null,
    };

    if (image.files.length > 0) {
      const base64 = await convertToBase64(image.files[0]);
      formData.image = base64;
    }

    return formData;
  };

  return (
    <>
      {opened.status && opened.category.id === category.id && (
        <form
          className='flex w-full items-start gap-6 border-t-2 border-gray-200 px-2 pt-4'
          onSubmit={handleSubmit}
        >
          <FigureInput
            src={item.image || 'your-logo.png'}
            alt={'imagem do produto'}
            label='Adicionar imagem'
            name='image'
            id={'item-image'}
            imgClassName='rounded-md'
            onChange={e => {
              setItem({ ...item, image: URL.createObjectURL(e.target.files[0]) });
            }}
          />

          <div className='flex flex-col gap-0.5 flex-1'>
            <div className='flex gap-4'>
              <InputContainer
                label='Nome do produto'
                type='text'
                name='name'
                placeholder='Ex: Hamburguer'
                id='item-name'
                required
              />

              <InputContainer
                label='Preço do produto'
                type='text'
                name='price'
                placeholder='Ex: 19.90'
                id='item-price'
                required
              />

              <InputContainer
                label='Tamanho do produto (opcional)'
                type='text'
                name='size'
                placeholder='Ex: 200g'
                id='item-size'
              />
            </div>

            <div className='flex flex-col mt-1 gap-0.5'>
              <label htmlFor='item-description'> Descrição do produto </label>
              <textarea
                className='border border-gray-300 px-2 py-1 rounded-sm'
                name='description'
                id='item-description'
              ></textarea>
            </div>

            <Button type='submit' className={'mt-4 cursor-pointer'}>
              Salvar
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
