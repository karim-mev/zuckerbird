import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LoginBtnSever from "./LoginBtnSever";
import { redirect } from "next/navigation";
import Xeeting from "@/components/xeeting/Xeeting";
import Xeets from "@/components/Xeets";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("tweeting")
    .select("*, author: profile(*), likes(user_id)");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const xeets =
    data?.map((tweet) => ({
      ...tweet,
      user_has_liked_tweet: tweet.likes.find(
        (like: { user_id: string | undefined }) =>
          like.user_id === session?.user.id
      ),
      likes: tweet.likes.length,
    })) ?? [];

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="w-full flex flex-col items-center text-white">
      <LoginBtnSever />
      <Xeeting />
      <Xeets xeets={xeets}/>
    </div>
  );
}
