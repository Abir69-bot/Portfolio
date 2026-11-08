/**
 * Initial portfolio content.
 * Sources: Faisal_Mahmud_Abir_Resume.pdf (Oct 2026) and the previous portfolio's content file.
 * Nothing here should claim features, employment or scale that those sources don't support.
 *
 * After the first seed, the CMS is the source of truth — this file is only used to create
 * missing items (see seed.ts) and as the reference list for `npm run verify:skills`.
 */

type SeedSkill = { name: string; icon?: string; featured?: boolean }
export type SeedCategory = { slug: string; name: string; description: string; icon: string; skills: SeedSkill[] }

export const SKILL_CATEGORIES: SeedCategory[] = [
  {
    slug: 'programming-software-engineering',
    name: 'Programming & Software Engineering',
    description: 'Languages and engineering fundamentals behind maintainable, efficient software.',
    icon: 'lu:Code',
    skills: [
      { name: 'Python', icon: 'si:python', featured: true },
      { name: 'C', icon: 'si:c' },
      { name: 'C++', icon: 'si:cplusplus' },
      { name: 'JavaScript', icon: 'si:javascript' },
      { name: 'TypeScript', icon: 'si:typescript', featured: true },
      { name: 'SQL', icon: 'lu:Database' },
      { name: 'OOP', icon: 'lu:Boxes' },
      { name: 'Data Structures & Algorithms', icon: 'lu:Network' },
      { name: 'AsyncIO', icon: 'lu:Zap' },
    ],
  },
  {
    slug: 'ai-machine-learning',
    name: 'AI & Machine Learning',
    description: 'Training, adapting and compressing models for real application workloads.',
    icon: 'lu:Brain',
    skills: [
      { name: 'PyTorch', icon: 'si:pytorch', featured: true },
      { name: 'Scikit-learn', icon: 'si:scikitlearn' },
      { name: 'Hugging Face Transformers', icon: 'si:huggingface', featured: true },
      { name: 'Deep Learning', icon: 'lu:BrainCircuit' },
      { name: 'NLP', icon: 'lu:MessageSquare' },
      { name: 'Generative AI', icon: 'lu:Sparkles' },
      { name: 'Fine-tuning', icon: 'lu:Settings' },
      { name: 'Knowledge Distillation', icon: 'lu:Layers' },
    ],
  },
  {
    slug: 'computer-vision',
    name: 'Computer Vision',
    description: 'Detection, tracking and classification pipelines for images and video.',
    icon: 'lu:ScanEye',
    skills: [
      { name: 'OpenCV', icon: 'si:opencv', featured: true },
      { name: 'YOLO', icon: 'si:yolo', featured: true },
      { name: 'ByteTrack', icon: 'lu:Waypoints' },
      { name: 'ResNet', icon: 'lu:Layers' },
      { name: 'Vision Transformers (ViT)', icon: 'lu:Eye' },
      { name: 'Object Detection', icon: 'lu:ScanSearch' },
      { name: 'Object Tracking', icon: 'lu:Video' },
      { name: 'Image Classification', icon: 'lu:Blocks' },
    ],
  },
  {
    slug: 'llm-agent-engineering',
    name: 'LLM & Agent Engineering',
    description: 'LLM-powered applications that retrieve context, call tools and act.',
    icon: 'lu:Bot',
    skills: [
      { name: 'LangChain', icon: 'si:langchain', featured: true },
      { name: 'LangGraph', icon: 'si:langgraph', featured: true },
      { name: 'RAG', icon: 'lu:Search', featured: true },
      { name: 'LLM APIs', icon: 'lu:Plug' },
      { name: 'Tool Calling', icon: 'lu:Puzzle' },
      { name: 'Prompt Engineering', icon: 'lu:MessageSquare' },
      { name: 'AI Agents', icon: 'lu:Bot', featured: true },
    ],
  },
  {
    slug: 'backend-databases',
    name: 'Backend & Databases',
    description: 'APIs, real-time services and the data stores behind them.',
    icon: 'lu:Server',
    skills: [
      { name: 'FastAPI', icon: 'si:fastapi', featured: true },
      { name: 'Flask', icon: 'si:flask' },
      { name: 'REST APIs', icon: 'lu:Webhook' },
      { name: 'WebSockets', icon: 'lu:Zap' },
      { name: 'PostgreSQL', icon: 'si:postgresql', featured: true },
      { name: 'MongoDB', icon: 'si:mongodb' },
      { name: 'Redis', icon: 'si:redis', featured: true },
      { name: 'ChromaDB', icon: 'lu:Database' },
    ],
  },
  {
    slug: 'frontend-development',
    name: 'Frontend Development',
    description: 'Interfaces that put AI features in front of users.',
    icon: 'lu:LayoutTemplate',
    skills: [
      { name: 'React.js', icon: 'si:react', featured: true },
      { name: 'TypeScript', icon: 'si:typescript' },
      { name: 'CSS', icon: 'si:css' },
    ],
  },
  {
    slug: 'ai-automation-workflows',
    name: 'AI Automation & Workflows',
    description: 'Connecting models, APIs and services into automated workflows.',
    icon: 'lu:Workflow',
    skills: [
      { name: 'n8n', icon: 'si:n8n', featured: true },
      { name: 'AI Agent Workflows', icon: 'lu:Workflow' },
      { name: 'API Integration', icon: 'lu:Plug' },
      { name: 'Workflow Automation', icon: 'lu:Zap' },
    ],
  },
  {
    slug: 'data-analysis-visualization',
    name: 'Data Analysis & Visualization',
    description: 'Exploring, cleaning and communicating data.',
    icon: 'lu:ChartColumn',
    skills: [
      { name: 'Pandas', icon: 'si:pandas' },
      { name: 'NumPy', icon: 'si:numpy' },
      { name: 'Advanced Excel', icon: 'lu:Sheet' },
      { name: 'Power BI', icon: 'lu:ChartPie' },
    ],
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    description: 'Packaging, shipping and running software reliably.',
    icon: 'lu:Cloud',
    skills: [
      { name: 'AWS', icon: 'lu:Cloud', featured: true },
      { name: 'GCP', icon: 'si:googlecloud', featured: true },
      { name: 'Docker', icon: 'si:docker', featured: true },
      { name: 'Docker Compose', icon: 'si:docker' },
      { name: 'Git', icon: 'si:git' },
      { name: 'GitHub Actions', icon: 'si:githubactions', featured: true },
      { name: 'CI/CD', icon: 'lu:GitBranch' },
      { name: 'Linux', icon: 'si:linux' },
    ],
  },
  {
    slug: 'testing-evaluation',
    name: 'Testing & Evaluation',
    description: 'Checking that both the software and the models behave as intended.',
    icon: 'lu:FlaskConical',
    skills: [
      { name: 'Pytest', icon: 'si:pytest', featured: true },
      { name: 'Integration Testing', icon: 'lu:ListChecks' },
      { name: 'Model Evaluation', icon: 'lu:Gauge' },
      { name: 'RAG Evaluation', icon: 'lu:CircleCheck' },
    ],
  },
]

