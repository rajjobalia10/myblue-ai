import React from 'react';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section - now properly centered with sidebar */}
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="font-['Instrument_Serif'] text-5xl font-normal leading-tight tracking-tight text-black mb-5">
              What do you want to create?
            </h1>
            
            {/* Subtitle */}
            <p className="text-sm text-gray-600 mb-10 leading-relaxed">
              Start generating with a simple conversation.
            </p>
            
            {/* Input Container */}
            <div className="max-w-3xl mx-auto mb-10">
              <div className="relative">
                <textarea
                  className="w-full h-32 p-4 pr-20 border border-gray-300 rounded-xl bg-white text-sm leading-relaxed outline-none transition-all duration-200 resize-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/5"
                  placeholder="Describe your idea"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      // TODO: Handle message sending
                      console.log('Sending message...');
                    }
                  }}
                />
                
                {/* Action Buttons */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button className="w-8 h-8 rounded-md border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-150 text-base">
                    +
                  </button>
                  <button className="w-8 h-8 rounded-md border border-black bg-black text-white flex items-center justify-center hover:bg-gray-800 hover:border-gray-800 transition-all duration-150 text-base">
                    ↑
                  </button>
                </div>
              </div>
            </div>
            
            {/* Terms */}
            <div className="text-xs text-gray-400 leading-relaxed max-w-2xl mx-auto">
              By sending a message, you agree to our{' '}
              <a href="#" className="text-gray-600 underline hover:text-gray-800">
                Terms of Use
              </a>{' '}
              and acknowledge that you have read and understand our{' '}
              <a href="#" className="text-gray-600 underline hover:text-gray-800">
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
