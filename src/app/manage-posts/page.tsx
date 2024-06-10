'use client';

import React, { useEffect, useState } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../../services/postService';
import PostList from '../../components/PostList';
import PostForm from '../../components/PostForm';
import { Post } from '../../types/post';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ManagePosts: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [hasShownAlert, setHasShownAlert] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      if (!hasShownAlert) {
        toast.error('You must be logged in to access this page', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setHasShownAlert(true);
      }
      router.push('/login');
    }
  }, [isAuthenticated, router, hasShownAlert]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchPosts = async () => {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      };
      fetchPosts();
    }
  }, [isAuthenticated]);

  const handleSavePost = async (post: Post) => {
    if (post.id) {
      const updatedPost = await updatePost(post.id, post);
      setPosts(posts.map(p => (p.id === post.id ? updatedPost : p)));
    } else {
      const newPost = await createPost(post);
      setPosts([...posts, newPost]);
    }
    setEditingPost(null);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
  };

  const handleDeletePost = async (id: string) => {
    await deletePost(id);
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Manage Posts</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <PostForm initialPost={editingPost} onSave={handleSavePost} />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <PostList posts={posts} onEdit={handleEditPost} onDelete={handleDeletePost} />
      </div>
    </div>
  );
};

export default ManagePosts;
