import type { LoaderFunctionArgs, MetaArgs } from "react-router";
import { Welcome } from "../welcome/welcome";

type HomeProps = { loaderData: { message: string } };

export function meta({}: MetaArgs) {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}
export function loader({ context }: LoaderFunctionArgs) {
  return { message: context.VALUE_FROM_EXPRESS };
}

export default function Home({ loaderData }: HomeProps) {
  console.log("Je suis le test du warn");
  return <Welcome message={loaderData.message} />;
}
