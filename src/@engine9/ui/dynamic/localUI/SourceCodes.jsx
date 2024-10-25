/* eslint-disable indent */
  export default {
      routes: {
        source_codes: {
          layout: 'full_width',
          components: {
              header: [
                  'Source Codes',
              ],
              main: [
                  {
                      component: 'RecordTable',
                      properties: {
                          table: 'source_code_summary',
                          columns: [
                              {
                                  title: 'Source Code',
                                  dataIndex: 'source_code',
                                  sorter: true,
                                  template: '{{record.source_code}}',
                                  width: '40%',
                              },
                          ],
                      },
                  },
              ],
          },
      },
      },
  };
