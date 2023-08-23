import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';

faker.locale = 'en_US';

/**
 * Populate attendance
 * @returns Promise<string[]>
 */
export default async function populateEvent(client: PoolClient, programIds: string[], userIds: string[]): Promise<string[]> {
    const ids: string[] = [];

    // Delete existing data from attendance table
    await client.query('DELETE FROM "event"');

    // Insert 300 fake attendance
    for (let i = 0; i < programIds.length * 2; i++) {
        const event = {
          name: `${faker.commerce.department()} ${faker.lorem.word()}`,
          teaser: faker.lorem.sentence(),
          program_id: faker.helpers.arrayElement(programIds),
          owner_id: faker.helpers.arrayElement(userIds),
          requirements: faker.lorem.words(),
          price: faker.commerce.price(),
        };

        const insertQuery = {
            text: 'INSERT INTO "event" (name, teaser, program_id, owner_id, requirements, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            values: Object.values(event),
        };

        const result: QueryResult<any> = await client.query(insertQuery);
        ids.push(result.rows[0].id.toString());
    }

    return ids;
}
