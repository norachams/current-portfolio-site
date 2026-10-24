export type Pastel = "mint" | "celadon" | "gold" | "sky" | "lilac" | "peach" | "blush";

export type Project = {
  slug: string;
  name: string;
  meta: string;
  note: string;
  pastel: Pastel;
  url?: string;
  /** Looping clip or screenshot for the card. Falls back to a labelled pastel block. */
  media?: { type: "image" | "video"; src: string; alt?: string };
};

// Brackets mark content that still needs filling in (see the handoff's open items).
export const projects: Project[] = [
  {
    slug: "Caramel",
    name: "Caramel",
    meta: "founder",
    note: "An all-in-one job hunt organizer that brings applications, opportunities, and interview prep together while automating the busywork in between.",
    pastel: "peach",
    url: "https://www.oncaramel.com/",
    media: { type: "video", src: "/projects/caramel-promo.mp4" },
  },
  {
    slug: "Voz",
    name: "Voz",
    meta: "side project",
    note: "An AI voice assistant that lets you have real-time conversations, follow along with live captions, and revisit past chats.",
    url: "https://github.com/norachams/Voz",
    pastel: "lilac",
    media: { type: "video", src: "/projects/voz.mp4" },
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
    slug: "Textbox",
    name: "Textbox",
    meta: "side project",
    note: "An interactive canvas that lets you create, move, resize, and rotate text boxes, with customizable fonts and colours.",
    pastel: "gold",
    url: "https://github.com/norachams/Textbox",
    media: { type: "video", src: "/projects/textbox.mp4" },
  },
  {
    slug: "Bookworms",
    name: "Bookworms",
    meta: "class project",
    note: "A social book discovery app designed for my HCI course at the University of Waterloo, where users get personalized recommendations based on their reading preferences and discover what others are reading.",
    pastel: "lilac",
    media: { type: "video", src: "/projects/bookworms.mp4" },
  },
  {
    slug: "SwapOut",
    name: "SwapOut",
    meta: "class project",
    note: "Tinder for thrifting! A clothing swap app built with Kotlin for my Application Development course at the University of Waterloo, where users swipe through clothes nearby, save favourites and chat to arrange trades.",
    pastel: "peach",
    media: { type: "video", src: "/projects/swapout.mp4" },
  },
  {
    slug: "TestFarm",
    name: "TestFarm",
    meta: "internship",
    note: "An automated device testing platform built during my internship at Ingenico, allowing engineers to reserve payment terminals, monitor their status, and run tests remotely in parallel through a real-time dashboard. Built with Python, Flask, Appium, React and JavaScript.",
    pastel: "sky",
    media: { type: "video", src: "/projects/testfarm.mp4" },
  },
  {
    slug: "DormDirect",
    name: "DormDirect",
    meta: "class project",
    note: "A student housing platform that makes finding rentals between co-op and school terms easier by web scraping listings from Kijiji and bringing them together in one place for students in Waterloo. Built with React, Flask, BeautifulSoup, and Firebase.",
    pastel: "mint",
    url: "https://github.com/norachams/DormDirect",
    media: { type: "video", src: "/projects/dormdirect.mp4" },
  },
];
