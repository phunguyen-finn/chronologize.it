import OpenAI from 'openai';
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { WikiService } from './wiki.service';

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
});

const RawMarker = z.object({
    time: z.string(),
    title: z.string(),
    preview: z.string(),
    details: z.string(),
});

const RawTimeline = z.object({
    title: z.string(),
    description: z.string(),
    markers: z.array(RawMarker),
    related_wikis_pages: z.array(z.string()),
});

const MatchedMedia = z.object({
    medias: z.array(z.array(z.string()))
});

export interface Media {
    title: string;
    url: string;
    width: number;
    height: number;
    pageTitle: string;
}

export interface Marker {
    time: string;
    title: string;
    preview: string;
    details: string;
    medias: Media[];
}

export interface Timeline {
    title: string;
    description: string;
    markers: Marker[];
}

export const OpenAIService = {
    generate: async (query: string) => {
        const genTimelinePrompt = `Generate a timeline of the history of the topic "${query}" including major events and dates.
For each event, provide a short preview of the event (one or two sentences), and a detailed description (one paragraph).
The last event should be the most recent event you can find.
Provide a list of at most 7 related Wikipedia pages for the topic, we'll fetch the images from there to show users.
Generate at most 15 events in the timeline.`;
        const genTimelineCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: genTimelinePrompt }],
            model: 'gpt-4o-mini-2024-07-18',
            response_format: zodResponseFormat(RawTimeline, "raw_timeline"),
        });

        const timeline = JSON.parse(genTimelineCompletion.choices[0].message.content as string);

        const relatedMediaFiles = await WikiService.gatherRelatedMediaFiles(timeline.related_wikis_pages);

        const getMatchedMediaFilesPrompt = `You have created a timeline of the history of the topic "${query}" including major events and dates. Below are the major events:
${timeline.markers.map((marker: Marker, index: number) => `EVENT #${index} - ${marker.time}: ${marker.title}\n`)}
For each event, returns a lists of the file names of the images that best represent the event.
An event may have multiple images that represent it, but choose AT MOST 5 images for each event.
If there is no image that represents an event, please return an empty array for that event.
You MUST returns an array of ${timeline.markers.length} arrays, since each event should have its own list of images.
Don't choose the same image twice.

The below is the list of the file name of the images we have found:
${JSON.stringify(relatedMediaFiles.map((media) => media.title))}

You MUST returns an array of length ${timeline.markers.length}, since each event should have its own list of images.`;

        const getMatchedMediaFilesCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: getMatchedMediaFilesPrompt }],
            model: 'gpt-4o-mini-2024-07-18',
            response_format: zodResponseFormat(MatchedMedia, "matched_media"),
        });

        const matchedMediaFiles = JSON.parse(getMatchedMediaFilesCompletion.choices[0].message.content as string).medias

        timeline.markers = timeline.markers.map((marker: Marker, index: number) => {
            const matchedMediaTitles = matchedMediaFiles[index] ?? [];
            const matchedMedias = relatedMediaFiles.filter((media) => matchedMediaTitles.includes(media.title));
            return {
                ...marker,
                medias: matchedMedias
            };
        });

        return timeline as Timeline;
    }
}

export default OpenAIService;