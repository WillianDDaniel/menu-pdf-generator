export default function InputContainer({
  label,
  type,
  name,
  placeholder,
  labelClassName,
  inputClassName,
  ...props
}) {
  return (
    <div className='flex flex-col mt-0.5'>
      <label className={labelClassName} htmlFor={props.id}>
        {label}
      </label>

      <input
        className={`border border-gray-300 px-2 py-1 rounded-sm ${inputClassName}`}
        name={name}
        type={type}
        placeholder={placeholder}
        id={props.id}
        {...props}
      />
    </div>
  );
}
