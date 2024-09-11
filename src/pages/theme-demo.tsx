import React from "react";

const ThemeDemo = () => {
  return (
    <div className="container mx-auto min-h-screen bg-secondary text-primary p-8">
      <h1 className="text-4xl font-logo font-bold text-primary mb-4">
        ThreadQuest - Theme Demo (Font Lora)
      </h1>

      {/* Main Colors Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Main Color Palette:
        </h2>
        <div className="space-y-2">
          <div className="p-4 bg-primary text-secondary rounded">
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

      {/* Heading and Text Examples */}
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

      {/* Buttons Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Button States:
        </h2>
        <div className="space-x-4">
          <button className="bg-accent text-secondary font-heading px-4 py-2 rounded hover:bg-primary">
            Active Button
          </button>
          <button className="bg-accent text-secondary font-heading px-4 py-2 rounded opacity-50 cursor-not-allowed">
            Disabled Button
          </button>
          <button className="border-2 border-accent text-accent font-heading px-4 py-2 rounded hover:bg-accent hover:text-secondary">
            Outlined Button
          </button>
          <button className="border-2 border-accent text-accent font-heading px-4 py-2 rounded opacity-50 cursor-not-allowed">
            Outlined Button Disabled
          </button>
        </div>
      </section>

      {/* Font Colors Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Font Colors:
        </h2>
        <p className="text-text-primary mb-2 font-body">
          This is primary text (Dark Navy): #1C2833
        </p>
        <p className="text-text-secondary mb-2 font-body">
          This is secondary text (Grayish Blue): #566573
        </p>
        <p className="text-secondary bg-primary p-2 rounded font-body">
          This is light text on dark background (White): #FFFFFF
        </p>
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
          <div className="bg-info p-4 rounded text-secondary">
            Information: This is a blue informational message.
          </div>
          <div className="bg-success p-4 rounded text-secondary">
            Success: Operation completed successfully.
          </div>
          <div className="bg-error p-4 rounded text-secondary">
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
          <div className="bg-neutral-dark p-4 text-secondary rounded">
            Dark Neutral (Charcoal): #2F2F2F
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThemeDemo;
