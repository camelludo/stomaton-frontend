// Mock data for Content Service responses
export const mockContentGeneration = {
  status: "success",
  content: {
    name: "Rainbow Moonstone",
    research_data: {
      mineralogy: "Feldspar mineral with adularescence optical phenomenon",
      formation: "Igneous and metamorphic environments",
      locations: ["Sri Lanka", "India", "Madagascar", "Myanmar"]
    },
    wiki_content: `# Rainbow Moonstone

Rainbow Moonstone is a captivating gemstone that belongs to the feldspar family, specifically the plagioclase group. This enchanting stone is renowned for its adularescence—a mesmerizing optical phenomenon that creates a billowy, light-colored sheen reminiscent of moonlight dancing across its surface.

## Physical Properties

- **Hardness**: 6-6.5 on the Mohs scale
- **Crystal System**: Triclinic
- **Chemical Composition**: (Na,Ca)(Al,Si)₄O₈
- **Specific Gravity**: 2.56-2.62
- **Refractive Index**: 1.518-1.526

## Optical Phenomena

The most distinctive feature of Rainbow Moonstone is its adularescence, which manifests as:
- Blue flash (most common and prized)
- White to cream-colored body
- Occasional rainbow flashes in exceptional specimens
- Cat's eye effect in some cabochons

## Geological Formation

Rainbow Moonstone forms in:
- Igneous rocks (particularly in pegmatites)
- Metamorphic environments
- Alluvial deposits (weathered from primary sources)

## Major Sources

- **Sri Lanka**: Primary source of high-quality specimens
- **India**: Significant commercial quantities
- **Madagascar**: Growing source of fine material
- **Myanmar**: Historical source

## Metaphysical Properties

Traditionally associated with:
- Intuition and emotional balance
- New beginnings and cycles
- Protection during travel
- Enhanced creativity and inspiration

## Market and Valuation

Quality factors affecting value:
- Intensity and color of adularescence
- Transparency of the body
- Size and cut quality
- Origin (Sri Lankan stones often command premium)

## Care and Maintenance

- Clean with mild soap and water
- Avoid ultrasonic cleaners
- Store separately to prevent scratching
- Protect from sharp impacts`,
    generated_at: "2025-07-08T10:30:00Z",
    categories: {
      type: "feldspar",
      phenomenon: "adularescence",
      hardness: "medium",
      rarity: "uncommon"
    },
    cross_links: ["Blue Moonstone", "Labradorite", "Sunstone"]
  },
  stone_id: "rainbow-moonstone-001",
  cost: {
    total: 1.44,
    breakdown: {
      research: 0.80,
      generation: 0.44,
      processing: 0.20
    }
  },
  processing_time: 2.5
};

export const mockSocialContent = {
  status: "success",
  stone_id: "rainbow-moonstone-001",
  content: {
    tweet_thread: [
      "🌙✨ Rainbow Moonstone Thread: One of the most mystical gemstones on Earth! Let's dive into this fascinating feldspar... 1/7",
      "💎 What makes it special? ADULARESCENCE! This optical phenomenon creates that dreamy, billowy light effect that seems to float just beneath the surface. It's like capturing moonlight in stone! 2/7",
      "🔬 Science bit: Rainbow Moonstone is actually a plagioclase feldspar, not orthoclase like 'true' moonstone. The blue flash comes from light scattering between microscopic layers in the crystal structure. 3/7",
      "🌍 Geography: The finest specimens come from Sri Lanka, where they've been treasured for over 2,000 years. India, Madagascar, and Myanmar also produce beautiful material. 4/7",
      "💰 Investment angle: High-quality pieces with strong blue flash are becoming increasingly rare. Prices have risen 40% in the past 5 years for top-grade material. 5/7",
      "⚡ Fun fact: Ancient Romans believed moonstone was formed from frozen moonbeams. While we know better now, that ethereal glow still captures our imagination! 6/7",
      "🛒 Buying tip: Look for strong adularescence that moves across the stone when you tilt it. Avoid pieces with cracks or chips - moonstone cleaves easily! What's your favorite moonstone variety? 7/7"
    ],
    instagram_caption: "🌙✨ RAINBOW MOONSTONE MAGIC ✨🌙\n\nSwipe to see this incredible feldspar gemstone that literally captures moonlight! 💎 The blue flash dancing across its surface is called adularescence - nature's own light show.\n\n📍 This beauty is from Sri Lanka, where the world's finest moonstones have been mined for millennia. The ancient Romans thought these stones were made of frozen moonbeams... honestly, can you blame them? 🌕\n\n💡 DID YOU KNOW: That mesmerizing glow comes from light bouncing between microscopic layers in the crystal structure. It's like having a tiny aurora trapped in stone!\n\n#RainbowMoonstone #Gemstones #Crystals #Mineralogy #SriLankanGems #Adularescence #NaturalBeauty #GemCollection #CrystalLovers #GemsOfInstagram #Moonstone #FeldspiarMinerals"
  },
  generated_at: "2025-07-08T10:35:00Z"
};

