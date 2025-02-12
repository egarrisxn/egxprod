import * as React from "react";
import { createClient } from "@/utils/supabase/server";
import generateMetadata from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  path: "/protected/profile/edit",
  title: "Edit Profile | xprod",
  description: "Edit your protected profile page.",
});

export default async function EditProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="container space-y-3">
      <h3>Edit Profile</h3>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
    </section>
  );
}

// export default function EditProfilePage() {
//   return <EditProfileCard />
// }
