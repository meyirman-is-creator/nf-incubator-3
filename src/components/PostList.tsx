import React from 'react';
import { Post } from '../types/post';

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{post.title}</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{post.body}</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => onEdit(post)}
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
