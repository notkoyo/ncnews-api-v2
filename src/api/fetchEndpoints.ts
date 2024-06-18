import { Context } from "hono";
import * as fs from "fs/promises";

interface EndpointParams {
  method?: string,
  description?: string,
}

interface Endpoints {
  [key: string]: EndpointParams
}

const fetchEndpoints = async (c: Context) => {
  const endpoints = await fs.readFile('./src/endpoints.json', "utf-8");
  const parsedEndpoints: Endpoints = JSON.parse(endpoints);

  return c.json(parsedEndpoints);
};

export default fetchEndpoints;