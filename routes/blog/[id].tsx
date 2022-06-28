/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { frontMatter, gfm } from "../../utils/markdown.ts";

import { TableOfContentsEntry } from "../../data/docs.ts";

type Page = TableOfContentsEntry & {
  markdown: string;
  data: Record<string, unknown>;
};

export const handler = async (_req: Request, ctx: HandlerContext) => {
  const body = await Deno.readTextFile(`./posts/${ctx.params.id}.md`);
  const { data, content } = frontMatter(body);
  const page = { markdown: content, data: data ?? {} };
  return ctx.render({ page });
};

export default function BlogPost(props: PageProps) {
  const { page } = props.data;
  const description = page.data?.description;

  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <Head>
        <title>{page?.title ?? "Not Found"} | Blog</title>
        <link rel="stylesheet" href={`/gfm.css?build=${__FRSH_BUILD_ID}`} />
        {description && <meta name="description" content={description} />}
      </Head>
      <div>
        <Main path={props.url.pathname} page={props.data.page}></Main>
      </div>
    </div>
  );
}

function Main(props: { path: string; page: Page }) {
  const main = tw`mx-auto max-w-screen-lg px-4 flex gap-6`;
  return (
    <div class={tw`flex-1`}>
      <div class={main}>
        <Content page={props.page} />
      </div>
    </div>
  );
}

function Content(props: { page: Page }) {
  const main = tw`py-4 overflow-hidden`;
  const title = tw`text(4xl gray-900) tracking-tight font-extrabold mt-6`;
  const html = gfm.render(props.page.markdown);
  return (
    <main class={main}>
      <h1 class={title}>{props.page.title}</h1>
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
