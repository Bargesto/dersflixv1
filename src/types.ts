export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  platform: 'youtube' | 'vimeo' | 'dailymotion' | 'embed';
  videoId: string;
  class: string;
  subject: string;
  userId: string;
  watched?: boolean;
  favorite?: boolean;
  todos: Todo[];
}

export interface Category {
  class: string;
  subjects: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
}