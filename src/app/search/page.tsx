import OpenAIService from "@/services/openai.service";
import TimelineVisualizer from "./timeline";
import { redirect } from "next/navigation";

export async function generateMetadata(
    { searchParams }: any,
    parent: any
): Promise<any> {
    const parentMetadata: any = await parent;

    return {
        ...parentMetadata,
        title: searchParams.query
    }
}

export default async function SearchPage({ searchParams }: { searchParams: { query: string } }) {
    const { query } = searchParams;
    if (!query) redirect('/');

    const timeline = await OpenAIService.generate(query);

    return <TimelineVisualizer initTimeline={timeline} />;
}