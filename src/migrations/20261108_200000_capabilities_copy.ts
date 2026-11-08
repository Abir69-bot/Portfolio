import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

type CardCopy = { title: string; description: string; technologies: string[] }

const CARDS: { slug: string; before: CardCopy; after: CardCopy }[] = [
  {
    slug: 'full-stack-web-development',
    before: {
      title: 'Full-Stack Web Development',
      description:
        'Complete websites and web apps, from a responsive frontend to the API, database and deployment — with AI features built in where they help.',
      technologies: ['React.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'REST APIs', 'Docker'],
    },
    after: {
      title: 'Full-Stack Web Development',
      description: 'Modern websites, responsive web applications, dashboards, and scalable full-stack solutions.',
      technologies: ['React.js', 'TypeScript', 'Next.js', 'PostgreSQL', 'REST APIs', 'Docker'],
    },
  },
  {
    slug: 'llm-agentic-ai-systems',
    before: {
      title: 'LLM & Agentic AI Systems',
      description:
        'Retrieval-augmented and tool-using LLM systems that ground answers in your own documents and data.',
      technologies: ['LangChain', 'LangGraph', 'RAG', 'Tool Calling', 'ChromaDB'],
    },
    after: {
      title: 'LLM & Agentic AI Systems',
      description: 'Intelligent AI applications, RAG pipelines, AI agents, and LLM-powered automation.',
      technologies: ['LangChain', 'LangGraph', 'RAG', 'Tool Calling', 'ChromaDB'],
    },
  },
  {
    slug: 'computer-vision-solutions',
    before: {
      title: 'Computer Vision Solutions',
      description:
        'Detection, tracking and classification pipelines that turn images and video into structured, reviewable events.',
      technologies: ['YOLO', 'ByteTrack', 'OpenCV', 'ViT', 'ResNet'],
    },
    after: {
      title: 'Computer Vision & AI Research',
      description:
        'Deep learning research, image classification, object detection, object tracking, and vision transformers.',
      technologies: ['PyTorch', 'OpenCV', 'YOLO', 'ByteTrack', 'ViT', 'ResNet'],
    },
  },
  {
    slug: 'backend-engineering-api-development',
    before: {
      title: 'Backend Engineering & API Development',
      description: 'REST and WebSocket services that expose models and data to web apps, bots and other systems.',
      technologies: ['FastAPI', 'Flask', 'REST APIs', 'WebSockets', 'Redis', 'MongoDB'],
    },
    after: {
      title: 'Backend Engineering & APIs',
      description: 'Backend services, REST APIs, database integration, and scalable application architectures.',
      technologies: ['FastAPI', 'Flask', 'PostgreSQL', 'Redis', 'MongoDB'],
    },
  },
  {
    slug: 'ai-automation-workflow-integration',
    before: {
      title: 'AI Automation & Workflow Integration',
      description:
        'Workflows that connect AI steps with APIs, notifications and business tools to remove repetitive manual work.',
      technologies: ['n8n', 'API Integration', 'AI Agent Workflows', 'Workflow Automation'],
    },
    after: {
      title: 'AI-Powered ERP & SaaS Platforms',
      description:
        'Interested in building intelligent business management platforms, CRM systems, workflow automation, and cloud-based SaaS applications.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'REST APIs', 'AWS'],
    },
  },
  {
    slug: 'machine-learning-model-optimization',
    before: {
      title: 'Machine Learning & Model Optimization',
      description:
        'Fine-tuning, knowledge distillation and self-supervised pretraining to make models smaller, faster and more accurate.',
      technologies: ['PyTorch', 'Hugging Face', 'Knowledge Distillation', 'Fine-tuning'],
    },
    after: {
      title: 'Machine Learning & Deep Learning',
      description:
        'Model development, fine-tuning, knowledge distillation, self-supervised learning, and performance optimization.',
      technologies: ['PyTorch', 'Hugging Face', 'Scikit-learn', 'Knowledge Distillation', 'Fine-tuning'],
    },
  },
]

/** Swaps a card's copy, but only if it still has the expected title and description (edits in the admin are kept). */
const swapCopy = async (db: MigrateUpArgs['db'], slug: string, from: CardCopy, to: CardCopy) => {
  const isUnedited = sql`\`slug\` = ${slug} AND \`title\` = ${from.title} AND \`description\` = ${from.description}`
  await db.run(
    sql`DELETE FROM \`capabilities_texts\` WHERE \`path\` = 'technologies' AND \`parent_id\` IN (SELECT \`id\` FROM \`capabilities\` WHERE ${isUnedited});`,
  )
  for (const [index, tech] of to.technologies.entries()) {
    await db.run(
      sql`INSERT INTO \`capabilities_texts\` (\`order\`, \`parent_id\`, \`path\`, \`text\`) SELECT ${index + 1}, \`id\`, 'technologies', ${tech} FROM \`capabilities\` WHERE ${isUnedited};`,
    )
  }
  await db.run(sql`UPDATE \`capabilities\` SET \`title\` = ${to.title}, \`description\` = ${to.description} WHERE ${isUnedited};`)
}

/** Data-only: updates the "What I Build" card copy. Slugs, icons and order stay the same. */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const card of CARDS) await swapCopy(db, card.slug, card.before, card.after)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const card of CARDS) await swapCopy(db, card.slug, card.after, card.before)
}
