import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LoginBtnSever from "./LoginBtnSever";
import { redirect } from "next/navigation";
import Xeeting from "@/components/xeeting/Xeeting";
import Xeets from "@/components/Xeets";
import { Heart } from "phosphor-react";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("tweeting")
    .select("*, author: profile(*), likes(user_id)")
    .order("created_at", { ascending: false });

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
    <div className="w-full text-white">
      <div className="flex justify-between px-4 py-6 border-b-2 mb-2">
        <h1 className="text-xl font-bold">Home</h1>
        <LoginBtnSever />
      </div>
      <Xeeting />
      <Xeets xeets={xeets} />
      {/* <button className="bg-red-500">
       lol
    </button> */}
    </div>
  );
}
