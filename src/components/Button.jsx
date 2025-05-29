import { twMerge } from 'tailwind-merge';

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
      <div className='flex items-center justify-center gap-2'>
        {Icon && iconPosition === 'left' && <Icon />}
        {children && <span>{children}</span>}
        {Icon && iconPosition === 'right' && <Icon />}
      </div>
    </button>
  );
}
