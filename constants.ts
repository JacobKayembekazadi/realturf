
import { Product, RealTechFeature, Dealer, KnowledgeArticle } from './types';

export const landscapeProducts: Product[] = [
  { name: 'Absolute', category: 'Landscape', description: 'Premium 2" pile turf for high-end commercial and residential projects.', image: 'https://realturf.com/us/wp-content/uploads/2025/09/Absolute-artificial-turf-01-1.jpg', pileHeight: '2"', faceWeight: '107 oz/yd²', fiber: 'C & Diamond', apps: ['Commercial', 'Rooftop', 'Pool', 'Patio', 'Yard'], features: ['Look & Feel', 'MaxDrain', 'LongLife', 'SoftMax', 'MaxRecover', 'FiberFresh', 'PetFriendly', 'KidsProof', 'BacteriaFree', 'FireProof'] },
  { name: 'All Seasons', category: 'Landscape', description: 'A durable, eco-friendly option with a natural appearance.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/AllSeasons_Standard.jpg', pileHeight: '1.56"', faceWeight: '87 oz/yd²', fiber: 'Wave + D + S', apps: ['Commercial', 'Rooftop', 'Patio', 'Yard'], features: ['LongLife', 'BodyShape', 'FiberFresh', 'PetFriendly', 'KidsProof', 'BacteriaFree', 'FireProof'] },
  { name: 'Altitude', category: 'Landscape', description: 'High-end residential turf with excellent recovery and softness.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/Altitude-artificial-turf-01-1.jpg', pileHeight: '1.75"', faceWeight: '107 oz/yd²', fiber: 'Wave + D + S', apps: ['Commercial', 'Yard'], features: ['Look & Feel', 'LongLife', 'BodyShape', 'SoftMax', 'MaxRecover', 'FiberFresh', 'PetFriendly', 'KidsProof', 'BacteriaFree', 'FireProof'] },
  { name: 'Comfort', category: 'Landscape', description: 'Exceptionally soft turf, perfect for areas with kids and pets.', image: 'https://realturf.com/us/wp-content/uploads/2025/09/Comfort-artificial-turf-01.jpg', pileHeight: '1.375"', faceWeight: '117 oz/yd²', fiber: 'Diamond', apps: ['Commercial', 'Rooftop', 'Play', 'Pet', 'Pool', 'Yard'], features: ['Look & Feel', 'LongLife', 'SoftMax', 'FiberFresh', 'PetFriendly', 'KidsProof', 'BacteriaFree', 'FireProof'] },
  { name: 'Deluxe', category: 'Landscape', description: 'A mid-tier premium turf offering a great look and feel.', image: 'https://realturf.com/us/wp-content/uploads/2025/09/Deluxe-artificial-turf-01.jpg', pileHeight: '1.56"', faceWeight: '97 oz/yd²', fiber: 'Wave', apps: ['Commercial', 'Rooftop', 'Play', 'Pet', 'Pool', 'Yard'], features: ['Look & Feel', 'LongLife', 'BodyShape', 'SoftMax', 'FiberFresh', 'PetFriendly', 'KidsProof', 'BacteriaFree', 'FireProof'] },
  { name: 'ECO C', category: 'Landscape', description: 'A sustainable and durable eco-friendly turf option.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/EcoC-01-scaled-1.jpg', pileHeight: '1.25"', faceWeight: '102 oz/yd²', fiber: 'C + Flat', apps: ['Commercial', 'Pet', 'Pool', 'Patio', 'Yard'], features: ['Look & Feel', 'LongLife', 'BodyShape', 'SoftMax', 'FiberFresh', 'PetFriendly', 'KidsProof', 'BacteriaFree', 'FireProof'] },
  { name: 'ECO D', category: 'Landscape', description: 'Eco-friendly turf with great fiber recovery for high-traffic areas.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/EcoD-01-scaled-1.jpg', pileHeight: '1.56"', faceWeight: '82 oz/yd²', fiber: 'Stem', apps: ['Commercial', 'Play', 'Pet', 'Pool', 'Yard'], features: ['Look & Feel', 'LongLife', 'SoftMax', 'MaxRecover', 'FiberFresh', 'PetFriendly', 'KidsProof', 'BacteriaFree', 'FireProof'] },
  { name: 'ECO H', category: 'Landscape', description: 'A premium eco-friendly product with superior drainage.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/EcoH-01-scaled-1.jpg', pileHeight: '1.75"', faceWeight: '117 oz/yd²', fiber: 'Omega', apps: ['Commercial', 'Pet', 'Yard'], features: ['Look & Feel', 'MaxDrain', 'LongLife', 'SoftMax', 'MaxRecover', 'FiberFresh', 'PetFriendly', 'KidsProof', 'BacteriaFree', 'FireProof'] },
  { name: 'ECO P', category: 'Landscape', description: 'An eco-friendly choice specifically designed for pet areas.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/Eco-P-Product-Photo.jpg', pileHeight: '1"', faceWeight: '82 oz/yd²', fiber: 'C + Flat', apps: ['Commercial', 'Pet', 'Yard'], features: ['MaxDrain', 'LongLife', 'BodyShape', 'MaxRecover', 'FiberFresh', 'PetFriendly', 'KidsProof', 'BacteriaFree', 'FireProof'] },
  { name: 'Elite', category: 'Landscape', description: 'Professional-grade landscape turf with excellent drainage and recovery.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/Elite-Product-Photo.jpg', pileHeight: '1.5"', faceWeight: '83 oz/yd²', fiber: 'Wave', apps: ['Commercial', 'Rooftop', 'Patio', 'Yard'], features: ['Look & Feel', 'MaxDrain', 'LongLife', 'MaxRecover', 'FiberFresh', 'PetFriendly', 'KidsProof', 'BacteriaFree', 'FireProof'] },
];

