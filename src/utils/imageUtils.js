import apiClient from '../services/apiClient';

export const imageUtils = {
  fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(new Error(error?.message || 'Failed to read file'));
      reader.readAsDataURL(file);
    });
  },

  generateFileName(originalName, prefix = '') {
    const timestamp = Date.now();
    const extension = originalName.split('.').pop();
    const baseName = originalName.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');
    return `${prefix}${baseName}_${timestamp}.${extension}`;
  },

  validateImageFile(file, maxSizeMB = 5) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid file type. Please upload JPG, PNG, or WebP images.' };
    }

    if (file.size > maxSizeBytes) {
      return { valid: false, error: `File size too large. Maximum size is ${maxSizeMB}MB.` };
    }

    return { valid: true, error: null };
  },

  getImagePreviewUrl(file) {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file;
  },

  revokePreviewUrl(url) {
    if (url && url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  },

  async uploadImageToServer(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await apiClient('/uploads/local', {
        method: 'POST',
        data: formData
      });

      return {
        success: true,
        url: response.url,
        fileName: response.fileName,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        url: '',
        error: error.message || 'Failed to upload image'
      };
    }
  }
};

export default imageUtils;