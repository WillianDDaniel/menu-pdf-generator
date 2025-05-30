import { useItemContext } from '../hooks/useItemContext';

import { notifySuccess } from './ToastNotifications';

import InputContainer from './InputContainer';
import Button from './Button';
import FigureInput from './FigureInput';

import { ImCancelCircle } from 'react-icons/im';
import { CiSaveDown1 } from 'react-icons/ci';

import { processImageToSquareBlob } from '../assets/processImage';

export default function ItemForm({ category }) {
  const { itemFormData, setItemFormData, setItemFormOpen, itemFormOpen, saveItem, updateItem } =
    useItemContext();

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
      const base64 = await processImageToSquareBlob(image.files[0]);
      values.image = base64;
    }

    if (itemFormData?.id) {
      updateItem(values);
    } else {
      saveItem(values);
    }

    notifySuccess('Produto salvo com sucesso!');

    event.target.reset();
  };

  if (!itemFormOpen || itemFormOpen.categoryId !== category.id) return null;

  return (
    <form className='w-full flex gap-8 p-4 border border-gray-200' onSubmit={handleSubmit}>
      <FigureInput
        src={itemFormData.image || 'no-image.png'}
        alt={'imagem do produto'}
        labelText='Adicionar imagem'
        inputName='image'
        imgClassName='rounded-sm w-40 h-40 bg-gray-100'
        id={'item-image'}
        onChange={e => {
          setItemFormData({ ...itemFormData, image: URL.createObjectURL(e.target.files[0]) });
        }}
      />

      <div className='flex flex-col justify-between flex-1'>
        <div className='flex justify-between gap-4'>
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

        <div className='flex flex-col gap-0.5'>
          <label htmlFor='item-description'> Descrição do produto </label>
          <textarea
            className='border border-gray-300 px-2 py-1 rounded-sm'
            name='description'
            id='item-description'
            placeholder='Ex: Hamburguer de carne bovina com molho especial'
            value={itemFormData.description || ''}
            onChange={e => setItemFormData({ ...itemFormData, description: e.target.value })}
          ></textarea>
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            type='button'
            className={'mt-4 px-2 py-1 cursor-pointer bg-red-400 hover:bg-red-500'}
            icon={ImCancelCircle}
            onClick={() => setItemFormOpen({})}
          >
            Cancelar
          </Button>

          <Button
            type='submit'
            className={'mt-4 px-2 py-1 cursor-pointer bg-green-400 hover:bg-green-500'}
            icon={CiSaveDown1}
          >
            {itemFormData?.id ? 'Atualizar' : 'Salvar'}
          </Button>
        </div>
      </div>
    </form>
  );
}