export const CAPABILITIES = [
  {
    slug: 'full-stack-web-development',
    title: 'Full-Stack Web Development',
    icon: 'lu:AppWindow',
    description:
      'Complete websites and web apps, from a responsive frontend to the API, database and deployment — with AI features built in where they help.',
    technologies: ['React.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'REST APIs', 'Docker'],
  },
  {
    slug: 'llm-agentic-ai-systems',
    title: 'LLM & Agentic AI Systems',
    icon: 'lu:Bot',
    description:
      'Retrieval-augmented and tool-using LLM systems that ground answers in your own documents and data.',
    technologies: ['LangChain', 'LangGraph', 'RAG', 'Tool Calling', 'ChromaDB'],
  },
  {
    slug: 'computer-vision-solutions',
    title: 'Computer Vision Solutions',
    icon: 'lu:ScanEye',
    description:
      'Detection, tracking and classification pipelines that turn images and video into structured, reviewable events.',
    technologies: ['YOLO', 'ByteTrack', 'OpenCV', 'ViT', 'ResNet'],
  },
  {
    slug: 'backend-engineering-api-development',
    title: 'Backend Engineering & API Development',
    icon: 'lu:Server',
    description:
      'REST and WebSocket services that expose models and data to web apps, bots and other systems.',
    technologies: ['FastAPI', 'Flask', 'REST APIs', 'WebSockets', 'Redis', 'MongoDB'],
  },
  {
    slug: 'ai-automation-workflow-integration',
    title: 'AI Automation & Workflow Integration',
    icon: 'lu:Workflow',
    description:
      'Workflows that connect AI steps with APIs, notifications and business tools to remove repetitive manual work.',
    technologies: ['n8n', 'API Integration', 'AI Agent Workflows', 'Workflow Automation'],
  },
  {
    slug: 'machine-learning-model-optimization',
    title: 'Machine Learning & Model Optimization',
    icon: 'lu:Gauge',
    description:
      'Fine-tuning, knowledge distillation and self-supervised pretraining to make models smaller, faster and more accurate.',
    technologies: ['PyTorch', 'Hugging Face', 'Knowledge Distillation', 'Fine-tuning'],
  },
]

const rows = (items: string[]) => items.map((value) => ({ value }))

export const PROJECTS = [
  {
    slug: 'washcraft-property-maintenance',
    title: 'WashCraft Property Maintenance',
    period: 'Oct 2026 – Nov 2026',
    category: 'Full-stack · Lead generation',
    featured: true,
    tagline: 'A live marketing and lead-generation website with a built-in CMS for a Toronto property-maintenance company.',
    summary:
      'A production website for a residential and commercial property-maintenance company serving Toronto and the GTA. Visitors browse services and city pages and send quote requests, while the business manages its content and leads from an embedded Payload admin.',
    stack: ['Next.js', 'React', 'TypeScript', 'Payload CMS', 'PostgreSQL', 'Neon', 'Tailwind CSS', 'Zod', 'Playwright', 'Vercel'],
    githubUrl: 'https://github.com/Abir69-bot/WashCraft-Property-Maintenance-',
    demoUrl: 'https://www.washcraft.ca/',
    problem:
      'The business needed to turn visitors into qualified leads across many services and service areas, and could not afford to lose an enquiry when a database or notification service failed.',
    architecture:
      'A Next.js App Router application with Payload CMS embedded in the same codebase and Neon serverless Postgres behind it. Public pages are Server Components served statically and revalidated from CMS hooks, so visitors never wait on the database. Site photos and private customer files are kept in separate storage.',
    components: [
      { name: 'Page templates', detail: 'Service, category, city and service-in-city pages generated from CMS content, plus blog, FAQ, gallery, careers and commercial sections.' },
      { name: 'Quote system', detail: 'Quote forms and a multi-step wizard with dedicated flows and a pricing engine, controlled by feature switches in the admin.' },
      { name: 'Lead pipeline', detail: 'One path for every lead: save, retry, back up, then notify.' },
      { name: 'Admin', detail: 'Payload admin with a dashboard, lead management, drafts and role-based access.' },
      { name: 'SEO layer', detail: 'Shared metadata and JSON-LD builders with a generated sitemap.' },
    ],
    backend:
      'Next.js server actions validate each form with a Zod schema shared with the browser, check it for spam, and pass it to a single submitLead pipeline. Production schema changes go through committed migrations.',
    integrations: ['Twilio SMS', 'Resend email', 'Cloudflare R2', 'Cloudflare Turnstile', 'Google Places', 'Leaflet + OpenStreetMap', 'Google Tag Manager', 'Microsoft Clarity'],
    dataFlow: rows([
      'A visitor submits a form, which is validated in the browser and again on the server.',
      'Turnstile, a honeypot and a per-IP rate limit filter out spam.',
      'The lead is saved to the database first, with one retry.',
      'The owner is then notified by SMS and email; a failed notification is logged and the lead is flagged.',
      'If the database stays unreachable, the full lead is emailed to the owner and a JSON backup is written to R2.',
    ]),
    testing:
      'Vitest unit and integration tests, Playwright end-to-end tests with axe accessibility checks on desktop and mobile, and Lighthouse CI for performance.',
    deployment: 'Hosted on Vercel at washcraft.ca, with separate Neon branches for production and development.',
    challenges: rows([
      'Keeping a CMS-driven site fast by serving public pages without database calls at request time.',
      'Making sure a lead survives a database outage or a failed notification.',
    ]),
    decisions: rows([
      'Made every third-party service optional, with a fallback, so the site keeps working when a key is missing.',
      'Excluded sample testimonials, reviews and logos from production, so the site only shows real social proof.',
      'Loaded analytics only after cookie consent.',
    ]),
  },
  {
    slug: 'project-hearth',
    title: 'Project HEARTH',
    period: 'Nov 2026',
    category: 'AI Agent · Data Visualization',
    featured: true,
    tagline: 'Fire-safety intelligence for crewed space habitats, built with Team Polaris for the NASA Space Apps Challenge 2026.',
    summary:
      'HEARTH (Habitat Environment Analysis & Risk Tracking Hub) summarises, ranks and interprets NASA microgravity combustion experiments to give fire-safety insights for the ISS, a lunar base, pressurized rovers and spacesuits. Its AI crewmate, VESTA, is a tool-using agent whose tool results change what the dashboard shows.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'three.js', 'ECharts', 'Zustand', 'Zod', 'Python', 'Vitest', 'Vercel'],
    githubUrl: 'https://github.com/Abir69-bot/Project-HEARTH',
    demoUrl: 'https://project-hearth-five.vercel.app',
    problem:
      'NASA combustion results are spread across separate experiments, tables and documents, which makes them hard to apply to crew safety. HEARTH finds the most relevant investigations, extracts data for flammability modeling and highlights research for next-generation fire-safety equipment.',
    architecture:
      'A Python pipeline turns raw NASA files into processed JSON. A Next.js App Router application then serves data, physics, analysis, safety and search modules through API routes, with a streaming agent panel on every page.',
    components: [
      { name: 'Mission overview', detail: 'Mission status, KPI tiles, a 3D habitat relevance map of every test and an investigation ranking with visible score parts.' },
      { name: 'Test explorer and Compare', detail: 'Filterable tables and charts, source rows for each test, and side-by-side comparison of investigations.' },
      { name: 'Safety & gaps', detail: 'Six evidence-based rules, an O2 × pressure gap heatmap and the experiments that would fill each gap.' },
      { name: 'My data lab', detail: 'Enter your own conditions or upload a CSV that stays in the browser, then see a heuristic hazard index and the nearest tests.' },
      { name: 'Flame simulator', detail: 'Clearly labelled demo replays of real tests, drawn with WebGL. The flame is artwork steered by NASA results, not a combustion model.' },
      { name: 'VESTA agent', detail: 'Streaming answers with live tool steps, inline charts, source chips and a confidence tag.' },
    ],
    aiStack: ['Tool-using AI agent', 'Claude API', 'OpenRouter', 'Groq', 'Gemini', 'MiniSearch retrieval'],
    backend:
      'Next.js API routes expose the data and analysis modules, and streaming answers use server-sent events. VESTA has 11 tools with Zod schemas, shared by every model engine.',
    integrations: ['Anthropic API', 'OpenRouter', 'Groq', 'Google Gemini', 'NASA Physical Sciences Informatics data'],
    dataFlow: rows([
      'A Python script ingests raw NASA files from the ACME, CFI and SPICE investigations into one clean table.',
      'A user asks VESTA a question from any page.',
      'The agent calls tools to query data, search documents, run physics calculations or build charts.',
      'A grounding check confirms every number appears in a tool result or the user’s message.',
      'The answer streams back with sources and a confidence tag: supported, extrapolated or no_data.',
    ]),
    testing: 'Over 145 Vitest tests with mocked model providers, Python tests for data ingestion, and an evaluation script for the agent.',
    deployment: 'Hosted on Vercel. All API keys are optional and stay on the server.',
    challenges: rows([
      'Cleaning 889 raw rows into one table with units and sources, leaving 847 test points after 42 flagged duplicates are excluded from the statistics.',
      'Keeping model answers trustworthy: figures that cannot be verified are flagged and their confidence is lowered.',
      'Keeping the agent available when free model providers hit limits or fail.',
    ]),
    decisions: rows([
      'Built an engine chain across four model providers, ending in a rule-based offline mode that needs no AI, so a reply always arrives.',
      'Required every finding to carry a confidence tag and a source.',
      'Labelled simulated telemetry and heuristic scores clearly, and published the formulas behind them.',
    ]),
  },
  {
    slug: 'agentic-safety-security-surveillance-system',
    title: 'Agentic Safety & Security Surveillance System',
    period: 'Aug 2026 – Sep 2026',
    category: 'Computer Vision · Full-stack',
    featured: true,
    tagline: 'Video analysis that detects and tracks people and flags events for review.',
    summary:
      'A FastAPI and React video-analysis module using YOLO11s and ByteTrack for person detection and tracking, producing annotated videos, event summaries and email alerts for model-flagged events.',
    stack: ['Python', 'FastAPI', 'React.js', 'YOLO11s', 'ByteTrack', 'OpenCV'],
    githubUrl: 'https://github.com/Abir69-bot/Agentic-Safety-Security-Surveillance-System',
    demoUrl: 'https://security-surveillance-system.netlify.app/',
    problem:
      'Raw surveillance footage is slow to review by hand. The system turns video into annotated output and a short list of model-flagged events that a person can check.',
    architecture:
      'A React frontend talks to a FastAPI backend. The backend runs a computer-vision pipeline — YOLO11s for person detection and ByteTrack for multi-object tracking — and returns annotated video, event summaries and email alerts.',
    components: [
      { name: 'React frontend', detail: 'Interface for submitting video and reviewing results.' },
      { name: 'FastAPI service', detail: 'API layer that receives video and orchestrates analysis.' },
      { name: 'Detection & tracking pipeline', detail: 'YOLO11s person detection with ByteTrack tracking across frames.' },
      { name: 'Event reporting', detail: 'Annotated videos, event summaries and email alerts for flagged events.' },
    ],
    aiStack: ['YOLO11s', 'ByteTrack', 'Object Detection', 'Object Tracking'],
    backend: 'Python FastAPI backend exposing the video-analysis module to the React client.',
    integrations: ['REST API', 'Email alerts'],
    dataFlow: rows([
      'Video is submitted through the React frontend.',
      'FastAPI passes frames to YOLO11s for person detection.',
      'ByteTrack links detections into tracks across frames.',
      'Flagged events are summarised, the video is annotated and email alerts are sent.',
    ]),
    deployment: 'Live demo frontend hosted on Netlify.',
    decisions: rows([
      'Paired a single-stage detector (YOLO11s) with a dedicated tracker (ByteTrack) so detection and identity tracking stay separate, swappable components.',
    ]),
  },
  {
    slug: 'bangla-voice-assistant-for-online-forms',
    title: 'Bangla Voice Assistant for Online Forms',
    period: 'Jun 2026 – Jul 2026',
    category: 'LLM Application · Browser Extension',
    featured: true,
    tagline: 'Fill online forms by speaking Bangla or English.',
    summary:
      'A Chrome extension with Bangla and English voice input, LLM-based translation and automated form filling, with field validation, read-back verification, undo, session recovery and user-confirmed submission.',
    stack: ['JavaScript', 'Chrome Extension', 'LLM APIs', 'Speech Input'],
    githubUrl: 'https://github.com/Abir69-bot/Bangla-Voice-Assistant-for-Online-Forms',
    problem:
      'Online forms are hard to complete for people more comfortable speaking Bangla than typing English. The assistant lets them answer by voice while keeping them in control of what is submitted.',
    architecture:
      'A Chrome extension captures Bangla or English speech, uses an LLM to translate the answers, and fills the matching form fields. A set of safety controls wraps the filling step.',
    components: [
      { name: 'Voice input', detail: 'Bangla and English speech capture.' },
      { name: 'LLM translation', detail: 'Translates spoken answers into the form’s expected language.' },
      { name: 'Form-filling engine', detail: 'Maps answers onto page fields with field validation.' },
      { name: 'Safety controls', detail: 'Read-back verification, undo, session recovery and user-confirmed submission.' },
    ],
    aiStack: ['LLM-based translation', 'Speech input'],
    integrations: ['Chrome Extension APIs', 'LLM APIs'],
    dataFlow: rows([
      'The user speaks an answer in Bangla or English.',
      'The speech is transcribed and translated by an LLM.',
      'The answer is validated and filled into the matching field.',
      'The assistant reads the value back; the user can undo, and confirms before submitting.',
    ]),
    decisions: rows([
      'Kept a human in the loop: nothing is submitted without explicit user confirmation.',
      'Added read-back verification and undo so translation errors are caught before they reach the form.',
      'Implemented session recovery so a long form is not lost on interruption.',
    ]),
  },
  {
    slug: 'memeguard-ai',
    title: 'MemeGuard AI',
    period: 'Jan 2026 – Apr 2026',
    category: 'Multimodal AI · Full-stack',
    featured: true,
    tagline: 'Real-time multimodal hate-speech moderation for the web and Telegram.',
    summary:
      'A real-time multimodal hate-speech moderation platform using ResNet-18 and DistilBERT, with Flask, REST APIs and WebSockets for web and Telegram integration.',
    stack: ['Python', 'Flask', 'PyTorch', 'ResNet-18', 'DistilBERT', 'WebSockets', 'Telegram Bot'],
    githubUrl: 'https://github.com/Abir69-bot/MemeGuard_AI',
    demoUrl: 'https://memeguard.netlify.app/',
    problem:
      'Hateful memes combine text and images, so text-only or image-only filters miss them. MemeGuard analyses both together and moderates in real time.',
    architecture:
      'A hybrid model — ResNet-18 for the image and DistilBERT for the text — sits behind a Flask backend. The backend serves a responsive web app over REST APIs and WebSockets and powers an automated Telegram bot.',
    components: [
      { name: 'Hybrid multimodal model', detail: 'ResNet-18 visual features combined with DistilBERT text features.' },
      { name: 'Flask backend', detail: 'Processes text and image input over REST APIs and WebSockets.' },
      { name: 'Web app', detail: 'Responsive interface with instant moderation results.' },
      { name: 'Telegram bot', detail: 'Automated moderation that flags and removes violating content.' },
    ],
    aiStack: ['ResNet-18', 'DistilBERT', 'Multimodal classification'],
    backend: 'Flask backend handling text and image input over REST endpoints, with WebSockets for instant responses.',
    integrations: ['REST APIs', 'WebSockets', 'Telegram Bot API'],
    dataFlow: rows([
      'A meme (image + text) arrives from the web app or a Telegram chat.',
      'The Flask backend runs ResNet-18 on the image and DistilBERT on the text.',
      'The combined prediction is returned instantly over WebSockets.',
      'On Telegram, violating content is flagged and removed automatically.',
    ]),
    deployment: 'Live demo frontend hosted on Netlify.',
    decisions: rows([
      'Used WebSockets alongside REST so moderation results reach the user without polling.',
      'Shared one backend between the web app and the Telegram bot.',
    ]),
  },
  {
    slug: 'multidoc-ai',
    title: 'MultiDoc AI',
    period: 'Jul 2025 – Oct 2025',
    category: 'RAG · LLM Application',
    featured: true,
    tagline: 'Context-aware question answering over your own documents.',
    summary:
      'A RAG document question-answering system supporting PDF, DOCX, CSV and XLSX, integrating ChromaDB semantic retrieval with FastAPI for context-aware responses.',
    stack: ['Python', 'FastAPI', 'ChromaDB', 'Hugging Face Transformers', 'RAG'],
    githubUrl: 'https://github.com/Abir69-bot/MultiDoc_AI',
    problem:
      'Answers buried across many PDFs, Word files and spreadsheets are hard to find, and sending private documents to external APIs is not always acceptable.',
    architecture:
      'A FastAPI gateway normalises PDF, DOCX, CSV and XLSX inputs, chunks and embeds the content, and indexes it in a local ChromaDB vector store. Queries are resolved by semantic similarity search using local transformer models.',
    components: [
      { name: 'Ingestion gateway', detail: 'FastAPI endpoints that standardise multi-format documents.' },
      { name: 'Chunking & embedding', detail: 'Splits documents and converts them to dense vectors.' },
      { name: 'Vector store', detail: 'Local ChromaDB index for semantic retrieval.' },
      { name: 'Retrieval & answering', detail: 'Context-aware answers built from retrieved chunks.' },
    ],
    aiStack: ['RAG', 'Embeddings', 'Semantic search', 'Transformers'],
    backend: 'FastAPI service handling upload, ingestion and question-answering endpoints.',
    integrations: ['REST API', 'ChromaDB'],
    dataFlow: rows([
      'Documents (PDF, DOCX, CSV, XLSX) are uploaded to the FastAPI gateway.',
      'Content is extracted, chunked and embedded into dense vectors.',
      'Vectors are indexed in a local ChromaDB collection.',
      'A question retrieves the most similar chunks, which ground the response.',
    ]),
    decisions: rows([
      'Privacy-first, local design: documents are processed and indexed without external API exposure.',
      'One ingestion path for four file formats keeps retrieval logic format-agnostic.',
    ]),
  },
  {
    slug: 'megacloud-storage-management',
    title: 'MegaCloud Storage Management',
    category: 'Distributed Systems · Backend',
    featured: false,
    tagline: 'One logical storage space across Google Drive and Dropbox.',
    summary:
      'A virtualization layer that unifies Google Drive and Dropbox into one logical storage array, with chunked uploads across providers behind a unified REST API.',
    stack: ['Python', 'REST APIs', 'OAuth2', 'Google Drive API', 'Dropbox API'],
    githubUrl: 'https://github.com/Abir69-bot',
    architecture:
      'A virtualization layer sits over multiple cloud providers, applying dynamic access policies and exposing a single REST API. Files are chunked and streamed across heterogeneous targets, with metadata used to reconstruct them atomically.',
    components: [
      { name: 'Virtual storage layer', detail: 'Presents Google Drive and Dropbox as one storage array.' },
      { name: 'Chunking engine', detail: 'Streams file chunks across providers.' },
      { name: 'Metadata service', detail: 'Atomic reconstruction of files from their chunks.' },
      { name: 'Auth layer', detail: 'OAuth2 across Dropbox and Google service accounts.' },
    ],
    integrations: ['Google Drive API', 'Dropbox API', 'OAuth2', 'REST API'],
    challenges: rows(['Keeping file metadata consistent while chunks are spread across different providers.']),
  },
]

export const RESEARCH = [
  {
    slug: 'distilling-hate',
    shortTitle: 'Distilling-Hate',
    title: 'Distilling Hate: Lightweight Transformer Models for Fine-Grained Bengali Hate Speech Detection',
    context: 'Undergraduate Capstone Thesis',
    status: 'Published in PLOS ONE Journal',
    summary:
      'A lightweight Bengali hate-speech detector built by distilling BanglaBERT Large into a 13.7M-parameter student using cross-entropy, KL divergence and hidden-state alignment.',
    highlights: rows([
      'Distilled BanglaBERT Large (336.7M parameters) into a 13.7M-parameter student model.',
      'Adaptive joint loss combining supervised cross-entropy, KL divergence over softened logits and hidden-state MSE alignment.',
      'Evaluated on the BanglaMultiHate and BanTH benchmarks.',
    ]),
    metrics: [
      { value: '336.7M → 13.7M', label: 'Parameters, teacher → student' },
      { value: '96.8%', label: 'Fewer inference FLOPs' },
      { value: '0.5799', label: 'Macro-F1' },
    ],
    stack: ['PyTorch', 'Hugging Face Transformers', 'BanglaBERT', 'Knowledge Distillation'],
    githubUrl: 'https://github.com/Abir69-bot/Distilling-Hate',
  },
  {
    slug: 'jssl-gi',
    shortTitle: 'JSSL-GI',
    title: 'JSSL-GI: Joint Self-Supervised Learning for Multi-Category Gastrointestinal Endoscopy Image Classification',
    context: 'Research manuscript',
    status: 'Manuscript under review at IEEE Access',
    summary:
      'A joint self-supervised learning pipeline on an ImageNet-pretrained ViT-Small, combining masked-autoencoder reconstruction and multi-view contrastive learning with adaptive uncertainty-based loss weighting.',
    highlights: rows([
      'Joint objective: masked autoencoder reconstruction + multi-view contrastive learning.',
      'Adaptive, uncertainty-based weighting between the losses.',
      'Evaluated across 23 Hyper-Kvasir classes after 30 pretraining epochs.',
    ]),
    metrics: [
      { value: '92.00%', label: 'Accuracy' },
      { value: '67.30%', label: 'Macro-F1' },
      { value: '23', label: 'Hyper-Kvasir classes' },
    ],
    stack: ['PyTorch', 'Vision Transformers (ViT)', 'Self-Supervised Learning', 'Masked Autoencoders'],
    githubUrl: 'https://github.com/Abir69-bot/joint-ssl-endoscopy-classification',
  },
]

export const PROFILE = {
  name: 'Faisal Mahmud Abir',
  title: 'AI Software Engineer',
  headline: 'Building Intelligent Software That Solves Real-World Problems.',
  subtitle: 'AI Software Engineer | AI Agents | LLM Applications | Machine Learning | Full-Stack Development',
  heroDescription:
    'Computer Science and Engineering graduate focused on building intelligent, scalable software applications. Experienced in AI/ML development, computer vision, LLM-powered applications, backend engineering, and AI automation workflows.',
  location: 'Dhaka, Bangladesh',
  availability: 'Open to AI Software Engineer roles',
  aboutLead:
    'I’m an AI Software Engineer who works across the full lifecycle of AI applications — from architecture and Python development to model integration, APIs, testing and deployment.',
  aboutParagraphs: rows([
    'I studied Computer Science and Engineering at North South University. My projects put models inside complete software systems: a FastAPI and React video-analysis module with YOLO11s and ByteTrack, a RAG document assistant built on FastAPI and ChromaDB, a multimodal moderation platform serving both a web app and a Telegram bot, and a Chrome extension that fills forms from Bangla or English speech.',
    'My research — knowledge distillation for Bengali hate-speech detection and joint self-supervised learning for endoscopy image classification — shapes how I engineer AI products: measure carefully, keep models efficient, and evaluate before shipping.',
  ]),
  lifecycle: [
    { label: 'Software architecture', detail: 'Clear boundaries between UI, API, model and storage.' },
    { label: 'Python development', detail: 'Typed, modular Python for services and pipelines.' },
    { label: 'AI/ML model integration', detail: 'PyTorch and Hugging Face models behind real interfaces.' },
    { label: 'LLM & agent engineering', detail: 'RAG, tool calling and agent workflows.' },
    { label: 'Backend APIs & databases', detail: 'FastAPI, Flask, REST, WebSockets, SQL and NoSQL.' },
    { label: 'Frontend integration', detail: 'React and TypeScript interfaces for AI features.' },
    { label: 'AI automation', detail: 'n8n and API-driven workflows.' },
    { label: 'Testing & evaluation', detail: 'Pytest, integration tests, model and RAG evaluation.' },
    { label: 'Cloud deployment', detail: 'Docker, CI/CD, AWS and GCP.' },
  ],
  facts: [
    { label: 'Role', value: 'AI Software Engineer' },
    { label: 'Based in', value: 'Dhaka, Bangladesh' },
    { label: 'Degree', value: 'B.Sc. in Computer Science & Engineering' },
    { label: 'University', value: 'North South University' },
    { label: 'Publications', value: '1 published (PLOS ONE), 1 under review' },
    { label: 'Leadership', value: 'IEEE NSU IAS — Lead Coordinator' },
  ],
  photoUrl: '/photo.jpg',
  education: [
    { degree: 'B.Sc. in Computer Science and Engineering', school: 'North South University', period: 'Spring 2022 – Spring 2026' },
    { degree: 'Higher Secondary Certificate', school: 'Chittagong University College', period: '2020 – 2021' },
    { degree: 'Secondary School Certificate', school: 'Hathazari Parboti Govt. High School', period: '2017 – 2018' },
  ],
  leadership: [
    {
      role: 'Lead Coordinator',
      organization: 'IEEE NSU IAS Student Branch Chapter',
      period: '2023 – 2025',
      highlights: rows([
        'Led 24+ technical and professional development programs, coordinating logistics, budgets, speakers, sponsors and faculty as part of the Events & Management Team.',
        'Received the Best Lead Award (2024–2025) for leadership and team coordination.',
      ]),
    },
  ],
  email: 'faisalabir4121@gmail.com',
  phone: '+880 1787-474121',
  linkedinUrl: 'https://www.linkedin.com/in/faisal-mahmud-abir69',
  githubUrl: 'https://github.com/Abir69-bot',
  resumeUrl: '/resume.pdf',
  ctaHeading: 'Let’s build intelligent software together.',
  ctaText:
    'I’m looking for opportunities in AI Software Engineering, Computer Vision Research, and Full-Stack Development. I’m passionate about developing intelligent AI-powered applications, exploring Deep Learning and Computer Vision, and building scalable software solutions. Open to full-time roles, research opportunities, innovative projects, and collaborations.',
  seoTitle: 'Faisal Mahmud Abir | AI Software Engineer',
  seoDescription:
    'Explore the portfolio of Faisal Mahmud Abir, an AI Software Engineer building AI-powered applications, LLM agents, computer vision systems, backend APIs, and intelligent automation workflows.',
  seoKeywords: [
    'AI Software Engineer',
    'LLM Applications',
    'AI Agents',
    'Computer Vision',
    'FastAPI',
    'Machine Learning',
    'RAG',
    'Faisal Mahmud Abir',
  ],
}
