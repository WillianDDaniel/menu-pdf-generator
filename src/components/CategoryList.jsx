export default function CategoryList({ categories }) {
  return (
    <div className='flex flex-col gap-4'>
      {categories.map(category => (
        <div
          key={category.id}
          className='flex items-center justify-between border-2 border-gray-300 p-4 gap-4'
        >
          <p>{category.name}</p>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  );
}
