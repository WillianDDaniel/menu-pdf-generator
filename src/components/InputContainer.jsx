import { twMerge } from 'tailwind-merge';

export default function InputContainer({
  label,
  type,
  name,
  placeholder,
  className,
  labelClassName,
  inputClassName,
  ...props
}) {
  const defaultClassName = 'flex flex-col text-sm text-gray-800 font-semibold';
  const defaultLabelClassName = 'ml-0.5 mb-0.5';
  const defaultInputClassName = 'border border-gray-300 px-2 py-0.5 rounded-sm';

  return (
    <div className={twMerge(defaultClassName, className)}>
      <label className={twMerge(defaultLabelClassName, labelClassName)} htmlFor={props.id}>
        {label}
      </label>

      <input
        className={`${twMerge(defaultInputClassName, inputClassName)}`}
        name={name}
        type={type}
        placeholder={placeholder}
        id={props.id}
        {...props}
      />
    </div>
  );
}
