export default function Button({ children, className, type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
