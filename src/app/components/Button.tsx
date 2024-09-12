import React from "react";
import Link from "next/link";

const Button = ({
  children,
  variant = "flat",
  disabled = false,
  href,
  ...props
}: {
  children: React.ReactNode;
  variant?: "flat" | "outlined";
  disabled?: boolean;
  href?: string;
  [key: string]: any;
}) => {
  const baseStyles =
    "font-heading font-bold py-2 px-4 rounded focus:outline-none transition ease-in-out duration-150";

  const flatStyles = `
    ${
      disabled
        ? "bg-accent text-secondary px-4 py-2 rounded opacity-50 cursor-not-allowed"
        : "bg-accent text-secondary px-4 py-2 rounded hover:bg-primary hover:text-secondary"
    }
  `;

  const outlinedStyles = `
    ${
      disabled
        ? "border-2 border-accent text-accent px-4 py-2 rounded opacity-50 cursor-not-allowed"
        : "border-2 border-accent text-accent px-4 py-2 rounded hover:bg-accent hover:text-secondary"
    }
  `;

  const styles = variant === "flat" ? flatStyles : outlinedStyles;

  if (href && !disabled) {
    return (
      <Link href={href} passHref legacyBehavior>
        <a className={`${baseStyles} ${styles}`} {...props}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <button
        className={`${baseStyles} ${styles}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
};

export default Button;
