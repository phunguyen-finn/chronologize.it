'use server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import OpenAIService, { Marker } from "./openai.service";
import { initializeApp as initializeAdminApp, deleteApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Timeline } from './openai.service';

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

export async function createTimeline(timeline: Timeline) {
    const serviceAccount = JSON.parse(
        process.env.GOOGLE_APPLICATION_CREDENTIALS as string
    );

    const AdminFirebase = initializeAdminApp({
        credential: cert(serviceAccount),
    }, "admin");

    timeline.markers.forEach(marker => {
        delete marker.details;
    });

    try {
        const db = getFirestore(AdminFirebase);
        const docRef = await db.collection('timeline').add(timeline);
        return docRef.id;
    } catch (error: any) {
        throw new Error(error);
    } finally {
        deleteApp(AdminFirebase);
    }
}

export async function updateTimeline(id: string, timeline: Timeline) {
    const serviceAccount = JSON.parse(
        process.env.GOOGLE_APPLICATION_CREDENTIALS as string
    );

    const AdminFirebase = initializeAdminApp({
        credential: cert(serviceAccount),
    }, "admin");

    try {
        const db = getFirestore(AdminFirebase);
        await db.collection('timeline').doc(id).set(timeline);
    } catch (error: any) {
        throw new Error(error);
    } finally {
        deleteApp(AdminFirebase);
    }
}