"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Heart } from "phosphor-react";

export default function Likes({ xeet }: any) {
  const router = useRouter();
  async function handleLikes() {
    const supabase = createClientComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (xeet.user_has_liked_tweet) {
        await supabase.from("likes").delete().match({
          user_id: user.id,
          tweets: xeet.id,
        });
        router.refresh();
      } else {
        await supabase
          .from("likes")
          .insert({ user_id: user.id, tweets: xeet.id });
        router.refresh();
      }
    }
  }
  return (
    <button onClick={handleLikes} className="flex text-red-600 items-center">
      <span className="ml-2">{xeet.likes} </span>
      <Heart size={25} className="bg-red-600" />
    </button>
  );
}
