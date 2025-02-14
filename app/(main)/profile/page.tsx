import { createClient } from "@/utils/supabase/server";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | xprod",
  description: "Your profile page.",
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="container space-y-3">
      <h3>Profile Page</h3>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
    </section>
  );
}

// export default function ProfilePage() {
//   return <ProfileCard />
// }
