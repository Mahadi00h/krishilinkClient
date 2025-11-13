 
const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      title: 'Create Account',
      description: 'Sign up for free and create your farmer or buyer profile in minutes'
    },
    {
      id: 2,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      title: 'Post or Browse',
      description: 'List your crops for sale or browse available produce from farmers'
    },
    {
      id: 3,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Connect & Chat',
      description: 'Send interest requests and communicate directly with buyers or sellers'
    },
    {
      id: 4,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Grow Together',
      description: 'Build relationships, complete deals, and grow your agricultural network'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-secondary-800 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Join thousands of farmers and buyers connecting on KrishiLink. Simple, transparent, and effective.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connector Line (hidden on mobile, last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-primary-200 z-0">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Step Card */}
              <div className="relative bg-base-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 z-10">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 mt-6 text-primary">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-secondary-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-body text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;