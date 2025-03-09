export interface Dream {
  title: string;
  description: string;
  emotions: string[];
  date: Date;
}

export interface DreamContextType {
  dreams: Dream[];
  addDream: (dream: Dream) => void;
}
