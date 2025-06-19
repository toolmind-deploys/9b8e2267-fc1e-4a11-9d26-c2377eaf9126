import { Suspense } from 'react';
import GeneratorForm from './components/GeneratorForm';
import GeneratorList from './components/GeneratorList';

export default async function GeneratorPage() {
  // Fetch the generator list from our custom API endpoint
  const res = await fetch('http://localhost:3000/api/generator', { cache: 'no-store' });
  const data = await res.json();

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Problem Generator Tool</h1>
      
      <div className='grid gap-8 md:grid-cols-2'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Upload New Image</h2>
          <GeneratorForm />
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Generated Prompts</h2>
          <Suspense fallback={<div>Loading prompts...</div>}>
            <GeneratorList initialPrompts={data.prompts} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}