import { createClient } from "microcms-js-sdk";

export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig();

  const client = createClient({
    serviceDomain: runtimeConfig.secret.microcms.domain,
    apiKey: runtimeConfig.secret.microcms.api.key,
  });

  try {
    const res = await client.get({
      endpoint: "news",
      queries: { limit: 5 },
    });

    // データを返す
    return {
      data: res.contents,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
});
