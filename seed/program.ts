import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';

faker.locale = 'en_US';

export default async function populateProgram(client: PoolClient, userIds: string[]): Promise<string[]> {
    const ids: string[] = [];

    // Delete existing data from attendance table
    await client.query('DELETE FROM "program"');

    const programNames = ['ateliersnumeriques', 'supercodeurs', 'propme', 'femmesentrepreneuses', 'magiciens', 'Visite', 'atelierspartenaires', 'Ateliers-jeunes', 'camion-orange', 'benefices-fibre', 'animation-rse-b2b', 'ambassadeursdigitaux', 'RDV-Stand-Orange', 'animationsalariesenligne', 'fibre-Champagne-Ardenne', 'ateliersmultiservice', 'Alarencontredespros', 'La-fibre-en-digital', 'La-fibre-a-domicile', 'Forum-fibre', 'RDV-stand-Fibre', 'reemploi_mobilier', 'Caraibes-Guyane', 'Maurice', 'UIOC', 'Decouvrir-lafibre-expert-Orange', 'RDVPRO', 'formation_UISO_PR', 'oc', 'Innovations', 'archive', 'ete_connecte', 'decouverte', 'environnement'];

    // Insert 300 fake attendance
    for (let i = 0; i < programNames.length; i++) {
        const program = {
            name: programNames[i],
            description: faker.lorem.sentence(),
            owner_id: faker.helpers.arrayElement(userIds),
        };

        const insertQuery = {
            text: 'INSERT INTO "program" (name, description, owner_id) VALUES ($1, $2, $3) RETURNING id',
            values: Object.values(program),
        };

        const result: QueryResult<any> = await client.query(insertQuery);
        ids.push(result.rows[0].id.toString());
    }

    return ids;
}
