import React, { useEffect } from 'react';
import useStore from '@/lib/store';

const AuthProvider = ({ children }) => {
  const checkUser = useStore(state => state.checkUser);
  const isLoading = useStore(state => state.isLoading);

  useEffect(() => {
    checkUser();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#85b09b]"></div>
      </div>
    );
  }

  return children;
};

export default AuthProvider;