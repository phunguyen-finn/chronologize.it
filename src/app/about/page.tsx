import Image from "next/image";

export default function Page() {
    return (
        <main className="max-w-screen min-h-screen flex justify-center py-24 sm:py-16 overflow-hidden relative">
            <div className="w-11/12 sm:w-8/12 md:w-[600px] h-full bg-white dark:bg-black dark:text-white flex flex-col">
                <h1 className="text-4xl md:text-5xl font-bold">About</h1>
                <div>

                    Get in, we&quot;re going back in time! <br /> <br />

                    <b>chronologize.it</b> is an interactive journey through history
                    that will keep you engaged. Whether you’re fascinated by the
                    evolution of art, the rise of industrialization, or anything in between,
                    <b> chronologize.it</b> brings the past to life. This interactive platform
                    lets you explore detailed timelines and immerse yourself in the events that
                    shaped our world. <br /> <br />

                    Born on <i>Vietnam&quot;s Independence Day</i> (September 2nd, 2024), this web
                    application was inspired by a simple idea: timelines. During my visits to
                    museums for the holiday, I realized that timelines are a fascinating way to uncover the
                    layers of history and understand the world better. Timelines reveal
                    connections. Timelines answer. Thus, I created <b>chronologize.it </b>
                    to share this discovery with others, hoping it becomes a tool for
                    everyone to learn something new every day. <br /> <br />

                    <b className="text-lg">Acknowledgements</b>
                    <br />
                    I have a deep appreciation for <i>Wikipedia</i> and its incredible community.
                    Their commitment to making knowledge accessible is what makes projects
                    like this possible. A heartfelt thank you to everyone who contributes
                    to this invaluable resource. <br /> <br />

                    <b className="text-lg">Limitation</b>
                    <br />
                    Since this project is non-profit and relies on the <i>Wikipedia API</i> and low-budget LLM
                    models, there are limitations to the number of requests and the quality of the data.
                    If you encounter any errors or missing information, please be patient. <br /><br />

                    <b className="text-lg">Contacts</b>
                    <br />
                    Hello, I&quot;m Phú—a software engineer who loves to build things. <b>chronologize.it</b> is one
                    of my creations, and I&quot;m thrilled to share it with you. Thank you for using this platform;
                    I hope you enjoy it as much as I do!

                    You can contact me via:<br /><br />
                    Email: phunguyen.finn@gmail.com<br />
                    Instagram: <a target="_blank" href="https://instagram.com/phu.builds" className="text-sky-500 hover:underline">@phu.builds</a>
                    <br /><br />

                    <b className="text-lg">BuyMeACoffee</b>
                    <br />
                    If you find this project helpful, consider buying me a coffee to support its development. Your
                    contribution will help keep the project running and encourage me to add more features. You
                    can click <a target="_blank" href="buymeacoffee.com/phunguyen.finn" className="text-sky-500 hover:underline">here</a> or
                    scan the QR below:
                    <br /><br />
                    <div className="w-full flex justify-center dark:invert">
                        <Image src="/buymeacoffee.jpg" width={150} height={150} alt="BuyMeACoffee" className="self-center" />
                    </div>
                    <br />
                    <b className="text-lg">Development</b>
                    <br />

                    If you&quot;re interested in contributing to the development of this site, requesting a feature,
                    reporting a bug, following development progress, or just want to say hi, feel free to check out the
                    repository <a target="_blank" href="https://github.com/phunguyen-finn/chronologize.it" className="text-sky-500 hover:underline">here.</a>

                    <br /><br />
                    <b className="text-lg">Privacy</b>
                    <br />
                    When you visit the website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.
                    <br /><br />
                    We may also collect data about the device you’re using to access our website. This data may include the device type, operating system, unique device identifiers, device settings, and geo-location data. What we collect can depend on the individual settings of your device and software. We recommend checking the policies of your device manufacturer or software provider to learn what information they make available to us.
                </div>
            </div>
        </main>
    )
}