export const WikiService = {
    gatherRelatedMediaFiles: async (pages: string[]) => {
        const relatedPages = await Promise.all(pages.map(async (page) => {
            const response = await fetch(`https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=${page}&limit=1`);
            const media = await response.json();
            if (!media['pages'] || media['pages'].length == 0) {
                return null;
            }
            return media['pages'][0];
        }));

        const mediaFiles = await Promise.all(relatedPages.map(async (page) => {
            if (!page) {
                return [];
            }
            const response = await fetch(`https://api.wikimedia.org/core/v1/wikipedia/en/page/${page['key']}/links/media`);
            const media = await response.json();
            if (!media['files']) {
                return [];
            }
            return media['files'].map((file: any) => {
                return {
                    'title': file['title'],
                    'url': "https://" + file['preferred']['url'].substring(2),
                    'width': file['preferred']['width'],
                    'height': file['preferred']['height'],
                    'pageTitle': page['title'],
                };
            });
        }));
        const flattenedMediaFiles = mediaFiles.flat();

        const titlesSet = new Set(); // temp variable to keep track of accepted ids
        const uniqueMedias = flattenedMediaFiles.filter(({ title }) => !titlesSet.has(title) && titlesSet.add(title));
        return uniqueMedias;
    }
}