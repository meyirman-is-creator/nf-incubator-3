import React from "react";
import Link from "next/link";
import { Post } from "../types/post";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="py-8 border-t border-gray-500 dark:border-gray-700">
      <Link href={`/home/${post.id}`}>
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{post.title}</div>
          <div className="mt-4 text-gray-700 dark:text-gray-300">{post.body ?? ""}</div>
        </div>
      </Link>
      {post.tags && post.tags.length > 0 && (
        <div className="mt-4">
          <button className="text-sm text-gray-900 dark:text-gray-100 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {post.tags[0]}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
