// types/post.ts

export interface Post {
  id: string;
  title: string;
  body: string;
  tags?: string[]; // добавьте это свойство, если его нет
}
