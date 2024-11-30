/* eslint-disable indent */
  export default {
      menu: {
        data: {
            children: {
                source_codes: {
                    title: 'Source Codes',
                    icon: 'forklift',
                    url: '/source_codes',
                },
            },
        },
      },
      routes: {
        source_codes: {
          layout: 'full_width',
          components: {
              main: [
                  {
                      component: 'RecordTable',
                      properties: {
                        title: 'Source Codes',
                          table: 'source_code_summary',
                          columns: [
                              {
                                  title: 'Source Code',
                                  name: 'source_code',
                                  sorter: true,
                                  template: '{{record.source_code}}',
                              },
                              {
                                title: 'Channel',
                                name: 'source_code_channel',
                                sorter: true,
                            },
                            {
                                title: 'Revenue',
                                name: 'revenue',
                                sorter: true,
                            },
                            {
                                title: 'Spend',
                                name: 'spend',
                                sorter: true,
                            },
                          ],
                      },
                  },
              ],
          },
      },
      },
  };
