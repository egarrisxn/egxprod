import { createClient } from "@/utils/supabase/server";

export default async function TestPublicUrl() {
  const supabase = await createClient();

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(
      "6130977d-e160-4434-880f-21a1f2cdf166-0.20987328699775598.jpg",
    );

  // Check if the public URL is returned correctly
  if (!data?.publicUrl) {
    return <p>Error: Unable to retrieve the public URL for the image.</p>;
  }

  return <p>Public URL: {data.publicUrl}</p>;
}
