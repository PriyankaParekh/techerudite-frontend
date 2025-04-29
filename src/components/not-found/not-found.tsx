import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-7xl font-extrabold text-gray-600">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">Page Not Found</p>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/login"
        className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
      >
        Login
      </Link>
    </div>
  );
};

export default NotFound;
