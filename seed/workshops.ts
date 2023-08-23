import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';

faker.locale = 'en_US';

/**
 * Populate coach
 * @returns Promise<string[]>
 */
export default async function populateWorkshops(client: PoolClient, ambassadorIds: string[], locationsIds: string[], eventIds: string[]): Promise<string[]> {
    const ids: string[] = [];

    // Delete existing data from coach table
    await client.query('DELETE FROM "workshop"');

    // Insert 100 fake coaches
    for (let i = 0; i < eventIds.length; i++) {
        const type = faker.helpers.arrayElement(['online', 'on-site']);

        const workshop = {
            name: faker.company.name(),
            description: faker.lorem.lines(1),
            ambassador_id: i%5 ? faker.helpers.arrayElement(ambassadorIds) : null,
            location_id: type === 'online' ? null : faker.helpers.arrayElement(locationsIds),
            occurring_date: faker.date.future(),
            type,
            status: faker.helpers.arrayElement(['pending-review', 'confirmed']),
            event_id: faker.helpers.arrayElement(eventIds),
        };

        const insertQuery = {
            text: 'INSERT INTO "workshop" (name, description, ambassador_id, location_id, occurring_date, type, status, event_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: Object.values(workshop),
        };

        const result: QueryResult<any> = await client.query(insertQuery);
        ids.push(result.rows[0].id.toString());
    }

    return ids;
}
