import Button from './Button';

export default function FallbackMessage({
  message,
  description,
  showButton = false,
  buttonText = 'Ação',
  onButtonClick,
  buttonIcon,
  buttonClassName = '',
  className = '',
}) {
  return (
    <div className={`w-full text-center py-8 ${className}`}>
      <p className='text-gray-500 text-lg mb-2'>{message}</p>

      {description && <p className='text-gray-400 text-sm mb-4'>{description}</p>}

      {showButton && (
        <Button
          type='button'
          onClick={onButtonClick}
          icon={buttonIcon}
          className={`mt-2 ${buttonClassName}`}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
