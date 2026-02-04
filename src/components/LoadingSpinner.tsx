export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center my-12">
            <div className="relative w-16 h-8 bg-gray-300 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-eco-green animate-pulse"></div>
                <div className="absolute inset-[2px] bg-white rounded-full"></div>
                <div className="absolute inset-[3px] bg-gradient-to-r from-electric-blue to-eco-green animate-[battery_3s_infinite]"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Charging anime data...</p>
        </div>
    );
}