 
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      role: 'Wheat Farmer, Punjab',
      image: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: 'KrishiLink connected me directly with buyers. I got better prices for my wheat harvest than ever before!'
    },
    {
      id: 2,
      name: 'Sunita Devi',
      role: 'Organic Vegetable Grower, Maharashtra',
      image: 'https://i.pravatar.cc/150?img=45',
      rating: 5,
      text: 'This platform helped me reach urban customers looking for organic produce. My income has doubled!'
    },
    {
      id: 3,
      name: 'Arjun Patel',
      role: 'Fruit Trader, Gujarat',
      image: 'https://i.pravatar.cc/150?img=33',
      rating: 5,
      text: 'Finding quality mangoes was never this easy. Direct farmer connection ensures freshness and fair pricing.'
    }
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-secondary-800 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Hear from our community members about their experience with KrishiLink
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                {/* Quote Icon */}
                <div className="text-primary opacity-20 mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 font-body mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-2">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-800 font-display">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 font-body">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;