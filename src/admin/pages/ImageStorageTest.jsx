import React, { useState } from 'react';
import imageUtils from '../../utils/imageUtils';
import LocalImage from '../../components/LocalImage';

const ImageStorageTest = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first');
      return;
    }

    try {
      setUploadStatus('Uploading...');
      
      // Validate the file
      const validation = imageUtils.validateImageFile(selectedFile);
      if (!validation.valid) {
        setUploadStatus(`Error: ${validation.error}`);
        return;
      }

      // Generate filename and store
      const result = await imageUtils.uploadImageToServer(selectedFile);
      
      if (result.success) {
        setUploadedImages((prev) => [...prev, result]);
        setUploadStatus(`Uploaded: ${result.fileName}`);
        setSelectedFile(null);
        // Clear file input
        const fileInput = document.getElementById('file-input');
        if (fileInput) fileInput.value = '';
      } else {
        setUploadStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  const loadStoredImages = () => {
    const images = imageUtils.getAllStoredImages();
    setStoredImages(images);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Image Upload Test</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Upload Test</h3>
          <div className="flex items-center space-x-4">
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Upload
            </button>
          </div>

          {uploadStatus && (
            <div className={`mt-2 p-2 rounded ${uploadStatus.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {uploadStatus}
            </div>
          )}

          {selectedFile && (
            <div className="mt-2 text-sm text-gray-600">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Uploaded Images ({uploadedImages.length})</h3>
          {uploadedImages.length === 0 ? (
            <div className="text-gray-500 text-center py-8">No uploads yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden">
                    <LocalImage
                      src={image.url}
                      alt={image.fileName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm text-gray-700 break-all">{image.url}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageStorageTest;