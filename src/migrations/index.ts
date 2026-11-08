import * as migration_20261108_090036_initial from './20261108_090036_initial';
import * as migration_20261108_180000_projects_first from './20261108_180000_projects_first';

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
];
