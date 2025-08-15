import PaginatedBlog from '@components/PaginatedBlog'
import Pagination from '@components/Pagination'

import PageBanner from "@components/PageBanner";
import Layouts from "@layouts/Layouts";

import { fetchBlogs } from "@lib/api";

export const PER_PAGE = 9

const Blog = ( { posts, currentPage, totalPosts } ) => {

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
      </section>
      {/* Blog Style One End */}
      
    </Layouts>
  );
};
export default Blog;

export async function getStaticPaths() {
    // Since we're using API data, we'll generate a reasonable number of paths
    // You can adjust this based on your expected blog count
    return {
        paths: Array.from({ length: 10 }).map((_, i) => `/blog/page/${i + 2}`),
        fallback: 'blocking',
    }
}

export async function getStaticProps( { params } ) {
    const page = Number(params?.page) || 1
    const blogsData = await fetchBlogs(page, PER_PAGE);
  
    if (!blogsData.data || !blogsData.data.length) {
      return {
        notFound: true,
      }
    }
  
    if (page === 1) {
      return {
        redirect: {
          destination: '/blog',
          permanent: false,
        },
      }
    }
  
    return {
      props: {
        posts: blogsData.data,
        totalPosts: blogsData.total,
        currentPage: page,
      },
      revalidate: 60 * 60 * 24, // ISR cache: once a day
    }
}