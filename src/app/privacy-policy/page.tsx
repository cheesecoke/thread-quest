// pages/privacy-policy.tsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-heading font-bold text-primary mb-8">
        Privacy Policy
      </h1>

      <p className="mb-4 text-primary">
        At ThreadQuest, accessible from{" "}
        <a href="https://yourdomain.com" className="text-accent underline">
          https://www.thread-quest.com
        </a>
        , one of our main priorities is the privacy of our visitors. This
        Privacy Policy document contains types of information that is collected
        and recorded by ThreadQuest and how we use it.
      </p>

      <h2 className="text-2xl font-bold text-secondary mb-4">
        1. Information We Collect
      </h2>
      <p className="mb-4 text-primary">
        We collect various types of information in connection with the services
        we provide, including:
      </p>
      <ul className="list-disc pl-5 mb-4 text-primary">
        <li>Personal information (name, email address, etc.)</li>
        <li>Cookies and tracking information</li>
        <li>Usage data (pages visited, time spent, etc.)</li>
      </ul>

      <h2 className="text-2xl font-bold text-secondary mb-4">
        2. How We Use Your Information
      </h2>
      <p className="mb-4 text-primary">
        We use the information we collect for various purposes, including:
      </p>
      <ul className="list-disc pl-5 mb-4 text-primary">
        <li>To operate and maintain our website</li>
        <li>To improve, personalize, and expand our website</li>
        <li>To communicate with you</li>
        <li>To prevent fraudulent activities</li>
      </ul>

      <h2 className="text-2xl font-bold text-secondary mb-4">3. Cookies</h2>
      <p className="mb-4 text-primary">
        Like many websites, we use cookies to store information including
        visitors' preferences and the pages on the website that they accessed or
        visited. You can disable cookies through your browser settings.
      </p>

      <h2 className="text-2xl font-bold text-secondary mb-4">
        4. Third-Party Services
      </h2>
      <p className="mb-4 text-primary">
        We may use third-party services to help operate our website and process
        data (e.g., Google Analytics, payment processors). These services may
        have access to personal information.
      </p>

      <h2 className="text-2xl font-bold text-secondary mb-4">
        5. Data Security
      </h2>
      <p className="mb-4 text-primary">
        We are committed to protecting your data, and we take appropriate
        measures to safeguard it.
      </p>

      <h2 className="text-2xl font-bold text-secondary mb-4">6. Contact Us</h2>
      <p className="mb-4 text-primary">
        If you have any questions or concerns about our Privacy Policy, feel
        free to contact us at{" "}
        <a
          href="mailto:support@yourdomain.com"
          className="text-accent underline"
        >
          threadquestfashion@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
