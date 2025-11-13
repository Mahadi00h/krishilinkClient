 
const Loading = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated farm icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <span className="loading loading-ring loading-lg absolute -bottom-4 left-1/2 -translate-x-1/2 text-primary"></span>
      </div>
      <p className="mt-12 text-xl font-body text-gray-600 animate-pulse">
        Loading KrishiLink...
      </p>
    </div>
  );
};

export default Loading;