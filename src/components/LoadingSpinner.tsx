export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center my-12">
            <div className="relative w-16 h-8 bg-gray-300 rounded-full overflow-hidden border-2 border-gray-400">
                {/* Base layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-eco-green animate-battery"></div>
                {/* Inner white "battery" frame */}
                <div className="absolute inset-[2px] bg-white rounded-full"></div>
                {/* Animated filling effect */}
                <div className="absolute inset-[3px] bg-gradient-to-r from-electric-blue to-eco-green animate-battery-fill"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Charging anime data...</p>
        </div>
    );
}