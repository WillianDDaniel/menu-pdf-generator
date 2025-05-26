export default function Heading({ children, headingLevel = 2, className = '', Icon: Icon }) {
  const content = (
    <span className='inline-flex items-center gap-2'>
      {Icon ? Icon : null}
      <span>{children}</span>
    </span>
  );

  switch (headingLevel) {
    case 1:
      return <h1 className={className}>{content}</h1>;
    case 2:
      return <h2 className={className}>{content}</h2>;
    case 3:
      return <h3 className={className}>{content}</h3>;
    case 4:
      return <h4 className={className}>{content}</h4>;
    case 5:
      return <h5 className={className}>{content}</h5>;
    case 6:
      return <h6 className={className}>{content}</h6>;
    default:
      return <h2 className={className}>{content}</h2>; // fallback
  }
}
