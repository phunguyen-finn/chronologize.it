import FirebaseService from "@/services/firebase.service";
import { redirect } from "next/navigation";
import TimelineVisualizer from "./timeline";

export async function generateMetadata(
    { params }: any
): Promise<any> {
    const timeline = await FirebaseService.getTimeline(params.id)

    if (!timeline) {
        return {
            title: '404',
        }
    }

    let firstImageUrl = "";
    for (const marker of timeline.markers) {
        if (marker.medias.length > 0) {
            firstImageUrl = marker.medias[0].url;
            break;
        }
    }

    return {
        title: timeline!.title,
        description: timeline!.description,
        robots: 'index, follow',
        openGraph: {
            title: timeline!.title,
            description: timeline!.description,
            images: [firstImageUrl],
            type: 'website',
        },
    }
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const timeline = await FirebaseService.getTimeline(id);

    if (!timeline)
        redirect('/');


    return <TimelineVisualizer initTimeline={timeline} />
}