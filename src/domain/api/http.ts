const RAW_BASE_URL = import.meta.env.VITE_API_URL ?? "";
const BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");

export type ApiError = {
  status: number;
  message: string;
  body?: unknown;
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (!BASE_URL) {
    throw new Error("VITE_API_URL is not set");
  }

  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const url = `${BASE_URL}${
    path.startsWith("/") ? path : `/${path}`
  }`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let body: unknown = undefined;
    try {
      body = await response.json();
    } catch {
      // ignore
    }

    const error: ApiError = {
      status: response.status,
      message: response.statusText,
      body,
    };
    throw error;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
