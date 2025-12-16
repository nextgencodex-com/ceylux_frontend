import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiX, FiImage, FiTrash2 } from 'react-icons/fi';
import imageUtils from '../../utils/imageUtils';
import LocalImage from '../../components/LocalImage';

const ImageUpload = ({ images = [], onImagesChange, maxImages = 5 }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList);
    const validFiles = [];

    // Validate each file
    for (const file of files) {
      const validation = imageUtils.validateImageFile(file, 5);
      if (!validation.valid) {
        alert(validation.error);
        continue;
      }
      validFiles.push(file);
    }

    if (images.length + validFiles.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    try {
      const newImages = await Promise.all(validFiles.map(async (file) => {
        const uploadResult = await imageUtils.uploadImageToServer(file);
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Upload failed');
        }

        return {
          id: Date.now() + Math.random(),
          name: file.name,
          fileName: uploadResult.fileName,
          url: uploadResult.url,
          isLocal: false
        };
      }));

      onImagesChange([...images, ...newImages]);
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images. Please try again.');
    }
  };

  const removeImage = (imageId) => {
    const imageToRemove = images.find((img) => img.id === imageId);
    if (imageToRemove && imageToRemove.url) {
      imageUtils.revokePreviewUrl(imageToRemove.url);
    }
    onImagesChange(images.filter((img) => img.id !== imageId));
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${
          dragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center">
          <FiUpload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
          <div className="text-lg font-medium text-gray-900 mb-2">
            Upload Package Images
          </div>
          <p className="text-gray-600 mb-4">
            Drag and drop images here, or{' '}
            <button
              type="button"
              onClick={openFileSelector}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              click to browse
            </button>
          </p>
          <p className="text-sm text-gray-500">
            PNG, JPG, GIF up to 2MB each. Maximum {maxImages} images.
          </p>
        </div>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Uploaded Images ({images.length}/{maxImages})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  {image.url ? (
                    <LocalImage
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                      fallback=""
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiImage className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                >
                  <FiX className="h-4 w-4" />
                </button>
                
                {/* Image name */}
                <p className="mt-2 text-sm text-gray-600 truncate" title={image.name}>
                  {image.name}
                </p>
                
                {/* Primary badge */}
                {index === 0 && (
                  <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                    Primary
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          
          {images.length > 1 && (
            <p className="mt-3 text-sm text-gray-500">
              The first image will be used as the primary package image.
            </p>
          )}
        </div>
      )}

      {/* Upload Progress (you can implement this for real file uploads) */}
      {/* 
      {uploadProgress.length > 0 && (
        <div className="space-y-2">
          {uploadProgress.map((progress, index) => (
            <div key={index} className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          ))}
        </div>
      )}
      */}
    </div>
  );
};

export default ImageUpload;