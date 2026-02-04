export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center my-12">
            <div className="relative w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                {/* Base layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-eco-green animate-battery"></div>
                {/* Inner white "battery" frame */}
                <div className="absolute inset-[2px] bg-[var(--bg-card)] rounded-full"></div>
                {/* Animated filling effect */}
                <div className="absolute inset-[3px] bg-gradient-to-r from-electric-blue to-eco-green animate-battery-fill"></div>
            </div>
            <p className="mt-4 text-[var(--text-secondary)] font-medium">Charging anime data...</p>
        </div>
    );
}