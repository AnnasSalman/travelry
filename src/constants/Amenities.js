const Amenities = [
    {
        name: 'Room',
        data: [
            {label: 'Sofa Bed', icon: 'sofa'},
            {label: 'Wardrobe', icon: 'wardrobe'},
            {label: 'Carpeted', icon: 'script'},
            {label: 'Fireplace', icon: 'fireplace'},
            {label: 'Heating', icon: 'radiator'},
            {label: 'Iron', icon: 'tshirt-crew'},
            {label: 'Private entrance', icon: 'door'},
            {label: 'Sound proof', icon: 'volume-off'},
            {label: 'Sitting area', icon: 'seat'},
            {label: 'Wooden flooring', icon: 'layers'},
            {label: 'Desk', icon: 'desk-lamp'},
        ],
    },
    {
        name: 'Bathroom',
        data: [
            {label: 'Toilet paper', icon: 'toilet'},
            {label: 'Bath tub', icon: 'hot-tub'},
            {label: 'Hair dryer', icon: 'air-filter'},
            {label: 'Shower', icon: 'shower-head'},
        ],
    },
    {
        name: 'Media',
        data: [
            {label: 'Computer', icon: 'desktop-classic'},
            {label: 'Game Console', icon: 'gamepad-variant'},
            {label: 'Laptop', icon: 'laptop'},
            {label: 'Flat Screen TV', icon: 'television'},
            {label: 'Telephone', icon: 'phone-hangup'},
        ],
    },
    {
        name: 'Food',
        data: [
            {label: 'Dining Area', icon: 'silverware'},
            {label: 'Barbecue', icon: 'grill'},
            {label: 'Toaster', icon: 'bread-slice'},
            {label: 'Electric Kettle', icon: 'kettle'},
            {label: 'Microwave', icon: 'microwave'},
            {label: 'Refrigerator', icon: 'fridge'},
        ],
    },
    {
        name: 'Services',
        data: [
            {label: 'Alarm Clock', icon: 'alarm'},
            {label: 'Towels', icon: 'scale-bathroom'},
        ],
    },
    {
        name: 'Accessibility',
        data: [
            {label: 'Elevator', icon: 'elevator'},
            {label: 'Stairs only', icon: 'stairs'},
            {label: 'Wheelchair access', icon: 'wheelchair-accessibility'},
        ],
    },
    {
        name: 'View',
        data: [
            {label: 'City view', icon: 'city'},
            {label: 'Garden view', icon: 'tree'},
            {label: 'Lake view', icon: 'waves'},
            {label: 'Landmark view', icon: 'lighthouse'},
            {label: 'Mountain view', icon: 'image-filter-hdr'},
            {label: 'Pool view', icon: 'pool'},
            {label: 'River view', icon: 'wave'},
            {label: 'Ocean view', icon: 'tower-beach'},
        ],
    },
]

const getIcon = (name, label) => {
    let iconName = ''
    Amenities.forEach((type)=>{
        if(type.name === name ){
            type.data.forEach((dataType)=>{
                if(dataType.label === label){
                    iconName = dataType.icon
                }
            })
        }
    })
    return iconName
}

export default getIcon
