import { EditTool } from './types';
import type { EditToolConfig } from './types';

export const TOOL_CONFIGS: Record<EditTool, EditToolConfig> = {
  [EditTool.REMOVE_BG]: {
    title: 'Background Remover',
    description: 'Upload an image and the AI will automatically remove the background, making it transparent.',
    imageInputs: 1,
    defaultPrompt: 'Remove the background of this image and make it transparent. Maintain the original resolution and details of the subject.',
  },
  [EditTool.EFFECTS]: {
    title: 'AI Effects',
    description: 'Apply creative effects to your image. Describe the style you want, like "make it a watercolor painting" or "give it a vintage film look".',
    imageInputs: 1,
    defaultPrompt: 'Apply a dramatic black and white cinematic effect to this image.',
  },
  [EditTool.MERGE]: {
    title: 'Image Merger',
    description: 'Combine two images into one. Describe how you want them merged. For example, place the subject from Image 1 into the scene of Image 2.',
    imageInputs: 2,
    defaultPrompt: 'Merge these two images seamlessly. Take the main subject from Image 1 and place it realistically into the environment of Image 2.',
  },
  [EditTool.HUG]: {
    title: 'Photo Reunion',
    description: 'A special tool to generate a new photo of two people hugging. For best results, use a younger and older photo of the same person.',
    imageInputs: 2,
    defaultPrompt: 'Generate a new, photorealistic image showing the person from the first image (a younger version) and the person from the second image (an older version) sharing a warm hug.',
  },
};
