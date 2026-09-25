// ══════════════════════════════════════════════════════════════════════════════
// TECHUTOPIA '26 — TEAM MEMBERS DIRECTORY & CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════
// YOU CAN MANUALLY EDIT ALL TEAM MEMBERS IN THIS FILE.
// For each member, you can customize:
//   - name: Member's full name
//   - role: Member's designation / committee role
//   - email: Contact email address
//   - phone: Contact phone number
//   - linkedin: LinkedIn profile URL (leave as '' if not available)
//   - instagram: Instagram profile URL (leave as '' if not available)
//   - avatar: Photo image imported from the assets folder
// ══════════════════════════════════════════════════════════════════════════════

// Photo Assets
import memberImg1 from '../assets/members/sayan.webp'
import memberImg2 from '../assets/pastphotos/WhatsApp Image 2026-09-14 at 03.03.17 (1).webp'
import memberImg3 from '../assets/pastphotos/WhatsApp Image 2026-09-14 at 03.03.17 (3).webp'
import memberImg4 from '../assets/pastphotos/WhatsApp Image 2026-09-14 at 03.03.17 (4).webp'
import memberImg5 from '../assets/pastphotos/WhatsApp Image 2026-09-14 at 03.03.17 (5).webp'
import memberImg6 from '../assets/pastphotos/WhatsApp Image 2026-09-14 at 03.03.17 (6).webp'
import memberImg7 from '../assets/pastphotos/WhatsApp Image 2026-09-14 at 03.03.17 (7).webp'
import memberImg8 from '../assets/pastphotos/WhatsApp Image 2026-09-14 at 03.03.17 (8).webp'
import memberImg9 from '../assets/pastphotos/WhatsApp Image 2026-09-14 at 03.03.17 (9).webp'
import memberImg10 from '../assets/pastphotos/WhatsApp Image 2026-09-14 at 03.03.17 (10).webp'
import memberImg11 from '../assets/pastphotos/WhatsApp Image 2026-09-14 at 03.03.17 (11).webp'
import memberImg12 from '../assets/pastphotos/WhatsApp Image 2026-09-14 at 03.03.16.webp'

// Export all photo assets so you can re-use them easily
export const MEMBER_ASSETS = {
  memberImg1,
  memberImg2,
  memberImg3,
  memberImg4,
  memberImg5,
  memberImg6,
  memberImg7,
  memberImg8,
  memberImg9,
  memberImg10,
  memberImg11,
  memberImg12
}

/**
 * CORE TEAM MEMBERS LIST
 * Edit, add, or remove items here to update the Meet the Team cards.
 */
export const CORE_MEMBERS = [
  {
    id: 1,
    name: 'Sayan Patra',
    role: 'Lead Web Developer',
    email: 'sayanpatra3097@gmail.com',
    phone: '+91 9832403097',
    linkedin: 'https://www.linkedin.com/in/sayan-patra-582b80378?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    instagram: 'https://www.instagram.com/s4ysayan?stkn=MTkwdGkyeXJhMmFm',
    avatar: memberImg1,
    socials: {
      email: 'sayanpatra3097@gmail.com',
      phone: '+91 9832403097',
      linkedin: 'https://www.linkedin.com/in/sayan-patra-582b80378?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      instagram: 'https://www.instagram.com/s4ysayan?stkn=MTkwdGkyeXJhMmFm'
    }
  },
  {
    id: 2,
    name: 'Harsh Raj',
    role: 'Core Organizing Committee',
    email: 'harshraj@techfest.org',
    phone: '+91 97022 76874',
    linkedin: '',
    instagram: '',
    avatar: '',
    socials: {
      email: 'harshraj@techfest.org',
      phone: '+91 97022 76874',
      linkedin: '',
      instagram: ''
    }
  },
  {
    id: 3,
    name: 'Adrija Dutta',
    role: 'Core Organizing Committee',
    email: 'adrijadutta@techfest.org',
    phone: '+91 97022 76874',
    linkedin: '',
    instagram: '',
    avatar: '',
    socials: {
      email: 'adrijadutta@techfest.org',
      phone: '+91 97022 76874',
      linkedin: '',
      instagram: ''
    }
  },
  {
    id: 4,
    name: 'Anup Mazumdar',
    role: 'Core Organizing Committee',
    email: 'anupmazumdar@techfest.org',
    phone: '+91 97022 76874',
    linkedin: '',
    instagram: '',
    avatar: '',
    socials: {
      email: 'anupmazumdar@techfest.org',
      phone: '+91 97022 76874',
      linkedin: '',
      instagram: ''
    }
  },
  {
    id: 5,
    name: 'Abhishek Lama',
    role: 'Core Organizing Committee',
    email: 'abhisheklama@techfest.org',
    phone: '+91 97022 76874',
    linkedin: '',
    instagram: '',
    avatar: '',
    socials: {
      email: 'abhisheklama@techfest.org',
      phone: '+91 97022 76874',
      linkedin: '',
      instagram: ''
    }
  },
  {
    id: 6,
    name: 'Neilkshitij Ray',
    role: 'Core Organizing Committee',
    email: 'neilkshitijray@techfest.org',
    phone: '+91 97022 76874',
    linkedin: '',
    instagram: '',
    avatar: '',
    socials: {
      email: 'neilkshitijray@techfest.org',
      phone: '+91 97022 76874',
      linkedin: '',
      instagram: ''
    }
  }
]

export const teamMembers = CORE_MEMBERS
export default CORE_MEMBERS
