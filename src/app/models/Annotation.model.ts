export interface TDocument {
    id: number;
    content: string;
    annotations: Annotation[];
  }
  
  export interface Annotation {
    id?: number;
    start: number;
    end: number;
    label: string;
    text: string;
  }
  