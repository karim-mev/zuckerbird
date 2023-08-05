"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function XeetingForm({
  user_id,
}: {
  user_id: string | undefined;
}) {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();
  function handleChange(e: any) {
    e.preventDefault();
    setTitle(e.target.value);
  }
  async function addXeet(e: any) {
    try {
      e.preventDefault();

      await supabase.from("tweeting").insert({ title, user_id: user_id });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="w-full">
      <form onSubmit={addXeet}>
        <input
          type="text"
          placeholder="What is happening?"
          value={title}
          onChange={handleChange}
          className="bg-inherit w-full outline-none text-2xl font-bold leading-loose focus:outline-0"
        />
      </form>
    </div>
  );
}
