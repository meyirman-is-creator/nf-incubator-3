import { Metadata } from "next";
import { getPostById } from "../../../services/postService";
import { Post } from "../../../types/post";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await getPostById(params.id);

  return {
    title: post.title,
  };
}

const PostPage = async ({ params }: { params: { id: string } }) => {
  const post: Post = await getPostById(params.id);

  return (
    <div className=" mx-auto py-16">
      <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">{post.title}</div>
      <div className="text-lg text-gray-700 dark:text-gray-300">
        {post.body}
      </div>
    </div>
  );
};

export default PostPage;
