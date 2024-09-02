import OpenAI from 'openai';
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { WikiService } from './wiki.service';
import { time } from 'console';

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
    medias: z.array(z.string())
});


export interface Marker {
    time: string;
    title: string;
    preview: string;
    details: string;
    thumbnailUrl?: string;
    width?: number;
    height?: number;
}

export interface Timeline {
    title: string;
    description: string;
    markers: Marker[];
}

export const OpenAIService = {
    generate: async (query: string) => {
        const genTimelinePrompt = `Generate a timeline of the history of the topic "${query}" including major events and dates.
For each event, provide a short preview of the event (one or two sentences), and a detailed description (two paragraphs).
The last event should be the most recent event you can find.
Provide a list of at most 15 related Wikipedia pages for the topic, we'll fetch the images from there to show users.
Generate around 15 events in the timeline.
`;
        const genTimelineCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: genTimelinePrompt }],
            model: 'gpt-4o-mini-2024-07-18',
            response_format: zodResponseFormat(RawTimeline, "raw_timeline"),
        });

        const timeline = JSON.parse(genTimelineCompletion.choices[0].message.content as string);

        const relatedMediaFiles = await WikiService.gatherRelatedMediaFiles(timeline.related_wikis_pages);

        const getMatchedMediaFilesPrompt = `You have created a timeline of the history of the topic "${query}" including major events and dates. Below are the major events:
${timeline.markers.map((marker: Marker, index: number) => `EVENT #${index} - ${marker.time}: ${marker.title}\n`)}
We have also crawled a list of possibly related images from Wikipedia. The below is the list of the file name of the images we have found:
${JSON.stringify(relatedMediaFiles.map((media) => media.title))}
For each event, please provide the file name of the image that best represents the event. If there is no image suitable for that event, please return empty string "".
Return a list of the selected file names in the same order as the events.`;

        const getMatchedMediaFilesCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: getMatchedMediaFilesPrompt }],
            model: 'gpt-4o-mini-2024-07-18',
            response_format: zodResponseFormat(MatchedMedia, "matched_media"),
        });


        console.log(getMatchedMediaFilesCompletion.choices[0].message.content);
        const matchedMediaFiles = JSON.parse(getMatchedMediaFilesCompletion.choices[0].message.content as string).medias;

        timeline.markers = timeline.markers.map((marker: Marker, index: number) => {
            const matchedMediaTitle = matchedMediaFiles[index];
            const thumbnailUrl = matchedMediaTitle === "" ? undefined : relatedMediaFiles.find((media) => media.title === matchedMediaTitle);
            return {
                ...marker,
                thumbnailUrl: thumbnailUrl ? thumbnailUrl.url : undefined,
                width: thumbnailUrl ? thumbnailUrl.width : undefined,
                height: thumbnailUrl ? thumbnailUrl.height : undefined,
            };
        });

        return timeline as Timeline;
    }
}

export default OpenAIService;