import Category from './Category';

export default function CategorySection({ categories, setCategories, handleEditCategory }) {
  return (
    <section className='w-full py-8 flex flex-col gap-8'>
      {categories.map(category => (
        <Category
          key={category.id}
          category={category}
          setCategories={setCategories}
          handleEditCategory={handleEditCategory}
        />
      ))}
    </section>
  );
}
