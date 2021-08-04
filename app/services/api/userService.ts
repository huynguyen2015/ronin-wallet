import api from './api'

/**
 * Manages all requests to the API.
 */
class UserService {

  constructor() {
  }

  async getUser(params) {
    try {
      const url = `products/by-unique-name/${params.uniqueName}`
      return api.get(url, params)
    } catch {
      // Handle error
      return null
    }
  }

  async getUsers(params): Promise<any[]> {
    try {
      params.pageSize = 18
      params.pageNumber = 1
      const url = '/products'
      return api.get(url, params).then(res => {
        return res.items || []
      })
    } catch {
      // Handle error
      return null
    }
  }
}

export default new UserService()
