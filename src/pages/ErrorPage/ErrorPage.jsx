import { Link } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/lottie/errorAnimation.json";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
            <title>SportifyHub || Error 404</title>
            
            <div className="w-80">
                <Lottie animationData={errorAnimation} loop={true} />
            </div>
            <h1 className="text-4xl font-bold text-blue-600 mt-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mt-2 mb-6">
                The page you are looking for does not exist or might have been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
                Go Home
            </Link>
        </div>
    );
};

export default ErrorPage;
