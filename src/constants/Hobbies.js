const HobbiesData = [
    [
        {
            name: 'Sightseeing ',
            key: 'sightseeing',
            image: 'https://images.unsplash.com/photo-1566848238168-0c43ab3f2f8e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8c2lnaHRzZWVpbmclMjBwZWFrc3xlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=750&q=60',
            tint: 'rgba(163, 206, 241, 0.8)',
            barColor: 'rgba(163, 206, 241, 1)',
            textColor: '#606c38',
            icon: 'https://img.icons8.com/ios/50/606c38/binoculars.png',
            subtext: 'Mainly places with a view, but can also be places like parks, landmarks etc.'
        },
        {
            name: 'Hiking',
            key: 'hiking',
            image: 'https://images.unsplash.com/photo-1542909589-7712c6b80ed3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGhpa2luZ3xlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=750&q=60',
            tint: 'rgba(86, 97, 47, 0.8)',
            barColor: 'rgba(86, 97, 47, 1)',
            textColor: '#BFAC67',
            icon: 'https://img.icons8.com/android/24/BFAC67/earth-element.png',
            subtext: 'Mostly Hiking trails, but may also include simple foot trails, bikeways and nature trails'
        },
    ],
    [
        {
            name: 'History & Heritage',
            key: 'historical',
            image: 'https://images.unsplash.com/photo-1533548036275-b79603f53145?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8bGFob3JlJTIwZm9ydHxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=750&q=60',
            tint: 'rgba(191, 172, 103, 0.8)',
            barColor: 'rgba(191, 172, 103, 1)',
            textColor: '#56612F',
            icon: 'https://img.icons8.com/windows/50/56612F/coliseum.png',
            subtext: 'Building or places with historical significance. May also include museums'
        },
        {
            name: 'Shopping',
            key: 'shopping',
            image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHNob3BwaW5nfGVufDB8fDB8&auto=format&fit=crop&w=750&q=60',
            tint: 'rgba(208, 130, 137, 0.8)',
            barColor: 'rgba(208, 130, 137, 1)',
            textColor: '#24484a',
            icon: 'https://img.icons8.com/pastel-glyph/64/24484a/shopping-bags--v2.png'
        },
    ],
    [
        {
            name: 'Boating',
            key: 'boating',
            image: 'https://images.unsplash.com/photo-1507143027275-a7a29b190bb0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9hdHN8ZW58MHx8MHw%3D&auto=format&fit=crop&w=750&q=60',
            tint: 'rgba(23, 68, 51, 0.8)',
            barColor: 'rgba(23, 68, 51, 1)',
            textColor: '#00B889',
            icon: 'https://img.icons8.com/fluent-systems-regular/50/00B889/sail-boat.png',
            subtext: 'Places with boating options'
        },
        {
            name: 'Wild Life',
            key: 'wildlife',
            image: 'https://images.unsplash.com/photo-1530545232169-783ad58b026f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTZ8fHdpbGQlMjBsaWZlfGVufDB8fDB8&auto=format&fit=crop&w=750&q=60',
            tint: 'rgba(118, 40, 0, 0.8)',
            barColor: 'rgba(118, 40, 0, 1)',
            textColor: '#F2B100',
            icon: 'https://img.icons8.com/ios/50/F2B100/wild-animals-sign.png',
            subtext: 'Natural wildlife, Childrens zoo, Safari parks, bird aviaries or aquariums'
        },
    ],
    [
        {
            name: 'Museums',
            key: 'museums',
            image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bXVzZXVtfGVufDB8fDB8&auto=format&fit=crop&w=750&q=60',
            tint: 'rgba(159, 155, 153, 0.8)',
            barColor: 'rgba(159, 155, 153, 1)',
            textColor: '#fefae0',
            icon: 'https://img.icons8.com/ios/50/fefae0/lion-statue.png',
            subtext: 'Includes historical, military, art, natural history and science museums'
        },
        {
            name: 'Lakes',
            key: 'lakes',
            image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8bGFrZXxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=750&q=60',
            tint: 'rgba(0, 49, 87, 0.8)',
            barColor: 'rgba(0, 49, 87, 1)',
            textColor: '#57A1C4',
            icon: 'https://img.icons8.com/ios/50/57A1C4/sea-waves.png',
            subtext: 'Natural or Artificial Lakes'
        },
    ],
    [
        {
            name: 'Entertainment',
            key: 'entertainment',
            image: 'https://images.unsplash.com/photo-1575819974033-21c1faf2adf0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fGNpbmVtYXxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60',
            tint: 'rgba(94, 20, 27, 0.8)',
            barColor: 'rgba(94, 20, 27, 1)',
            textColor: '#FEAA62',
            icon: 'https://img.icons8.com/ios/50/FEAA62/movie--v1.png',
            subtext: 'Includes places like cinemas, amusement parks, gaming zones and other similar things'
        }
    ]
]

export default HobbiesData
