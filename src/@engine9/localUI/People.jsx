/* eslint-disable indent */
  export default {
    routes: {
      person: {
          layout: 'full_width',
          components: {
              header: [
                  'Everybody',
                  {
                      component: 'Button',
                      properties: {
                          icon: 'plus',
                          content: 'Add Person',
                          onClick: {
                              action: 'navigate',
                              url: '/person/create',
                          },
                      },
                  },
              ],
              main: [
                  {
                      component: 'RecordTable',
                      properties: {
                          table: 'person',
                          include: {
                              emails: {
                                  table: 'person_email',
                              },
                          },
                          columns: [
                              {
                                  title: 'Name',
                                  dataIndex: 'name',
                                  sorter: true,
                                  template: '{{record.given_name}} {{record.family_name}} {{record.emails.0.email}}',
                                  width: '40%',
                              },
                              {
                                  title: 'Email',
                                  template: '{{emails.0.email}}',
                                  width: '40%',
                              },
                          ],
                          onRecord: {
                              onClick: {
                                  action: 'navigate',
                                  url: '/person/{{record.id}}',
                              },
                          },
                      },
                  },
              ],
          },
      },
      'person/create': {
          layout: 'full_width',
          components: {
              main: [
                  {
                      path: 'edit',
                      component: 'RecordForm',
                      properties: {
                          table: 'person',
                          form: {
                              title: 'Todo',
                              type: 'object',
                              required: [],
                              properties: {
                                  given_name: {
                                      type: 'string',
                                      title: 'First Name',
                                      default: '',
                                  },
                                  family_name: {
                                      type: 'string',
                                      title: 'Last Name',
                                      default: '',
                                  },
                              },
                          },
                          uiSchema: {
                              family_name: {
                                  'ui:widget': 'textarea',
                              },
                          },
                          onSave: {
                              action: 'navigate',
                              url: '/person/{{record.id}}',
                          },
                      },
                  },
              ],
          },
      },
      'person/:id/*': {
          layout: 'tabs',
          components: {
              header: [
                  {
                      component: 'RecordDisplay',
                      properties: {
                          table: 'person',
                          id: '{{parameters.id}}',
                          include: {
                              emails: {
                                  table: 'person_email',
                                  orderBy: 'preference_order',
                              },
                          },
                          template: '{{given_name}} {{family_name}} {{#if emails.0.email}}<{{emails.0.email}}>{{/if}}',
                      },
                  },
              ],
              tabs: {
                  review: {
                      label: 'Review',
                      children: {
                          component: 'RecordDisplay',
                          properties: {
                              table: 'person',
                              id: '{{parameters.id}}',
                              template: '{{given_name}} {{family_name}}',
                          },
                      },
                  },
                  edit: {
                      label: 'Contact Info',
                      children: {
                          component: 'RecordForm',
                          properties: {
                              table: 'person',
                              id: '{{parameters.id}}',
                              form: {
                                  title: 'Todo',
                                  type: 'object',
                                  required: [],
                                  properties: {
                                      given_name: {
                                          type: 'string',
                                          title: 'First Name',
                                          default: '',
                                      },
                                      family_name: {
                                          type: 'string',
                                          title: 'Last Name',
                                          default: '',
                                      },
                                  },
                              },
                          },
                      },
                  },
                  emails: {
                      children: {
                          label: 'Emails',
                          component: 'RecordTable',
                          properties: {
                              table: 'person_email',
                              conditions: [
                                  {
                                      eql: 'person_id={{parameters.id}}',
                                  },
                              ],
                              columns: [
                                  {
                                      title: 'Id',
                                      dataIndex: 'id',
                                      sorter: true,
                                      width: '20%',
                                  },
                                  {
                                      title: 'Email',
                                      template: '{{email}}',
                                      width: '40%',
                                  },
                                  {
                                      title: 'Type',
                                      template: '{{type}}',
                                      width: '10%',
                                  },
                                  {
                                      title: 'Subscription Status',
                                      template: '{{subscription_status}}',
                                      width: '15%',
                                  },
                                  {
                                      title: 'Modified',
                                      template: '{{date modified_at}}',
                                      width: '15%',
                                  },
                              ],
                          },
                      },
                  },
                  address: {
                      children: {
                          label: 'Addresses',
                          component: 'RecordDisplay',
                          properties: {
                              table: 'person_address',
                              conditions: [
                                  {
                                      eql: 'person_id={{person_id}}',
                                  },
                              ],
                              rows: [
                                  '{{street}}',
                              ],
                          },
                      },
                  },
                  phones: {
                      children: {
                          label: 'Phones',
                          component: 'RecordDisplay',
                          properties: {
                              table: 'person_phone',
                              conditions: [
                                  {
                                      eql: 'person_id={{person_id}}',
                                  },
                              ],
                              rows: [
                                  '{{phone}}',
                                  '{{phone_type}}',
                              ],
                          },
                      },
                  },
                  segments: {
                        label: 'Segments',
                        children: [
                            {
                              label: 'Segments',
                              component: 'RecordTable',
                              properties: {
                                  table: 'person_segment',
                                  include: {
                                      segments: {
                                          table: 'segment',
                                      },
                                  },
                                  conditions: [
                                      {
                                          eql: 'person_id={{parameters.person_id}}',
                                      },
                                  ],
                                  rows: [
                                      '{{segment}}',
                                  ],
                              },
                          }],
                      },
                  },
          },
      },
      '/segments': {
          layout: 'full_width',
          components: {
              header: [
                  'Segments',
                  {
                      component: 'Button',
                      properties: {
                          icon: 'plus',
                          content: 'Create Segment',
                          onClick: {
                              action: 'navigate',
                              url: '/segments/create',
                          },
                      },
                  },
              ],
              main: [
                  {
                      component: 'RecordTable',
                      properties: {
                          table: 'global_segment',
                          columns: [
                              {
                                  title: 'Id',
                                  dataIndex: 'id',
                                  sorter: true,
                                  width: '20%',
                              },
                              {
                                  title: 'Type',
                                  dataIndex: 'type',
                                  sorter: true,
                              },
                              {
                                  title: 'Name',
                                  dataIndex: 'name',
                                  sorter: true,
                                  template: '{{name}}',
                                  width: '40%',
                              },
                          ],
                          onRecord: {
                              onClick: {
                                  action: 'navigate',
                                  url: '/segments/{{record.id}}',
                              },
                          },
                      },
                  },
              ],
          },
      },
      'segments/create': {
          layout: 'full_width',
          components: {
              main: [
                  {
                      component: 'SegmentBuilder',
                      properties: {
                          table: 'segment',
                          title: '{{record.name}}',
                      },
                  },
              ],
          },
      },
      '/segments/:id/*': {
          layout: 'tabs',
          components: {
              header: [
                  {
                      component: 'RecordDisplay',
                      properties: {
                          table: 'segment',
                          id: '{{parameters.id}}',
                          template: '{{type}}: {{name}}',
                      },
                  },
              ],
              tabs: {
                  config: {
                      label: 'Configuration',
                      children: [
                          {
                          component: 'RecordForm',
                          properties: {
                              table: 'segment',
                              title: '{{#if record.id}}Edit Segment{{else}}Create Segment{{/if}}',
                              form: {
                                  type: 'object',
                                  required: [],
                                  properties: {
                                      type: {
                                          type: 'string',
                                          title: 'Type',
                                      },
                                      name: {
                                          type: 'string',
                                          title: 'Name',
                                      },
                                      source_plugin_id: {
                                          type: 'string',
                                          title: 'Source Plugin ID --fooed',
                                          default: 'FOOOO',
                                      },
                                      remote_segment_id: {
                                          type: 'string',
                                          title: 'Remote Segment ID',
                                          default: 'BAR',
                                      },
                                      build_mechanism: {
                                          type: 'string',
                                          title: 'Mechanism',
                                          default: 'static',
                                      },
                                      build_schedule: {
                                          type: 'string',
                                          title: 'Build Schedule',
                                      },
                                      build_query_id: {
                                          type: 'string',
                                          title: 'Build Query ID',
                                      },
                                  },
                              },
                              uiSchema: {},
                              onSave: {
                                  action: 'navigate',
                                  url: '/segments/{{record.id}}',
                              },
                          },
          }],
                  },
                  builder: {
                      label: 'Builder',
                      children: [{
                          component: 'SegmentBuilder',
                          properties: {
                              table: 'segment',
                              title: '{{record.name}}',
                          },
                      }],
                  },
                  review: {
                      label: 'Review',
                      children: [{
                          component: 'RecordTable',
                          properties: {
                              table: 'person_segment',
                              include: {
                                  people: {
                                      table: 'person',
                                  },
                              },
                              conditions: [
                                  {
                                      eql: 'segment_id={{parameters.id}}',
                                  },
                              ],
                              columns: [
                                  {
                                      template: '{{record.person_id}}',
                                  },
                              ],
                          },
                      }],
                  },
              },
          },
      },
    },
    };
