import LoginBtn from "@/components/btns/LoginBtn";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function LoginBtnSever() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return <LoginBtn session={session}/>;
}