export const mockFAQContent = {
  status: "success", 
  stone_id: "rainbow-moonstone-001",
  content: {
    faqs: [
      {
        id: "faq-001",
        question: "What's the difference between Rainbow Moonstone and regular Moonstone?",
        answer: "Rainbow Moonstone is actually a type of labradorite (plagioclase feldspar), while traditional moonstone is orthoclase feldspar. Rainbow moonstone typically displays blue flashes and occasional rainbow colors, whereas traditional moonstone shows a white to cream adularescence. Both exhibit the same optical phenomenon but from different mineral families.",
        category: "identification"
      },
      {
        id: "faq-002", 
        question: "How can I tell if my Rainbow Moonstone is genuine?",
        answer: "Genuine Rainbow Moonstone will display adularescence that moves across the surface when tilted. The blue flash should appear to float just beneath the surface. Fake versions often use glass with a coating that looks more like a surface reflection rather than internal phenomenon. Also, real moonstone has a hardness of 6-6.5, so it won't scratch easily with a metal knife.",
        category: "authentication"
      },
      {
        id: "faq-003",
        question: "Why are Sri Lankan Rainbow Moonstones more expensive?",
        answer: "Sri Lankan Rainbow Moonstones are considered the finest quality due to their exceptional clarity, strong blue adularescence, and minimal inclusions. The geological conditions in Sri Lanka produce stones with superior optical properties. Additionally, Sri Lanka has a 2,000-year history of moonstone mining, establishing a reputation for premium material that commands higher prices in the market.",
        category: "valuation"
      },
      {
        id: "faq-004",
        question: "How should I care for my Rainbow Moonstone jewelry?",
        answer: "Rainbow Moonstone requires gentle care due to its perfect cleavage planes. Clean with mild soap and lukewarm water using a soft brush. Avoid ultrasonic cleaners, steamers, and harsh chemicals. Store separately from harder gemstones to prevent scratching. Remove jewelry before sports, household chores, or activities that might cause impact.",
        category: "care"
      },
      {
        id: "faq-005",
        question: "What makes Rainbow Moonstone flash blue?",
        answer: "The blue flash is caused by adularescence, an optical phenomenon resulting from light scattering between microscopic layers of albite and orthoclase within the crystal structure. When light enters the stone, it reflects off these internal layers at different angles, creating the characteristic blue sheen that appears to move across the surface.",
        category: "science"
      }
    ]
  },
  generated_at: "2025-07-08T10:40:00Z"
};

export const mockRAGDocuments = [
  {
    document_id: "doc-001",
    file_name: "rainbow_moonstone_research.pdf",
    status: "indexed",
    uploaded_at: "2025-07-07T14:30:00Z",
    size_mb: 2.4,
    type: "pdf"
  },
  {
    document_id: "doc-002", 
    file_name: "feldspar_mineralogy_guide.docx",
    status: "processing",
    uploaded_at: "2025-07-08T09:15:00Z",
    size_mb: 1.8,
    type: "docx"
  },
  {
    document_id: "doc-003",
    file_name: "sri_lanka_gem_deposits.txt",
    status: "indexed",
    uploaded_at: "2025-07-06T16:20:00Z", 
    size_mb: 0.3,
    type: "txt"
  },
  {
    document_id: "doc-004",
    file_name: "moonstone_market_analysis.pdf",
    status: "failed",
    uploaded_at: "2025-07-08T08:45:00Z",
    size_mb: 5.2,
    type: "pdf"
  }
];

export const mockKnowledgeGaps = [
  {
    id: "gap-001",
    stone_name: "Paraiba Tourmaline",
    gap_type: "missing_content",
    priority: "high",
    source: "failed_search",
    identified_at: "2025-07-08T09:30:00Z",
    frequency: 15,
    description: "Multiple users searching for Paraiba Tourmaline information with no results"
  },
  {
    id: "gap-002",
    stone_name: "Bixbite",
    gap_type: "incomplete_data",
    priority: "medium", 
    source: "whatsapp",
    identified_at: "2025-07-07T16:45:00Z",
    frequency: 8,
    description: "WhatsApp bot receiving questions about Bixbite pricing and availability"
  },
  {
    id: "gap-003",
    stone_name: "Jeremejevite",
    gap_type: "missing_content",
    priority: "low",
    source: "telegram",
    identified_at: "2025-07-06T11:20:00Z",
    frequency: 3,
    description: "Telegram users asking about rare gemstone Jeremejevite"
  },
  {
    id: "gap-004",
    stone_name: "Painite",
    gap_type: "outdated_info",
    priority: "high",
    source: "failed_search",
    identified_at: "2025-07-08T07:15:00Z",
    frequency: 12,
    description: "Search queries returning outdated Painite information from 2018"
  },
  {
    id: "gap-005",
    stone_name: "Taaffeite",
    gap_type: "missing_content",
    priority: "medium",
    source: "whatsapp",
    identified_at: "2025-07-07T13:30:00Z",
    frequency: 6,
    description: "WhatsApp queries about Taaffeite identification and properties"
  }
];