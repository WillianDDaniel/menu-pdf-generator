import RestaurantForm from './RestaurantForm';
import SectionHeader from './SectionHeader';

import { IoStorefront } from 'react-icons/io5';

export default function RestaurantSection() {
  return (
    <section className='w-full py-8 flex flex-col gap-8'>
      <SectionHeader
        HeadingIcon={<IoStorefront />}
        headingLevel={2}
        headingClassName='text-2xl font-bold'
        headingText='Informações do Restaurante'
        description='Preencha as informações do seu restaurante que irão aparecer no cardápio.'
      />

      <RestaurantForm />
    </section>
  );
}
