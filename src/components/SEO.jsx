// components/SEO.jsx
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Lain eCommerce - Tu tienda online',
  description = 'Encuentra los mejores productos electrónicos, ropa y más en nuestra tienda online',
  keywords = 'ecommerce, compras online, tecnología, moda, productos, tienda',
  author = 'Lain Store',
  ogImage = '/logo.png'
}) => {
  const fullTitle = title.includes('Lain eCommerce') ? title : `${title} | Lain eCommerce`;
  
  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Charset */}
      <meta charSet="utf-8" />
    </Helmet>
  );
};

export default SEO;