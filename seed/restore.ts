import { faker } from '@faker-js/faker';

import * as fs from 'fs';
import type { PoolClient } from 'pg';
import path from 'path';

faker.locale = 'en_US';

/**
 * Populate attendance
 * @returns Promise<string[]>
 */
export default async function restore(client: PoolClient): Promise<void> {
  const sql = fs.readFileSync(path.resolve(__dirname, './init.sql')).toString();
  await client.query(sql)
}
