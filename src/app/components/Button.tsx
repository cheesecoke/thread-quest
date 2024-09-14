import React from "react";
import Link from "next/link";

const Button = ({
  children,
  variant = "flat",
  disabled = false,
  href,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "flat" | "outlined";
  disabled?: boolean;
  href?: string;
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles =
    "font-heading font-bold py-2 px-4 rounded focus:outline-none transition ease-in-out duration-150";

  const flatStyles = disabled
    ? "bg-primary text-secondary opacity-50 cursor-not-allowed"
    : "bg-primary text-secondary hover:bg-primary hover:text-secondary";

  const outlinedStyles = disabled
    ? "border-2 border-primary text-primary opacity-50 cursor-not-allowed"
    : "border-2 border-primary text-primary hover:bg-accent hover:border-accent hover:text-secondary";

  const styles = variant === "flat" ? flatStyles : outlinedStyles;

  // Combine component's styles with the className prop
  const combinedClassName = `${baseStyles} ${styles} ${className}`.trim();

  if (href && !disabled) {
    return (
      <Link href={href} passHref legacyBehavior>
        <a className={combinedClassName} {...props}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <button className={combinedClassName} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
};

export default Button;
