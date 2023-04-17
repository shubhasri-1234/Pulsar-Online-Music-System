export const dashboardNavBarTabs = [
    {
        label: 'Search',
        value: 'search',
        path: '/search',
    },
    {
        label: 'Home',
        value: 'home',
        path: '/',
    },
    {
        label: 'Friends',
        value: 'friends',
        path: '/friends',
    },
    {
        label: 'Groups',
        value: 'groups',
        path: '/groups',
    },
    {
        label: 'Playlists',
        value: 'playlists',
        path: '/playlists',
    },
    {
        label: 'Log In',
        value: 'login',
        path: '/login',
    },
    {
        label: 'Sign Up',
        value: 'signup',
        path: '/signup',
    },
];

export const friendsViews = [
    {
        label: 'Chat',
        value: 'chat',
    },
    {
        label: 'Common Favourites',
        value: 'commonFavourites',
    },
    {
        label: 'Recently Played',
        value: 'recentlyPlayed',
    },
];

export const initSearchFilters = {
    all: true,
    users: false,
    groups: false,
    songs: false,
    playlists: false,
    artists: false,
};

export const initNewGroup = {
    name: '',
    description: '',
    artist: '',
};

export const themeColors = {
   yellow: '#d2b059',
   red: '#ff425c',
   blue: '#5995fb',
   green: '#2ecc71',
};
