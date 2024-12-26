export interface ListItem {
  id: number;
  name: string;
}

export interface List {
  title: string;
  items: ListItem[];
}

export interface FormData {
  title: string;
  directedTo: string;
  description: string;
  category: string;
  estimatedTime: {
    start: number;
    end: number;
    unit: string;
  };
  gratitude: string;
  lists: List[];
}