import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import XeetingForm from "./XeetingForm";

export default async function Xeeting() {
  const supabase = createServerComponentClient({ cookies });
  const { data : {user}} = await supabase.auth.getUser();
  //(user_id = auth.uid())

  return <XeetingForm user_id={user?.id}/>;
}
