import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async get(url, params) {
    try {
      const response: ApiResponse<any> = await this.apisauce.get(url, params)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) {
          /// TODO: handle error
        }
        return null
      }
      const {data} = response
      if (!data.success) {
        /// TODO: handle error
        return null
      }

      return data.data
    } catch {
      // Handle error
      return null
    }
  }

  async post(url, body) {
    try {
      const response: ApiResponse<any> = await this.apisauce.post(url, body)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) {
          /// TODO: handle error
        }
        return null
      }
      const {data} = response
      if (!data.success) {
        /// TODO: handle error
        return null
      }

      return data.data
    } catch {
      // Handle error
      return null
    }
  }

  async put(url, body) {
    try {
      const response: ApiResponse<any> = await this.apisauce.put(url, body)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) {
          /// TODO: handle error
        }
        return null
      }
      const {data} = response
      if (!data.success) {
        /// TODO: handle error
        return null
      }

      return data.data
    } catch {
      // Handle error
      return null
    }
  }

  async delete(url, params) {
    try {
      const response: ApiResponse<any> = await this.apisauce.delete(url, params)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) {
          /// TODO: handle error
        }
        return null
      }
      const {data} = response
      if (!data.success) {
        /// TODO: handle error
        return null
      }

      return data.data
    } catch {
      // Handle error
      return null
    }
  }

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
}

const API = new Api()
export default API
