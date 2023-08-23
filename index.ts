import type {SslMode} from '@forestadmin/datasource-sql';
import {createSqlDataSource} from '@forestadmin/datasource-sql';
import type {Schema} from './typings';

import 'dotenv/config';
import {createAgent} from '@forestadmin/agent';

// This object allows to configure your Forest Admin panel
const agent = createAgent<Schema>({
  // Security tokens
  authSecret: process.env.FOREST_AUTH_SECRET!,
  envSecret: process.env.FOREST_ENV_SECRET!,

  // Make sure to set NODE_ENV to 'production' when you deploy your project
  isProduction: process.env.NODE_ENV === 'production',

  // Autocompletion of collection names and fields
  typingsPath: './typings.ts',
  typingsMaxDepth: 5,
});

// Connect your datasources
// All options are documented at https://docs.forestadmin.com/developer-guide-agents-nodejs/data-sources/connection
agent.addDataSource(
  createSqlDataSource({
    uri: process.env.DATABASE_URL,
    schema: process.env.DATABASE_SCHEMA,
    sslMode: process.env.DATABASE_SSL_MODE as SslMode,
  })
);

agent.customizeCollection('ambassador', collection => {
  collection.addField('nbrWorkshop', {
    dependencies: ['id'],
    columnType: 'Number',
    getValues: async (records, context) => {
      const workshops = await context.dataSource.getCollection('workshop');
      const ids = records.map(record => record.id);
      const rows = await workshops.aggregate({
        conditionTree: {
          field: 'ambassador_id',
          value: ids,
          operator: 'In',
        }
      }, {
        field: 'id',
        operation: 'Count',
        groups: [{ field: 'ambassador_id' }]
      });

      return records.map((record) => {
        const row = rows.find((r) => r.group.ambassador_id === record.id);
        return row?.value ?? 0;
      });
    }
  });
});

agent.customizeCollection('workshop', collection => {
  collection.addAction('Validate workshop', {
    scope: 'Bulk',
    execute: async (context, resultBuilder) =>  {
      try {
        const ids = await context.getRecordIds();

        await context.collection.update({
          conditionTree: {
            field: 'id',
            operator: 'In',
            value: ids,
          }
        }, {
          status: 'confirmed',
        });

        return resultBuilder.success('The workshops have been validated');
      } catch (e) {
        console.error(e);
        return resultBuilder.error(e.message);
      }
    }
  })

  collection.addField('ambassador_check', {
    columnType: 'String',
    dependencies: ['ambassador_id'],
    getValues(records) {
      return records.map((record) => {
        if (record.ambassador_id) {
          return '🟢 1 / 1';
        } else {
          return '🔴 0 / 1';
        }
      })
    }
  });

  collection
    .importField('programId', {
      path: 'event:program:id',
    })
    .addManyToOneRelation('program', 'program', { foreignKey: 'programId'});

  collection.addAction('Add yourself in workshops', {
    scope: 'Bulk',
    execute: async (context, resultBuilder) =>  {
      try {
        const workshops = await context.getRecords(['id', 'ambassador_id']);

        if (workshops.some(workshop => workshop.ambassador_id)) {
          return resultBuilder.error('An ambassador is already present in one of workshops, please contact him to switch first.');
        }

        const [ambassador] = await context.dataSource.getCollection('ambassador').list({
          conditionTree: {
            field: 'email',
            operator: 'Equal',
            value: context.caller.email,
          }
        }, ['id']);

        if (!ambassador) {
          return resultBuilder.error('You are not an ambassador yet, please request an ambassador account from your admins.');
        }

        const workshopIds = workshops.map(workshop => workshop.id);

        await context.collection.update({
          conditionTree: {
            field: 'id',
            operator: 'In',
            value: workshopIds,
          }
        }, {
          ambassador_id: ambassador.id,
        });

        return resultBuilder.success('You are now the ambassador of selected workshops.');

      } catch (e) {
        console.error(e);
        return resultBuilder.error(e.message);
      }
    }
  });

  collection.addAction('Remove yourself from workshops', {
    scope: 'Bulk',
    execute: async (context, resultBuilder) => {
      try {
        const workshops = await context.getRecords(['id', 'ambassador_id']);
        const [ambassador] = await context.dataSource.getCollection('ambassador').list({
          conditionTree: {
            field: 'email',
            operator: 'Equal',
            value: context.caller.email,
          }
        }, ['id']);

        if (workshops.some(workshop => workshop.ambassador_id !== ambassador.id)) {
          return resultBuilder.error('You can not remove another ambassador than you from a workshop.');
        }

        const workshopIds = workshops.map(workshop => workshop.id);

        await context.collection.update({
          conditionTree: {
            field: 'id',
            operator: 'In',
            value: workshopIds,
          }
        }, {
          ambassador_id: null,
        });

        return resultBuilder.success('You are not longer ambassador of selected workshops.');
      } catch (e) {
        console.error(e);
        return resultBuilder.error(e.message);
      }
    },
  });

  collection.addAction('Register as observator', {
    scope: 'Bulk',
    execute: async (context, resultBuilder) => {
      try {
        const workshops = await context.getRecords(['id', 'observator_id']);

        if (workshops.some(workshop => workshop.observator_id)) {
          return resultBuilder.error('An observator is already present in one of workshops, please contact him to switch first.');
        }

        const [ambassador] = await context.dataSource.getCollection('ambassador').list({
          conditionTree: {
            field: 'email',
            operator: 'Equal',
            value: context.caller.email,
          }
        }, ['id']);

        if (!ambassador) {
          return resultBuilder.error('You are not an ambassador yet, please request an ambassador account from your admins.');
        }

        const workshopIds = workshops.map(workshop => workshop.id);

        await context.collection.update({
          conditionTree: {
            field: 'id',
            operator: 'In',
            value: workshopIds,
          }
        }, {
          observator_id: ambassador.id,
        });

        return resultBuilder.success('You are now observator of selected workshops.');

      } catch (e) {
        console.error(e);
        return resultBuilder.error(e.message);
      }
    },
  });

});

// Expose an HTTP endpoint.
agent.mountOnStandaloneServer(Number(process.env.APPLICATION_PORT));

// Start the agent.
agent.start().catch(error => {
  console.error('\x1b[31merror:\x1b[0m Forest Admin agent failed to start\n');
  console.error('');
  console.error(error.stack);
  process.exit(1);
});
