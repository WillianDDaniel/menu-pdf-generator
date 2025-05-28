import { useItemContext } from '../hooks/useItemContext';

import InputContainer from './InputContainer';
import Button from './Button';
import FigureInput from './FigureInput';

import { convertToBase64 } from '../assets/convertToBase64';

export default function ItemForm({ category }) {
  const { itemFormData, setItemFormData, itemFormOpen, saveItem, updateItem } = useItemContext();

  const handleSubmit = async event => {
    event.preventDefault();

    const { name, price, size, description, image } = event.target.elements;

    const values = {
      categoryId: category.id,
      name: name.value,
      price: price.value,
      size: size.value,
      description: description.value,
    };

    if (image.files.length > 0) {
      const base64 = await convertToBase64(image.files[0]);
      values.image = base64;
    }

    if (itemFormData?.id) {
      updateItem(values);
    } else {
      saveItem(values);
    }

    event.target.reset();
  };

  if (!itemFormOpen || itemFormOpen.categoryId !== category.id) return null;

  return (
    <form className='flex w-full items-start gap-6 px-2 pt-4' onSubmit={handleSubmit}>
      <FigureInput
        src={itemFormData.image || 'no-image.png'}
        alt={'imagem do produto'}
        label='Adicionar imagem'
        name='image'
        id={'item-image'}
        imgClassName='rounded-md'
        onChange={e => {
          setItemFormData({ ...itemFormData, image: URL.createObjectURL(e.target.files[0]) });
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
            value={itemFormData.name || ''}
            onChange={e => setItemFormData({ ...itemFormData, name: e.target.value })}
            required
          />

          <InputContainer
            label='Preço do produto'
            type='text'
            name='price'
            placeholder='Ex: 19.90'
            id='item-price'
            value={itemFormData.price || ''}
            onChange={e => setItemFormData({ ...itemFormData, price: e.target.value })}
            required
          />

          <InputContainer
            label='Tamanho do produto (opcional)'
            type='text'
            name='size'
            placeholder='Ex: 200g'
            value={itemFormData.size || ''}
            onChange={e => setItemFormData({ ...itemFormData, size: e.target.value })}
            id='item-size'
          />
        </div>

        <div className='flex flex-col mt-1 gap-0.5'>
          <label htmlFor='item-description'> Descrição do produto </label>
          <textarea
            className='border border-gray-300 px-2 py-1 rounded-sm'
            name='description'
            id='item-description'
            value={itemFormData.description || ''}
            onChange={e => setItemFormData({ ...itemFormData, description: e.target.value })}
          ></textarea>
        </div>

        <Button type='submit' className={'mt-4 cursor-pointer'}>
          Salvar
        </Button>
      </div>
    </form>
  );
}
