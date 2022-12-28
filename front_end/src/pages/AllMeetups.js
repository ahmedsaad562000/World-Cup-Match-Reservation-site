import Layout from '../Components/layout/Layout';
import MeetupList from '../Components/meetups/MeetupList'

const ABOUT_DATA = [
  {
    id: 'm1',
    title: 'Lusail City',
    image:
      'https://images.unsplash.com/photo-1671171794557-a2444d109ab0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
    address: 'City with most technology in the world',
    description:
      'Lusail is Qatar first sustainable city. The foundation idea was to develop the city by combining true modernity with the richness of Qatari traditions and Islamic architecture. The coastal city of Lusail is located 22km to the north of Doha, spread over an area of 38km², with a waterfront location stretching over 28km.',
    des:
      'Lusail extends across an area of 38 square kilometers and includes four exclusive islands and 19 multi-purpose residential, mixed-use, entertainment and commercial districts. Featuring 22 hotels with international star ratings, Lusail vibrant, multicultural hodgepodge promises a boon for hospitality, tourism and investments in Qatar. The city will be home to more than 200,000 residents of its scenic surroundings, 170,000 professionals in its 19 districts, and 80,000 visitors to its entertainment, recreation and retail and hospitality facilities; a population of nearly 450,000 people. Each of Lusail districts features an array of residential, commercial, hospitality, and retail destinations, integrating communal living in a self-contained model, complete with schools, mosques, medical facilities, as well as sport, entertainment and shopping centres.Lush greenery and pocket parks across Lusail neighborhoods, residential and commercial areas, as well as two major park networks, the Crescent Park and the Wadi Park, bring to life Lusail city green, sustainable living ambitions, creating ample space for walkways, sports fields and bicycle lanes, as well as open access to marina promenades and water bodies.'
  },
  {
    id: 'm2',
    title: 'Doha Metro',
    image:
      'https://essenceofqatar.com/wp-content/uploads/2020/07/4-QATAR-RAIL-4.png',
    address: 'Comfortable Fast Transportation',
    description:
      'The metro system has three lines (Gold, Green and Red) covering 37 stations Trains run every 3 minutes and staff are available at every station to assist you during your journey Use your Hayya Card and enjoy free travel from 10 November 2022 to 23 December 2022',
    des:
      'The Ministry of Transport and Communications and Qatar Railways Company (Qatar Rail) amounted the soft opening of the Doha Metro Red Line South on 6th May 2019.The Doha Metro features 13 stations running (mostly underground) across 40km all the way from Al Qassar to Al Wakra (total travel time 30 minutes) and Hamad International Airport.The Qatar Rail network consists of the Red Line, Green Line and Gold Line with a total of 37 stations and an expected completion date in 2020.Red Line is the very first to launch on the network and covers some of Doha’s most prominent stations and heavy traffic areas like Souq Waqif, Doha Jadeeda, and Al Bidda.With 18 stations in operation, the inspiration behind the design of each station is inspired by Qatar cultural history.The Doha Metro trains are driverless.Doha Metro trains can reach 100 km / hour.Trains arrive every six minutes and the commute between stations lasts for approximately three minutes.'
  },
];

function AllMeetupsPage() {
  return (
    <Layout>
      <section>
        <h1>About Qatar</h1>
        <MeetupList meetups={ABOUT_DATA} />
      </section>
    </Layout>
  );
}

export default AllMeetupsPage;