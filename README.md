This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## ROADMAP
Talk with youtube ai
**Features**

1. you can ask any thing about youtube video and you will get information of that question with the timestamps. How will we get the exact timestamp for this.
Considering both case, where we will have captions/subtitles and the cases where we will not have them
2. You can also generate timestamps for the video, if it's not there.
3. Providing summarization of the video.
4. Supports different languages for questions and answers, including automatic translation of video content.
5. Users can enter keywords, and the AI will return timestamps where those words are spoken or related content appears. How will we get the exact timestamps for this.
6. Interactive Comments - Ask anything from YouTube comments

Also, write the detailed lld for the complete webapp of all features, I am using nextjs for frontend and backend  with app router, shadcn and tailwind css.

Suggest free ai apis to do this.
Is it possible to do it with google gemini free api? Can you suggest only free apis to convert this if possible?
Also, how will we fetch the audio of the youtube video.
Also suggest a good free vector db to do this.
