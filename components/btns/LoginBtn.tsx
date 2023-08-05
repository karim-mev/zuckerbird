"use client";

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LoginBtn({session}: {session: Session | null}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return session ? (
    <button className="text-xs text-gray-400" onClick={handleLogout}>Logout</button>
  ) : (
    <button className="text-xs text-gray-400" onClick={handleLogin}>Login</button>
  );
}
