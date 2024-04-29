# Start using Fresh with Basehub

What is https://basehub.com?...

BaseHub.com is an AI-native headless CMS designed for fast, collaborative content management. It leverages artificial intelligence to streamline content creation and delivery, offering a user-friendly interface and efficient workflows. BaseHub supports GraphQL for content delivery and provides a type-safe SDK for seamless integration into web applications, making it a modern solution for content teams.

### Usage

Make sure to install __"basehub"__ and __"basehub/react"__ in your deno.json

```
"basehub": "npm:basehub@4.0.13",
"basehub/react": "https://esm.sh/v133/basehub/react?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat",

```

### Install the .basehub folder

Depending on the version you are on you can create the folder by following this guideline - https://basehub.com/docs/api-reference/basehub-sdk#choosing-another-output-directory-with-output or by running - 

```
npx basehub --output .basehub --ts-only

```
in the root of your project.. 
If any issues shows up you can manually just copy and paste the [.basehub folder](.basehub) and you will be good to go...

### Create an .env file

```
BASEHUB_TOKEN="add your basehub_token here"

# optional

BASEHUB_DRAFT=<true|false> # defaults to false
BASEHUB_REF=<branch-name|commit-id> # defaults to your default branch

```

### Basehub/react is a work in process

"At this moment in time __basehub/react__ only works in __local__ development - it will not work in production when you push your code to for example https://deno.com/deploy". (I am working on a solution for it.)

![alt text](<static/basehub-react error.png>)

ATM you need to manually add the basehub/react code - "check inside the [.basehub/react](.basehub/react) folder". The code will render the Richtext which in this example is used in the [islands/Blog/Post](islands/Blog/Post.tsx). 

Normally we would just use __import { RichText } from "basehub/react";__ , but for now we will use __import { RichText } from "@/.basehub/react/index.ts";__

### ⚠️ Important: Make sure you run the generator before your app's build step. 

A pattern you could use is to run it in your deno.json like so - 
```
  "deno": { "build": { "preExec": ["basehub --output .basehub"] } },

```
So, whenever you run the build process for this Deno project, it executes basehub --output .basehub before starting the build. This might be used to generate some necessary files or perform pre-processing tasks required for the build.

### Fetching data from Basehub

All the data you have created inside your basehub dashboard will be fetched and shown here [routes/index.tsx](routes/index.tsx) & [routes/[slug]/index.tsx](routes/[slug]/index.tsx) 

Make sure that the block your have created in your dashboard is the same as __const { blog } = await basehub__ . and __blog.posts.items;__ So If you have named your block __Blog__ that needs to be used all the way through, otherwise it will NOT fetch the data. 

![alt text](<static/Block in basehub is blog.png>)

### More advanced usage

If you are thinking about more advanced usage with for example syntax highlighting you can install

```
  "@shikijs/transformers" : "https://esm.sh/v133/@shikijs/transformers@latest?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat",
  "shiki" : "https://esm.sh/v133/shiki@latest?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat",

```

and use it like [islands/Blog/Code-Block.tsx](islands/Blog/Code-Block.tsx). (this is just an example on how to set it up)

## Final thing for you guys

Inside the [utils](utils) i have created an [utils/queries.ts](utils/queries.ts). This code is a module that defines GraphQL queries and related types for interacting with in this case a blog API.


### More will be added down the line

This repo is a work in progress, so please feel free to contribute.




