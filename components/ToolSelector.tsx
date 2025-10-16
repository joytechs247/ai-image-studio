import React from 'react';
import { EditTool } from '../types';
import { TOOL_CONFIGS } from '../constants';

interface ToolSelectorProps {
  selectedTool: EditTool;
  onSelectTool: (tool: EditTool) => void;
}

const ToolSelector: React.FC<ToolSelectorProps> = ({ selectedTool, onSelectTool }) => {
  const tools = Object.keys(TOOL_CONFIGS) as EditTool[];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2 bg-gray-800 rounded-xl border border-gray-700">
      {tools.map((tool) => {
        const isActive = selectedTool === tool;
        return (
          <button
            key={tool}
            onClick={() => onSelectTool(tool)}
            className={`px-4 py-2 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${
              isActive
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            {TOOL_CONFIGS[tool].title}
          </button>
        );
      })}
    </div>
  );
};

export default ToolSelector;
