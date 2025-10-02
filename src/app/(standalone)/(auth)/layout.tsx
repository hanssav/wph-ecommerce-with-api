import React from 'react';

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='flex h-screen w-screen justify-center items-center'>
      {children}
    </div>
  );
};

export default layout;
