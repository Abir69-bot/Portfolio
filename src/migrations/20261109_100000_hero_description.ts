import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

const OLD_TEXT =
  'Computer Science and Engineering graduate focused on building intelligent, scalable software applications. Experienced in AI/ML development, computer vision, LLM-powered applications, backend engineering, and AI automation workflows.'
const NEW_TEXT =
  'Computer Science and Engineering graduate specializing in AI Software Engineering, Machine Learning, and Computer Vision. Experienced in developing AI-powered applications, deep learning models, LLM-based solutions, and scalable backend systems. Passionate about building intelligent software, full-stack applications, and AI-driven automation solutions that solve real-world problems.'

/** Data-only: updates the hero description, unless it has since been edited in the admin. */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`UPDATE \`profile\` SET \`hero_description\` = ${NEW_TEXT} WHERE \`hero_description\` = ${OLD_TEXT};`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`UPDATE \`profile\` SET \`hero_description\` = ${OLD_TEXT} WHERE \`hero_description\` = ${NEW_TEXT};`)
}
