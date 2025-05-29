import Category from './Category';

export default function CategorySection({ categories }) {
  return (
    <section className='w-full flex flex-col gap-8'>
      {categories.map(category => (
        <Category key={category.id} category={category} />
      ))}
    </section>
  );
}
