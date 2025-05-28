// src/context/category/CategoryProvider.jsx
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

  const saveCategoriesToStorage = categories => {
    setCategories(categories);
    localStorage.setItem('categories', JSON.stringify(categories));
  };

  const handleEditCategory = categoryId => {
    setCategoryFormOpen(true);
    setCategoryFormData(categories.find(cat => cat.id === categoryId));
  };

  const handleAddCategory = () => {
    setCategoryFormOpen(true);
    setCategoryFormData(null);
  };

  const handleDeleteCategory = categoryId => {
    const storedCategories = JSON.parse(localStorage.getItem('categories'));

    const updatedCategories = storedCategories.filter(cat => cat.id !== categoryId);

    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    setCategories(updatedCategories);
  };

  const saveCategory = formValues => {
    const newCategory = {
      id: Date.now().toString(),
      ...formValues,
    };

    const updatedCategories = [...categories, newCategory];
    saveCategoriesToStorage(updatedCategories);
    setCategoryFormOpen(false);
  };

  const updateCategory = formValues => {
    const updatedCategory = {
      id: categoryFormData.id,
      ...formValues,
    };

    const updatedCategories = categories.map(cat =>
      cat.id === categoryFormData.id ? updatedCategory : cat,
    );

    saveCategoriesToStorage(updatedCategories);
    setCategoryFormOpen(false);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoryFormData,
        setCategoryFormData,
        categoryFormOpen,
        setCategoryFormOpen,
        handleEditCategory,
        handleAddCategory,
        handleDeleteCategory,
        saveCategory,
        updateCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
