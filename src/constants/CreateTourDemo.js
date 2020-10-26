import hotel from '../../assets/demoAssets/undraw_coming_home_52ir-removebg-preview.png'
import hobby from '../../assets/demoAssets/undraw_camping_noc8.png'
import city from '../../assets/demoAssets/undraw_quite_town_mg2q.png'
import route from '../../assets/demoAssets/undraw_navigator_a479.png'
import calendar from '../../assets/demoAssets/undraw_Booking_re_gw4j.png'
import budget from '../../assets/demoAssets/undraw_Credit_card_re_blml.png'


const createTourDemoData = [
    {
        title: 'Multiple Locations',
        image: city,
        body: 'Add multiple cities for your tour.'
    },
    {
        title: 'Tour Routes',
        image: route,
        body: 'Our system plans the best possible routes for your tour so you do not have trouble on the way.'
    },
    {
        title: 'Your Hobbies',
        image: hobby,
        body: 'We care about things you like. We will recommend only the best possible places to visit according to your preferences.'
    },
    {
        title: 'Budget',
        image: budget,
        body: 'Tell us how much you can afford and we will try to plan your tour with in the limits'
    },
    {
        title: 'Hotel Stays',
        image: hotel,
        body: 'Want us to handle the hotel booking process? Say no more, Our systems will find you the best possible rooms within your tour budget.'
    },
    {
        title: 'Tour Schedule',
        image: calendar,
        body: 'Have all your tour plans safe inside your pocket. From arrival and departure times to the complete tour timeline, we have you covered'
    }
]

export default createTourDemoData
