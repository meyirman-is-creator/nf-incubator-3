import React, { useState, useEffect } from 'react';
import { Post } from '../types/post';

interface PostFormProps {
  initialPost: Post | null;
  onSave: (post: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialPost, onSave }) => {
  const [post, setPost] = useState<Post>({ id: '', title: '', body: '', tags: [] });

  useEffect(() => {
    if (initialPost) {
      setPost(initialPost);
    }
  }, [initialPost]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(post);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={post.title}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200"
        />
      </div>
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Body</label>
        <textarea
          name="body"
          id="body"
          value={post.body}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200"
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save
        </button>
      </div>
    </form>
  );
};

export default PostForm;
