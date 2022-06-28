import { Handlers } from "$fresh/server.ts";
import { gfm } from "../utils/markdown.ts";

export const handler: Handlers = {
  GET: () => {
    return new Response(gfm.CSS, {
      headers: {
        "content-type": "text/css",
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  },
};
