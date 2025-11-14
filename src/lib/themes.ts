export interface Theme {
  name: string;
  previewColors: {
    accent: string;
    primary: string;
    card: string;
    background: string;
  };
}

export const themes: Theme[] = [
  {
    name: 'youbtech',
    previewColors: { accent: '#8047C4', primary: '#293B5F', card: '#F0F2F5', background: '#FFFFFF' }
  },
  {
    name: 'ocean',
    previewColors: { accent: '#00A6A6', primary: '#033F63', card: '#E6F4F1', background: '#FFFFFF' }
  },
  {
    name: 'sunset',
    previewColors: { accent: '#FF5733', primary: '#C70039', card: '#FFF3E0', background: '#FFFFFF' }
  },
  {
    name: 'forest',
    previewColors: { accent: '#588157', primary: '#3A5A40', card: '#DAD7CD', background: '#FFFFFF' }
  },
  {
    name: 'rose',
    previewColors: { accent: '#E07A5F', primary: '#3D405B', card: '#F2CC8F', background: '#F4F1DE' }
  },
  {
    name: 'indigo',
    previewColors: { accent: '#6A057F', primary: '#3C096C', card: '#E0AAFF', background: '#F3F0F7' }
  },
  {
    name: 'neutral',
    previewColors: { accent: '#525252', primary: '#262626', card: '#E5E5E5', background: '#FAFAFA' }
  },
  {
    name: 'mint',
    previewColors: { accent: '#58B09C', primary: '#2E294E', card: '#CAF7E3', background: '#EDFDF9' }
  }
];
