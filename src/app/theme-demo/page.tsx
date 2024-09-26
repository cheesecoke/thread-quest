import React from "react";
import Button from "@/app/components/Button";

const ThemeDemo = () => {
  return (
    <div className="container mx-auto min-h-screen bg-white text-primary p-8 mt-20">
      <h1 className="text-4xl font-logo font-bold text-primary mb-4">
        ThreadQuest - Theme Demo (Font Lora)
      </h1>

      {/* Main Colors Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Main Color Palette:
        </h2>
        <div className="space-y-2">
          <div className="p-4 bg-primary text-text-secondary rounded">
            Primary (Navy): #2C3E50
          </div>
          <div className="p-4 bg-secondary text-primary rounded">
            Secondary (White): #FFFFFF
          </div>
          <div className="p-4 bg-accent text-primary rounded">
            Accent (Gold): #D4AF37
          </div>
        </div>
      </section>

      {/* Buttons Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Button Examples:
        </h2>
        <div className="space-y-4">
          {/* Primary Buttons */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-2">
              Primary Buttons
            </h3>
            <div className="space-x-4">
              <Button type="primary" size="sm">
                Small Primary
              </Button>
              <Button type="primary" size="md">
                Medium Primary
              </Button>
              <Button type="primary" size="lg">
                Large Primary
              </Button>
              <Button type="primary" size="md" soft>
                Soft Primary
              </Button>
              <Button type="primary" size="md" disabled>
                Disabled Primary
              </Button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-2">
              Secondary Buttons
            </h3>
            <div className="space-x-4">
              <Button type="secondary" size="sm">
                Small Secondary
              </Button>
              <Button type="secondary" size="md">
                Medium Secondary
              </Button>
              <Button type="secondary" size="lg">
                Large Secondary
              </Button>
              <Button type="secondary" size="md" soft>
                Soft Secondary
              </Button>
              <Button type="secondary" size="md" disabled>
                Disabled Secondary
              </Button>
            </div>
          </div>

          {/* Outlined Primary Buttons */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-2">
              Outlined Primary Buttons
            </h3>
            <div className="space-x-4">
              <Button type="primary" variant="outlined" size="sm">
                Small Outlined
              </Button>
              <Button type="primary" variant="outlined" size="md">
                Medium Outlined
              </Button>
              <Button type="primary" variant="outlined" size="lg">
                Large Outlined
              </Button>
              <Button type="primary" variant="outlined" size="md" soft>
                Soft Outlined
              </Button>
              <Button type="primary" variant="outlined" size="md" disabled>
                Disabled Outlined
              </Button>
            </div>
          </div>

          {/* Outlined Secondary Buttons */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-2">
              Outlined Secondary Buttons
            </h3>
            <div className="space-x-4">
              <Button type="secondary" variant="outlined" size="sm">
                Small Outlined
              </Button>
              <Button type="secondary" variant="outlined" size="md">
                Medium Outlined
              </Button>
              <Button type="secondary" variant="outlined" size="lg">
                Large Outlined
              </Button>
              <Button type="secondary" variant="outlined" size="md" soft>
                Soft Outlined
              </Button>
              <Button type="secondary" variant="outlined" size="md" disabled>
                Disabled Outlined
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
          Typography Example
        </h2>
        <div className="space-y-4">
          <h1 className="text-4xl font-heading font-bold">
            Heading 1 - Poppins
          </h1>
          <h2 className="text-3xl font-heading font-bold">
            Heading 2 - Poppins
          </h2>
          <h3 className="text-2xl font-heading font-bold">
            Heading 3 - Poppins
          </h3>
          <h4 className="text-xl font-heading font-bold">
            Heading 4 - Poppins
          </h4>
          <p className="font-body text-base text-text-primary">
            This is a paragraph example using the Roboto font for body text.
            ThreadQuest offers a unique shopping experience where you can find
            and save high-quality clothing items from top brands, categorized by
            where they are worn on the body.
          </p>
          <p className="font-body text-base text-text-secondary">
            This is secondary body text styled with a lighter font color for
            less emphasis.
          </p>
        </div>
      </section>

      {/* UI Feedback Colors Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          UI Feedback Colors:
        </h2>
        <div className="space-y-2">
          <div className="bg-warning p-4 rounded">
            Warning: This is an amber warning message!
          </div>
          <div className="bg-info p-4 rounded text-text-secondary">
            Information: This is a blue informational message.
          </div>
          <div className="bg-success p-4 rounded text-text-secondary">
            Success: Operation completed successfully.
          </div>
          <div className="bg-error p-4 rounded text-text-secondary">
            Error: Something went wrong!
          </div>
        </div>
      </section>

      {/* Neutral Colors Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Neutral Colors:
        </h2>
        <div className="space-y-2">
          <div className="bg-neutral-light p-4 text-primary rounded">
            Light Neutral (Soft Gray): #ECF0F1
          </div>
          <div className="bg-neutral-mid p-4 text-primary rounded">
            Mid Neutral (Cool Gray): #BDC3C7
          </div>
          <div className="bg-neutral-dark p-4 text-text-secondary rounded">
            Dark Neutral (Charcoal): #2F2F2F
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThemeDemo;
