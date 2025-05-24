export default function InputContainer({ label, type, placeholder, name }) {
  return (
    <div className='flex flex-col gap-0.5'>
      <label htmlFor={name}> {label} </label>

      <input
        className='border border-gray-300 p-2 rounded-sm'
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
      />
    </div>
  );
}
