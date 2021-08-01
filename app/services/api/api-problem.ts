import { ApiResponse } from "apisauce"
import { rootStoreRef } from "../../app"

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "timeout"; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "cannot-connect"; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server" }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized" }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden" }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "not-found" }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected" }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad-data" }

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | void {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      rootStoreRef.appStore.showErrorAlert({description: "Lỗi internet, vui lòng kiểm tra lại kết nối"})
      return { kind: "cannot-connect", temporary: true }
    case "NETWORK_ERROR":
      rootStoreRef.appStore.showErrorAlert({description: "Lỗi internet, vui lòng kiểm tra lại kết nối"})
      return { kind: "cannot-connect", temporary: true }
    case "TIMEOUT_ERROR":
      rootStoreRef.appStore.showErrorAlert({description: "Quá thời gian kết nối, vui lòng tải lại"})
      return { kind: "timeout", temporary: true }
    case "SERVER_ERROR":
      rootStoreRef.appStore.showErrorAlert({description: "Lỗi kết nối server, vui lòng liên hệ nhà phát triển để kiểm tra lại server"})
      return { kind: "server" }
    case "UNKNOWN_ERROR":
      rootStoreRef.appStore.showErrorAlert({description: "Lỗi không xác định"})
      return { kind: "unknown", temporary: true }
    case "CLIENT_ERROR":
      rootStoreRef.appStore.showErrorAlert({description: response?.data?.errors?.msg || "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại"})
      switch (response.status) {
        case 401:
          return { kind: "unauthorized" }
        case 403:
          return { kind: "forbidden" }
        case 404:
          return { kind: "not-found" }
        default:
          return { kind: "rejected" }
      }
    case "CANCEL_ERROR":
      return null
  }

  return null
}
