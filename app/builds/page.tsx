import type { Metadata } from "next";
import { DocumentSections } from "@/components/layout/document-sections";
import { PageIntro } from "@/components/layout/page-intro";
import { buildBlocks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Builds",
  description: "Projects and experiments from AWS Student Builders Group.",
};

export default function BuildsPage() {
  return (
    <article>
      <PageIntro
        eyebrow="// BUILDS"
        title={
          <>
            PROJECTS
            <br />
            LAND HERE.
          </>
        }
        lede="This is the shelf for work members actually ship. It is empty until real projects are added."
      />
      <DocumentSections blocks={buildBlocks} />
    </article>
  );
}
