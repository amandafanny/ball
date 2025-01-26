// @ts-expect-error Error: `cookieStore` is a global variable provided by the browser and its type is not defined.
interface CookieStore {
  set: (options: {
    name: string;
    value: string;
    expires: number;
  }) => Promise<void>;
  get: (name: string) => Promise<{ value: string } | undefined>;
}

declare const cookieStore: CookieStore;
