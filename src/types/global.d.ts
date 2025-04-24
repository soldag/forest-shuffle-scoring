import { Entries } from "type-fest";

declare global {
  interface Window {
    goatcounter?: {
      count: (options?: {
        path?: string;
        title?: string;
        event?: boolean;
      }) => void;
    };
  }

  interface ObjectConstructor {
    entries<T extends object>(o: T): Entries<T>;
  }
}
