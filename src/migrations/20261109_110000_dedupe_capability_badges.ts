import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Data-only: removes duplicate "What I Build" badges, keeping the first row of each.
 * The copy migration ran on two server instances at once and interleaved its inserts. This is one
 * atomic statement that is safe to repeat, so running it concurrently cannot cause the same problem.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    DELETE FROM \`capabilities_texts\`
    WHERE \`path\` = 'technologies'
      AND \`id\` NOT IN (
        SELECT MIN(\`id\`) FROM \`capabilities_texts\` WHERE \`path\` = 'technologies' GROUP BY \`parent_id\`, \`text\`
      );
  `)
}

/** Nothing to restore: the duplicates were never intended. */
export async function down(_args: MigrateDownArgs): Promise<void> {}
