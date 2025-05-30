import { useEffect, useState } from 'react';

import { ItemContext } from '../context/ItemContext';

import { saveImage, getImage, deleteImage } from '../assets/imageStore';

export function ItemProvider({ children }) {
  const [items, setItems] = useState([]);
  const [itemFormData, setItemFormData] = useState({});
  const [itemFormOpen, setItemFormOpen] = useState(false);

  useEffect(() => {
    loadItemsWithImages();
  }, []);

  const loadItemsWithImages = async () => {
    const stored = localStorage.getItem('items');
    if (!stored) return;

    const parsedItems = JSON.parse(stored);
    const itemsWithImages = await Promise.all(
      parsedItems.map(async item => {
        const blob = await getImage(item.id);
        if (blob) {
          item.image = URL.createObjectURL(blob);
        }
        return item;
      }),
    );

    setItems(itemsWithImages);
  };

  const saveItemsToStorage = async items => {
    localStorage.setItem('items', JSON.stringify(items));

    setItemFormOpen(false);
    setItemFormData({});
    loadItemsWithImages();
  };

  const handleEditItem = itemId => {
    const item = items.find(item => item.id === itemId);
    setItemFormData(item);
    setItemFormOpen({ categoryId: item.categoryId });
  };

  const saveItem = async formValues => {
    const newItemId = Date.now().toString();

    if (formValues.image) {
      await saveImage(newItemId, formValues.image);
    }

    const newItem = {
      id: newItemId,
      ...formValues,
    };

    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    saveItemsToStorage([...storedItems, newItem]);
  };

  const updateItem = async formValues => {
    const storedItems = JSON.parse(localStorage.getItem('items'));

    if (formValues.image) {
      await saveImage(itemFormData.id, formValues.image);
    }

    const updatedItems = storedItems.map(item =>
      item.id === itemFormData.id ? { ...item, ...formValues } : item,
    );

    saveItemsToStorage(updatedItems);
  };

  const deleteItem = async itemId => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    const updatedItems = storedItems.filter(item => item.id !== itemId);

    await deleteImage(itemId);
    saveItemsToStorage(updatedItems);
  };

  return (
    <ItemContext.Provider
      value={{
        saveItemsToStorage,
        items,
        itemFormData,
        setItemFormData,
        itemFormOpen,
        setItemFormOpen,
        handleEditItem,
        saveItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}
