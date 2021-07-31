import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { rootStoreRef } from "../../app"

class Api {
  
  apisauce: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.setup()
  }

  setup() {
    const authToken = "Bearer " + rootStoreRef?.authStore?.token
    console.log('hieunv', 'auth_token', authToken);
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: authToken
      },
    })
  }

  async getUsers(): Promise<Types.GetUsersResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const convertUser = (raw) => {
      return { id: raw.id, name: raw.name, }
    }
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getUser(id: string): Promise<Types.GetUserResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const resultUser: Types.User = { id: response.data.id, name: response.data.name, }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Login
   */
  async login(body: any): Promise<any> {
    console.log('hieunv', 'login_params', body);
    rootStoreRef.appStore.showLoading()
    const response = await this.apisauce.post(`/login`, body, { headers: {} })
    console.log('hieunv', 'login_response', response);
    rootStoreRef.appStore.hideLoading()
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.log('hieunv', 'login_problem', problem);
      if (problem) return problem
    }
    try {
      const res: any = response.data
      console.log('hieunv', 'login_res', res);
      rootStoreRef.appStore.showSuccessAlert({ description: "Đăng nhập thành công" })
      rootStoreRef.authStore.saveToken(res?.token)
      rootStoreRef.profileStore.saveProfile(res?.user)
      return { kind: "ok", data: res }
    } catch (error) {
      console.log('hieunv', 'login_error', error);
      return { kind: "bad-data" }
    }
  }

  /**
   * Register
   */
  async register(body: any): Promise<any> {
    console.log('hieunv', 'register_params', body);
    rootStoreRef.appStore.showLoading()
    const response = await this.apisauce.post(`/register`, body, { headers: {} })
    console.log('hieunv', 'register_response', response);
    rootStoreRef.appStore.hideLoading()
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.log('hieunv', 'register_problem', problem);
      if (problem) return problem
    }
    try {
      const res: any = response.data
      console.log('hieunv', 'register_res', res);
      rootStoreRef.appStore.showSuccessAlert({ description: "Đăng ký thành công" })
      rootStoreRef.authStore.saveToken(res?.token)
      rootStoreRef.profileStore.saveProfile(res?.user)
      return { kind: "ok", data: res }
    } catch (error) {
      console.log('hieunv', 'register_error', error);
      return { kind: "bad-data" }
    }
  }

  /**
   * Get categories
   */
  async getCategories(params: any): Promise<any> {
    if (params.showLoading)
      rootStoreRef.appStore.showLoading()
    const response: ApiResponse<any> = await this.apisauce.get(`/categories/all`)
    rootStoreRef.appStore.hideLoading()
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.log('hieunv', 'getCategories_problem', problem);
      if (problem) return problem
    }
    try {
      const res: any = response.data
      rootStoreRef.generalStore.saveCategories(res)
      console.log('hieunv', 'getCategories_res', res);
      return { kind: "ok", data: res }
    } catch (error) {
      console.log('hieunv', 'getCategories_error', error);
      return { kind: "bad-data" }
    }
  }

  /**
   * Get Profile
   */
  async getProfile(params: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`/profile`)
    rootStoreRef.appStore.hideLoading()
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.log('hieunv', 'getProfile_problem', problem);
      if (problem) return problem
    }
    try {
      const res: any = response.data
      rootStoreRef.profileStore.saveProfile(res)
      console.log('hieunv', 'getProfile_res', res);
      return { kind: "ok", data: res }
    } catch (error) {
      console.log('hieunv', 'getProfile_error', error);
      return { kind: "bad-data" }
    }
  }
}

var api = new Api()
const resetApi = () => {
  api = new Api()
}
export { api, resetApi, Api }