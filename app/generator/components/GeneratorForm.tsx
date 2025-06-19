'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function GeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/generator', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      // Reset form and refresh page to show new prompt
      setFile(null);
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='border-2 border-dashed border-gray-300 rounded-lg p-6'>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className='w-full'
        />
      </div>
      
      <Button 
        type='submit' 
        disabled={!file || isLoading}
        className='w-full'
      >
        {isLoading ? 'Generating...' : 'Generate Prompt'}
      </Button>
    </form>
  );
}