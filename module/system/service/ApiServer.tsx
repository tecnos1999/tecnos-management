import HttpResponse from "../httpResponse/HttpResponse";

class ApiServer {
  api<U, T>(path: string, method: string, body: U, token: string): Promise<HttpResponse<T>> {
    const url = `http://${window.location.hostname}:8080/server${path}`;
    const isFormData = body instanceof FormData;
    const options: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { "Content-Type": "application/json;charset=utf-8" }),
      },
      body: isFormData ? body : (body == null ? null : JSON.stringify(body)),
    };

    return fetch(url, options);
  }
}

export default ApiServer;
