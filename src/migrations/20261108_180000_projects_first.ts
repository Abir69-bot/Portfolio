import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Data-only: shows WashCraft, then Project HEARTH, ahead of the other projects.
 * 'Zy' and 'Zz' sort before the first order key ('a0'). Runs once, so later reordering in the admin is kept.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`UPDATE \`projects\` SET \`_order\` = 'Zy' WHERE \`slug\` = 'washcraft-property-maintenance';`)
  await db.run(sql`UPDATE \`projects\` SET \`_order\` = 'Zz' WHERE \`slug\` = 'project-hearth';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`UPDATE \`projects\` SET \`_order\` = 'a5' WHERE \`slug\` = 'washcraft-property-maintenance';`)
  await db.run(sql`UPDATE \`projects\` SET \`_order\` = 'a6' WHERE \`slug\` = 'project-hearth';`)
}
