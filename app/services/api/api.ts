import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { rootStoreRef } from "../../app"
import { requestReplace } from "../app-action/app-action"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import { getGeneralApiProblem } from "./api-problem"

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
  // ________________________________________Auth________________________________________

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
      rootStoreRef.authStore.saveToken(res?.data?.token)
      rootStoreRef.profileStore.saveProfile(res?.data?.user)
      return { kind: "ok", data: res?.data }
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
      rootStoreRef.authStore.saveToken(res?.data?.token)
      rootStoreRef.profileStore.saveProfile(res?.data?.user)
      return { kind: "ok", data: res?.data }
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
      rootStoreRef.generalStore.saveCategories(res?.data)
      console.log('hieunv', 'getCategories_res', res?.data);
      return { kind: "ok", data: res?.data }
    } catch (error) {
      console.log('hieunv', 'getCategories_error', error);
      return { kind: "bad-data" }
    }
  }

  /**
   * Get titles
   */
  async getTitles(params: any): Promise<any> {
    if (params.showLoading)
      rootStoreRef.appStore.showLoading()
    const response: ApiResponse<any> = await this.apisauce.get(`/titles/all`)
    rootStoreRef.appStore.hideLoading()
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.log('hieunv', 'getTitles_problem', problem);
      if (problem) return problem
    }
    try {
      const res: any = response.data
      rootStoreRef.generalStore.saveTitles(res?.data)
      console.log('hieunv', 'getTitles_res', res?.data);
      return { kind: "ok", data: res?.data }
    } catch (error) {
      console.log('hieunv', 'getTitles_error', error);
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
      if(problem?.kind=="unauthorized"){
        requestReplace("login")
      }
      if (problem) return problem
    }
    try {
      const res: any = response.data
      rootStoreRef.profileStore.saveProfile(res?.data)
      console.log('hieunv', 'getProfile_res', res?.data);
      return { kind: "ok", data: res?.data }
    } catch (error) {
      console.log('hieunv', 'getProfile_error', error);
      return { kind: "bad-data" }
    }
  }

  /**
   * Update Profile
   */
  async updateProfile(params: any): Promise<any> {
    rootStoreRef.appStore.showLoading()
    const response: ApiResponse<any> = await this.apisauce.put(`/profile`, params)
    rootStoreRef.appStore.hideLoading()
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.log('hieunv', 'updateProfile_problem', problem);
      if (problem) return problem
    }
    try {
      const res: any = response.data
      rootStoreRef.profileStore.saveProfile(res?.data)
      console.log('hieunv', 'updateProfile_res', res?.data);
      rootStoreRef.appStore.showSuccessAlert({ description: "Cập nhật thành công" })
      return { kind: "ok", data: res?.data }
    } catch (error) {
      console.log('hieunv', 'updateProfile_error', error);
      return { kind: "bad-data" }
    }
  }
}

var api = new Api()
const resetApi = () => {
  api = new Api()
}
export { api, resetApi, Api }
