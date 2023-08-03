import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Xeeting() {
  const supabase = createServerComponentClient({ cookies });
  const {data} = await supabase.auth.getUser()
  
  return <div>Xeeting</div>;
}
