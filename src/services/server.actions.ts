'use server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import OpenAIService, { Marker } from "./openai.service";

export async function generateDetails(title: string, marker: Marker) {
    const stream = createStreamableValue('');

    const getDetailsPrompt = `A user is interested in learning more about the topic "${title}".
Specifically, they are interested in the event "${marker.title}" (${marker.time}).
Provide tell them more about this event in one paragraph (maximum of 3 sentences).`;

    (async () => {
        const { textStream } = await streamText({
            model: openai('gpt-4o-mini-2024-07-18'),
            prompt: getDetailsPrompt,
        });

        for await (const delta of textStream) {
            stream.update(delta);
        }

        stream.done();
    })();

    return { output: stream.value };
}


export async function loadMore(title: string, startMarker: Marker, endMarker: Marker) {
    return OpenAIService.loadMore(title, startMarker, endMarker);
}