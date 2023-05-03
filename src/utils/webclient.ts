type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

export class WebClient<T> {
  private url: string;
  private method: HTTPMethod;

  constructor(url: string, method: HTTPMethod) {
    this.url = url;
    this.method = method
  }

  async exec<T>(){
    const response = await fetch(this.url, {method: this.method})
    const result: T = await response.json()
    return result
  }
}
