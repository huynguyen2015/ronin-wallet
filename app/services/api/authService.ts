import api from './api'
import { save, saveString } from "../../utils/storage"
import { save as saveKeychain } from "../../utils/keychain"
import { appStorageKey } from "../../utils/appConst"

/**
 * Manages all requests to the API.
 */
class AuthService {

  constructor() {
  }

  async login(body) {
    try {
      const url = `members/login`
      const data = await api.post(url, body)
      if (!data) {
        return null
      }
      await saveString(appStorageKey.ACCESS_TOKEN, data.accessToken)
      await save(appStorageKey.PROFILE_INFO, data.userInfo)
      await saveKeychain(body.email, body.password)
      /// NOTE: hardcode balance from service
      data.userInfo.amount = 1000
      data.userInfo.accountNumber = '(7300 3777 3888 3334)'
      data.userInfo.accountNumberHiding = '(7300...3334)'
      return data
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

export default new AuthService()
