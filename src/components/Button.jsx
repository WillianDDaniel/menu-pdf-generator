import { twMerge } from 'tailwind-merge'; // substitui o cn()

export default function Button({
  icon: Icon,
  iconPosition = 'left',
  children,
  className,
  type = 'button',
  ...props
}) {
  const defaultClasses =
    'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded transition-colors cursor-pointer';

  return (
    <button type={type} className={twMerge(defaultClasses, className)} {...props}>
      <div className='flex items-center gap-2 justify-center'>
        {Icon && iconPosition === 'left' && <Icon className='w-5 h-5' />}
        {children && <span>{children}</span>}
        {Icon && iconPosition === 'right' && <Icon className='w-5 h-5' />}
      </div>
    </button>
  );
}
