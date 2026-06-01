# TUTORIAL SCRIPT

## Claude in Action

### Six Use Cases — A Tour of How AI Actually Works

A practical, hands-on session for working professionals who want to know what AI actually does — not what it promises. Each use case demonstrates a more sophisticated underlying capability than the one before it.

**Presenter:** Leslie Teo  |  Print this and follow it

> **Where this fits.** This run sheet scripts **Part one** of *Claude in Action* — the six general use cases. **Part two**, the investment desk (six portfolio-manager workflows), lives on the companion site at `/desk` as an advanced, self-guided track. It is not scripted here.

---

## The Arc

This tutorial tells one story in six acts. Each act demonstrates a more sophisticated AI capability than the one before. The audience walks in thinking Claude is a chatbot. They leave knowing it's a colleague they can shape themselves.

You don't have to name the concepts out loud — they're for you, the presenter, so you know exactly what you're showing. But naming them lightly ("this is a thing called *tool use*…") gives the tutorial a teaching shape that audiences love.

| Act | Audience reaction | Underlying AI concept |
|---|---|---|
| **1 — The Email You've Been Avoiding** | "It actually understood what was happening in that thread." | **Reasoning over context** — the model thinks before it answers |
| **2 — The Briefing You Didn't Have Time to Write** | "It's doing real research and saving me a Word doc." | **Tool use** — the model extends itself by calling the web and writing files |
| **3 — The Pattern You Couldn't See** | "It just found something in my own notes that I missed." | **Long-context reasoning** — the model holds many documents in mind at once |
| **4 — The Time Audit Nobody Else Can Do** | "It's talking to all my tools at once." | **Connected data (MCP)** — the model reads securely across your stack |
| **5 — The Colleague That Doesn't Sleep** | "Wait — there are *five of them* working at once?" | **Asynchronous, persistent, parallel execution** — the model runs over time on its own, and fans out into sub-agents that work simultaneously |
| **6 — The Agent You Designed** | "Wait, I just built my own AI." | **Composable agents** — you wire Claude into a custom colleague that runs your specific workflow |

The deep research thread runs in the background throughout and pays off in the close.

---

## Before You Start (Setup Checklist)

**Apps and tabs:**

