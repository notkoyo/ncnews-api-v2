import { fetchEndpoints } from '@/model';
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
import type { Endpoint } from "@/api";

const endpoints = new Hono();

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  )
}

const Main: FC<{ endpoints: Endpoint[] }> = ({ endpoints }) => {
  return (
    <Layout>
      <h1>NC News API</h1>
      <ul>
        {endpoints.map((endpoint) => (
          <li key={endpoint.endpoint}>
            <strong>{endpoint.method} {endpoint.endpoint}:</strong> {endpoint.description}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

endpoints.get('/endpoints', async (c) => {
  const endpoints = await fetchEndpoints();
  return c.html(<Main endpoints={endpoints} />)
})

export default endpoints;