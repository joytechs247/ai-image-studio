import React, { useRef, useState, useEffect } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File | null) => void;
  image: File | null;
  title: string;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, image, title }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageUpload(file);
  };

  const handleClear = () => {
    onImageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
      <div
        className="relative w-full aspect-square bg-gray-700 border-2 border-dashed border-gray-500 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:border-indigo-400 transition-colors duration-300"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-lg p-1" />
        ) : (
          <div className="text-center">
            <UploadIcon />
            <p className="mt-2 text-sm text-gray-400">Click to upload</p>
          </div>
        )}
      </div>
      {previewUrl && (
        <button
          onClick={handleClear}
          className="mt-2 w-full text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
        >
          Clear Image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