- Claude.ai open in a browser tab, logged in, fresh conversation
- Claude.ai **second tab** for the long-running deep research task (you'll kick this off at the start and return to it near the end)
- Claude Desktop app open, connected to a working folder
- Cowork mode open with MCP connections live (Google Drive, Slack, calendar, Notion — whatever you have connected)
- Cowork open on your phone (you'll pull it out during Act 5)
- A printed copy of this run sheet in front of you
- Projector showing your screen. Bump the font size in Claude to at least 16px so the back row can read it

**Content you need to pre-stage:**

- **For the opening (deep research thread):** Pick a topic with real strategic weight for *your* audience — e.g., "how Fortune 500 CEOs are actually deploying agentic AI in 2026, where it's working, where it's failing, with primary sources." Have the prompt ready to paste so the kickoff takes 15 seconds, not 90.
- **For Act 1:** A real-but-sanitized email thread you can paste in. 600–1,000 words. Multiple stakeholders. Vague asks. Have it copied to your clipboard or saved as a .txt you can paste from. **Plus** a screenshot of a real-but-imperfect slide — a busy deck page, a chart with weak design, or a board-meeting page with too many words. This is the multimodal moment.
- **For Act 2:** A specific public figure or company exec the audience will recognize. Pick someone who's been in the news recently — it makes the live research more impressive.
- **For Act 3:** A folder with 5–10 notes files (markdown or .txt). Sanitize. The more "real" they look, the better the wow lands. If you don't have a real one, build it from a few weeks of fake-but-plausible 1:1 notes and meeting recaps.
- **For Act 4:** Two connected tools at minimum (Calendar + Slack ideal; Drive is the third). Make sure recent activity exists in each.
- **For Act 5:** Your phone, charged, on the same Claude account, with Cowork ready. **Plus** a list of five real competitors, peers, or comparable orgs the audience would care about — for the parallel-subagents move.

**Pre-load tip:** Run through each use case once before the session so Claude has warmed up and your prompts are timed. You don't want the first question of the day to be the one the audience sees.

**The one piece of stagecraft to remember:** kick off the deep research task at the very start. If you forget, the closing reveal doesn't land.

---

## Opening


### What you say:

"I'm not going to give you a presentation about AI. No slides. I'm going to show you six things I actually use Claude for in my work. They get progressively wilder as we go. By the end, you'll have a clear picture of whether this is useful for you — and exactly how to start."

"One thing before we begin. Most of you have probably tried ChatGPT or something similar. You asked it a question, got an okay answer, and thought: that's neat, but I'm not sure what to do with it. That's where I was a year ago. What changed my mind wasn't better answers. It was discovering that AI can actually do work — not just talk about it. Let me show you what I mean."

### The one stagecraft move — kick off the long-running task:

"Before I show you anything else, I'm going to start a piece of work that's going to run in the background this whole time. I'm not going to look at it. I'm not going to manage it. We'll come back to it at the very end. Watch."

> **ON SCREEN**
> Switch to your second Claude.ai tab. Click the **deep research** toggle. Paste the pre-staged prompt. Hit enter.
>
> Type: *"Research how Fortune 500 CEOs are actually deploying agentic AI in 2026 — not what they're announcing, what they're doing. Pull from news, earnings calls, and primary reporting in the last 90 days. I want a 20–25 page briefing: an executive summary up top, three to five strategic implications, named companies doing it well and badly with cited evidence, and the two non-obvious risks most boards are still missing. Take your time. Cite everything."*

"That'll keep running in the background. I'm closing the tab. I won't peek. We'll come back to it at the end and see what it produced — without me touching it once."

*(Switch back to your first Claude.ai tab. The audience now has a Chekhov's gun. They will remember.)*

> **ON SCREEN**
> Claude.ai (first tab) is open in browser. Cursor is in the chat box. Audience can see the blank conversation.

---

## Use Case 1: The Email You've Been Avoiding

**The point:** Claude isn't a search engine. It reads context, infers intent, and drafts a reply you'd actually send. Personal productivity, immediate.

**AI concept on display: *Reasoning over context.*** The base capability — the model brings inference and judgment to text it's never seen before. Everything else stacks on top of this.


### What you say:

"Let's start with something everyone in this room has on their plate right now. An email thread you've been avoiding. Five people on it. Half of them want different things. You've opened it three times this week and closed it again. Sound familiar?"

*(Wait for nods. They will nod.)*

> **ON SCREEN**
> Open Claude.ai. Paste in a real, messy email thread (use a sanitized one you've prepped in advance — 600–1000 words, multiple stakeholders, vague asks).
>
> Type: *"This thread has been sitting in my inbox for three days. Tell me: what is each person actually asking for, who's blocking who, what decision is mine to make, and draft a 4-line reply that moves this forward without committing me to anything I shouldn't commit to."*

### While Claude responds:

"Notice what I just did. I didn't ask for a summary — anyone can summarize. I asked Claude to do the thing I find genuinely hard: figure out what people *actually* want, separate the asks from the noise, and draft something I can send. That's not a search engine. That's the conversation I'd want with a smart friend before I hit reply."

### When the response appears:

"Look at this. It pulled apart who wants what. It flagged the one decision that's actually mine. And the draft reply — I might tweak two words, but it's 90% there. That email that was eating my Tuesday? Done in 20 seconds."

### Second example — Claude can see things, not just read them:

"One more. Different shape. Watch what happens when I stop typing and start showing."

> **ON SCREEN**
> Drag a screenshot of a real-but-imperfect slide directly into the chat — a busy deck page, a chart with weak labels, a board page that's trying to say five things at once.
>
> Type: *"This is a slide I'm about to take into a board meeting. The audience is a CFO and three non-executive directors. Tell me — honestly — what's wrong with it, where they'll push back, what I'm hiding by accident, and how I'd cut it down to one number and one sentence. Be direct. I don't want polite."*

"Two things I want you to notice. One — Claude is *looking* at the slide. Not reading words about a slide. Actually parsing the layout, the chart, the labels. Two — the response isn't 'great slide!' It's pointing at the thing the CFO will spot in 4 seconds. That's the part I'd pay for."

> **AHA MOMENT**
> Claude doesn't give you information. It gives you judgment. The quality of the answer depends on the quality of the question — just like asking a smart colleague.

### TRANSITION — SAY THIS:

"Okay, that was a warm-up. Claude read something and helped me think. Now let me show you what happens when Claude has to go *find* the information itself."

---

## Use Case 2: The Briefing You Didn't Have Time to Write

**The point:** Claude does live research across the open web *and* produces a real deliverable on your computer. This is where "chatbot" starts to feel wrong.

**AI concept on display: *Tool use.*** The model isn't just generating text — it's calling tools (web search, file system) to fetch fresh information and produce structured artifacts. The model extends itself.


### What you say:

"Next week I've got a meeting with someone I don't know well. Maybe it's a new client. Maybe it's a senior leader at a company you're trying to partner with. You'd love to walk in informed. Normally that's a half-morning of Googling, opening tabs, and still feeling underprepared. Watch this."

> **ON SCREEN**
> Type into Claude.ai: *"I'm meeting [name of a real public figure or company exec — pick someone the audience knows] next week. Research them and give me: their professional background, what they've publicly said or written in the last 6 months, the strategic priorities of their org right now, two non-obvious connections we might have in common, and 3 conversation starters that would signal I've actually done my homework. Cite your sources."*

### While Claude responds:

"Pay attention to two things. One, it's actually researching — not just remembering. You'll see it pulling from real, current sources. Two — and this is the move — I asked for *non-obvious* connections and *non-generic* conversation starters. Most AI gives you the LinkedIn version. I want the dinner-party version."

### When the response appears:

"Scroll through this. Background. Recent thinking. Strategic context. The conversation starters at the bottom — those aren't 'tell me about your role.' Those are real openers. And every claim has a source link, so I can verify before I walk in."

### Now show the upgrade:

"But here's where it gets interesting. I don't want this in a chat window. I want it as a one-pager I can print, throw in my bag, and read in the cab."

> **ON SCREEN**
> Switch to Claude Desktop app. Start a new conversation. Type: *"Take the research from my last conversation and turn it into a one-page Word document I can print. Clean formatting, max two pages, the conversation starters in a callout box at the bottom. Save it to my folder."*

"This is the Claude Desktop app. Same brain, but now it can read files on my computer and write new ones. It's not telling me how to make a Word doc. It's making the Word doc."

"Let me open it."

> **ON SCREEN**
> Open the .docx file. Show the formatted document. *(If you want extra wow — point out a callout box, a clean header, anything that signals this isn't ChatGPT-paste-into-Word.)*

> **AHA MOMENT**
> Claude went from answering a question to producing a deliverable. That's the jump from chatbot to assistant. It's not telling you things — it's doing the work.

### PAUSE FOR QUESTIONS

"Before I move on — any questions so far? Anything you'd want to try?"

*(Take 2–3 questions. Common ones: "How accurate is it?" "Does it make things up?" Handle these honestly — see cheat sheet at end.)*

### TRANSITION — SAY THIS:

"So far, Claude read something I gave it, then went and researched something for me. Useful. But in both cases, I was working with one input at a time. Now I want to show you what happens when you give Claude a *pile* of stuff and ask it to find what you couldn't find yourself."

---

## Use Case 3: The Pattern You Couldn't See

**The point:** Claude reasons across many documents at once and surfaces patterns no human would catch reading them one by one. This is where "agentic" shows up — without you saying the word.

**AI concept on display: *Long-context reasoning.*** The model holds many documents in mind simultaneously and finds patterns across them. This is the cognitive scale-up — beyond what any human can mentally hold while reading sequentially.


### Setup — what you say:

"Here's a problem nobody's solved well until now. You take notes. You go to meetings. You write things down — 1:1s, customer calls, project retros, your own journal. Six weeks later, that information is dead. It's sitting in folders nobody reads. The signal is in there. You just can't see it."

"Let me show you what changes."

### The walkthrough:

> **ON SCREEN**
> In Claude Desktop, point Claude at a folder of real notes. (Pre-stage this: a folder with 5–10 markdown or text files — meeting notes, 1:1 notes, retro docs. Sanitize beforehand.)
>
> Type: *"Read every file in this folder. These are my notes from the last 6 weeks. Tell me three things: (1) the top 3 themes that keep coming up that I might be missing, (2) any contradictions — places where I wrote one thing in week 1 and the opposite in week 5, and (3) the single most important question I should be asking myself based on what's in here. Then make me a one-page summary I can sit with for 10 minutes on Sunday night."*

### While Claude works:

"What's happening right now is the thing I find genuinely impressive. Claude is opening every file. Reading them. Holding all of them in mind at once. Then looking for patterns — the kind of patterns I can't see because I wrote each note three weeks apart and forgot the previous one by the time I wrote the next."

"This is the part where 'agentic' starts to mean something. I didn't tell Claude to read file 1, then file 2, then file 3. I described the outcome — find the patterns. It figured out the route."

### When the output appears:

"Look at this. Three themes. The contradiction it caught — that one alone is usually worth the meeting. And the question at the bottom. That's not a generic question. That's a question that came from *my* notes, about *my* situation."

### The kicker:

"And watch this."

> **ON SCREEN**
> Type: *"Now turn this into a 5-slide deck I could share with my manager or my team to start a real conversation. Save the deck and the one-pager to the same folder."*

"One sentence. Two deliverables. Claude takes the summary it just wrote, structures a deck around it, saves both files. That's not answering a question. That's doing a job an analyst would charge me for."

> **AHA MOMENT**
> The shift from "assistant" to "colleague." You didn't manage the steps. You described the outcome. Claude did the thinking in between. That's what agentic means in practice — and what makes it different from anything you've used before.

### TRANSITION — SAY THIS:

"Now. Everything I've shown you so far, Claude was working with stuff I handed it directly. A pasted email. A research prompt. A folder I pointed at. But what if Claude could reach into the tools I already use, every day, without me staging anything? That's the next level."

---

## Use Case 4: The Time Audit Nobody Else Can Do

**The point:** Claude pulls from multiple tools at once and synthesizes across them. This is the thing only MCP can do — and the moment you realize Claude isn't a chatbot, it's a layer on top of your work.

**AI concept on display: *Connected data via MCP.*** The model reads across your real systems — calendar, Slack, Drive — through a permission-based protocol. Tool use scales up from the open web to your private stack, and synthesis happens across silos.


### What you say:

"So here's where things change. This is Cowork mode — think of it as Claude with its hands untied. It's not just reading what I paste. It's connected to the tools I actually use every day."

> **ON SCREEN**
> Show the Cowork interface. Briefly point out the connected tools — e.g., Google Drive, Slack, calendar, Notion.

### The one nobody else can do:

"I want to show you something that's not possible without this. Every knowledge worker I know has the same nagging question. *Where did my week actually go?* Your calendar tells you what you *planned* to do. Your inbox tells you what landed on your plate. Your Drive tells you what you actually produced. They're three different stories, in three different apps, and nobody ever puts them together."

"Watch."

> **ON SCREEN**
> Type into Cowork: *"Cross-reference my last two weeks across three sources. From my calendar: where did I actually spend my time? From my Slack DMs: who did I have the most back-and-forth with, and what were the recurring themes? From my Drive activity: what did I actually create or meaningfully edit? Then tell me the gap — where my time went vs. what I produced — and the one thing I should drop next week."*

### While Claude works:

"This is the move. I'm not asking Claude to look in *one* tool. I'm asking it to look across three at the same time, and tell me something none of those tools could tell me individually. Calendar shows hours. Slack shows attention. Drive shows output. The interesting answer is in the gaps between them."

"And the way Claude does this is through something called MCP — think of it as a secure bridge between Claude and the tools you already use. Permission-based. You control which tools. You revoke access whenever. Same logic as how your phone connects to your bank app."

### When results appear:

"Look at this. Hours by category — meetings, deep work, comms. The themes that came up most in DMs. The actual artifacts I shipped. And then the synthesis. The 'where the gap is.' Most people I know have never seen this view of their own work. The honest answer is usually uncomfortable. But it's the right answer."

### Second connected example (faster):

"One more, quicker. Cross-tool, very different shape."

> **ON SCREEN**
> Type: *"Find the most recent strategy doc in my Drive. Then check the last two weeks of Slack discussions about it. Tell me where the doc and the conversation have diverged — what's been decided in chat that the doc doesn't reflect yet?"*

"Same idea. Doc plus conversation, cross-referenced. Two minutes ago this would've been impossible. Now it's a sentence."

> **AHA MOMENT**
> Claude isn't a walled garden. It reaches into the tools you already use, and — more interestingly — it *combines* them. That's what makes it part of how you work, not a window you visit.

### PAUSE FOR QUESTIONS

"Let me pause here. This is usually where people have the most questions — about security, about what Claude can and can't access. Fire away."

*(Take 3–4 questions. Key reassurance: Claude only accesses what you connect it to. You control the permissions. See cheat sheet.)*

### TRANSITION — SAY THIS:

"Alright, last one. This is my favorite. Everything I've shown you so far, I was sitting at my computer. But I don't live at my computer. I'm in meetings, I'm on the move, I'm at dinner. What if Claude could keep working while I'm not looking — and what if it could deliver something I could check on from my phone?"

---

## Use Case 5: The Colleague That Doesn't Sleep

**The point:** Claude works while you don't — and not just one Claude. *Many* Claudes, in parallel, on the same problem. You assign it from your phone, you spawn five at once, you build a live dashboard, you set a standing weekly order.

**AI concept on display: *Asynchronous, persistent, parallel execution.*** The model runs over time without you watching. It can fan out into multiple sub-agents that work simultaneously and report back. It's no longer a request-response chatbot — it's a workforce that operates on its own schedule and scale.


### What you say:

"Up to this point, I had to be at my computer. Watching Claude. Pressing enter. But I don't live at my computer. And there's only one of me. Watch what happens when I stop being the bottleneck."

### Move 1 — Assign from your phone:

"I'm going to pick up my phone. Same Claude. Same connected tools."

> **ON SCREEN**
> Pull out your phone. Type into Cowork from the phone (project it if possible): *"Find the 5 most-cited articles published in the last 30 days about [topic relevant to your work]. For each: title, source, the single most important takeaway, why it matters for me. Save as a Word doc in my folder."*

"Phone goes face down. We'll check on it in a minute."

### Move 2 — Five Claudes at once (the headliner):

"Now this is the one that made me realize the rules had changed. Last move I assigned *one* task to *one* Claude. Watch what happens when I assign five tasks at the same time, and tell Claude to run them in parallel."

> **ON SCREEN**
> Switch to Cowork or Claude on the laptop. Type:
>
> *"I want you to spawn five sub-agents in parallel — not sequentially. Each one researches one of these companies: [Company 1], [Company 2], [Company 3], [Company 4], [Company 5]. For each company, the sub-agent should produce a one-page profile: current strategic positioning, the three most important moves they've made in the last 90 days, where they're vulnerable, and one thing we should be watching. When all five have reported back, synthesize across them — the common pattern, the outlier, and the single competitive threat I should brief my team on first."*

"Watch the screen. Five workstreams firing at once. This is the part I want you to feel: when I asked one question, it answered. When I described a *job for a team*, it built the team."

> **ON SCREEN**
> Narrate the parallel work as it appears. Point out as each sub-agent finishes. When the synthesis lands, scroll through it slowly.

"Five companies, in parallel, in the time it would've taken me to do one. And the synthesis at the end is the part nobody on my actual team would have time to write."

### Move 3 — The live artifact:

"Now I want a *thing* I can keep coming back to. Not a chat. Not a doc. A page that pulls live every time I open it."

> **ON SCREEN**
> Switch back to Cowork. Type: *"Build me a personal weekly dashboard I can open on my phone. Show: today's calendar, the 3 most important emails from the last 24 hours, what people are waiting on me for, and a one-paragraph 'shape of the week' written in plain English. Make it look good. Save it so I can re-open it."*

"This is an interactive page Claude is generating. Once it exists, I just open it. Like a website. But it's mine, and it's me."

> **ON SCREEN**
> Show the dashboard rendering. Reload once to demonstrate freshness.

### Move 4 — The phone task comes home:

"Remember the phone task from a couple minutes ago?"

> **ON SCREEN**
> Pick up the phone. Show the completed research. Open the document on your laptop instead so the whole room can see.

"Five articles, five takeaways, doc saved. I didn't manage it. I didn't watch it. It just happened — while I was busy doing the parallel agents work."

### Move 5 — The standing order:

"Last one. I want Claude to do something *on a schedule*, without me asking."

> **ON SCREEN**
> Type: *"Every Friday at 4pm, look across my calendar, my Drive activity, and my Slack from the past week. Write me a 5-bullet 'week in review' so I can do my reflection. End with one question I should sit with over the weekend."*

"That's it. Every Friday afternoon, before I close my laptop, a reflection is waiting. I never have to remember to ask."

> **AHA MOMENT**
> Five Claudes ran in parallel while a sixth ran in the background on my phone, while a seventh was building me a live page, while an eighth was waiting to fire every Friday. That's not a chatbot. That's a *workforce*. The ceiling on what one person can get done has just moved.

### TRANSITION — SAY THIS:

"Now. I've shown you five things Claude can do. But everything I demoed, *I* had to ask for. Each one was a fresh prompt. The most powerful move I haven't shown you yet is when you stop being a Claude *user* and become a Claude *designer*. When the workflow you do every week becomes a thing you press a button on. That's the last one."

---

## Use Case 6: The Agent You Designed

**The point:** You stop being a Claude user and become a Claude builder. The recurring workflow you run every week becomes a one-command agent. This is where the compounding starts — you walk out of the room with a personal toolkit you designed yourself.

**AI concept on display: *Composable agents.*** You package a workflow — instructions, tools, data sources — into a reusable agent. No code. The model writes the prompt for itself, wires up the tool calls, and saves it as something you can invoke any time. The architecture of AI becomes something *you* design.


### What you say:

"This last one is different from everything before. Up to now, every use case started with me typing a fresh prompt. That works — but it doesn't compound. The thing that changes the game is when you take a workflow you do every week and turn it into something you press a button on. So let me build one. Right now."

"Pick a workflow you do all the time. Mine is meeting prep — every time I have a new meeting on the calendar, I do roughly the same five things. Yours might be writing a weekly status update. Vetting a new vendor. Doing competitor research. Whatever it is — let's turn that into an agent."

> **ON SCREEN**
> Open Cowork (or Claude with skill-creator available). Type:
>
> *"I want to build a reusable 'meeting prep' agent. Here's what it should do every time I run it: I give it the name of someone I'm meeting and their company. It then — (1) researches the person on the live web, (2) checks my Drive for any past notes or docs that mention them or their company, (3) checks my calendar and inbox for past interactions, (4) cross-references everything and writes me a one-pager I can read in 5 minutes, and (5) suggests 3 conversation starters tailored to what's actually current with them. Save it as a custom agent I can invoke any time by saying 'meeting prep'. Make the prompt easy for me to edit later as I learn what works."*

### While Claude works:

"What's happening right now is the part I find genuinely cool. Claude is taking the workflow I just described and converting it into a *thing* — a reusable agent. It's writing the system prompt. It's specifying which tools the agent should have access to. It's saving it as something I can call by name. I described the job. It's building the worker."

"The technical word for this is *composable agents*. The plain English version: you're going from being someone who uses AI to someone who designs it. You don't need to code. You need to describe a workflow clearly. That's the new skill."

### When the agent is ready — run it end to end:

"Now watch me run it. And I want you to watch the *steps* — because the agent isn't a black box. You can see exactly what it's doing."

> **ON SCREEN**
> Type: *"Run meeting prep. The person is [name]. The company is [company]."*

*(Stay quiet for a beat. Let the audience watch the agent work. Then narrate as each step appears — they'll see the tool-call breadcrumbs.)*

"There — it's hitting the open web first. Now it's reaching into my Drive. Now my calendar. Now my inbox history. Now it's cross-referencing. And there — the synthesis."

> **ON SCREEN**
> When the agent completes, open the resulting one-pager (or scroll the response slowly). Read the first conversation starter out loud — the one that's specific to the person. The audience needs to see that the output is *real*, not a stub.

"That one-pager — that took thirty seconds and zero of my attention. I never had to write the prompt again. Tomorrow my colleague can run the same agent for their meeting. Next month I'll tweak it once and it gets better for everyone using it."

### The kicker — composition:

"Here's the part that gets really interesting. Once you have one agent, you build another. And another. After six months, you have a personal toolkit — five, ten, fifteen small agents, each one running a slice of your work that used to take you 30 minutes. *That's* what compounding gains from AI actually look like. Not a smarter model. A growing library of agents you wired up yourself."

"And the prompt for each one is just a paragraph in plain English. You can read it. You can edit it. You own it."

> **AHA MOMENT**
> The arc closes here. Use Case 1 was Claude reasoning over a piece of text. Use Case 6 is *you* using Claude to build a Claude that runs your workflow. You went from consumer to architect. That's the thing nobody told you AI was actually for.

---

## Closing


### What you say:

"Let me pull it together. Across these six use cases, Claude did six things — and each one was more sophisticated than the one before:"

1. **It read a confusing email thread** and told me what each person actually wanted, then drafted my reply. *(Reasoning over context.)*
2. **It researched a real person on the live web** and saved me a one-pager I could carry into a meeting. *(Tool use.)*
3. **It read across a folder of my notes** and surfaced patterns I couldn't see by reading them one at a time. *(Long-context reasoning.)*
4. **It cross-referenced my calendar, Slack, and Drive** to tell me where my week actually went — which no single tool could ever tell me. *(Connected data via MCP.)*
5. **It spawned five sub-agents in parallel, ran a sixth from my phone, built me a live dashboard, and committed to checking in every Friday** — none of which required me to be there. *(Asynchronous, persistent, parallel execution.)*
6. **It built me a custom agent** — a reusable, named worker that runs my recurring workflow with one command. *(Composable agents.)*

"That's the arc. Reasoning. Tool use. Long-context. Connected data. Persistence. Composability. Each step is a more sophisticated capability than the last. And here's the thing — *all six are the same AI*. Same Claude. The difference is what you trust it to do, and how you choose to wire it up."

"And notice where the arc ends. It doesn't end with Claude doing more for you. It ends with *you* designing the thing that does it. That's the real headline. AI isn't a tool you use. It's a tool you build with."

### Your Monday Morning Action Plan

"Here's the climb. Each step matches one of the six things you just saw."

**This week:** Go to claude.ai. It's free to try. Ask it something you'd normally Google or hand off. A first draft of an email you've been putting off. A briefing for a meeting. A confusing thread you can't make sense of. Spend 10 minutes. See what happens. *(Acts 1 and 2.)*

**Next week:** Download the Claude Desktop app. Point it at a folder of your real notes or a messy report and ask it to find patterns or build a deliverable. *(Act 3.)*

**The week after:** Try Cowork mode. Connect one tool — just one — and watch what it feels like to have Claude working with your real information. Then connect a second tool and ask Claude to cross-reference them. *(Act 4.)*

**Then:** Set up one scheduled task. A Friday week-in-review. A Monday morning brief. Anything that runs on its own. *(Act 5.)*

**Then the big one:** Pick one workflow you do every week and build an agent for it. Don't overthink it. Describe the workflow to Claude in plain English and let it build the agent for you. That's where the compounding starts. *(Act 6.)*

"You don't need to understand how AI works. You don't need to learn to code. You need to start giving it real tasks from your real work, and — eventually — to start *designing* the agents that do them. The biggest risk isn't that you move too fast. It's that you don't move at all."

### One last thing — the research that ran while we talked:

"Before I take questions, I owe you something. Remember the very first thing I did? I started a research task in a tab and closed it. I haven't touched it since. Let me open it now."

> **ON SCREEN**
> Switch to the second Claude.ai tab. Open the deep research result. Scroll slowly through the executive summary. Show the table of contents. Show the source citations at the bottom — there should be dozens.

"Twenty-something pages. Sixty-plus sources. Executive summary up top, strategic implications, named companies, cited evidence. I didn't write a word of this. I didn't even watch it work. While I was showing you all this, it was happening in another tab on the same laptop."

"This is what 'Claude works while you don't' actually looks like at scale. Every use case I showed you — the email, the briefing, the patterns, the time audit, the dashboard, the agent — *this report was running the entire time*. That's not a chatbot. That's a research analyst on staff. Forever. Twenty dollars a month."

"That's the headline I want you to walk out with. AI isn't a tool you visit when you have a question. It's something you *kick off* in the morning and check on later. The bottleneck stopped being the model. The bottleneck is now whether you remember to ask."

---

## Open Q&A


"Let's take your questions. Whatever's on your mind."

---

## Question Cheat Sheet

Keep this page handy. These will come up.

### "Is my data safe?"

Yes, with caveats. When you use Claude through Anthropic's paid plans (Pro, Team, or Enterprise), your conversations are not used to train the model. Enterprise plans add additional security controls. The MCP connections are permission-based — Claude can only access what you explicitly connect it to, and you can revoke access anytime. That said, like any tool that handles sensitive information, I'd recommend starting with non-sensitive tasks while you build trust, and involving your IT team before connecting it to business-critical systems.

### "Will this replace people on my team?"

No. It replaces the tasks people shouldn't be spending time on. The 2 hours someone spends compiling a briefing. The half-day spent reformatting a report. The 20 minutes everyone spends on Monday morning reading Slack. Claude handles the work that's necessary but not valuable. People do the work that requires judgment, relationships, and context you can't put in a prompt. The companies I see using AI well aren't cutting headcount. They're freeing people up to do higher-value work.

### "How much does it cost?"

Claude.ai has a free tier to start. The Pro plan is $20/month — basically the cost of one lunch. The Team plan is $25/month per person with more features. Enterprise pricing varies. The way I think about it: if Claude saves you even 2 hours a month, it's paid for itself many times over.

### "Does it make things up?"

Sometimes, yes. All large language models can "hallucinate" — generate confident-sounding information that's wrong. Claude is generally good about flagging uncertainty, and it's better than most at saying "I'm not sure." But the rule of thumb is the same as with a smart new hire: trust, but verify. For high-stakes decisions, always check the key facts. For first drafts, brainstorming, and synthesis, it's remarkably reliable.

### "Can it access our internal systems?"

Through MCP connections, yes — with your permission. Claude can connect to Slack, Google Drive, Notion, Obsidian, calendar apps, and a growing list of tools. Enterprise integrations can go deeper. But it only accesses what you connect it to. Think of it like giving a new employee their access badges on day one: you decide which doors they can open.

### "How is this different from ChatGPT?"

Both are good. Honestly, for the use cases I showed today, Claude and ChatGPT can both do solid work. Where I find Claude distinctly stronger: long document analysis, nuanced writing, following complex instructions, and — especially in Cowork mode — doing multi-step tasks without constant hand-holding. But the best advice I can give is: try both, use whichever one you find more useful. The tool matters less than the habit of using it.

### "I'm not technical. Can I really use this?"

If you can write an email, you can use Claude. There's no code, no setup, no technical knowledge required. The skill isn't technical. It's learning to describe what you want clearly — the same skill you use when you hand work off to a colleague. The people who get the most out of Claude aren't engineers. They're people who are good at describing problems and outcomes.

---

*End of run sheet*
