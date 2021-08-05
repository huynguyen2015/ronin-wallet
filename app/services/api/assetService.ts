import api from './api'

/**
 * Manages all requests to the API.
 */
class AssetService {

  constructor() {
  }

  async getAssets(params): Promise<any[]> {
    try {
      params.pageSize = 18
      params.pageNumber = 1
      const url = '/products'
      return api.get(url, params).then(res => {
        return [
          {amount: 1000, country: 'en', sign: 'USD', exchangeRate: 23046},
          {amount: 50, country: 'eu', sign: 'EUR', exchangeRate: 32051},
          {amount: 100, country: 'ja', sign: 'YEN', exchangeRate: 1602}]
      })
    } catch {
      // Handle error
      return null
    }
  }
}

export default new AssetService()