export const sportsProducts: Product[] = [
  { name: 'Golf Putt', category: 'Sports', description: 'Professional-grade putting greens for a realistic ball roll.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/Golf-Putt-Pro-Product-Photo.jpg', features: ['LongLife', 'MaxRecover'], apps: ['Putting Greens'] },
  { name: 'Natural Putt', category: 'Sports', description: 'Ideal surface for practice greens and recreational golf areas.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/Natural-Putt-Product-Photo.jpg', features: ['LongLife', 'BodyShape'], apps: ['Practice Greens'] },
  { name: 'Golf Pro', category: 'Sports', description: 'Top-tier putting green surface for professional-level play.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/Golf-Putt-Pro-Product-Photo.jpg', features: ['LongLife', 'MaxRecover', 'SoftMax'], apps: ['Professional Putting'] },
  { name: 'Soccer Turf', category: 'Sports', description: 'FIFA certified turf designed for the high demands of soccer.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/Soccer-Pro-Product-Photo.jpg', features: ['LongLife', 'MaxRecover', 'SoftLand'], apps: ['Soccer'] },
  { name: 'Football Turf', category: 'Sports', description: 'Professional-grade turf built to withstand American football.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/Football-Pro-Product-Photo.jpg', features: ['LongLife', 'MaxRecover', 'SoftLand', 'FireProof'], apps: ['Football'] },
  { name: 'Baseball Turf', category: 'Sports', description: 'Durable and versatile turf for training facilities and fields.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/Baseball-Pro-Product-Photo.jpg', features: ['LongLife', 'MaxRecover'], apps: ['Training Facilities'] },
  { name: 'Gym Turf', category: 'Sports', description: 'High-performance turf for fitness applications and gyms.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/Gym-Turf-Product-Photo.jpg', features: ['SoftLand', 'MaxRecover', 'LongLife'], apps: ['Fitness Applications'] },
  { name: 'Padel/Tennis Turf', category: 'Sports', description: 'Specialized court surfaces for optimal ball bounce and play.', image: 'https://realturf.com/us/wp-content/uploads/2025/10/Padel-Pro-Product-Photo.jpg', features: ['LongLife', 'MaxRecover'], apps: ['Court Surfaces'] },
  { name: 'Multisport Blue', category: 'Sports', description: 'Vibrant blue multi-use court surface for various sports.', image: 'https://picsum.photos/seed/multisport/400/300', features: ['LongLife', 'BodyShape'], apps: ['Multi-use Courts'] },
];

export const allProducts: Product[] = [...landscapeProducts, ...sportsProducts];

export const realTechFeatures: RealTechFeature[] = [
  { name: 'MaxDrain', description: 'Superior drainage (up to 1200+ inches/hour).' },
  { name: 'PetFriendly', description: 'Antimicrobial protection and odor control for pet-friendly areas.' },
  { name: 'SoftMax', description: 'Enhanced comfort and safety underfoot.' },
  { name: 'LongLife', description: '15+ year durability for long-lasting beauty.' },
  { name: 'BodyShape', description: 'Natural grass appearance with varied fiber heights.' },
  { name: 'MaxRecover', description: 'Quick fiber bounce-back from foot traffic.' },
  { name: 'FiberFresh', description: 'Odor control technology.' },
  { name: 'KidsProof', description: 'Child-safe, lead-free materials.' },
  { name: 'SoftLand', description: 'Impact absorption for fall safety.' },
  { name: 'BacteriaFree', description: 'Antimicrobial coating to inhibit bacterial growth.' },
  { name: 'FireProof', description: 'Fire-resistant materials for added safety.' }
];

