 
const AgroNews = () => {
  const news = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600',
      category: 'Market Trends',
      title: 'Vegetable Prices Rise 15% This Quarter',
      date: 'March 15, 2024',
      excerpt: 'Analysis shows increasing demand for organic vegetables across major cities...'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600',
      category: 'Technology',
      title: 'Smart Farming Techniques for 2024',
      date: 'March 12, 2024',
      excerpt: 'Discover how IoT and AI are revolutionizing modern agriculture practices...'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600',
      category: 'Government',
      title: 'New Subsidies for Small Farmers',
      date: 'March 10, 2024',
      excerpt: 'Government announces new support schemes benefiting over 2 million farmers...'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-secondary-800 mb-4">
            Latest Agro News
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Stay updated with the latest trends, policies, and innovations in agriculture
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article) => (
            <div key={article.id} className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <figure className="h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-accent badge-sm font-body">{article.category}</span>
                  <span className="text-xs text-gray-500 font-body">{article.date}</span>
                </div>
                <h3 className="card-title text-xl font-display text-secondary-800 hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm font-body">
                  {article.excerpt}
                </p>
                <div className="card-actions mt-4">
                  <button className="btn btn-ghost btn-sm text-primary font-body">
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgroNews;