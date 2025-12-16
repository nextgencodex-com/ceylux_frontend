import apiClient from './apiClient';

const unwrap = (response) => (response && typeof response === 'object' && 'data' in response ? response.data : response);

export const databaseService = {
  packages: {
    async getAll() {
      try {
        const res = await apiClient('/packages');
        return { success: true, data: unwrap(res), error: null };
      } catch (error) {
        return { success: false, data: [], error: error.message };
      }
    },
    async getById(id) {
      try {
        const res = await apiClient(`/packages/${id}`);
        return { success: true, data: unwrap(res), error: null };
      } catch (error) {
        return { success: false, data: null, error: error.message };
      }
    },
    async create(payload) {
      try {
        const res = await apiClient('/packages', { method: 'POST', data: payload });
        return { success: true, data: unwrap(res), error: null };
      } catch (error) {
        return { success: false, data: null, error: error.message };
      }
    },
    async update(id, payload) {
      try {
        const res = await apiClient(`/packages/${id}`, { method: 'PUT', data: payload });
        return { success: true, data: unwrap(res), error: null };
      } catch (error) {
        return { success: false, data: null, error: error.message };
      }
    },
    async delete(id) {
      try {
        await apiClient(`/packages/${id}`, { method: 'DELETE' });
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    onSnapshot(callback) {
      this.getAll().then((res) => {
        if (res.success) {
          callback(res.data);
        }
      });
      return () => {};
    }
  },

  customers: {
    async getAll() {
      try {
        const res = await apiClient('/customers');
        return { success: true, data: unwrap(res), error: null };
      } catch (error) {
        return { success: false, data: [], error: error.message };
      }
    },
    async create(payload) {
      try {
        const res = await apiClient('/customers', { method: 'POST', data: payload });
        return { success: true, data: unwrap(res), error: null };
      } catch (error) {
        return { success: false, data: null, error: error.message };
      }
    }
  },

  bookings: {
    async getAll() {
      try {
        const res = await apiClient('/bookings');
        return { success: true, data: unwrap(res), error: null };
      } catch (error) {
        return { success: false, data: [], error: error.message };
      }
    },
    async create(payload) {
      try {
        const res = await apiClient('/bookings', { method: 'POST', data: payload });
        return { success: true, data: unwrap(res), error: null };
      } catch (error) {
        return { success: false, data: null, error: error.message };
      }
    }
  },

  customizedPackages: {
    async getAll() {
      try {
        const res = await apiClient('/customized-packages');
        return { success: true, data: unwrap(res), error: null };
      } catch (error) {
        return { success: false, data: [], error: error.message };
      }
    },
    async getById(id) {
      try {
        const res = await apiClient(`/customized-packages/${id}`);
        return { success: true, data: unwrap(res), error: null };
      } catch (error) {
        return { success: false, data: null, error: error.message };
      }
    },
    async create(payload) {
      try {
        const res = await apiClient('/customized-packages', { method: 'POST', data: payload });
        return { success: true, data: unwrap(res), error: null };
      } catch (error) {
        return { success: false, data: null, error: error.message };
      }
    },
    async updateStatus(id, status) {
      try {
        const res = await apiClient(`/customized-packages/${id}/status`, { method: 'PATCH', data: { status } });
        return { success: true, data: unwrap(res), error: null };
      } catch (error) {
        return { success: false, data: null, error: error.message };
      }
    },
    onSnapshot(callback) {
      this.getAll().then((res) => {
        if (res.success) {
          callback(res.data);
        }
      });
      return () => {};
    }
  },

  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await apiClient('/uploads/local', { method: 'POST', data: formData });
      return { success: true, url: res.url, fileName: res.fileName, error: null };
    } catch (error) {
      return { success: false, url: '', error: error.message };
    }
  },

  async deleteImage() {
    return { success: false, error: 'Image deletion is not supported via API yet' };
  },

  async getAnalytics() {
    try {
      const res = await apiClient('/analytics');
      return { success: true, data: unwrap(res), error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  async getCategories() {
    try {
      const res = await apiClient('/categories');
      return unwrap(res).map((category) => ({ ...category, isStatic: category.isStatic ?? false }));
    } catch (error) {
      return [];
    }
  },

  async getCategoryById(categoryId) {
    try {
      const res = await apiClient(`/categories/${categoryId}`);
      return unwrap(res);
    } catch (error) {
      return null;
    }
  },

  async addCategory(categoryData) {
    try {
      const res = await apiClient('/categories', { method: 'POST', data: categoryData });
      return unwrap(res);
    } catch (error) {
      throw error;
    }
  },

  async updateCategory(categoryId, categoryData) {
    try {
      const res = await apiClient(`/categories/${categoryId}`, { method: 'PUT', data: categoryData });
      return unwrap(res);
    } catch (error) {
      throw error;
    }
  },

  async deleteCategory(categoryId) {
    try {
      await apiClient(`/categories/${categoryId}`, { method: 'DELETE' });
      return { success: true, id: categoryId };
    } catch (error) {
      throw error;
    }
  }
};

export default databaseService;