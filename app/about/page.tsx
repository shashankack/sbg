import type { Metadata } from "next";
import { DocumentSections } from "@/components/layout/document-sections";
import { PageIntro } from "@/components/layout/page-intro";
import { aboutBlocks } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, founder, team, philosophy, and community of AWS Student Builders Group.",
};

export default function AboutPage() {
  return (
    <article>
      <PageIntro
        eyebrow="// ABOUT AWS SBG"
        title={
          <>
            WE&apos;RE HERE
            <br />
            TO BUILD.
          </>
        }
        lede="The longer account of AWS Student Builders Group lives here. The sections below are in place so the story, the people, and the way the group works can be added without rebuilding the page."
      />
      <DocumentSections blocks={aboutBlocks} />
    </article>
  );
}
