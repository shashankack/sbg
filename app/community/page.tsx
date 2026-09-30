import type { Metadata } from "next";
import { DocumentSections } from "@/components/layout/document-sections";
import { PageIntro } from "@/components/layout/page-intro";
import { communityBlocks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community",
  description: "How to gather, talk, and take part in AWS Student Builders Group.",
};

export default function CommunityPage() {
  return (
    <article>
      <PageIntro
        eyebrow="// COMMUNITY"
        title={
          <>
            THE ROOM
            <br />
            AROUND THE WORK.
          </>
        }
        lede="Gatherings, channels, and the way people join will be documented here. Those details have not been published yet."
      />
      <DocumentSections blocks={communityBlocks} />
    </article>
  );
}
