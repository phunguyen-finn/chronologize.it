import OpenAIService from "@/services/openai.service";
import TimelineVisualizer from "./timeline";

export default async function SearchPage({ searchParams }: { searchParams: { query: string } }) {
    const { query } = searchParams;
    const timeline = await OpenAIService.generate(query);
    // const timeline = {
    //     title: 'Timeline of Apple Inc.',
    //     description: 'A comprehensive timeline highlighting significant events in the history of Apple Inc., from its founding to its impact on technology.',
    //     markers: [
    //         {
    //             time: '1976-04-01',
    //             title: 'Founding of Apple Computer, Inc.',
    //             preview: 'Apple was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne.',
    //             details: 'On April 1, 1976, Apple was officially established in Cupertino, California, by Steve Jobs, Steve Wozniak, and Ronald Wayne. The trio aimed to develop and sell personal computers, which were becoming increasingly popular. Their first product was the Apple I, a bare circuit board that required users to add their own keyboard and monitor, marking the introduction of personal computing to a broader audience.\n' +
    //                 '\n' +
    //                 "The founding of Apple was a significant milestone in technology, as it laid the groundwork for the personal computer revolution that would follow. Their collaborative efforts combined Wozniak's technical skill with Jobs' vision and marketing savvy, which would become a defining characteristic of Apple's future successes.",
    //             thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Apple_Computer_Logo_rainbow.svg/512px-Apple_Computer_Logo_rainbow.svg.png',
    //             width: 512,
    //             height: 596
    //         },
    //         {
    //             time: '1984-01-24',
    //             title: 'Launch of the Macintosh',
    //             preview: 'Apple introduced the first Macintosh computer, pioneering graphical user interface.',
    //             details: 'On January 24, 1984, Apple launched the Macintosh, a groundbreaking personal computer that featured a graphical user interface (GUI) and a mouse. This launch was famously promoted with a television commercial directed by Ridley Scott during Super Bowl XVIII, portraying the Macintosh as a revolutionary product that would challenge the status quo represented by IBM. The Macintosh set a new standard for user-friendly computing and was the first mass-market personal computer to use a GUI.\n' +
    //                 '\n' +
    //                 'Despite its innovative features, the Macintosh struggled initially due to its high price point and limited software availability. However, it laid the foundation for future development in personal computing and brought design aesthetic and usability to the forefront of the industry. The Macintosh’s legacy continues today, influencing the design philosophy of modern Apple products.',
    //             thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Steve_Jobs_and_Macintosh_computer%2C_January_1984%2C_by_Bernard_Gotfryd_-_edited_2.jpg/407px-Steve_Jobs_and_Macintosh_computer%2C_January_1984%2C_by_Bernard_Gotfryd_-_edited_2.jpg',
    //             width: 407,
    //             height: 599
    //         },
    //         {
    //             time: '1997-07-09',
    //             title: 'Steve Jobs Returns to Apple',
    //             preview: 'Steve Jobs returned to Apple and became the de facto leader, steering it towards innovation.',
    //             details: 'After being ousted from Apple in 1985, Steve Jobs returned to the company in 1997 when Apple acquired NeXT, the computer platform development company he founded. His return marked a turning point for Apple, which was struggling financially and creatively at the time. Jobs brought a renewed focus on design, innovation, and product development that would eventually reshape Apple into a technology powerhouse.\n' +
    //                 '\n' +
    //                 'Under Jobs’ leadership, Apple shifted its strategy and began to introduce a series of groundbreaking products including the iMac, which was launched in 1998. Jobs fostered a corporate culture of creativity and risk-taking, revitalizing the product line and leading to the eventual launch of the iPod, iPhone, and iPad, changing the landscape of the technology industry forever.',
    //             thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Steve_Jobs_Headshot_2010-CROP.jpg/612px-Steve_Jobs_Headshot_2010-CROP.jpg',
    //             width: 612,
    //             height: 600
    //         },
    //         {
    //             time: '2001-10-23',
    //             title: 'Launch of iPod',
    //             preview: 'Apple introduces the iPod, transforming how users listen to music.',
    //             details: 'On October 23, 2001, Apple launched the first-generation iPod, a portable media player that revolutionized the music industry. The iPod allowed users to carry thousands of songs in their pockets, featuring a simple user interface and a sleek, minimalist design. Initially, the iPod was incompatible with Windows computers, but the introduction of iTunes for Windows in 2003 expanded its user base significantly.\n' +
    //                 '\n' +
    //                 'The iPod quickly became a cultural phenomenon, influencing the way music was consumed and paving the way for digital downloads. Apple’s strategy of integrating hardware with software, particularly through the iTunes Store, established a new model for digital music sales, contributing immensely to Apple’s growth and altering the music industry landscape.',
    //             thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/IPod_1G.jpg',
    //             width: 187,
    //             height: 296
    //         },
    //         {
    //             time: '2010-06-07',
    //             title: 'Launch of the iPhone 4',
    //             preview: 'Apple unveiled the iPhone 4, featuring significant technological advancements.',
    //             details: "On June 7, 2010, Apple introduced the iPhone 4, heralded as the most advanced smartphone of its time. It featured a sleek new design, a Retina Display for enhanced visuals, and front-facing cameras that enabled video calling via FaceTime. The iPhone 4 also introduced iOS 4, which included multitasking capabilities, further solidifying Apple's position in the smartphone market.\n" +
    //                 '\n' +
    //                 "The iPhone 4 received widespread acclaim and significantly boosted Apple's market presence, leading to increased competition in the smartphone sector. Its introduction set a high standard for mobile devices, eventually leading to further innovations within Apple's smartphone line and establishing a loyal consumer base that continues to support the brand today.",
    //             thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/IPhone_First_Generation.jpg',
    //             width: 765,
    //             height: 575
    //         }
    //     ],
    //     related_wikis_pages: [
    //         'Apple Inc.',
    //         'History of Apple Inc.',
    //         'Apple II',
    //         'iPod',
    //         'iPhone'
    //     ]
    // }
    console.log(timeline);
    return <TimelineVisualizer timeline={timeline} />;
}