/* eslint-disable indent */
  export default function useLocalUI() {
  return JSON.parse(JSON.stringify({
    menu: {
        home: {
            title: 'Dashboard',
            icon: 'dashboard',
            url: '/',
        },
        people: {
            title: 'People',
            icon: 'people',
            type: 'collapse',
            children: {
                'person-list': {
                    title: 'Everybody',
                    icon: 'person',
                    url: '/person',
                },
                segments: {
                    title: 'Segments',
                    icon: 'people',
                    url: '/segments',
                },
                queries: {
                    title: 'Queries',
                    icon: 'search',
                    url: '/queries',
                },
            },
        },
        'message-menu': {
            title: 'Messages',
            icon: 'messages',
            type: 'collapse',
            children: {
                campaigns: {
                    title: 'Campaigns',
                    icon: 'campaign',
                    url: '/campaign',
                },
            },
        },
        'data-menu': {
            title: 'Data',
            icon: 'data',
            type: 'collapse',
            children: {
                job: {
                    title: 'Jobs',
                    icon: 'forklift',
                    url: '/job',
                },
                report: {
                    title: 'Reports',
                    icon: 'report',
                    url: '/report',
                },
            },
        },
    },
    routes: {
        '': {
            layout: 'grid',
            components: {
                main: [
                    {
                        component: 'StatCard',
                        properties: {
                            table: 'person',
                            columns: [
                                {
                                    eql: 'YEAR(modified_at)',
                                    alias: 'year_modified',
                                },
                                {
                                    eql: 'count(id)',
                                    alias: 'count',
                                },
                            ],
                            conditions: [
                                {
                                    eql: "YEAR(modified_at)>'2020-01-01'",
                                },
                            ],
                            groupBy: [
                                {
                                    eql: 'YEAR(modified_at)',
                                },
                            ],
                        },
                    },
                ],
            },
        },
        profile: {
            layout: 'grid',
            components: {
                main: [
                    {
                        component: 'Profile',
                    },
                ],
            },
        },
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
                                    title: 'Id',
                                    dataIndex: 'id',
                                    sorter: true,
                                    width: '20%',
                                },
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
            layout: 'sidebar',
            components: {
                sidebar: {
                    title: 'Person Details',
                    items: [
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
                        {
                            component: 'Link',
                            properties: {
                                label: 'Edit',
                                to: 'edit',
                            },
                        },
                        {
                            component: 'Link',
                            properties: {
                                label: 'Emails',
                                to: 'emails',
                            },
                        },
                        {
                            component: 'Link',
                            properties: {
                                label: 'Addresses',
                                to: 'address',
                            },
                        },
                    ],
                    items2: [
                        {
                            component: 'Link',
                            properties: {
                                label: 'Phones',
                                to: 'phones',
                            },
                        },
                    ],
                },
                main: [
                    {
                        component: 'RecordDisplay',
                        properties: {
                            table: 'person',
                            id: '{{parameters.id}}',
                            template: '{{given_name}} {{family_name}}',
                        },
                    },
                    {
                        path: 'edit',
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
                    {
                        path: 'emails',
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
                    {
                        path: 'address',
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
                    {
                        path: 'phones',
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
                ],
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
                            content: 'Add Segment',
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
                            table: 'segment',
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
        '/segments/:id/*': {
            layout: 'full_width',
            components: {
                main: [
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
                                        title: 'Source Plugin ID',
                                    },
                                    remote_segment_id: {
                                        type: 'string',
                                        title: 'Remote Segment ID',
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
                    },
                    {
                        component: 'RecordTable',
                        properties: {
                            table: 'person_segment',
                            include: [
                                {
                                    alias: 'people',
                                    table: 'person',
                                },
                            ],
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
                    },
                ],
            },
        },
        '/person/:id/*': {
            components: {
                sidebar: {
                    items2: [
                        {
                            component: 'Link',
                            properties: {
                                label: 'Segments',
                                to: 'segments',
                            },
                        },
                    ],
                },
                main: [
                    {
                        path: 'segments',
                        label: 'Segments',
                        component: 'RecordTable',
                        properties: {
                            table: 'person_segment',
                            include: [
                                {
                                    alias: 'segments',
                                    table: 'segment',
                                },
                            ],
                            conditions: [
                                {
                                    eql: 'person_id={{parameters.person_id}}',
                                },
                            ],
                            rows: [
                                '{{segment}}',
                            ],
                        },
                    },
                ],
            },
        },
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
                ],
                main: [
                    {
                        component: 'RecordTable',
                        properties: {
                            table: 'job',
                            columns: [
                                {
                                    title: 'Id',
                                    dataIndex: 'id',
                                    sorter: true,
                                    width: '20%',
                                },
                                {
                                    title: 'Created',
                                    dataIndex: 'created_at',
                                    sorter: true,
                                    width: '20%',
                                },
                                {
                                    title: 'Status',
                                    dataIndex: 'status',
                                    sorter: true,
                                    width: '20%',
                                },
                                {
                                    title: 'Worker',
                                    dataIndex: 'worker_path',
                                    sorter: true,
                                    width: '20%',
                                },
                                {
                                    title: 'Method',
                                    dataIndex: 'worker_method',
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
        queries: {
            layout: 'full_width',
            components: {
                header: [
                    'Queries',
                    {
                        component: 'Button',
                        properties: {
                            icon: 'plus',
                            content: 'Create Query',
                            onClick: {
                                action: 'navigate',
                                url: '/queries/create',
                            },
                        },
                    },
                ],
                main: [
                    {
                        component: 'RecordTable',
                        properties: {
                            table: 'query',
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
                                    url: '/queries/{{record.id}}',
                                },
                            },
                        },
                    },
                ],
            },
        },
        'queries/create': {
            layout: 'full_width',
            components: {
                main: [
                    {
                        path: 'edit',
                        component: 'RecordForm',
                        properties: {
                            table: 'query',
                            form: {
                                title: 'Create Query',
                                type: 'object',
                                required: [],
                                properties: {
                                    label: {
                                        type: 'string',
                                        title: 'Label',
                                        default: '',
                                    },
                                    query: {
                                        type: 'string',
                                        title: 'Query',
                                        default: '',
                                    },
                                },
                            },
                            uiSchema: {
                                query: {
                                    'ui:widget': 'textarea',
                                },
                            },
                            onSave: {
                                action: 'navigate',
                                url: '/queries/{{record.id}}',
                            },
                        },
                    },
                ],
            },
        },
        'queries/:id/*': {
            layout: 'full_width',
            components: {
                main: [
                    {
                        component: 'RecordQueryBuilder',
                        properties: {
                            table: 'query',
                            title: '{{record.label}}',
                        },
                    },
                ],
            },
        },
        '/report': {
            layout: 'full_width',
            components: {
                main: [
                    '<h1>Reports</h1>',
                ],
            },
        },
    },
}));
  }
