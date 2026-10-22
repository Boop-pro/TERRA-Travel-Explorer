import { Destination } from '@/types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'Sun-drenched coasts and Portuguese colonial soul',
    category: 'Beaches',
    description:
      'Beyond the lively sands, Goa reveals a tapestry of slow-paced susegad living, 17th-century baroque churches, spice plantations, and golden coves framed by swaying palms and azure Arabian waters.',
    longDescription:
      'Goa exists in a cadence of its own. Rooted in four centuries of Portuguese influence and Konkani coastal traditions, this coastal sanctuary offers both serene introspection and spirited celebration. In the south, quiet crescent bays like Palolem and Agonda shelter travelers in wooden eco-cottages nestled beneath leaning coconut palms. Inland, historic Velha Goa preserves magnificent UNESCO-listed baroque basilicas, while fragrant spice farms in Ponda offer culinary journeys through coconut curries, kokum infusions, and ancestral fenny distilling. Goa is an invitation to slow down, breathe the ocean salt, and savor the art of leisure.',
    bestTimeToVisit: 'November to February (Pleasant 22°C - 30°C)',
    heroImageUrl:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      latitude: 15.2993,
      longitude: 74.124,
    },
    budget: 'Moderate',
    duration: '1 Week',
    idealFor: ['Coastal Walks', 'Portuguese Architecture', 'Seafood Gastronomy', 'Sunset Sailing'],
    highlights: ['UNESCO Baroque Cathedrals', 'Crescent Sand Bays', 'Susegad Coastal Rhythm'],
    attractions: [
      {
        id: 'goa-palolem',
        name: 'Palolem Beach',
        description:
          'A gentle crescent-shaped bay fringed by leaning palms and tranquil waters, ideal for kayaking and spotting dolphins at sunrise.',
        imageUrl:
          'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'goa-bom-jesus',
        name: 'Basilica of Bom Jesus',
        description:
          'A landmark UNESCO World Heritage site completed in 1605, holding the sacred mortal remains of St. Francis Xavier in Old Goa.',
        imageUrl:
          'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'goa-dudhsagar',
        name: 'Dudhsagar Falls',
        description:
          'A dramatic four-tiered cascade resembling a sea of milk plunging 310 meters down the verdant Western Ghats cliffs.',
        imageUrl:
          'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'andaman-islands',
    name: 'Andaman Islands',
    state: 'Andaman & Nicobar Islands',
    tagline: 'Pristine emerald waters and untouched coral archipelagos',
    category: 'Beaches',
    description:
      'An untouched maritime paradise nestled in the Bay of Bengal, where azure waters lap against powdery white shores, dense mangrove canopies shelter endemic birds, and vibrant coral reefs thrive in crystalline depths.',
    longDescription:
      'Scattered across the turquoise expanse of the Andaman Sea, this archipelago of over 300 islands represents one of the worlds most secluded tropical sanctuaries. Havelock Island (Swaraj Dweep) is home to Radhanagar Beach, consistently ranked among Asia’s finest for its dramatic mahogany tree-lined shore and fiery sunsets. Beneath the surface, the marine national parks boast kaleidoscope coral gardens frequented by sea turtles, manta rays, and dugongs. Historic Port Blair provides profound depth through the solemn brick galleries of Cellular Jail, reminding travelers of the resilient spirit of India’s independence movement.',
    bestTimeToVisit: 'October to May (Dry maritime breeze & calm seas)',
    heroImageUrl:
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1400&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      latitude: 11.7401,
      longitude: 92.6586,
    },
    budget: 'Luxury',
    duration: '1 Week',
    idealFor: ['Scuba Diving', 'Bioluminescent Kayaking', 'Island Hopping', 'Pristine Solitude'],
    highlights: ['Radhanagar Sunset Shore', 'Living Coral Reefs', 'Historic Port Blair'],
    attractions: [
      {
        id: 'andaman-radhanagar',
        name: 'Radhanagar Beach',
        description:
          'Famed for velvety white sands and crystal-clear turquoise waters framed by ancient tropical forest reserves on Havelock Island.',
        imageUrl:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'andaman-cellular-jail',
        name: 'Cellular Jail Memorial',
        description:
          'The historic national memorial in Port Blair, honoring freedom fighters who endured the colonial penal settlement.',
        imageUrl:
          'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'andaman-elephant-beach',
        name: 'Elephant Beach Reef',
        description:
          'A vivid shallow reef sanctuary celebrated for vibrant parrotfish, sea anemones, and glass-bottom boating adventures.',
        imageUrl:
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'gokarna',
    name: 'Gokarna',
    state: 'Karnataka',
    tagline: 'Sacred coastlines, cliff trails, and tranquil sands',
    category: 'Beaches',
    description:
      'Where ancient temple bells blend with the rhythmic crash of the Arabian Sea. Gokarna is an authentic sanctuary of rugged coastal bluffs, sacred pilgrim ponds, and secluded crescent beaches connected by hiking paths.',
    longDescription:
      'Nestled on the northern Karnataka coastline, Gokarna balances two timeless worlds: a venerable Hindu pilgrimage town consecrated to Lord Shiva, and an untamed string of five secluded beaches carved between granite headlands. Pilgrims begin their dawn rituals at the ancient Mahabaleshwar Temple before bathing at the sacred Kotitirtha tank. Hikers and contemplative wanderers follow red-earth cliff paths linking Gokarna Beach to Kudle, Om Beach, Half Moon Beach, and the pristine Paradise Beach, where the ocean remains wild, free, and uncluttered.',
    bestTimeToVisit: 'October to March (Crisp ocean breeze, 20°C - 28°C)',
    heroImageUrl:
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1400&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      latitude: 14.5479,
      longitude: 74.3188,
    },
    budget: 'Budget',
    duration: 'Weekend',
    idealFor: ['Cliff Trekking', 'Beach Yoga', 'Sacred Temples', 'Quiet Contemplation'],
    highlights: ['Om-Shaped Bay', 'Cliffside Hiking Trails', 'Mahabaleshwar Atmalinga'],
    attractions: [
      {
        id: 'gokarna-om-beach',
        name: 'Om Beach',
        description:
          'Naturally sculpted into the sacred Sanskrit symbol of Om, featuring natural rock pools and sunset vantage points.',
        imageUrl:
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'gokarna-mahabaleshwar',
        name: 'Mahabaleshwar Temple',
        description:
          'A revered 4th-century Dravidian granite temple housing the sacred Atmalinga consecrated by Lord Shiva.',
        imageUrl:
          'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'gokarna-kudle',
        name: 'Kudle Beach',
        description:
          'A wide, tranquil cove bounded by emerald cliffs, offering quiet bohemian cafes, gentle waves, and evening bonfires.',
        imageUrl:
          'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    tagline: 'Alpine cedar forests, roaring rivers, and snowy peaks',
    category: 'Mountains',
    description:
      'Cradled in the Kullu Valley along the Beas River, Manali offers whispering deodar groves, wooden pagoda temples, and panoramic vistas of towering snow-crested Himalayan summits.',
    longDescription:
      'Surrounded by jagged mountain peaks and fragrant deodar pinewoods, Manali is a gateway to the high Himalayas. The old quarter of Old Manali preserves traditional Himachali Kathkuni timber-and-stone architecture, apple orchards, and winding flagstone alleys filled with acoustic music. Higher up, the road snakes through Solang Valley toward the snowfields of Rohtang Pass and the modern engineering marvel of the Atal Tunnel, unlocking the surreal high-altitude landscapes of Lahaul and Spiti.',
    bestTimeToVisit: 'March to June (Blooming valleys) or Oct to Feb (Snowfall)',
    heroImageUrl:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      latitude: 32.2432,
      longitude: 77.1892,
    },
    budget: 'Moderate',
    duration: '1 Week',
    idealFor: ['Alpine Trekking', 'Apple Orchard Stays', 'River Rafting', 'Snow Sports'],
    highlights: ['Rohtang Snowfields', 'Cedar Forest Temples', 'Himalayan River Vistas'],
    attractions: [
      {
        id: 'manali-solang',
        name: 'Solang Valley',
        description:
          'A dramatic alpine bowl renowned for paragliding over summer meadows and skiing across deep winter snowdrifts.',
        imageUrl:
          'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'manali-hadimba',
        name: 'Hadimba Pagoda Temple',
        description:
          'A masterwork of 16th-century timber craftsmanship featuring carved wood tiers nestled within ancient deodar forests.',
        imageUrl:
          'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'manali-rohtang',
        name: 'Rohtang Pass (3,978m)',
        description:
          'A legendary Himalayan pass offering 360-degree vistas of jagged glaciers, mountain peaks, and the Chandra River valley.',
        imageUrl:
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'munnar',
    name: 'Munnar',
    state: 'Kerala',
    tagline: 'Endless rolling tea estates and misty Western Ghats',
    category: 'Mountains',
    description:
      'Perched at the confluence of three mountain streams, Munnar is draped in emerald carpeted tea plantations, cool mountain mist, wildlife sanctuaries, and fragrant cardamom plantations.',
    longDescription:
      'Set high in the Western Ghats mountain range at an elevation of 1,600 meters, Munnar is south India’s premier hill station. Velvet-green tea bushes roll in hypnotic waves across every ridgeline, tended by estate workers in early dawn mist. Here, the rare Neelakurinji flower blooms once every twelve years, washing hillsides in violet hues. Visitors can trek along the edge of Eravikulam National Park to witness the endangered Nilgiri Tahr against backdrop views of Anamudi—the highest peak in peninsular India.',
    bestTimeToVisit: 'September to March (Misty mornings & cool breezes 15°C - 22°C)',
    heroImageUrl:
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1400&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      latitude: 10.0889,
      longitude: 77.0595,
    },
    budget: 'Moderate',
    duration: 'Weekend',
    idealFor: ['Tea Tasting', 'Western Ghats Trekking', 'Spice Forest Walks', 'Bird Watching'],
    highlights: ['Rolling Tea Carpet Hills', 'Rare Nilgiri Tahr Habitat', 'Highest Peak in South India'],
    attractions: [
      {
        id: 'munnar-eravikulam',
        name: 'Eravikulam National Park',
        description:
          'Sanctuary protecting the endangered Nilgiri mountain goat (Tahr), sprawling across high-altitude grasslands.',
        imageUrl:
          'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'munnar-mattupetty',
        name: 'Mattupetty Lake & Dam',
        description:
          'A serene high-mountain reservoir flanked by verdant hills, renowned for birding and quiet boat safaris.',
        imageUrl:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'munnar-kolukkumalai',
        name: 'Kolukkumalai Tea Estate',
        description:
          'The world’s highest elevation organic tea garden (2,400m), producing tea leaves with an unmatched brisk aroma.',
        imageUrl:
          'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'gulmarg',
    name: 'Gulmarg',
    state: 'Jammu & Kashmir',
    tagline: 'The Meadow of Flowers and Himalayan winter crown',
    category: 'Mountains',
    description:
      'A high-altitude paradise tucked in the Pir Panjal range, Gulmarg transforms from a tapestry of wild lupines and daisies in summer into a world-class powder skiing haven beneath the Apharwat Peak.',
    longDescription:
      'Gulmarg, translating poetically to "Meadow of Flowers," is a cup-shaped highland basin nestled at 2,650 meters in Kashmir. In summer, lush rolling meadows are speckled with wild alpine blooms and grazing Kashmiri ponies under crisp blue skies. In winter, moisture-laden western disturbances blanket the Apharwat mountain ridge in some of the finest dry powder snow in the world. The legendary Gulmarg Gondola carries riders directly up to 3,980 meters, offering unmatched views of Nanga Parbat and the Greater Himalayan ramparts.',
    bestTimeToVisit: 'Dec to Mar (Powder snow & skiing) or Apr to Jun (Alpine wildflowers)',
    heroImageUrl:
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      latitude: 34.0484,
      longitude: 74.3805,
    },
    budget: 'Luxury',
    duration: '1 Week',
    idealFor: ['Powder Skiing', 'Gondola Rides', 'Alpine Photography', 'Kashmiri Cuisine'],
    highlights: ['World’s Highest Cable Car', 'Pristine Pir Panjal Snow', 'Wildflower Meadows'],
    attractions: [
      {
        id: 'gulmarg-gondola',
        name: 'Gulmarg Gondola',
        description:
          'One of the highest operating cable cars on Earth, whisking passengers up to the Apharwat shoulder at nearly 4,000 meters.',
        imageUrl:
          'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'gulmarg-apharwat',
        name: 'Apharwat Peak Ridge',
        description:
          'An imposing alpine summit renowned for backcountry skiing in winter and crystalline glacial tarns in summer.',
        imageUrl:
          'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'gulmarg-maharani',
        name: 'Maharani Hilltop Temple',
        description:
          'A historic royal shrine dedicated to Lord Shiva, standing atop a scenic hillock visible from across the entire meadow basin.',
        imageUrl:
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City of royal palaces and astronomical wonders',
    category: 'Heritage',
    description:
      'A living museum of royal Rajasthani grandeur, featuring rose-tinted terracotta facades, sprawling hill forts, intricate sandstone jaali screens, and vibrant artisan bazaars echoing with centuries of folklore.',
    longDescription:
      'Founded in 1727 by the visionary astronomer-king Maharaja Sawai Jai Singh II, Jaipur was India’s first planned city, structured around Vedic principles of Vastu Shastra. In 1876, the entire walled city was painted in distinctive terracotta-pink—the traditional Rajasthani color of hospitality—to welcome the Prince of Wales. From the monumental Amber Fort towering over Maota Lake to the wind-swept honeycomb windows of Hawa Mahal, Jaipur is an intoxicating immersion in Rajput chivalry, block-printed textiles, and royal cuisine.',
    bestTimeToVisit: 'October to March (Warm golden sun & cool desert evenings)',
    heroImageUrl:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      latitude: 26.9124,
      longitude: 75.7873,
    },
    budget: 'Moderate',
    duration: 'Weekend',
    idealFor: ['Royal Palaces', 'Textile Crafts', 'Heritage Walk', 'Astronomical History'],
    highlights: ['Amber Fort Ramparts', 'Hawa Mahal Honeycomb', 'UNESCO Astronomical Observatory'],
    attractions: [
      {
        id: 'jaipur-amber',
        name: 'Amber Fort & Palace',
        description:
          'A majestic sandstone citadel overlooking Maota Lake, famous for its shimmering Sheesh Mahal (Mirror Palace).',
        imageUrl:
          'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'jaipur-hawa-mahal',
        name: 'Hawa Mahal (Palace of Winds)',
        description:
          'An iconic five-story pink sandstone pyramid crowned with 953 ornate latticed casements built for royal court ladies.',
        imageUrl:
          'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'jaipur-city-palace',
        name: 'City Palace & Jantar Mantar',
        description:
          'The royal residence complex showcasing Rajasthani and Mughal architectural mastery alongside monumental stone sundials.',
        imageUrl:
          'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'hampi',
    name: 'Hampi',
    state: 'Karnataka',
    tagline: 'Sunlit granite boulders and forgotten Vijayanagara empire',
    category: 'Heritage',
    description:
      'Surreal boulder-strewn landscapes along the Tungabhadra River hold the ruins of the medieval Vijayanagara capital. Monolithic deities, stone chariots, and stepwells transport travelers back to a golden age of art and commerce.',
    longDescription:
      'In the 14th to 16th centuries, Vijayanagara was one of the largest and richest metropolises in the medieval world. Today, its UNESCO-inscribed ruins spread across 41 square kilometers of otherworldly ochre boulder hills. Coracle boats glide across the sacred Tungabhadra River, while the towering gopuram of Virupaksha Temple still rings with daily prayers as it has for over a thousand years. Bicycling through the royal enclosure reveals subterranean chambers, elephant stables, and the iconic stone chariot of Vittala Temple.',
    bestTimeToVisit: 'October to March (Crisp dry mornings & golden sunsets)',
    heroImageUrl:
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      latitude: 15.335,
      longitude: 76.46,
    },
    budget: 'Budget',
    duration: 'Weekend',
    idealFor: ['Ancient Archaeology', 'Boulder Scrambling', 'Coracle Boating', 'Sunset Watching'],
    highlights: ['Vittala Stone Chariot', 'Surreal Granite Boulderscapes', 'Active 7th-Century Temple'],
    attractions: [
      {
        id: 'hampi-virupaksha',
        name: 'Virupaksha Temple',
        description:
          'The sacred centerpiece of Hampi, this 50-meter-tall stepped gopuram has been an unbroken site of worship since the 7th century.',
        imageUrl:
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'hampi-stone-chariot',
        name: 'Vijaya Vittala Stone Chariot',
        description:
          'A world-renowned monolithic shrine carved from granite blocks to resemble the mythical celestial vehicle of Garuda.',
        imageUrl:
          'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'hampi-matanga',
        name: 'Matanga Hill Lookout',
        description:
          'The highest topographical point in Hampi, offering an unforgettable 360-degree panorama of ruins, rivers, and banana groves at dawn.',
        imageUrl:
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'The eternal spiritual riverfront of ancient India',
    category: 'Heritage',
    description:
      'Among the oldest continually inhabited cities on Earth, Kashi is an intense sensory and spiritual journey. Ghats lining the sacred Ganga host twilight aarti ceremonies, chanting priests, and timeless rituals of life and liberation.',
    longDescription:
      'Known anciently as Kashi or Benares, Varanasi is India’s spiritual soul. Stretched along the crescent bend of the sacred Ganges River, eighty-four stone ghats serve as the stage for the eternal cycle of existence. At dawn, wooden rowboats drift past pilgrims performing surya namaskar in the mist. As dusk settles, Dashashwamedh Ghat ignites with the bronze oil lamps, camphor fragrance, and ringing brass bells of the grand Maha Aarti. Nearby Sarnath marks where Gautama Buddha taught the Dharma to his first five disciples.',
    bestTimeToVisit: 'October to March (Cool river breezes, 12°C - 24°C)',
    heroImageUrl:
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1400&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      latitude: 25.3176,
      longitude: 82.9739,
    },
    budget: 'Budget',
    duration: 'Weekend',
    idealFor: ['River Aarti Ceremonies', 'Sunrise Boat Journeys', 'Ancient Alleyways', 'Buddhist History'],
    highlights: ['Dashashwamedh Fire Aarti', 'Dawn Ganges Boat Ride', 'Sarnath Sacred Stupa'],
    attractions: [
      {
        id: 'varanasi-dashashwamedh',
        name: 'Dashashwamedh Ghat Aarti',
        description:
          'The premier riverfront spectacle where saffron-clad priests conduct a synchronized choreographic ritual of fire and hymns.',
        imageUrl:
          'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'varanasi-kashi-vishwanath',
        name: 'Kashi Vishwanath Temple',
        description:
          'One of the twelve sacred Jyotirlingas, adorned with a 15.5-meter golden spire dedicated to Lord Shiva.',
        imageUrl:
          'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'varanasi-sarnath',
        name: 'Dhamek Stupa at Sarnath',
        description:
          'The revered cylindrical stone stupa standing 43.6 meters tall, commemorating the site of Buddha’s first turning of the Wheel.',
        imageUrl:
          'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    tagline: 'Yoga capital and white-water Himalayan rapids',
    category: 'Adventure',
    description:
      'Where the swift emerald waters of the Ganges burst out from the Himalayan foothills. Rishikesh is equally renowned for thrilling grade III-IV white-water rafting and peaceful ashrams filled with meditation and song.',
    longDescription:
      'Guarded by forested Shivalik foothills, Rishikesh is the undisputed yoga and adventure capital of the subcontinent. Here, the holy Ganges flows crisp, clear, and vigorous, creating world-class white-water rapids with names like The Wall, Roller Coaster, and Golf Course. Across suspension bridges connecting Tapovan and Swarg Ashram, seekers from every corner of the world gather for sound healing, ayurveda, and evening kirtans on the sandbars. A quiet walk into the forest brings you to the abandoned ashram where The Beatles composed the White Album in 1968.',
    bestTimeToVisit: 'September to November & March to May (Prime rafting water)',
    heroImageUrl:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      latitude: 30.0869,
      longitude: 78.2676,
    },
    budget: 'Budget',
    duration: 'Weekend',
    idealFor: ['White-Water Rafting', 'Bungee Jumping', 'Hatha Yoga', 'Ganga Aarti'],
    highlights: ['Class IV River Rapids', 'Iconic Suspension Bridges', 'Beatles Ashram Murals'],
    attractions: [
      {
        id: 'rishikesh-rafting',
        name: 'Shivpuri River Rafting',
        description:
          'A high-octane 16km descent negotiating raging Himalayan white-water rapids through emerald mountain canyons.',
        imageUrl:
          'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'rishikesh-bridges',
        name: 'Ram & Lakshman Jhula',
        description:
          'Historic wrought-iron suspension bridges spanning the turquoise Ganges, offering views of multi-tiered temples.',
        imageUrl:
          'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'rishikesh-beatles',
        name: 'The Beatles Ashram',
        description:
          'The legendary Chaurasi Kutia ashram compound, now covered in psychedelic murals and peaceful meditation domes in Rajaji National Park.',
        imageUrl:
          'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'bir-billing',
    name: 'Bir Billing',
    state: 'Himachal Pradesh',
    tagline: 'World-class paragliding and Tibetan monastic serenity',
    category: 'Adventure',
    description:
      'Recognized among the premier paragliding launch pads on the planet, Billing provides an 8,000-foot aerie over the Kangra Valley, while Bir below offers peaceful Tibetan monasteries, tea gardens, and eco-cafes.',
    longDescription:
      'Perched in the foothills of the Dhauladhar Range, the twin settlements of Bir and Billing form India’s free-flight capital. The take-off site at Billing (2,400m) offers ideal thermals and an exhilarating leap into the blue sky, gliding alongside eagles over terraced farms and pine canopies before touching down gracefully in Bir’s sunset landing fields. Bir itself is a serene Tibetan colony home to grand monasteries, butter lamp sanctuaries, organic bakeries, and mountain bicycling trails.',
    bestTimeToVisit: 'October to November (Best thermals & crystal flight visibility)',
    heroImageUrl:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      latitude: 32.0436,
      longitude: 76.7167,
    },
    budget: 'Budget',
    duration: 'Weekend',
    idealFor: ['Tandem Paragliding', 'Tibetan Monasteries', 'Mountain Biking', 'Tea Plantation Walks'],
    highlights: ['World Cup Paragliding Site', 'Tibetan Colony & Gompas', 'Dhauladhar Mountain Vistas'],
    attractions: [
      {
        id: 'bir-takeoff',
        name: 'Billing Paragliding Take-Off',
        description:
          'A world-renowned cliff ridge at 2,400 meters where gliders catch thermals for soaring flights across Kangra Valley.',
        imageUrl:
          'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'bir-chokling',
        name: 'Chokling Monastery',
        description:
          'A vibrant Tibetan Buddhist complex featuring a grand stupa, prayer wheel colonnades, and monks chanting at dusk.',
        imageUrl:
          'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'bir-baijnath',
        name: 'Baijnath Shiva Temple',
        description:
          'A 1204 AD nagara-style stone temple housing an ancient Jyotirlinga, set against the backdrop of snow-capped peaks.',
        imageUrl:
          'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'leh-ladakh',
    name: 'Leh-Ladakh',
    state: 'Ladakh',
    tagline: 'High-altitude desert passes, azure lakes, and ancient gompas',
    category: 'Adventure',
    description:
      'A moonscape of dramatic barren peaks, fluttering prayer flags, centuries-old cliff-hanging monasteries, and crystal-clear high-altitude lakes reflecting azure skies in the trans-Himalayan rain shadow.',
    longDescription:
      'Known as the "Land of High Passes," Ladakh is an otherworldly trans-Himalayan desert perched at an average altitude exceeding 3,000 meters. The journey involves traversing some of the highest motorable roads in existence, crossing Khardung La and Chang La passes into the Nubra Valley with its double-humped Bactrian camels and stark dunes. Pangong Tso stretches across the border, shifting shades from shimmering emerald to deep cobalt blue throughout the day. Monasteries like Thiksey, Hemis, and Diskit cling to jagged crags, safeguarding centuries of Buddhist scripture and mural art.',
    bestTimeToVisit: 'May to September (Warm summer sun & open mountain passes)',
    heroImageUrl:
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1400&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      latitude: 34.1526,
      longitude: 77.5771,
    },
    budget: 'Moderate',
    duration: '2+ Weeks',
    idealFor: ['High-Pass Motorcycling', 'Lake Camping', 'Gompa Architecture', 'Stargazing'],
    highlights: ['Pangong Tso Color Shifts', 'Khardung La High Pass', 'Thiksey Hilltop Monastery'],
    attractions: [
      {
        id: 'ladakh-pangong',
        name: 'Pangong Tso Lake',
        description:
          'A mesmerising 134km endorheic lake at 4,350m, famous for changing colors from sapphire to turquoise under the sun.',
        imageUrl:
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'ladakh-khardungla',
        name: 'Khardung La Pass (5,359m)',
        description:
          'A bucket-list mountain pass once regarded as the world’s highest motorable pass, crowned with fluttering Buddhist prayer flags.',
        imageUrl:
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'ladakh-thiksey',
        name: 'Thiksey Monastery',
        description:
          'A majestic twelve-story whitewashed monastery complex resembling the Potala Palace, housing a 15-meter Maitreya Buddha statue.',
        imageUrl:
          'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
];

export const CATEGORIES = ['All', 'Beaches', 'Mountains', 'Heritage', 'Adventure'] as const;
