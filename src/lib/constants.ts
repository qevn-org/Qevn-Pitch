export interface IndustryConfig {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  examples: {
    email: { subject: string; body: string };
    call: { script: string; duration: string };
    dm: { message: string };
  };
}

export const INDUSTRIES: IndustryConfig[] = [
  {
    slug: "saas",
    name: "SaaS & Software",
    emoji: "💻",
    description: "Software companies, developer tools, AI startups, and B2B products.",
    examples: {
      email: {
        subject: "Quick feedback on {{Company}}'s onboarding flow?",
        body: "Hey {{Name}},\n\nI noticed a small gap in how new signups are activated on your platform. Specifically, the drop-off between trial creation and first integration is averaging 32% for tools in your niche.\n\nWe build custom interactive walkthroughs that increase product activation by 15% in two weeks.\n\nOpen to seeing a 2-minute video mockup of how this would look for {{Company}}?"
      },
      call: {
        script: "Hey {{Name}}, I saw you just launched your new integrations page. We actually help SaaS platforms increase integration adoption by 40% using automated alerts. Do you have 30 seconds to hear how we do it for tools like Slack?",
        duration: "18 seconds"
      },
      dm: {
        message: "Hey {{Name}}! Love your product's new design. I built a quick prototype showing how we can optimize your checkout page to save 8% in cart abandonment. Mind if I drop the link here?"
      }
    }
  },
  {
    slug: "real-estate",
    name: "Real Estate & Brokerages",
    emoji: "🏠",
    description: "Brokers, property managers, and commercial agents looking for listings.",
    examples: {
      email: {
        subject: "Off-market buyers ready in {{City}}?",
        body: "Hi {{Name}},\n\nWe run localized ad campaigns targeting homeowners planning to list in the next 90 days.\n\nCurrently, we have 18 pre-qualified sellers in {{City}} looking for brokerage representation. We don't take referral cuts—just upfront lead generation.\n\nCan I send over the list of zip codes we are currently active in?"
      },
      call: {
        script: "Hi {{Name}}, I'm calling about the listing on Main Street. We have 3 pre-approved buyers looking for a 4-bedroom home in that exact neighborhood. Are you open to a quick 10-minute call to see if they fit?",
        duration: "15 seconds"
      },
      dm: {
        message: "Hi {{Name}}! Love the drone footage of your new listing. We run targeted campaigns that generate 25+ local seller leads per month. Open to seeing a quick breakdown of the strategy?"
      }
    }
  },
  {
    slug: "healthcare",
    name: "Healthcare & Wellness",
    emoji: "🏥",
    description: "Private practices, clinics, dental offices, therapists, and fitness studios.",
    examples: {
      email: {
        subject: "Patient drop-offs on {{Company}}'s booking page?",
        body: "Hi {{Name}},\n\nMany healthcare practices lose up to 25% of potential appointments due to multi-step booking forms.\n\nWe build HIPAA-compliant, single-click SMS booking assistants that plug directly into your current EHR system, cutting booking friction to zero.\n\nWould you be open to a quick text demonstration?"
      },
      call: {
        script: "Hello {{Name}}, I'm calling because we help dental practices fill empty calendar slots using automated patient recalls. We typically fill 4-5 slots a week. Do you have a minute to see if this fits your clinic?",
        duration: "19 seconds"
      },
      dm: {
        message: "Hi {{Name}}! Love your clinic's patient reviews. We build custom text booking systems that increase bookings by 20% without adding receptionist load. Mind if I send a quick preview?"
      }
    }
  },
  {
    slug: "retail",
    name: "Retail & E-commerce",
    emoji: "🛍️",
    description: "Physical retail shops, boutiques, direct-to-consumer brands, and Shopify stores.",
    examples: {
      email: {
        subject: "Recovering {{Company}}'s lost cart revenue?",
        body: "Hi {{Name}},\n\nMost Shopify stores lose 70% of potential sales at checkout. Standard email flows only recover about 5% of that.\n\nWe set up interactive SMS abandoned cart flows that recover up to 18% of abandoned carts in 30 days on a performance-only basis.\n\nCan I send a quick breakdown of the numbers we did for a similar brand?"
      },
      call: {
        script: "Hey {{Name}}, quick question. We help e-commerce brands add 15% to their bottom line using automated post-purchase upsells. No change to ad spend needed. Do you have 30 seconds to hear how?",
        duration: "15 seconds"
      },
      dm: {
        message: "Hey {{Name}}, love the branding on your new collection! We help Shopify brands increase repeat purchases by 22% using custom loyalty WhatsApp campaigns. Open to a quick chat?"
      }
    }
  },
  {
    slug: "hospitality",
    name: "Hospitality & Leisure",
    emoji: "🏨",
    description: "Hotels, resorts, restaurants, event venues, and travel agencies.",
    examples: {
      email: {
        subject: "Direct bookings vs OTA fees for {{Company}}?",
        body: "Hi {{Name}},\n\nPaying 15-20% commission to Booking.com and Expedia is eating your hospitality margins.\n\nWe build custom direct-booking engines powered by WhatsApp that turn social media visitors into confirmed reservations at a 0% commission rate.\n\nCan I show you how we saved a boutique hotel $4.2K in OTA fees last month?"
      },
      call: {
        script: "Hello {{Name}}, we help boutique hotels increase direct bookings by 30% using automated email retargeting. No OTA commissions involved. Do you have a minute to see if we can do the same for you?",
        duration: "17 seconds"
      },
      dm: {
        message: "Hi {{Name}}, your venue looks incredible! We build automated WhatsApp booking assistants that increase direct guest bookings by 25%. Would love to show you a quick demo."
      }
    }
  },
  {
    slug: "consulting",
    name: "Consulting & Professional Services",
    emoji: "💼",
    description: "Agencies, consultants, accountants, legal firms, and recruiters.",
    examples: {
      email: {
        subject: "Automating lead qualifying for {{Company}}?",
        body: "Hi {{Name}},\n\nI noticed you qualify consulting applicants manually, which typically takes 15-20 minutes of review per candidate.\n\nWe build interactive VSL (Video Sales Letter) funnels that auto-qualify clients based on budget and goals, filtering out 90% of bad-fit leads before they even book a call.\n\nWould you like to see a flow chart of this exact system?"
      },
      call: {
        script: "Hi {{Name}}, we help agency owners automate their prospect qualification so you only take calls with buyers who have a budget. Do you have 30 seconds to hear how we filter leads?",
        duration: "16 seconds"
      },
      dm: {
        message: "Hi {{Name}}! Love your insights on B2B marketing. We build interactive funnels that pre-qualify consulting leads so you save 10 hours a week on discovery calls. Open to a quick look?"
      }
    }
  }
];

export const RATE_LIMIT_FREE_MAX = 3;

export const QEVN_URL = "https://qevn.in";
export const QEVN_CALENDLY = "https://cal.com/qevn"; // fallback booking calendar
