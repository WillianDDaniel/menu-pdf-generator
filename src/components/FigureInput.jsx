import InputContainer from './InputContainer';

export default function FigureInput({ src, alt, label, name, imgClassName, ...props }) {
  return (
    <figure className='w-3/12 flex flex-col items-center gap-2'>
      <img src={src} alt={alt} className={`w-48 h-48 object-cover mx-auto ${imgClassName}`} />

      <InputContainer
        label={label}
        type='file'
        name={name}
        inputClassName='hidden'
        labelClassName='cursor-pointer text-lg text-blue-500 font-bold'
        accept='image/*'
        {...props}
      />
    </figure>
  );
}
