import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

const OLD_TEXT =
  'I’m looking for AI Software Engineer opportunities — building LLM applications, AI agents, computer vision systems and the backends that run them. Reach out about a role, a project or a collaboration.'
const NEW_TEXT =
  'I’m looking for opportunities in AI Software Engineering, Computer Vision Research, and Full-Stack Development. I’m passionate about developing intelligent AI-powered applications, exploring Deep Learning and Computer Vision, and building scalable software solutions. Open to full-time roles, research opportunities, innovative projects, and collaborations.'

/** Data-only: updates the Contact text, unless it has since been edited in the admin. */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`UPDATE \`profile\` SET \`cta_text\` = ${NEW_TEXT} WHERE \`cta_text\` = ${OLD_TEXT};`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`UPDATE \`profile\` SET \`cta_text\` = ${OLD_TEXT} WHERE \`cta_text\` = ${NEW_TEXT};`)
}
