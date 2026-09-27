import { PageShell } from "@/components/page-shell";

type RecommendationPageProps = {
  params: { slug: string };
};

export default function RecommendationDetailPage({ params }: RecommendationPageProps) {
  const { slug } = params;

  return (
    <PageShell
      title={`Recommendation: ${slug}`}
      description="Editorial recommendation detail shell. Recommendation remains a separate domain concept from Product."
    />
  );
}
