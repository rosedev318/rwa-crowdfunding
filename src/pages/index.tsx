import AuthWrapper from '@/components/AuthWrapper';
import Layout from '@/components/Layout';

const Home = () => {
  return (
    <AuthWrapper loginRequired>
      <Layout>
        <h2 className="text-2xl font-semibold">Welcome to the Real Estate Crowdfunding Platform</h2>
        <p className="mt-2">Browse and invest in fractional ownership of properties.</p>
      </Layout>
    </AuthWrapper>
  );
};

export default Home;
