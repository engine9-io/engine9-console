/* eslint-disable indent */
  export default {
      routes: {
        campaign: {
          layout: 'full_width',
            components: {
                header: [
                    'Campaigns',
                    {
                        component: 'Button',
                        properties: {
                            icon: 'plus',
                            content: 'Add Campaign',
                            onClick: {
                                action: 'navigate',
                                url: '/campaign/create',
                            },
                        },
                    },
                ],
                main: [
                    {
                        component: 'RecordTable',
                        properties: {
                            table: 'campaign',
                            columns: [
                                {
                                    title: 'Id',
                                    dataIndex: 'id',
                                    sorter: true,
                                    width: '20%',
                                },
                                {
                                    title: 'Name',
                                    dataIndex: 'name',
                                    sorter: true,
                                    template: '{{record.name}}',
                                    width: '40%',
                                },
                            ],
                            onRecord: {
                                onClick: {
                                    action: 'navigate',
                                    url: '/campaign/{{record.id}}',
                                },
                            },
                        },
                    },
                ],
            },
        },
        'campaign/create': {
            layout: 'full_width',
            components: {
                main: [
                    {
                        path: 'edit',
                        component: 'RecordForm',
                        properties: {
                            table: 'campaign',
                            form: {
                                title: 'Create Campaign',
                                type: 'object',
                                required: [],
                                properties: {
                                    name: {
                                        type: 'string',
                                        title: 'Name',
                                        default: '',
                                    },
                                },
                            },
                            uiSchema: {},
                            onSave: {
                                action: 'navigate',
                                url: '/campaign/{{record.id}}',
                            },
                        },
                    },
                ],
            },
        },
        'campaign/:campaign_id/message_set/:message_set_id': {
            layout: 'sidebar',
            components: {
                sidebar: {
                    items: [
                        {
                            component: 'Title',
                            properties: {
                                content: 'Messages',
                            },
                        },
                        {
                            component: 'Button',
                            properties: {
                                icon: 'plus',
                                content: 'Add Message',
                                onClick: {
                                    action: 'table.upsert',
                                    table: 'message',
                                    defaultData: {
                                        name: 'Message - {{date 0 "MMM, yyyy"}}',
                                        message_set_id: '{{parameters.message_set_id}}',
                                    },
                                    redirect: '/campaign/{{parameters.campaign_id}}/message_set/{{parameters.message_set_id}}/message/{{record.id}}',
                                },
                            },
                        },
                        {
                            component: 'RecordList',
                            properties: {
                                table: 'message',
                                conditions: [
                                    {
                                        eql: 'message_set_id={{parameters.message_set_id}}',
                                    },
                                ],
                                onRecord: {
                                    onClick: {
                                        action: 'navigate',
                                        url: '/campaign/{{parameters.campaign_id}}/message_set/{{parameters.message_set_id}}/message/{{record.id}}/',
                                    },
                                },
                            },
                        },
                    ],
                },
                main: [
                    {
                        component: 'Title',
                        properties: {
                            content: 'Message Set Summary',
                        },
                    },
                    {
                        component: 'RecordDisplay',
                        properties: {
                            table: 'message_set',
                            id: '{{parameters.message_set_id}}',
                            template: '{{record.name}}',
                        },
                    },
                ],
            },
        },
        'campaign/:id/*': {
            layout: 'sidebar',
            components: {
                sidebar: {
                    items: [
                        {
                            component: 'Title',
                            properties: {
                                content: 'Message Sets',
                            },
                        },
                        {
                            component: 'Button',
                            properties: {
                                icon: 'plus',
                                content: 'Add Message Set',
                                onClick: {
                                    action: 'table.upsert',
                                    table: 'message_set',
                                    defaultData: {
                                        name: 'Messages - {{date 0 "MMMM, yyyy"}}',
                                        campaign_id: '{{parameters.id}}',
                                    },
                                    redirect: '/campaign/{{parameters.id}}/message_set/{{record.id}}',
                                },
                            },
                        },
                        {
                            component: 'RecordList',
                            properties: {
                                table: 'message_set',
                                conditions: [
                                    {
                                        eql: 'campaign_id={{parameters.id}}',
                                    },
                                ],
                                onRecord: {
                                    onClick: {
                                        action: 'navigate',
                                        url: '/campaign/{{parameters.id}}/message_set/{{record.id}}/',
                                    },
                                },
                            },
                        },
                    ],
                },
                main: [
                    {
                        component: 'Title',
                        properties: {
                            content: 'Campaign Summary',
                        },
                    },
                    {
                        component: 'RecordDisplay',
                        properties: {
                            table: 'campaign',
                            id: '{{parameters.id}}',
                            template: '{{record.name}}',
                        },
                    },
                ],
            },
        },
        '/campaign/:campaign_id/message_set/:message_set_id/message/create': {
            layout: 'full_width',
            components: {
                main: [
                    {
                        component: 'RecordTable',
                        properties: {
                            table: 'message',
                            columns: [
                                {
                                    title: 'Id',
                                    dataIndex: 'id',
                                    sorter: true,
                                    width: '20%',
                                },
                                {
                                    title: 'Publish Date',
                                    dataIndex: 'publish_date',
                                    sorter: true,
                                    width: '40%',
                                },
                                {
                                    title: 'Name',
                                    dataIndex: 'name',
                                    sorter: true,
                                    template: '{{record.name}}',
                                    width: '40%',
                                },
                            ],
                            onRecord: {
                                onClick: {
                                    action: 'navigate',
                                    url: '/message/{{record.id}}',
                                },
                            },
                        },
                    },
                ],
            },
        },
        '/campaign/:campaign_id/message_set/:message_set_id/message/:id': {
            layout: 'fullwidth',
            components: {
                main: [
                    {
                        component: 'Message',
                        properties: {
                            table: 'message',
                            id: '{{parameters.id}}',
                            components: [
                                '{{record.name}}',
                            ],
                        },
                    },
                ],
            },
        },
      },

    };
