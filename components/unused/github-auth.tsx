import Image from "next/image";
import { authWithGitHub } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default function GitHubAuth() {
  return (
    <form action={authWithGitHub}>
      <Button
        type="submit"
        variant="outline"
        className="w-full bg-white text-black dark:hover:bg-slate-300 dark:hover:text-black"
      >
        <Image
          src="/assets/github.svg"
          alt="GitHub"
          width={20}
          height={20}
          className="mr-2"
        />
        GitHub
      </Button>
    </form>
  );
}
