import React, { useState, useEffect, useCallback } from 'react';
import { EditTool } from './types';
import type { EditToolConfig } from './types';
import Header from './components/Header';
import ToolSelector from './components/ToolSelector';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import { editImage } from './services/geminiService';
import { TOOL_CONFIGS } from './constants';

const MagicWandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const App: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<EditTool>(EditTool.REMOVE_BG);
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activeToolConfig: EditToolConfig = TOOL_CONFIGS[selectedTool];

  useEffect(() => {
    setPrompt(TOOL_CONFIGS[selectedTool].defaultPrompt);
    setImage1(null);
    setImage2(null);
    setResultImage(null);
    setError(null);
  }, [selectedTool]);

  const handleGenerate = useCallback(async () => {
    if (!prompt || !image1 || (activeToolConfig.imageInputs === 2 && !image2)) {
      setError('Please provide all required inputs.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const images = [image1, image2].filter((img): img is File => img !== null);
      const generatedImage = await editImage(prompt, images);
      setResultImage(generatedImage);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, image1, image2, activeToolConfig.imageInputs]);
  
  const handleClearAll = () => {
    setImage1(null);
    setImage2(null);
    setResultImage(null);
    setError(null);
    setPrompt(TOOL_CONFIGS[selectedTool].defaultPrompt);
  };

  const isGenerateDisabled = isLoading || !image1 || (activeToolConfig.imageInputs === 2 && !image2);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ToolSelector selectedTool={selectedTool} onSelectTool={setSelectedTool} />

        <div className="mt-8 p-6 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left side - Inputs */}
            <div>
              <h2 className="text-2xl font-bold text-indigo-400 mb-4">{activeToolConfig.title}</h2>
              <p className="text-gray-400 mb-6">{activeToolConfig.description}</p>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                   <ImageUploader onImageUpload={setImage1} image={image1} title="Image 1" />
                  {activeToolConfig.imageInputs === 2 && (
                    <ImageUploader onImageUpload={setImage2} image={image2} title="Image 2" />
                  )}
                </div>
                
                <div>
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">Your Editing Instruction</label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    placeholder="e.g., Change the background to a sunny beach"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                 <button
                  onClick={handleGenerate}
                  disabled={isGenerateDisabled}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  <MagicWandIcon />
                  Generate
                </button>
                <button
                  onClick={handleClearAll}
                  className="w-full px-6 py-3 border border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
                >
                  Start Over
                </button>
              </div>
            </div>
            
            {/* Right side - Output */}
            <div className="mt-8 md:mt-0">
               <h2 className="text-2xl font-bold text-gray-300 mb-4">Result</h2>
               {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>}
               <ResultDisplay resultImage={resultImage} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
