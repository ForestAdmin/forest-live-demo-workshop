import type { PoolClient } from "pg";

import populateWorkshops from "./workshops";
import populateAmbassadors from "./ambassadors";
import populateUsers from "./users";
import populateLocations from "./locations";
import populateProgram from "./program";

import pool from './database';
import restore from "./restore";
import populateEvent from "./event";

(async () => {
  console.log('Connection..');
  const client: PoolClient = await pool.connect()

  try {
    console.log('Starting populate the database...');

    console.log('Restoring schema..');
    await restore(client);
    console.log('Writing locations..');
    const locationIds = await populateLocations(client);
    console.log('Writing users..');
    const userIds = await populateUsers(client);
    console.log('Writing program..');
    const programIds = await populateProgram(client, userIds);
    console.log('Writing ambassadors..');
    const ambassadorIds = await populateAmbassadors(client, programIds);
    console.log('Writing events..');
    const eventIds = await populateEvent(client, programIds, userIds);
    console.log('Writing workshops..');
    await populateWorkshops(client, ambassadorIds, locationIds, eventIds);

    console.log(' the database has been populated ! 👏');
  } catch (err) {
    console.error('Error while populating the database:', err);
  } finally {
    client.release();
    await pool.end();
  }
})();
