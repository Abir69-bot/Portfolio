import * as migration_20261108_090036_initial from './20261108_090036_initial';
import * as migration_20261108_180000_projects_first from './20261108_180000_projects_first';
import * as migration_20261108_190000_contact_text from './20261108_190000_contact_text';
import * as migration_20261108_200000_capabilities_copy from './20261108_200000_capabilities_copy';
import * as migration_20261109_100000_hero_description from './20261109_100000_hero_description';
import * as migration_20261109_110000_dedupe_capability_badges from './20261109_110000_dedupe_capability_badges';

export const migrations = [
  {
    up: migration_20261108_090036_initial.up,
    down: migration_20261108_090036_initial.down,
    name: '20261108_090036_initial'
  },
  {
    up: migration_20261108_180000_projects_first.up,
    down: migration_20261108_180000_projects_first.down,
    name: '20261108_180000_projects_first'
  },
  {
    up: migration_20261108_190000_contact_text.up,
    down: migration_20261108_190000_contact_text.down,
    name: '20261108_190000_contact_text'
  },
  {
    up: migration_20261108_200000_capabilities_copy.up,
    down: migration_20261108_200000_capabilities_copy.down,
    name: '20261108_200000_capabilities_copy'
  },
  {
    up: migration_20261109_100000_hero_description.up,
    down: migration_20261109_100000_hero_description.down,
    name: '20261109_100000_hero_description'
  },
  {
    up: migration_20261109_110000_dedupe_capability_badges.up,
    down: migration_20261109_110000_dedupe_capability_badges.down,
    name: '20261109_110000_dedupe_capability_badges'
  },
];
