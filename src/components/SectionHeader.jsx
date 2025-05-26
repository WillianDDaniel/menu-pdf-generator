import Heading from './Heading';

export default function SectionHeader({
  children,
  headingLevel = 2,
  headingClassName,
  HeadingIcon,
  headingText,
  description,
}) {
  return (
    <header className='w-full flex justify-between items-center gap-4 py-2 border-b border-gray-300'>
      <div>
        <Heading headingLevel={headingLevel} className={headingClassName} Icon={HeadingIcon}>
          {headingText}
        </Heading>

        {description && <p className='text-sm text-gray-500'>{description}</p>}
      </div>

      {children}
    </header>
  );
}
