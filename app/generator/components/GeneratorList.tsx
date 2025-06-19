'use client';

interface Prompt {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: string;
}

interface GeneratorListProps {
  initialPrompts: Prompt[];
}

export default function GeneratorList({ initialPrompts }: GeneratorListProps) {
  return (
    <div className='space-y-4'>
      {initialPrompts.length === 0 ? (
        <p className='text-gray-500'>No prompts generated yet.</p>
      ) : (
        initialPrompts.map((item) => (
          <div key={item.id} className='border rounded-lg p-4 space-y-2'>
            <div className='aspect-video relative'>
              <img
                src={item.imageUrl}
                alt='Generated prompt image'
                className='rounded object-cover w-full h-full'
              />
            </div>
            <p className='text-sm text-gray-600'>{new Date(item.createdAt).toLocaleDateString()}</p>
            <p className='font-medium'>{item.prompt}</p>
          </div>
        ))
      )}
    </div>
  );
}