import type { LoaderFunctionArgs } from "react-router";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
};

export default function Test() {
  return <h1 className="font-urbanist text-red-400">Page detail Restaurant</h1>;
}
