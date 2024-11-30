/* eslint-disable indent */
  export default {
    menu: {
      data: {
          children: {
            job: {
                title: 'Jobs',
                icon: 'forklift',
                url: '/job',
                },
            },
      },
    },
    routes: {
      job: {
        layout: 'full_width',
        components: {
            header: [
                'Jobs',
                {
                    component: 'Button',
                    properties: {
                        icon: 'plus',
                        content: 'Add Job',
                        onClick: {
                            action: 'navigate',
                            url: '/job/create',
                        },
                    },
                },
                {
                    component: 'Button',
                    properties: {
                        icon: 'plus',
                        content: 'Test Job',
                        onClick: {
                            action: 'table.upsert',
                            table: 'job',
                            defaultData: {
                                worker_path: 'EchoWorker',
                                worker_method: 'echo',
                                options: { foo: 'bar' },
                              },
                        },
                    },
                },
            ],
            main: [
                {
                    component: 'RecordTable',
                    properties: {
                        table: 'job',
                        columns: [
                            {
                                title: 'Id',
                                name: 'id',
                                sorter: true,
                                width: '20%',
                            },
                            {
                                title: 'Created',
                                name: 'created_at',
                                sorter: true,
                                width: '20%',
                            },
                            {
                                title: 'Status',
                                name: 'status',
                                sorter: true,
                                width: '20%',
                            },
                            {
                                title: 'Worker',
                                name: 'worker_path',
                                sorter: true,
                                width: '20%',
                            },
                            {
                                title: 'Method',
                                name: 'worker_method',
                                sorter: true,
                                width: '20%',
                            },
                        ],
                        onRecord: {
                            onClick: {
                                action: 'navigate',
                                url: '/job/{{record.id}}',
                            },
                        },
                    },
                },
            ],
        },
    },
    'job/:id/*': {
        layout: 'full_width',
        components: {
            main: [
                {
                    component: 'RecordForm',
                    properties: {
                        table: 'job',
                        title: '{{#if record.id}}Edit Job{{else}}Create Job{{/if}}',
                        form: {
                            type: 'object',
                            required: [],
                            properties: {
                                account_id: {
                                    type: 'string',
                                    title: 'Account ID',
                                    default: 'engine9',
                                },
                                status: {
                                    type: 'string',
                                    title: 'Status',
                                    default: 'pending',
                                },
                                worker_path: {
                                    type: 'string',
                                    title: 'Worker Path',
                                    default: 'EchoWorker',
                                },
                                worker_method: {
                                    type: 'string',
                                    title: 'Worker Method',
                                    default: 'echo',
                                },
                                options: {
                                    type: 'string',
                                    title: 'Options',
                                    default: '{}',
                                },
                            },
                        },
                        uiSchema: {
                            options: {
                                'ui:widget': 'textarea',
                            },
                        },
                        onSave: {
                            action: 'navigate',
                            url: '/job/{{record.id}}',
                        },
                    },
                },
            ],
        },
    },
    },
  };
