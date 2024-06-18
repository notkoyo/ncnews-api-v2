interface EndpointParams {
  method?: string,
  description?: string,
}

export interface Endpoints {
  [key: string]: EndpointParams
}