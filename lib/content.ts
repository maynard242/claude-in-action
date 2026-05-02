export type Prompt = {
  label: string;
  surface: "claude" | "desktop" | "cowork" | "phone" | "deepresearch";
  text: string;
};

export type Act = {
  num: number;
  slug: string;
  title: string;
  reaction: string;
  capability: string;
  capabilityShort: string;
  oneLiner: string;
  timeRange: string;
  point: string;
  whatYouSee: string[];
  prompts: Prompt[];
  watchFor: string;
  whyItMatters: string;
  tryThis: string;
  ahaMoment: string;
  tryThisPrompt?: string;
};

export const acts: Act[] = [
  {
    num: 1,
    slug: "1",
    title: "The Email You've Been Avoiding",
    reaction: "It actually understood what was happening in that thread.",
    capability: "Reasoning over context (incl. multimodal)",
    capabilityShort: "Reasoning over context",
    oneLiner:
      "Claude reads a confusing thread and tells you what's actually being asked. Then drafts your reply. Then critiques the slide you were about to take into the boardroom.",
    timeRange: "3:00 – 11:00",
    point:
      "Claude isn't a search engine. It reads context, infers intent, and drafts a reply you'd actually send. Then it can look at an image and tell you what's wrong with it.",
    whatYouSee: [
      "Paste a real, messy email thread (5 stakeholders, vague asks, sitting for 3 days).",
      "Claude untangles who's asking what, flags the one decision that's yours, and drafts a 4-line reply.",
      "Then drag in a screenshot of an imperfect slide.",
      "Claude critiques the slide as a CFO would — pointing at the chart, the labels, the layout.",
    ],
    prompts: [
      {
        label: "Untangle a confusing email thread",
        surface: "claude",
        text: "This thread has been sitting in my inbox for three days. Tell me: what is each person actually asking for, who's blocking who, what decision is mine to make, and draft a 4-line reply that moves this forward without committing me to anything I shouldn't commit to.",
      },
      {
        label: "Critique a slide (drag the screenshot in first)",
        surface: "claude",
        text: "This is a slide I'm about to take into a board meeting. The audience is a CFO and three non-executive directors. Tell me — honestly — what's wrong with it, where they'll push back, what I'm hiding by accident, and how I'd cut it down to one number and one sentence. Be direct. I don't want polite.",
      },
    ],
    watchFor:
      "Claude isn't summarizing. It's interpreting. The slide critique isn't 'great slide!' — it's the thing the CFO will spot in 4 seconds. That's the part you'd pay for.",
    whyItMatters:
      "Most of us have a backlog of communication and bad slides we're avoiding because they're confusing, not because they're hard. Claude turns 'I'll deal with it tomorrow' into 'I'll deal with it in 30 seconds.'",
    tryThis:
      "Pick a real piece of communication you've been putting off. Or take a screenshot of a slide you're not sure about. Try the prompts above on either.",
    tryThisPrompt:
      "I've been avoiding this. Read it carefully and tell me: what's the actual ask, what am I afraid of, and draft a reply that's honest but doesn't burn anything.",
    ahaMoment:
      "Claude doesn't give you information. It gives you judgment. The quality of the answer depends on the quality of the question — just like asking a smart colleague.",
  },
  {
    num: 2,
    slug: "2",
    title: "The Briefing You Didn't Have Time to Write",
    reaction: "It's doing real research and saving me a Word doc.",
    capability: "Tool use",
    capabilityShort: "Tool use",
    oneLiner:
      "Claude does live research across the open web and produces a real deliverable on your computer. This is where 'chatbot' starts to feel wrong.",
    timeRange: "11:00 – 21:00",
    point:
      "Claude calls tools — web search, file system — to fetch fresh information and produce structured artifacts. The model extends itself.",
    whatYouSee: [
      "Claude researches a real public figure on the live web.",
      "It returns: background, recent statements, strategic priorities, non-obvious connections, three real conversation starters, with cited sources.",
      "Then in Claude Desktop: 'Turn that into a one-page Word doc, save it to my folder.'",
      "The .docx opens. Real formatting. Callout box at the bottom. Ready to print.",
    ],
    prompts: [
      {
        label: "Live research on a real person",
        surface: "claude",
        text: "I'm meeting [name of a real public figure or company exec] next week. Research them and give me: their professional background, what they've publicly said or written in the last 6 months, the strategic priorities of their org right now, two non-obvious connections we might have in common, and 3 conversation starters that would signal I've actually done my homework. Cite your sources.",
      },
      {
        label: "Save it as a Word doc (Claude Desktop)",
        surface: "desktop",
        text: "Take the research from my last conversation and turn it into a one-page Word document I can print. Clean formatting, max two pages, the conversation starters in a callout box at the bottom. Save it to my folder.",
      },
    ],
    watchFor:
      "Two things. One — Claude is researching live, not just remembering. You'll see real source links. Two — the request asked for non-obvious connections and non-generic conversation starters. That's the dinner-party version, not the LinkedIn version.",
    whyItMatters:
      "The jump from chat answer to deliverable is the jump from 'AI as search engine' to 'AI as assistant.' It's not telling you things — it's producing artifacts you can use.",
    tryThis:
      "Next time you have a meeting with someone you don't know well, run the prompt above before the meeting. You'll walk in with the kind of context that used to take a half-morning of browsing.",
    ahaMoment:
      "Claude went from answering a question to producing a deliverable. That's the jump from chatbot to assistant. It's not telling you things — it's doing the work.",
  },
  {
    num: 3,
    slug: "3",
    title: "The Pattern You Couldn't See",
    reaction: "It just found something in my own notes that I missed.",
    capability: "Long-context reasoning",
    capabilityShort: "Long-context",
    oneLiner:
      "Claude reads across many documents at once and surfaces patterns no human would catch reading them one by one.",
    timeRange: "21:00 – 32:00",
    point:
      "Claude holds many documents in mind simultaneously. Patterns appear that you'd never notice reading sequentially — by the time you finish file 10, you've forgotten file 1.",
    whatYouSee: [
      "Claude Desktop is pointed at a folder of 5–10 sanitized notes.",
      "Three asks: top themes, contradictions, the question you should be sitting with.",
      "Claude returns a one-page summary — and catches a contradiction between week 1 and week 5 you'd never have spotted yourself.",
      "Then: 'Now turn this into a 5-slide deck. Save the deck and the one-pager to the same folder.'",
    ],
    prompts: [
      {
        label: "Find patterns across a folder of notes",
        surface: "desktop",
        text: "Read every file in this folder. These are my notes from the last 6 weeks. Tell me three things: (1) the top 3 themes that keep coming up that I might be missing, (2) any contradictions — places where I wrote one thing in week 1 and the opposite in week 5, and (3) the single most important question I should be asking myself based on what's in here. Then make me a one-page summary I can sit with for 10 minutes on Sunday night.",
      },
      {
        label: "Turn the summary into a deck",
        surface: "desktop",
        text: "Now turn this into a 5-slide deck I could share with my manager or my team to start a real conversation. Save the deck and the one-pager to the same folder.",
      },
    ],
    watchFor:
      "The contradiction it catches. That's the part most people find spooky. Claude holds all the files in mind at once, so it can spot 'you wrote X in week 1 and the opposite in week 5' — something you'd never notice yourself.",
    whyItMatters:
      "You take notes you never re-read. Meeting transcripts pile up. The signal lives in the pile. Most people will never read their own notes again. Claude reads all of them at once — and tells you what they collectively mean.",
    tryThis:
      "Pick a folder of work you've already done — meeting notes, project journals, customer call summaries. Point Claude Desktop at it. Run the prompt above.",
    tryThisPrompt:
      "Read across these files. What patterns am I missing? What contradictions are in here? What would you challenge me on if you were my coach?",
    ahaMoment:
      "The shift from 'assistant' to 'colleague.' You didn't manage the steps. You described the outcome. Claude did the thinking in between.",
  },
  {
    num: 4,
    slug: "4",
    title: "The Time Audit Nobody Else Can Do",
    reaction: "It's talking to all my tools at once.",
    capability: "Connected data (MCP)",
    capabilityShort: "MCP",
    oneLiner:
      "Claude pulls from multiple tools at once and synthesizes across them. This is the moment you realize Claude isn't a chatbot — it's a layer on top of your work.",
    timeRange: "32:00 – 42:00",
    point:
      "MCP — Model Context Protocol — is a permission-based standard that lets Claude talk to your real tools. Calendar, Slack, Drive, Notion, your CRM. The interesting move is synthesis: Claude pulls from multiple tools at once and tells you something none of them could tell you alone.",
    whatYouSee: [
      "Cowork mode shows three connected tools: calendar, Slack, Drive.",
      "'Where did my week actually go?' — Claude looks across all three at once.",
      "Calendar shows hours. Slack shows attention. Drive shows output. The interesting answer is in the gaps between them.",
      "Then a fast follow-up: 'Find the most recent strategy doc. Where has the Slack chat diverged from the doc?'",
    ],
    prompts: [
      {
        label: "Where did my week actually go?",
        surface: "cowork",
        text: "Cross-reference my last two weeks across three sources. From my calendar: where did I actually spend my time? From my Slack DMs: who did I have the most back-and-forth with, and what were the recurring themes? From my Drive activity: what did I actually create or meaningfully edit? Then tell me the gap — where my time went vs. what I produced — and the one thing I should drop next week.",
      },
      {
        label: "Doc + chat divergence check",
        surface: "cowork",
        text: "Find the most recent strategy doc in my Drive. Then check the last two weeks of Slack discussions about it. Tell me where the doc and the conversation have diverged — what's been decided in chat that the doc doesn't reflect yet?",
      },
    ],
    watchFor:
      "Claude isn't asked to look in one tool. It's asked to look across three at the same time. The interesting answer isn't in any single tool — it's in the gap between calendar (what you planned), Slack (what people pulled you into), and Drive (what you actually produced).",
    whyItMatters:
      "Your work lives in silos. Slack doesn't know about your calendar. Drive doesn't know about your inbox. Claude — when permissioned — sits across all of them, which is something no human easily does for themselves. This is the unique-to-MCP move.",
    tryThis:
      "Connect just one tool to Cowork mode this week. Drive is a good first one. Then add a second tool and ask Claude to cross-reference them.",
    tryThisPrompt:
      "Look at my Drive activity from the last week. What did I actually work on? Surface anything I might've forgotten about.",
    ahaMoment:
      "Claude isn't a walled garden. It reaches into the tools you already use, and — more interestingly — it combines them. That's what makes it part of how you work, not a window you visit.",
  },
  {
    num: 5,
    slug: "5",
    title: "The Colleague That Doesn't Sleep",
    reaction: "Wait — there are five of them working at once?",
    capability: "Asynchronous, persistent, parallel execution",
    capabilityShort: "Async + parallel",
    oneLiner:
      "Five Claudes work in parallel on five competitors. A sixth runs from your phone. A seventh builds you a live dashboard. An eighth shows up every Friday whether you ask or not.",
    timeRange: "42:00 – 52:00",
    point:
      "The model runs over time without you watching, and can fan out into multiple sub-agents that work simultaneously and report back. It's no longer a request-response chatbot — it's a workforce.",
    whatYouSee: [
      "Move 1: Phone — assign a one-shot research task. Phone goes face down.",
      "Move 2 (the headliner): Five sub-agents in parallel, each researching one competitor. Then a synthesis across all five.",
      "Move 3: A live dashboard. Pulls from your tools every time you open it.",
      "Move 4: The phone task comes back, done.",
      "Move 5: A standing weekly order. Every Friday, forever.",
    ],
    prompts: [
      {
        label: "Move 1 — Assign-and-walk-away (from phone)",
        surface: "phone",
        text: "Find the 5 most-cited articles published in the last 30 days about [topic relevant to your work]. For each: title, source, the single most important takeaway, why it matters for me. Save as a Word doc in my folder.",
      },
      {
        label: "Move 2 — Five Claudes in parallel (the headliner)",
        surface: "cowork",
        text: "I want you to spawn five sub-agents in parallel — not sequentially. Each one researches one of these companies: [Company 1], [Company 2], [Company 3], [Company 4], [Company 5]. For each company, the sub-agent should produce a one-page profile: current strategic positioning, the three most important moves they've made in the last 90 days, where they're vulnerable, and one thing we should be watching. When all five have reported back, synthesize across them — the common pattern, the outlier, and the single competitive threat I should brief my team on first.",
      },
      {
        label: "Move 3 — Build a live dashboard",
        surface: "cowork",
        text: "Build me a personal weekly dashboard I can open on my phone. Show: today's calendar, the 3 most important emails from the last 24 hours, what people are waiting on me for, and a one-paragraph 'shape of the week' written in plain English. Make it look good. Save it so I can re-open it.",
      },
      {
        label: "Move 5 — A standing weekly task",
        surface: "cowork",
        text: "Every Friday at 4pm, look across my calendar, my Drive activity, and my Slack from the past week. Write me a 5-bullet 'week in review' so I can do my reflection. End with one question I should sit with over the weekend.",
      },
    ],
    watchFor:
      "The parallel agents move is the one to focus on. Five workstreams firing at once is the moment you realize you're not using a chatbot — you're managing a team. Same Claude. Same plan. Five hands.",
    whyItMatters:
      "The bottleneck used to be the model. The bottleneck is now you — whether you remember to ask for parallel work, schedules, and live artifacts. Set up one parallel-research task and one Friday standing order this week and you'll feel the shift.",
    tryThis:
      "Pick five companies you'd want briefings on. Run the parallel-agents prompt. While that's working, set up one Friday-afternoon scheduled task.",
    ahaMoment:
      "Five Claudes ran in parallel while a sixth ran on your phone, while a seventh built you a live page, while an eighth waits to fire every Friday. That's not a chatbot. That's a workforce. The ceiling on what one person can get done has just moved.",
  },
  {
    num: 6,
    slug: "6",
    title: "The Agent You Designed",
    reaction: "Wait, I just built my own AI.",
    capability: "Composable agents",
    capabilityShort: "Composable agents",
    oneLiner:
      "You stop being a Claude user and become a Claude builder. A workflow you do every week becomes a one-command agent.",
    timeRange: "52:00 – 63:00",
    point:
      "Package a workflow — instructions, tools, data sources — into a reusable agent. No code. The model writes the prompt for itself, wires up the tool calls, and saves it as something you can invoke any time.",
    whatYouSee: [
      "A meeting-prep agent gets built — described in plain English, packaged by Claude into a reusable thing with its own tools.",
      "Then it runs end-to-end, visibly. Web search → Drive → calendar → inbox → cross-reference → synthesis.",
      "The output: a real one-pager with conversation starters specific to the actual person.",
      "Once you have one agent, you build another. After six months, you have a personal toolkit of small agents.",
    ],
    prompts: [
      {
        label: "Build a 'meeting prep' agent",
        surface: "cowork",
        text: "I want to build a reusable 'meeting prep' agent. Here's what it should do every time I run it: I give it the name of someone I'm meeting and their company. It then — (1) researches the person on the live web, (2) checks my Drive for any past notes or docs that mention them or their company, (3) checks my calendar and inbox for past interactions, (4) cross-references everything and writes me a one-pager I can read in 5 minutes, and (5) suggests 3 conversation starters tailored to what's actually current with them. Save it as a custom agent I can invoke any time by saying 'meeting prep'. Make the prompt easy for me to edit later as I learn what works.",
      },
      {
        label: "Run the agent",
        surface: "cowork",
        text: "Run meeting prep. The person is [name]. The company is [company].",
      },
    ],
    watchFor:
      "The shift in framing. The first five acts were the presenter typing fresh prompts. This last one is the presenter describing a workflow once and then invoking it later by name. That's the difference between using a tool and building with it.",
    whyItMatters:
      "This is where AI starts to compound. One useful agent saves you 30 minutes. Five agents save you a half-day per week. The skill isn't technical — it's getting clear enough about your own workflow to describe it.",
    tryThis:
      "Pick one workflow you do every single week — meeting prep, weekly status update, vendor vetting, whatever. Describe it to Claude using the structure above. Don't overthink it. Tweak it after you've used it twice.",
    ahaMoment:
      "Use Case 1 was Claude reasoning over a piece of text. Use Case 6 is you using Claude to build a Claude that runs your workflow. You went from consumer to architect in 60 minutes.",
  },
];

export const deepResearchPrompt: Prompt = {
  label: "Kick off at minute 1, reveal at minute 64",
  surface: "deepresearch",
  text: "Research how Fortune 500 CEOs are actually deploying agentic AI in 2026 — not what they're announcing, what they're doing. Pull from news, earnings calls, and primary reporting in the last 90 days. I want a 20–25 page briefing: an executive summary up top, three to five strategic implications, named companies doing it well and badly with cited evidence, and the two non-obvious risks most boards are still missing. Take your time. Cite everything.",
};
