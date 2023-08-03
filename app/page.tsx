import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LoginBtnSever from "./LoginBtnSever";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const { data: xeets } = await supabase.from("tweeting").select("*, profile(*)");
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="w-full flex flex-col items-center text-white">
      <LoginBtnSever />
      <pre>{JSON.stringify(xeets, null, 2)}</pre>
    </div>
  );
}
