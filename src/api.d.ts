interface EndpointParams {
  method: string,
  route: string,
  description: string,
}

export interface Endpoints {
  [key: string]: EndpointParams
}

export type Endpoint = {
  endpoint: string;
  method: string;
  description: string;
};