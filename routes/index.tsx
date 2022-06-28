/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <h1 class={tw`text-2xl font-bold my-8`}>Blog made with Fresh</h1>
      <ul class={tw`list-disc`}>
        <li>
          <a href="/blog/hello-world" class={tw`text-indigo-500 underline`}>
            Hello World
          </a>
        </li>
      </ul>
    </div>
  );
}
