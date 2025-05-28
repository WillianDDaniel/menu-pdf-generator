import { useContext } from 'react';
import { ItemContext } from '../context/ItemContext';

export const useItemContext = () => useContext(ItemContext);
