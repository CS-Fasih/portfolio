/**
 * Static portfolio data — education, skills, experience, projects.
 * Used by components to render content without API calls.
 */

export const ownerInfo = {
    name: 'Muhammad Fasih',
    title: 'AI/ML Engineer & Full-Stack Developer',
    tagline: 'Building intelligent systems at the intersection of AI and the web.',
    email: 'YOUR_EMAIL',
    github: 'https://github.com/YOUR_GITHUB_USERNAME',
    linkedin: 'YOUR_LINKEDIN_URL',
    fiverr: 'https://www.fiverr.com/cs_fasih',
    location: 'Karachi, Pakistan',
};

export const heroTitles = [
    'AI/ML Engineer',
    'Full-Stack Developer',
    'Chess Master (2200+)',
    'Final Year CS Student',
];

export const aboutText = [
    "I'm Muhammad Fasih — an AI/ML engineer and full-stack developer currently in my final year of Computer Science at Dawood University of Engineering & Technology, Karachi. I build systems that sit at the crossroads of machine learning and production-grade web applications.",
    "From training YOLOv11 models for satellite-based building detection to shipping full-stack MERN applications on Fiverr, my work spans the entire pipeline: data preprocessing, model training, API development, and deployment. I believe great software is measured not by its complexity, but by the clarity of its engineering.",
    "When I'm not writing code, you'll find me playing competitive chess — rated 2200+ — which has sharpened both my strategic thinking and my patience for debugging race conditions at 2 AM.",
];

export const stats = [
    { number: '4+', label: 'Years Coding' },
    { number: '20+', label: 'Projects Built' },
    { number: '5★', label: 'Fiverr Rating' },
    { number: '2200+', label: 'Chess Rating' },
];

export const education = [
    {
        degree: 'BS Computer Science',
        institution: 'Dawood University of Engineering & Technology, Karachi',
        period: '2022 — 2026',
        description: 'Final year project: GeoExtract — satellite-based building detection using YOLOv11x-seg.',
        coursework: [
            'Machine Learning',
            'Deep Learning',
            'Data Structures',
            'Algorithms',
            'Database Systems',
            'Software Engineering',
            'Operating Systems',
        ],
    },
    {
        degree: 'Intermediate (FSc Pre-Engineering)',
        institution: 'Your College Name — Karachi',
        period: '2020 — 2022',
        description: 'Pre-engineering track with focus on mathematics and physics.',
        coursework: [],
    },
    {
        degree: 'Matriculation (SSC)',
        institution: 'Your School Name — Karachi',
        period: '2018 — 2020',
        description: 'Science track with distinction.',
        coursework: [],
    },
];

export const skillCategories = [
    {
        title: 'AI / ML',
        skills: [
            { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
            { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
            { name: 'Scikit-Learn', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
            { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
            { name: 'YOLO', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
        ],
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
            { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
            { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
            { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
        ],
    },
    {
        title: 'Frontend',
        skills: [
            { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        ],
    },
    {
        title: 'DevOps & Tools',
        skills: [
            { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
            { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
            { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        ],
    },
    {
        title: 'Databases',
        skills: [
            { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
            { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
            { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        ],
    },
    {
        title: 'Languages',
        skills: [
            { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
            { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        ],
    },
];

export const featuredProject = {
    name: 'GeoExtract',
    description:
        'YOLOv11x-seg satellite building detection API — deployed on Modal.com. Detects individual buildings from high-resolution satellite imagery using SAHI-based tiled inference with advanced NMS post-processing.',
    tech: ['YOLOv11', 'Python', 'FastAPI', 'Modal', 'SAHI', 'OpenCV'],
    github: 'https://github.com/YOUR_GITHUB_USERNAME/GeoExtract',
    live: '',
};

export const projects = [
    {
        name: 'CineGraph',
        description: 'Movie recommendation engine with graph-based collaborative filtering.',
        tech: ['Python', 'Neo4j', 'FastAPI', 'React'],
        github: 'https://github.com/YOUR_GITHUB_USERNAME/CineGraph',
        live: '',
    },
    {
        name: 'MNIDS',
        description: 'ML-based network intrusion detection system with real-time traffic analysis.',
        tech: ['Python', 'Scikit-Learn', 'Scapy', 'Flask'],
        github: 'https://github.com/YOUR_GITHUB_USERNAME/MNIDS',
        live: '',
    },
    {
        name: 'Kartevo',
        description: 'Full-stack e-commerce platform with role-based access and payment integration.',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        github: 'https://github.com/YOUR_GITHUB_USERNAME/Kartevo',
        live: '',
    },
];

export const experience = [
    {
        role: 'Freelance Developer',
        company: 'Fiverr — CS_Fasih',
        period: '2023 — Present',
        description: 'Delivering AI/ML solutions, Python scripting, and MERN stack development for international clients.',
        highlights: [
            'Built custom machine learning pipelines for computer vision and NLP tasks',
            'Developed full-stack web applications with React, Node.js, and MongoDB',
            'Maintained 5-star rating with consistent on-time delivery',
            'Specialized in data preprocessing, model training, and API deployment',
        ],
    },
    {
        role: 'Internship',
        company: 'Your Company — Karachi',
        period: 'Month Year — Month Year',
        description: 'Placeholder — update with your internship details.',
        highlights: [
            'Placeholder task 1',
            'Placeholder task 2',
        ],
    },
];

export const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];
