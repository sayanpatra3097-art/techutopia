'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────

const HACKATHON_DATE = new Date('2026-03-14T09:00:00+05:30');

function useCountdown() {
    const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
    useEffect(() => {
        const tick = () => {
            const diff = HACKATHON_DATE.getTime() - Date.now();
            if (diff <= 0) return;
            setT({
                d: Math.floor(diff / 86400000),
                h: Math.floor((diff % 86400000) / 3600000),
                m: Math.floor((diff % 3600000) / 60000),
                s: Math.floor((diff % 60000) / 1000),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    return t;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

type DomainKey = 'aiml' | 'cybersecurity' | 'blockchain' | 'fintech' | 'bounty' | 'webdev' | 'bounty_tishitu';

interface ProblemStatement {
    id: string;
    domain: DomainKey;
    title: string;
    description: string;
}

interface Domain {
    key: DomainKey;
    label: string;
    icon: string;
    color: string;
    rgb: string;
    glyph: string;
    count: number; // number of problem statements in this domain
    maxTeams: number; // max teams per problem statement
    sponsor?: string;
    prize?: string;
}

const SUBMISSIONS_CLOSED = true;

const DOMAINS: Domain[] = [
    { key: 'aiml',          label: 'AI / ML',          icon: '🤖', color: '#8b5cf6', rgb: '139,92,246',  glyph: 'I',   count: 29, maxTeams: 2 },
    { key: 'cybersecurity', label: 'Cyber Security',   icon: '🛡️', color: '#10b981', rgb: '16,185,129',  glyph: 'II',  count: 24, maxTeams: 2 },
    { key: 'blockchain',    label: 'Blockchain',        icon: '⛓️', color: '#3b82f6', rgb: '59,130,246',  glyph: 'III', count: 27, maxTeams: 5, sponsor: 'HELA LABS', prize: '$100' },
    { key: 'fintech',       label: 'FinTech',           icon: '⚡', color: '#d4af37', rgb: '212,175,55',  glyph: 'IV',  count: 29, maxTeams: 2 },
    { key: 'webdev',        label: 'Web Dev',           icon: '🌐', color: '#14b8a6', rgb: '20,184,166',  glyph: 'V',   count: 11, maxTeams: 2 },
    { key: 'bounty',        label: 'Bounty',            icon: '🏆', color: '#ef4444', rgb: '239,68,68',   glyph: 'VI',  count: 5,  maxTeams: 5, sponsor: 'HELA LABS', prize: '$100' },
    { key: 'bounty_tishitu', label: 'Bounty',           icon: '🎁', color: '#ff69b4', rgb: '255,105,180', glyph: 'VII', count: 10, maxTeams: 999, sponsor: 'Tishitu', prize: 'Top 3: 60% off Fullstack Course + Internships | All: 30% off' },
];

function makePSID(domain: DomainKey, n: number) {
    return `${domain}-${n}`;
}

function makePSTitle(domain: DomainKey, n: number, domainLabel: string) {
    return `${domainLabel}-${n}`;
}

const PS_TITLES: Partial<Record<DomainKey, string[]>> = {
    aiml: [
        'Intelligent Financial Transaction Graph Analytics System for Money Trail Detection',
        'AI-Driven District Governance Intelligence & Predictive Monitoring System',
        'Automated Essay Evaluation Using Multi-Aspect Semantic Understanding',
        'Fake News Detection Under Adversarial and Concept Drift Conditions',
        'GenAI-Powered Adaptive Teacher Training & Competency Intelligence Platform',
        'AI-Driven Impact Design & Validation Engine for Education Programs',
        'Predictive AI-Driven Tourist Risk Intelligence & Decentralized Emergency Response Network',
        'AI-Powered Real-Time Railway Traffic Optimization & Decision Support System',
        'Privacy-Preserving Adaptive AI Digital Twin for Productivity Automation',
        'AI-Driven Predictive Disaster Intelligence & Resource Optimization Platform',
        'AI-Powered Rural Primary Care Decision Support & Early Risk Detection Platform',
        'Adaptive AI-Powered Personal Knowledge Twin & Lifelong Cognitive Assistant',
        'Visual ML Studio: Node-Based Deep Learning Model Builder & Training Platform',
        'AI-based automated system to detect damaged, misplaced, or defective exhibits in galleries',
        'Autonomous Multi-Agent AI System for End-to-End Intelligent Decision Automation',
        'Probabilistic Aircraft Search Zone Prediction & Rescue Optimization System',
        'Adaptive AI Code Learning Diagnostic & Concept Correction Engine',
        'AI-driven platform for accelerated drug discovery',
        'AI-Based Multi-Modal Drone vs Bird Classification System',
        'Hyperlocal Air Quality Intelligence & Health Risk Prediction Platform',
        'Predictive & Autonomous Maintenance Optimization Platform',
        'Just-in-Time Classroom Coaching & Pedagogical Support System',
        'Automated Radiology Report Generation & Clinical Insight System',
        'AI Tutor and Personalized Learning Path Designer',
        'Immersive AR/VR Learning Platform for Complex Concepts',
        'AI-Based Mental Health Support Chatbot with Crisis Detection',
        'AI-Powered Real-Time Sign Language Translator',
        'Smart Glasses for Visually Impaired Navigation and Obstacle Detection',
        'AI Fashion Stylist and Intelligent Shopping Advisor'
    ],
    blockchain: [
        'Onchain Trading Card Game Framework',
        'Infrastructure for Autonomous Agents',
        'Stablecoins for Real World Payments',
        'Cross-Chain Messaging Protocol',
        'Chain-Native Social Graph',
        'Onchain Subscription Platform',
        'Entire Onchain Dating App',
        'Onchain Ticketing + Marketplace',
        'Open and Market-Based Scientific Publications',
        'P2P Communication System',
        'Decentralized Computing Network',
        'AI Agent for Information Grabbing',
        'WhatsApp-Based Crypto Transfer App',
        'Web3 Browser',
        'Agent Marketplace',
        'Personal Onchain AI Treasurer',
        'NFTR (Non-Fungible Time Receipts)',
        'Stable-Yield Money Market',
        'Merchant Checkout SDK',
        'PayStream: Real-Time Payroll Streaming Protocol',
        'Geo-Based Incentive Layer',
        'Onchain Scheduler (Cron)',
        'Global Name Service',
        'Esports Betting Exchange',
        'Fully Onchain Tower Defense Game',
        'Onchain Identity Passport',
        'Full Music NFTs Platform'
    ],
    cybersecurity: [
        'Blockchain-Based Botanical Traceability for Ayurvedic Herbs',
        'Adversarially Robust Zero-Day Malware Detection',
        'AI Threat Exposure & Adaptive Risk Scoring Engine',
        'Adaptive AI-Driven Deception Honeypot & Threat Intelligence Engine',
        'Unveiling Vulnerabilities in Google-Approved Applications',
        'Adaptive On-Device Ransomware Early Warning & Autonomous Containment',
        'Cross-Platform Threat Intelligence & Coordinated Campaign Detection',
        'Multi-Modal Deepfake Detection & Digital Media Forensics Platform',
        'Lightweight Secure Digital Banking Framework for Low-Resource Environments',
        'Adaptive Graph-Based Network Intrusion Intelligence',
        'Post-Quantum Secure Messaging & Metadata-Resilient Communication',
        'Software-Defined Secure P2P Communication for Network-Denied Environments',
        'Advanced Mobile Network Packet Intelligence for Kali NetHunter',
        'Secure Hiring Infrastructure with Resume Threat Scanning',
        'Multi-Cloud AI-Powered Configuration Risk Assessment',
        'Adaptive Authentication Framework for Rural Digital Banking',
        'IoT Surveillance Security & Forensic Investigation Support',
        'AI-Powered Secure Code Vulnerability Scanner & Auto-Remediation',
        'Enterprise Mental Wellness AI with Insider Threat Monitoring',
        'Behavioral Password Security Analyzer and Habit Coach',
        'Adversarial AI Defense System for Large Language Models',
        'Intelligent Software Supply Chain Risk Assessment Platform',
        'Hybrid Post-Quantum Secure Communication Framework',
        'Real-Time Deepfake and Synthetic Media Detection Engine'
    ],
    fintech: [
        'Alternative Data Credit Risk Management Model',
        'AI-Powered Real-Time Fraud Risk Management System',
        'AI-Enabled STP Digital Agri Loan Processing & Land Verification',
        'Adaptive Real-Time Data Breach Intelligence & Exposure Risk Platform',
        'AI-Driven Continuous Biometric Authentication for Wearable Payments',
        'Embedded Smart Settlement & Social Credit Infrastructure for UPI',
        'AI-Driven Regulatory Harmonization and Rule Codification Engine',
        'AI-Enabled Dynamic Insurance Pricing Using Connected Device Data',
        'Augmented Credit Underwriting Using Alternative Data Intelligence',
        'Unified Multi-Merchant Loyalty Rewards Exchange Platform',
        'AI-Powered Expense Anomaly Detection & Compliance Monitoring Agent',
        'Conversational Cross-Platform Payment Integration Solution',
        'Personalized Financial Protection Recommendation Engine',
        'Multilingual Voice & Text Banking Platform for Inclusive Access',
        'AI-Driven Automated Log Analysis & Threat Detection for Banking SOCs',
        'Predictive Customer Attrition Analytics for Corporate Banking',
        'Comprehensive Personal Finance Education & Planning Platform',
        'Dynamic Investment Profiling & Advisory Intelligence Platform',
        'Real-Time Counterparty Risk & Market Exposure Monitoring Platform',
        'AI-Driven Workforce Risk & Reskilling Intelligence Platform',
        'Advanced Collateral Optimization & Risk Mitigation Platform',
        'Low-Cost Digital Payment Solution for Micro-Merchants & Hawkers',
        'Interoperable Biometric Digital Wallet & Cross-Bank Payment Platform',
        'Lean Online Banking for Digital Marketplace Customers',
        'Virtual Savings Vault for Smart Spending',
        'Automated GST Return Management for Small Businesses',
        'AI Resume Analyzer and Skill-Based Credit & Job Matching',
        'AI-Driven Urban Traffic Optimization for Fleet Finance',
        'Code Debugging and Optimization Assistant for Fintech Systems'
    ],
    bounty: [
        'Hela Network Gas Price Prediction',
        'Hela DeFi Yield Optimizer',
        'Hela Decentralized Identity (DID)',
        'Cross-Chain Interoperability Bridge for Hela tokens',
        'Hela On-Chain Gaming Asset Management'
    ],
    bounty_tishitu: [
        'AI-Powered Smart Crop Disease Detection System',
        'IoT-Based Smart Water Management System for Rural Areas',
        'AI-Based Traffic Congestion Prediction and Smart Signal Control',
        'Smart Waste Segregation System Using AI and IoT',
        'AI-Based Early Flood Prediction System',
        'Smart Energy Monitoring System for Households',
        'AI-Powered Healthcare Diagnostic Assistant',
        'IoT-Based Smart Livestock Health Monitoring System',
        'AI-Based Fake News Detection System for Social Media',
        'Smart Air Quality Monitoring and Prediction System'
    ],
    webdev: [
        'Line-Focused Book Companion',
        'Security Vulnerability Scanner for Modern Web Apps',
        'Web Performance & Core Web Vitals Optimizer',
        'First Collaborative Web IDE for Developer Workflows',
        'Personal Future Timeline Simulator',
        'Smart Urban Anti-Drone Monitoring System',
        'Intelligent Patient Appointment Scheduling & Optimization System',
        'Startup Mentorship & Community Collaboration Platform',
        'Intelligent Appointment Booking and Schedule Management Assistant',
        'AI-Enhanced Real-Time Price Comparison Browser Extension',
        'Augmented Reality Navigation Helper Mobile Application'
    ]
};

const PS_DESCRIPTIONS: Record<DomainKey, string[]> = {
    aiml: [
        'This project proposes an intelligent financial network analysis platform that models bank accounts and transactions as a dynamic graph to assist law enforcement in detecting money laundering patterns. The system constructs transaction networks, identifies layering structures, circular fund flows, and high-risk accounts using graph algorithms and rule-based risk scoring. An interactive spider-map visualization with temporal filtering enables investigators to trace complex money trails efficiently and uncover hidden financial crime networks.',
        'This system provides a unified district-level governance dashboard that aggregates FIR registrations, public complaints, and administrative applications into a centralized platform. Beyond basic reporting, the system applies data analytics and machine learning to detect crime trends, predict high-risk zones, monitor complaint resolution efficiency, and generate automated alerts for abnormal activity spikes. Interactive visualizations, heatmaps, and performance metrics enable authorities to make faster, data-driven decisions and improve public service delivery.',
        'Design an AI system that can automatically evaluate long-form student essays by scoring them across multiple dimensions such as coherence, argument strength, factual correctness, originality, and writing quality. The system must go beyond surface-level grammar checks and instead perform deep semantic analysis to understand intent, logical flow, use of evidence, and relevance to the prompt. Essays may contain sarcasm, indirect arguments, or creative structures, making rule-based evaluation ineffective. The model should also detect hallucinated facts, biased arguments, and plagiarism paraphrased using LLMs. The solution must scale to thousands of submissions with minimal latency while maintaining explainability for each score component.~ Inter-IIT Tech Meet',
        'Design a robust fake news detection system that remains effective under adversarial attacks and continuous concept drift. News articles may be deliberately crafted to bypass known linguistic cues and may mix factual information with subtle misinformation. The system must reason over cross-article consistency, source credibility, temporal evolution of narratives, and external knowledge graphs. Static supervised learning approaches will fail due to rapid topic shifts and coordinated misinformation campaigns, so the solution must include online learning or self-updating mechanisms without catastrophic forgetting~ Data Science Hackathon – NLP Track (Conducted by IIIT Hyderabad)',
        'An AI-driven adaptive content platform designed to modernize teacher training for DIETs and SCERTs by enabling rapid, need-based curriculum updates. The system analyzes teacher competency gaps, regional learning challenges, and real-time educational data to automatically generate contextualized, micro-learning training modules using Generative AI. With integrated dashboards for cohort planning and impact tracking, the platform reduces curriculum update cycles while improving training relevance, teacher satisfaction, and classroom implementation outcomes',
        'An intelligent, gamified program design platform that enables education-focused NGOs to build coherent, measurable, and evidence-backed Logical Frameworks. The system uses AI-powered causal mapping, outcome validation, and indicator consistency checks to automatically assess alignment between problems, interventions, stakeholders, and measurable impact. It integrates a pattern library of proven education interventions, risk modeling, and automated impact scoring to ensure feasibility and implementation readiness. Real-time dashboards provide review-grade outputs, donor-ready documentation, and measurable design quality metrics.',
        'A smart tourism safety platform that combines predictive AI risk modeling, geo-fencing, and decentralized incident logging to proactively protect tourists in high-risk and remote regions. The system generates dynamic risk scores using historical crime data, terrain sensitivity, weather inputs, and movement patterns to issue preventive alerts before potential incidents occur. A mobile app enables panic-triggered live location sharing, while an AI engine detects abnormal behavior such as route deviation or prolonged inactivity. Blockchain-backed incident logging ensures tamper-proof evidence trails, and a centralized dashboard provides authorities with real-time heat maps, search prediction support, and coordinated emergency response tools—creating a scalable, privacy-conscious ecosystem for modern tourist safety management.',
        'An intelligent decision-support platform designed to assist railway section controllers in optimizing train movements in real time. The system uses AI and operations research techniques to generate conflict-free routing, precedence decisions, and platform allocations under complex constraints such as safety rules, signalling limits, and network congestion. It dynamically re-optimizes schedules during disruptions, supports what-if scenario simulations, and provides explainable recommendations through an interactive dashboard—improving punctuality, throughput, and overall network efficiency.',
        'An intelligent web platform that builds a personalized AI digital twin by learning a user’s communication style, task patterns, and decision preferences through adaptive NLP and feedback-driven modeling. The system automates context-aware email responses, smart scheduling, priority-based summarization, and research filtering while maintaining strict privacy controls and explainable action logs. Designed for secure and scalable productivity enhancement, it continuously refines outputs based on user feedback without exposing sensitive data.',
        'An AI-powered disaster intelligence platform that aggregates real-time data from social media, weather alerts, and open sources to detect and validate emerging disaster events. Using NLP, geospatial clustering, and predictive risk scoring, the system generates dynamic severity maps and recommends optimized resource allocation for faster, data-driven emergency response.',
        'A scalable digital healthcare platform designed to assist rural health workers with AI-driven symptom-based triage and early risk detection. The system analyzes patient inputs to provide preliminary diagnostic guidance, identify high-risk cases (such as maternal or critical conditions), and recommend timely referrals to higher medical centers. Built for low-bandwidth environments, it aims to reduce diagnostic delays, improve care quality, and ease hospital overcrowding in underserved rural regions.',
        'An AI-driven personal knowledge twin that continuously ingests, organizes, and contextualizes a user’s documents, conversations, and learning materials into a dynamic knowledge graph. The system evolves over time, linking concepts, reinforcing key insights, and generating contextual summaries and cross-domain connections. By functioning as a lifelong second brain, the platform enhances retention, accelerates recall, and transforms passive information consumption into structured, actionable intelligence.',
        'A graphical, node-based machine learning development platform that enables users to visually construct, configure, and train neural network models without writing code. The system supports preprocessing nodes, customizable layer modules, and training configurations, with real-time performance visualization and architecture rendering. Models can be exported to standard formats such as TensorFlow and PyTorch, enabling seamless integration into production pipelines while simplifying experimentation and learning.',
        'Galleries and museums require regular monitoring to ensure exhibits are not damaged, misplaced, or defective. This problem statement challenges participants to develop an AI-based computer vision system that automatically identifies defective or abnormal exhibits using images or video feeds. The solution should enable timely detection and assist curators in maintaining exhibit quality and visitor experience.',
        'A goal-driven autonomous AI agent framework capable of multi-step reasoning, dynamic tool orchestration, and adaptive execution across real-world workflows. Leveraging agent-orchestration frameworks such as inia.ai, the system decomposes complex objectives into actionable plans, autonomously selects and executes tools, maintains contextual memory, and self-evaluates outcomes to refine decisions. Designed to move beyond simple task automation, the platform demonstrates scalable, self-directed AI capable of intelligent end-to-end process execution.',
        'An intelligent aviation search-support system that applies probabilistic modeling and machine learning to predict and visualize the most likely search zones for a missing aircraft based on its last known flight parameters, weather conditions, fuel constraints, and trajectory uncertainty. The platform generates dynamic probability heatmaps and optimized search paths to assist rescue authorities in reducing response time and operational cost during search and recovery missions.',
        'An intelligent AI-driven learning diagnostic system that analyzes student code to detect conceptual misunderstandings, logical reasoning gaps, and recurring mistake patterns rather than simply providing debugging hints. The platform generates progressive guidance, targeted concept reinforcement, and personalized remediation pathways based on individual learning behavior. By combining static code analysis, AST-based reasoning, and adaptive pedagogical modeling, the system enhances deep conceptual understanding and long-term coding proficiency.',
        'The system should use machine learning models to analyze molecular structures and biological data to predict potential drug effectiveness. By narrowing down viable candidates early, the platform aims to reduce the time, cost, and experimentation required in traditional drug discovery pipelines.',
        'An intelligent airspace monitoring system that leverages multi-modal AI techniques to distinguish drones from birds using visual, acoustic, and radar data. The platform integrates convolutional neural networks, signal processing, and temporal pattern analysis to achieve high-accuracy classification while minimizing false alarms. Designed for defense and critical infrastructure applications, the system enhances airspace security through reliable, real-time anomaly detection and threat discrimination.',
        'An intelligent environmental monitoring platform that collects and analyzes real-time air quality data from distributed sensors to generate hyperlocal pollution heatmaps and predictive exposure insights. Leveraging time-series modeling and anomaly detection, the system provides actionable health risk alerts and pollution trend forecasting. Designed for urban and semi-urban deployment, the platform supports informed public health decisions and smart city environmental management.',
        'An intelligent predictive maintenance system that leverages real-time sensor data (temperature, vibration, pressure, acoustic signals) to forecast equipment failure probabilities and remaining useful life (RUL). The platform integrates anomaly detection, probabilistic failure modeling, and adaptive maintenance threshold optimization to trigger automated maintenance decisions. By combining predictive analytics with workflow integration and downtime cost modeling, the system enables proactive interventions, reduces unplanned failures, and optimizes industrial operational efficiency.',
        'An intelligent AI-driven classroom assistant designed to provide teachers with real-time, context-aware guidance for addressing pedagogical challenges and classroom management issues. The platform analyzes teacher queries, classroom context, and learning objectives to deliver personalized micro-learning modules and evidence-based intervention strategies. By reducing the time between problem identification and resolution, the system enhances teaching effectiveness and supports scalable digital mentoring across public education systems.',
        'An advanced AI-driven medical imaging platform that analyzes radiology scans such as X-rays and CT images to automatically generate clinically accurate, structured diagnostic reports. The system detects abnormalities, correlates multiple visual patterns, and produces coherent medical narratives while providing uncertainty estimation and visual explainability. Designed to assist radiologists and reduce reporting time, the platform enhances diagnostic efficiency, consistency, and accessibility in healthcare settings.',
        'An adaptive AI system that analyzes student performance and learning style to automatically generate personalized lesson plans, practice questions, explanations, and study materials in real time.',
        'An interactive AR/VR platform that allows students to explore 3D models of anatomy, physics, history, and molecular structures in a fully immersive environment.',
        'A privacy-first AI companion that provides emotional support, mood tracking, and coping strategies while detecting severe distress and suggesting professional help.',
        'A mobile app that uses computer vision to translate sign language gestures into text and speech in real time, supporting multiple regional Indian sign languages.',
        'AI-powered smart glasses that detect obstacles and traffic signals in real time and provide audio and haptic guidance for safe navigation.',
        'A personalized AI stylist that recommends outfits based on body type, preferences, occasion, weather, and wardrobe, with virtual try-on support.'
    ],
    cybersecurity: [
        'A permissioned blockchain system tracks every stage of an Ayurvedic herb’s journey—from geo-tagged harvesting and processing to lab testing and final retail products. GPS-enabled devices record collection details, while smart contracts enforce sustainability guidelines and quality standards before data is added to the ledger. Each finished product carries a QR code that lets consumers instantly view its full provenance, lab reports, and compliance records via a simple web or mobile interface. This ensures authenticity, transparency, rapid recalls, and ethical, sustainable sourcing of Ayurvedic herbs.',
        'This project proposes an AI-driven malware detection system capable of identifying both known and previously unseen (zero-day) malware variants. The model combines static file analysis (code structure, byte patterns, API usage) with behavioral analysis (system calls, network activity, runtime actions) to detect obfuscated and evolving threats. By integrating anomaly detection and adversarial robustness techniques, the system aims to remain effective against evasion tactics while providing explainable and scalable malware classification for real-world cybersecurity applications.',
        'An adaptive cybersecurity risk assessment engine designed specifically for AI systems that identifies vulnerabilities such as data poisoning, adversarial attacks, prompt injection, and model theft. The platform performs automated attack surface mapping, simulated threat testing, and dynamic risk scoring to quantify impact and provide actionable mitigation recommendations for secure AI deployment.',
        'An intelligent deception platform that dynamically generates realistic, adaptive fake server environments to attract and engage attackers while collecting high-fidelity threat intelligence. The system uses AI to analyze attacker commands, classify attack intent, cluster behavioral patterns, and automatically evolve deception strategies in real time. By transforming passive defense into active threat learning, the platform enables security teams to understand emerging attack vectors and strengthen defenses proactively',
        'Despite rigorous security checks, vulnerabilities and privacy risks can still exist in Google Play Store–approved applications. This problem statement challenges participants to analyze, identify, and document security flaws, privacy issues, and functional vulnerabilities in selected legitimate Android applications. Participants should demonstrate responsible vulnerability discovery through analysis techniques, tools, and proof-of-concepts that contribute to improving application security and user safety.',
        'An adaptive on-device security system for Android that detects ransomware-like behavior in real time by monitoring abnormal file access, rapid encryption attempts, and suspicious process activity. The platform uses lightweight behavioral anomaly detection to trigger immediate containment actions and user alerts, preventing data loss while maintaining low resource consumption and user privacy.',
        'Design a cybersecurity-focused intelligence platform that monitors cross-platform digital ecosystems to detect coordinated influence operations, malicious bot networks, and large-scale information manipulation campaigns. The system should leverage NLP, graph-based propagation analysis, bot behavior modeling, and domain/IP reputation scoring to identify suspicious activity patterns in real time. By mapping coordinated threat actors, tracking narrative injection patterns, and generating explainable risk scores, the platform enhances proactive cyber defense against large-scale information operations and hybrid digital threats.',
        'Develop an advanced media forensics system capable of detecting AI-generated or manipulated videos, images, and audio using multi-modal deep learning techniques. The platform should analyze facial inconsistencies, temporal frame artifacts, voice spectral anomalies, and GAN fingerprint patterns to identify tampered media. By integrating adversarial robustness testing, explainable forensic indicators, and confidence scoring, the system aims to provide reliable authenticity verification for journalists, law enforcement, and digital platforms while minimizing false positives.',
        'Design a lightweight, privacy-preserving cybersecurity framework tailored for rural digital banking environments operating on low-end smartphones and intermittent connectivity. The system integrates anomaly-based transaction monitoring, behavioral biometrics, device fingerprinting, and multi-factor authentication optimized for low computational overhead. By leveraging edge-optimized machine learning models and secure cryptographic protocols, the platform detects fraudulent patterns in real time while ensuring seamless user experience and minimal bandwidth usage. The solution aims to enhance financial inclusion by strengthening transaction security in underserved regions',
        'An AI-driven network security platform that models real-time traffic as dynamic communication graphs to detect sophisticated and zero-day cyber threats beyond traditional signature-based systems. By learning baseline behavior of users, devices, and services, the system identifies anomalies such as lateral movement, command-and-control activity, and stealthy data exfiltration, while generating explainable, severity-ranked alerts with minimal false positives. Designed for scalable enterprise deployment, it continuously adapts to evolving network patterns and supports proactive threat response.',
        'Design a secure communication platform implementing forward secrecy, post-quantum cryptographic primitives, and metadata-resistant routing mechanisms to protect mission-critical military communications. The system should incorporate decentralized key exchange, deniable authentication, ephemeral session keys, traffic pattern obfuscation, and secure self-destruct protocols that prevent forensic recovery. By integrating secure enclave storage and minimal data retention architecture, the platform ensures confidentiality, integrity, and operational stealth even under adversarial surveillance conditions',
        'Design a secure, software-based peer-to-peer communication platform that enables encrypted messaging in network-denied or restricted environments without relying on traditional cellular or cloud infrastructure. The system should implement decentralized key exchange, forward secrecy, metadata minimization, and traffic obfuscation to prevent identity exposure and communication pattern analysis. By leveraging local device-to-device connectivity protocols (e.g., Wi-Fi Direct or Bluetooth mesh simulation), adaptive routing logic, and zero-trace message storage, the platform ensures confidential and resilient communication under adversarial monitoring conditions.',
        'Develop a mobile-integrated packet inspection and threat intelligence module for Kali NetHunter capable of real-time network traffic capture, deep packet inspection (DPI), protocol decoding, and anomaly detection. The system should identify suspicious traffic patterns, DNS tunneling, credential leaks, ARP spoofing attempts, and encrypted traffic anomalies while providing structured, severity-ranked alerts. With modular plugin support and real-time visualization dashboards, the platform enhances mobile penetration testing and on-field cyber reconnaissance capabilities.',
        'Design a secure recruitment web platform that not only allows job applications but actively defends against common web-based attacks such as SQL injection, XSS, CSRF, brute force attempts, and malicious file uploads. The system should implement secure authentication, input validation, role-based access control, and real-time attack detection. Resume uploads must be scanned for malicious payloads and suspicious file signatures. An integrated security monitoring dashboard should visualize attack attempts and log forensic details, transforming the platform into a live web security defense demonstration system.',
        'Design a multi-cloud security auditing platform that automatically analyzes infrastructure configurations across AWS, Azure, and GCP to detect high-risk misconfigurations such as open storage buckets, excessive IAM privileges, exposed services, and insecure network policies. The system integrates compliance benchmark mapping (CIS/NIST), dynamic risk scoring, drift detection, and automated remediation recommendations. By continuously monitoring configuration changes and visualizing risk posture through an interactive dashboard, the platform enables proactive cloud security management and breach prevention.',
        'A secure, low-resource cybersecurity framework designed to protect rural digital banking transactions through AI-driven fraud detection and adaptive user authentication. The system leverages behavioral anomaly detection, lightweight encryption, and risk-based verification mechanisms optimized for low-end smartphones and limited connectivity. By combining edge-based intelligence with minimal bandwidth usage, the platform enhances transaction security, reduces fraud risk, and supports safe financial inclusion in underserved regions.',
        'Develop practical and impactful technological solutions centered on IoT device (may include cameras) surveillance security, forensic investigation support, and intelligent monitoring systems that address the evolving challenges faced by law enforcement agencies. Secure CCTV cameras from hacking and data breaches. Use AI and Smart Analytics for real time threat detection and prevent spoofing or Use Agentic AI for Deepfake Detection & Authenticity Verification.',
        'An enterprise-grade IDE plugin that scans source code in real time for bugs, performance issues, and security vulnerabilities (OWASP Top 10), suggests secure fixes, and generates compliance reports.',
        'A privacy-preserving corporate AI wellness companion that monitors behavioral patterns (with consent) to detect stress-related insider risks and generates anonymized reports for HR and security teams.',
        'An intelligent tool that monitors password habits across platforms, detects risky patterns, and provides personalized feedback and suggestions to improve security hygiene.',
        'A robust security platform that detects and mitigates prompt injection, model poisoning, and adversarial attacks on LLMs in real time, providing protection layers and explainable alerts for enterprise AI deployments.',
        'An AI-powered tool that continuously scans third-party libraries, dependencies, and software supply chains for vulnerabilities, malicious updates, and hidden backdoors, generating risk scores and automated mitigation recommendations.',
        'A practical secure messaging and file-sharing system that combines classical and post-quantum cryptographic algorithms to protect data against future quantum computing threats while maintaining high performance.',
        'An advanced multi-modal AI system that detects deepfake videos, audio, and images in real time with high accuracy, providing forensic-level authenticity verification and alerts for organizations dealing with misinformation and impersonation attacks.'
    ],
    blockchain: [
        'Develop an onchain trading card game framework where all game state, including zones, timers, and seasons, is stored onchain. Players can engage in battles, craft new NFT assets, and earn quest drops, with integrated deck management and rarity curves.',
        'Build a specialized infrastructure that allows for the deployment of autonomous agent "bots" capable of taking onchain actions based on user intents, enabling automated DeFi strategies and governance participation.',
        'Stablecoins have settled over $11T onchain in 2022, surpassing Visa volume. This project focuses on building stablecoin payment applications for underserved regions (Latam, Africa, SE Asia) where fiat debasement and censorship make crypto-native payments a critical financial utility.',
        'Design a secure cross-chain messaging protocol that provides a unified bridging abstraction for seamless data and asset transfer between heterogeneous blockchain networks.',
        'Create a chain-native social graph that leverages wallet-based profiles, decentralized reputation layers, and trust scores to enable cross-platform social interactions without central intermediaries.',
        'Develop an onchain subscription platform for creators that supports recurring payments, creator-specific tokens, and unlockable content NFTs, providing a decentralized alternative to traditional subscription services.',
        'Build a privacy-preserving onchain dating app where matches, likes, and chats are recorded using zk-proofs. Leverage stable gas to enable micro-transactions like pay-per-message, pay-per-swipe, and exclusive content unlocks.',
        'Create a unified onchain ticketing and creator marketplace that integrates anti-bot proofs, resale royalties, and a creator-earnings bank where users can swap or provide liquidity in one tap.',
        'Leverage crypto primitives to disrupt traditional scientific journals. Build an open, market-driven publication platform where every paper comes with a prediction market on the integrity and impact of the research.',
        'Develop a P2P communication system that offers a decentralized Web3 application framework. Backend services are node-based, enabling peer-to-peer messaging without domain names or links, guarding against phishing and DDoS.',
        'Build a decentralized computing network designed for AI inference and training. Contributors earn HeLa tokens by providing GPU power, while developers run AI models without cloud restrictions or closed-model limitations.',
        'Design an AI agent specialized in autonomous information grabbing from decentralized data sources, providing structured intelligence for onchain decision-making and market analysis.',
        'Develop a WhatsApp-based crypto transfer application that allows users to send and receive assets using simple chat messages, bridging the gap between mainstream messaging and Web3 finance.',
        'Build a Web3 browser from the ground up for smartphones, featuring a built-in wallet, dApp store, powerful ad blocker, and a rewards engine that incentivizes exploring the decentralized web.',
        'Create an agent marketplace where users can trade, farm, schedule, and rebalance portfolios using autonomous AI agents. The platform should support diverse agents for content management and business assistance.',
        'Develop a personal onchain AI treasurer that autonomously manages savings, yield optimization, subscriptions, LP positions, bill payments, and daily budgeting for the user.',
        'Implement Non-Fungible Time Receipts (NFTR) for time-based DeFi. Build specialized contracts for time-locked yield passes, NFT-based vesting, tokenized recurring payments, and lease-to-own models.',
        'Design a stable-yield money market optimized for stable-gas environments. Predictable gas costs enable better UX for institutional tranches, overcollateralized lending, and automated risk management.',
        'Build a merchant checkout SDK that provides a "Stripe for Web3" experience. Leverage stable gas to offer one-line embed checkouts, subscription billing, and QR-based payments for offline merchants.',
        'Develop PayStream, a real-time payroll streaming protocol that allows businesses to stream salaries in USDC. Predictable gas costs make this commercial-friendly, with integrated tax deduction and HR dashboards.',
        'Create a geo-based incentive layer that rewards users for providing meaningful physical-world data and services, such as verifying geolocation, uploading environment data, or sharing bandwidth.',
        'Implement an onchain scheduler (Cron) for automated transactions, recurring subscriptions, and reminders, enabling sophisticated automation without manual intervention.',
        'Design a global name service analogous to ENS but with built-in DNS bridging and support for NFT-based avatars and cross-chain identity resolution.',
        'Build an esports betting exchange where land and assets are represented as NFTs priced by bonding curves. The platform should support peer-to-peer markets with minimal fees and high transparency.',
        'Develop a fully onchain tower defense game where towers are upgradeable NFTs that can be traded on open markets by players based on their strategic progression.',
        'Create an onchain identity passport that provides a unified, proof-based identity including citizenship, reputation, and XP, accessible across diverse decentralized applications.',
        'Design a comprehensive music NFT platform that enables creators to mint, distribute, and curate playlists while ensuring automated royalty distribution and fan engagement models.'
    ],
    fintech: [
        'FinTech companies are starting to use alternative sources of information, such as social media activity, mobile phone usage, and utility payments, to determine the credit risk far more accurately than traditional methods. This leads to a large part of the population in most emerging markets failing to access banking channels and consequently remain unbanked or underbanked, effectively denying lenders a gauge of their creditworthiness. Traditional scoring models depend on historical financial data like credit reports and bank statements to exclude persons and small-sized businesses with limited financial track records.',
        'The speed of movement of money domestically as well as internationally has been on an ever-increasing mode with the advent of disruptive payment systems, technologies and frameworks such as IMPS, UPI, ONDC and cross-border money transfers. Unfortunately, as the speed of payments increases along with real-time settlement, financial crime risks are on the rise at an appalling pace. The goal of this challenge is to have in place tools, models and frameworks which leverage data and analytics and use AI / ML technologies to prevent, detect, learn from and mitigate financial fraudulent activities and attacks at real time, while delivering a seamless digital banking experience.',
        'This project proposes an AI-driven end-to-end digital platform to enable Straight-Through Processing (STP) for agricultural loans by automating land record verification and customer identity linkage. The system leverages OCR, NLP-based vernacular language translation, and entity matching algorithms to extract, standardize, and authenticate state-level land records. By integrating with government land databases and mapping records to verified customer identifiers, the platform enables accurate title verification, seamless credit decisioning, and faster, secure digital agri loan disbursement.',
        'An advanced cybersecurity platform that continuously monitors dark web forums, breach repositories, and open-source intelligence feeds to detect leaked credentials and sensitive data in real time. The system performs AI-driven risk scoring, credential reuse detection, and account takeover probability analysis to prioritize threats and trigger automated mitigation workflows. Designed for both individuals and enterprises, the platform enables rapid response to data exposure incidents while maintaining scalable, privacy-conscious monitoring and forensic audit capabilities.',
        'A secure payment authentication system designed for wearable devices that combines continuous biometric verification, device-bound cryptographic tokens, and AI-based behavioral risk scoring. The platform analyzes physiological signals (heart rate variability, motion signatures) and contextual factors such as location and transaction patterns to ensure that payment authorization is continuously validated in real time. By implementing adaptive multi-factor authentication and zero-trust verification principles, the system mitigates wearable payment fraud.',
        'A modular smart settlement engine designed to integrate with existing UPI applications through secure APIs, enabling optimized group expense management and programmable payment workflows. The system uses intelligent net-settlement algorithms, escrow-based conditional payment logic, and behavioral reliability scoring to reduce transaction friction and enhance trust among users. By embedding micro-credit decision support and structured settlement mechanisms directly into digital payment ecosystems, the platform transforms peer-to-peer payments into scalable fintech infrastructure.',
        'International banks need to adhere to regulations from many countries. However, regulations are published in different formats and structures. For banks to automate processes and systems around these regulations, they need to be unified and regrouped into a set of rules per country. Design a solution that can read many different types and formats of banking regulations and codify the content into a rules / data model.',
        'Insurance premiums are generally charged using a fixed premium model and do not necessarily reflect the customer’s behaviour or actual consumption of the coverage. There are still many unexplored uses of data collected from connected devices to be used in dynamic pricing models including, pay as you use pricing.',
        'Existing credit underwriting models do not leverage new sources of qualitative and quantitative information, both for individuals and SMEs. Provide a solution that would leverage non-traditional data sources to selectively refine existing underwriting models (rather than re-write them). This would enable financial institutions to lend to new customers that they would have rejected before.',
        'Consumers need to manage a number of reward programs such as stamp cards, specialised store value cards, loyalty applications, and credit card point systems. Build a platform that would merge loyalty rewards from multiple merchants and enable the (cross) redemption of reward points from different merchants.',
        'Build an AI agent that detects anomalous expenses, flags compliance issues, and helps with automated expense classification / audit-ready reports. This combines ML, explainability and compliance—offering high value for corporate and retail banking risk teams who need to detect and remediate fraud or policy violations at scale.',
        'Instead of building proprietary online apps, banks could integrate with existing platforms like messaging apps. Develop a cross platform payment solution that would allow users to send money via an integrated keyboard in any text-based content (Facebook, WhatsApp, Line, etc.). As a result banking can be integrated into the daily conversations of its consumers without the need to redirect to proprietary banking apps.',
        'Pre-packaged solutions offered by financial institutions may not be easily customised and thus adapted to customer lifestyles. Financial institutions could be more transparent on what their offerings are and what other people in similar situations have opted for. Build a platform that takes into account publicly available information (e.g. social media sentiment and metadata) to determine individual protection needs and suggest a tailored solution.',
        'Design a multilingual, end-user friendly banking platform (voice + text) that lets users interact in regional Indian languages, improving accessibility for customers with limited English or digital literacy. This bridging of the language gap addresses a practical, high-impact inclusion problem with measurable societal benefit and strong product potential.',
        'Design an automated log-analysis system that uses machine learning and data analytics to detect security anomalies, generate real-time alerts and support proactive threat management while minimizing false positives. This directly addresses a high-value, high-risk operational gap in banking SOCs—implementable and immediately usable by banks.',
        'In corporate banking, a company’s decision to select a bank is influenced by many factors. Over the course of the relationship, there can be tell-tale signs of customer dissatisfaction like declining transaction volumes or operating cash balances. Develop a solution that would enable banks to analyse customer relationship data to identify telltale signs of customer attrition so that they can improve and build lasting relationships.',
        'It is important to cultivate consumer education on complex personal finance matters. Develop a comprehensive personal finance management tool that would enable consumers to understand the fundamentals of personal finance as well as the benefits of sound financial management. This tool should go beyond income and expenditure management into tax planning and life events like home ownership, marriage, and retirement.',
        'Currently, financial advisors assess their customer’s investment profile based on static questionnaires. Develop an interactive customer evaluation tool that would enable financial advisors to accurately assess a customer’s investment profile on an on-going basis using behavioral finance questions, risk profiling, and scenario modeling/simulation.',
        'Currently, there is no system that effectively enables institutions to track and monitor counterparty risk and market exposure. Develop a platform that collects trade data to conduct real-time analytics and provide automated reporting while taking into account constraints such as sanctions, AML and KYC reporting, as well as automatically blocking transactions against suspicious accounts.',
        'In the financial services industry, jobs that entail menial and repetitive tasks may be replaced by robotics. Develop a solution that connects with HR data to identify groups that will most likely be at risk, match these with tailored training solutions and identify new job opportunities within the emerging automated landscape.',
        'The inappropriate use of credit mitigating techniques was at the root of the sub-prime crisis. As a result, the banking industry is facing more stringent regulations and a higher cost of capital. Develop a platform that provides optimal collateral and risk management capability to enable capital relief through financial structures and lower the cost of compliance.',
        'Small payments at hawker centres are usually cash-based, leading to cash management issues and delayed settlements. Create an alternative payment solution that does not result in adding costly infrastructure for the hawker stall owners, enabling digital receipts and easier accounting for regulators.',
        'Create a working AI agent that autonomously completes a multi-step financial task — researching, comparing, and initiating a best-execution micro-investment plan — entirely via API calls with a verifiable audit trail, evaluated on accuracy, latency, and explainability of each decision.',
        'Develop and publish an open-source developer toolkit that meaningfully reduces integration effort for a real fintech or blockchain API by at least 60% as benchmarked by lines of code and time-to-hello-world — judged on documentation quality, test coverage, and community adoption potential.',
        'Build a cross-domain AI + blockchain solution that addresses a verifiable real-world problem in India — land rights, supply-chain fraud, or financial exclusion — with live data ingestion, a working smart-contract back end, and a demonstrable improvement metric against a documented baseline.',
    ],
    bounty: [
        'Build a machine learning model to predict gas fees on Hela based on transaction volume and network congestion. Integration with Hela explorers for real-time cost estimation.',
        'Optimize yield farming across decentralized exchanges on Hela. Use Hela’s distinct gas model to simulate cross-dex arbitrage opportunities with low transaction overhead.',
        'Implement an EVM-compatible DID protocol on Hela using non-transferable NFTs to manage reputation across decentralized social media and gaming ecosystems.',
        'Create a secure, trust-less bridge for assets moving from major chains to Hela. Ensure data synchronization using smart contracts or relayers.',
        'Design a system to easily manage and trade in-game assets as NFTs on Hela. Develop tools for automated asset distribution and marketplace integration.'
    ],
    bounty_tishitu: [
        'Farmers often struggle to identify crop diseases at an early stage, leading to significant yield losses. Develop an AI-based system that uses image recognition and machine learning to detect plant diseases from smartphone images. The system should recommend appropriate treatments and preventive measures to farmers in regional languages.',
        'Water scarcity is a major issue in many parts of India. Design an IoT-based water monitoring system that tracks water levels in tanks, reservoirs, and pipelines using sensors. The platform should analyze consumption patterns using AI and optimize water distribution to reduce wastage.',
        'Urban traffic congestion causes delays, pollution, and fuel wastage. Develop an AI-powered traffic management system that uses real-time camera feeds and machine learning algorithms to predict congestion and automatically optimize traffic signal timings.',
        'Waste segregation is still a major challenge in Indian cities. Build an AI-powered smart bin that automatically identifies waste types (plastic, metal, organic) using computer vision and sorts them accordingly. IoT sensors can notify municipal authorities when bins are full.',
        'Floods affect millions of people in India every year. Create an AI-powered system that analyzes rainfall data, river levels, and weather patterns using machine learning to predict flood risks. IoT sensors placed in rivers can send real-time water-level data to improve prediction accuracy.',
        'Electricity wastage is common due to lack of monitoring. Design an IoT-based smart energy system that tracks electricity usage of household appliances and uses AI to recommend energy-saving strategies. The system should provide real-time insights through a mobile dashboard.',
        'Many rural areas lack access to doctors. Develop an AI-based medical assistant that analyzes symptoms, medical images, and health records to provide preliminary diagnosis suggestions. The system should assist doctors and healthcare workers in remote areas.',
        'Livestock health directly impacts farmers\' income. Build an IoT system using wearable sensors for animals that monitors temperature, movement, and health indicators. AI models can analyze the data to detect diseases early and notify farmers.',
        'Fake news spreads rapidly on social media and can create misinformation and panic. Develop an AI-powered platform that analyzes news articles, videos, and posts using natural language processing to detect misinformation and flag suspicious content.',
        'Air pollution is a growing concern in many Indian cities. Create an IoT-based air quality monitoring network using sensors placed in different locations. AI models should analyze the data to predict pollution levels and recommend preventive measures.'
    ],
    webdev: [
        'A web tool where users upload any textbook or PDF and click on a specific line, formula, or paragraph to get an instant explanation of only that exact part. It breaks down difficult steps, clarifies symbols, and simplifies concepts right where the user is stuck. No full summaries—just precise, line-level guidance that works like a personal tutor attached directly to the book.',
        'A full-stack web tool that scans source code, APIs, and npm dependencies to detect real-time security risks. It identifies insecure patterns, outdated packages, unsafe server functions, and supply-chain threats. The system generates a prioritized risk score with clear, actionable fixes. Live dashboards show vulnerability trends and developer-impact metrics. The goal is to provide automated security intelligence before code ever reaches production.',
        'A web platform that audits any URL and analyzes Core Web Vitals including LCP, CLS, and FID. It visualizes bottlenecks such as heavy images, unused JavaScript, render-blocking assets, and slow APIs. An AI agent generates optimized code fixes and configuration patches on the spot. Users receive real-time performance scoring with before/after comparisons. The goal is to make high-performance, SEO-friendly web experiences the default, not an afterthought.',
        'A browser-based IDE where developers describe features in natural language and receive full-stack code generation. It supports real-time multi-user collaboration with shared editing, live preview, and instant sync. The system includes automated AI code review, explanations, and refactoring suggestions before every commit. Developers can generate components, APIs, and deployment configs directly through prompts. The goal is to shift web development into an AI-assisted, collaborative, and ultra-fast workflow environment.',
        'A web application that simulates multiple possible futures based on a user’s major life decision. The system generates 3–5 year timelines that project changes in career, finances, relationships, and mental wellbeing. Users can compare optimistic, realistic, and risky paths in a single interface. Each timeline can be modified by adding new decisions, with outcomes updating instantly through an AI reasoning engine. The goal is to provide a structured, data-driven alternative to intuition-based long-term decision-making.',
        'Design a centralized platform to detect, monitor, and manage unauthorized drone activity in urban high-security zones. The system should provide real-time alerts, threat visualization, and coordinated response support for law enforcement agencies. The objective is to enhance situational awareness and enable faster action against potential drone threats.',
        'Develop a smart appointment scheduling system for a healthcare organization to minimize patient waiting time and optimize the use of medical staff and facilities. The system should enable efficient time-slot allocation, manage cancellations and rescheduling, prevent overbooking, and provide real-time visibility of appointment availability. The objective is to improve operational efficiency while enhancing patient experience and satisfaction.',
        'Design and develop an online platform that connects early-stage startups with experienced mentors across various domains. The system should enable community building, facilitate mentor–startup matchmaking based on expertise and industry needs, and support knowledge sharing on market trends and business strategies. Additionally, the platform should help startups engage with colleges at the grassroots level to identify and connect with student talent based on skills and domain interests.',
        'A smart web and mobile platform that automatically manages appointments by detecting conflicts, understanding priorities, and suggesting optimal time slots using AI.',
        'A lightweight browser extension that automatically compares prices across multiple e-commerce websites in real time and shows the best deals and price history.',
        'A mobile AR app that overlays directional arrows, distance markers, and points of interest directly on the live camera view for intuitive real-world navigation.'
    ],
};

// Build flat list — each domain generates exactly d.count problem statements
const PROBLEMS: ProblemStatement[] = DOMAINS.flatMap(d =>
    Array.from({ length: d.count }, (_, i) => ({
        id: makePSID(d.key, i + 1),
        domain: d.key,
        title: PS_TITLES[d.key]?.[i] || makePSTitle(d.key, i + 1, d.label),
        description: PS_DESCRIPTIONS[d.key][i],
    }))
);





// ─── ATMOSPHERIC BACKGROUND ──────────────────────────────────────────────────

function DivineAuraCanvas() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030201]">
            {/* Base Background Image */}
            <div 
                className="absolute inset-0" 
                style={{ 
                    backgroundImage: "url('/labors_bg.png')", 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center top',
                    opacity: 0.4,
                    filter: 'contrast(1.2) brightness(0.8)',
                }} 
            />

            {/* Sacred Sunlight Beam */}
            <div 
                className="absolute inset-0 bg-transparent opacity-30"
                style={{
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, transparent 40%, transparent 100%)',
                    filter: 'blur(60px)'
                }}
            />
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[150%] origin-top-left -rotate-12 bg-linear-to-b from-yellow-500/30 via-transparent to-transparent pointer-events-none"
                style={{ filter: 'blur(100px)' }}
            />

            {/* Dust Motes / Particles */}
            <DustMotes />

            {/* Film Grain / Texture */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_20%,_rgba(0,0,0,0.8)_100%)]" />
            
            {/* Deep Shadow Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-[#030201] to-transparent" />
        </div>
    );
}

function DustMotes() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const motes = Array.from({ length: 40 });
    return (
        <div className="absolute inset-0 overflow-hidden">
            {motes.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-yellow-200/40 rounded-full"
                    style={{
                        width: Math.random() * 3 + 1,
                        height: Math.random() * 3 + 1,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        filter: 'blur(1px)'
                    }}
                    animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        opacity: [0, 0.6, 0]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                />
            ))}
        </div>
    );
}

// ─── MIST OVERLAY ────────────────────────────────────────────────────────────

function MistOverlay({ isRevealed, onReveal }: { isRevealed: boolean; onReveal: () => void }) {
    useEffect(() => {
        const SECRET = 'ORACLE';
        let buf = '';
        const onKey = (e: KeyboardEvent) => {
            buf = (buf + e.key.toUpperCase()).slice(-SECRET.length);
            if (buf === SECRET) onReveal();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onReveal]);

    return (
        <AnimatePresence>
            {!isRevealed && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.88)' }}
                >
                    {[0, 1, 2].map(i => (
                        <motion.div key={i}
                            className="absolute rounded-full pointer-events-none"
                            style={{ width: 400 + i * 200, height: 400 + i * 200, border: `1px solid rgba(212,175,55,${0.06 - i * 0.015})`, left: '50%', top: '50%', x: '-50%', y: '-50%' }}
                            animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
                        />
                    ))}

                    <motion.div className="text-center z-10 px-6" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                        <motion.div className="text-7xl mb-8" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity }}>⚱️</motion.div>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white/90 tracking-[0.15em] mb-4 uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
                            Labors Are Veiled
                        </h2>
                        <p className="text-neutral-500 text-sm tracking-widest mb-10 max-w-sm mx-auto leading-relaxed" style={{ fontFamily: 'Cinzel, serif' }}>
                            The sacred challenges remain concealed until the Oracle commands their revelation.
                        </p>
                        <motion.button
                            onClick={onReveal}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-10 py-4 text-xs uppercase tracking-[0.5em] border border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10 transition-all"
                            style={{ fontFamily: 'Cinzel, serif' }}
                            animate={{ boxShadow: ['0 0 0 rgba(212,175,55,0)', '0 0 40px rgba(212,175,55,0.3)', '0 0 0 rgba(212,175,55,0)'] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        >
                            Lift the Mist
                        </motion.button>
                        <p className="text-neutral-700 text-[10px] mt-5 tracking-[0.4em] uppercase" style={{ fontFamily: 'Cinzel, serif' }}>or type ORACLE</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ─── FLIP COUNTDOWN UNIT ─────────────────────────────────────────────────────

function Flip({ value, label }: { value: number; label: string }) {
    const v = String(value).padStart(2, '0');
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="relative overflow-hidden" style={{ width: 56, height: 62 }}>
                <AnimatePresence mode="popLayout">
                    <motion.div key={v}
                        initial={{ y: -62 }} animate={{ y: 0 }} exit={{ y: 62 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className="absolute inset-0 flex items-center justify-center font-bold text-3xl text-white"
                        style={{ fontFamily: 'Cinzel, serif', background: 'linear-gradient(180deg,#1a1612,#0a0806)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 4 }}
                    >
                        {v}
                    </motion.div>
                </AnimatePresence>
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-600" style={{ fontFamily: 'Cinzel, serif' }}>{label}</span>
        </div>
    );
}

// ─── ROMAN NUMERALS (I–XV) ──────────────────────────────────────────────────
const ROMAN_NUM = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV'];

// ─── PROBLEM CARD ────────────────────────────────────────────────────────────

function ProblemCard({
    p, domain, index, isRevealed, onClick, count,
}: {
    p: ProblemStatement;
    domain: Domain;
    index: number;
    isRevealed: boolean;
    onClick: () => void;
    count: number;
}) {
    const num = parseInt(p.id.split('-').pop() ?? '1', 10);
    const roman = ROMAN_NUM[(num - 1)] ?? String(num);
    const [hovered, setHovered] = useState(false);

    const accentColor = domain.color;

    return (
        <motion.article
            initial={{ opacity: 0, y: 36 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.55, delay: (index % 15) * 0.03, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative cursor-pointer flex flex-col overflow-hidden"
            style={{
                background: hovered ? 'rgba(12, 10, 8, 0.8)' : 'rgba(8, 6, 5, 0.65)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                minHeight: 340,
                boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(${domain.rgb},0.2)` : '0 8px 24px rgba(0,0,0,0.5)',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)'
            }}
        >
            {/* Outer Gold Frame with Cut Corners */}
            <div 
                className="absolute inset-0 pointer-events-none z-20 transition-colors duration-500"
                style={{
                     border: `1.5px solid ${hovered ? `rgba(${domain.rgb}, 0.5)` : 'rgba(212,175,55,0.2)'}`,
                     clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)'
                }}
            >
                {/* 
                     Classical Greek Corner Ornaments (Square Spiral/Meander corner motif)
                     We use SVG background images for a sharp, geometric look.
                */}
                <div 
                    className="absolute top-0 left-0 w-8 h-8 opacity-60 transition-opacity duration-300 group-hover:opacity-100" 
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H32V2H2V32H0V0ZM6 6H26V8H8V26H6V6ZM12 12H20V14H14V20H12V12Z' fill='%23${domain.rgb.replace(/,/g, '') /* simplified proxy for color */}' style='fill: ${encodeURIComponent(hovered ? accentColor : 'rgba(212,175,55,0.4)')}'/%3E%3C/svg%3E")`
                    }} 
                />
                <div 
                    className="absolute top-0 right-0 w-8 h-8 opacity-60 transition-opacity duration-300 group-hover:opacity-100" 
                    style={{
                        transform: 'scaleX(-1)',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H32V2H2V32H0V0ZM6 6H26V8H8V26H6V6ZM12 12H20V14H14V20H12V12Z' fill='%23${domain.rgb.replace(/,/g, '') /* simplified proxy for color */}' style='fill: ${encodeURIComponent(hovered ? accentColor : 'rgba(212,175,55,0.4)')}'/%3E%3C/svg%3E")`
                    }} 
                />
                <div 
                    className="absolute bottom-0 left-0 w-8 h-8 opacity-60 transition-opacity duration-300 group-hover:opacity-100" 
                    style={{
                        transform: 'scaleY(-1)',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H32V2H2V32H0V0ZM6 6H26V8H8V26H6V6ZM12 12H20V14H14V20H12V12Z' fill='%23${domain.rgb.replace(/,/g, '') /* simplified proxy for color */}' style='fill: ${encodeURIComponent(hovered ? accentColor : 'rgba(212,175,55,0.4)')}'/%3E%3C/svg%3E")`
                    }} 
                />
                <div 
                    className="absolute bottom-0 right-0 w-8 h-8 opacity-60 transition-opacity duration-300 group-hover:opacity-100" 
                    style={{
                        transform: 'scale(-1, -1)',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H32V2H2V32H0V0ZM6 6H26V8H8V26H6V6ZM12 12H20V14H14V20H12V12Z' fill='%23${domain.rgb.replace(/,/g, '') /* simplified proxy for color */}' style='fill: ${encodeURIComponent(hovered ? accentColor : 'rgba(212,175,55,0.4)')}'/%3E%3C/svg%3E")`
                    }} 
                />
            </div>

            {/* Inner "Parchment/Tablet" simple double line inset border */}
            <div 
                 className="absolute inset-[6px] pointer-events-none z-10 transition-colors duration-500 rounded-sm"
                 style={{
                     border: `1px solid ${hovered ? `rgba(${domain.rgb}, 0.2)` : 'rgba(212,175,55,0.06)'}`,
                 }}
            />

            {/* Subtle Fluted Pillar details on left and right edges */}
            <div 
                className="absolute left-2 top-8 bottom-8 w-1 border-x border-white/5 opacity-50 z-0 pointer-events-none transition-colors duration-500"
                style={{ borderColor: hovered ? `rgba(${domain.rgb}, 0.15)` : 'rgba(255,255,255,0.03)' }}
            />
            <div 
                className="absolute right-2 top-8 bottom-8 w-1 border-x border-white/5 opacity-50 z-0 pointer-events-none transition-colors duration-500"
                style={{ borderColor: hovered ? `rgba(${domain.rgb}, 0.15)` : 'rgba(255,255,255,0.03)' }}
            />

            {/* Greek Meander / Key pattern bounding top inner area */}
            <div 
                className="absolute top-4 left-8 right-8 h-2 opacity-[0.25] bg-repeat-x pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-[0.5]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='8' viewBox='0 0 20 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8V0H20V2H4V6H16V4H8V2H18V8H0Z' fill='${encodeURIComponent(hovered ? accentColor : 'rgba(212,175,55,0.8)')}'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Faint subtle radial glow on hover */}
            <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-0"
                style={{
                    background: `radial-gradient(circle at 50% 10%, rgba(${domain.rgb}, 0.15) 0%, transparent 70%)`,
                    opacity: hovered ? 1 : 0
                }}
            />

            {/* Giant Watermark Roman Numeral */}
            <div
                className="absolute right-4 bottom-8 select-none pointer-events-none font-bold leading-none transition-transform duration-700 z-0"
                style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '11rem',
                    color: hovered ? `rgba(${domain.rgb}, 0.08)` : `rgba(212,175,55, 0.04)`,
                    transform: hovered ? 'scale(1.05)' : 'scale(1)'
                }}
            >
                {roman}
            </div>

            <div className="flex flex-col flex-1 px-9 py-8 pt-10 relative z-20">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div 
                            className="flex items-center justify-center w-12 h-12 rounded-sm border transition-colors duration-400"
                            style={{ 
                                borderColor: hovered ? `rgba(${domain.rgb}, 0.6)` : 'rgba(212,175,55,0.25)',
                                background: hovered ? `rgba(${domain.rgb}, 0.15)` : 'rgba(0,0,0,0.4)',
                                fontSize: '1.4rem'
                            }}
                        >
                            {domain.icon}
                        </div>
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1 transition-colors duration-400 flex flex-col gap-0.5" style={{ fontFamily: 'Cinzel, serif' }}>
                                <span style={{ color: hovered ? accentColor : 'rgba(212,175,55,0.7)', letterSpacing: '0.5em' }}>{domain.label}</span>
                                {domain.sponsor && (
                                    <span className="text-[10px] tracking-[0.2em] font-bold text-white/90">by {domain.sponsor}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Availability Status */}
                    <div className="flex flex-col items-end shrink-0 transition-all duration-400">
                        <span 
                            className="text-[9px] uppercase tracking-[0.4em] font-bold mb-2 transition-colors" 
                            style={{ fontFamily: 'Cinzel, serif', color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' }}
                        >
                            Status
                        </span>
                        
                        <div className="flex items-center gap-2">
                            {/* Visual Spots - Only for limited domains */}
                            <div className="flex gap-1">
                                {domain.maxTeams < 999 && Array.from({ length: Math.min(domain.maxTeams, 5) }).map((_, i) => {
                                    const spot = i + 1;
                                    return (
                                        <motion.div 
                                            key={spot}
                                            animate={(count < spot) ? { opacity: [0.6, 1, 0.6], borderColor: ['rgba(212,175,55,0.4)', 'rgba(212,175,55,0.9)', 'rgba(212,175,55,0.4)'] } : {}}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: spot * 0.5 }}
                                            className="w-2 h-2 transition-all duration-500"
                                            style={{ 
                                                transform: 'rotate(45deg)',
                                                background: count >= spot 
                                                    ? (count >= domain.maxTeams ? 'rgba(239,68,68,0.9)' : 'rgba(240,208,96,0.9)') // filled spot
                                                    : 'rgba(0,0,0,0.6)', // empty spot
                                                border: `1px solid ${count >= spot 
                                                    ? (count >= domain.maxTeams ? '#ef4444' : '#f0d060') 
                                                    : 'rgba(212,175,55,0.4)'}`,
                                                boxShadow: count >= spot ? `0 0 10px ${count >= domain.maxTeams ? 'rgba(239,68,68,0.6)' : 'rgba(240,208,96,0.6)'}` : 'none'
                                            }}
                                        />
                                    );
                                })}
                            </div>
                            
                            {/* Text */}
                            <motion.div
                                animate={
                                    (count < domain.maxTeams && domain.maxTeams < 999)
                                        ? { textShadow: ['0 0 4px rgba(240,208,96,0.3)', '0 0 12px rgba(240,208,96,0.9)', '0 0 4px rgba(240,208,96,0.3)'] } 
                                        : (domain.maxTeams < 999 ? { textShadow: '0 0 12px rgba(239,68,68,0.6)' } : { textShadow: '0 0 12px rgba(139,168,90,0.6)' })
                                }
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] leading-none ml-1 w-[68px] text-right"
                                style={{
                                    fontFamily: 'Cinzel, serif',
                                    color: (domain.maxTeams >= 999)
                                        ? '#8ba85a'
                                        : (count >= domain.maxTeams 
                                            ? '#ef4444' 
                                            : count >= (domain.maxTeams - 1) 
                                                ? '#f59e0b' 
                                                : '#f0d060'),
                                }}
                            >
                                {domain.maxTeams >= 999 ? 'Unlimited' : (count >= domain.maxTeams ? 'Sealed' : count >= (domain.maxTeams - 1) ? '1 Left' : 'Open')}
                            </motion.div>
                        </div>
                    </div>
                </div>



                {/* Content */}
                <div className="flex-1">
                    <h3
                        className="font-bold leading-snug mb-3 transition-colors duration-400"
                        style={{
                            fontFamily: 'Cinzel, serif',
                            fontSize: '1.25rem',
                            color: hovered ? '#ffffff' : '#ede0c4',
                            letterSpacing: '0.04em',
                        }}
                    >
                        {p.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                       <span className="w-12 h-[1px]" style={{ background: hovered ? accentColor : 'rgba(212,175,55,0.3)' }} />
                       <span className="text-[10px]" style={{ color: hovered ? accentColor : 'rgba(212,175,55,0.3)' }}>⬩</span>
                       <span className="w-12 h-[1px]" style={{ background: hovered ? accentColor : 'rgba(212,175,55,0.3)' }} />
                    </div>

                    <p
                        className="leading-[1.7] transition-colors duration-400"
                        style={{
                            fontFamily: '"Libre Baskerville", serif',
                            fontSize: '16px',
                            color: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(237,224,196,0.65)',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical' as const,
                            overflow: 'hidden',
                        }}
                    >
                        {p.description}
                    </p>
                </div>

                {/* Footer Area */}
                <div className="mt-5 flex items-center justify-between pt-5 transition-colors duration-400">
                    <div className="flex flex-col gap-1">
                        {domain.prize && (
                            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#f0d060] drop-shadow-[0_0_8px_rgba(240,208,96,0.3)]" style={{ fontFamily: 'Cinzel, serif' }}>
                                Winning Prize: {domain.prize}
                            </span>
                        )}
                        <span 
                            className="text-[11px] uppercase tracking-[0.3em] font-bold"
                            style={{ fontFamily: 'Cinzel, serif', color: hovered ? '#ffffff' : 'rgba(212,175,55,0.5)' }}
                        >
                            Labor {roman}
                        </span>
                    </div>
                    
                    <div 
                        className="flex items-center gap-3 px-5 py-2.5 border cursor-pointer transition-all duration-300 group/btn"
                        style={{
                            borderColor: hovered ? accentColor : 'rgba(212,175,55,0.25)',
                            background: hovered ? `rgba(${domain.rgb}, 0.15)` : 'transparent'
                        }}
                    >
                        <span 
                            className="text-[9px] uppercase tracking-[0.4em] font-bold transition-colors duration-300"
                            style={{ fontFamily: 'Cinzel, serif', color: hovered ? '#ffffff' : 'rgba(212,175,55,0.7)' }}
                        >
                            Decipher
                        </span>
                        <motion.span
                            className="transition-colors duration-300"
                            style={{ color: hovered ? '#ffffff' : 'rgba(212,175,55,0.7)', fontSize: '12px', lineHeight: 1 }}
                            animate={{ x: hovered ? [0, 5, 0] : 0 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            ›
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

// ─── DETAIL MODAL ────────────────────────────────────────────────────────────

function DetailModal({
    p, domain, onClose, onSuccess, initialFull = false,
}: {
    p: ProblemStatement;
    domain: Domain;
    onClose: () => void;
    onSuccess: (problemId: string, newCount: number, oldProblemId?: string | null, oldCount?: number | null) => void;
    initialFull?: boolean;
}) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'full'>(initialFull ? 'full' : 'idle');
    // teamCheck: 'idle' | 'checking' | 'available' | 'registered'
    // 'registered' = team already exists in DB for ANY problem (same or different)
    const [teamCheck, setTeamCheck] = useState<'idle' | 'checking' | 'available' | 'registered'>('idle');
    const [registeredInfo, setRegisteredInfo] = useState<{ problemTitle: string; domain: string } | null>(null);
    const [formData, setFormData] = useState({
        teamName: '',
        leaderName: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    // Debounced team name check — fires 600ms after user stops typing.
    // React's cleanup cancels the timer on every keystroke: no stale closures.
    useEffect(() => {
        const tn = formData.teamName.trim();
        if (!tn) {
            setTeamCheck('idle');
            setRegisteredInfo(null);
            return;
        }
        setTeamCheck('checking');
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/register-labor?teamName=${encodeURIComponent(tn)}`);
                if (!res.ok) { setTeamCheck('idle'); return; }
                const data = await res.json();
                if (data.exists) {
                    // Already registered somewhere — always show the warning
                    setTeamCheck('registered');
                    setRegisteredInfo({
                        problemTitle: data.registration.problemTitle,
                        domain: data.registration.domain,
                    });
                } else {
                    setTeamCheck('available');
                    setRegisteredInfo(null);
                }
            } catch {
                setTeamCheck('idle');
            }
        }, 600);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.teamName]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const payload = {
            teamName: formData.teamName,
            leaderName: formData.leaderName,
            email: formData.email,
            phone: formData.phone,
            domain: domain.label,
            problemId: p.id,
            problemTitle: p.title,
        };

        try {
            const res = await fetch('/api/register-labor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.status === 403) {
                setStatus('full');
                return;
            }

            if (!res.ok) {
                console.error('[Sacred Labors] Registration Error:', await res.json().catch(() => ({})));
                setStatus('error');
                return;
            }

            const data = await res.json();
            // Pass new count and optionally old problem info to parent for badge patching
            onSuccess(p.id, data.count ?? 0, data.oldProblemId ?? null, data.oldCount ?? null);
            setStatus('success');
        } catch (err) {
            console.error('[Sacred Labors] Network Error:', err);
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={e => { if (e.target === e.currentTarget) onClose(); }}
                style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto no-scrollbar"
                    style={{
                        background: '#0a0806',
                        border: `1px solid rgba(${domain.rgb},0.35)`,
                        borderRadius: 4,
                        boxShadow: `0 0 80px rgba(${domain.rgb},0.2)`,
                    }}
                >
                    {/* Top accent */}
                    <div style={{ height: 3, background: `linear-gradient(90deg,${domain.color},${domain.color}40,transparent)` }} />

                    <div className="p-6 sm:p-10">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-6 mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">{domain.icon}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif', color: domain.color }}>
                                        {domain.label}
                                        {domain.sponsor && (
                                            <span className="opacity-60 text-[8px] tracking-[0.2em] font-medium">by {domain.sponsor}</span>
                                        )}
                                    </span>
                                </div>
                                <h2
                                    className="text-3xl sm:text-4xl font-bold leading-tight mt-1"
                                    style={{ fontFamily: 'Cinzel, serif', color: 'rgba(255,255,255,0.95)' }}
                                >
                                    {p.title}
                                </h2>
                                {domain.prize && (
                                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 border border-[#f0d060]/30 bg-[#f0d060]/10 rounded-sm">
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#f0d060]" style={{ fontFamily: 'Cinzel, serif' }}>
                                            🏆 Winning Prize: {domain.prize}
                                        </span>
                                    </div>
                                )}
                                <p className="text-[10px] sm:text-xs text-neutral-500 mt-2" style={{ fontFamily: 'Cinzel, serif' }}>#{p.id}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-neutral-600 hover:text-white transition-colors text-xl leading-none shrink-0 mt-1"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="h-px mb-6" style={{ background: `linear-gradient(90deg,rgba(${domain.rgb},0.4),transparent)` }} />

                        {status === 'success' ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 text-center border rounded-sm"
                                style={{ 
                                    borderColor: 'rgba(139,168,90,0.4)', 
                                    background: 'rgba(139,168,90,0.1)' 
                                }}
                            >
                                <div className="text-4xl mb-4">✨</div>
                                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Cinzel, serif', color: '#8ba85a' }}>
                                    Registration Successful
                                </h3>
                                <p className="text-neutral-300 text-sm mb-4 leading-relaxed">
                                    Your team <strong>{formData.teamName}</strong> has been registered for the <strong>{domain.label}</strong> labor:<br/>
                                    <span className="text-white italic mt-1 block">"{p.title}"</span>
                                </p>
                                <motion.button
                                    onClick={onClose}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] font-bold mt-4"
                                    style={{ fontFamily: 'Cinzel, serif', background: 'rgba(139,168,90,0.2)', border: '1px solid rgba(139,168,90,0.5)', color: '#8ba85a' }}
                                >
                                    Return to Hall
                                </motion.button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-bold mb-4" style={{ fontFamily: 'Cinzel, serif', color: domain.color }}>
                                        The Oracle's Decree
                                    </h4>
                                    <p 
                                        className="text-neutral-200 leading-[1.8] text-lg sm:text-xl mb-8 pr-4"
                                        style={{ fontFamily: '"Libre Baskerville", serif' }}
                                    >
                                        {p.description}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative p-1 pb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, rgba(${domain.rgb},0.4))` }} />
                                        <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-center" style={{ fontFamily: 'Cinzel, serif', color: domain.color, textShadow: `0 0 10px rgba(${domain.rgb},0.3)` }}>
                                            Accept this Labor
                                        </h4>
                                        <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, transparent, rgba(${domain.rgb},0.4))` }} />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 mt-4">
                                        {/* ── TEAM NAME (primary, first) ── */}
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label
                                                className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold mb-1 absolute -top-6 left-0 transition-colors flex items-center gap-2"
                                                style={{
                                                    fontFamily: 'Cinzel, serif',
                                                    color: teamCheck === 'registered' ? 'rgba(251,191,36,0.9)' : teamCheck === 'available' ? '#8ba85a' : 'rgba(180,140,50,0.85)',
                                                }}
                                            >
                                                Team Name <span style={{ color: domain.color }}>♦</span>
                                                {teamCheck === 'checking' && <span className="text-neutral-400 normal-case tracking-normal font-normal">checking…</span>}
                                                {teamCheck === 'available' && <span className="text-green-400 normal-case tracking-normal font-normal">✓ Available</span>}
                                                {teamCheck === 'registered' && <span className="text-amber-400 normal-case tracking-normal font-normal">⚠ Already registered</span>}
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.teamName}
                                                onChange={e => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                                                className="bg-black/40 border-b px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner"
                                                style={{
                                                    fontFamily: '"IM Fell English", serif',
                                                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
                                                    borderColor: teamCheck === 'registered' ? 'rgba(251,191,36,0.4)' : teamCheck === 'available' ? 'rgba(139,168,90,0.5)' : 'rgba(255,255,255,0.1)',
                                                }}
                                                placeholder="e.g. Argonauts"
                                            />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full"
                                                style={{ background: `linear-gradient(90deg, ${teamCheck === 'registered' ? '#f59e0b' : teamCheck === 'available' ? '#8ba85a' : domain.color}, transparent)` }} />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                            {/* Warning shown right below the field when team is already registered */}
                                            {teamCheck === 'registered' && registeredInfo && (
                                                <p className="mt-2 text-[11px] leading-snug" style={{ fontFamily: 'Cinzel, serif', color: 'rgba(251,191,36,0.9)' }}>
                                                    ⚠ This team name has already registered for <em>{registeredInfo.problemTitle}</em> ({registeredInfo.domain}).
                                                    If you proceed, your earlier registration will be struck off and{' '}
                                                    <strong>this will be your final submission.</strong>
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Leader Name <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="text" value={formData.leaderName} onChange={e => setFormData({...formData, leaderName: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="e.g. Kartik" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Email <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="contact@example.com" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Phone <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="+91 9876543210" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                    </div>


                                    <div className="mt-6 relative p-6 border rounded-sm overflow-hidden group/seal shadow-2xl" style={{ borderColor: `rgba(${domain.rgb},0.2)`, background: 'rgba(0,0,0,0.4)', boxShadow: `inset 0 0 50px rgba(${domain.rgb},0.08)` }}>
                                        <div className="absolute inset-0 z-0 bg-[url('/labors_bg.png')] bg-cover bg-center mix-blend-overlay opacity-25 grayscale brightness-200" />
                                        <div className="absolute inset-0 z-0" style={{ background: `radial-gradient(circle at 100% 100%, rgba(${domain.rgb},0.25), transparent 85%)` }}/>
                                        
                                        {/* Classical decorative elements */}
                                        <div className="absolute top-1.5 left-1.5 bottom-1.5 right-1.5 border pointer-events-none z-10 opacity-40" style={{ borderColor: domain.color }} />
                                        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l opacity-60 pointer-events-none z-10" style={{ borderColor: domain.color }} />
                                        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r opacity-60 pointer-events-none z-10" style={{ borderColor: domain.color }} />
                                        
                                        <div className="relative z-20 flex flex-col items-center text-center">
                                            <div className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-400 mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
                                                — Selected Labor —
                                            </div>
                                            <div className="text-3xl sm:text-4xl font-bold tracking-widest mb-2" style={{ fontFamily: 'Cinzel, serif', color: domain.color, textShadow: '0 4px 15px rgba(0,0,0,0.9)' }}>
                                                {domain.label}
                                            </div>
                                            <div className="text-base sm:text-lg italic text-neutral-300 mt-2 max-w-[85%] leading-relaxed" style={{ fontFamily: '"IM Fell English", serif' }}>
                                                {p.title}
                                            </div>
                                        </div>
                                    </div>

                                    {status === 'error' && (
                                        <div className="text-red-400 text-xs mt-2 bg-red-500/10 p-2 border border-red-500/20 rounded-sm" style={{ fontFamily: 'Cinzel, serif' }}>
                                            A disruption occurred in the network flow. Please try submitting again.
                                        </div>
                                    )}
                                    {status === 'full' && (
                                        <div className="text-red-400 text-xs mt-2 bg-red-500/10 p-2 border border-red-500/20 rounded-sm" style={{ fontFamily: 'Cinzel, serif' }}>
                                            ⚒ REGISTRATION CLOSED
                                        </div>
                                    )}

                                    <div className="flex gap-4 sm:gap-6 flex-wrap mt-6 pt-6 border-t border-white/5 relative">
                                        {/* Subtle top-inset glow on the footer */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${domain.color}, transparent)` }} />
                                        
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting' || status === 'full' || teamCheck === 'checking'}
                                            className="px-6 py-4 sm:py-5 text-sm sm:text-base uppercase tracking-[0.4em] font-bold disabled:opacity-40 disabled:cursor-not-allowed flex-1 relative overflow-hidden group/btn shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:shadow-2xl transition-all"
                                            style={{
                                                fontFamily: 'Cinzel, serif',
                                                borderRadius: 2,
                                                background: teamCheck === 'registered'
                                                    ? 'linear-gradient(135deg,#b45309,#92400e)'
                                                    : `linear-gradient(135deg,${domain.color},${domain.color}88)`,
                                                color: '#0a0806',
                                            }}
                                        >
                                            <span className="relative z-10 drop-shadow-md font-bold">
                                                {status === 'submitting' ? 'Scribing…'
                                                    : teamCheck === 'checking' ? 'Verifying…'
                                                    : teamCheck === 'registered' ? 'Switch & Seal the Pact'
                                                    : 'Seal the Pact'}
                                            </span>
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            disabled={status === 'submitting'}
                                            className="px-10 py-4 sm:py-5 text-xs sm:text-sm uppercase tracking-[0.4em] transition-colors border disabled:opacity-50 bg-black/40 hover:bg-black/80 backdrop-blur-md"
                                            style={{ fontFamily: 'Cinzel, serif', borderColor: `rgba(${domain.rgb},0.4)`, color: domain.color, borderRadius: 2 }}
                                        >
                                            Return
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export function HallOfOraclesClient({ initialCounts = {} }: { initialCounts?: Record<string, number> }) {
    const [isRevealed, setIsRevealed] = useState(true);
    const [activeTheme, setActiveTheme] = useState<DomainKey | 'all'>('all');
    const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);
    // Seed state directly from server-fetched data — no zero flash on refresh
    const [countsMap, setCountsMap] = useState<Record<string, number>>(initialCounts);

    const handleReveal = useCallback(() => setIsRevealed(true), []);

    // Poll every 15 seconds to keep counts fresh in real-time across all tabs
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const r = await fetch(`/api/labor-status`, { cache: 'no-store' });
                if (!r.ok) return;
                const data = await r.json();
                if (data && typeof data === 'object' && !data.error)
                    setCountsMap(data);
            } catch (err) {
                console.error('[Sacred Labors] Failed to load counts:', err);
            }
        };

        // Don't fetch immediately — server already gave us fresh data.
        // Only poll for subsequent real-time updates.
        const id = setInterval(fetchCounts, 15_000);
        return () => clearInterval(id);
    }, []);

    const handleRegistrationSuccess = useCallback(
        (problemId: string, newCount: number, oldProblemId?: string | null, oldCount?: number | null) => {
            setCountsMap(prev => {
                const next = { ...prev, [problemId]: newCount };
                if (oldProblemId != null && oldCount != null) next[oldProblemId] = oldCount;
                return next;
            });
        },
        []
    );

    const filtered = activeTheme === 'all'
        ? PROBLEMS
        : activeTheme === 'bounty'
            ? PROBLEMS.filter(p => p.domain === 'bounty' || p.domain === 'blockchain' || p.domain === 'bounty_tishitu')
            : PROBLEMS.filter(p => p.domain === activeTheme);

    const activeDomain = DOMAINS.find(d => d.key === activeTheme);

    return (
        <div
            className="min-h-screen w-full text-neutral-100 overflow-x-hidden selection:bg-yellow-500/20"
            style={{ background: '#050403' }}
        >
            {/* Divine Aura Background */}
            <DivineAuraCanvas />

            {/* Noise texture */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px'
                }}
            />

            {/* Ambient domain glow */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-0"
                animate={{ opacity: activeDomain ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ background: activeDomain ? `radial-gradient(ellipse at 20% 30%, rgba(${activeDomain.rgb},0.07) 0%, transparent 55%)` : 'none' }}
            />

            {/* Top accent line */}
            <div
                className="fixed top-0 left-0 right-0 h-px z-40"
                style={{ background: `linear-gradient(90deg,transparent,${activeDomain?.color ?? '#d4af37'}80,transparent)` }}
            />

            {/* Detail modal - always open to let users read desc, but disabled if sealed */}
            {selectedPS && (
                <DetailModal
                    p={selectedPS}
                    domain={DOMAINS.find(d => d.key === selectedPS.domain)!}
                    initialFull={(() => {
                        if (SUBMISSIONS_CLOSED) return true;
                        const dom = DOMAINS.find(d => d.key === selectedPS.domain);
                        if (!dom || dom.maxTeams >= 999) return false;
                        return (countsMap[selectedPS.id] ?? 0) >= dom.maxTeams;
                    })()}
                    onClose={() => setSelectedPS(null)}
                    onSuccess={handleRegistrationSuccess}
                />
            )}

            {/* Vertical spine label */}
            <div
                className="fixed left-0 top-1/2 z-20 hidden lg:flex items-center gap-2"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg) translateY(50%)' }}
            >
                <span className="text-[8px] uppercase tracking-[0.4em] text-neutral-800" style={{ fontFamily: 'Cinzel, serif' }}>The Oracle Codex</span>
                <div className="w-px h-12 bg-neutral-800" />
                <span className="text-[8px] uppercase tracking-[0.4em] text-neutral-800" style={{ fontFamily: 'Cinzel, serif' }}>TECHUTOPIA 2026</span>
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-36">

                {/* ═══ HERO ══════════════════════════════════════════════════ */}
                <header className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
                        className="flex items-center justify-center gap-4 mb-8 relative z-10"
                    >
                        <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(212,175,55,0.4)' }} />
                        <span className="text-[9px] uppercase tracking-[0.5em] text-neutral-400 font-bold" style={{ fontFamily: 'Cinzel, serif', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                            TECHUTOPIA 2026 · Sacred Labors
                        </span>
                        <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(212,175,55,0.4)' }} />
                    </motion.div>

                    {/* Giant title */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
                        className="mb-4"
                    >
                        <h1
                            className="font-bold leading-[0.88] tracking-tight"
                            style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(3rem,9vw,7rem)', color: 'rgba(255,255,255,0.93)' }}
                        >
                            The Sacred
                        </h1>
                        <h1
                            className="font-bold leading-[0.88] tracking-tight relative"
                            style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: 'clamp(3rem,9vw,7rem)',
                                WebkitTextStroke: '2px rgba(212,175,55,0.85)',
                                color: 'transparent',
                                textShadow: '0px 4px 30px rgba(0,0,0,0.8)',
                            }}
                        >
                            Challenges
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                        className="text-neutral-300 text-sm sm:text-base tracking-widest italic mb-10 relative z-10 font-medium"
                        style={{ fontFamily: 'Cinzel, serif', textShadow: '0 2px 15px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.8)' }}
                    >
                        &ldquo;Choose your labor and etch your name into the stars.&rdquo;
                    </motion.p>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                        className="inline-flex items-center justify-center gap-0 flex-wrap rounded-sm px-6 py-4"
                        style={{
                            background: 'rgba(8,6,4,0.72)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1px solid rgba(212,175,55,0.2)',
                            boxShadow: '0 0 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,175,55,0.08)',
                        }}
                    >
                        {[
                            { label: 'Themes', value: String(DOMAINS.length) },
                            { label: 'Problems', value: String(PROBLEMS.length) },
                            { label: 'Teams Allowed', value: '∞' },
                        ].map((stat, i, arr) => (
                            <div key={stat.label} className="flex items-center">
                                <div className="text-center px-6 relative">
                                    <div
                                        className="text-4xl sm:text-5xl font-bold leading-none mb-1"
                                        style={{
                                            fontFamily: 'Cinzel, serif',
                                            color: '#f0d060',
                                            textShadow: '0 0 24px rgba(212,175,55,0.7), 0 2px 8px rgba(0,0,0,0.9)',
                                            letterSpacing: '-0.02em',
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div
                                        className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-bold"
                                        style={{
                                            fontFamily: 'Cinzel, serif',
                                            color: 'rgba(255,255,255,0.55)',
                                            textShadow: '0 1px 6px rgba(0,0,0,0.9)',
                                        }}
                                    >
                                        {stat.label}
                                    </div>
                                </div>
                                {i < arr.length - 1 && (
                                    <div className="w-px self-stretch" style={{ background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.35), transparent)' }} />
                                )}
                            </div>
                        ))}
                    </motion.div>

                </header>

                {/* ═══ THEME FILTER TABS ══════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                    className="sticky top-16 z-30 mb-10 w-full"
                >
                    {/* Filter Label/Title */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-6 sm:w-12 bg-linear-to-r from-transparent to-[#f0d060]/40" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.6em] font-bold text-[#f0d060]/90" style={{ fontFamily: 'Cinzel, serif' }}>
                            Sacred Filters
                        </span>
                        <div className="h-px w-6 sm:w-12 bg-linear-to-l from-transparent to-[#f0d060]/40" />
                    </div>

                    {/* Backdrop blur pill container */}
                    <div
                        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-5 py-5 sm:py-6 rounded-sm"
                        style={{
                            background: 'rgba(10,8,6,0.92)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                        }}
                    >
                        {/* "All" pill */}
                        <motion.button
                            onClick={() => setActiveTheme('all')}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all duration-200 rounded-sm font-semibold"
                            style={{
                                fontFamily: 'Cinzel, serif',
                                background: activeTheme === 'all' ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.04)',
                                border: `1px solid ${activeTheme === 'all' ? 'rgba(212,175,55,1)' : 'rgba(255,255,255,0.2)'}`,
                                color: activeTheme === 'all' ? '#f0d060' : 'rgba(255,255,255,0.85)',
                                textShadow: activeTheme === 'all' ? '0 0 14px rgba(212,175,55,0.8)' : '0 1px 4px rgba(0,0,0,0.8)',
                                boxShadow: activeTheme === 'all' ? '0 0 20px rgba(212,175,55,0.25)' : 'none',
                            }}
                        >
                            All&nbsp;
                            <span className="opacity-60 text-[11px] sm:text-xs">({PROBLEMS.length})</span>
                        </motion.button>

                        {DOMAINS.map(domain => {
                            const count = domain.key === 'bounty' 
                                ? PROBLEMS.filter(p => p.domain === 'bounty' || p.domain === 'blockchain' || p.domain === 'bounty_tishitu').length
                                : PROBLEMS.filter(p => p.domain === domain.key).length;
                            const isActive = activeTheme === domain.key;
                            return (
                                <motion.button
                                    key={domain.key}
                                    onClick={() => setActiveTheme(domain.key)}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.25em] transition-all duration-200 rounded-sm font-semibold"
                                    style={{
                                        fontFamily: 'Cinzel, serif',
                                        background: isActive ? `rgba(${domain.rgb},0.2)` : 'rgba(255,255,255,0.04)',
                                        border: `1px solid ${isActive ? `rgba(${domain.rgb},1)` : 'rgba(255,255,255,0.2)'}`,
                                        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.85)',
                                        textShadow: isActive ? `0 0 14px rgba(${domain.rgb},1)` : '0 1px 4px rgba(0,0,0,0.8)',
                                        boxShadow: isActive ? `0 0 25px rgba(${domain.rgb},0.3), inset 0 0 12px rgba(${domain.rgb},0.12)` : 'none',
                                    }}
                                >
                                    <span className="text-base sm:text-lg">{domain.icon}</span>
                                    <span>{domain.label}</span>
                                    <span className="opacity-50 text-[11px] sm:text-xs">({count})</span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Active domain headline */}
                    <AnimatePresence mode="wait">
                        {activeTheme !== 'all' && activeDomain && (
                            <motion.div
                                key={activeTheme}
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.25 }}
                                className="mt-4 flex items-center gap-3"
                            >
                                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,rgba(${activeDomain.rgb},0.4),transparent)` }} />
                                <span className="text-[10px] uppercase tracking-[0.5em]" style={{ fontFamily: 'Cinzel, serif', color: activeDomain.color }}>
                                    {activeDomain.label} Challenges — {filtered.length} Labors
                                </span>
                                <div className="h-px w-8" style={{ background: `rgba(${activeDomain.rgb},0.4)` }} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* ═══ PROBLEM CARD GRID ══════════════════════════════════════ */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTheme}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filtered.map((p, i) => {
                            const dom = DOMAINS.find(d => d.key === p.domain)!;
                            return (
                                <ProblemCard
                                    key={p.id}
                                    p={p}
                                    domain={dom}
                                    index={i}
                                    isRevealed={isRevealed}
                                    onClick={() => setSelectedPS(p)}
                                    count={countsMap[p.id] ?? 0}
                                />
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

            </main>
        </div>
    );
}
