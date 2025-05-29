import { useEffect, useState } from 'react';

import { ItemContext } from '../context/ItemContext';

export function ItemProvider({ children }) {
  const [items, setItems] = useState([]);
  const [itemFormData, setItemFormData] = useState({});
  const [itemFormOpen, setItemFormOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('items');
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const saveItemsToStorage = items => {
    setItems(items);
    localStorage.setItem('items', JSON.stringify(items));

    setItemFormOpen(false);
    setItemFormData({});
  };

  const handleEditItem = itemId => {
    const item = items.find(item => item.id === itemId);
    setItemFormData(item);
    setItemFormOpen({ categoryId: item.categoryId });
  };

  const saveItem = formValues => {
    const newItem = {
      id: Date.now().toString(),
      ...formValues,
    };

    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    saveItemsToStorage([...storedItems, newItem]);
  };

  const updateItem = formValues => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    const updatedItems = storedItems.map(item =>
      item.id === itemFormData.id ? { ...item, ...formValues } : item,
    );

    saveItemsToStorage(updatedItems);
  };

  const deleteItem = itemId => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    const updatedItems = storedItems.filter(item => item.id !== itemId);

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
