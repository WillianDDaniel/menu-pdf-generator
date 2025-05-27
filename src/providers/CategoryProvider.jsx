import { useState, useEffect } from 'react';
import { CategoryContext } from '../context/CategoryContext';

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [categoryFormData, setCategoryFormData] = useState(null);
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('categories');
    if (stored) setCategories(JSON.parse(stored));
  }, []);

  const handleEditCategory = categoryId => {
    setCategoryFormOpen(true);
    setCategoryFormData(categories.find(cat => cat.id === categoryId));
  };

  const handleAddCategory = () => {
    setCategoryFormOpen(true);
    setCategoryFormData(null);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        categoryFormData,
        setCategoryFormData,
        categoryFormOpen,
        setCategoryFormOpen,
        handleEditCategory,
        handleAddCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
