import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import XeetingForm from "./XeetingForm";
import Image from "next/image";

export default async function Xeeting() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  //(user_id = auth.uid())

  return (
    <div className="flex items-center gap-2 w-full px-4 py-2">
      <div>
        <Image
          className="rounded-full"
          src={user?.user_metadata.avatar_url}
          alt="avatar"
          width={48}
          height={48}
          style={{borderRadius: '2rem'}}
        />
      </div>
      <XeetingForm user_id={user?.id} />
    </div>
  );
}