export const dealers: Dealer[] = [
  { name: 'Houston, TX (HQ)', type: 'Physical Center', address: '123 Main St, Houston, TX 77002' },
  { name: 'Dallas, TX', type: 'Physical Center', address: '456 Commerce St, Dallas, TX 75201' },
  { name: 'Las Vegas, NV', type: 'Physical Center', address: '789 Strip Blvd, Las Vegas, NV 89101' },
  { name: 'West Palm Beach, FL', type: 'Physical Center', address: '321 Ocean Ave, West Palm Beach, FL 33401' },
  { name: 'San Jose, CA', type: 'Partner Center' },
  { name: 'Colorado Springs, CO', type: 'Partner Center' },
  { name: 'Toms River, NJ', type: 'Partner Center' },
  { name: 'Charlotte, NC (Cornelius)', type: 'Partner Center' },
  { name: 'Charleston, SC', type: 'Partner Center' },
  { name: 'Austin, TX', type: 'Partner Center' },
  { name: 'McAllen, TX', type: 'Partner Center' },
  { name: 'Midland/Odessa, TX', type: 'Partner Center' },
  { name: 'San Antonio, TX', type: 'Partner Center' },
  { name: 'Seattle, WA', type: 'Partner Center' }
];

export const knowledgeBase: KnowledgeArticle[] = [
    {
        title: "Installation Guides",
        content: [
            "**Installing on Soil:** Remove 3-4\" vegetation, install compacted sub-base (crushed rock 90%+ compaction), geotextile fabric, lay turf, seam with adhesive tape, secure edges with landscape staples, spread infill, power broom.",
            "**Installing on Concrete/Tiles:** Clean surface, apply turf adhesive, roll out turf, press firmly, seam with adhesive (not tape), trim edges, minimal infill.",
            "**Tools Required:** Power broom, seaming iron, turf cutter, 100lb roller, infill spreader, landscape staples, utility knife, measuring tape."
        ]
    },
    {
        title: "Maintenance",
        content: [
            "**Weekly:** Remove debris, rinse with hose.",
            "**Monthly:** Power broom to lift fibers, redistribute infill.",
            "**Quarterly:** Deep clean, check drainage, inspect seams.",
            "**Annually:** Professional maintenance recommended.",
            "**Pet Areas:** Enzyme cleaner weekly, more frequent rinsing."
        ]
    },
    {
        title: "Common Issues & Solutions",
        content: [
            "**Poor Drainage:** Check sub-base compaction (90%+), ensure 2-3% slope, verify perforation holes clear.",
            "**Visible Seams:** Use 6-8\" seaming tape, apply adhesive at 60-80°F, ensure same fiber direction, use seaming iron.",
            "**Matting:** Power broom monthly, redistribute infill, check infill depth (1.5-2\").",
            "**Pet Odors:** Rinse weekly, enzyme cleaners, proper drainage, consider ZeoFill infill."
        ]
    },
    {
        title: "Applications",
        content: [
            "**Residential:** Yards, patios, pool areas, pet areas, play areas, rooftops.",
            "**Commercial:** Hotels, restaurants, offices, retail, apartments.",
            "**Sports:** Golf greens, gyms, baseball, soccer, football, tennis/padel courts."
        ]
    }
];

const knowledgeBaseText = `
LANDSCAPE PRODUCTS:
${landscapeProducts.map(p => `- ${p.name}: ${p.pileHeight} pile, ${p.faceWeight}, ${p.fiber} fiber. ${p.description} Used for: ${p.apps?.join(', ')}. Features: ${p.features.join(', ')}.`).join('\n')}

SPORTS PRODUCTS:
${sportsProducts.map(p => `- ${p.name}: ${p.description} Used for: ${p.apps?.join(', ')}. Features: ${p.features.join(', ')}.`).join('\n')}

REALTECH FEATURES:
${realTechFeatures.map(f => `- ${f.name}: ${f.description}`).join('\n')}

DEALERS:
Physical Centers: ${dealers.filter(d=>d.type === 'Physical Center').map(d => `${d.name} at ${d.address}`).join('; ')}.
Partner Centers: ${dealers.filter(d=>d.type === 'Partner Center').map(d => d.name).join(', ')}.

KNOWLEDGE BASE:
${knowledgeBase.map(a => `
Topic: ${a.title}
${a.content.join('\n')}
`).join('')}
`;

export const KNOWLEDGE_BASE_CONTEXT = knowledgeBaseText;
