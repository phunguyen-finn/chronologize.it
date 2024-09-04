# chronologize.it

<p align="center">
<a href="https://www.npmjs.com/package/next"><img src="https://img.shields.io/badge/NextJS-15.0-black.svg" alt="Next.JS"></a>
<a href="https://www.npmjs.com/package/react"><img src="https://img.shields.io/badge/React-18.0-blue.svg" alt="React"></a>
<a href="https://nodejs.org/en"><img src="https://img.shields.io/badge/Node-20.17-green.svg" alt="Node 3.11.5"></a>
<a href="https://www.firebase.google.com/"><img src="https://img.shields.io/badge/firebase-latest-yellow.svg" alt="Firebase"></a>
<a href="https://www.npmjs.com/package/antd"><img src="https://img.shields.io/badge/antd-4.24-red.svg" alt="Ant design"></a>
<a href="https://vercel.com"><img src="https://img.shields.io/badge/vercel-white.svg" alt="Vercel"></a>
</p>

Get in, we're going back in time! 

<b>chronologize.it</b> is an interactive journey through history that will keep you engaged. Whether you’re fascinated by the evolution of art, the rise of industrialization, or anything in between, <b>chronologize.it</b> brings the past to life. This interactive platform lets you explore detailed timelines and immerse yourself in the events that shaped our world.

Born on September 2nd, Vietnam's Independence Day, this web application was inspired by a simple idea: timelines. During my visits to museums, I realized that timelines are a fascinating way to uncover the layers of history and understand the world better. Timelines reveal connections. Timelines answer. I created <b>chronologize.it</b> to share this discovery with others, hoping it becomes a tool for everyone to learn something new every day.

## Future development
- [ ] Export timeline
- [ ] Import timeline
- [ ] Create custom timeline
- [ ] Users
- [ ] Experiment with Gemini

## Repository

This repo holds the source code for chronologize.it's application, written using [NextJs framework](https://www.npmjs.com/package/next).

Latest revision: Sep 4th, 2024.

Please contact [Phu Nguyen](https://fb.com/nnphongphu) for further inquiry.

## Infrastructure
All infrastructures for hosting this web application are provided by the following cloud providers:
1. Hosting: [Vercel](https://vercel.com)
2. Database: [Firestore](https://firebase.google.com)
3. LLM: [OpenAI](https://openai.com)
4. Search engine: [Wikipedia](https://wikipedia.com)

For involved parties & maintainers, please contact me to get console access to these services.

## Development
1. First, install the dependencies:

```bash
npm install
```

2. Configure environment variables:

Create an `.env` file in the root folder, and copy the content of `.env.sample` into that file. You can create your own Firebase project and Resend accounts to get your own key. If if you need access to production server, contact me.

3. Run the server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
