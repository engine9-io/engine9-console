import merge from 'deepmerge';
/* eslint-disable indent */
import SourceCodes from './SourceCodes';
import Jobs from './Jobs';
import Messages from './Messages';
import People from './People';
import Reports from './Reports';
import Market from './Market';
import Transactions from './Transactions';

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
        message: {
            title: 'Messages',
            icon: 'messages',
            type: 'collapse',
            children: {
                campaigns: {
                    title: 'List',
                    icon: 'campaign',
                    url: '/messages',
                },
            },
        },
        data: {
            title: 'Data',
            icon: 'data',
            type: 'collapse',
            children: {
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
                                    name: 'year_modified',
                                    eql: 'YEAR(modified_at)',
                                },
                                {
                                    eql: 'count(id)',
                                    name: 'count',
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
    }, SourceCodes, Messages, People, Reports, Jobs, Transactions, Market])));
}
