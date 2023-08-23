import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';

faker.locale = 'en_US';

/**
 * Populate comment
 * @returns Promise<string[]>
 */
export default async function populateAmbassadors(client: PoolClient, programIds: string[]): Promise<string[]> {
    const ids: string[] = [];

    // Delete existing data from comment table
    await client.query('DELETE FROM "ambassador"');

    for (let i = 0; i < 100; i++) {
        const spentDays = Number(faker.random.numeric(2));
        const ambassador = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            picture: faker.image.avatar(),
            birthdate: faker.date.birthdate(),
            professional_phone: faker.phone.number(),
            manager_firstname: faker.name.firstName(),
            manager_lastname: faker.name.lastName(),
            manager_mail: faker.internet.email(),
            days_spent: spentDays,
            remaning_days: spentDays - Number(faker.random.numeric()),
            professional_postal_code: faker.address.zipCode(),
            professional_city: faker.address.city(),
            entity: faker.helpers.arrayElement(['communication', 'brand_commitment', 'digital']),
            do_zone: faker.helpers.arrayElement(['grand_ouest', 'nord', 'sud']),
            inerested_program_id: faker.helpers.arrayElement(programIds),
            address: `${faker.address.zipCode()}, ${faker.address.city()}, ${faker.address.country()}`,
            animation_preferences: faker.lorem.sentence(),
            alternant: !Boolean(i%5),
        };

        const insertQuery = {
            text: 'INSERT INTO "ambassador" (firstname, lastname, email, picture, birthdate, professional_phone, manager_firstname, manager_lastname, manager_mail, days_spent, remaning_days, professional_postal_code, professional_city, entity, do_zone, inerested_program_id, address, animation_preferences, alternant) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING id',
            values: Object.values(ambassador),
        };

        const result: QueryResult<any> = await client.query(insertQuery);
        ids.push(result.rows[0].id.toString());
    }

    return ids;
}
