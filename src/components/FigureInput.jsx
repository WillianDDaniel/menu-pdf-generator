import { twMerge } from 'tailwind-merge';

export default function FigureInput({
  src,
  alt,
  id,
  labelText,
  className,
  imgClassName,
  labelClassName,
  inputName,
  ...props
}) {
  const defaultClassName = 'flex flex-col items-center gap-2';
  const defaultImgClassName = 'w-48 h-48 object-cover mx-auto';
  const defaultLabelClassName = 'cursor-pointer text-lg text-blue-500 font-semibold underline';

  return (
    <figure className={twMerge(defaultClassName, className)}>
      <img src={src} alt={alt} className={`${twMerge(defaultImgClassName, imgClassName)}`} />

      <div>
        <label className={twMerge(defaultLabelClassName, labelClassName)} htmlFor={id}>
          {labelText}
        </label>
        <input
          type='file'
          name={inputName}
          id={id}
          className='hidden'
          accept='image/*'
          {...props}
        />
      </div>
    </figure>
  );
}
