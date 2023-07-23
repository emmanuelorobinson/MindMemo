import React from 'react';

function Spinner() {
  return (
    <div className='flex w-[100vw] h-[100vh] justify-center align-middle'>
      <img
        src="./BeanSpinner.gif"
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;