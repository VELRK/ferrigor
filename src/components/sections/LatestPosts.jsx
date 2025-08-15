import Data from "@data/sections/latest-posts.json";
import Date from '@lib/date';
import Link from "next/link";

const LatestPosts = ({ posts }) => {
  // Function to generate SEO-friendly slug
  const generateSlug = (title, id) => {
    return `${id}-${title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}`;
  };

  return (
    <div className="box recent-posts">
      <h3>Recent Posts789</h3>
      <ul>
        {posts && posts.map((item, index) => {
          const slug = generateSlug(item.title, item.id);
          return (
            <li key={`latest-post-${index}`}>
              <p>{item.title}</p>
              <Link href={`/blog/${slug}`}>
                <i className="fa-solid fa-arrow-up-long"></i>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LatestPosts;