export default function SectionHeader({ children, HeadingText, description }) {
  return (
    <header className='w-full flex justify-between items-center gap-4 py-2 border-b border-gray-300'>
      <div>
        <p className='text-lg font-semibold text-gray-800'>{HeadingText}</p>
        <p className='text-sm text-gray-500'>{description}</p>
      </div>

      {children}
    </header>
  );
}
