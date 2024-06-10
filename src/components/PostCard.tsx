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
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{post.title}</div>
        <div className="mt-4 text-gray-700 dark:text-gray-300">
          {post.body ?? ""}
        </div>
        <div className="mt-4">
          <button type="button" className="px-4 py-2 font-medium text-gray-900 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {post.tags[0]}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
