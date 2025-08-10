import React from 'react';

const Loading = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <div className="w-14 h-14 border-4 border-dashed border-primary rounded-full animate-spin "></div>
        </div>
    );
};

export default Loading;