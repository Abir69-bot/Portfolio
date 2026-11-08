import * as migration_20261108_090036_initial from './20261108_090036_initial';

export const migrations = [
  {
    up: migration_20261108_090036_initial.up,
    down: migration_20261108_090036_initial.down,
    name: '20261108_090036_initial'
  },
];
