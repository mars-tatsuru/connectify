import { createClient } from "microcms-js-sdk";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const query = getQuery(event);

  const endpoint = query.endpoint as string;
  const limit = query.limit as number;
  const offset = query.offset as number;

  const client = createClient({
    serviceDomain: runtimeConfig.secret.microcms.domain,
    apiKey: runtimeConfig.secret.microcms.api.key,
  });

  try {
    const res = await client.get({
      endpoint: endpoint,
      queries: {
        limit: limit,
        offset: offset,
      },
    });

    // データを返す
    return {
      data: res,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
});
