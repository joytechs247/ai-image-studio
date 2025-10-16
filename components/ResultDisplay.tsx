import React from 'react';
import Loader from './Loader';

interface ResultDisplayProps {
  resultImage: string | null;
  isLoading: boolean;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultImage, isLoading }) => {
  return (
    <div className="w-full aspect-square bg-gray-700 border-2 border-gray-600 rounded-lg flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex flex-col justify-center items-center z-10">
          <Loader />
          <p className="mt-4 text-lg text-gray-300 animate-pulse">AI is creating magic...</p>
        </div>
      )}
      {!isLoading && !resultImage && (
        <div className="text-center text-gray-400">
          <p>Your generated image will appear here.</p>
        </div>
      )}
      {resultImage && (
        <>
          <img src={resultImage} alt="Generated result" className="w-full h-full object-contain rounded-lg" />
          <a
            href={resultImage}
            download="ai-edited-image.png"
            className="absolute bottom-4 right-4 flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300"
          >
            <DownloadIcon />
            Download
          </a>
        </>
      )}
    </div>
  );
};

export default ResultDisplay;
