import { Injectable, computed, signal } from '@angular/core';

export type LanguageCode = 'en' | 'hi' | 'mr';

const storageKey = 'numeroshastra-language';
const defaultLanguage: LanguageCode = 'en';

export const languageOptions: Array<{ code: LanguageCode; label: string; description: string }> = [
  { code: 'en', label: 'English', description: 'Default language' },
  { code: 'hi', label: 'हिंदी', description: 'Hindi' },
  { code: 'mr', label: 'मराठी', description: 'Marathi' }
];

const translations: Record<LanguageCode, any> = {
  en: {
    app: {
      brand: 'Numero Shastra',
      nav: {
        home: 'Home',
        pillars: '12 Pillars',
        oracle: 'Oracle Guide',
        learning: 'Learning Center',
        testimonials: 'Community',
        support: 'Support & Privacy'
      },
      footer: {
        quickNavigation: 'Quick Navigation',
        downloadTitle: 'Download on Mobile',
        downloadText: 'Get a comprehensive 360-degree detailed report with voice narration natively on your phone.',
        disclaimer: 'Disclaimer: Numerology interpretations are based on traditional Vedic and Chinese metaphysical theories. They are intended for guidance, personal self-discovery, and educational purposes.',
        copyright: '© 2026 Numero Shastra. All rights reserved.'
      },
      languageDialog: {
        title: 'Choose Language',
        subtitle: 'Select your preferred language to continue',
        defaultHint: 'Default language'
      },
      buttons: {
        downloadApp: 'Download App',
        webApp: 'Web App',
        explorePillars: 'Explore 12 Pillars',
        getStartedForFree: 'Get Started For Free',
        calculatePath: 'Calculate Path',
        sendMessage: 'Send Message',
        getItOnGooglePlay: 'Install Now'
      }
    },
    home: {
      heroBadge: 'Vedic & Chinese Numerology',
      heroTitle: 'Unlock the Mystical Patterns of Your Life',
      heroSubtitle: 'Discover your true purpose, hidden strengths, and future path with the power of ancient Numerology and the Lo Shu Grid.',
      gridSectionSubtitle: 'Sacred Geometry',
      gridSectionTitle: 'The Magic of the Lo Shu Grid',
      gridSectionDesc: 'Click on any cell of the magic square below to discover the aspect of life it governs.',
      introBadge: 'About the Companion',
      introHeading: 'More Than Just Numbers',
      introParagraph1: 'Numero Shastra is your personal spiritual companion. Using time-tested Vedic and Lo Shu Grid principles, we provide a deep, 360-degree analysis of your birthdate to guide your career, finances, and personality growth.',
      introParagraph2: 'Whether you are missing key numbers in your grid or want to align with your personal lucky vibrations, we offer personalized remedies and guidance to empower your path.',
      statBirthdateAnalysis: 'Birthdate Analysis',
      statLanguagesSupported: 'Languages Supported',
      highlightsTitle: 'Why Choose Numero Shastra',
      highlightCards: [
        {
          title: 'Ancient Wisdom',
          description: 'Based on the sacred Lo Shu Grid and profound Numerology principles refined over centuries.'
        },
        {
          title: 'Oracle Voice',
          description: 'Listen to your destiny. Receive an immersive experience with our voice narration system.'
        },
        {
          title: 'Multilingual',
          description: 'Full support for English, Marathi, and Hindi, bringing the insights to your preferred language.'
        },
        {
          title: 'Data-Driven',
          description: 'Advanced calculation algorithms for high-precision personality and strength mapping.'
        }
      ],
      gridCells: [
        {
          number: 4,
          title: 'Wealth & Prosperity',
          planet: 'Rahu (North Node)',
          icon: 'fas fa-coins',
          description: 'Governs financial growth, material wealth, organization, and practicality. It resides in the top-left quadrant of the Lo Shu Grid representing your financial capacity.',
          governs: 'Wealth, Assets, Practicality, discipline.'
        },
        {
          number: 9,
          title: 'Fame & Reputation',
          planet: 'Mars',
          icon: 'fas fa-fire',
          description: 'Governs social recognition, reputation, energy, passion, and career expansion. Positioned at the top center, it represents the element of Fire.',
          governs: 'Fame, Passion, Ambition, recognition.'
        },
        {
          number: 2,
          title: 'Love & Relationships',
          planet: 'Moon',
          icon: 'fas fa-heart',
          description: 'Governs partnership, marriage, relationship harmony, emotional balance, and sensitivity. Positioned in the top-right, representing Earth element.',
          governs: 'Love, Diplomacy, Relationships, intuition.'
        },
        {
          number: 3,
          title: 'Family & Health',
          planet: 'Jupiter',
          icon: 'fas fa-tree',
          description: 'Governs ancestral support, health, relationships with parents, growth, and community. Positioned on the left representing Wood element.',
          governs: 'Growth, Health, Family relationships, expansion.'
        },
        {
          number: 5,
          title: 'Stability & Balance',
          planet: 'Mercury',
          icon: 'fas fa-anchor',
          description: 'The center core. Governs mental balance, stability, communication, resilience, and general luck. It connects all other numbers.',
          governs: 'Core stability, Balance, Business acumen, communication.'
        },
        {
          number: 7,
          title: 'Creativity & Children',
          planet: 'Ketu (South Node)',
          icon: 'fas fa-paint-brush',
          description: 'Governs creative ideas, children, legacy, introspection, and spiritual pursuits. Positioned on the right representing Metal element.',
          governs: 'Creative expression, Children, Intuition, analytical skills.'
        },
        {
          number: 8,
          title: 'Knowledge & Wisdom',
          planet: 'Saturn',
          icon: 'fas fa-book-open',
          description: 'Governs spiritual insights, learning, intellect, memory, and personal growth. Positioned in the bottom-left representing Earth element.',
          governs: 'Education, Wisdom, Self-reflection, patience.'
        },
        {
          number: 1,
          title: 'Career & Journey',
          planet: 'Sun',
          icon: 'fas fa-briefcase',
          description: 'Governs career opportunities, life journey, independence, ambition, and willpower. Positioned at the bottom center representing Water element.',
          governs: 'Career, Aspirations, Independence, planning.'
        },
        {
          number: 6,
          title: 'Helpful Friends',
          planet: 'Venus',
          icon: 'fas fa-hands-helping',
          description: 'Governs mentorship, support from friends, travel opportunities, luxury, and aesthetics. Positioned in the bottom-right representing Metal element.',
          governs: 'Mentors, Support network, Travel, wealth comforts.'
        }
      ]
    },
    pillars: {
      heading: 'The 12 Core Pillars of Destiny',
      description: 'Our advanced birthdate analysis covers 12 crucial facets of your life, blending traditional wisdom with scientific accuracy. Here is what is mapped out in your detailed report.',
      ctaHeading: 'Ready to explore your personal blueprint?',
      ctaText: 'Get instant access to your 12 pillars report inside the mobile app today.',
      pillarItems: [
        {
          title: 'Detailed Lo Shu Grid Analysis',
          icon: 'fas fa-th',
          description: 'An ancient tool used to understand your destiny, potential, and life patterns through the placement and alignment of numbers.'
        },
        {
          title: 'Career Insights',
          icon: 'fas fa-briefcase',
          description: 'Discover the most suitable professional paths and business sectors that align with your natural vibrations and birth numbers.'
        },
        {
          title: 'Personalized Remedies',
          icon: 'fas fa-gem',
          description: 'Simple, practical, and highly effective remedies to balance missing numbers in your grid.'
        },
        {
          title: 'Advanced Personality Mapping',
          icon: 'fas fa-user-circle',
          description: 'Deep analytical insights into your character traits, behavior, hidden strengths, and your ruling/destiny planets.'
        },
        {
          title: 'Life Path & Pinnacle Phase Guidance',
          icon: 'fas fa-road',
          description: 'Understand the major developmental cycles of your life, what challenges to prepare for, and your ultimate purpose.'
        },
        {
          title: 'Oracle Voice Guide',
          icon: 'fas fa-headphones-alt',
          description: 'Don\'t just read your destiny—listen to it. High-quality audio narrations bring your reports to life with ease.'
        },
        {
          title: 'Stock Market & Financial Nature',
          icon: 'fas fa-chart-line',
          description: 'A unique numerological perspective on your financial risk tolerance, investment temperament, and money accumulation patterns.'
        },
        {
          title: 'Number Occurrence Insights',
          icon: 'fas fa-sync-alt',
          description: 'Learn how repeated numbers or double occurrences in your birthdate influence your energy levels, traits, and behavioral patterns.'
        },
        {
          title: 'Horizontal, Vertical & Diagonal Planes',
          icon: 'fas fa-compress-arrows-alt',
          description: 'A complete breakdown of your Thought Plane, Will Plane, Action Plane, Success Plane, and how energy flows between them.'
        },
        {
          title: 'Personalized Lucky Colors & Days',
          icon: 'fas fa-palette',
          description: 'Optimize your routine, business meetings, and key life decisions by aligning with your personal lucky vibrations.'
        },
        {
          title: 'Personality & Life Path Synergy',
          icon: 'fas fa-project-diagram',
          description: 'See how your core Driver and Conductor numbers interact to form your unique life dynamic and compatibility matrices.'
        },
        {
          title: 'Energy Boosters',
          icon: 'fas fa-bolt',
          description: 'Practical daily routines, affirmations, and meditation tips to enhance your vibrational frequency and positive aura.'
        }
      ]
    },
    oracle: {
      heroBadge: 'Exclusive Feature',
      heroTitle: 'Meet Your Oracle Guide',
      heroSubtitle: 'Why read long reports when you can be guided? Numero Shastra features a unique Oracle Audio Narration that talks you through your analysis. It\'s like having a personal numerologist by your side, explaining the mysteries of your birthdate in a soothing, informative voice.',
      bulletItems: [
        {
          title: 'Hands-Free Insight',
          description: 'Listen while you relax, commute, or reflect. Allow the wisdom to flow naturally.'
        },
        {
          title: 'Localized Voices',
          description: 'Experience the narration natively in English, Marathi, or Hindi.'
        },
        {
          title: 'Step-by-Step Guidance',
          description: 'The Oracle explains every section, from your core numbers to your pinnacle stages.'
        }
      ],
      audioReady: 'Audio Guide Ready',
      playingReading: 'Playing Reading',
      trackTitle: 'Your Destiny Synthesis',
      trackArtist: 'Numero Shastra Oracle Voice'
    },
    learning: {
      sectionBadge: 'Numerology 101',
      sectionTitle: 'Ancient Wisdom Unlocked',
      sectionDesc: 'Begin your journey into the universe of numbers. Learn the fundamental core concepts that guide our analysis.',
      lifePathTitle: 'What is a Life Path Number?',
      lifePathParagraph1: 'Your Life Path number is the most important number in your numerology chart. It reveals your soul\'s purpose, key strengths, potential obstacles, and the journey you are meant to take in this lifetime.',
      lifePathParagraph2: 'It is computed by adding the digits of your full birthdate (day, month, and year) and reducing the sum to a single digit, or keeping it as one of the sacred Master Numbers (11, 22, or 33).',
      gridTitle: 'Understanding the Lo Shu Grid',
      gridParagraph1: 'The Lo Shu Grid is a 3x3 magic square used in Chinese Numerology. Each cell represents a different aspect of life (e.g., Wealth, Family, Knowledge, Career).',
      gridParagraph2: 'By placing your birthdate numbers in this grid, we reveal which areas of your life are naturally strong and which need balancing. The missing numbers represent your life lessons, and their remedies are key to unlocking your full potential.',
      calculatorHeading: 'Life Path Calculator',
      calculatorDescription: 'Calculate your core Life Path Number instantly. Enter your birthdate below.',
      birthdateLabel: 'Date of Birth',
      birthdatePlaceholder: 'Pick your birthdate',
      resultLabel: 'Life Path',
      resultHeading: 'The Path of the "{archetype}"',
      resultTraitsLabel: 'Core Traits',
      lifePathDatabase: {
        1: {
          archetype: 'The Leader / Pioneer',
          description: 'You are highly independent, ambitious, and original. You possess strong leadership skills and a drive to create new paths. Your journey is to master self-confidence and individuality.',
          traits: ['Independent', 'Ambitious', 'Creative', 'Assertive', 'Determined']
        },
        2: {
          archetype: 'The Peacemaker / Diplomat',
          description: 'You are intuitive, cooperative, and highly sensitive to others. You thrive in partnerships and excel at resolving conflicts. Your journey is to find balance and practice diplomacy.',
          traits: ['Empathetic', 'Cooperative', 'Sensitive', 'Patient', 'Supportive']
        },
        3: {
          archetype: 'The Communicator / Artist',
          description: 'You possess natural charisma, creativity, and expressive capability. You inspire others through art, speaking, or writing. Your journey is to express your feelings and spread optimism.',
          traits: ['Creative', 'Sociable', 'Expressive', 'Optimistic', 'Charismatic']
        },
        4: {
          archetype: 'The Builder / Manager',
          description: 'You are detail-oriented, practical, organized, and reliable. You lay solid foundations and value stability. Your journey is to establish order and systematically achieve long-term goals.',
          traits: ['Structured', 'Loyal', 'Methodical', 'Grounded', 'Hardworking']
        },
        5: {
          archetype: 'The Explorer / Free Spirit',
          description: 'You love freedom, adventure, variety, and adapting to change. You learn through hands-on experience and enjoy meeting diverse people. Your journey is to find freedom through discipline.',
          traits: ['Adaptable', 'Adventurous', 'Curious', 'Progressive', 'Dynamic']
        },
        6: {
          archetype: 'The Nurturer / Caregiver',
          description: 'You have a deep sense of responsibility, love, and compassion. You are dedicated to family, home, and community service. Your journey is to balance helping others with self-care.',
          traits: ['Compassionate', 'Responsible', 'Loving', 'Protective', 'Harmonious']
        },
        7: {
          archetype: 'The Seeker / Analyst',
          description: 'You are introspective, analytical, and drawn to spirituality or deep scientific truths. You seek understanding and value solitude. Your journey is to trust your intuition and seek wisdom.',
          traits: ['Analytical', 'Intuitive', 'Spiritual', 'Reserved', 'Knowledgeable']
        },
        8: {
          archetype: 'The Achiever / Powerhouse',
          description: 'You have exceptional ambition, efficiency, and a drive for material and professional success. You understand power dynamics. Your journey is to balance material gain with spiritual integrity.',
          traits: ['Goal-Oriented', 'Organized', 'Efficient', 'Strong-Willed', 'Practical']
        },
        9: {
          archetype: 'The Humanitarian / Philosopher',
          description: 'You are deeply compassionate, creative, and motivated by global healing and charity. You possess a broad worldview. Your journey is to learn detachment, practice forgiveness, and serve humanity.',
          traits: ['Generous', 'Compassionate', 'Artistic', 'Idealistic', 'Universal']
        },
        11: {
          archetype: 'The Intuitive Guide (Master Number)',
          description: 'You carry a double portion of number 1 energy combined with number 2 sensitivity. You are a spiritual messenger. Your journey is to overcome nervousness and inspire others with your insight.',
          traits: ['Inspiring', 'Highly Intuitive', 'Idealistic', 'Visionary', 'Empathetic']
        },
        22: {
          archetype: 'The Master Builder (Master Number)',
          description: 'You possess the practical skill of 4 and the visionary inspiration of 11. You can manifest large-scale ideas into physical reality. Your journey is to build things of lasting global value.',
          traits: ['Visionary', 'Practical', 'Organized', 'Empowered', 'Constructive']
        },
        33: {
          archetype: 'The Master Teacher (Master Number)',
          description: 'You represent the ultimate form of unconditional love and spiritual service. You are dedicated to uplifting the consciousness of humanity. Your journey is to lead with compassion.',
          traits: ['Selfless', 'Compassionate', 'Devoted', 'Wise', 'Healing']
        }
      }
    },
    testimonials: {
      sectionSubtitle: 'User Stories',
      sectionTitle: 'Real Stories. Real Insights.',
      sectionDescription: 'Join thousands of users who have found clarity, alignment, and direction with Numero Shastra.',
      ctaHeading: 'Transform Your Life Journey',
      ctaText: 'Join our growing community and download Numero Shastra on your mobile device today.',
      testimonials: [
        {
          quote: 'The remedies for my missing numbers were so easy to follow and actually made a difference in my focus.',
          author: 'Omkar Sutar',
          role: 'Verified App User'
        },
        {
          quote: 'The Oracle voice feels very personal. It\'s like a meditation and analysis combined.',
          author: 'Priya Sharma',
          role: 'Spiritual Practitioner'
        },
        {
          quote: 'I finally understand why certain years were so challenging thanks to the Pinnacle analysis.',
          author: 'Amit Verma',
          role: 'Entrepreneur'
        }
      ]
    },
    support: {
      sectionSubtitle: 'Help Center',
      sectionTitle: 'We\'re Here to Help',
      sectionDescription: 'Have questions about your numerology analysis, your grid calculation, or need technical support with the app? Get in touch with our team.',
      formHeading: 'Send Us a Message',
      nameLabel: 'Your Name',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@example.com',
      messageLabel: 'How can we help?',
      messagePlaceholder: 'Write your message here...',
      submitButton: 'Send Message',
      submitSuccess: 'Message sent successfully! We will get back to you shortly.',
      directContactHeading: 'Direct Contact',
      supportEmailHeading: 'Support Email',
      legalHeading: 'Legal & Policies',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      faqHeading: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'How accurate is the Lo Shu Grid calculation?',
          answer: 'The calculations are 100% mathematically correct and based strictly on the classical Chinese magic square and Vedic Numerology systems. Accuracy of interpretation depends entirely on entering the correct birthdate.'
        },
        {
          question: 'What languages is the app available in?',
          answer: 'Numero Shastra offers complete multilingual experiences in English, Hindi, and Marathi, including the unique Oracle voice narrations.'
        },
        {
          question: 'How does the Oracle Audio Guide work?',
          answer: 'Once your report is computed, you can tap the Play icon in the app. The Oracle synthesizes your data and reads the analysis section-by-section, enabling a completely hands-free learning experience.'
        }
      ]
    }
  },
  hi: {
    app: {
      brand: 'Numero Shastra',
      nav: {
        home: 'होम',
        pillars: '12 स्तंभ',
        oracle: 'ओरेकल गाइड',
        learning: 'शिक्षण केंद्र',
        testimonials: 'समुदाय',
        support: 'सहायता और गोपनीयता'
      },
      footer: {
        quickNavigation: 'त्वरित नेविगेशन',
        downloadTitle: 'मोबाइल पर डाउनलोड करें',
        downloadText: 'अपनी फोन पर आवाज़ वाचन के साथ एक व्यापक 360-डिग्री विस्तृत रिपोर्ट प्राप्त करें।',
        disclaimer: 'अस्वीकरण: अंक ज्योतिष व्याख्याएँ पारंपरिक वैदिक और चीनी पारमार्थिक सिद्धांतों पर आधारित हैं। इन्हें मार्गदर्शन, व्यक्तिगत आत्म-खोज, और शैक्षणिक उद्देश्यों के लिए बनाया गया है।',
        copyright: '© 2026 Numero Shastra. सर्वाधिकार सुरक्षित।'
      },
      languageDialog: {
        title: 'भाषा चुनें',
        subtitle: 'जारी रखने के लिए अपनी पसंदीदा भाषा चुनें',
        defaultHint: 'डिफ़ॉल्ट भाषा'
      },
      buttons: {
        downloadApp: 'एप डाउनलोड करें',
        webApp: 'वेब ऐप',
        explorePillars: '12 स्तंभ एक्सप्लोर करें',
        getStartedForFree: 'नि: शुल्क शुरू करें',
        calculatePath: 'पथ की गणना करें',
        sendMessage: 'संदेश भेजें',
        getItOnGooglePlay: 'Install करें'
      }
    },
    home: {
      heroBadge: 'वैदिक और चीनी अंक ज्योतिष',
      heroTitle: 'अपने जीवन के रहस्यमयी पैटर्न अनलॉक करें',
      heroSubtitle: 'प्राचीन अंक ज्योतिष और लो शु ग्रिड की शक्ति के साथ अपना सच्चा उद्देश्य, छिपी ताकतें, और भविष्य का मार्ग खोजें।',
      gridSectionSubtitle: 'पवित्र ज्यामिति',
      gridSectionTitle: 'लो शु ग्रिड का जादू',
      gridSectionDesc: 'नीचे के जादुई वर्ग के किसी भी सेल पर क्लिक करें और देखें कि यह जीवन के किस पहलू को नियंत्रित करता है।',
      introBadge: 'साथी के बारे में',
      introHeading: 'सिर्फ संख्या से ज्यादा',
      introParagraph1: 'Numero Shastra आपका व्यक्तिगत आध्यात्मिक साथी है। समय-परीक्षित वैदिक और लो शु ग्रिड सिद्धांतों का उपयोग करते हुए, हम आपके जन्मतिथि का गहन 360-डिग्री विश्लेषण प्रदान करते हैं जो आपके करियर, वित्त, और व्यक्तित्व विकास में मार्गदर्शन करता है।',
      introParagraph2: 'चाहे आपकी ग्रिड में महत्वपूर्ण संख्या गायब हो या आप अपनी व्यक्तिगत सौभाग्यपूर्ण कंपनाओं के साथ तालमेल बैठाना चाहें, हम आपकी राह को सशक्त बनाने के लिए व्यक्तिगत उपचार और मार्गदर्शन प्रदान करते हैं।',
      statBirthdateAnalysis: 'जन्मतिथि विश्लेषण',
      statLanguagesSupported: 'समर्थित भाषाएँ',
      highlightsTitle: 'क्यों चुनें Numero Shastra',
      highlightCards: [
        {
          title: 'प्राचीन ज्ञान',
          description: 'पवित्र लो शु ग्रिड और सदियों से परिष्कृत अंक ज्योतिष सिद्धांतों पर आधारित।'
        },
        {
          title: 'ओरेकल वॉइस',
          description: 'अपने भाग्य को सुनें। हमारी आवाज वाचन प्रणाली के साथ एक कारणात्मक अनुभव प्राप्त करें।'
        },
        {
          title: 'बहुभाषी',
          description: 'अंग्रेज़ी, मराठी और हिंदी में पूर्ण समर्थन, जिससे जानकारी आपकी पसंदीदा भाषा में उपलब्ध हो।'
        },
        {
          title: 'डेटा-आधारित',
          description: 'उच्च-शुद्धता व्यक्तित्व और ताकत मैपिंग के लिए उन्नत गणना एल्गोरिदम।'
        }
      ],
      gridCells: [
        {
          number: 4,
          title: 'धन और समृद्धि',
          planet: 'राहु (उत्तर नोड)',
          icon: 'fas fa-coins',
          description: 'वित्तीय वृद्धि, भौतिक समृद्धि, संगठन, और व्यावहारिकता को नियंत्रित करता है। यह लो शु ग्रिड के शीर्ष-बाएं क्वाड्रंट में स्थित है जो आपकी वित्तीय क्षमता का प्रतिनिधित्व करता है।',
          governs: 'धन, संपत्ति, व्यावहारिकता, अनुशासन।'
        },
        {
          number: 9,
          title: 'ख्याति और प्रतिष्ठा',
          planet: 'मंगल',
          icon: 'fas fa-fire',
          description: 'सामाजिक मान्यता, प्रतिष्ठा, ऊर्जा, जुनून, और करियर विस्तार को नियंत्रित करता है। शीर्ष केंद्र में स्थित है, यह अग्नि तत्व का प्रतिनिधित्व करता है।',
          governs: 'ख्याति, जुनून, महत्वकांक्षा, मान्यता।'
        },
        {
          number: 2,
          title: 'प्रेम और संबंध',
          planet: 'चंद्र',
          icon: 'fas fa-heart',
          description: 'साझेदारी, विवाह, संबंधों में सामंजस्य, भावनात्मक संतुलन, और संवेदनशीलता को नियंत्रित करता है। यह शीर्ष-दाएँ में स्थित है, जो पृथ्वी तत्व का प्रतिनिधित्व करता है।',
          governs: 'प्रेम, कूटनीति, संबंध, सहजज्ञान।'
        },
        {
          number: 3,
          title: 'परिवार और स्वास्थ्य',
          planet: 'बृहस्पति',
          icon: 'fas fa-tree',
          description: 'पूर्वजो समर्थन, स्वास्थ्य, माता-पिता के साथ संबंध, विकास, और समुदाय को नियंत्रित करता है। यह बाएँ ओर स्थित है और लकड़ के तत्व का प्रतिनिधित्व करता है।',
          governs: 'विकास, स्वास्थ्य, पारिवारिक संबंध, विस्तार।'
        },
        {
          number: 5,
          title: 'स्थिरता और संतुलन',
          planet: 'बुध',
          icon: 'fas fa-anchor',
          description: 'केंद्र कोर। मानसिक संतुलन, स्थिरता, संचार, लचीलापन, और सामान्य भाग्य को नियंत्रित करता है। यह सभी अन्य संख्याओं को जोड़ता है।',
          governs: 'कोर स्थिरता, संतुलन, व्यवसायिक समझ, संचार।'
        },
        {
          number: 7,
          title: 'रचनात्मकता और बच्चे',
          planet: 'केतु (दक्षिण नोड)',
          icon: 'fas fa-paint-brush',
          description: 'रचनात्मक विचारों, बच्चों, विरासत, आत्मनिरीक्षण, और आध्यात्मिक प्रयासों को नियंत्रित करता है। यह दाएँ ओर स्थित है और धातु तत्व का प्रतिनिधित्व करता है।',
          governs: 'रचनात्मक अभिव्यक्ति, बच्चे, सहजज्ञान, विश्लेषणात्मक कौशल।'
        },
        {
          number: 8,
          title: 'ज्ञान और बुद्धि',
          planet: 'शनि',
          icon: 'fas fa-book-open',
          description: 'आध्यात्मिक अंतर्दृष्टि, सीखने, बुद्धि, स्मृति, और व्यक्तिगत विकास को नियंत्रित करता है। यह निचले-बाएँ में स्थित है और पृथ्वी तत्व का प्रतिनिधित्व करता है।',
          governs: 'शिक्षा, बुद्धि, आत्म-प्रतिबिंब, धैर्य।'
        },
        {
          number: 1,
          title: 'करियर और यात्रा',
          planet: 'सूर्य',
          icon: 'fas fa-briefcase',
          description: 'करियर के अवसर, जीवन यात्रा, स्वतंत्रता, महत्वकांक्षा, और इच्छाशक्ति को नियंत्रित करता है। यह निचले केंद्र में स्थित है जो जल तत्व का प्रतिनिधित्व करता है।',
          governs: 'करियर, आकांक्षा, स्वतंत्रता, योजना।'
        },
        {
          number: 6,
          title: 'सहायक मित्र',
          planet: 'शुक्र',
          icon: 'fas fa-hands-helping',
          description: 'मार्गदर्शन, दोस्तों से समर्थन, यात्रा के अवसर, विलासिता, और सौंदर्य को नियंत्रित करता है। यह निचले-दाएँ में स्थित है और धातु तत्व का प्रतिनिधित्व करता है।',
          governs: 'मार्गदर्शक, समर्थन नेटवर्क, यात्रा, धन सुख।'
        }
      ]
    },
    pillars: {
      heading: 'भाग्य के 12 मुख्य स्तंभ',
      description: 'हमारा उन्नत जन्मतिथि विश्लेषण आपके जीवन के 12 महत्वपूर्ण पहलुओं को कवर करता है, पारंपरिक ज्ञान और वैज्ञानिक सटीकता को मिलाता है। यहाँ आपके विस्तृत रिपोर्ट में क्या शामिल है।',
      ctaHeading: 'क्या आप अपनी व्यक्तिगत योजना का अन्वेषण करने के लिए तैयार हैं?',
      ctaText: 'आज ही मोबाइल ऐप के अंदर अपनी 12 स्तंभ रिपोर्ट तक त्वरित पहुँच प्राप्त करें।',
      pillarItems: [
        {
          title: 'विस्तृत लो शु ग्रिड विश्लेषण',
          icon: 'fas fa-th',
          description: 'एक प्राचीन उपकरण जिसका उपयोग आपके भाग्य, संभावनाओं, और जीवन पैटर्न को समझने के लिए किया जाता है।'
        },
        {
          title: 'करियर अंतर्दृष्टि',
          icon: 'fas fa-briefcase',
          description: 'उन पेशेवर मार्गों और व्यापार क्षेत्रों की खोज करें जो आपकी स्वाभाविक कंपनियों और जन्म संख्याओं से मेल खाते हैं।'
        },
        {
          title: 'व्यक्तिगत उपचार',
          icon: 'fas fa-gem',
          description: 'आपकी ग्रिड में गुम संख्याओं को संतुलित करने के लिए सरल, व्यावहारिक, और प्रभावी उपचार।'
        },
        {
          title: 'उन्नत व्यक्तित्व मैपिंग',
          icon: 'fas fa-user-circle',
          description: 'आपके चरित्र गुणों, व्यवहार, छिपी ताकतों, और आपके शासक/भाग्य ग्रहों पर गहन विश्लेषण।'
        },
        {
          title: 'जीवन पथ और शिखर चरण मार्गदर्शन',
          icon: 'fas fa-road',
          description: 'अपने जीवन के प्रमुख विकासात्मक चरणों को समझें, किन चुनौतियों के लिए तैयार रहना है, और आपका अंतिम उद्देश्य क्या है।'
        },
        {
          title: 'ओरेकल वॉइस गाइड',
          icon: 'fas fa-headphones-alt',
          description: 'केवल अपने भाग्य को पढ़ें नहीं—सुनें। उच्च गुणवत्ता वाली ऑडियो वाचन रिपोर्ट को जीवन में लाती है।'
        },
        {
          title: 'स्टॉक मार्केट और वित्तीय स्वभाव',
          icon: 'fas fa-chart-line',
          description: 'आपकी वित्तीय जोखिम सहिष्णुता, निवेश प्रवृत्ति, और धन संचय पैटर्न पर एक अनूठा अंक ज्योतिष दृष्टिकोण।'
        },
        {
          title: 'संख्या दोहराव अंतर्दृष्टि',
          icon: 'fas fa-sync-alt',
          description: 'जानें कि आपकी जन्मतिथि में दोहराई गई संख्याएँ आपकी ऊर्जा, गुणों, और व्यवहार पैटर्न को कैसे प्रभावित करती हैं।'
        },
        {
          title: 'सममित, ऊर्ध्वाधर और तिरछी विमा',
          icon: 'fas fa-compress-arrows-alt',
          description: 'आपके विचार विमान, इच्छाशक्ति विमान, कार्य विमान, सफलता विमान, और ऊर्जा प्रवाह का एक पूर्ण ब्रेकडाउन।'
        },
        {
          title: 'व्यक्तिगत सौभाग्यपूर्ण रंग और दिन',
          icon: 'fas fa-palette',
          description: 'अपनी दिनचर्या, व्यावसायिक मीटिंग्स, और प्रमुख जीवन निर्णयों को अपनी व्यक्तिगत आकर्षक कंपनियों के साथ संरेखित करें।'
        },
        {
          title: 'व्यक्तित्व और जीवन पथ सामंजस्य',
          icon: 'fas fa-project-diagram',
          description: 'देखें कि आपका मुख्य चालक और कंडक्टर नंबर आपकी अद्वितीय जीवन गतिशीलता और अनुकूलता मैट्रिसेज को कैसे बनाते हैं।'
        },
        {
          title: 'ऊर्जा बूस्टर',
          icon: 'fas fa-bolt',
          description: 'सकारात्मक वाइब और ऑरा बढ़ाने के लिए व्यावहारिक दैनिक दिनचर्या, पुष्टि, और ध्यान सुझाव।'
        }
      ]
    },
    oracle: {
      heroBadge: 'विशेष फ़ीचर',
      heroTitle: 'अपने ओरेकल गाइड से मिलें',
      heroSubtitle: 'जब आप निर्देशित हो सकते हैं तो लंबी रिपोर्ट क्यों पढ़ें? Numero Shastra एक अनूठी ओरेकल ऑडियो वाचन सुविधा देता है जो आपके विश्लेषण को आपके लिए समझाती है। यह आपके साथ एक व्यक्तिगत अंक ज्योतिषी की तरह है।',
      bulletItems: [
        {
          title: 'हैंड्स-फ्री इनसाइट',
          description: 'आराम करते समय, यात्रा करते समय, या चिंतन करते समय सुनें। बुद्धिमत्ता को सहज रूप से बहने दें।'
        },
        {
          title: 'स्थानीय स्वर',
          description: 'अंग्रेज़ी, मराठी, या हिंदी में वाचन को स्वाभाविक रूप से अनुभव करें।'
        },
        {
          title: 'चरण-दर-चरण मार्गदर्शन',
          description: 'ओरेकल आपके मुख्य नंबरों से लेकर शिखर चरणों तक हर अनुभाग की व्याख्या करता है।'
        }
      ],
      audioReady: 'ऑडियो गाइड तैयार है',
      playingReading: 'पठन चला रहा है',
      trackTitle: 'आपका भाग्य संश्लेषण',
      trackArtist: 'Numero Shastra ओरेकल वॉइस'
    },
    learning: {
      sectionBadge: 'अंक ज्योतिष 101',
      sectionTitle: 'प्राचीन ज्ञान अनलॉक',
      sectionDesc: 'संख्याओं के ब्रह्मांड में अपनी यात्रा शुरू करें। हमारे विश्लेषण को मार्गदर्शित करने वाले मूलभूत अवधारणाओं को सीखें।',
      lifePathTitle: 'लाइफ़ पाथ नंबर क्या है?',
      lifePathParagraph1: 'आपका लाइफ़ पाथ नंबर आपके अंक ज्योतिष चार्ट में सबसे महत्वपूर्ण संख्या है। यह आपकी आत्मा का उद्देश्य, प्रमुख ताकतें, संभावित अड़चनें और उस यात्रा को उजागर करता है जिसे आपको इस जीवन में करना है।',
      lifePathParagraph2: 'यह आपकी पूर्ण जन्मतिथि (दिन, महीना, और वर्ष) की अंकों को जोड़कर और योग को एकल अंक तक घटाकर या इसे पवित्र मास्टर नंबर (11, 22, या 33) के रूप में बनाए रखकर गणना किया जाता है।',
      gridTitle: 'लो शु ग्रिड को समझना',
      gridParagraph1: 'लो शु ग्रिड चीनी अंक ज्योतिष में उपयोग किया जाने वाला 3x3 जादुई वर्ग है। प्रत्येक सेल जीवन के एक अलग पहलू का प्रतिनिधित्व करता है (जैसे धन, परिवार, ज्ञान, करियर)।',
      gridParagraph2: 'अपने जन्मतिथि नंबरों को इस ग्रिड में रखकर, हम यह उजागर करते हैं कि आपके जीवन के कौन से क्षेत्र स्वाभाविक रूप से मजबूत हैं और किन्हें संतुलन की आवश्यकता है। गुम नंबर आपके जीवन पाठ का प्रतिनिधित्व करते हैं, और उनके उपचार आपकी पूर्ण क्षमता को खोलने की कुंजी हैं।',
      calculatorHeading: 'लाइफ़ पाथ कैलकुलेटर',
      calculatorDescription: 'अपने कोर लाइफ़ पाथ नंबर को तुरंत गणना करें। नीचे अपनी जन्मतिथि दर्ज करें।',
      birthdateLabel: 'जन्म तिथि',
      birthdatePlaceholder: 'अपनी जन्मतिथि चुनें',
      resultLabel: 'लाइफ़ पाथ',
      resultHeading: '"{archetype}" का पथ',
      resultTraitsLabel: 'मुख्य लक्षण',
      lifePathDatabase: {
        1: {
          archetype: 'नेता / पायनियर',
          description: 'आप अत्यंत स्वतंत्र, महत्वाकांक्षी, और मौलिक हैं। आपके पास मजबूत नेतृत्व कौशल और नए मार्ग बनाने की प्रेरणा है। आपकी यात्रा आत्म-विश्वास और व्यक्तिगतता में निपुण होने की है।',
          traits: ['स्वतंत्र', 'महत्त्वाकांक्षी', 'रचनात्मक', 'दृढ़', 'असsertive']
        },
        2: {
          archetype: 'शांतिदूत / कूटनीतिज्ञ',
          description: 'आप सहज, सहयोगी, और दूसरों के प्रति अत्यधिक संवेदनशील हैं। आप साझेदारी में फलते-फूलते हैं और संघर्षों को सुलझाने में उत्कृष्ट हैं। आपकी यात्रा संतुलन खोजने और कूटनीति अभ्यास करने की है।',
          traits: ['सहानुभूतिपूर्ण', 'सहयोगी', 'संवेदनशील', 'धैर्यवान', 'समर्थक']
        },
        3: {
          archetype: 'संचारक / कलाकार',
          description: 'आपके पास प्राकृतिक करिश्मा, रचनात्मकता, और अभिव्यक्ति क्षमता है। आप कला, बोलने, या लेखन के माध्यम से दूसरों को प्रेरित करते हैं। आपकी यात्रा अपनी भावनाओं को व्यक्त करने और आशावाद फैलाने की है।',
          traits: ['रचनात्मक', 'सामाजिक', 'अभिव्यक्तिक', 'आशावादी', 'आकर्षक']
        },
        4: {
          archetype: 'निर्माता / प्रबंधक',
          description: 'आप विवरण-उन्मुख, व्यावहारिक, व्यवस्थित, और विश्वसनीय हैं। आप ठोस नींव रखते हैं और स्थिरता को महत्व देते हैं। आपकी यात्रा व्यवस्था स्थापित करने और दीर्घकालिक लक्ष्यों को व्यवस्थित रूप से प्राप्त करने की है।',
          traits: ['संरचित', 'निष्ठावान', 'पद्धतिपूर्ण', 'जमीन से जुड़ा', 'महनती']
        },
        5: {
          archetype: 'अन्वेषक / स्वतंत्र आत्मा',
          description: 'आप स्वतंत्रता, रोमांच, विविधता, और परिवर्तन के अनुकूल होने से प्रेम करते हैं। आप व्यावहारिक अनुभव से सीखते हैं और विविध लोगों से मिलना पसंद करते हैं। आपकी यात्रा अनुशासन के माध्यम से स्वतंत्रता खोजने की है।',
          traits: ['अनुकूलनीय', 'साहसी', 'जिज्ञासु', 'प्रगतिशील', 'गतिशील']
        },
        6: {
          archetype: 'पालक / देखभालकर्ता',
          description: 'आपमें जिम्मेदारी, प्रेम, और सहानुभूति की गहरी भावना है। आप परिवार, घर, और समुदाय सेवा के प्रति समर्पित हैं। आपकी यात्रा दूसरों की मदद करने और स्वयं-देखभाल के बीच संतुलन बनाने की है।',
          traits: ['दयालु', 'जिम्मेदार', 'प्रेमपूर्ण', 'सुरक्षात्मक', 'सहज']
        },
        7: {
          archetype: 'अन्वेषक / विश्लेषक',
          description: 'आप आत्मनिरीक्षणशील, विश्लेषणात्मक, और आध्यात्मिक या गहरी वैज्ञानिक सच्चाईयों की ओर आकर्षित हैं। आप समझ खोजते हैं और अकेलेपन को महत्व देते हैं। आपकी यात्रा अपनी सहजज्ञान पर भरोसा करने और बुद्धि प्राप्त करने की है।',
          traits: ['विश्लेषणात्मक', 'सहज', 'आध्यात्मिक', 'आरक्षित', 'ज्ञानवान']
        },
        8: {
          archetype: 'सिद्धकर्ता / सामर्थ्यशाली',
          description: 'आपमें असाधारण महत्वाकांक्षा, कुशलता, और भौतिक व पेशेवर सफलता के लिए एक प्रेरणा है। आप शक्ति के गतिशीलता को समझते हैं। आपकी यात्रा भौतिक लाभ और आध्यात्मिक ईमानदारी के बीच संतुलन बनाने की है।',
          traits: ['लक्ष्य-उन्मुख', 'संगठित', 'कुशल', 'दृढ़-इच्छाशक्ति', 'व्यावहारिक']
        },
        9: {
          archetype: 'मानवतावादी / दार्शनिक',
          description: 'आप अति सहानुभूतिपूर्ण, रचनात्मक, और वैश्विक उपचार व चैरिटी से प्रेरित हैं। आपके पास एक व्यापक विश्व-दृष्टिकोण है। आपकी यात्रा असंगठन सीखने, क्षमा अभ्यास करने, और मानवता की सेवा करने की है।',
          traits: ['उदार', 'दयालु', 'कलात्मक', 'आदर्शवादी', 'वैश्विक']
        },
        11: {
          archetype: 'सहज मार्गदर्शक (मास्टर नंबर)',
          description: 'आप number 1 की ऊर्जा का डबल हिस्सा number 2 की संवेदनशीलता के साथ लेकर चलते हैं। आप एक आध्यात्मिक संदेशवाहक हैं। आपकी यात्रा घबराहट को पार करने और अपनी अंतर्दृष्टि से दूसरों को प्रेरित करने की है।',
          traits: ['प्रेरणादायी', 'अत्यधिक सहज', 'आदर्शवादी', 'दूरदर्शी', 'सहानुभूतिपूर्ण']
        },
        22: {
          archetype: 'मास्टर बिल्डर (मास्टर नंबर)',
          description: 'आपके पास 4 की व्यावहारिक क्षमता और 11 की दूरदर्शी प्रेरणा है। आप भौतिक रूप से बड़े विचारों को साकार कर सकते हैं। आपकी यात्रा ऐसे मूल्यवान कार्यों का निर्माण करने की है जो दीर्घकालिक रूप से प्रभावशाली हों।',
          traits: ['दूरदर्शी', 'व्यावहारिक', 'संगठित', 'सशक्त', 'निर्माणशील']
        },
        33: {
          archetype: 'मास्टर शिक्षक (मास्टर नंबर)',
          description: 'आप आत्मीय प्रेम और आध्यात्मिक सेवा का परमानंद रूप प्रस्तुत करते हैं। आप मानवता की चेतना को ऊपर उठाने के लिए समर्पित हैं। आपकी यात्रा करुणा के साथ नेतृत्व करने की है।',
          traits: ['निःस्वार्थ', 'दयालु', 'समर्पित', 'ज्ञानी', 'उपचारात्मक']
        }
      }
    },
    testimonials: {
      sectionSubtitle: 'उपयोगकर्ता कहानियाँ',
      sectionTitle: 'वास्तविक कहानियाँ। वास्तविक अंतर्दृष्टि।',
      sectionDescription: 'हजारों उपयोगकर्ताओं से जुड़ें जिन्होंने Numero Shastra के साथ स्पष्टता, संरेखण, और दिशा पाई है।',
      ctaHeading: 'अपने जीवन यात्रा को बदलें',
      ctaText: 'हमारे बढ़ते समुदाय में शामिल हों और आज ही अपने मोबाइल डिवाइस पर Numero Shastra डाउनलोड करें।',
      testimonials: [
        {
          quote: 'मेरी गुम संख्याओं के लिए उपचार अनुसरण करने में बहुत आसान थे और वास्तव में मेरी एकाग्रता में फर्क आया।',
          author: 'ओमकार सुतार',
          role: 'प्रमाणित ऐप उपयोगकर्ता'
        },
        {
          quote: 'ओरेकल आवाज़ बहुत व्यक्तिगत महसूस होती है। यह ध्यान और विश्लेषण का संयोजन जैसा है।',
          author: 'प्रिया शर्मा',
          role: 'आध्यात्मिक साधक'
        },
        {
          quote: 'मुझे अंततः समझ आया कि कुछ वर्ष इतने चुनौतीपूर्ण क्यों थे, शिखर विश्लेषण के कारण।',
          author: 'अमित वर्मा',
          role: 'उद्यमी'
        }
      ]
    },
    support: {
      sectionSubtitle: 'सहायता केंद्र',
      sectionTitle: 'हम आपकी सहायता के लिए हैं',
      sectionDescription: 'क्या आपके अंक ज्योतिष विश्लेषण, ग्रिड गणना, या ऐप के साथ तकनीकी सहायता के बारे में प्रश्न हैं? हमारी टीम से संपर्क करें।',
      formHeading: 'हमें संदेश भेजें',
      nameLabel: 'आपका नाम',
      namePlaceholder: 'अपना पूरा नाम दर्ज करें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'name@example.com',
      messageLabel: 'हम आपकी कैसे सहायता कर सकते हैं?',
      messagePlaceholder: 'अपना संदेश यहाँ लिखें...',
      submitButton: 'संदेश भेजें',
      submitSuccess: 'संदेश सफलतापूर्वक भेजा गया! हम जल्द ही आपसे संपर्क करेंगे।',
      directContactHeading: 'प्रत्यक्ष संपर्क',
      supportEmailHeading: 'सहायता ईमेल',
      legalHeading: 'कानूनी और नीतियाँ',
      privacyPolicy: 'गोपनीयता नीति',
      termsOfService: 'सेवा की शर्तें',
      faqHeading: 'अक्सर पूछे जाने वाले प्रश्न',
      faqs: [
        {
          question: 'लो शु ग्रिड गणना कितनी सटीक है?',
          answer: 'गणनाएँ 100% गणितीय रूप से सही हैं और केवल पारंपरिक चीनी जादुई वर्ग और वैदिक अंक ज्योतिष प्रणालियों पर आधारित हैं। व्याख्या की सटीकता पूरी तरह से सही जन्मतिथि दर्ज करने पर निर्भर करती है।'
        },
        {
          question: 'ऐप कौन सी भाषाओं में उपलब्ध है?',
          answer: 'Numero Shastra अंग्रेज़ी, हिंदी, और मराठी में पूर्ण बहुभाषी अनुभव प्रदान करता है, जिसमें अनूठी ओरेकल वॉइस वाचन शामिल हैं।'
        },
        {
          question: 'ओरेकल ऑडियो गाइड कैसे काम करती है?',
          answer: 'एक बार आपका रिपोर्ट गणना हो जाने के बाद, आप ऐप में प्ले आइकन पर टैप कर सकते हैं। ओरेकल आपके डेटा को संश्लेषित करता है और हर सेक्शन को पढ़ता है, जिससे यह एक पूरी तरह से हैंड्स-फ्री सीखने का अनुभव बन जाता है।'
        }
      ]
    }
  },
  mr: {
    app: {
      brand: 'Numero Shastra',
      nav: {
        home: 'होम',
        pillars: '12 स्तंभ',
        oracle: 'ओरेकल मार्गदर्शक',
        learning: 'शिक्षण केंद्र',
        testimonials: 'समुदाय',
        support: 'समर्थन आणि गोपनीयता'
      },
      footer: {
        quickNavigation: 'त्वरित नेव्हिगेशन',
        downloadTitle: 'मोबाईलवर डाउनलोड करा',
        downloadText: 'तुमच्या फोनवर व्हॉईस नॅरेशनसह व्यापक 360-डिग्री तपशीलवार रिपोर्ट मिळवा.',
        disclaimer: 'अस्वीकरण: अंकशास्त्र व्याख्या पारंपरिक वैदिक आणि चिनी आध्यात्मिक सिद्धांतांवर आधारित आहेत. त्या मार्गदर्शन, स्वतःच्या शोध, आणि शैक्षणिक उद्दीष्टांसाठी आहेत.',
        copyright: '© 2026 Numero Shastra. सर्व हक्क राखीव.'
      },
      languageDialog: {
        title: 'भाषा निवडा',
        subtitle: 'सुरू ठेवण्यासाठी तुमची आवडती भाषा निवडा',
        defaultHint: 'मूळ भाषा'
      },
      buttons: {
        downloadApp: 'अ‍ॅप डाउनलोड करा',
        webApp: 'वेब अ‍ॅप',
        explorePillars: '12 स्तंभ एक्सप्लोर करा',
        getStartedForFree: 'मुक्त सुरू करा',
        calculatePath: 'मार्गाची गणना करा',
        sendMessage: 'संदेश पाठवा',
        getItOnGooglePlay: 'Install करा'
      }
    },
    home: {
      heroBadge: 'वैदिक आणि चीनी अंकशास्त्र',
      heroTitle: 'तुमच्या आयुष्याचे रहस्यमय नमुने अनलॉक करा',
      heroSubtitle: 'प्राचीन अंकशास्त्र आणि लो शू ग्रिडच्या शक्तीने तुमचा खरा उद्देश, लपलेली क्षमता आणि भविष्यातील मार्ग शोधा.',
      gridSectionSubtitle: 'पवित्र भूमिती',
      gridSectionTitle: 'लो शू ग्रिडचे जादू',
      gridSectionDesc: 'खालील जादुई चौकोनीमध्ये कोणत्याही कक्षावर क्लिक करा आणि पाहा की ते जीवनाच्या कोणत्या पैलूवर नियंत्रण ठेवते.',
      introBadge: 'साथी विषयी',
      introHeading: 'फक्त संख्या नाही',
      introParagraph1: 'Numero Shastra तुमचा वैयक्तिक आध्यात्मिक साथी आहे. वेळेनं तपासलेल्या वैदिक आणि लो शू ग्रिड तत्त्वांचा उपयोग करून, आम्ही तुमच्या जन्मतारीखेचा सखोल 360-डिग्री विश्लेषण देतो जे तुमच्या कारकीर्दी, आर्थिक स्थिती आणि व्यक्तिमत्व विकासाला मार्गदर्शन करते.',
      introParagraph2: 'जरी तुमच्या ग्रिडमध्ये महत्त्वाची संख्या हरवलेली असली किंवा तुम्हाला तुमच्या वैयक्तिक शुभ कंपन्यांशी जुळवून घ्यायचे असेल, आम्ही तुमचा मार्ग सशक्त करण्यासाठी वैयक्तिक उपचार आणि मार्गदर्शन देतो.',
      statBirthdateAnalysis: 'जन्मतारीख विश्लेषण',
      statLanguagesSupported: 'समर्थित भाषा',
      highlightsTitle: 'Numero Shastra का निवडा',
      highlightCards: [
        {
          title: 'प्राचीन ज्ञान',
          description: 'पवित्र लो शू ग्रिड आणि शतके परिष्कृत अंकशास्त्र तत्त्वांवर आधारित.'
        },
        {
          title: 'ओरेकल आवाज',
          description: 'तुमचे भाग्य ऐका. आमच्या आवाज वाचन प्रणालीसह एक समृद्ध अनुभव घ्या.'
        },
        {
          title: 'बहुभाषिक',
          description: 'इंग्रजी, मराठी, आणि हिंदीमध्ये पूर्ण समर्थन, जे तुमच्या प्राधान्य भाषेत माहिती आणते.'
        },
        {
          title: 'डेटा-आधारित',
          description: 'उच्च अचूकतेचे व्यक्तिमत्व आणि सामर्थ्य मॅपिंगसाठी प्रगत गणना अल्गोरिदम.'
        }
      ],
      gridCells: [
        {
          number: 4,
          title: 'समृद्धि आणि ऐश्वर्य',
          planet: 'राहू (उत्तर नोड)',
          icon: 'fas fa-coins',
          description: 'आर्थिक वाढ, भौतिक समृद्धी, संघटना, आणि व्यावहारिकता नियंत्रित करते. हे लो शू ग्रिडच्या वरच्या डाव्या चौकोनीत असते आणि तुमच्या वित्तीय क्षमतेचे प्रतिनिधित्व करते.',
          governs: 'समृद्धि, संपत्ती, व्यावहारिकता, शिस्त.'
        },
        {
          number: 9,
          title: 'कीर्ती आणि प्रतिष्ठा',
          planet: 'मंगल',
          icon: 'fas fa-fire',
          description: 'सामाजिक ओळख, प्रतिष्ठा, ऊर्जा, आवেগ, आणि करिअर विस्तार नियंत्रित करते. वरच्या मध्यभागी स्थित आहे, हे अग्नी तत्वाचे प्रतिनिधित्व करते.',
          governs: 'कीर्ती, आवेग, महत्वाकांक्षा, मान्यता.'
        },
        {
          number: 2,
          title: 'प्रेम आणि नाते',
          planet: 'चंद्र',
          icon: 'fas fa-heart',
          description: 'सहभाग, विवाह, नातेसंबंधांची समरसता, भावनिक संतुलन, आणि संवेदनशीलता नियंत्रित करते. हे वरच्या उजव्या बाजूला स्थित आहे, जे पृथ्वी तत्वाचे प्रतिनिधित्व करते.',
          governs: 'प्रेम, कूटनीती, नाते, अंतर्ज्ञान.'
        },
        {
          number: 3,
          title: 'कुटुंब आणि आरोग्य',
          planet: 'बृहस्पति',
          icon: 'fas fa-tree',
          description: 'वंशपरंपरा समर्थन, आरोग्य, पालकांसोबतचे नाते, विकास, आणि समुदाय नियंत्रित करते. हे डाव्या बाजूला स्थित आहे आणि लाकूड तत्वाचे प्रतिनिधित्व करते.',
          governs: 'विकास, आरोग्य, कौटुंबिक संबंध, विस्तार.'
        },
        {
          number: 5,
          title: 'स्थैर्य आणि समतोल',
          planet: 'बुध',
          icon: 'fas fa-anchor',
          description: 'केंद्र कोर. मानसिक संतुलन, स्थैर्य, संवाद, लवचिकता, आणि सामान्य भाग्य नियंत्रित करते. हे सर्व इतर संख्यांना जोडते.',
          governs: 'कोर स्थैर्य, समतोल, व्यवसाय समज, संपर्क.'
        },
        {
          number: 7,
          title: 'सर्जनशीलता आणि मुले',
          planet: 'केतू (दक्षिण नोड)',
          icon: 'fas fa-paint-brush',
          description: 'सर्जनशील कल्पना, मुले, वारसा, अंतर्मुखता, आणि आध्यात्मिक प्रयत्न नियंत्रित करते. हे उजव्या बाजूला स्थित आहे आणि धातू तत्वाचे प्रतिनिधित्व करते.',
          governs: 'सर्जनशील अभिव्यक्ति, मुले, अंतर्ज्ञान, विश्लेषणात्मक कौशल्ये.'
        },
        {
          number: 8,
          title: 'ज्ञान आणि शहाणपण',
          planet: 'शनि',
          icon: 'fas fa-book-open',
          description: 'आध्यात्मिक अंतर्दृष्टी, अध्ययन, बुद्धी, स्मरणशक्ती, आणि वैयक्तिक विकास नियंत्रित करते. हे खालच्या डाव्या बाजूला स्थित आहे आणि पृथ्वी तत्वाचे प्रतिनिधित्व करते.',
          governs: 'शिक्षण, शहाणपण, आत्म-प्रतिबिंब, संयम.'
        },
        {
          number: 1,
          title: 'कारकीर्द आणि प्रवास',
          planet: 'सूर्य',
          icon: 'fas fa-briefcase',
          description: 'कारकीर्द संधी, जीवन प्रवास, स्वातंत्र्य, महत्वाकांक्षा, आणि इच्छाशक्ती नियंत्रित करते. हे खालच्या मध्यभागी स्थित आहे आणि जल तत्वाचे प्रतिनिधित्व करते.',
          governs: 'कारकीर्द, आकांक्षा, स्वातंत्र्य, योजना.'
        },
        {
          number: 6,
          title: 'मदतीचे मित्र',
          planet: 'शुक्र',
          icon: 'fas fa-hands-helping',
          description: 'मार्गदर्शन, मित्रांकडून समर्थन, प्रवास संधी, ऐश्वर्य, आणि सौंदर्य नियंत्रित करते. हे खालच्या उजव्या बाजूला स्थित आहे आणि धातू तत्वाचे प्रतिनिधित्व करते.',
          governs: 'मार्गदर्शक, समर्थन नेटवर्क, प्रवास, संपत्ती सुख.'
        }
      ]
    },
    pillars: {
      heading: 'नियतीचे 12 मुख्य स्तंभ',
      description: 'आमचे प्रगत जन्मतारीख विश्लेषण तुमच्या आयुष्याच्या 12 महत्त्वाच्या पैलूंवर प्रकाश टाकते, पारंपरिक ज्ञान आणि वैज्ञानिक अचूकतेचे मिश्रण करते. येथे तुमच्या विस्तृत अहवालात काय समाविष्ट आहे.',
      ctaHeading: 'तुमची वैयक्तिक रूपरेषा एक्सप्लोर करण्यास तयार आहात का?',
      ctaText: 'आज मोबाइल अ‍ॅपमध्ये आपला 12 स्तंभ अहवाल त्वरित एक्सेस करा.',
      pillarItems: [
        {
          title: 'विस्तृत लो शू ग्रिड विश्लेषण',
          icon: 'fas fa-th',
          description: 'एक प्राचीन साधन ज्याचा वापर संख्यांच्या स्थान व संरेखनाद्वारे तुमची नियती, क्षमता आणि जीवन पॅटर्न समजण्यासाठी होतो.'
        },
        {
          title: 'कारकीर्द अंतर्दृष्टी',
          icon: 'fas fa-briefcase',
          description: 'तुमच्या नैसर्गिक कंपन्यांशी आणि जन्म संख्येशी जुळणाऱ्या व्यावसायिक मार्गांचा शोध घ्या.'
        },
        {
          title: 'वैयक्तिक उपचार',
          icon: 'fas fa-gem',
          description: 'तुमच्या ग्रिडमधील गमावलेल्या संख्या संतुलित करण्यासाठी सोपे, व्यावहारिक आणि प्रभावी उपचार.'
        },
        {
          title: 'उन्नत व्यक्तिमत्व नकाशण',
          icon: 'fas fa-user-circle',
          description: 'तुमच्या व्यक्तिमत्व वैशिष्ट्ये, वर्तन, लपलेल्या शक्ती आणि तुमच्या शासक/भाग्य ग्रहांवर सखोल विश्लेषण.'
        },
        {
          title: 'जीवन मार्ग आणि शिखर टप्प्यांचे मार्गदर्शन',
          icon: 'fas fa-road',
          description: 'तुमच्या जीवनातील प्रमुख विकासात्मक चक्र काय आहेत, कोणत्या आव्हानांसाठी सज्ज रहावे, आणि तुमचा अंतिम उद्देश काय आहे हे समजून घ्या.'
        },
        {
          title: 'ओरेकल वॉइस मार्गदर्शक',
          icon: 'fas fa-headphones-alt',
          description: 'फक्त तुमची नियती वाचा नाही—ऐका. उच्च दर्जाच्या ऑडिओ वाचनामुळे तुमचे अहवाल जिवंत होतात.'
        },
        {
          title: 'स्टॉक मार्केट व आर्थिक स्वभाव',
          icon: 'fas fa-chart-line',
          description: 'तुमच्या आर्थिक धोका सहनशीलतेवर, गुंतवणूक वृत्तीवर आणि धन संचयन पॅटर्नवर एक अनोखा अंकशास्त्रीय दृष्टिकोन.'
        },
        {
          title: 'संख्या घडणाऱ्या अंतर्दृष्टी',
          icon: 'fas fa-sync-alt',
          description: 'तुमच्या जन्मतारीखेतील पुनरावृत्ती संख्या तुमच्या ऊर्जा, गुण आणि वर्तन पॅटर्नवर कसा परिणाम करतात ते जाणून घ्या.'
        },
        {
          title: 'आडवे, उभे आणि तिरडे विमा',
          icon: 'fas fa-compress-arrows-alt',
          description: 'तुमची विचार विमा, इच्छाशक्ती विमा, क्रिया विमा, यश विमा आणि ऊर्जा कशी वाहते याचे एक पूर्ण विभाजन.'
        },
        {
          title: 'वैयक्तिक शुभ रंग आणि दिवस',
          icon: 'fas fa-palette',
          description: 'तुमची दिनचर्या, व्यावसायिक बैठक आणि प्रमुख जीवन निर्णय तुमच्या वैयक्तिक शुभ कंपन्यांसह समक्रमित करा.'
        },
        {
          title: 'व्यक्तिमत्व आणि जीवन मार्ग समन्वय',
          icon: 'fas fa-project-diagram',
          description: 'पाहा तुमचा मुख्य चालक आणि कंडक्टर संख्या तुमची अद्वितीय जीवन गतिशीलता आणि जुळवणी मॅट्रिक्स कशी तयार करतात.'
        },
        {
          title: 'ऊर्जा बूस्टर',
          icon: 'fas fa-bolt',
          description: 'तुमचा कंपन वाढविण्यासाठी उपयोगी दैनिक दिनक्रम, पुष्टी व ध्यान टीपा.'
        }
      ]
    },
    oracle: {
      heroBadge: 'विशेष वैशिष्ट्य',
      heroTitle: 'तुमच्या ओरेकल मार्गदर्शकाशी भेटा',
      heroSubtitle: 'जेव्हा तुम्हाला मार्गदर्शन मिळू शकते तेव्हा लांब अहवाल का वाचाल? Numero Shastra एक अद्वितीय ओरेकल ऑडिओ वाचनेची सुविधा देते जी तुमच्या विश्लेषणाला तुमच्यासाठी स्पष्ट करते. हे तुमच्यासोबत असणाऱ्या वैयक्तिक अंकशास्त्रज्ञासारखे आहे.',
      bulletItems: [
        {
          title: 'हँड्स-फ्री अंतर्दृष्टी',
          description: 'आराम करताना, प्रवास करताना, किंवा विचार करताना ऐका. बुद्धिमत्तेनं नैसर्गिकरित्या वाहू द्या.'
        },
        {
          title: 'स्थानिक आवाज',
          description: 'इंग्रजी, मराठी किंवा हिंदी मध्ये वाचन नैसर्गिकरित्या अनुभव घ्या.'
        },
        {
          title: 'टप्प्याटप्प्याने मार्गदर्शन',
          description: 'ओरेकल तुमचे मुख्य संख्या ते शिखर टप्पे पर्यंत प्रत्येक विभाग स्पष्ट करतो.'
        }
      ],
      audioReady: 'ऑडिओ मार्गदर्शक तयार आहे',
      playingReading: 'वाचन सुरू आहे',
      trackTitle: 'तुमचा भाग्य संश्लेषण',
      trackArtist: 'Numero Shastra ओरेकल आवाज'
    },
    learning: {
      sectionBadge: 'अंकशास्त्र 101',
      sectionTitle: 'प्राचीन ज्ञान अनलॉक',
      sectionDesc: 'संख्यांच्या विश्वात तुमची यात्रा सुरू करा. आमच्या विश्लेषणाचे मार्गदर्शन करणाऱ्या मूलभूत संकल्पना शिका.',
      lifePathTitle: 'लाइफ पाथ नंबर म्हणजे काय?',
      lifePathParagraph1: 'तुमचा लाइफ पाथ नंबर तुमच्या अंकशास्त्र चार्टमधील सर्वात महत्त्वाची संख्या आहे. हे तुमचा आत्म्याचा उद्देश, मुख्य ताकदी, संभाव्य अडथळे आणि आयुष्यातील प्रवास उघड करते.',
      lifePathParagraph2: 'हे तुमच्या पूर्ण जन्मतारीखेतील (दिवस, महिना, आणि वर्ष) अंकांची बेरीज करून आणि योगाला एका अंकापर्यंत कमी करून किंवा पवित्र मास्टर नंबर (11, 22, किंवा 33) म्हणून ठेवून गणना केले जाते.',
      gridTitle: 'लो शू ग्रिड समजून घेणे',
      gridParagraph1: 'लो शू ग्रिड हा चिनी अंकशास्त्रात वापरला जाणारा 3x3 जादूचा चौकोन आहे. प्रत्येक कक्ष जीवनाच्या वेगळ्या पैलूचे प्रतिनिधित्व करते (उदा. धन, कुटुंब, ज्ञान, करिअर).',
      gridParagraph2: 'तुमच्या जन्मतारीखेतील अंक या ग्रिडमध्ये ठेवून, आम्ही हे उघड करतो की तुमच्या जीवनातील कोणते क्षेत्र स्वाभाविकपणे मजबूत आहेत आणि कोणत्या क्षेत्रांना संतुलनाची आवश्यकता आहे. गमलेल्या अंकांद्वारे तुमचा जीवन पाठ दर्शविला जातो आणि त्यांचे उपचार तुमची पूर्ण क्षमता उघडण्याची गुरुकिल्ली आहेत.',
      calculatorHeading: 'लाइफ पाथ कॅल्क्युलेटर',
      calculatorDescription: 'तुमचा मुख्य लाइफ पाथ नंबर त्वरीत गणना करा. खाली तुमची जन्मतारीख प्रविष्ट करा.',
      birthdateLabel: 'जन्म तारीख',
      birthdatePlaceholder: 'तुमची जन्म तारीख निवडा',
      resultLabel: 'लाइफ पाथ',
      resultHeading: '"{archetype}"चा मार्ग',
      resultTraitsLabel: 'मुख्य वैशिष्ट्ये',
      lifePathDatabase: {
        1: {
          archetype: 'नेते / पायनियर',
          description: 'तुम्ही अत्यंत स्वतंत्र, महत्त्वाकांक्षी, आणि मौलिक आहात. तुमच्याकडे मजबूत नेतृत्व कौशल्ये आणि नवीन मार्ग तयार करण्याची प्रेरणा आहे. तुमची यात्रा आत्मविश्वास आणि वैयक्तिकत्वात पारंगत होण्याची आहे.',
          traits: ['स्वतंत्र', 'महत्त्वाकांक्षी', 'रचनात्मक', 'दृढ', 'आरोपात्मक']
        },
        2: {
          archetype: 'शांततादूत / कूटनीतिज्ञ',
          description: 'तुम्ही सहानुभूतिपूर्ण, सहयोगी, आणि इतरांप्रती अतिशय संवेदनशील आहात. तुम्हाला भागीदारीत फुलण्याची आणि संघर्ष सोडविण्यात निपुणता आहे. तुमची यात्रा संतुलन शोधण्याची आणि कूटनीतीचा सराव करण्याची आहे.',
          traits: ['सहानुभूतिपूर्ण', 'सहयोगी', 'संवेदनशील', 'धैर्यवान', 'सहाय्यपूर्ण']
        },
        3: {
          archetype: 'संपर्ककर्ता / कलाकार',
          description: 'तुमच्याकडे नैसर्गिक करिश्मा, सर्जनशीलता, आणि अभिव्यक्ती क्षमता आहे. तुम्ही कला, बोलण्याद्वारे, किंवा लेखनाद्वारे इतरांना प्रेरणा देता. तुमची यात्रा तुमची भावना व्यक्त करण्याची आणि आशावाद पसरविण्याची आहे.',
          traits: ['सर्जनशील', 'सामाजिक', 'अभिव्यक्ती', 'आशावादी', 'आकर्षक']
        },
        4: {
          archetype: 'बांधकाम करणारा / व्यवस्थापक',
          description: 'तुम्ही तपशील-आधारित, व्यावहारिक, संघटित, आणि विश्वासार्ह आहात. तुम्ही मजबूत पाया तयार करता आणि स्थिरतेला प्राधान्य देता. तुमची यात्रा व्यवस्था स्थापित करण्याची आणि दीर्घकालीन उद्दिष्टे योजनेने साध्य करण्याची आहे.',
          traits: ['रचनीय', 'प्रामाणिक', 'पद्धतशीर', 'वाटेवर आधारलेला', 'मेहनती']
        },
        5: {
          archetype: 'शोधक / मुक्त आत्मा',
          description: 'तुम्हाला स्वातंत्र्य, साहस, वैविध्य, आणि बदलाला स्वीकारण्याची आवड आहे. तुम्ही प्रत्यक्ष अनुभवातून शिकता आणि विविध लोकांना भेटायला आवडते. तुमची यात्रा शिस्तीच्या माध्यमातून स्वातंत्र्य शोधण्याची आहे.',
          traits: ['अनुकूलनीय', 'साहसी', 'जिज्ञासू', 'प्रगतिशील', 'गतिशील']
        },
        6: {
          archetype: 'पोषक / काळजीवाहक',
          description: 'तुमच्यात जबाबदारी, प्रेम, आणि सहानुभूतीची खोल भावना आहे. तुम्ही कुटुंब, घर, आणि समुदाय सेवेसाठी समर्पित आहात. तुमची यात्रा दुसऱ्यांच्या सहाय्यातून स्वतःची काळजी घेण्याचा संतुलन शोधण्याची आहे.',
          traits: ['दयाळू', 'जबाबदार', 'प्रेमळ', 'सुरक्षात्मक', 'सौम्य']
        },
        7: {
          archetype: 'शोधक / विश्लेषक',
          description: 'तुम्ही अंतर्मुख, विश्लेषणात्मक, आणि आध्यात्मिक किंवा खोल वैज्ञानिक सत्यांकडे आकर्षित आहात. तुम्ही समज शोधता आणि एकांताला महत्त्व देता. तुमची यात्रा तुमच्या अंतर्ज्ञानावर विश्वास ठेवण्याची आणि बुद्धी मिळविण्याची आहे.',
          traits: ['विश्लेषणात्मक', 'आंतरिक', 'आध्यात्मिक', 'आरक्षित', 'ज्ञानवान']
        },
        8: {
          archetype: 'सिद्धकर्ता / सामर्थ्यशाली',
          description: 'तुमच्याकडे असाधारण महत्वाकांक्षा, कार्यक्षमता, आणि भौतिक व व्यावसायिक यश मिळविण्याचा आग्रह आहे. तुम्ही शक्तीच्या गतिशीलतेला समजता. तुमची यात्रा भौतिक प्राप्ती आणि आध्यात्मिक प्रामाणिकतेमध्ये संतुलन साधण्याची आहे.',
          traits: ['लक्ष्य-उन्मुख', 'संगठित', 'कुशल', 'दृढ इच्छाशक्ती', 'व्यावहारिक']
        },
        9: {
          archetype: 'मानवतावादी / तत्वज्ञ',
          description: 'तुम्ही खोलवर सहानुभूतिपूर्ण, सर्जनशील, आणि जागतिक उपचार व धर्मादृष्टीने प्रेरित आहात. तुमच्याकडे एक व्यापक जग दर्शन आहे. तुमची यात्रा असंगठन शिकण्याची, क्षमा करण्याची, आणि मानवतेची सेवा करण्याची आहे.',
          traits: ['उदार', 'दयाळू', 'कलात्मक', 'आदर्शवादी', 'वैश्विक']
        },
        11: {
          archetype: 'अंतर्ज्ञ मार्गदर्शक (मास्टर नंबर)',
          description: 'तुम्ही संख्या 1 च्या ऊर्जा चे दुहेरी भाग संख्या 2 च्या संवेदनशीलतेसोबत आणता. तुम्ही एक आध्यात्मिक संदेशवाहक आहात. तुमची यात्रा घाई कमी करण्याची आणि तुमच्या अंतर्दृष्टीने इतरांना प्रेरित करण्याची आहे.',
          traits: ['प्रेरणादायी', 'अत्यंत अंतर्ज्ञ', 'आदर्शवादी', 'दूरदर्शी', 'सहानुभूतिपूर्ण']
        },
        22: {
          archetype: 'मास्टर बिल्डर (मास्टर नंबर)',
          description: 'तुमच्याकडे 4 ची व्यावहारिक क्षमता आणि 11 ची दूरदर्शी प्रेरणा आहे. तुम्ही मोठ्या कल्पनांना भौतिक वास्तवात रूपांतरित करू शकता. तुमची यात्रा दीर्घकालीन मूल्यनिर्मिती करण्याची आहे.',
          traits: ['दूरदर्शी', 'व्यवहार्य', 'संगठित', 'सशक्त', 'निर्माणशील']
        },
        33: {
          archetype: 'मास्टर शिक्षक (मास्टर नंबर)',
          description: 'तुम्ही निःस्वार्थ प्रेम आणि आध्यात्मिक सेवेचा सर्वोच्च रूप दर्शवतो. तुम्ही मानवतेची चेतना उंच करण्यासाठी समर्पित आहात. तुमची यात्रा करुणेने नेतृत्व करण्याची आहे.',
          traits: ['निःस्वार्थ', 'दयाळू', 'समर्पित', 'ज्ञानी', 'उपचारात्मक']
        }
      }
    },
    testimonials: {
      sectionSubtitle: 'वापरकर्त्यांच्या कथा',
      sectionTitle: 'खऱ्या कथा. खऱ्या अंतर्दृष्टी.',
      sectionDescription: 'हजारो वापरकर्त्यांमध्ये सामील व्हा ज्यांनी Numero Shastra बरोबर स्पष्टता, समन्वय आणि दिशा अनुभवली आहे.',
      ctaHeading: 'तुमचा जीवन प्रवास रूपांतर करा',
      ctaText: 'आमच्या वाढत्या समुदायात सामील व्हा आणि आज तुमच्या मोबाईल डिव्हाइसमध्ये Numero Shastra डाउनलोड करा.',
      testimonials: [
        {
          quote: 'माझ्या हरवलेल्या संख्या साठी उपाय अनुसरण करणे इतके सोपे होते आणि प्रत्यक्षात माझ्या लक्ष केंद्रितीत फरक झाला.',
          author: 'ओमकार सुतार',
          role: 'प्रमाणित अ‍ॅप वापरकर्ता'
        },
        {
          quote: 'ओरेकल आवाज खूप वैयक्तिक वाटते. हे ध्यान आणि विश्लेषण यांचे संयोजन आहे.',
          author: 'प्रिया शर्मा',
          role: 'आध्यात्मिक अभ्यासक'
        },
        {
          quote: 'मला शेवटी समजले की काही वर्षे इतक्या आव्हानात्मक का होत्या, शिखर विश्लेषणामुळे.',
          author: 'अमित वर्मा',
          role: 'उद्योजक'
        }
      ]
    },
    support: {
      sectionSubtitle: 'सहाय्य केंद्र',
      sectionTitle: 'आम्ही तुमची मदत करण्यासाठी आहोत',
      sectionDescription: 'तुमच्या अंकशास्त्र विश्लेषणाबद्दल, तुमच्या ग्रिड गणनेबद्दल, किंवा अ‍ॅपसह तांत्रिक सहाय्याबद्दल प्रश्न आहेत का? आमच्या टीमशी संपर्क साधा.',
      formHeading: 'आम्हाला एक संदेश पाठवा',
      nameLabel: 'तुमचे नाव',
      namePlaceholder: 'तुमचे पूर्ण नाव प्रविष्ट करा',
      emailLabel: 'ईमेल पत्ता',
      emailPlaceholder: 'name@example.com',
      messageLabel: 'आम्ही तुम्हाला कशी मदत करू?',
      messagePlaceholder: 'तुमचा संदेश येथे लिहा...',
      submitButton: 'संदेश पाठवा',
      submitSuccess: 'संदेश यशस्वीरित्या पाठवला गेला! आम्ही लवकरच तुम्हाला प्रतिसाद देऊ.',
      directContactHeading: 'प्रत्यक्ष संपर्क',
      supportEmailHeading: 'सपोर्ट ईमेल',
      legalHeading: 'कायदेशीर व धोरणे',
      privacyPolicy: 'गोपनीयता धोरण',
      termsOfService: 'सेवा अटी',
      faqHeading: 'वारंवार विचारले जाणारे प्रश्न',
      faqs: [
        {
          question: 'लो शू ग्रिड गणना किती अचूक आहे?',
          answer: 'गणना 100% गणितीदृष्ट्या बरोबर आहेत आणि फक्त पारंपरिक चिनी जादूच्या चौकोन आणि वैदिक अंकशास्त्र प्रणालींवर आधारित आहेत. व्याख्येची अचूकता पूर्णपणे बरोबर जन्मतारीख प्रविष्ट करण्यावर अवलंबून आहे.'
        },
        {
          question: 'अ‍ॅप कोणत्या भाषांमध्ये उपलब्ध आहे?',
          answer: 'Numero Shastra इंग्रजी, हिंदी आणि मराठीत पूर्ण बहुभाषिक अनुभव प्रदान करते, ज्यात अनोखी ओरेकल व्हॉइस वाचन समाविष्ट आहे.'
        },
        {
          question: 'ओरेकल ऑडिओ मार्गदर्शक कसा कार्य करतो?',
          answer: 'एकदा तुमचा अहवाल गणना झाला की तुम्ही प्ले आयकॉनवर टॅप करू शकता. ओरेकल तुमचा डेटा संश्लेषित करते आणि प्रत्येक विभाग वाचतो, ज्यामुळे हे एक पूर्णत: हँड्स-फ्री शिकण्याचा अनुभव बनतो.'
        }
      ]
    }
  }
};

function lookupTranslation(locale: any, key: string): string {
  const parts = key.split('.');
  let value: any = locale;

  for (const part of parts) {
    value = value?.[part];
    if (value === undefined || value === null) {
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

function getStoredLanguage(): LanguageCode | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(storageKey) as LanguageCode | null;
  if (value === 'en' || value === 'hi' || value === 'mr') {
    return value;
  }
  return null;
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly storedLanguage = getStoredLanguage();
  readonly language = signal<LanguageCode>(this.storedLanguage ?? defaultLanguage);
  readonly storedLanguageExists = signal<boolean>(this.storedLanguage !== null);
  readonly locale = computed(() => translations[this.language()]);

  setLanguage(value: LanguageCode) {
    this.language.set(value);
    this.storedLanguageExists.set(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, value);
    }
  }

  t(key: string): string {
    return lookupTranslation(this.locale(), key);
  }
}
