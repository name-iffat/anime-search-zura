import { useState, useEffect } from 'react';

interface ProgressiveImageProps {
    src: string;
    alt: string;
    className?: string;
    placeholderSrc?: string;
}

export default function ProgressiveImage({
    src,
    alt,
    className = '',
    placeholderSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"%3E%3Crect fill="%23374151" width="400" height="600"/%3E%3C/svg%3E'
}: ProgressiveImageProps) {
    const [imgSrc, setImgSrc] = useState(placeholderSrc);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            setImgSrc(src);
            setIsLoading(false);
        };

        img.onerror = () => {
            setHasError(true);
            setIsLoading(false);
        };

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    if (hasError) {
        return (
            <div className={`${className} flex items-center justify-center bg-gray-800`}>
                <div className="text-center p-4">
                    <svg className="w-12 h-12 mx-auto text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-gray-500">Image unavailable</p>
                </div>
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={`${className} transition-all duration-500 ${isLoading ? 'blur-sm scale-105 opacity-70' : 'blur-0 scale-100 opacity-100'
                }`}
            loading="lazy"
        />
    );
}
