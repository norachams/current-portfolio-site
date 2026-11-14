export type Pastel = "mint" | "celadon" | "gold" | "sky" | "lilac" | "peach" | "blush";

export type Project = {
  slug: string;
  name: string;
  meta: string;
  note: string;
  pastel: Pastel;
  url?: string;
  /** Internal case study page. Takes priority over `url` for the card link. */
  caseStudy?: string;
  /** Portrait phone clip: cropped to the phone, and two in a row share one grid slot. */
  phone?: boolean;
  /** Looping clip or screenshot for the card. Falls back to a labelled pastel block. */
  media?:
    | { type: "image"; src: string; alt?: string }
    /** `inset` shrinks a full-bleed screen recording inside the card so the pastel shows around it. */
    | { type: "video"; src: string; inset?: boolean };
};

// Brackets mark content that still needs filling in (see the handoff's open items).
export const projects: Project[] = [
  {
    slug: "Caramel",
    name: "Caramel",
    meta: "project",
    note: "A career coach that learns from your application pipeline and the job market and turns them into a few clear next steps each week.",
    pastel: "peach",
    url: "https://www.oncaramel.com/",
    caseStudy: "/work/caramel",
    media: { type: "video", src: "/projects/caramel-promo.mp4" },
  },
  {
    slug: "Voz",
    name: "Voz",
    meta: "side project",
    note: "An AI voice assistant that lets you have real-time conversations, follow along with live captions and revisit past chats.",
    url: "https://github.com/norachams/Voz",
    pastel: "lilac",
    media: { type: "video", src: "/projects/voz.mp4" },
  },
  {
    slug: "Marketmap",
    name: "Marketmap",
    meta: "internship",
    note: "An AI-powered market intelligence platform I designed and built from scratch at VeriFast, combining data on 100K+ properties from 7+ sources to help sales & GTM teams discover new prospects and opportunities.",
    pastel: "sky",
    media: { type: "video", src: "/projects/marketmap.mp4", inset: true },
  },
  {
    slug: "Caramel Landing Page",
    name: "Caramel Landing Page",
    meta: "side Project",
    note: "Designed and built the landing page for Caramel, a job hunt organizer that brings applications, interview prep, and job-search tools into one place.",
    pastel: "mint",
    url: "https://www.oncaramel.com/",
    media: { type: "video", src: "/projects/landing page.mp4" },
  },
  {
    slug: "Levanta",
    name: "Levanta",
    meta: "side project",
    note: "AI-powered accountability tool that sends daily LeetCode challenges via SMS. Uses Cohere, Twilio, Supabase, and SpaCy for NLP.",
    pastel: "blush",
    url: "https://github.com/norachams/Levanta",
    media: { type: "video", src: "/projects/Levanta.mp4" },
  },
  {
    slug: "Bookworms",
    name: "Bookworms",
    meta: "class project",
    note: "A social book discovery app designed for my HCI course at the University of Waterloo, where users get personalized recommendations based on their reading preferences and discover what others are reading.",
    phone: true,
    pastel: "lilac",
    media: { type: "video", src: "/projects/bookworms.mp4" },
  },
  {
    slug: "SwapOut",
    name: "SwapOut",
    meta: "class project",
    note: "Tinder for thrifting! A clothing swap app built with Kotlin for my Application Development course at the University of Waterloo, where users swipe through clothes nearby, save favourites and chat to arrange trades.",
    phone: true,
    pastel: "gold",
    media: { type: "video", src: "/projects/swapout.mp4" },
  },
  {
    slug: "Textbox",
    name: "Textbox",
    meta: "side project",
    note: "An interactive canvas that lets you create, move, resize, and rotate text boxes, with customizable fonts and colours.",
    pastel: "peach",
    url: "https://github.com/norachams/Textbox",
    media: { type: "video", src: "/projects/textbox.mp4" },
  },
  {
    slug: "Medibook",
    name: "Medibook",
    meta: "side project",
    note: "A full-stack medical appointment platform where patients can book and manage appointments, while physicians can handle booking requests, access patient information, and track visit history.",
    pastel: "sky",
    url: "https://github.com/norachams/Medibook",
    media: { type: "video", src: "/projects/Medibook.mp4" }, 
  },
  {
    slug: "TestFarm",
    name: "TestFarm",
    meta: "internship",
    note: "An automated device testing platform built during my internship at Ingenico, allowing engineers to reserve payment terminals, monitor their status, and run tests remotely in parallel through a real-time dashboard. Built with Python, Flask, Appium, React and JavaScript.",
    pastel: "mint",
    media: { type: "video", src: "/projects/testfarm.mp4" },
  },
  {
    slug: "DormDirect",
    name: "DormDirect",
    meta: "class project",
    note: "A student housing platform that makes finding rentals between co-op and school terms easier by web scraping listings from Kijiji and bringing them together in one place for students in Waterloo. Built with React, Flask, BeautifulSoup, and Firebase.",
    pastel: "gold",
    url: "https://github.com/norachams/DormDirect",
    media: { type: "video", src: "/projects/dormdirect.mp4" },
  },
];
