import { ComponentProps } from "react";
import Link from "next/link";
import { shortUrl } from "@/utils/format";
import { cn } from "@/utils/cn";

type ReferenceLinkProps = ComponentProps<typeof Link>;

export default function ReferenceLink({
  href,
  className,
  children,
  ...props
}: ReferenceLinkProps) {
  return (
    <Link
      href={shortUrl(href.toString())}
      className={cn(
        className,
        'hover:underline'
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
