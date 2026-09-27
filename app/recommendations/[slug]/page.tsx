import { PageShell } from "@/components/page-shell";

type RecommendationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecommendationDetailPage({
  params,
}: RecommendationPageProps) {
  const { slug } = await params;

  return (
    <PageShell
      title={`Recommendation: ${slug}`}
      description="Editorial recommendation detail shell. Recommendation remains a separate domain concept from Product."
    />
  );
}
