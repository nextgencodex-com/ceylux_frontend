import React, { useEffect, useState } from 'react';
import { getImageUrl } from '../services/apiClient';

const LocalImage = ({ src, alt, className, fallback, forceRefresh, ...props }) => {
  const [imageSrc, setImageSrc] = useState(getImageUrl(src));
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const imageUrl = getImageUrl(src);
    if (!imageUrl || imageUrl === '/images/placeholder.jpg') {
      setIsLoading(false);
      setHasError(true);
      if (fallback) setImageSrc(getImageUrl(fallback));
      return;
    }

    const img = new Image();
    img.onload = () => {
      setImageSrc(imageUrl);
      setIsLoading(false);
      setHasError(false);
    };
    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
      if (fallback) setImageSrc(getImageUrl(fallback));
    };
    img.src = imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallback, refreshKey]);

  useEffect(() => {
    if (forceRefresh) {
      setRefreshKey((prev) => prev + 1);
    }
  }, [forceRefresh]);

  if (isLoading) {
    return (
      <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`} {...props}>
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  if (hasError && !fallback) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} {...props}>
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      {...props}
      onError={() => {
        setHasError(true);
        if (fallback) setImageSrc(fallback);
      }}
    />
  );
};

export default LocalImage;