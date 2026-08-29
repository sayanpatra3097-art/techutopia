export type TeamMember = {
    name: string;
    role: string;
    image: string;
    socials?: {
        linkedin?: string;
        instagram?: string;
    };
};

export type OfficeBearer = {
    id: number;
    src: string;
    alt: string;
};

// Row 1 (11 members)
export const ROW1_TEAM: TeamMember[] = [
    { name: "Siddharth", role: "Registrations", image: "/team/Reg_TeamCard.png" },
    { name: "Tanya", role: "Food and Accommodation", image: "/team/F_A_TeamCard_Tanya-removebg-preview.png" },
    { name: "Siddhii", role: "Decor", image: "/team/Decor_TeamCard-removebg-preview.png" },
    { name: "Nikita", role: "Design Team", image: "/team/Design_TeamCard_nikita-removebg-preview.png" },
    { name: "Chestha", role: "Media & Report", image: "/team/Media_Report_TeamCard-removebg-preview.png" },
    { name: "Agrima", role: "Hospitality", image: "/team/Hospt_TeamCard.png" },
    { name: "Anmol", role: "IA", image: "/team/IA_TeamCard-removebg-preview.png" },
    { name: "Jheel", role: "P&C", image: "/team/P_C_TeamCard_Jheel-removebg-preview.png" },
    { name: "Swati", role: "Discipline", image: "/team/Discipline_TeamCard_2-removebg-preview.png" },
    { name: "Aditya", role: "Social Media", image: "/team/SocialMedia_TeamCard-removebg-preview.png" },
    { name: "Shourya", role: "Tech Team", image: "/team/Tech_TeamCard_SB.png" },
];

// Row 2 (12 members)
export const ROW2_TEAM: TeamMember[] = [
    { name: "Tanikk", role: "Food and Accommodation", image: "/team/F_A_TeamCard_Tanik-removebg-preview.png" },
    { name: "Srishti", role: "Design Team", image: "/team/Design_TeamCard-removebg-preview.png" },
    { name: "Gaurav", role: "P&C", image: "/team/P_C_TeamCard_Gaurav-removebg-preview.png" },
    { name: "Aman", role: "Stage & Venue", image: "/team/S_V_TeamCard-removebg-preview.png" },
    { name: "Shubham", role: "Discipline", image: "/team/Discipline_TeamCard-removebg-preview.png" },
    { name: "Devam", role: "Sponsorships", image: "/team/Sponsor_TeamCard.png" },
    { name: "Mohit", role: "Social Media", image: "/team/SocialMedia_mohit.png" },
    { name: "Aayan", role: "Tech Team", image: "/team/Tech_TeamCard_Aayan-removebg-preview.png" },
    { name: "Vaishnavi", role: "Anchoring", image: "/team/Anchoring_TeamCard.png" },
    { name: "Pratigya", role: "PS", image: "/team/PS_TeamCard-removebg-preview.png" },
    { name: "Ekansh", role: "Photography", image: "/team/Photography_TeamCard-removebg-preview.png" },
    { name: "Arpan", role: "Treasurer", image: "/team/team_bg.png" },
];

// Office Bearers (Council vs Hack Team)
export const COUNCIL_MEMBERS: OfficeBearer[] = [
    { id: 1, src: '/team/OH_TeamCard-removebg-preview.png', alt: 'Office Bearer 1' },
    { id: 2, src: '/team/OH1_TeamCard.png', alt: 'Office Bearer 2' },
    { id: 3, src: '/team/OH_PakhiDi-removebg-preview.png', alt: 'Pakhi Di - Office Bearer' }
];

export const HACK_TEAM_MEMBERS: OfficeBearer[] = [
    { id: 4, src: '/team/Tech_TeamCard_SB.png', alt: 'Shourya Bansal - Hack Team Lead' },
];
