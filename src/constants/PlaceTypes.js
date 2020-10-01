const PlaceTypes = {
    parksAndRecreation: [
        [
            {
                key: 'park',
                name: 'Parks',
                image: require('../../assets/placeassets/park.jpg'),
                marker: require('../../assets/placemarkers/park.png')
            },
            {
                key: 'hiking trails',
                name: 'Hiking Trails',
                image: require('../../assets/placeassets/hikingTrails.jpg'),
                textSearch: true
            },

        ],
        [
            {
                key: 'campground',
                name: 'Camp Grounds',
                image: require('../../assets/placeassets/campGrounds.jpg'),
            },
            {
                key: 'tourist_attraction',
                name: 'Tourist Attractions',
                image: require('../../assets/placeassets/touristattraction.jpg')
            },
        ],
        [
            {
                key: 'amusement_park',
                name: 'Amusement Parks',
                image: require('../../assets/placeassets/amusementPark.jpg')
            },
            {
                key: 'movie_theater',
                name: 'Movie Theaters',
                image: require('../../assets/placeassets/movieTheater.jpg')
            },
            {
                key: 'bowling_alley',
                name: 'Bowling Alleys',
                image: require('../../assets/placeassets/bowlingAlley.jpg')
            },
        ],
        [
            {
                key: 'art_gallery',
                name: 'Art Galleries',
                image: require('../../assets/placeassets/artGallery.jpg')
            },
            {
                key: 'museum',
                name: 'Museums',
                image: require('../../assets/placeassets/museum.jpg')
            },

        ],
        [
            {
                key: 'shopping_mall',
                name: 'Shopping Malls',
                image: require('../../assets/placeassets/shoppingMall.jpg')
            }
        ],
        [
            {
                key: 'stadium',
                name: 'Stadiums',
                image: require('../../assets/placeassets/stadium.jpg')

            },
            {
                key: 'zoo',
                name: 'Zoos',
                image: require('../../assets/placeassets/zoo.jpg')
            },
        ],
    ],
    services: [
        [
            {
                key: 'atm',
                name: 'ATMs',
                image: require('../../assets/placeassets/atm.jpg')
            },
            {
                key: 'bank',
                name: 'Banks',
                image: require('../../assets/placeassets/bank.jpg')
            },
        ],
        [
            {
                key: 'courthouse',
                name: 'Court House',
                image: require('../../assets/placeassets/court.jpg')
            },
        ],
        [
            {
                key: 'embassy',
                name: 'Embassy',
                image: require('../../assets/placeassets/embassy.jpg')
            },
        ],
        [
            {
                key: 'fire_station',
                name: 'Fire Station',
                image: require('../../assets/placeassets/fireStation.jpg')
            },
            {
                key: 'gas_station',
                name: 'Gas Station',
                image: require('../../assets/placeassets/gasStation.jpg')
            },
            {
                key: 'police',
                name: 'Police',
                image: require('../../assets/placeassets/police.jpg')
            }
        ],
        [
            {
                key: 'laundry',
                name: 'Laundry',
                image: require('../../assets/placeassets/laundry.jpg')
            },
            {
                key: 'post_office',
                name: 'Post Office',
                image: require('../../assets/placeassets/postOffice.jpg')
            }
        ]
    ],
    servicePeople: [
        [
            {
                key: 'dentist',
                name: 'Dentists',
                image: require('../../assets/placeassets/dentist.jpg')
            },
            {
                key: 'doctor',
                name: 'Doctors',
                image: require('../../assets/placeassets/doctor.jpg')
            },
            {
                key: 'electrician',
                name: 'Electricians',
                image: require('../../assets/placeassets/electrician.jpg')
            },
            {
                key: 'lawyer',
                name: 'Lawyers',
                image: require('../../assets/placeassets/lawyer.jpg')
            },
        ],
        [
            {
                key: 'locksmith',
                name: 'Locksmiths',
                image: require('../../assets/placeassets/locksmith.jpg')
            },
            {
                key: 'painter',
                name: 'Painters',
                image: require('../../assets/placeassets/painter.jpg')
            },
            {
                key: 'plumber',
                name: 'Plumbers',
                image: require('../../assets/placeassets/plumber.jpg')
            },
        ]
    ],
    health: [
        [
            {
                key: 'hospital',
                name: 'Hospitals',
                image: require('../../assets/placeassets/hospital.jpg')
            },
            {
                key: 'pharmacy',
                name: 'Pharmacies',
                image: require('../../assets/placeassets/pharmacy.jpg')
            },
        ],
        [
            {
                key: 'physiotherapist',
                name: 'Physiotherapists',
                image: require('../../assets/placeassets/physio.jpg')
            },
            {
                key: 'veterinary_care',
                name: 'Vaterinary Care',
                image: require('../../assets/placeassets/vet.jpg')
            },
        ]
    ],
    retailAndCommercial: [
        [
            {
                key: 'book_store',
                name: 'Book Stores',
                image: require('../../assets/placeassets/bookstore.jpg')
            },
        ],
        [
            {
                key: 'car_dealer',
                name: 'Car Dealers',
                image: require('../../assets/placeassets/cardealer.jpg')
            },
            {
                key: 'car_rental',
                name: 'Car Rental',
                image: require('../../assets/placeassets/carrent.jpg')
            },
            {
                key: 'car_repairs',
                name: 'Car Repairs',
                image: require('../../assets/placeassets/carrepair.jpg')
            },
            {
                key: 'car_wash',
                name: 'Car wash',
                image: require('../../assets/placeassets/carwash.jpg')
            },
        ],
        [
            {
                key: 'clothing_store',
                name: 'Clothing Stores',
                image: require('../../assets/placeassets/clothstore.jpg')
            },
            {
                key: 'convenience_store',
                name: 'Convenience Stores',
                image: require('../../assets/placeassets/convenience.jpg')
            },
        ],
        [
            {
                key: 'department_store',
                name: 'Department Stores',
                image: require('../../assets/placeassets/departmentstore.jpg')
            },
            {
                key: 'electronics_store',
                name: 'Electronics Stores',
                image: require('../../assets/placeassets/electronicstore.jpg')
            },
            {
                key: 'hardware_store',
                name: 'Hardware Stores',
                image: require('../../assets/placeassets/hardwareStore.jpg')
            },
            {
                key: 'home_goods_store',
                name: 'Home Goods Stores',
                image: require('../../assets/placeassets/homegoods.jpg')
            },
        ],
        [
            {
                key: 'jewelery_store',
                name: 'Jewelery Stores',
                image: require('../../assets/placeassets/jewelery.jpg')
            },
            {
                key: 'shoe_store',
                name: 'Shoe Stores',
                image: require('../../assets/placeassets/shoestore.jpg')
            },
        ],
        [
            {
                key: 'pet_store',
                name: 'Pet Stores',
                image: require('../../assets/placeassets/petstore.jpg')
            },
            {
                key: 'supermarket',
                name: 'Super Market',
                image: require('../../assets/placeassets/supermarket.jpg')
            },
        ]
    ],
    transitAndPublicTransport:[
        [
            {
                key: 'bus_station',
                name: 'Bus Stations',
                image: require('../../assets/placeassets/busStation.jpg')
            },
            {
                key: 'train_station',
                name: 'Train Stations',
                image: require('../../assets/placeassets/train.jpg')
            },
        ],
        [
            {
                key: 'subway_station',
                name: 'Subway Stations',
                image: require('../../assets/placeassets/subway.jpg')
            },
            {
                key: 'taxi_stand',
                name: 'Taxi Stands',
                image: require('../../assets/placeassets/taxi.jpg')
            },
        ]
    ],
    foodAndRestaurants: [
        [
            {
                key: 'bakery',
                name: 'Bakeries',
                image: require('../../assets/placeassets/bakery.jpg')
            },
            {
                key: 'cafe',
                name: 'Cafe',
                image: require('../../assets/placeassets/cafe.jpg')
            },
        ],
        [
            {
                key: 'meal_delivery',
                name: 'Meal Deliveries',
                image: require('../../assets/placeassets/delivery.jpg')
            },
            {
                key: 'meal_takeaway',
                name: 'Meal TakeAways',
                image: require('../../assets/placeassets/takeaway.jpg')
            },
            {
                key: 'restaurant',
                name: 'Restaurants',
                image: require('../../assets/placeassets/restaurant.jpg')
            },
        ]
    ],
    placesOfWorship: [
        [
            {
                key: 'mosque',
                name: 'Mosque',
                image: require('../../assets/placeassets/mosque.jpg')
            },
        ],
        [
            {
                key: 'church',
                name: 'Churches',
                image: require('../../assets/placeassets/church.jpg')
            },
        ],
        [
            {
                key: 'hindu_temple',
                name: 'Hindu Temples',
                image: require('../../assets/placeassets/temple.jpg')
            },
        ]
    ]
}

export default PlaceTypes
