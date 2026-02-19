import { redirect } from "next/navigation";

export default function loginRedirect() {
  redirect("/client/login");
}