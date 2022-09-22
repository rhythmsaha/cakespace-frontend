import Link from "next/link";
import { ReactNode } from "react";

interface PropsType {
    className?: string;
    children?: ReactNode;
    href: string;
}

const NextLink = ({ href, children, className }: PropsType) => {
    return (
        <Link href={href}>
            <a className={className}>{children}</a>
        </Link>
    );
};
export default NextLink;
