import OpenAIService from "@/services/openai.service";
import TimelineVisualizer from "./timeline";
import { redirect } from "next/navigation";

export function generateMetadata({ searchParams }: any) {
    return {
        title: searchParams.query
    };
}

export default async function SearchPage({ searchParams }: { searchParams: { query: string } }) {
    const { query } = searchParams;
    if (!query) redirect('/');

    const timeline = await OpenAIService.generate(query);
    return <TimelineVisualizer initTimeline={timeline} />;
}