import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';

faker.locale = 'en_US';

/**
 * Populate attendance
 * @returns Promise<string[]>
 */
export default async function populateUsers(client: PoolClient): Promise<string[]> {
    const ids: string[] = [];

    // Delete existing data from attendance table
    await client.query('DELETE FROM "user"');

    // Insert 300 fake attendance
    for (let i = 0; i < 300; i++) {
        const user = {
            firstname: faker.name.firstName(),
            lastname: faker.name.firstName(),
            email: faker.internet.email(),
            birthdate: faker.date.birthdate(),
            role: faker.name.jobTitle(),
        };

        const insertQuery = {
            text: 'INSERT INTO "user" (firstname, lastname, email, birthdate, role) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            values: Object.values(user),
        };

        const result: QueryResult<any> = await client.query(insertQuery);
        ids.push(result.rows[0].id.toString());
    }

    return ids;
}
