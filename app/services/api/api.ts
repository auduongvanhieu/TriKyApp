import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { rootStoreRef } from "../../app"

export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  setup() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Demo: Gets a list of users.
   */
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

  /**
   * Demo: Gets a single user by ID
   */
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
    const response: ApiResponse<any> = await this.apisauce.post(`/login`, body)
    console.log('hieunv', 'response', response);
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
      return { kind: "ok", data: res }
    } catch {
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
      console.log('hieunv', 'getCategories_res', res);
      return { kind: "ok", data: res }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
