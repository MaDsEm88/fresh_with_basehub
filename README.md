# Start using Fresh with Basehub

What is https://basehub.com?...

BaseHub.com is an AI-native headless CMS designed for fast, collaborative content management. It leverages artificial intelligence to streamline content creation and delivery, offering a user-friendly interface and efficient workflows. BaseHub supports GraphQL for content delivery and provides a type-safe SDK for seamless integration into web applications, making it a modern solution for content teams.

### Usage

Make sure to install __"basehub"__ and __"basehub/react"_ in your deno.json

```
"basehub": "npm:basehub@4.0.13",
"basehub/react": "https://esm.sh/v133/basehub/react?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat",

```

### Create an .env file and add

```
BASEHUB_TOKEN="add your basehub_token here"

# optional
4
5BASEHUB_DRAFT=<true|false> # defaults to false
6BASEHUB_REF=<branch-name|commit-id> # defaults to your default branch

```

### Basehub/react is a work in process

"At this moment in time __basehub/react__ only works in __local__ development - it will not work in production when you push your code to for example https://deno.com/deploy". (I am working on a solution for it.)

![alt text](<basehub-react error.png>)

ATM you need to manually add the basehub/react code - "check inside the [text](.basehub/react) folder". The code will render the Richtext which in this example is used in the [text](islands/Blog/Post.tsx). 

Normally we would just use __import { RichText } from "basehub/react";__ , but for now we will use __import { RichText } from "@/.basehub/react/index.ts";__

### ⚠️ Important: Make sure you run the generator before your app's build step. 

A pattern you could use is to run it in your deno.json like so - 
```
  "deno": { "build": { "preExec": ["basehub --output .basehub"] } },

```
So, whenever you run the build process for this Deno project, it executes basehub --output .basehub before starting the build. This might be used to generate some necessary files or perform pre-processing tasks required for the build.

### Fetching data from Basehub

All the data you have created inside your basehub dashboard will be fetched and shown here [text](routes/index.tsx) & [text](routes/[slug]/index.tsx) 

Make sure that the block your have created in your dashboard is the same as __const { blog } = await basehub__ . So If you have named your block __Blog__ that needs to be used all the way through, otherwise it will NOT fetch the data. 

![alt text](<Block in basehub is blog.png>)

### More advanced usage

If you are thinking about more advanced usage with for example code blocks you can install 

```
  "@shikijs/transformers" : "https://esm.sh/v133/@shikijs/transformers@latest?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat",
    "shiki" : "https://esm.sh/v133/shiki@latest?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat",

```

which basehub is using.




