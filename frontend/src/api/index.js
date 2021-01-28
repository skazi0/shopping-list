const handleError = async (response) => {
  if (!response.ok) {
    const text = await response.text();
    // try parsing as json
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      // fallback to plaintext
      const error = { message: text };
      throw error;
    }
    throw json;
  }
};

class ApiService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getAll() {
    const response = await fetch(`${this.endpoint}`);
    await handleError(response);
    const data = await response.json();
    return data;
  }

  async getOne(id) {
    const response = await fetch(`${this.endpoint}/${id}`);
    await handleError(response);
    const data = await response.json();
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
    await handleError(response);
    const data = await response.json();
    return data;
  }

  async deleteOne(id) {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: "DELETE",
    });
    await handleError(response);
    const data = await response.json();
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
    await handleError(response);
    const data = await response.json();
    return data;
  }

  async runAction(id, action) {
    const response = await fetch(`${this.endpoint}/${id}/actions/${action}`);
    await handleError(response);
    const data = await response.json();
    return data;
  }
}

export const itemsApiService = new ApiService("api/items");
export const categoriesApiService = new ApiService("api/categories");
export const toBuyApiService = new ApiService("api/tobuy");
