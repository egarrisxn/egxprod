import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { signOut } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default async function MainNav() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="w-full">
      <div className="container flex items-center justify-between p-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/prod-logo.png" alt="nav-icon" width={32} height={32} />
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button asChild variant="link">
                <Link href="/">Home</Link>
              </Button>
              <Button asChild variant="link">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
                  >
                    <User />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={5}>
                  <DropdownMenuLabel>Hello, World.</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link className="cursor-pointer" href="/profile/edit">
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link className="cursor-pointer" href="/profile">
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0" asChild>
                    <form action={signOut}>
                      <Button
                        size="sm"
                        className="w-full rounded-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                        type="submit"
                      >
                        Sign Out
                      </Button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="link">
                <Link href="/">Home</Link>
              </Button>
              <Button asChild variant="link">
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                <Link href="/register">Sign Up!</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
