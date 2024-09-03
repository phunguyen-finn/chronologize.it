import FirebaseService from "@/services/firebase.service";
import { redirect } from "next/navigation";
import TimelineVisualizer from "./timeline";

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const timeline = await FirebaseService.getTimeline(id);

    if (!timeline)
        redirect('/');


    return <TimelineVisualizer initTimeline={timeline} />
}