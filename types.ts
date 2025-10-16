export enum EditTool {
  REMOVE_BG = 'REMOVE_BG',
  EFFECTS = 'EFFECTS',
  MERGE = 'MERGE',
  HUG = 'HUG',
}

export interface EditToolConfig {
  title: string;
  description: string;
  imageInputs: 1 | 2;
  defaultPrompt: string;
}
