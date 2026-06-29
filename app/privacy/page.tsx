import type { Metadata } from "next";
import { LegalShell } from "../legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy - Steps Widget",
  description:
    "Privacy Policy for Steps Widget by CrazyLazy OU, a private step counter widget for iPhone and Apple Watch.",
};

const sections = [
  {
    title: "Overview",
    body: [
      "CrazyLazy OU provides Steps Widget as a commercial app intended for use as provided. This Privacy Policy explains how information is collected, used, and disclosed when you use the app.",
      "By using Steps Widget, you agree to the handling of information described in this policy. Terms used here have the same meaning as in the Steps Widget Terms and Conditions unless this page defines them differently.",
    ],
  },
  {
    title: "Information Collection and Use",
    body: [
      "Steps Widget may use information needed to provide and improve the service, including app settings, subscription-related information, preferences, and device-side configuration data.",
      "Information requested by the app may be retained on your device and may not be collected directly by CrazyLazy OU unless this policy explains otherwise.",
      "The app may use third-party services that process information according to their own privacy policies. Apple services, including iOS, Apple Health, App Store purchases, and related platform features, are subject to Apple's privacy policy at https://www.apple.com/legal/privacy.",
    ],
  },
  {
    title: "Apple Health and Fitness Data",
    body: [
      "With your permission, Steps Widget reads step count and related fitness information from Apple Health so it can show your walking progress in the app, Home Screen widgets, Lock Screen widgets, and Apple Watch experiences.",
      "Steps Widget is designed around on-device step display. Your Apple Health step data is used to show your progress and is not sold, used for advertising, or used for credit, insurance, employment, or similar eligibility decisions.",
      "You can grant or revoke Apple Health permissions at any time in iOS Settings.",
    ],
  },
  {
    title: "Log Data",
    body: [
      "If an error occurs, Steps Widget or third-party tools used by the app may collect diagnostic information, such as device type, operating system version, app configuration, time and date of use, IP address, and other technical statistics.",
      "This log data is used to understand errors, maintain the service, and improve reliability.",
    ],
  },
  {
    title: "Cookies and Similar Technologies",
    body: [
      "Steps Widget does not use browser cookies directly for its core widget experience.",
      "Third-party code, libraries, websites, or services linked from the app may use cookies or similar technologies according to their own policies.",
    ],
  },
  {
    title: "Service Providers",
    body: [
      "CrazyLazy OU may work with third-party companies or individuals to provide the service, perform service-related work, or help understand how the service is used.",
      "These service providers may access information only for the tasks assigned to them and are expected not to disclose or use it for other purposes.",
    ],
  },
  {
    title: "Notifications and Local Preferences",
    body: [
      "If you enable notifications, Steps Widget may use on-device progress information to provide reminders or encouragement.",
      "The app may also store local preferences, such as widget style, goal, reminder settings, theme choice, and other display settings. You can manage notifications in iOS Settings.",
    ],
  },
  {
    title: "Security",
    body: [
      "CrazyLazy OU values your trust and uses commercially reasonable means to protect information associated with the service.",
      "No method of electronic transmission or storage is completely secure, so absolute security cannot be guaranteed.",
    ],
  },
  {
    title: "Links to Other Sites",
    body: [
      "Steps Widget or this website may link to third-party sites or services. Those sites are not operated by CrazyLazy OU, and their own terms and privacy policies apply.",
      "You should review the privacy policy of any third-party site or service you visit.",
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      "Steps Widget is not directed to children under 13, and CrazyLazy OU does not knowingly collect personally identifiable information from children under 13.",
      "If a parent or guardian believes a child has provided personal information, contact us so the issue can be reviewed and appropriate action can be taken.",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "CrazyLazy OU may update this Privacy Policy from time to time. Updates will be posted on this page.",
      "Changes become effective when posted unless the updated policy says otherwise.",
    ],
  },
  {
    title: "Contact",
    body: [
      "If you have questions or suggestions about this Privacy Policy, contact CrazyLazy OU at Crazylazy007@gmail.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="Privacy"
      title="Privacy Policy"
      description="Steps Widget is built around private, glanceable step tracking. This policy follows CrazyLazy's app privacy terms while clarifying how Steps Widget uses Apple Health step data."
      updated="June 28, 2026"
      sections={sections}
    />
  );
}
