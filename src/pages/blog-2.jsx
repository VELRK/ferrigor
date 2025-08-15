import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import { fetchBlogs } from "@lib/api";

const Blog2 = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const result = await fetchBlogs();
        if (result.status === 'success' && result.data) {
          setBlogs(result.data);
        }
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // Function to generate SEO-friendly slug
  const generateSlug = (title, id) => {
    return `${id}-${title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}`;
  };

  if (loading) {
    return (
      <Layouts>
        <PageBanner pageTitle={"Our Blog"} pageDesc={"our values and vaulted us to the top of our industry."} />
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </Layouts>
    );
  }

  return (
    <Layouts>
      <PageBanner pageTitle={"Our Blog"} pageDesc={"our values and vaulted us to the top of our industry."} />

      {/* Blog Style Two Start */}
      <section className="gap blog-style-two">
        <div className="container">
          <div className="row">
            {blogs.map((item, index) => {
              const slug = generateSlug(item.title, item.id);
              return (
                <div className="col-lg-4 col-md-6" key={`blog-${index}`}>
                  <div className="blog-post">
                    <div className="blog-image">
                      <figure>
                        <img 
                          src={item.image || '/img/blog3.jpeg'} 
                          alt={item.title}
                          onError={(e) => {
                            e.target.src = '/img/blog3.jpeg';
                          }}
                        />
                      </figure>
                      <Link href={`/blog/${slug}`}>
                        <i className="fa-solid fa-angles-right" />
                      </Link>
                    </div>
                    <div className="blog-data">
                      <span className="blog-date">{new Date(item.date).toLocaleDateString()}</span>
                      <h2><Link href={`/blog/${slug}`}>{item.title}</Link></h2>
                      <p>{item.description.replace(/<[^>]*>/g, '').substring(0, 100)}...</p>
                      <div className="blog-author d-flex-all justify-content-start">
                        <div className="author-img">
                          <figure>
                            <img src="/img/comment-img-1.jpg" alt={item.author} />
                          </figure>
                        </div>
                        <div className="details">
                          <h3> <span>by</span> {item.author}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Blog Style Two End */}
    </Layouts>
  );
};

export default Blog2;