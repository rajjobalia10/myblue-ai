import React from 'react';
import Layout from '../components/Layout';
import ChatUI from '../components/ChatUI';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="h-screen">
        <ChatUI />
      </div>
    </Layout>
  );
};

export default HomePage;
