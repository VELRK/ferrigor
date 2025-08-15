import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layouts from "@layouts/Layouts";
import Date from '@library/date';
import ImageView from "@components/ImageView";
import PageBanner from "@components/PageBanner";
import { fetchBlogById, fetchBlogs } from '../../lib/api';

const BlogDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      loadBlog();
      loadRecentPosts();
    }
  }, [slug]);

  const loadRecentPosts = async () => {
    try {
      const result = await fetchBlogs();
      if (result && result.status === 'success' && Array.isArray(result.data)) {
        const sorted = [...result.data]
          .sort((a, b) => Number(b.id) - Number(a.id))
          .slice(0, 3);
        setRecentPosts(sorted);
      }
    } catch (e) {
      // silently ignore recent posts errors
    }
  };

  const loadBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Extract ID from slug (assuming slug format: "id-blog-title" or just "id")
      const blogId = slug.split('-')[0]; // Get the first part as ID
      
      console.log('Loading blog with ID:', blogId);
      const blogData = await fetchBlogById(blogId);
      
      if (blogData) {
        setBlog(blogData);
        console.log(blogData.content_image1, blogData.content_image2, blogData.content_image3);console.log(blogData.content_image1, blog.content_image2, blog.content_image3);
      } else {
        setError('Blog not found');
      }
    } catch (err) {
      console.error('Error loading blog:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layouts>
        <PageBanner pageTitle={"Loading..."} pageDesc={"Please wait while we load the blog post."} />
        <section className="gap blog-style-one blog-detail detail-page">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading blog post...</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layouts>
    );
  }

  if (error || !blog) {
    return (
      <Layouts>
        <PageBanner pageTitle={"Error"} pageDesc={"Something went wrong while loading the blog post."} />
        <section className="gap blog-style-one blog-detail detail-page">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="text-center py-5">
                  <div className="alert alert-danger">
                    <h4>Error Loading Blog Post</h4>
                    <p>{error || 'Blog post not found'}</p>
                    <a href="/blog" className="btn btn-primary">Back to Blog</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layouts>
    );
  }

  // Generate SEO-friendly URL
  const generateSlug = (title, id) => {
    return `${id}-${title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}`;
  };

  // Check if current URL matches the expected SEO-friendly format
  const expectedSlug = generateSlug(blog.title, blog.id);
  if (slug !== expectedSlug) {
    // Redirect to SEO-friendly URL
    router.replace(`/blog/${expectedSlug}`);
    return null;
  }

  return (
    <Layouts>
      <Head>
        <title>{blog.title} - Blog</title>
        <meta name="description" content={blog.description.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.description.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta name="twitter:image" content={blog.image} />
      </Head>

      <PageBanner pageTitle={blog.title}  />

      {/* Blog Style Three Start */}
      <section className="gap blog-style-one blog-detail detail-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-post ">
                <div className="blog-image">
                  <figure>
                    <img src={blog.image} alt={blog.title} />
                  </figure>
                </div>
                <div className="blog-data">
                  <span className="blog-date"><Date dateString={blog.date} /></span>
                  <h2>{blog.title}</h2>

                </div>
                
                <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: blog.contentHtml }} />

                {typeof blog.gallery != "undefined" &&
                  <>
                    {blog.gallery.enabled == 1 &&
                      <div className="row justify-content-center">
                          {blog.gallery.items.map((item, key) => (
                          <div key={`gallery-item-${key}`} className={ blog.gallery.cols == 3 ? "col-lg-4" : "col-lg-6"}>
                            <figure>
                              <a data-fancybox="gallery" href={item.image}>
                                <img src={item.image} alt={item.alt} />
                              </a>
                            </figure>
                          </div>
                          ))}
                      </div>
                    }
                  </>
                }

                {typeof blog.additional != "undefined" &&
                  <>
                    {blog.additional.enabled == 1 &&
                    <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: blog.additional.content }} />
                    }
                  </>
                }

              </div>
              
<div className="row justify-content-center">
  {[blog.content_image1, blog.content_image2, blog.content_image3]
    .filter(Boolean)
    .map((img, idx) => (
      <div key={idx} className="col-lg-4">
        <img src={img} alt={`gallery-${idx + 1}`} style={{ maxWidth: '100%' }} />
      </div>
    ))}
</div>{/* ✅ closes gallery row properly */}
            </div>

            <div className="col-lg-4">
              <aside className="sidebar">
                <div className="box recent-posts">
                  <h3>Recent Posts</h3>
                  <ul>
                    {recentPosts.map((item, idx) => {
                      const s = generateSlug(item.title, item.id);
                      return (
                        <li key={`recent-${idx}`}>
                          <p>{item.title}</p>
                          <a href={`/blog/${s}`}>
                            <i className="fa-solid fa-arrow-up-long"></i>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              
              </aside>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Style Three End */}
      
      <ImageView />
    </Layouts>
  );
};

export default BlogDetail; 