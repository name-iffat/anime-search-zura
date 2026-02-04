export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-electric-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading anime...</p>
        </div>
    );
}