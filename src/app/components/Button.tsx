import React from "react";
import Link from "next/link";

const Button = ({
  children,
  variant = "flat", // flat (default) or outlined
  type = "primary", // primary (default) or secondary
  size = "md", // sm, md, lg
  soft = false, // soft style
  disabled = false,
  href,
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?: "flat" | "outlined";
  type?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  soft?: boolean;
  disabled?: boolean;
  href?: string;
  className?: string;
  [key: string]: any;
}) => {
  // Base styles for all buttons
  const baseStyles =
    "font-heading font-bold rounded focus:outline-none transition ease-in-out duration-150";

  // Size variations
  const sizeStyles = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  // Styles based on button type and variant
  const flatPrimary = disabled
    ? "bg-primary-light text-text-secondary opacity-50 cursor-not-allowed"
    : soft
    ? "bg-primary-light text-text-secondary hover:bg-primary"
    : "bg-primary text-text-secondary hover:bg-accent";

  const flatSecondary = disabled
    ? "bg-secondary-light text-text-secondary-dark opacity-50 cursor-not-allowed"
    : soft
    ? "bg-secondary text-text-secondary hover:bg-secondary-light"
    : "bg-secondary text-text-secondary-light hover:bg-secondary-dark";

  const outlinedPrimary = disabled
    ? "border-2 border-primary-light text-primary-light opacity-50 cursor-not-allowed"
    : soft
    ? "border-2 border-primary-soft text-primary hover:border-primary-light"
    : "border-2 border-primary text-primary hover:bg-primary hover:text-text-secondary";

  const outlinedSecondary = disabled
    ? "border-2 border-secondary-light text-secondary-light opacity-50 cursor-not-allowed"
    : soft
    ? "border-2 border-secondary-soft text-secondary hover:border-secondary-light"
    : "border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-light";

  // Determine the styles for flat or outlined based on primary or secondary
  const buttonStyles =
    variant === "flat"
      ? type === "primary"
        ? flatPrimary
        : flatSecondary
      : type === "primary"
      ? outlinedPrimary
      : outlinedSecondary;

  // Combine the styles
  const combinedClassName = `${baseStyles} ${
    sizeStyles[size]
  } ${buttonStyles} ${className || ""}`;

  // If the button has a link (href), use the Link component
  if (href && !disabled) {
    return (
      <Link href={href} passHref legacyBehavior>
        <a className={combinedClassName.trim()} {...props}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <button
        type="button"
        className={combinedClassName.trim()}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
};

export default Button;
