export default function Item({ children, item }) {
  return (
    <div className='flex border border-gray-200 rounded-lg p-4 shadow-sm bg-white gap-4'>
      <figure className='flex-shrink-0'>
        <img
          src={item.image || 'your-logo.png'}
          alt={item.name}
          className='w-36 h-36 object-cover rounded-md'
        />
      </figure>

      <div className='flex flex-col flex-1'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>{item.name}</h3>
          <span className='text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded'>
            {item.size && item.size}
          </span>
        </div>

        <p className='text-gray-600 px-2 py-0.5 bg-gray-50 text-sm rounded-sm leading-relaxed mb-3 flex-1'>
          {item.description}
        </p>

        <div className='flex gap-2 justify-between items-center'>
          <span className='text-xl font-bold text-green-600'>R${item.price}</span>

          {children}
        </div>
      </div>
    </div>
  );
}
