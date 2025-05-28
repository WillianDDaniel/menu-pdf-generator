import Item from './Item';

export default function ItemSection({ items }) {
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
