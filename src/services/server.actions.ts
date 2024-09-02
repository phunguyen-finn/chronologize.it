'use server';

import OpenAIService, { Marker } from "./openai.service";

export async function loadMore(title: string, startMarker: Marker, endMarker: Marker) {
    return OpenAIService.loadMore(title, startMarker, endMarker);
}