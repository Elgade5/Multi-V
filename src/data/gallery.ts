export interface GalleryItem {
  id: number
  title: string
  description: string
  image: string | null
  category: 'verification' | 'logs' | 'setup' | 'captcha' | 'other'
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Button Verification',
    description: 'User clicks the matching code among 4 buttons in DMs.',
    image: '/gallery/Screenshot_2026-03-14_162312.png',
    category: 'verification',
  },
  {
    id: 2,
    title: 'CAPTCHA Challenge',
    description: 'Distorted image CAPTCHA with an ephemeral modal — no DM required.',
    image: '/gallery/Screenshot_2026-03-14_162539.png',
    category: 'captcha',
  },
  {
    id: 3,
    title: 'Verification Logs',
    description: 'Real-time logs for every verification attempt in your logs channel.',
    image: '/gallery/Screenshot_2026-03-14_162752.png',
    category: 'logs',
  },
  {
    id: 4,
    title: 'Verification Successful',
    description: 'Roles are automatically granted on successful verification.',
    image: '/gallery/Screenshot_2026-03-14_162815.png',
    category: 'setup',
  },
  {
    id: 5,
    title: 'Emoji Verification',
    description: 'Users click the matching emoji from 4 shuffled choices.',
    image: '/gallery/Screenshot_2026-03-14_170016.png',
    category: 'verification',
  },
  {
    id: 6,
    title: 'Math Challenge',
    description: 'User solves a math problem and types the answer in DMs.',
    image: '/gallery/Screenshot_2026-03-14_170116.png',
    category: 'verification',
  },
]