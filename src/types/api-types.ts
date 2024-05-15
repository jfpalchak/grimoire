export type Reference = {
  index: string;
  name: string;
  url: string;
  level?: number;
};

export type APIResponse = {
  count: number;
  results: Reference[];
};