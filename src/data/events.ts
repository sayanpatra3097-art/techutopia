export interface SubEvent {
    title: string;
    desc?: string;
    image?: string;
}

export const eventsData = [
    {
        id: 1,
        title: 'RoboMania',
        segment: 'Robotics Segment',
        desc: 'The ultimate Robotics Segment featuring AquaBotics, Death Race, Drone Competition, and Robo Soccer.',
        time: 'TBA', location: 'TBA',
        color: '#ff6b6b', poster: '/events/robomania.jpg',
        isEpic: true, isMythic: true,
        entryFee: 0, requiresBooking: false,
        details: 'Dive into the world of robotics with RoboMania! This segment features a series of high-octane competitions including AquaBotics, where underwater robots navigate obstacles; Death Race, an intense combat and racing arena; Drone Competition, testing aerial agility and speed; and Robo Soccer, where autonomous and manually controlled robots battle for the championship. Bring your engineering skills to the test!',
        subEvents: [
            { title: 'AquaBotics', desc: 'Underwater robotics competition navigating aquatic obstacle courses.', image: '/events/sub/aquabotics.webp' },
            { title: 'Death Race', desc: 'Intense combat and obstacle racing arena for custom robotic vehicles.', image: '/events/sub/death_race.webp' },
            { title: 'Drone Competition', desc: 'High-speed aerial agility and precision flight challenge.', image: '/events/sub/drone_comp.webp' },
            { title: 'Robo Soccer', desc: 'Robotic football tournament featuring autonomous and controlled bots.', image: '/events/sub/robo_soccer.webp' }
        ]
    },
    {
        id: 2,
        title: 'Gravity Zone',
        segment: 'Physics Segment',
        desc: 'The Physics Segment featuring Physics-based Competitions and Experimental Challenges.',
        time: 'TBA', location: 'TBA',
        color: '#74c0fc', poster: '/events/gravity_zone.jpg',
        isEpic: true, isMythic: false,
        entryFee: 0, requiresBooking: false,
        details: 'Step into the Gravity Zone, where physics meets imagination! Participate in complex physics-based competitions and push the boundaries of science with experimental challenges. A playground for the curious mind, where theoretical concepts are put to the ultimate practical test.',
        subEvents: [
            { title: 'Physics-based Competitions', desc: 'Analytical physics challenges testing core principles and problem solving.', image: '/events/sub/physics_comp.webp' },
            { title: 'Experimental Challenges', desc: 'Practical physics experiments and rapid prototyping challenges.', image: '/events/sub/physics_comp.webp' }
        ]
    },
    {
        id: 3,
        title: 'TechVenture',
        segment: 'Innovation & Startup Segment',
        desc: 'The Innovation & Startup Segment featuring SIH Internal Hackathon and Shark Tank.',
        time: 'TBA', location: 'TBA',
        color: '#fcc419', poster: '/events/techventure.jpg',
        isEpic: true, isMythic: true,
        entryFee: 0, requiresBooking: false,
        details: 'Unleash your entrepreneurial spirit in TechVenture! This segment includes the prestigious SIH Internal Hackathon, where teams solve real-world problems with innovative software and hardware solutions, and Shark Tank, where teams pitch groundbreaking ideas to expert judges and investors.',
        subEvents: [
            { title: 'SIH Internal Hackathon', desc: 'Internal hackathon selection for the Smart India Hackathon.', image: '/events/sub/sih_hackathon.webp' },
            { title: 'Shark Tank', desc: 'Live startup pitching to a panel of expert investors and judges.', image: '/events/sub/shark_tank.webp' }
        ]
    },
    {
        id: 4,
        title: 'LaunchPad',
        segment: 'Startup Expo Segment',
        desc: 'The Startup Expo Segment featuring Startup Showcases, Product Demos, and Investor Connect.',
        time: 'TBA', location: 'TBA',
        color: '#4ecdc4', poster: '/events/launchpad.jpg',
        isEpic: true, isMythic: false,
        entryFee: 0, requiresBooking: false,
        details: 'Welcome to LaunchPad, the ultimate startup expo! Witness the future as emerging startups showcase their cutting-edge products and services. Experience live product demos and take advantage of our Investor Connect sessions.',
        subEvents: [
            { title: 'Startup Showcases', desc: 'Exhibition of innovative early-stage startups and ventures.', image: '/events/sub/startup_expo.webp' },
            { title: 'Product Demos', desc: 'Live interactive demonstrations of emerging tech products.', image: '/events/sub/startup_expo.webp' },
            { title: 'Investor Connect', desc: 'Networking & funding sessions with angel investors and VCs.', image: '/events/sub/shark_tank.webp' }
        ]
    },
    {
        id: 5,
        title: 'Food Carnival',
        segment: 'Food & Festivity Segment',
        desc: 'Good Food. Good Mood. Great Memories. A treat for every foodie featuring delicious food, live music, fun games, and exciting prizes!',
        time: '11:00 AM Onwards', location: 'UEM Jaipur Campus',
        color: '#ff922b', poster: '/events/food_carnival.jpg',
        isEpic: true, isMythic: true,
        entryFee: 0, requiresBooking: false,
        details: 'Indulge in flavors from around the world at the Food Carnival! Good food, live music, fun games, and exciting prizes await. Eat, enjoy, and celebrate with good friends and great times at the UEM Jaipur Campus. Come hungry, leave happy!',
        subEvents: [
            { title: 'Delicious Food', desc: 'Multi-cuisine stalls featuring international and regional dishes.', image: '/events/food_carnival.jpg' },
            { title: 'Live Music', desc: 'High-energy live music and acoustic performances.', image: '/events/sub/live_music.webp' },
            { title: 'Fun Games', desc: 'Carnival games, eating challenges, and interactive stalls.', image: '/events/food_carnival.jpg' },
            { title: 'Exciting Prizes', desc: 'Win rewards and prizes in carnival activities.', image: '/events/food_carnival.jpg' }
        ]
    }
];
