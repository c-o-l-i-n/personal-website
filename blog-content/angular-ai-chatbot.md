---
title: How to Create Modern AI Chatbot Experiences in Angular
publishedDate: 2024-03-08
updatedDate: 2026-10-24
thumbnail: /images/ng-ai-cover.webp
published: true
---

> **TL;DR:** Using LLM APIs, Signals, and some RxJS magic, we can create modern AI chatbot experiences in our Angular apps!

> **Update (October 2026):** I rewrote this article to match the current demo repo. It now uses Angular 22, Hono, the `@google/genai` SDK, Tailwind 4, and Markdown rendering.

## What this article covers

- How to create a simple generative AI backend using [Node.js](https://nodejs.org/), [Hono](https://hono.dev/), and the [Google Gemini API](https://ai.google.dev/)
- How to create a modern AI chatbot experience in [Angular](https://angular.dev/)
- [Repository for this project](https://github.com/c-o-l-i-n/ng-generative-ai-demo)

## Prefer video? Check out this talk from ng-conf!

{youtube-embed}[tlWlFpEmTeE]

The talk covers the original 2024 version of the demo, so the code on screen is older than the code in this article.

## What do users expect from AI chatbots?

[Large Language Models](https://en.wikipedia.org/wiki/Large_language_model) are changing the way we interact with technology. As AI chatbots become more common, users start to expect certain things from AI chatbot experiences.

So what do users expect from AI chatbots?

Let's look at the most popular one, [ChatGPT](https://chatgpt.com/). The user types a message and hits enter. Then they watch the AI write its response in real time, with a little indicator to show that the AI is working.

![ChatGPT Demo](/images/gifs/chat-gpt.gif)

## Demo

Here's what we'll build. The user types a message. A pulsing dot appears while the AI thinks. Then the response streams in, rendered as Markdown.

![Angular Generative AI Demo](/images/gifs/ng-ai.gif)

_This GIF shows the original 2024 version, which had a plainer UI and a blinking cursor instead of a pulsing dot. The streaming works the same way today._

## Prerequisites

I'll assume that you have [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/) installed, and that you know how to use the command line. Angular 22 needs Node.js `^22.22.3`, `^24.15.0`, or `>=26.0.0`.

## Setup

Rather than typing the whole app from scratch, clone the demo repo and follow along:

```sh
$ git clone https://github.com/c-o-l-i-n/ng-generative-ai-demo.git
$ cd ng-generative-ai-demo
$ git checkout a38d62f
$ npm install
```

Every snippet in this article comes from commit `a38d62f`. The `git checkout` gets you that exact code, even if `main` has moved on by the time you read this.

Create a new file called `.env` at the root of the project. Generate an API key from the [Google AI Studio](https://aistudio.google.com/app/apikey), and paste it into the `.env` file:

```sh
# .env

GOOGLE_AI_STUDIO_API_KEY=paste-api-key-here
```

## Backend

For real-world purposes, you would likely use your own custom-trained LLM that fits your app. For simplicity, we'll use Google's Gemini API, which has a free tier, so long as you're willing to sell your soul and your data to Google.

The backend lives in `src/server.ts`. The `server` script in `package.json` runs it with [`tsx`](https://tsx.is/), which runs TypeScript files directly. `tsx watch` restarts the server every time you save a change.

```jsonc
// {code-link}[package.json](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/package.json#L4-L11)

"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "server": "tsx watch ./src/server.ts",
  "format": "prettier --write ."
},
```

First, we do some basic setup for the Hono server and the AI chat session:

```ts
// {code-link}[src/server.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/server.ts#L1-L53)

import { GoogleGenAI } from '@google/genai';
import { serve } from '@hono/node-server';
import dotenv from 'dotenv';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { stream } from 'hono/streaming';

dotenv.config();

const { GOOGLE_AI_STUDIO_API_KEY } = process.env;

if (!GOOGLE_AI_STUDIO_API_KEY) {
  throw new Error('Provide GOOGLE_AI_STUDIO_API_KEY in a .env file');
}

const ai = new GoogleGenAI({ apiKey: GOOGLE_AI_STUDIO_API_KEY });
const chat = ai.chats.create({ model: 'gemini-3.1-flash-lite' });

const app = new Hono();

app.use(cors());

// ...

const port = 3000;
serve({ fetch: app.fetch, port }, () => {
  console.log('Server is running on port', port);
});
```

Here's what each part does:

- `dotenv.config()` loads the API key from the `.env` file into `process.env`.
- `ai.chats.create()` starts a chat session with the `gemini-3.1-flash-lite` model. The session remembers every message in the conversation, so the AI has context for follow-up questions.
- `cors()` lets the Angular dev server on port 4200 call our backend on port 3000. By default, it allows requests from any origin.
- A Hono app exposes a standard `fetch` handler. `serve()` from `@hono/node-server` plugs that handler into a Node.js server on port 3000.

There's only one chat session, and it lives in server memory. So everyone who uses your server shares the same conversation, and a restart wipes it. That's fine for a demo. Please don't ship it.

Next, we create a `/message` POST endpoint. When the endpoint receives a prompt, it sends the prompt to the Gemini API. As the AI generates content, we write each chunk of text to the response. The `stream()` helper from `hono/streaming` closes the response when our callback finishes.

```ts
// {code-link}[src/server.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/server.ts#L23-L48)

app.post('/message', async (c) => {
  const prompt = await c.req.text();

  console.log('Received prompt:', prompt);

  if (!prompt) {
    return c.body(null, 400);
  }

  return stream(c, async (s) => {
    try {
      console.log('Generating response:');
      const response = await chat.sendMessageStream({
        message: prompt,
      });

      for await (const chunk of response) {
        const chunkText = chunk.text;
        console.log(chunkText);
        await s.write(chunkText ?? '');
      }
    } catch (err) {
      console.error('Error generating response:', err);
    }
  });
});
```

The SDK types `chunk.text` as `string | undefined`, so we write an empty string when a chunk has no text.

## App config

Now, onto the frontend. The 2024 version of this article started with `provideHttpClient(withFetch())` in the app config. Angular 22 needs neither one:

- `HttpClient` is `providedIn: 'root'`, so `inject(HttpClient)` works without `provideHttpClient()`.
- In Angular 22, the default `HttpBackend` is `FetchBackend`, which uses the [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) behind the scenes. `withFetch()` selects that same backend, so it's redundant.

That leaves one provider. `provideMarkdown()` from [ngx-markdown](https://github.com/jfcere/ngx-markdown) lets us render the AI's responses as Markdown.

```ts
// {code-link}[src/app/app.config.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/app/app.config.ts#L1-L9)

import { ApplicationConfig } from '@angular/core';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    // add markdown support to handle llm output
    provideMarkdown(),
  ],
};
```

Something else is missing here, and that's a good thing. Angular 21 and later are [zoneless by default](https://angular.dev/guide/zoneless), so the app doesn't load zone.js at all. Instead, Angular runs change detection when something notifies it, like an update to a signal that a template reads. Our `MessageService` updates a signal for every chunk of text, so every chunk tells Angular to update the view.

## UI

The actual UI code for our app is pretty simple. The component reads two signals from `MessageService` and passes form submissions along to it:

```ts
// {code-link}[src/app/app.component.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/app/app.component.ts#L1-L111)

import { Component, inject } from '@angular/core';
import { MessageService } from './message.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-root',
  imports: [FormsModule, MarkdownComponent],
  template: `
    // ...
  `,
  host: {
    class: 'flex h-screen flex-col overflow-hidden',
  },
})
export class AppComponent {
  private readonly messageService = inject(MessageService);

  readonly messages = this.messageService.messages;
  readonly generatingInProgress = this.messageService.generatingInProgress;

  sendMessage(form: NgForm, messageText: string): void {
    this.messageService.sendMessage(messageText);
    form.resetForm();
  }
}
```

The template has a `@for` loop that shows the list of messages. User messages get a blue chat bubble. AI messages get one of two treatments, which we'll cover in the next two sections.

```html
<!-- {code-link}[src/app/app.component.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/app/app.component.ts#L32-L52) -->

<!-- Message List -->
@for (message of messages(); track message.id) {
  @if (message.fromUser) {
    <div class="flex flex-row-reverse">
      <pre
        class="max-w-[80%] rounded-2xl rounded-br-sm bg-blue-600 px-4 py-2 font-sans leading-relaxed whitespace-pre-wrap text-white"
        >{{ message.text }}</pre>
    </div>
  } @else {
    @if (message.generating && !message.text) {
      <div class="px-1 py-2">
        <div class="size-4 animate-pulse rounded-full bg-white"></div>
      </div>
    } @else {
      <markdown
        [data]="message.text"
        class="prose prose-invert w-full max-w-none px-1 py-2 leading-relaxed text-slate-200"
      />
    }
  }
}
```

Below the messages, a `<form>` lets the user send a message. The input stays enabled while the AI responds, so you can type your next message while the AI is still rambling. The send button stays disabled until the response finishes.

```html
<!-- {code-link}[src/app/app.component.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/app/app.component.ts#L57-L95) -->

<form
  #form="ngForm"
  (ngSubmit)="sendMessage(form, form.value.message)"
  class="shrink-0 border-t border-slate-800 bg-slate-900 p-3"
>
  <div class="mx-auto flex max-w-2xl gap-2">
    <input
      name="message"
      placeholder="Ask anything"
      ngModel
      required
      autofocus
      class="flex-1 rounded-full border border-slate-600 bg-slate-800 px-4 py-2 text-slate-100 placeholder-slate-500 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900"
    />
    <!-- Submit Button: disabled while a response is streaming -->
    <button
      type="submit"
      [disabled]="generatingInProgress() || form.invalid"
      class="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white transition-colors enabled:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <!-- ... -->
    </button>
  </div>
</form>
```

## Pulsing dot

The 2024 version used a blinking cursor at the end of the message. This version shows a pulsing dot while we wait for the first chunk of text.

Look at the `@if (message.generating && !message.text)` branch in the message list. While the AI message is still generating and has no text yet, we render a small white circle with Tailwind's `animate-pulse` class. As soon as the first chunk arrives, `message.text` isn't empty anymore, and the template swaps the dot for the rendered response.

The app uses [Tailwind 4](https://tailwindcss.com/). Angular's build loads Tailwind as a PostCSS plugin from `.postcssrc.json`, and the global stylesheet imports Tailwind and its typography plugin:

```css
/* {code-link}[src/styles.css](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/styles.css#L1-L8) */

@import 'tailwindcss';
@plugin '@tailwindcss/typography';

@layer base {
  body {
    @apply bg-gray-900 font-sans text-gray-100;
  }
}
```

## Markdown rendering

LLMs love Markdown. They'll give you headings, bullet lists, bold text, and code blocks whether you ask for them or not. If we showed that raw, the user would see a bunch of asterisks and pound signs.

So the template passes the AI's text to the `<markdown>` component from ngx-markdown, which turns it into HTML. The `prose prose-invert` classes from `@tailwindcss/typography` style that HTML for a dark background. Because we pass the whole text so far on every chunk, the Markdown renders as it streams in.

## MessageService

Now, onto the data side of things. Our custom `MessageService` manages state and streams results from the AI.

To do all this, we use a combination of both [Signals](https://angular.dev/guide/signals) and [RxJS](https://rxjs.dev/) `Observable` streams.

Signals are great for state management, but RxJS is perfect for asynchronous events like our AI chat response.

## The message interface

Before we jump into the implementation, let's look at the `Message` interface. It contains all the data we need to represent a message in our app:

```ts
// {code-link}[src/app/message.service.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/app/message.service.ts#L11-L16)

export interface Message {
  id: string;
  text: string;
  fromUser: boolean;
  generating?: boolean;
}
```

## State management with signals

The service uses the `@Service()` decorator, which is new in Angular 22. It marks the class as a service and provides it in the root injector automatically, like `@Injectable({ providedIn: 'root' })` does. If you don't want it provided automatically, pass `@Service({ autoProvided: false })` and add it to a `providers` array yourself. One catch is that a `@Service()` class can't use constructor injection. The compiler rejects it with the `SERVICE_CONSTRUCTOR_DI` error, so use `inject()` instead, like we do for `HttpClient`.

We use 2 private writable signals to keep track of our state:

- The list of _completed_ messages (`completeMessages`)
- The AI message that's streaming in right now, or `null` if there isn't one (`incomingMessage`)

Everything the UI needs comes from those 2 signals through `computed`:

- `messages` is the completed messages, plus the incoming message if there is one
- `generatingInProgress` is `true` whenever there's an incoming message

A computed signal is read-only, so random consumers can't set it. And because we derive both values instead of storing them, they can never get out of sync with each other.

```ts
// {code-link}[src/app/message.service.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/app/message.service.ts#L18-L34)

@Service()
export class MessageService {
  private readonly http = inject(HttpClient);

  private readonly completeMessages = signal<Message[]>([]);
  private readonly incomingMessage = signal<Message | null>(null);

  readonly messages = computed(() => {
    const incomingMessage = this.incomingMessage();
    return incomingMessage
      ? [...this.completeMessages(), incomingMessage]
      : this.completeMessages();
  });

  readonly generatingInProgress = computed(
    () => this.incomingMessage() !== null,
  );
```

## Sending a message

When a user sends a message, the first thing we do is add a new message object based on the user's prompt to `completeMessages`.

We use the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) to generate random [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)s for our message IDs.

Next, we `subscribe` to a stream of the LLM's response.

```ts
// {code-link}[src/app/message.service.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/app/message.service.ts#L36-L58)

sendMessage(prompt: string): void {
  this.completeMessages.update((msgs) => [
    ...msgs,
    { id: window.crypto.randomUUID(), text: prompt, fromUser: true },
  ]);

  this.getChatResponseStream(prompt).subscribe({
    // ...
  });
}
```

## Real-time response streaming with RxJS

First, we use the Angular `HttpClient` to send a POST request containing our prompt. Since our backend streams small chunks of data over time, we tell the `HttpClient` to `observe: 'events'` and `reportProgress`. We also need `responseType: 'text'`, because Angular only fills in the partial text of a progress event for text responses. The repo still uses `reportProgress`, which Angular 22 deprecates. In new code, use `reportDownloadProgress: true` instead.

```ts
// {code-link}[src/app/message.service.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/app/message.service.ts#L60-L97)

private getChatResponseStream(prompt: string): Observable<Message> {
  const id = window.crypto.randomUUID();

  return this.http
    .post('http://localhost:3000/message', prompt, {
      responseType: 'text',
      observe: 'events',
      reportProgress: true,
    })
    .pipe(
      // ...
    );
}
```

The `HttpClient` sends us all sorts of events, but we can use the RxJS `filter` operator to only get the events we want:

```ts
// {code-link}[src/app/message.service.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/app/message.service.ts#L70-L74)

filter(
  (event: HttpEvent<string>): boolean =>
    event.type === HttpEventType.DownloadProgress ||
    event.type === HttpEventType.Response,
),
```

When we receive an event, we transform it into a `Message` object using the RxJS `map` operator:

```ts
// {code-link}[src/app/message.service.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/app/message.service.ts#L75-L89)

map((event: HttpEvent<string>): Message =>
  event.type === HttpEventType.DownloadProgress
    ? {
        id,
        text: (event as HttpDownloadProgressEvent).partialText!,
        fromUser: false,
        generating: true,
      }
    : {
        id,
        text: (event as HttpResponse<string>).body!,
        fromUser: false,
        generating: false,
      },
),
```

If the event type is `DownloadProgress`, the AI is still working, so we grab the `partialText` and set `generating` to `true`. For a text response, `partialText` holds all the text received so far, not only the latest chunk. So each new message replaces the previous one.

If the event type is `Response`, the AI is done, so we grab the full response `body` and set `generating` to `false`.

The last thing we need is the `startWith` operator, which sets an empty message as the initial value for our stream. That empty message makes the template show the pulsing dot while we wait for the text to roll in:

```ts
// {code-link}[src/app/message.service.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/app/message.service.ts#L90-L95)

startWith<Message>({
  id,
  text: '',
  fromUser: false,
  generating: true,
}),
```

## Setting the state

Finally, we update our state based on our stream.

On each stream update, we set `incomingMessage` to the latest message. The `messages` computed signal picks it up from there.

Once the stream completes, we add the finished message to `completeMessages` and set `incomingMessage` back to `null`. That also flips `generatingInProgress` to `false`, since it's computed from `incomingMessage`.

If our stream errors out, we still set `incomingMessage` to `null`, so the send button doesn't stay disabled forever.

A failed Gemini call won't reach that `error` handler, though. The server catches the error and closes the stream, so the client gets an empty `200` response. If your API key is wrong, you'll see an empty AI message, and the real error shows up in the backend terminal.

```ts
// {code-link}[src/app/message.service.ts](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/src/app/message.service.ts#L42-L57)

this.getChatResponseStream(prompt).subscribe({
  next: (message) => this.incomingMessage.set(message),

  complete: () => {
    const completedMessage = this.incomingMessage();
    if (completedMessage) {
      this.completeMessages.update((messages) => [
        ...messages,
        { ...completedMessage, generating: false },
      ]);
    }
    this.incomingMessage.set(null);
  },

  error: () => this.incomingMessage.set(null),
});
```

## Run the app

To run both the frontend and backend, you'll need 2 active terminal windows.

In the first terminal, run the following command to start the backend server:

```sh
$ npm run server
```

In another terminal, run the following command to start the Angular dev server:

```sh
$ npm start
```

If you use VS Code, you can skip both terminals. The repo's default build task starts both servers. Select **Terminal > Run Build Task**.

```jsonc
// {code-link}[.vscode/tasks.json](https://github.com/c-o-l-i-n/ng-generative-ai-demo/blob/a38d62f9f455074c3f2277e4ea7690a60b1acf81/.vscode/tasks.json#L20-L28)

{
  "label": "Start Frontend and Backend Servers",
  "dependsOn": ["Backend Server", "Frontend Server"],
  "group": {
    "kind": "build",
    "isDefault": true
  },
  "problemMatcher": []
}
```

Once both servers are running, navigate to `http://localhost:4200` in your browser to view the app and chat with the AI.

## Review

And that's it! We now have a functional, clean AI chatbot experience in our Angular app!

Here are the key takeaways:

- Stream the AI's response from the backend with Hono's `stream()` helper
- In Angular 22, `HttpClient` needs no providers and uses `fetch` by default
- Have the `HttpClient` use `responseType: 'text'`, `observe: 'events'`, and `reportProgress: true`
- The repo uses `reportProgress`, which Angular 22 deprecates, so use `reportDownloadProgress: true` in new code
- Show a pulsing dot until the first chunk arrives, then render the response as Markdown
- Manage state with 2 writable signals, and derive everything else with `computed`
- React to real-time updates from the LLM with RxJS

## GitHub repo

If you want to continue your learning journey, you can find all of the code from this article and more on my [GitHub](https://github.com/c-o-l-i-n/ng-generative-ai-demo).

If you have any questions about this article or any other Angular topics, feel free to [contact me](/contact)!

Happy coding!
