const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

export interface ApiResponse<T> {
  statusCode: number;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Category {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number;
  name: string;
  categoryId?: number | null;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  subCategoryId: number;
}

export interface SidebarCategory {
  id: number;
  name: string;
  subCategories: SidebarSubCategory[];
}

export interface SidebarSubCategory {
  id: number;
  name: string;
  productCount: number;
}

export interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
  image: string;
}

export interface Application {
  id: number;
  email: string;
  fullName: string;
  city: string;
  description: string;
  readyToOrder: boolean;
  productId: number | null;
  createdAt: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token && !endpoint.includes('/login')) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        // Handle Slim error format: { statusCode, error: { type, description } }
        if (errorData.error) {
          if (typeof errorData.error === 'string') {
            errorMessage = errorData.error;
          } else if (errorData.error.description) {
            errorMessage = errorData.error.description;
          } else if (errorData.error.type) {
            errorMessage = errorData.error.type;
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  }

  // Auth
  async login(username: string, password: string): Promise<{ token: string; expires_in: number }> {
    const response = await this.request<ApiResponse<{ token: string; expires_in: number }>>(
      '/login',
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }
    );
    return response.data!;
  }

  // Categories
  async getCategories(page = 1, limit = 10): Promise<PaginatedResponse<Category>> {
    const response = await this.request<ApiResponse<PaginatedResponse<Category>>>(
      `/categories?page=${page}&limit=${limit}`
    );
    return response.data!;
  }

  async getCategory(id: number): Promise<Category> {
    const response = await this.request<ApiResponse<Category>>(`/categories/${id}`);
    return response.data!;
  }

  async createCategory(name: string): Promise<Category> {
    const response = await this.request<ApiResponse<Category>>('/admin/categories', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
    return response.data!;
  }

  async updateCategory(id: number, name: string): Promise<Category> {
    const response = await this.request<ApiResponse<Category>>(`/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
    });
    return response.data!;
  }

  async deleteCategory(id: number): Promise<void> {
    await this.request(`/admin/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // SubCategories
  async getSubCategories(page = 1, limit = 10): Promise<PaginatedResponse<SubCategory>> {
    const response = await this.request<ApiResponse<PaginatedResponse<SubCategory>>>(
      `/subcategories?page=${page}&limit=${limit}`
    );
    return response.data!;
  }

  async getSubCategory(id: number): Promise<SubCategory> {
    const response = await this.request<ApiResponse<SubCategory>>(`/subcategories/${id}`);
    return response.data!;
  }

  async createSubCategory(name: string, categoryId?: number | null): Promise<SubCategory> {
    const response = await this.request<ApiResponse<SubCategory>>('/admin/subcategories', {
      method: 'POST',
      body: JSON.stringify({ name, categoryId }),
    });
    return response.data!;
  }

  async updateSubCategory(id: number, name: string, categoryId?: number | null): Promise<SubCategory> {
    const response = await this.request<ApiResponse<SubCategory>>(`/admin/subcategories/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, categoryId }),
    });
    return response.data!;
  }

  async deleteSubCategory(id: number): Promise<void> {
    await this.request(`/admin/subcategories/${id}`, {
      method: 'DELETE',
    });
  }

  // Sidebar
  async getSidebar(): Promise<SidebarCategory[]> {
    const response = await this.request<ApiResponse<SidebarCategory[]>>('/sidebar');
    return response.data!;
  }

  // Products
  async getProducts(page = 1, limit = 10, subCategoryIds?: number[]): Promise<PaginatedResponse<Product>> {
    let url = `/products?page=${page}&limit=${limit}`;
    if (subCategoryIds && subCategoryIds.length > 0) {
      url += `&subCategoryIds=${subCategoryIds.join(',')}`;
    }
    const response = await this.request<ApiResponse<PaginatedResponse<Product>>>(url);
    return response.data!;
  }

  async getProduct(id: number): Promise<Product> {
    const response = await this.request<ApiResponse<Product>>(`/products/${id}`);
    return response.data!;
  }

  async createProduct(data: Omit<Product, 'id'>): Promise<Product> {
    const response = await this.request<ApiResponse<Product>>('/admin/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data!;
  }

  async createProductWithFile(formData: FormData): Promise<Product> {
    const headers: HeadersInit = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/admin/products`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(errorData.error?.description || errorData.error || 'Failed to create product');
    }

    const result = await response.json();
    return result.data;
  }

  async updateProduct(id: number, data: Partial<Omit<Product, 'id'>>): Promise<Product> {
    const response = await this.request<ApiResponse<Product>>(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data!;
  }

  async updateProductWithFile(id: number, formData: FormData): Promise<Product> {
    const headers: HeadersInit = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/admin/products/${id}`, {
      method: 'POST', // Using POST because PUT with FormData can be tricky
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(errorData.error?.description || errorData.error || 'Failed to update product');
    }

    const result = await response.json();
    return result.data;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.request(`/admin/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Reviews
  async getReviews(page = 1, limit = 10): Promise<PaginatedResponse<Review>> {
    const response = await this.request<ApiResponse<PaginatedResponse<Review>>>(
      `/reviews?page=${page}&limit=${limit}`
    );
    return response.data!;
  }

  async getReview(id: number): Promise<Review> {
    const response = await this.request<ApiResponse<Review>>(`/reviews/${id}`);
    return response.data!;
  }

  async createReviewWithFile(formData: FormData): Promise<Review> {
    const headers: HeadersInit = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/admin/reviews`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(errorData.error?.description || errorData.error || 'Failed to create review');
    }

    const result = await response.json();
    return result.data;
  }

  async updateReviewWithFile(id: number, formData: FormData): Promise<Review> {
    const headers: HeadersInit = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/admin/reviews/${id}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(errorData.error?.description || errorData.error || 'Failed to update review');
    }

    const result = await response.json();
    return result.data;
  }

  async deleteReview(id: number): Promise<void> {
    await this.request(`/admin/reviews/${id}`, {
      method: 'DELETE',
    });
  }

  // Applications
  async getApplications(page = 1, limit = 10): Promise<PaginatedResponse<Application>> {
    const response = await this.request<ApiResponse<PaginatedResponse<Application>>>(
      `/admin/applications?page=${page}&limit=${limit}`
    );
    return response.data!;
  }

  async getApplication(id: number): Promise<Application> {
    const response = await this.request<ApiResponse<Application>>(`/admin/applications/${id}`);
    return response.data!;
  }

  async deleteApplication(id: number): Promise<void> {
    await this.request(`/admin/applications/${id}`, {
      method: 'DELETE',
    });
  }

  // Telegram Bot Management
  async stopTelegramBot(): Promise<{ success: boolean; message: string; pending_updates_dropped: boolean }> {
    const response = await this.request<ApiResponse<{ success: boolean; message: string; pending_updates_dropped: boolean }>>(
      '/admin/telegram/stop',
      {
        method: 'POST',
      }
    );
    return response.data!;
  }

  // Settings
  async getSetting(key: string = 'feature_flag'): Promise<{ value: boolean }> {
    const response = await this.request<ApiResponse<{ value: boolean }>>(
      `/setting?key=${key}`
    );
    return response.data!;
  }

  async toggleSetting(key: string = 'feature_flag'): Promise<{ value: boolean; message: string }> {
    const response = await this.request<ApiResponse<{ value: boolean; message: string }>>(
      `/admin/setting/toggle?key=${key}`,
      {
        method: 'POST',
      }
    );
    return response.data!;
  }
}

export const api = new ApiClient(API_BASE_URL);

