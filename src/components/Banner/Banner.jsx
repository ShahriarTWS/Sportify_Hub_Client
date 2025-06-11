import React from 'react';
import vid1 from '../../assets/video/v1.mp4';

const Banner = () => {
    return (
        <div className="relative max-h-[90vh]">
            {/* Background video */}
            <video
                className="absolute top-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={vid1} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-transparent "></div>

            {/* Hero content */}
            <div className="relative flex items-center justify-center min-h-screen text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
