export default function Section({ title, children }) {
  return (
    <section className='w-full py-8 flex flex-col gap-8'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      {children}
    </section>
  );
}
