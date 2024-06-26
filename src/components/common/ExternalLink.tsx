import { ReactNode } from "react";

import { Link } from "@mui/joy";

interface ExternalLinkProps {
  href: string;
  children?: ReactNode;
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    {children || href}
  </Link>
);

export default ExternalLink;
