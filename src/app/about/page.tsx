import Script from "next/script";

export default function Page() {
    return (
        <main className="w-screen min-h-screen flex justify-center py-24 sm:py-16">
            <div className="w-11/12 sm:w-8/12 md:w-[600px] h-full bg-white dark:bg-black dark:text-white">
                <h1 className="text-4xl md:text-5xl font-bold">About</h1>
                <div>

                    Get in, we're going back in time! <br /> <br />

                    <b>chronologize.it</b> is an interactive journey through history
                    that will keep you engaged. Whether you’re fascinated by the
                    evolution of art, the rise of industrialization, or anything in between,
                    <b> chronologize.it</b> brings the past to life. This interactive platform
                    lets you explore detailed timelines and immerse yourself in the events that
                    shaped our world. <br /> <br />

                    Born on <i>Vietnam's Independence Day</i> (September 2nd, 2024), this web
                    application was inspired by a simple idea: timelines. During my visits to
                    museums, I realized that timelines are a fascinating way to uncover the
                    layers of history and understand the world better. Timelines reveal
                    connections. Timelines answer. I created <b>chronologize.it </b>
                    to share this discovery with others, hoping it becomes a tool for
                    everyone to learn something new every day. <br /> <br />

                    <b className="text-lg">Acknowledgements</b>
                    <br />
                    I have a deep appreciation for <i>Wikipedia</i> and its incredible community.
                    Their commitment to making knowledge accessible is what makes projects
                    like this possible. A heartfelt thank you to everyone who contributes
                    to this invaluable resource. <br /> <br />

                    <b className="text-lg">Contacts</b>
                    <br />
                    Hello, I'm Phú—a software engineer who loves to build things. <b>chronologize.it</b> is one
                    of my creations, and I'm thrilled to share it with you. Thank you for using this platform;
                    I hope you enjoy it as much as I do!

                    You can contact me via<br /><br />
                    Email: phunguyen.finn@gmail.com<br />
                    Instagram: <a target="_blank" href="https://instagram.com/phu.builds" className="text-sky-500 hover:underline">@phu.builds</a>
                    <br /><br />

                    <b className="text-lg">Development</b>
                    <br />

                    Development
                    If you're interested in contributing to the development of this site,
                    I'd love to collaborate with you! Feel free to check out the repository <a target="_blank" href="https://github.com/phunguyen-finn/chronologize.it" className="text-sky-500 hover:underline">here</a>
                </div>
            </div>
        </main>
    )
}