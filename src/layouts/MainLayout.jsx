import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { ToastContainer } from 'react-toastify';
import Loader from '../pages/Loader';
import ClickSpark from '../components/shared/ClickSpark';
import FadeContent from '../components/shared/FadeContent';

const MainLayout = () => {
  const navigation = useNavigation();

  console.log('MainLayout rendered'); // ✅ Place here

  return (
    <div>
      <Navbar />
      <ToastContainer position="top-center" />
      {navigation.state === 'loading' && <Loader />}
      <div className="min-h-[calc(100vh-116px)]">
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <ClickSpark>
            <Outlet />
          </ClickSpark>
        </FadeContent>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
