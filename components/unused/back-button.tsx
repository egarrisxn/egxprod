import Link from "next/link";
import { ChevronLeftCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  return (
    <Button variant="outline" asChild>
      <Link href="/" className="absolute left-4 top-4">
        <ChevronLeftCircle className="mr-2 h-4 w-4" />
        Back
      </Link>
    </Button>
  );
}
