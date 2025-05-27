import { useContext } from 'react';
import { CategoryContext } from '../context/CategoryContext';

export const useCategoryContext = () => useContext(CategoryContext);
