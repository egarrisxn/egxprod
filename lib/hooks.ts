"use client";
import * as React from "react";
import { createClient } from "@/utils/supabase/client";

export function useAvatar(userId: string | null) {
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const supabase = createClient();

  React.useEffect(() => {
    async function fetchAvatar() {
      if (!userId) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", userId)
        .single();

      if (error || !data?.avatar_url) return;

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(data.avatar_url);

      setAvatarUrl(publicUrlData?.publicUrl || null);
    }

    fetchAvatar();
  }, [userId, supabase]);

  return avatarUrl;
}
