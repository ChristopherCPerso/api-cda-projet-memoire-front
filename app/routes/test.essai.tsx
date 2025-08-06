import type { LoaderFunctionArgs } from "react-router";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  console.log(url);
};

export default function Test() {
  return <h1>Hello World</h1>;
}
