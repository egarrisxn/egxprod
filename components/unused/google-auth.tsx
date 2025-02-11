import Image from "next/image";
import { authWithGoogle } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default function GoogleAuth() {
  return (
    <form action={authWithGoogle}>
      <Button
        type="submit"
        variant="outline"
        className="w-full bg-white text-black dark:hover:bg-slate-300 dark:hover:text-black"
      >
        <Image
          src="/assets/google.svg"
          alt="Google"
          width={20}
          height={20}
          className="mr-2"
        />
        Google
      </Button>
    </form>
  );
}
