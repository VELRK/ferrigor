import Link from "next/link";
import Date from '@library/date';

const PaginationPage = ({ items }) => {
  // Function to generate SEO-friendly slug
  const generateSlug = (title, id) => {
    return `${id}-${title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}`;
  };

  return (
    <>
      {items.map((item, index) => {
        const slug = generateSlug(item.title, item.id);
        return (
          <div className="col-lg-4" key={`post-${index}`}>
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
                      <span className="blog-date">
                        <Date dateString={item.date} />
                      </span>
                      <h2>
                          <Link href={`/blog/${slug}`}>{item.title}</Link>
                      </h2>
                  </div>
              </div>
          </div>
        );
      })}
    </>
  );
};

export default PaginationPage;
  