import merge from 'deepmerge';
/* eslint-disable indent */
import SourceCodes from './SourceCodes';
import Jobs from './Jobs';
import Messages from './Messages';
import People from './People';
import Reports from './Reports';
import Market from './Market';

export default function useLocalUI() {
  return JSON.parse(JSON.stringify(merge.all([{
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
                source_codes: {
                    title: 'Source Codes',
                    icon: 'report',
                    url: '/source_codes',
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
    },
    }, SourceCodes, Messages, People, Reports, Jobs, Market])));
}
