import type { Metadata } from "next";
import { LegalShell } from "../legal-shell";

export const metadata: Metadata = {
  title: "Terms and Conditions - Steps Widget",
  description:
    "Terms and Conditions for Steps Widget by CrazyLazy OU, a private step counter widget for iPhone and Apple Watch.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: [
      "By downloading or using Steps Widget, you agree to these Terms and Conditions. Please read them carefully before using the app.",
      "If you do not agree to these terms, do not use Steps Widget.",
    ],
  },
  {
    title: "License and Restrictions",
    body: [
      "You may use Steps Widget for personal use according to these terms and the rules of the Apple App Store.",
      "You may not copy, modify, translate, create derivative versions of, attempt to extract source code from, or otherwise misuse the app, its trademarks, or its protected materials except where permitted by law.",
      "The app, trademarks, copyrights, database rights, and other intellectual property rights related to Steps Widget belong to Tiancheng Lin or the applicable rights holder.",
    ],
  },
  {
    title: "Changes, Charges, and App Availability",
    body: [
      "Tiancheng Lin and CrazyLazy OU are committed to keeping the app useful and efficient, and may change the app or its services at any time.",
      "If Steps Widget charges for the app, subscriptions, or services, the payment terms will be made clear before you are charged.",
      "The app is currently available on iOS. System requirements may change, and you may need to install updates to keep using the app.",
    ],
  },
  {
    title: "Device Security and Access",
    body: [
      "You are responsible for keeping your device and app access secure.",
      "Jailbreaking, rooting, or otherwise bypassing operating system protections may make your device less secure and may prevent Steps Widget from working properly.",
    ],
  },
  {
    title: "Internet, Device, and Carrier Responsibility",
    body: [
      "Some app functions may require an active internet connection. Steps Widget may not work at full functionality if your device is offline or if your data allowance is unavailable.",
      "Your mobile carrier's terms still apply when you use the app. You are responsible for data charges, roaming charges, and any other third-party charges that may apply.",
      "You are also responsible for keeping your device charged and available so you can use the app.",
    ],
  },
  {
    title: "Health Data and Permissions",
    body: [
      "Steps Widget relies on Apple Health permissions to display step count and related fitness information. You are responsible for choosing which permissions to grant or revoke.",
      "If Apple Health permissions are disabled, unavailable, inaccurate, delayed, or changed by Apple, some app or widget features may not work as expected.",
    ],
  },
  {
    title: "No Medical Advice",
    body: [
      "Steps Widget is a wellness and activity awareness tool. It is not a medical device and does not provide medical advice, diagnosis, treatment, or emergency monitoring.",
      "Consult a qualified healthcare professional before making decisions about health, fitness, exercise, or medical conditions.",
    ],
  },
  {
    title: "Widget and Notification Behavior",
    body: [
      "iOS controls when widgets refresh to preserve performance and battery life. Step counts shown in widgets may be delayed or may differ from the latest data available in Apple Health.",
      "Notifications, if enabled, are intended as helpful reminders. They may not arrive at a specific time and should not be relied on for safety, medical, or emergency purposes.",
    ],
  },
  {
    title: "Information and Third-Party Sources",
    body: [
      "Although Steps Widget aims to keep app information useful and accurate, some functionality may depend on Apple services, iOS behavior, App Store systems, or other third-party services.",
      "Tiancheng Lin and CrazyLazy OU accept no responsibility for loss, direct or indirect, caused by relying entirely on app functionality, third-party information, or platform behavior.",
    ],
  },
  {
    title: "Updates and Termination",
    body: [
      "Steps Widget may be updated from time to time. You agree to accept app updates when they are offered if you want to continue using the latest app experience.",
      "The app or service may be discontinued at any time. If the app is terminated, the rights and licenses granted to you will end, and you must stop using the app and delete it from your device if required.",
    ],
  },
  {
    title: "User Content",
    body: [
      "If the service allows you to submit, post, display, or otherwise provide content, you retain ownership of your content.",
      "By providing content through the service, you grant CrazyLazy OU a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, transmit, display, and distribute that content as needed to provide, promote, and improve the service.",
      "You represent that you have the rights needed to provide that content and that the content complies with applicable laws and does not infringe the rights of others.",
      "CrazyLazy OU may remove content that violates these terms, applicable law, intellectual property rights, or the safety and integrity of the service.",
    ],
  },
  {
    title: "Apple Standard License Agreement",
    body: [
      "Steps Widget is distributed through the Apple App Store and is subject to Apple's Standard License Agreement at https://www.apple.com/legal/internet-services/itunes/dev/stdeula/.",
      "If these Terms and Conditions conflict with Apple's Standard License Agreement, Apple's terms control where applicable.",
    ],
  },
  {
    title: "Disclaimer and Limitation of Liability",
    body: [
      "Steps Widget is provided as is and as available. To the fullest extent permitted by law, no warranty is made that the app will always be uninterrupted, error-free, accurate, secure, or compatible with every device or iOS version.",
      "To the fullest extent permitted by law, Tiancheng Lin and CrazyLazy OU are not liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from your use of the app.",
    ],
  },
  {
    title: "Changes to These Terms",
    body: [
      "These Terms and Conditions may be updated from time to time. Updates will be posted on this page.",
      "Changes become effective when posted unless the updated terms say otherwise. Continued use of Steps Widget after changes means you accept the updated terms.",
    ],
  },
  {
    title: "Contact",
    body: [
      "If you have questions or suggestions about these Terms and Conditions, contact CrazyLazy OU at Crazylazy007@gmail.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Terms"
      title="Terms and Conditions"
      description="These terms follow CrazyLazy's app terms while clarifying expectations for Steps Widget, Apple Health permissions, widgets, notifications, and App Store distribution."
      updated="June 28, 2026"
      sections={sections}
    />
  );
}
