type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions<TBody extends BodyInit | null | undefined = undefined> extends RequestInit {
  method?: HttpMethod;
  body?: TBody;
  params?: Record<string, string | number | boolean>;
}

interface FetchResponse<T> {
  data: T | null;
  error: string | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

async function baseFetch<TResponse, TBody extends BodyInit | null | undefined = undefined>(
  url: string,
  options?: FetchOptions<TBody>
): Promise<FetchResponse<TResponse>> {
  const {
    method = 'GET',
    headers = {},
    body,
    params,
    ...restOptions // Destructure and collect remaining options
  } = options || {};

  // Build the query string if params are provided
  const queryString = params
    ? '?' + new URLSearchParams(params as Record<string, string>).toString()
    : '';

  // Construct the full URL with query string
  const fullUrl = `${BASE_URL}${url}${queryString}`;  

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body, // Use body directly since it's already type-safe
      ...restOptions, // Spread other RequestInit options like mode, credentials, etc.
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }    

    const data: TResponse = await response.json();
    return { data, error: null };
  } catch (error: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }

    throw error;
  }
}

export default baseFetch;
