import Loader from "../components/Loader";

const LoaderUsage = () => {
    const isLoading = true;

    return (
        <div className="min-h-screen bg-gray-100 p-6 bg-secondary-bg">
            {isLoading ? (
                <Loader text="Fetching admin data..." />
            ) : (
                <div>  </div>
            )}
        </div>
    );
};

export default LoaderUsage ;