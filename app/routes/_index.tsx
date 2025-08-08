import type { LoaderFunctionArgs } from "react-router";

type HomeProps = { loaderData: { message: string } };

export function meta() {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}
export function loader({ context }: LoaderFunctionArgs) {
  return { message: context.VALUE_FROM_EXPRESS };
}

export default function Home({ loaderData }: HomeProps) {}
