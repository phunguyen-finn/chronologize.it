# chronologize.it

<p align="center">
<a href="https://www.npmjs.com/package/next"><img src="https://img.shields.io/badge/NextJS-15.0-black.svg" alt="Next.JS"></a>
<a href="https://www.npmjs.com/package/react"><img src="https://img.shields.io/badge/React-18.0-blue.svg" alt="React"></a>
<a href="https://nodejs.org/en"><img src="https://img.shields.io/badge/Node-20.17-green.svg" alt="Node 3.11.5"></a>
<a href="https://www.firebase.google.com/"><img src="https://img.shields.io/badge/firebase-latest-yellow.svg" alt="Firebase"></a>
<a href="https://www.npmjs.com/package/antd"><img src="https://img.shields.io/badge/antd-4.24-red.svg" alt="Ant design"></a>
<a href="https://vercel.com"><img src="https://img.shields.io/badge/vercel-white.svg" alt="Vercel"></a>
</p>


This repo holds the source code for chronologize.it's application, written using [NextJs framework](https://www.npmjs.com/package/next).

Latest revision: Sep 4th, 2024.

Please contact [Phu Nguyen](https://fb.com/nnphongphu) for further inquiry.

## Infrastructure
All infrastructures for hosting this web application are provided by the following cloud providers:
1. Hosting: [Vercel](https://vercel.com)
2. Database: [Firestore](https://firebase.google.com)

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.