import SectionHeader from './SectionHeader';
import Button from './Button';
import ItemForm from './ItemForm';
import ItemsSection from './ItemsSection';

export default function Category({ category, setCategories, setOpened, opened }) {
  return (
    <div className='flex flex-col items-center justify-between border-2 px-4 pb-4 border-gray-300 gap-4'>
      <SectionHeader HeadingText={category.name} description={category.description}>
        <Button
          type='button'
          className='mt-0'
          onClick={() => setOpened({ status: true, category })}
        >
          Adicionar item
        </Button>
      </SectionHeader>

      <ItemForm
        category={category}
        setOpened={setOpened}
        setCategories={setCategories}
        opened={opened}
      />

      <ItemsSection category={category} setCategories={setCategories} />
    </div>
  );
}
