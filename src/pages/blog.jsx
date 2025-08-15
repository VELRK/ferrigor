import { PER_PAGE } from './blog/page/[page]'
import PaginatedBlog from '@components/PaginatedBlog'
import Pagination from '@components/Pagination'

import PageBanner from "@components/PageBanner";
import Layouts from "@layouts/Layouts";

import { fetchBlogs } from "@lib/api";

const Blog = ( { posts, totalPosts, currentPage } ) => {
  console.log('Blog component received props:', { posts, totalPosts, currentPage });
  
  return (
    <Layouts>
      <PageBanner pageTitle={"Our Blog"} pageDesc={"our values and vaulted us to the top of our industry."} />

      {/* Blog Style One Start */}
      <section className="gap blog-style-one our-blog-one">
        <div className="container">
          <div className="row">
            <PaginatedBlog
              items={posts}
            />
          </div>
        </div>

        {totalPosts > PER_PAGE && (
          <div className="container" >
            <div className="row">
              <Pagination
                currentPage={currentPage}
                totalItems={totalPosts}
                perPage={PER_PAGE}
                renderPageLink={(page) => page === 1 ? '/blog' : `/blog/page/${page}`}
              />
            </div>
          </div>
        )}
      </section>
      {/* Blog Style One End */}
      
    </Layouts>
  );
};
export default Blog;

export async function getStaticProps() {
  console.log('getStaticProps: Starting to fetch blogs...');
  const blogsData = await fetchBlogs(1, PER_PAGE);
  console.log('getStaticProps: Received blogs data:', blogsData);

  return {
    props: {
      posts: blogsData.data || [],
      totalPosts: blogsData.total || 0,
      currentPage: 1
    },
    revalidate: 60 * 60 * 24, // Revalidate every 24 hours
  }
}