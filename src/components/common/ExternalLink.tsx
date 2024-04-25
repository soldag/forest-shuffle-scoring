import { ReactNode } from "react";

import { Link } from "@mui/joy";

interface ExternalLinkProps {
  href: string;
  children?: ReactNode;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    {children || href}
  </Link>
);

export default ExternalLink;
