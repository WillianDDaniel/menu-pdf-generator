import Category from './Category';

export default function CategorySection({ categories, handleEditCategory }) {
  return (
    <section className='w-full py-8 flex flex-col gap-8'>
      {categories.map(category => (
        <Category key={category.id} category={category} handleEditCategory={handleEditCategory} />
      ))}
    </section>
  );
}
