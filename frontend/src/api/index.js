class ApiService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getAll() {
    const response = await fetch(`${this.endpoint}`);
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  }

  async getOne(id) {
    const response = await fetch(`${this.endpoint}/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  }

  async addOne(item) {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  }

  async deleteOne(id) {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  }

  async patchOne(id, patch) {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patch),
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  }

  async runAction(id, action) {
    const response = await fetch(`${this.endpoint}/${id}/actions/${action}`);
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  }
}

export const itemsApiService = new ApiService("api/items");
export const categoriesApiService = new ApiService("api/categories");
export const toBuyApiService = new ApiService("api/tobuy");
