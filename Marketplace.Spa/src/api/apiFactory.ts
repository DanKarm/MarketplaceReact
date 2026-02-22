type Primitive = string | number | boolean | bigint;
type QueryValue = Primitive | Date;

export type QueryParams =
  | Record<string, QueryValue | QueryValue[] | null | undefined>
  | null
  | undefined;

export type ApiError<Data = unknown> = Error & {
  status?: number;
  data?: Data;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type BaseRequestOptions<
  TBody = unknown,
  TParams extends QueryParams = QueryParams,
> = {
  method?: HttpMethod;
  body?: TBody;
  params?: TParams;
  headers?: Record<string, string>;
};

export function createQueryString(params?: QueryParams): string {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // массив значений: ?a=1&a=2
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item === undefined || item === null) return;
        searchParams.append(key, formatQueryValue(item));
      });
      return;
    }

    searchParams.append(key, formatQueryValue(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

function formatQueryValue(value: QueryValue): string {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

export function createApi(
  baseUrl: string,
  defaultHeaders: Record<string, string> = {},
) {
  const baseRequest = async <TResponse = unknown, TBody = unknown>(
    path: string,
    options: BaseRequestOptions<TBody> = {},
  ): Promise<TResponse> => {
    const { method = "GET", body, params, headers = {} } = options;

    const url = baseUrl + path + createQueryString(params);

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
        ...headers,
      },
    };

    if (body !== undefined) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);

      // если бэк иногда возвращает пустое тело
      const text = await response.text();
      const data: unknown = text ? safeJsonParse(text) : null;

      if (!response.ok) {
        const error: ApiError = new Error("Ошибка при загрузке данных");
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data as TResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    get<TResponse = unknown>(
      path: string,
      options: Omit<BaseRequestOptions<never>, "method" | "body"> = {},
    ) {
      return baseRequest<TResponse, never>(path, { ...options, method: "GET" });
    },

    post<TResponse = unknown, TBody = unknown>(
      path: string,
      options: Omit<BaseRequestOptions<TBody>, "method"> = {},
    ) {
      return baseRequest<TResponse, TBody>(path, {
        ...options,
        method: "POST",
      });
    },

    put<TResponse = unknown, TBody = unknown>(
      path: string,
      options: Omit<BaseRequestOptions<TBody>, "method"> = {},
    ) {
      return baseRequest<TResponse, TBody>(path, { ...options, method: "PUT" });
    },

    patch<TResponse = unknown, TBody = unknown>(
      path: string,
      options: Omit<BaseRequestOptions<TBody>, "method"> = {},
    ) {
      return baseRequest<TResponse, TBody>(path, {
        ...options,
        method: "PATCH",
      });
    },

    delete<TResponse = unknown>(
      path: string,
      options: Omit<BaseRequestOptions<never>, "method" | "body"> = {},
    ) {
      return baseRequest<TResponse, never>(path, {
        ...options,
        method: "DELETE",
      });
    },
  };
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text; // если это не JSON, вернем как строку
  }
}
