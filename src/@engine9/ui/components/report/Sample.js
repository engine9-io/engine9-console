export default function Sample() {
  return {
    description: 'An overview of data in the timeline',
    include_date: true,
    label: 'Person Count By Month',
    template: 'primary',
    data_sources: {
      default: {
        table: 'person',
        date_field: 'ts',
      },
    },
    components: {
      aTitle: 'Count of People by Month Created',
      a0: {
        component: 'BarChart',
        properties: {
          is_date: true,
          dimension: {
            label: 'Month',
            eql: 'MONTH(created_at)',
          },
          metrics: [
            {
              label: 'People',
              eql: 'count(*)',
            },
          ],
          conditions: [],
          table: 'person',
          sql: 'select\nDATE(DATE_ADD(LAST_DAY(DATE_SUB(person.created_at, interval 31 day)), interval 1 day)) as dimension_name,\ncount(*) as People\nfrom person\ngroup by DATE(DATE_ADD(LAST_DAY(DATE_SUB(person.created_at, interval 31 day)), interval 1 day)) limit 1000',
          data: [
            {
              dimension_name: '2000-01-01T00:00:00.000Z',
              People: 18299,
            },
            {
              dimension_name: '2023-04-01T00:00:00.000Z',
              People: 5,
            },
            {
              dimension_name: '2023-05-01T00:00:00.000Z',
              People: 4401,
            },
            {
              dimension_name: '2023-06-01T00:00:00.000Z',
              People: 3432,
            },
            {
              dimension_name: '2023-07-01T00:00:00.000Z',
              People: 12403,
            },
            {
              dimension_name: '2023-08-01T00:00:00.000Z',
              People: 21301,
            },
            {
              dimension_name: '2023-09-01T00:00:00.000Z',
              People: 27087,
            },
            {
              dimension_name: '2023-10-01T00:00:00.000Z',
              People: 1525,
            },
            {
              dimension_name: '2023-11-01T00:00:00.000Z',
              People: 1316,
            },
            {
              dimension_name: '2023-12-01T00:00:00.000Z',
              People: 660,
            },
            {
              dimension_name: '2024-01-01T00:00:00.000Z',
              People: 905,
            },
            {
              dimension_name: '2024-02-01T00:00:00.000Z',
              People: 745,
            },
            {
              dimension_name: '2024-03-01T00:00:00.000Z',
              People: 336,
            },
            {
              dimension_name: '2024-04-01T00:00:00.000Z',
              People: 389621,
            },
            {
              dimension_name: '2024-05-01T00:00:00.000Z',
              People: 381732,
            },
            {
              dimension_name: '2024-06-01T00:00:00.000Z',
              People: 232079,
            },
            {
              dimension_name: '2024-07-01T00:00:00.000Z',
              People: 26679,
            },
            {
              dimension_name: '2024-08-01T00:00:00.000Z',
              People: 2960,
            },
            {
              dimension_name: '2024-09-01T00:00:00.000Z',
              People: 5024,
            },
            {
              dimension_name: '2024-10-01T00:00:00.000Z',
              People: 6491,
            },
            {
              dimension_name: '2024-11-01T00:00:00.000Z',
              People: 1093,
            },
          ],
        },
      },
      a1: {

        component: 'Scorecard',
        properties: {
          table: 'dual',
          metrics: [
            {
              label: 'sleep_1',
              eql: 'sleep(1)',
            },
          ],
          sql: 'select\nsleep(1) as sleep_1\nfrom dual limit 1000',
          data: [
            {
              sleep_1: 0,
            },
          ],
        },
      },
      a2: {
        component: 'Scorecard',
        properties: {
          table: 'dual',
          metrics: [
            {
              label: 'sleep_2',
              eql: 'sleep(1)',
            },
          ],
          conditions: [],
          sql: 'select\nsleep(1) as sleep_2\nfrom dual limit 1000',
          data: [
            {
              sleep_2: 0,
            },
          ],
        },
      },
    },
  };
}
