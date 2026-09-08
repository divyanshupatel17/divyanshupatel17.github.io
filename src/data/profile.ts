/* Every user facing string on the site, so a copy pass touches one file. */

export const profile = {
  name: 'Divyanshu Patel',
  initials: 'DP',
  role: 'AI and ML engineer',
  location: 'Chennai, India',
  email: 'divyanshupatel.dev@gmail.com',
  phone: '+91 9301503581',
  site: 'divyanshupatel.com',
  resumeHref: '/resume.pdf',
}

export const navLinks = [
  { label: 'work', href: '#work' },
  { label: 'beyond', href: '#beyond' },
  { label: 'about me', href: '#about' },
  { label: 'resume', href: profile.resumeHref, external: true },
]

export const hero = {
  greeting: 'Hi, I’m',
  greetingName: 'Divyanshu',
  headline: [
    { text: 'AI and ML engineer, with', em: null },
    { text: 'a love for ', em: 'intelligent' },
    { text: 'systems ', em: '& thoughtful' },
    { text: 'interfaces', em: null },
  ],
  credit: 'Researching at ISRO',
}

export const work = {
  title: 'selected work',
  subtitle: 'things I have designed, trained and shipped',
  projects: [
    {
      id: 'vit-verse',
      title: 'VIT Verse',
      blurb:
        'A production Flutter app for student productivity, serving 4,000+ active users. Offline first architecture on Firebase, Supabase and SQLite, with push notifications, real time sync and secure media storage.',
      tags: ['Flutter', 'Firebase', 'Supabase', 'SQLite'],
      meta: 'Jan 2024 — Feb 2026',
      status: 'Live',
      accent: 'sky',
      size: 'wide',
    },
    {
      id: 'isro-gnn',
      title: 'Satellite Routing with GNNs',
      blurb:
        'Graph Neural Networks applied to inter satellite routing in LEO constellations at URSC ISRO, modelling topology as dynamic time varying graphs to cut latency, link contention and handover overhead.',
      tags: ['PyTorch', 'GNN', 'Research'],
      meta: 'URSC ISRO, Bengaluru',
      status: 'Ongoing',
      accent: 'violet',
      size: 'tall',
    },
    {
      id: 'digital-twin',
      title: 'Self Healing Monocular Digital Twin',
      blurb:
        'An end to end digital twin pipeline for autonomous edge vehicles. Ingests dashcam video, simulates fog, blur and occlusion, then recovers degraded regions and reconstructs approximate scene geometry from a single RGB camera.',
      tags: ['YOLOv8', 'React', 'Three.js', 'FastAPI'],
      meta: 'Vision and 3D',
      status: 'GitHub',
      accent: 'mint',
      size: 'wide',
    },
    {
      id: 'leukemia',
      title: 'Leukemia Diagnosis System',
      blurb:
        'A deep learning pipeline for multi class leukemia cell classification on 3,256 labelled blood cell images, reaching 98.93% accuracy with EfficientNetV2 and Grad-CAM heatmaps for clinically readable predictions.',
      tags: ['EfficientNetV2', 'Grad-CAM', 'TensorFlow'],
      meta: '98.93% accuracy',
      status: 'GitHub',
      accent: 'pink',
      size: 'tall',
    },
  ],
}

export const beyond = {
  title: 'beyond the work',
  subtitle: 'what I get up to when the training run is going',
  note: {
    heading: 'to-do more & more',
    items: [
      { text: 'Portfolio 2.0', done: true },
      { text: 'Ship VIT Verse v3', done: false },
      { text: 'Win hackathon #21', done: false },
      { text: 'Read more papers', done: false },
      { text: 'more & more.......', done: false },
    ],
  },
  facts: [
    { label: 'hackathons', value: '20+' },
    { label: 'app users', value: '4,000+' },
    { label: 'CGPA', value: '8.9' },
  ],
}

export const about = {
  title: 'about me',
  paragraphs: [
    'I am a Computer Science undergraduate at VIT Chennai specialising in AI and ML, currently a Summer Research Trainee at URSC ISRO in Bengaluru.',
    'I like the whole span of a system: the model that learns, the service that serves it, and the interface someone actually touches. That has meant graph neural networks for satellite routing, a Flutter app with four thousand users, and twenty odd hackathons of shipping things quickly.',
  ],
  education: {
    school: 'Vellore Institute of Technology, Chennai',
    degree: 'B.Tech, Computer Science and Engineering (AI and ML)',
    period: 'Aug 2023 — May 2027',
    detail: 'CGPA 8.9 / 10',
  },
  skills: [
    { group: 'Languages', items: ['C++', 'Java', 'Python', 'JavaScript', 'Dart'] },
    { group: 'Frameworks', items: ['Flutter', 'React', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Streamlit'] },
    { group: 'Cloud and backend', items: ['Firebase', 'Supabase', 'Google Cloud Storage', 'REST APIs', 'SQL', 'SQLite'] },
    { group: 'Core areas', items: ['Graph Neural Networks', 'Deep Learning', 'Explainable AI', 'Mobile Development', 'System Design'] },
  ],
}

export const footer = {
  heading: ['build build build?', 'let’s catchup soon'],
  subheading: 'Drop me a ‘Hi’ and I’ll get back',
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/patel-divyanshu', icon: 'linkedin' as const },
    { label: 'GitHub', href: 'https://github.com/divyanshupatel17', icon: 'github' as const },
    { label: 'Instagram', href: 'https://www.instagram.com/patel_divyanshu_/', icon: 'instagram' as const },
    { label: 'Email', href: 'mailto:itzdivyanshupatel@gmail.com', icon: 'mail' as const },
  ],
}
