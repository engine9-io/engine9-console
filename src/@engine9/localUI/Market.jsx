/* eslint-disable indent */
  export default {
    menu: {
        market: {
            title: 'Market',
            icon: 'dashboard',
            url: '/market',
        },
    },
    routes: {
      'market/*': {
        layout: 'full_width',
        components: {
            main: [
                {
                    component: 'Market',
                },
            ],
        },
    },
    },
  };
