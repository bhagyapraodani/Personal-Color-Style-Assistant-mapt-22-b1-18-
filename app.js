/* =========================================================================
   ATELIER CHROMA — Personal Color & Style Assistant
   Core Architecture: 12-Season Armocromia, CIELAB ΔE Engine,
   On-Device Computer Vision, Fabric Optics & Wardrobe Studio
   ========================================================================= */

(() => {
  'use strict';

  /* =========================================================================
     1. DOMAIN DATA: 12-SEASON ARMOCROMIA DATABASE
     ========================================================================= */

  const SEASONS_DB = {
    'Light Spring': {
      undertone: 'Warm',
      value: 'Light',
      chroma: 'Clear',
      metals: 'Light Gold & Rose Gold',
      whites: 'Warm Ivory & Cream',
      desc: 'Delicate golden warmth paired with airy lightness and low-to-medium contrast. Fresh, sunlit pastels lift the complexion without feeling heavy.',
      makeup: {
        foundation: 'W10–W20 (Light Golden / Peach-Neutral)',
        blush: 'Warm Apricot & Soft Coral',
        lip: 'Peach Nectar, Warm Rosebud, Coral Gloss',
        eye: 'Champagne, Warm Taupe, Soft Moss',
        hair: 'Honey Blonde, Strawberry Blonde, Light Golden Brown'
      },
      neutrals: [
        { name: 'Warm Ivory', hex: '#F4EFE6' },
        { name: 'Champagne Camel', hex: '#D8C3A5' },
        { name: 'Oatmeal Linen', hex: '#C9B99F' },
        { name: 'Warm Dove Grey', hex: '#ABA59C' },
        { name: 'Light Cocoa', hex: '#8F735B' },
        { name: 'Soft Navy', hex: '#3A4E6C' }
      ],
      accents: [
        { name: 'Apricot Silk', hex: '#E99E7A' },
        { name: 'Sunlit Coral', hex: '#E57A67' },
        { name: 'Mint Pistachio', hex: '#9DC19D' },
        { name: 'Buttercup', hex: '#E8C973' },
        { name: 'Aqua Glass', hex: '#7DBAC2' },
        { name: 'Warm Periwinkle', hex: '#8A96C9' }
      ],
      avoid: [
        { name: 'Jet Black', hex: '#141414', reason: 'Creates harsh shadow contrast against light, delicate features' },
        { name: 'Stark Optic White', hex: '#FFFFFF', reason: 'Overpowers delicate golden warmth, making skin appear chalky' },
        { name: 'Deep Burgundy', hex: '#541B29', reason: 'Too dark and cool; pulls darkness into facial contours' }
      ]
    },

    'Warm Spring': {
      undertone: 'Warm',
      value: 'Medium-Light',
      chroma: 'Bright',
      metals: 'Yellow Gold & Polished Brass',
      whites: 'Cream & Ecru',
      desc: 'Unmistakable golden-yellow radiance with vibrant, sun-drenched clarity. Rich corals, leaf greens, and honeyed camels glow effortlessly.',
      makeup: {
        foundation: 'W25–W40 (Golden Warm / Peachy Yellow)',
        blush: 'Peachy Coral & Terracotta Glow',
        lip: 'Warm Poppy, Mandarin Coral, Cinnamon Rose',
        eye: 'Warm Bronze, Golden Olive, Copper',
        hair: 'Golden Copper, Warm Chestnut, Sunlit Honey'
      },
      neutrals: [
        { name: 'Rich Cream', hex: '#F3E8D2' },
        { name: 'Honey Camel', hex: '#C99E67' },
        { name: 'Warm Khaki', hex: '#A89572' },
        { name: 'Chestnut Suede', hex: '#8A5636' },
        { name: 'Warm Moss', hex: '#646D48' },
        { name: 'Warm Charcoal', hex: '#4B453F' }
      ],
      accents: [
        { name: 'Papaya Coral', hex: '#E46C4F' },
        { name: 'Marigold', hex: '#E3A43B' },
        { name: 'Leaf Green', hex: '#67944C' },
        { name: 'Warm Turquoise', hex: '#3E9B9D' },
        { name: 'Tomato Red', hex: '#C9412C' },
        { name: 'Amber Ochre', hex: '#C67F30' }
      ],
      avoid: [
        { name: 'Icy Pastel Pink', hex: '#E8C7D6', reason: 'Chalky cool cast dulls golden skin radiance' },
        { name: 'Cool Slate Blue', hex: '#62788D', reason: 'Turns complexion slightly sallow and tired' },
        { name: 'Stark Black', hex: '#0F0F0F', reason: 'Too cool and severe near the jawline' }
      ]
    },

    'Clear Spring': {
      undertone: 'Warm',
      value: 'Medium',
      chroma: 'High-Clear',
      metals: 'Polished Gold & Champagne',
      whites: 'Bright Ivory',
      desc: 'Warm undertone energized by high clarity and striking contrast. Clear, saturated hues keep pace with luminous, vivid features.',
      makeup: {
        foundation: 'W20–W45 (Clear Neutral-Warm)',
        blush: 'Clear Coral & Bright Peach',
        lip: 'True Coral Red, Watermelon, Warm Berry',
        eye: 'Champagne Shimmer, Espresso, Emerald',
        hair: 'Rich Golden Brown, Auburn, Glossy Chestnut'
      },
      neutrals: [
        { name: 'Bright Ivory', hex: '#F8F4EA' },
        { name: 'Sandstone', hex: '#D2BEA2' },
        { name: 'Warm Taupe', hex: '#8C7A6B' },
        { name: 'Espresso Bean', hex: '#3F2E26' },
        { name: 'Cobalt Navy', hex: '#243D68' },
        { name: 'Charcoal Brown', hex: '#383431' }
      ],
      accents: [
        { name: 'Clear Coral', hex: '#EC584C' },
        { name: 'Vibrant Emerald', hex: '#1D8A6B' },
        { name: 'Sun Yellow', hex: '#EFC035' },
        { name: 'Bright Teal', hex: '#1B8E99' },
        { name: 'Warm Fuchsia', hex: '#D9426B' },
        { name: 'Periwinkle Blue', hex: '#4D6AC4' }
      ],
      avoid: [
        { name: 'Muddy Beige', hex: '#A89B8C', reason: 'Drains vitality from high-clarity coloring' },
        { name: 'Dusty Mauve', hex: '#9F838C', reason: 'Muted grey cast flattens facial contrast' },
        { name: 'Olive Drab', hex: '#6D6E4E', reason: 'Too earth-muted for bright, vivid chroma' }
      ]
    },

    'Light Summer': {
      undertone: 'Cool',
      value: 'Light',
      chroma: 'Soft',
      metals: 'Silver & White Gold',
      whites: 'Soft Pure White',
      desc: 'Cool rosy undertone with delicate lightness and gentle contrast. Watercolored blues, cool taupes, and rosewood soften the face gracefully.',
      makeup: {
        foundation: 'C10–C20 (Porcelain Pink / Cool Ivory)',
        blush: 'Cool Petal Pink & Soft Rose',
        lip: 'Rosewater, Dusty Pink, Soft Berry',
        eye: 'Silver Taupe, Lavender Mist, Cool Slate',
        hair: 'Ash Blonde, Cool Champagne, Light Mushroom Brown'
      },
      neutrals: [
        { name: 'Alabaster White', hex: '#F7F8FA' },
        { name: 'Cool Stone', hex: '#CFCFD3' },
        { name: 'Rosewood Taupe', hex: '#9A8A8D' },
        { name: 'Pewter Grey', hex: '#7A7F86' },
        { name: 'Powder Navy', hex: '#495A75' },
        { name: 'Cocoa Rose', hex: '#6B585B' }
      ],
      accents: [
        { name: 'Powder Blue', hex: '#8BA9C9' },
        { name: 'Petal Rose', hex: '#D698A7' },
        { name: 'Seafoam Mint', hex: '#8FBAB3' },
        { name: 'Lavender Mist', hex: '#A69AC4' },
        { name: 'Soft Raspberry', hex: '#BD5E79' },
        { name: 'Periwinkle', hex: '#788AC2' }
      ],
      avoid: [
        { name: 'Mustard Gold', hex: '#C9942A', reason: 'Yellow warmth clashes with rosy undertone' },
        { name: 'Burnt Orange', hex: '#C55B2B', reason: 'Creates jarring temperature conflict near face' },
        { name: 'Heavy Black', hex: '#111111', reason: 'Too heavy for light, delicate value' }
      ]
    },

    'Cool Summer': {
      undertone: 'Cool',
      value: 'Medium',
      chroma: 'Soft-Medium',
      metals: 'Brushed Silver & Platinum',
      whites: 'Crisp Chalk White',
      desc: 'Pure cool blue-pink undertone tempered by soft elegance. Mist blues, heather plums, and cool charcoal illuminate the complexion.',
      makeup: {
        foundation: 'C25–C40 (Cool Rose / Neutral-Cool)',
        blush: 'Cool Rose & Mauve Berry',
        lip: 'Plum Rose, Cool Berry, Blue-Based Red',
        eye: 'Cool Slate, Soft Plum, Pearl Silver',
        hair: 'Ash Brown, Cool Espresso, Silver-Blonde'
      },
      neutrals: [
        { name: 'Chalk White', hex: '#F5F6F8' },
        { name: 'Dove Grey', hex: '#B6BAC2' },
        { name: 'Cool Taupe', hex: '#8A8385' },
        { name: 'Slate Charcoal', hex: '#4C515A' },
        { name: 'Marine Navy', hex: '#2B3F60' },
        { name: 'Cool Cocoa', hex: '#5B4B50' }
      ],
      accents: [
        { name: 'Cornflower Blue', hex: '#567AB8' },
        { name: 'Heather Plum', hex: '#845D80' },
        { name: 'Cool Spruce', hex: '#3E7574' },
        { name: 'Rose Berry', hex: '#B64E6E' },
        { name: 'Wisteria', hex: '#8F82B8' },
        { name: 'Icy Teal', hex: '#4A8E96' }
      ],
      avoid: [
        { name: 'Camel Tan', hex: '#C59B6D', reason: 'Golden-yellow cast highlights facial redness' },
        { name: 'Rust Terracotta', hex: '#B25335', reason: 'Warm orange undertones clash with cool pink tones' },
        { name: 'Warm Olive', hex: '#7A7E44', reason: 'Makes cool complexion appear tired' }
      ]
    },

    'Soft Summer': {
      undertone: 'Neutral',
      value: 'Medium-Light',
      chroma: 'Muted',
      metals: 'Pewter & Antique Silver',
      whites: 'Soft Oyster White',
      desc: 'Cool-leaning neutral with velvety, muted chroma and gentle contrast. Dusty sages, smoky mauves, and slate blues create serene harmony.',
      makeup: {
        foundation: 'N20–N35 (Muted Neutral-Cool)',
        blush: 'Dusty Mauve & Soft Rosewood',
        lip: 'Muted Berry, Rosewood, Soft Plum',
        eye: 'Smoky Taupe, Dusty Sage, Soft Charcoal',
        hair: 'Mushroom Brown, Ash Blonde, Soft Mocha'
      },
      neutrals: [
        { name: 'Oyster White', hex: '#EFECE8' },
        { name: 'Greige Mist', hex: '#C2BCB6' },
        { name: 'Mushroom Taupe', hex: '#8E837E' },
        { name: 'Smoky Charcoal', hex: '#525458' },
        { name: 'Denim Navy', hex: '#46566B' },
        { name: 'Muted Espresso', hex: '#584C4A' }
      ],
      accents: [
        { name: 'Dusty Sage', hex: '#7E9484' },
        { name: 'Smoky Mauve', hex: '#9C7886' },
        { name: 'Faded Indigo', hex: '#5E7494' },
        { name: 'Dusty Rose', hex: '#B8838B' },
        { name: 'Muted Teal', hex: '#558082' },
        { name: 'Plum Smoke', hex: '#7A5B6E' }
      ],
      avoid: [
        { name: 'Electric Neon Pink', hex: '#EE3B88', reason: 'Excessive saturation overwhelms soft features' },
        { name: 'Bright Pumpkin', hex: '#D86827', reason: 'Too warm and saturated for muted cool skin' },
        { name: 'Optic White', hex: '#FFFFFF', reason: 'Stark brightness looks detached from skin' }
      ]
    },

    'Soft Autumn': {
      undertone: 'Warm',
      value: 'Medium',
      chroma: 'Muted',
      metals: 'Brushed Gold, Antique Brass & Champagne',
      whites: 'Raw Ivory & Warm Ecru',
      desc: 'Warm-leaning neutral with a velvety, muted quality and soft contrast. Earthy taupes, olive sage, terracotta, and warm camel elevate skin radiance.',
      makeup: {
        foundation: 'W25–N35 (Warm Beige / Neutral-Golden)',
        blush: 'Warm Peach-Brown & Soft Terracotta',
        lip: 'Spiced Nude, Warm Terracotta Rose, Soft Brick',
        eye: 'Warm Taupe, Olive Bronze, Espresso',
        hair: 'Warm Chestnut, Golden Bronde, Soft Caramel'
      },
      neutrals: [
        { name: 'Raw Ivory', hex: '#F2EDE2' },
        { name: 'Warm Oat', hex: '#D9CEBC' },
        { name: 'Soft Camel', hex: '#B99976' },
        { name: 'Muted Taupe', hex: '#7A5C48' },
        { name: 'Warm Charcoal', hex: '#4B4641' },
        { name: 'Roasted Espresso', hex: '#3E3028' }
      ],
      accents: [
        { name: 'Terracotta Clay', hex: '#B86B4B' },
        { name: 'Olive Sage', hex: '#7D8461' },
        { name: 'Soft Ochre', hex: '#C49852' },
        { name: 'Warm Teal', hex: '#487673' },
        { name: 'Spiced Coral', hex: '#C77A65' },
        { name: 'Muted Plum', hex: '#78525A' }
      ],
      avoid: [
        { name: 'Icy Baby Blue', hex: '#C7D4E2', reason: 'Cold pastel cast leaves skin looking chalky and fatigued' },
        { name: 'Electric Fuchsia', hex: '#D82C7D', reason: 'Cool neon saturation overpowers muted warmth' },
        { name: 'Stark Optic White', hex: '#FFFFFF', reason: 'Harsh cool reflection creates facial shadows under the chin' }
      ]
    },

    'Warm Autumn': {
      undertone: 'Warm',
      value: 'Medium-Deep',
      chroma: 'Rich',
      metals: 'Burnished Gold, Copper & Bronze',
      whites: 'Warm Cream & Almond',
      desc: 'Deeply golden, rich warmth inspired by harvest spice and burnished leather. Rust, forest olive, mustard, and chocolate brown look effortlessly luxurious.',
      makeup: {
        foundation: 'W35–W60 (Golden Honey / Warm Bronze)',
        blush: 'Burnished Terracotta & Warm Apricot',
        lip: 'Spiced Brick, Copper Red, Warm Rust',
        eye: 'Antique Gold, Bronze, Moss Olive',
        hair: 'Rich Auburn, Chestnut Copper, Warm Chocolate'
      },
      neutrals: [
        { name: 'Almond Cream', hex: '#EDE0C9' },
        { name: 'Toasted Camel', hex: '#B5844E' },
        { name: 'Saddle Brown', hex: '#7D5132' },
        { name: 'Olive Umber', hex: '#585538' },
        { name: 'Deep Chocolate', hex: '#3B281E' },
        { name: 'Warm Slate', hex: '#4E4A42' }
      ],
      accents: [
        { name: 'Burnt Sienna', hex: '#B14E2D' },
        { name: 'Harvest Mustard', hex: '#C28C2B' },
        { name: 'Forest Olive', hex: '#4D6439' },
        { name: 'Deep Teal', hex: '#2B6B6B' },
        { name: 'Warm Rust', hex: '#9F4428' },
        { name: 'Persimmon', hex: '#CD6B3A' }
      ],
      avoid: [
        { name: 'Pastel Lavender', hex: '#C8BFE0', reason: 'Cool chalky lilac clashes with golden pigment' },
        { name: 'Cool Silver Grey', hex: '#A9B0B8', reason: 'Drains healthy warmth from the complexion' },
        { name: 'Blue-Based Magenta', hex: '#B62A6E', reason: 'Fights against natural amber undertones' }
      ]
    },

    'Deep Autumn': {
      undertone: 'Warm',
      value: 'Deep',
      chroma: 'Rich-High',
      metals: 'Antique Gold & Dark Bronze',
      whites: 'Warm Parchment & Ecru',
      desc: 'Warm undertone anchored by high depth and dramatic richness. Espresso, oxblood, forest pine, and burnished gold create striking editorial contrast.',
      makeup: {
        foundation: 'W45–W85 (Deep Golden / Rich Olive-Warm)',
        blush: 'Deep Terracotta, Plum-Bronze, Brick',
        lip: 'Oxblood Red, Spiced Berry, Deep Cognac',
        eye: 'Dark Bronze, Forest Moss, Espresso',
        hair: 'Dark Chocolate, Espresso Black, Deep Auburn'
      },
      neutrals: [
        { name: 'Warm Parchment', hex: '#EAE0CE' },
        { name: 'Cognac Camel', hex: '#9C6D44' },
        { name: 'Dark Bronze', hex: '#5D4331' },
        { name: 'Espresso Ink', hex: '#2A1F1B' },
        { name: 'Deep Olive', hex: '#3B442E' },
        { name: 'Warm Obsidian', hex: '#23201E' }
      ],
      accents: [
        { name: 'Oxblood Crimson', hex: '#7D2927' },
        { name: 'Forest Pine', hex: '#28543F' },
        { name: 'Burnished Gold', hex: '#B6842D' },
        { name: 'Petrol Teal', hex: '#225B63' },
        { name: 'Burnt Terracotta', hex: '#A44B2F' },
        { name: 'Deep Aubergine', hex: '#542B42' }
      ],
      avoid: [
        { name: 'Pale Mint Pastel', hex: '#CBE3D8', reason: 'Low depth looks washed out against rich coloring' },
        { name: 'Dusty Lilac', hex: '#B2A4B5', reason: 'Greyed coolness flattens facial structure' },
        { name: 'Light Powder Blue', hex: '#B8CCE0', reason: 'Lacks necessary depth and warmth' }
      ]
    },

    'Deep Winter': {
      undertone: 'Cool',
      value: 'Deep',
      chroma: 'High-Clear',
      metals: 'Platinum, Silver & Gunmetal',
      whites: 'Pure Optic White',
      desc: 'Cool-leaning neutral with dramatic dark depth and crisp clarity. True black, optic white, ruby crimson, and emerald look commanding.',
      makeup: {
        foundation: 'C45–C85 / N50 (Cool Espresso / Neutral-Cool)',
        blush: 'Deep Berry, Cool Wine, Plum Rose',
        lip: 'Blue-Red Ruby, Black Cherry, Deep Fuchsia',
        eye: 'Charcoal Ink, Midnight Navy, Cool Taupe',
        hair: 'Blue-Black, Dark Espresso, Cool Dark Brown'
      },
      neutrals: [
        { name: 'Optic White', hex: '#FAFBFC' },
        { name: 'Cool Pewter', hex: '#82868D' },
        { name: 'Graphite Charcoal', hex: '#3B3E44' },
        { name: 'Jet Black', hex: '#141416' },
        { name: 'Midnight Navy', hex: '#1B2640' },
        { name: 'Deep Espresso', hex: '#2B2226' }
      ],
      accents: [
        { name: 'Ruby Crimson', hex: '#9E1F34' },
        { name: 'Royal Emerald', hex: '#14664D' },
        { name: 'Deep Sapphire', hex: '#1F4080' },
        { name: 'Blackberry Plum', hex: '#5D224C' },
        { name: 'Pine Teal', hex: '#19585E' },
        { name: 'Icy Silver', hex: '#D8DFE6' }
      ],
      avoid: [
        { name: 'Muted Camel', hex: '#C4A57B', reason: 'Dusty yellow warmth dulls dramatic clarity' },
        { name: 'Warm Pumpkin', hex: '#C8652B', reason: 'Orange undertone clashes with cool depth' },
        { name: 'Soft Beige', hex: '#D2C6B5', reason: 'Too muted and light near the face' }
      ]
    },

    'Cool Winter': {
      undertone: 'Cool',
      value: 'Medium-Deep',
      chroma: 'Clear',
      metals: 'Bright Silver & White Gold',
      whites: 'Crisp Snow White',
      desc: 'Unmistakably cool, blue-based clarity with crisp contrast. True royal blue, fuchsia, icy pink, and pure black create effortless polish.',
      makeup: {
        foundation: 'C20–C55 (True Cool / Rosy Neutral)',
        blush: 'Cool Berry & Crisp Pink',
        lip: 'True Blue-Red, Magenta Berry, Cool Rose',
        eye: 'Silver Charcoal, Icy Pink, Navy',
        hair: 'Cool Black, Ash Espresso, Platinum Silver'
      },
      neutrals: [
        { name: 'Snow White', hex: '#F7F9FC' },
        { name: 'Silver Mist', hex: '#C3C9D1' },
        { name: 'Cool Slate', hex: '#646B75' },
        { name: 'Charcoal Ink', hex: '#2D3138' },
        { name: 'True Navy', hex: '#1C2F57' },
        { name: 'Pure Black', hex: '#121316' }
      ],
      accents: [
        { name: 'Royal Cobalt', hex: '#224EA6' },
        { name: 'Cool Fuchsia', hex: '#C4256A' },
        { name: 'Emerald Jewel', hex: '#157A5C' },
        { name: 'Icy Orchid', hex: '#DFD3E8' },
        { name: 'Cherry Red', hex: '#B81D38' },
        { name: 'Violet Plum', hex: '#6A3278' }
      ],
      avoid: [
        { name: 'Golden Mustard', hex: '#C9932A', reason: 'Warm yellow brings out unflattering ruddiness' },
        { name: 'Warm Caramel', hex: '#B57B48', reason: 'Muddy golden cast fights cool clarity' },
        { name: 'Earthy Olive', hex: '#6B7046', reason: 'Makes cool skin look dull and tired' }
      ]
    },

    'Clear Winter': {
      undertone: 'Neutral',
      value: 'Medium',
      chroma: 'High-Clear',
      metals: 'High-Polish Platinum & White Gold',
      whites: 'Pure Brilliance White',
      desc: 'Cool-leaning neutral with electric clarity and jewel-like contrast between eyes, hair, and skin. High-saturation jewel tones shine.',
      makeup: {
        foundation: 'N15–C40 (Clear Cool-Neutral)',
        blush: 'Bright Berry & Clear Rose',
        lip: 'Vivid Crimson, Electric Fuchsia, Clear Berry',
        eye: 'Icy Quartz, Jet Liner, Cobalt',
        hair: 'Glossy Jet Black, Cool Dark Brown, Platinum'
      },
      neutrals: [
        { name: 'Pure White', hex: '#FFFFFF' },
        { name: 'Ice Grey', hex: '#D4DAE2' },
        { name: 'Gunmetal', hex: '#5A606B' },
        { name: 'Deep Navy', hex: '#1B2C52' },
        { name: 'Obsidian Black', hex: '#111214' },
        { name: 'Cool Taupe', hex: '#756E74' }
      ],
      accents: [
        { name: 'Cobalt Blue', hex: '#1C54C7' },
        { name: 'Hot Magenta', hex: '#D41E72' },
        { name: 'Clear Emerald', hex: '#0F8C68' },
        { name: 'Icy Lemon', hex: '#EFEA7A' },
        { name: 'Scarlet Red', hex: '#CE1E31' },
        { name: 'Bright Cyan', hex: '#189AB4' }
      ],
      avoid: [
        { name: 'Muted Oatmeal', hex: '#C9BEAD', reason: 'Dulls natural crystal-clear contrast' },
        { name: 'Dusty Terracotta', hex: '#B87862', reason: 'Too muted and warm for vivid chroma' },
        { name: 'Moss Grey', hex: '#7E8272', reason: 'Flat earthiness weakens visual presence' }
      ]
    }
  };

  // Support common Armocromia aliases seamlessly
  SEASONS_DB['Bright Spring'] = SEASONS_DB['Clear Spring'];
  SEASONS_DB['Bright Winter'] = SEASONS_DB['Clear Winter'];

  /* =========================================================================
     2. DOMAIN DATA: 11 COMPREHENSIVE TEXTILES LIBRARY
     ========================================================================= */

  const FABRICS_DATA = [
    {
      id: 'linen',
      name: 'Washed Organic Linen',
      category: 'matte',
      luster: 'Dry Matte Texture',
      drape: 'Relaxed Architectural',
      weight: 'lightweight',
      texture: 'textured',
      formality: 'casual',
      weather: 'warm',
      bestSeasons: ['Soft Autumn', 'Warm Autumn', 'Warm Spring', 'Light Spring', 'Soft Summer'],
      summary: 'Organic slub yarns scatter light and create micro-shadows across the weave, softening contrast for warm and muted skin tones.',
      pairings: 'Deconstructed blazers, wide-leg resort trousers, breezy camp-collar shirts.',
      weaveType: 'slub'
    },
    {
      id: 'cotton',
      name: 'Combed & Brushed Cotton',
      category: 'matte',
      luster: 'Soft Diffuse Matte',
      drape: 'Crisp to Medium Structure',
      weight: 'medium',
      texture: 'smooth',
      formality: 'casual',
      weather: 'all-season',
      bestSeasons: ['Soft Autumn', 'Warm Autumn', 'Light Spring', 'Soft Summer', 'Cool Summer', 'Clear Spring'],
      summary: 'Natural breathable cotton diffuses light evenly without glare. Brushed finishes soften edges, making everyday neutrals wearable.',
      pairings: 'Structured overshirts, tailored chinos, fine crewneck knits.',
      weaveType: 'plain'
    },
    {
      id: 'denim',
      name: 'Selvedge & Washed Denim',
      category: 'matte',
      luster: 'Diagonal Twill Texture',
      drape: 'Substantial & Structured',
      weight: 'heavyweight',
      texture: 'textured',
      formality: 'casual',
      weather: 'all-season',
      bestSeasons: ['Soft Autumn', 'Deep Autumn', 'Deep Winter', 'Cool Winter', 'Soft Summer', 'Warm Spring'],
      summary: 'Twill weave with indigo warp and ecru weft. Dark raw selvedge suits deep/cool seasons; washed vintage denim flatters soft and warm palettes.',
      pairings: 'Straight-leg jeans, trucker jackets, structured denim midi skirts.',
      weaveType: 'twill'
    },
    {
      id: 'satin',
      name: 'Silk Charmeuse & Satin',
      category: 'luminous',
      luster: 'High Specular Sheen',
      drape: 'Fluid & Liquid Bias-Cut',
      weight: 'lightweight',
      texture: 'smooth',
      formality: 'formal',
      weather: 'all-season',
      bestSeasons: ['Clear Winter', 'Cool Winter', 'Deep Winter', 'Clear Spring', 'Warm Spring', 'Deep Autumn'],
      summary: 'Floating warp threads create mirror-like reflectivity that intensifies jewel and clear tones, framing high-contrast features.',
      pairings: 'Bias slip dresses, evening camisoles, tuxedo lapel facing.',
      weaveType: 'satin'
    },
    {
      id: 'chiffon',
      name: 'Silk Chiffon & Georgette',
      category: 'luminous',
      luster: 'Sheer Translucent Luster',
      drape: 'Weightless & Gossamer',
      weight: 'lightweight',
      texture: 'smooth',
      formality: 'formal',
      weather: 'warm',
      bestSeasons: ['Light Spring', 'Light Summer', 'Soft Summer', 'Soft Autumn', 'Cool Summer'],
      summary: 'Open-twist filament silk softens color density, allowing light to pass through and blend harmoniously with delicate complexions.',
      pairings: 'Layered evening blouses, romantic scarves, draped cocktail overlays.',
      weaveType: 'sheer'
    },
    {
      id: 'cashmere',
      name: 'Pure Cashmere & Merino',
      category: 'matte',
      luster: 'Velvety Light-Absorbing',
      drape: 'Sumptuous Soft Fluidity',
      weight: 'medium',
      texture: 'textured',
      formality: 'versatile',
      weather: 'cold',
      bestSeasons: ['Soft Autumn', 'Deep Autumn', 'Cool Summer', 'Soft Summer', 'Deep Winter', 'Warm Autumn'],
      summary: 'Microscopic lofted fibers absorb direct light, producing rich, muted depth in camel, oat, heather grey, and charcoal knitwear.',
      pairings: 'Rollneck sweaters, knit cardigans, oversized wraps.',
      weaveType: 'crepe'
    },
    {
      id: 'wool-crepe',
      name: 'Fine Wool Crepe & Gabardine',
      category: 'matte',
      luster: 'Refined Low-Sheen',
      drape: 'Crisp Architectural Weight',
      weight: 'medium',
      texture: 'smooth',
      formality: 'formal',
      weather: 'all-season',
      bestSeasons: ['Soft Autumn', 'Deep Autumn', 'Cool Winter', 'Deep Winter', 'Clear Winter', 'Warm Autumn'],
      summary: 'High-twist yarns resist wrinkling and eliminate harsh shine, anchoring executive suiting in deep, solid seasonal neutrals.',
      pairings: 'Double-breasted blazers, cigarette trousers, pleated sheath dresses.',
      weaveType: 'crepe'
    },
    {
      id: 'velvet',
      name: 'Silk Velvet & Velveteen',
      category: 'luminous',
      luster: 'Deep Dimensional Pile Glow',
      drape: 'Heavy Sculptural Drape',
      weight: 'heavyweight',
      texture: 'textured',
      formality: 'formal',
      weather: 'cold',
      bestSeasons: ['Deep Winter', 'Deep Autumn', 'Cool Winter', 'Clear Winter', 'Warm Autumn'],
      summary: 'Cut-loop vertical pile creates high light-angle variance: dark in shadows, rich luminous in direct light. Unrivaled for deep drama.',
      pairings: 'Smoking jackets, evening trousers, holiday cocktail blazers.',
      weaveType: 'pile'
    },
    {
      id: 'tweed',
      name: 'Heritage Tweed & Bouclé',
      category: 'matte',
      luster: 'Nubby Multi-Yarn Texture',
      drape: 'Stiff Structured Outerwear',
      weight: 'heavyweight',
      texture: 'textured',
      formality: 'formal',
      weather: 'cold',
      bestSeasons: ['Warm Autumn', 'Soft Autumn', 'Deep Autumn', 'Cool Winter', 'Soft Summer'],
      summary: 'Multi-ply heathered yarns blend adjacent analog hues in the weave, creating textural harmony that naturally flatters earthy coloring.',
      pairings: 'Classic collarless jackets, bespoke car coats, heritage waistcoats.',
      weaveType: 'herringbone'
    },
    {
      id: 'leather',
      name: 'Lambskin Nappa & Suede',
      category: 'matte',
      luster: 'Supple Semi-Matte / Buffed',
      drape: 'Moldable Ergonomic Structure',
      weight: 'heavyweight',
      texture: 'smooth',
      formality: 'versatile',
      weather: 'cold',
      bestSeasons: ['Warm Autumn', 'Deep Autumn', 'Deep Winter', 'Clear Winter', 'Soft Autumn'],
      summary: 'Suede softens color saturation via nap diffusion; polished nappa leather offers crisp contrast for boots, belts, and outerwear.',
      pairings: 'Minimalist leather trenches, tailored pencil skirts, moto jackets.',
      weaveType: 'leather'
    },
    {
      id: 'poplin',
      name: 'Crisp Egyptian Poplin',
      category: 'luminous',
      luster: 'Fine Lustrous Sheen',
      drape: 'Crisp Paper-Like Form',
      weight: 'lightweight',
      texture: 'smooth',
      formality: 'formal',
      weather: 'warm',
      bestSeasons: ['Clear Winter', 'Cool Winter', 'Clear Spring', 'Light Spring', 'Light Summer'],
      summary: 'Fine combed yarns in a tight plain weave reflect light cleanly, delivering sharp collar definition and immaculate dress shirts.',
      pairings: 'Oversized menswear shirts, architectural shirtdresses, poplin shorts.',
      weaveType: 'plain'
    }
  ];

  /* =========================================================================
     3. DOMAIN DATA: 12 CURATED OUTFIT FORMULAS ACROSS ALL OCCASIONS & HARMONIES
     ========================================================================= */

  const OUTFITS_CATALOG = [
    {
      id: 'outfit-gallery-tailored',
      title: 'Gallery Monolith Suiting',
      occasion: 'work',
      silhouette: 'tailored',
      harmony: 'monochromatic',
      fabric: 'Fine Wool Crepe & Combed Cotton',
      topIdx: 0,
      layerIdx: 3,
      bottomIdx: 4,
      accentIdx: 0,
      note: 'Places your cleanest light neutral directly under the chin while anchoring deep tone-on-tone structure below the collarbone.'
    },
    {
      id: 'outfit-executive-blazer',
      title: 'Editorial Double-Breasted Blazer',
      occasion: 'work',
      silhouette: 'tailored',
      harmony: 'analogous',
      fabric: 'Wool Gabardine & Silk Poplin',
      topIdx: 1,
      layerIdx: 4,
      bottomIdx: 5,
      accentIdx: 1,
      note: 'Analogous shades create smooth corporate authority without the harshness of pure black-and-white contrast.'
    },
    {
      id: 'outfit-terracotta-resort',
      title: 'Sunlit Courtyard Relaxed Set',
      occasion: 'casual',
      silhouette: 'minimal',
      harmony: 'analogous',
      fabric: 'Washed Linen & Organic Cotton',
      topIdx: 1,
      layerIdx: null,
      bottomIdx: 0,
      accentIdx: 1,
      note: 'Airy matte linen softens daylight glare; warm accent accessories frame natural skin undertones effortlessly.'
    },
    {
      id: 'outfit-knit-denim',
      title: 'Minimalist Knit & Selvedge Denim',
      occasion: 'casual',
      silhouette: 'minimal',
      harmony: 'complementary',
      fabric: 'Pure Cashmere & Selvedge Denim',
      topIdx: 0,
      layerIdx: 2,
      bottomIdx: 4,
      accentIdx: 3,
      note: 'Balances the structured diagonal indigo of denim with cozy light neutrals and a bright complementary pop near the face.'
    },
    {
      id: 'outfit-evening-column',
      title: 'After-Hours Column Drape',
      occasion: 'party',
      silhouette: 'draped',
      harmony: 'monochromatic',
      fabric: 'Silk Georgette & Matte-Back Satin',
      topIdx: 2,
      layerIdx: 5,
      bottomIdx: 5,
      accentIdx: 3,
      note: 'A monochromatic dark evening column elongates the silhouette while your statement jewel or earth accent illuminates the neckline.'
    },
    {
      id: 'outfit-cocktail-sharp',
      title: 'Architectural Evening Tuxedo',
      occasion: 'party',
      silhouette: 'tailored',
      harmony: 'complementary',
      fabric: 'Silk Satin & Wool Crepe',
      topIdx: 5,
      layerIdx: 3,
      bottomIdx: 5,
      accentIdx: 4,
      note: 'Sharp lapel lines frame a contrasting jewel accent blouse, creating magnetic evening clarity under ambient restaurant lighting.'
    },
    {
      id: 'outfit-ceremony-formal',
      title: 'Salon Formal Ceremony Ensemble',
      occasion: 'wedding',
      silhouette: 'draped',
      harmony: 'triadic',
      fabric: 'Silk Chiffon & Fluid Crepe',
      topIdx: 0,
      layerIdx: 2,
      bottomIdx: 4,
      accentIdx: 4,
      note: 'Balances a soft formal neutral base with triadic metallic jewelry matching your natural undertone temperature.'
    },
    {
      id: 'outfit-black-tie-gala',
      title: 'Velvet & Satin Gala Column',
      occasion: 'wedding',
      silhouette: 'tailored',
      harmony: 'monochromatic',
      fabric: 'Silk Velvet & Silk Charmeuse',
      topIdx: 4,
      layerIdx: 5,
      bottomIdx: 5,
      accentIdx: 0,
      note: 'Sumptuous light-absorbing velvet absorbs harsh flash photography, illuminated by polished seasonal jewelry accents.'
    },
    {
      id: 'outfit-denim-atelier',
      title: 'Weekend Studio Layering',
      occasion: 'weekend',
      silhouette: 'minimal',
      harmony: 'analogous',
      fabric: 'Washed Denim & Brushed Cotton',
      topIdx: 0,
      layerIdx: 1,
      bottomIdx: 4,
      accentIdx: 2,
      note: 'Combines relaxed denim weight with your palette’s signature mid-tone knitwear for effortless off-duty elegance.'
    },
    {
      id: 'outfit-trench-loafers',
      title: 'High-Street Relaxed Trench',
      occasion: 'weekend',
      silhouette: 'tailored',
      harmony: 'complementary',
      fabric: 'Combed Cotton Twill & Suede',
      topIdx: 0,
      layerIdx: 2,
      bottomIdx: 3,
      accentIdx: 5,
      note: 'The iconic outerwear staple in your palette’s camel or stone, elevated with complementary leather accents.'
    },
    {
      id: 'outfit-capsule-foundation',
      title: '7-Piece Tone-on-Tone Capsule',
      occasion: 'capsule',
      silhouette: 'minimal',
      harmony: 'monochromatic',
      fabric: 'Cashmere Knit & Wool Trousers',
      topIdx: 0,
      layerIdx: 1,
      bottomIdx: 3,
      accentIdx: 1,
      note: 'A core modular wardrobe capsule where all pieces share temperature, value, and chroma for interchangeable packing.'
    },
    {
      id: 'outfit-capsule-contrast',
      title: 'Accent Foundation Capsule',
      occasion: 'capsule',
      silhouette: 'tailored',
      harmony: 'complementary',
      fabric: 'Egyptian Poplin & Fine Merino',
      topIdx: 0,
      layerIdx: 3,
      bottomIdx: 4,
      accentIdx: 2,
      note: 'Three neutral anchor pieces paired with two calibrated seasonal accent tops for maximum rotation versatility.'
    }
  ];

  /* =========================================================================
     4. DOMAIN DATA: STORE GARMENT PRESETS FOR SCANNER
     ========================================================================= */

  const SCANNER_PRESETS = [
    { name: 'Terracotta Linen Blazer', hex: '#B86B4B' },
    { name: 'Icy Cobalt Silk Shirt', hex: '#224EA6' },
    { name: 'Raw Ivory Cashmere Knit', hex: '#F2EDE2' },
    { name: 'Optic White Poplin', hex: '#FFFFFF' },
    { name: 'Olive Sage Trench', hex: '#7D8461' },
    { name: 'Electric Fuchsia Slip', hex: '#D82C7D' },
    { name: 'Warm Mustard Wool Coat', hex: '#C28C2B' },
    { name: 'Midnight Charcoal Trousers', hex: '#3B3E44' }
  ];

  /* =========================================================================
     5. DOMAIN DATA: DAILY STYLE INSPIRATION FORMULAS
     ========================================================================= */

  const DAILY_INSPIRATIONS = {
    'Light Spring': {
      title: 'Sunlit Apricot & Warm Ivory',
      text: 'Light, sun-bleached pastels reflect natural radiance. Pair a gossamer apricot silk blouse with crisp warm ivory linen trousers.'
    },
    'Warm Spring': {
      title: 'Marigold & Honey Camel Radiance',
      text: 'Lean into unapologetic golden warmth today. Accent a warm camel cashmere crewneck with polished brass jewelry and a pop of marigold coral.'
    },
    'Clear Spring': {
      title: 'Emerald Clarity & Bright Ivory',
      text: 'High-contrast clarity is your superpower. Pair saturated clear emerald with crisp bright ivory to keep features alert and luminous.'
    },
    'Light Summer': {
      title: 'Powder Blue & Rosewood Harmony',
      text: 'Soft, watercolored elegance. Balance delicate powder blue knitwear with muted rosewood trousers for refined daytime poise.'
    },
    'Cool Summer': {
      title: 'Cornflower & Marine Navy Suiting',
      text: 'Pure cool rose and mist hues elevate your skin. Anchor a cornflower silk shirt inside a tailored marine navy jacket.'
    },
    'Soft Summer': {
      title: 'Smoky Mauve & Greige Cashmere',
      text: 'Velvety, diffused serenity. Combine heathered dusty sage with greige linen to let your naturally soft contrast shine.'
    },
    'Soft Autumn': {
      title: 'Terracotta Clay & Raw Ivory Balance',
      text: 'Warmth meets muted sophistication. Layer rich terracotta linen over raw ivory, finishing with brushed gold or antique brass jewelry.'
    },
    'Warm Autumn': {
      title: 'Burnt Sienna & Toasted Camel Luxury',
      text: 'Rich, harvest-grounded decadence. Pair burnished rust wool outerwear with deep saddle leather and amber accessories.'
    },
    'Deep Autumn': {
      title: 'Oxblood Crimson & Espresso Drama',
      text: 'High-depth editorial warmth. Anchor a striking oxblood silk blouse against dark bronze or espresso tailoring.'
    },
    'Deep Winter': {
      title: 'Ruby Crimson & Pure Jet Black',
      text: 'Commanding high-contrast clarity. Contrast pure black tailored wool with brilliant ruby red and platinum accents.'
    },
    'Cool Winter': {
      title: 'Royal Cobalt & Crisp Snow White',
      text: 'Electric, icy coolness. Crisp snow-white poplin under a vivid royal cobalt blazer brings immediate eye clarity.'
    },
    'Clear Winter': {
      title: 'Hot Magenta & Obsidian Contrast',
      text: 'Jewel-like brilliance. Pair saturated magenta silk with deep obsidian trousers and high-polish white gold jewelry.'
    }
  };

  /* =========================================================================
     6. APPLICATION STATE & PERSISTENCE ENGINE
     ========================================================================= */

  const STORAGE_KEY = 'atelier_chroma_app_state_v2';

  const DEFAULT_STATE = {
    activePage: 'dashboard',
    profile: {
      name: 'Elena Vance',
      undertone: 'Warm',
      depth: 'Medium',
      season: 'Soft Autumn',
      isOlive: false,
      silhouette: 'all',
      skinHex: '#D2A684',
      skinRgb: { r: 210, g: 166, b: 132 },
      skinLab: { L: 71.4, a: 11.2, b: 21.8 },
      skinHsv: { h: 26, s: 37, v: 82 },
      contrastLevel: 'Medium',
      confidence: 91,
      analysisSource: 'Calibrated Studio Baseline'
    },
    savedColors: [
      { name: 'Terracotta Clay', hex: '#B86B4B', season: 'Soft Autumn' },
      { name: 'Raw Ivory', hex: '#F2EDE2', season: 'Soft Autumn' },
      { name: 'Olive Sage', hex: '#7D8461', season: 'Soft Autumn' },
      { name: 'Warm Teal', hex: '#487673', season: 'Soft Autumn' }
    ],
    savedOutfits: ['outfit-gallery-tailored', 'outfit-terracotta-resort'],
    scanHistory: [
      {
        id: 'scan-sample-1',
        garment: 'Terracotta Linen Blazer',
        hex: '#B86B4B',
        score: 95,
        verdict: 'Harmonic Match',
        nearestName: 'Terracotta Clay',
        nearestHex: '#B86B4B',
        deltaE: 3.8,
        date: '2026-11-24'
      },
      {
        id: 'scan-sample-2',
        garment: 'Icy Cobalt Silk Shirt',
        hex: '#224EA6',
        score: 38,
        verdict: 'Contrast Clash (Avoid Near Face)',
        nearestName: 'Warm Teal',
        nearestHex: '#487673',
        deltaE: 28.4,
        date: '2026-11-23'
      }
    ],
    outfitOccasion: 'all',
    outfitSilhouette: 'all',
    outfitHarmony: 'all',
    outfitSearch: '',
    fabricFilter: 'all',
    fabricSearch: ''
  };

  let appState = JSON.parse(JSON.stringify(DEFAULT_STATE));

  const sessionMedia = {
    selfieImg: null,
    selfiePresetKey: 'warm',
    customRoi: null,
    cvLayer: 'original',
    lastCvAnalysis: null,
    lastQuizResult: null,
    browsedSeason: 'Soft Autumn',
    activeDrapeHex: '#B86B4B',
    activeDrapeName: 'Terracotta Clay',
    activeDrapeIsAvoid: false,
    compareDrape: false,
    garmentImg: null,
    currentScan: null,
    dominantGarmentHues: []
  };

  function persistState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }
    try {
      if (window.notebookAppApi && typeof window.notebookAppApi.setAppState === 'function') {
        window.notebookAppApi.setAppState(appState);
      }
    } catch (err) {
      console.warn('Notebook API save deferred:', err);
    }
  }

  function loadPersistedState() {
    try {
      const localData = localStorage.getItem(STORAGE_KEY);
      if (localData) {
        const parsed = JSON.parse(localData);
        if (parsed && typeof parsed === 'object') {
          appState = {
            ...DEFAULT_STATE,
            ...parsed,
            profile: { ...DEFAULT_STATE.profile, ...(parsed.profile || {}) },
            savedColors: Array.isArray(parsed.savedColors) ? parsed.savedColors : DEFAULT_STATE.savedColors,
            savedOutfits: Array.isArray(parsed.savedOutfits) ? parsed.savedOutfits : DEFAULT_STATE.savedOutfits,
            scanHistory: Array.isArray(parsed.scanHistory) ? parsed.scanHistory : DEFAULT_STATE.scanHistory
          };
          return;
        }
      }
    } catch (err) {
      console.warn('Error reading localStorage, using defaults:', err);
    }

    // Fallback: check notebookAppApi if present
    try {
      if (window.notebookAppApi && typeof window.notebookAppApi.getAppState === 'function') {
        const loaded = window.notebookAppApi.getAppState();
        if (loaded && typeof loaded === 'object') {
          appState = {
            ...DEFAULT_STATE,
            ...loaded,
            profile: { ...DEFAULT_STATE.profile, ...(loaded.profile || {}) },
            savedColors: Array.isArray(loaded.savedColors) ? loaded.savedColors : DEFAULT_STATE.savedColors,
            savedOutfits: Array.isArray(loaded.savedOutfits) ? loaded.savedOutfits : DEFAULT_STATE.savedOutfits,
            scanHistory: Array.isArray(loaded.scanHistory) ? loaded.scanHistory : DEFAULT_STATE.scanHistory
          };
        }
      }
    } catch (err) {
      console.warn('Error reading Notebook API state:', err);
    }
  }

  /* =========================================================================
     7. COLOR SCIENCE & PERCEPTUAL COMPUTER VISION UTILITIES
     ========================================================================= */

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function rgbToHex(r, g, b) {
    const toHex = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function hexToRgb(hex) {
    const clean = String(hex || '').replace('#', '').trim();
    if (clean.length === 3) {
      return {
        r: parseInt(clean[0] + clean[0], 16) || 0,
        g: parseInt(clean[1] + clean[1], 16) || 0,
        b: parseInt(clean[2] + clean[2], 16) || 0
      };
    }
    if (clean.length !== 6) return { r: 184, g: 107, b: 75 };
    return {
      r: parseInt(clean.slice(0, 2), 16) || 0,
      g: parseInt(clean.slice(2, 4), 16) || 0,
      b: parseInt(clean.slice(4, 6), 16) || 0
    };
  }

  function rgbToHsv(r, g, b) {
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
      if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
      else if (max === gn) h = ((bn - rn) / d + 2) * 60;
      else h = ((rn - gn) / d + 4) * 60;
    }
    const s = max === 0 ? 0 : d / max;
    const v = max;
    return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(v * 100) };
  }

  function rgbToHsl(r, g, b) {
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
      else if (max === gn) h = (bn - rn) / d + 2;
      else h = (rn - gn) / d + 4;
      h *= 60;
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function rgbToYCrCb(r, g, b) {
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    const cr = (r - y) * 0.713 + 128;
    const cb = (b - y) * 0.564 + 128;
    return { y, cr, cb };
  }

  function rgbToLab(r, g, b) {
    // 1. sRGB to linear RGB
    let rl = r / 255, gl = g / 255, bl = b / 255;
    rl = rl > 0.04045 ? Math.pow((rl + 0.055) / 1.055, 2.4) : rl / 12.92;
    gl = gl > 0.04045 ? Math.pow((gl + 0.055) / 1.055, 2.4) : gl / 12.92;
    bl = bl > 0.04045 ? Math.pow((bl + 0.055) / 1.055, 2.4) : bl / 12.92;

    // 2. Linear RGB to CIE XYZ (Observer = 2°, Illuminant = D65)
    let x = rl * 0.4124 + gl * 0.3576 + bl * 0.1805;
    let y = rl * 0.2126 + gl * 0.7152 + bl * 0.0722;
    let z = rl * 0.0193 + gl * 0.1192 + bl * 0.9505;

    // 3. XYZ to CIE L*a*b*
    const xn = 0.95047, yn = 1.00000, zn = 1.08883;
    x /= xn; y /= yn; z /= zn;

    const f = (t) => t > 0.008856 ? Math.cbrt(t) : (7.787 * t) + (16 / 116);
    const fx = f(x), fy = f(y), fz = f(z);

    const L = Math.max(0, 116 * fy - 16);
    const a = 500 * (fx - fy);
    const bLab = 200 * (fy - fz);

    return {
      L: Number(L.toFixed(1)),
      a: Number(a.toFixed(1)),
      b: Number(bLab.toFixed(1))
    };
  }

  function labDeltaE(lab1, lab2) {
    // Standard CIE76 Euclidean distance in L*a*b* space
    const dL = lab1.L - lab2.L;
    const da = lab1.a - lab2.a;
    const db = lab1.b - lab2.b;
    return Math.sqrt(dL * dL + da * da + db * db);
  }

  function isSkinPixel(r, g, b) {
    // Dual YCrCb and HSV skin tone criteria
    const ycc = rgbToYCrCb(r, g, b);
    const yPass = ycc.y > 60;
    const crPass = ycc.cr >= 133 && ycc.cr <= 173;
    const cbPass = ycc.cb >= 77 && ycc.cb <= 127;

    const hsv = rgbToHsv(r, g, b);
    const hPass = (hsv.h >= 0 && hsv.h <= 52) || (hsv.h >= 335 && hsv.h <= 360);
    const sPass = hsv.s >= 14 && hsv.s <= 70;
    const vPass = hsv.v >= 18 && hsv.v <= 96;

    const rgbOrder = r > g && g >= b;
    const contrastRule = Math.abs(r - g) > 10;

    return yPass && crPass && cbPass && hPass && sPass && vPass && rgbOrder && contrastRule;
  }

  function runKMeansRGB(pixels, k = 3, iterations = 8) {
    if (!pixels || pixels.length === 0) {
      return [
        { r: 210, g: 166, b: 132, count: 1, share: 100 },
        { r: 180, g: 130, b: 98, count: 1, share: 0 },
        { r: 230, g: 190, b: 160, count: 1, share: 0 }
      ];
    }

    if (pixels.length <= k) {
      return pixels.map((p) => ({ ...p, count: 1, share: Math.round(100 / pixels.length) }));
    }

    // Deterministic seeding based on sorted luminance
    const sorted = [...pixels].sort((a, b) => {
      const la = 0.299 * a.r + 0.587 * a.g + 0.114 * a.b;
      const lb = 0.299 * b.r + 0.587 * b.g + 0.114 * b.b;
      return la - lb;
    });

    const centers = [];
    for (let i = 0; i < k; i++) {
      const idx = Math.floor((i + 0.5) * (sorted.length / k));
      centers.push({ r: sorted[idx].r, g: sorted[idx].g, b: sorted[idx].b });
    }

    let clusters = [];
    for (let iter = 0; iter < iterations; iter++) {
      clusters = Array.from({ length: k }, () => []);
      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];
        let bestDist = Infinity;
        let bestIdx = 0;
        for (let c = 0; c < k; c++) {
          const dr = p.r - centers[c].r;
          const dg = p.g - centers[c].g;
          const db = p.b - centers[c].b;
          const dist = dr * dr + dg * dg + db * db;
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = c;
          }
        }
        clusters[bestIdx].push(p);
      }

      for (let c = 0; c < k; c++) {
        if (clusters[c].length > 0) {
          let sr = 0, sg = 0, sb = 0;
          for (let j = 0; j < clusters[c].length; j++) {
            sr += clusters[c][j].r;
            sg += clusters[c][j].g;
            sb += clusters[c][j].b;
          }
          centers[c].r = Math.round(sr / clusters[c].length);
          centers[c].g = Math.round(sg / clusters[c].length);
          centers[c].b = Math.round(sb / clusters[c].length);
        }
      }
    }

    const total = pixels.length;
    return centers.map((c, i) => ({
      r: c.r,
      g: c.g,
      b: c.b,
      count: clusters[i].length,
      share: Math.round((clusters[i].length / total) * 100)
    })).sort((a, b) => b.count - a.count);
  }

  function classifySkinTelemetry(dominantRgb, contrastSpread) {
    const lab = rgbToLab(dominantRgb.r, dominantRgb.g, dominantRgb.b);
    const hsv = rgbToHsv(dominantRgb.r, dominantRgb.g, dominantRgb.b);
    const hex = rgbToHex(dominantRgb.r, dominantRgb.g, dominantRgb.b);

    // Undertone classification: b* (yellow/blue) vs a* (red/green)
    const yellowCast = lab.b;
    const redCast = lab.a;
    const diff = yellowCast - redCast;

    let undertone = 'Neutral';
    let isOlive = false;

    if (diff > 5.5) {
      undertone = 'Warm';
    } else if (diff < -1.5) {
      undertone = 'Cool';
    } else {
      undertone = 'Neutral';
    }

    // Olive check: green-gray cast over yellow (hsv hue > 32 and lower saturation with balanced a*)
    if (hsv.h >= 32 && hsv.h <= 48 && hsv.s <= 42 && lab.a <= 13) {
      isOlive = true;
    }

    // Skin depth based on CIELAB L*
    let depth = 'Medium';
    if (lab.L >= 76) depth = 'Fair';
    else if (lab.L >= 68) depth = 'Light';
    else if (lab.L >= 55) depth = 'Medium';
    else if (lab.L >= 42) depth = 'Tan';
    else depth = 'Deep';

    // Contrast level based on luminance spread
    let contrastLevel = 'Medium';
    if (contrastSpread >= 46) contrastLevel = 'High';
    else if (contrastSpread <= 24) contrastLevel = 'Soft';

    // Season classification in 12-season matrix
    let season = 'Soft Autumn';
    if (undertone === 'Warm') {
      if (depth === 'Fair' || depth === 'Light') {
        season = contrastLevel === 'High' ? 'Clear Spring' : 'Light Spring';
      } else if (depth === 'Deep' || depth === 'Tan') {
        season = 'Deep Autumn';
      } else {
        season = contrastLevel === 'High' ? 'Warm Spring' : (isOlive ? 'Soft Autumn' : 'Warm Autumn');
      }
    } else if (undertone === 'Cool') {
      if (depth === 'Fair' || depth === 'Light') {
        season = 'Light Summer';
      } else if (depth === 'Deep') {
        season = 'Deep Winter';
      } else {
        season = contrastLevel === 'High' ? 'Cool Winter' : 'Cool Summer';
      }
    } else {
      // Neutral
      if (contrastLevel === 'High' && (depth === 'Deep' || depth === 'Medium')) {
        season = 'Clear Winter';
      } else if (depth === 'Deep') {
        season = 'Deep Winter';
      } else if (isOlive || diff >= 2) {
        season = 'Soft Autumn';
      } else {
        season = 'Soft Summer';
      }
    }

    // Confidence metric (78% to 96%)
    const chromaMag = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
    const confidence = clamp(Math.round(82 + (Math.abs(diff) * 1.2) + (contrastSpread * 0.15)), 80, 96);

    const explanation = undertone === 'Warm'
      ? `Positive b* (+${lab.b}) dominates over a* (+${lab.a}), indicating golden-peach melanin reflectance. ${isOlive ? 'Subtle olive nuance softens high chroma.' : ''}`
      : (undertone === 'Cool'
        ? `Elevated a* (+${lab.a}) relative to b* (+${lab.b}) reflects cool rosy capillary undertones with crisp natural contrast.`
        : `Balanced a* (+${lab.a}) and b* (+${lab.b}) values indicate a versatile neutral undertone that responds best to soft-muted harmonies.`);

    return {
      undertone,
      depth,
      season,
      isOlive,
      contrastLevel,
      confidence,
      hex,
      rgb: dominantRgb,
      lab,
      hsv,
      explanation
    };
  }

  /* =========================================================================
     8. SYNTHETIC STUDIO PORTRAITS (FOR CALIBRATED DEMO ANALYSIS)
     ========================================================================= */

  function createDemoPortraitCanvas(presetKey) {
    const c = document.createElement('canvas');
    c.width = 460;
    c.height = 360;
    const ctx = c.getContext('2d');

    const presets = {
      warm:    { bg: '#E6DFD5', skin: '#D4A582', shadow: '#B78460', hair: '#5A3A28', lip: '#B96A5B', eye: '#4F5A3B', shirt: '#ECE8E1' },
      cool:    { bg: '#DFE3E8', skin: '#E5BFB8', shadow: '#C89993', hair: '#2D282C', lip: '#B55B72', eye: '#475D7A', shirt: '#F5F6F8' },
      neutral: { bg: '#DDD8D0', skin: '#865F4D', shadow: '#684738', hair: '#1A1718', lip: '#7D474B', eye: '#2C221E', shirt: '#E5E0D8' },
      olive:   { bg: '#E1DDD2', skin: '#C3A27A', shadow: '#9E825D', hair: '#3B2F26', lip: '#9E6258', eye: '#4B4433', shirt: '#ECE8E1' }
    };
    const p = presets[presetKey] || presets.warm;

    // Studio backdrop
    ctx.fillStyle = p.bg;
    ctx.fillRect(0, 0, c.width, c.height);

    // Collar/shirt
    ctx.fillStyle = p.shirt;
    ctx.beginPath();
    ctx.ellipse(230, 360, 150, 85, 0, Math.PI, 2 * Math.PI);
    ctx.fill();

    // Hair back
    ctx.fillStyle = p.hair;
    ctx.beginPath();
    ctx.arc(230, 155, 96, 0, Math.PI * 2);
    ctx.fill();

    // Neck
    ctx.fillStyle = p.shadow;
    ctx.fillRect(195, 210, 70, 75);

    // Head oval
    ctx.fillStyle = p.skin;
    ctx.beginPath();
    ctx.ellipse(230, 175, 72, 92, 0, 0, Math.PI * 2);
    ctx.fill();

    // Jaw/cheek contour
    ctx.fillStyle = p.shadow;
    ctx.beginPath();
    ctx.ellipse(230, 218, 54, 38, 0, 0, Math.PI);
    ctx.fill();

    // Restore chin
    ctx.fillStyle = p.skin;
    ctx.beginPath();
    ctx.ellipse(230, 212, 48, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyebrows
    ctx.strokeStyle = p.hair;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(182, 142); ctx.quadraticCurveTo(202, 136, 218, 144);
    ctx.moveTo(242, 144); ctx.quadraticCurveTo(258, 136, 278, 142);
    ctx.stroke();

    // Eyes
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(200, 156, 14, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(260, 156, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = p.eye;
    ctx.beginPath();
    ctx.arc(200, 156, 6.5, 0, Math.PI * 2);
    ctx.arc(260, 156, 6.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.arc(200, 156, 3, 0, Math.PI * 2);
    ctx.arc(260, 156, 3, 0, Math.PI * 2);
    ctx.fill();

    // Nose shadow
    ctx.strokeStyle = p.shadow;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(230, 156);
    ctx.lineTo(226, 188);
    ctx.lineTo(234, 188);
    ctx.stroke();

    // Lips
    ctx.fillStyle = p.lip;
    ctx.beginPath();
    ctx.ellipse(230, 212, 19, 7.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair front styling
    ctx.fillStyle = p.hair;
    ctx.beginPath();
    ctx.moveTo(140, 150);
    ctx.quadraticCurveTo(230, 75, 320, 150);
    ctx.quadraticCurveTo(230, 115, 140, 150);
    ctx.fill();

    return c;
  }

  function createDemoGarmentCanvas(hex, label) {
    const c = document.createElement('canvas');
    c.width = 440;
    c.height = 300;
    const ctx = c.getContext('2d');

    const baseRgb = hexToRgb(hex);

    // Neutral studio surface
    ctx.fillStyle = '#ECE8E1';
    ctx.fillRect(0, 0, c.width, c.height);

    // Garment fold base
    ctx.fillStyle = hex;
    ctx.fillRect(40, 30, 360, 240);

    // Texture weave simulation
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    for (let y = 30; y < 270; y += 4) {
      ctx.fillRect(40, y, 360, 1.5);
    }
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    for (let x = 40; x < 400; x += 6) {
      ctx.fillRect(x, 30, 2, 240);
    }

    // Organic shadow folds
    const grad = ctx.createLinearGradient(40, 0, 400, 0);
    grad.addColorStop(0, 'rgba(0,0,0,0.22)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.14)');
    grad.addColorStop(0.65, 'rgba(0,0,0,0.18)');
    grad.addColorStop(1, 'rgba(0,0,0,0.26)');
    ctx.fillStyle = grad;
    ctx.fillRect(40, 30, 360, 240);

    // Tailored label tag
    ctx.fillStyle = '#111111';
    ctx.fillRect(60, 48, 140, 28);
    ctx.fillStyle = '#FAF8F5';
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.fillText('ATELIER CHROMA', 72, 66);

    return c;
  }

  /* =========================================================================
     9. UI TOAST & NOTIFICATION SYSTEM
     ========================================================================= */

  function showToast(msg) {
    const el = document.getElementById('atelier-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      el.classList.remove('show');
    }, 2500);
  }

  function toggleMobileNav() {
    const nav = document.getElementById('main-nav');
    const btn = document.getElementById('mobile-nav-btn');
    if (!nav || !btn) return;
    const open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function navigateTo(pageId) {
    const validPages = ['dashboard', 'analysis', 'palette', 'scanner', 'outfits', 'fabrics', 'saved', 'profile'];
    if (!validPages.includes(pageId)) pageId = 'dashboard';

    appState.activePage = pageId;

    document.querySelectorAll('.view-section').forEach((sec) => {
      sec.classList.remove('is-visible');
    });
    const target = document.getElementById(`view-${pageId}`);
    if (target) target.classList.add('is-visible');

    document.querySelectorAll('.nav-link').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.page === pageId);
    });

    const nav = document.getElementById('main-nav');
    const mBtn = document.getElementById('mobile-nav-btn');
    if (nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      if (mBtn) mBtn.setAttribute('aria-expanded', 'false');
    }

    renderActivePage(pageId);
    persistState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderActivePage(pageId) {
    updateHeaderBadge();
    if (pageId === 'dashboard') renderDashboard();
    else if (pageId === 'analysis') renderAnalysisPage();
    else if (pageId === 'palette') renderPalettePage();
    else if (pageId === 'scanner') renderScannerPage();
    else if (pageId === 'outfits') renderOutfits();
    else if (pageId === 'fabrics') renderFabrics();
    else if (pageId === 'saved') renderSavedStyles();
    else if (pageId === 'profile') renderProfilePage();

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function updateHeaderBadge() {
    const chip = document.getElementById('header-skin-chip');
    const txt = document.getElementById('header-profile-text');
    if (chip) chip.style.backgroundColor = appState.profile.skinHex;
    if (txt) {
      const oliveLabel = appState.profile.isOlive ? ' (Olive)' : '';
      txt.textContent = `${appState.profile.undertone}${oliveLabel} · ${appState.profile.season}`;
    }
  }

  /* =========================================================================
     10. PAGE 1: DASHBOARD CONTROLLER & INSPIRATION GENERATOR
     ========================================================================= */

  function renderDashboard() {
    const p = appState.profile;
    const seasonObj = SEASONS_DB[p.season] || SEASONS_DB['Soft Autumn'];

    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    // Personalized greeting
    const hour = new Date().getHours();
    let timeGreeting = 'Good Evening';
    if (hour < 12) timeGreeting = 'Good Morning';
    else if (hour < 18) timeGreeting = 'Good Afternoon';

    const greetingEl = document.getElementById('dash-greeting-time');
    if (greetingEl) {
      greetingEl.textContent = `${timeGreeting}, ${p.name || 'Atelier Client'} · Atelier Overview`;
    }

    setText('dash-lede', seasonObj.desc);
    setText('dash-undertone', p.isOlive ? `${p.undertone} · Olive` : p.undertone);
    setText('dash-undertone-note', p.undertone === 'Warm' ? 'Golden / Peachy Reflectance' : (p.undertone === 'Cool' ? 'Rosy / Bluish Reflectance' : 'Balanced Dual Reflectance'));
    setText('dash-season', p.season);
    setText('dash-axes', `${p.depth} Depth · ${seasonObj.chroma} Chroma · ${p.confidence || 91}% Conf.`);
    setText('dash-metals', seasonObj.metals.split('&')[0].trim());
    setText('dash-white-note', seasonObj.whites);
    setText('dash-saved-count', `${appState.savedColors.length} / ${appState.savedOutfits.length} / ${appState.scanHistory.length}`);
    setText('dash-hex-chip', p.skinHex);

    // Daily Inspiration card
    const inspo = DAILY_INSPIRATIONS[p.season] || DAILY_INSPIRATIONS['Soft Autumn'];
    const todayFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    setText('dash-inspo-date', `Daily Atelier Inspiration · ${todayFormatted}`);
    setText('dash-inspo-season', `${p.season} Styling Pairing`);
    setText('dash-inspo-title', inspo.title);
    setText('dash-inspo-text', inspo.text);

    // Top 6 signature swatches preview
    const previewGrid = document.getElementById('dash-swatch-preview');
    if (previewGrid) {
      const mix = [...seasonObj.neutrals.slice(0, 3), ...seasonObj.accents.slice(0, 3)];
      previewGrid.innerHTML = mix.map((c) => renderSwatchCardHtml(c, p.season)).join('');
    }

    // 3 Avoid shades preview
    const avoidGrid = document.getElementById('dash-avoid-preview');
    if (avoidGrid) {
      avoidGrid.innerHTML = seasonObj.avoid.map((c) => `
        <div class="ruled-stone">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 border border-[var(--outline-variant)] shrink-0" style="background-color:${c.hex};"></div>
            <div>
              <div class="text-sm font-medium">${c.name}</div>
              <div class="mono text-xs text-[var(--on-surface-variant)]">${c.hex}</div>
            </div>
          </div>
          <p class="text-xs text-[var(--on-surface-variant)] mt-2 m-0">${c.reason}</p>
        </div>
      `).join('');
    }

    // 3-Axis SVG Matrix
    renderAxesSvgChart(p, seasonObj);
  }

  function renderAxesSvgChart(profile, seasonObj) {
    const container = document.getElementById('dash-axes-svg-container');
    if (!container) return;

    const lab = profile.skinLab || { L: 71.4, a: 11.2, b: 21.8 };
    const tempScore = clamp(Math.round(50 + (lab.b - lab.a) * 2.4), 10, 92);
    const depthScore = clamp(Math.round(100 - lab.L), 12, 90);
    const chromaVal = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
    const chromaScore = clamp(Math.round((chromaVal / 36) * 100), 18, 92);

    const bars = [
      { label: 'TEMPERATURE (COOL → WARM)', val: tempScore, tag: profile.undertone, color: 'var(--data-2)' },
      { label: 'VALUE DEPTH (LIGHT → DEEP)', val: depthScore, tag: profile.depth, color: 'var(--data-1)' },
      { label: 'CHROMA CLARITY (MUTED → CLEAR)', val: chromaScore, tag: seasonObj.chroma, color: 'var(--data-4)' }
    ];

    container.innerHTML = `
      <svg viewBox="0 0 420 220" width="100%" height="220" role="img" aria-label="Three-axis armocromia coordinate chart">
        ${bars.map((bar, idx) => {
          const y = 34 + idx * 66;
          const barW = Math.round((bar.val / 100) * 380);
          return `
            <text x="10" y="${y - 10}" fill="var(--on-surface-variant)" font-family="Jost, sans-serif" font-size="10" letter-spacing="1.8">${bar.label}</text>
            <text x="410" y="${y - 10}" text-anchor="end" fill="var(--on-surface)" font-family="IBM Plex Mono, monospace" font-size="11">${bar.tag.toUpperCase()} (${bar.val})</text>
            <line x1="10" y1="${y + 12}" x2="410" y2="${y + 12}" stroke="var(--data-context)" stroke-width="1" />
            <rect x="10" y="${y + 2}" width="400" height="8" fill="var(--surface-container)" />
            <rect x="10" y="${y + 2}" width="${barW}" height="8" fill="${bar.color}" />
            <rect x="${10 + barW - 3}" y="${y - 1}" width="6" height="14" fill="var(--on-surface)" />
          `;
        }).join('')}
      </svg>
    `;
  }

  function renderSwatchCardHtml(swatch, seasonName) {
    const isFav = appState.savedColors.some((s) => s.hex.toUpperCase() === swatch.hex.toUpperCase());
    const safeName = swatch.name.replace(/'/g, '');
    return `
      <div class="swatch-card">
        <div class="swatch-block" style="background-color:${swatch.hex};" onclick="window.AtelierApp.drapeColor('${swatch.hex}', '${safeName}')" title="Click to drape ${safeName} (${swatch.hex})"></div>
        <div class="flex items-start justify-between gap-2 mt-1">
          <div>
            <div class="text-sm font-medium leading-tight">${swatch.name}</div>
            <div class="mono text-xs text-[var(--on-surface-variant)]">${swatch.hex}</div>
          </div>
          <div class="flex items-center gap-1">
            <button type="button" class="btn-ghost btn-sm" style="min-height:30px; padding:0 8px;" onclick="window.AtelierApp.copyHex('${swatch.hex}')" aria-label="Copy ${swatch.hex}" title="Copy HEX">
              <i data-lucide="copy" class="w-3.5 h-3.5" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn-ghost btn-sm" style="min-height:30px; padding:0 8px;" onclick="window.AtelierApp.toggleFavoriteColor('${swatch.hex}', '${safeName}', '${seasonName}')" aria-label="Toggle favorite ${safeName}" title="${isFav ? 'Remove from favorites' : 'Save color'}">
              <i data-lucide="heart" class="w-3.5 h-3.5" style="${isFav ? 'fill: var(--secondary); color: var(--secondary);' : ''}" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /* =========================================================================
     11. PAGE 2: AI COLOR ANALYSIS CONTROLLER & REAL-TIME CV PIPELINE
     ========================================================================= */

  function setAnalysisMode(mode) {
    const cvEl = document.getElementById('analysis-mode-cv');
    const quizEl = document.getElementById('analysis-mode-quiz');
    const btnCv = document.getElementById('mode-btn-cv');
    const btnQuiz = document.getElementById('mode-btn-quiz');
    if (!cvEl || !quizEl) return;

    if (mode === 'cv') {
      cvEl.style.display = '';
      quizEl.style.display = 'none';
      if (btnCv) btnCv.classList.add('active-filter');
      if (btnQuiz) btnQuiz.classList.remove('active-filter');
      renderAnalysisPage();
    } else {
      cvEl.style.display = 'none';
      quizEl.style.display = '';
      if (btnCv) btnCv.classList.remove('active-filter');
      if (btnQuiz) btnQuiz.classList.add('active-filter');
      evaluateGuidedQuiz();
    }
  }

  function renderAnalysisPage() {
    setupDragDropZone('selfie-canvas-frame', handleSelfieFile);

    if (!sessionMedia.selfieImg) {
      loadDemoPortrait(sessionMedia.selfiePresetKey || 'warm');
    } else {
      runSelfieCvPipeline();
    }
  }

  function loadDemoPortrait(presetKey) {
    sessionMedia.selfiePresetKey = presetKey;
    sessionMedia.customRoi = null;
    sessionMedia.selfieImg = createDemoPortraitCanvas(presetKey);

    const badge = document.getElementById('cv-source-badge');
    const note = document.getElementById('cv-source-note');
    if (badge) {
      badge.textContent = 'Calibrated Studio Baseline';
      badge.className = 'status-badge status-neutral';
    }
    if (note) {
      note.textContent = 'Demo portrait with pre-calibrated lighting curve.';
    }

    runSelfieCvPipeline();
    showToast(`Loaded ${presetKey} studio portrait`);
  }

  function handleSelfieUpload(input) {
    if (!input || !input.files || !input.files[0]) return;
    handleSelfieFile(input.files[0]);
  }

  function handleSelfieFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      showToast('Image size exceeds 15MB limit. Please choose a smaller photo.');
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = function () {
      sessionMedia.selfieImg = img;
      sessionMedia.customRoi = null;

      const badge = document.getElementById('cv-source-badge');
      const note = document.getElementById('cv-source-note');
      if (badge) {
        badge.textContent = 'Browser Computer Vision (Client-Side)';
        badge.className = 'status-badge status-positive';
      }
      if (note) {
        note.textContent = 'Processed locally via Canvas pixel segmentation. Not sent to servers.';
      }

      runSelfieCvPipeline();
      URL.revokeObjectURL(url);
      showToast('Selfie loaded — analyzing skin pixels locally');
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      showToast('Could not decode image file');
    };
    img.src = url;
  }

  function setCvLayer(layer) {
    sessionMedia.cvLayer = layer;
    const bOrig = document.getElementById('cv-layer-orig');
    const bMask = document.getElementById('cv-layer-mask');
    if (bOrig) bOrig.classList.toggle('active-filter', layer === 'original');
    if (bMask) bMask.classList.toggle('active-filter', layer === 'mask');
    runSelfieCvPipeline();
  }

  function handleSelfieCanvasClick(event) {
    const canvas = document.getElementById('selfie-canvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    sessionMedia.customRoi = {
      x: Math.round((event.clientX - rect.left) * scaleX),
      y: Math.round((event.clientY - rect.top) * scaleY)
    };
    runSelfieCvPipeline();
    showToast('Re-sampled skin tone at clicked region');
  }

  function runSelfieCvPipeline() {
    const canvas = document.getElementById('selfie-canvas');
    const src = sessionMedia.selfieImg;
    if (!canvas || !src) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const srcW = src.width || 460;
    const srcH = src.height || 360;
    const scale = Math.min(w / srcW, h / srcH);
    const dw = Math.round(srcW * scale);
    const dh = Math.round(srcH * scale);
    const dx = Math.round((w - dw) / 2);
    const dy = Math.round((h - dh) / 2);

    ctx.fillStyle = '#E5E0D8';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(src, dx, dy, dw, dh);

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    const roiCenter = sessionMedia.customRoi || { x: Math.round(w * 0.5), y: Math.round(h * 0.47) };
    const roiRadiusX = sessionMedia.customRoi ? 38 : Math.round(dw * 0.24);
    const roiRadiusY = sessionMedia.customRoi ? 38 : Math.round(dh * 0.27);

    const skinPixels = [];
    const luminances = [];
    let totalRoiPixels = 0;
    let skinCount = 0;

    for (let py = 0; py < h; py += 2) {
      for (let px = 0; px < w; px += 2) {
        const idx = (py * w + px) * 4;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        const inRoi = Math.abs(px - roiCenter.x) <= roiRadiusX && Math.abs(py - roiCenter.y) <= roiRadiusY;
        if (inRoi) {
          totalRoiPixels++;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          luminances.push(lum);
          if (isSkinPixel(r, g, b)) {
            skinCount++;
            skinPixels.push({ r, g, b });
          }
        }
      }
    }

    if (skinPixels.length < 15 && sessionMedia.customRoi) {
      const patch = ctx.getImageData(clamp(roiCenter.x - 10, 0, w - 20), clamp(roiCenter.y - 10, 0, h - 20), 20, 20).data;
      for (let i = 0; i < patch.length; i += 4) {
        skinPixels.push({ r: patch[i], g: patch[i + 1], b: patch[i + 2] });
      }
    }

    if (sessionMedia.cvLayer === 'mask') {
      const maskImg = ctx.getImageData(0, 0, w, h);
      const m = maskImg.data;
      for (let i = 0; i < m.length; i += 4) {
        const r = m[i], g = m[i + 1], b = m[i + 2];
        if (!isSkinPixel(r, g, b)) {
          const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
          const muted = Math.round(gray * 0.35 + 225 * 0.65);
          m[i] = muted; m[i + 1] = muted - 3; m[i + 2] = muted - 8;
        }
      }
      ctx.putImageData(maskImg, 0, 0);
    }

    // Editorial ROI boundary
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 1.25;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(roiCenter.x - roiRadiusX, roiCenter.y - roiRadiusY, roiRadiusX * 2, roiRadiusY * 2);
    ctx.setLineDash([]);

    let minLum = 255, maxLum = 0;
    for (const l of luminances) {
      if (l < minLum) minLum = l;
      if (l > maxLum) maxLum = l;
    }
    const contrastSpread = Math.round((maxLum - minLum) * 0.28);

    const clusters = runKMeansRGB(skinPixels, 3, 8);
    const dominant = clusters[0];
    const classification = classifySkinTelemetry(dominant, contrastSpread);
    const maskPercent = totalRoiPixels ? ((skinCount / totalRoiPixels) * 100).toFixed(1) : '0.0';

    sessionMedia.lastCvAnalysis = {
      ...classification,
      clusters,
      maskPercent
    };

    // UI Updates
    const swatchEl = document.getElementById('cv-skin-swatch');
    if (swatchEl) swatchEl.style.backgroundColor = classification.hex;
    const uEl = document.getElementById('cv-result-undertone');
    if (uEl) uEl.textContent = `${classification.undertone} Undertone${classification.isOlive ? ' (Olive Cast)' : ''}`;
    const sEl = document.getElementById('cv-result-season');
    if (sEl) sEl.textContent = `${classification.season} · Confidence ${classification.confidence}%`;
    const hEl = document.getElementById('cv-result-hex');
    if (hEl) hEl.textContent = `HEX ${classification.hex} · L* ${classification.lab.L} · a* ${classification.lab.a} · b* ${classification.lab.b}`;
    const expEl = document.getElementById('cv-result-explanation');
    if (expEl) expEl.textContent = classification.explanation;

    const clusterEl = document.getElementById('cv-kmeans-clusters');
    if (clusterEl) {
      clusterEl.innerHTML = clusters.map((cl, i) => {
        const cHex = rgbToHex(cl.r, cl.g, cl.b);
        return `
          <div class="ruled-stone">
            <div class="w-full h-10 border border-[var(--outline-variant)]" style="background-color:${cHex};"></div>
            <div class="mono text-xs mt-1">${cHex}</div>
            <div class="text-xs text-[var(--on-surface-variant)]">Cluster ${i + 1} · ${cl.share}%</div>
          </div>
        `;
      }).join('');
    }

    const tBody = document.getElementById('cv-telemetry-rows');
    if (tBody) {
      tBody.innerHTML = `
        <tr>
          <td>Skin Mask Coverage</td>
          <td class="mono">${maskPercent}% ROI</td>
          <td>${skinPixels.length} skin pixels sampled</td>
        </tr>
        <tr>
          <td>RGB / HSV Dominant</td>
          <td class="mono">${dominant.r}, ${dominant.g}, ${dominant.b}</td>
          <td>H ${classification.hsv.h}° · S ${classification.hsv.s}% · V ${classification.hsv.v}%</td>
        </tr>
        <tr>
          <td>CIELAB Coordinates</td>
          <td class="mono">L* ${classification.lab.L} · a* ${classification.lab.a} · b* ${classification.lab.b}</td>
          <td>${classification.depth} Depth · ${classification.contrastLevel} Contrast</td>
        </tr>
      `;
    }
  }

  function applyCvResultToProfile() {
    const res = sessionMedia.lastCvAnalysis;
    if (!res) return;
    appState.profile = {
      ...appState.profile,
      undertone: res.undertone,
      depth: res.depth,
      season: res.season,
      isOlive: res.isOlive,
      skinHex: res.hex,
      skinRgb: { r: res.rgb.r, g: res.rgb.g, b: res.rgb.b },
      skinLab: res.lab,
      skinHsv: res.hsv,
      contrastLevel: res.contrastLevel,
      confidence: res.confidence,
      analysisSource: 'On-Device CV (YCrCb/HSV + K-Means)'
    };
    sessionMedia.browsedSeason = res.season;
    const seasonObj = SEASONS_DB[res.season];
    if (seasonObj && seasonObj.accents[0]) {
      sessionMedia.activeDrapeHex = seasonObj.accents[0].hex;
      sessionMedia.activeDrapeName = seasonObj.accents[0].name;
    }
    updateHeaderBadge();
    persistState();
    showToast(`Profile updated: ${res.undertone} · ${res.season}`);
  }

  function drapeDetectedSkinTone() {
    applyCvResultToProfile();
    navigateTo('palette');
  }

  /* Guided 5-Step Quiz */
  function evaluateGuidedQuiz() {
    const veins = document.getElementById('quiz-veins')?.value || 'warm';
    const metal = document.getElementById('quiz-metal')?.value || 'warm';
    const fabric = document.getElementById('quiz-fabric')?.value || 'warm';
    const found = document.getElementById('quiz-foundation')?.value || 'warm';
    const contrast = document.getElementById('quiz-contrast')?.value || 'medium-warm';

    let warmScore = 0, coolScore = 0;
    let isOlive = found === 'olive';

    [veins, metal, fabric].forEach((v) => {
      if (v === 'warm') warmScore += 2;
      else if (v === 'cool') coolScore += 2;
      else { warmScore += 1; coolScore += 1; }
    });

    if (found === 'warm') warmScore += 2;
    else if (found === 'cool') coolScore += 2;
    else if (found === 'olive') { warmScore += 1.5; coolScore += 0.5; }
    else { warmScore += 1; coolScore += 1; }

    let undertone = 'Neutral';
    if (warmScore - coolScore >= 2) undertone = 'Warm';
    else if (coolScore - warmScore >= 2) undertone = 'Cool';

    let season = 'Soft Autumn';
    let depth = 'Medium';
    if (undertone === 'Warm') {
      if (contrast === 'light-soft') { season = 'Light Spring'; depth = 'Light'; }
      else if (contrast === 'bright-clear') { season = 'Warm Spring'; depth = 'Medium'; }
      else if (contrast === 'deep-clear') { season = 'Deep Autumn'; depth = 'Deep'; }
      else { season = 'Soft Autumn'; depth = 'Medium'; }
    } else if (undertone === 'Cool') {
      if (contrast === 'light-soft') { season = 'Light Summer'; depth = 'Light'; }
      else if (contrast === 'bright-clear') { season = 'Cool Winter'; depth = 'Medium'; }
      else if (contrast === 'deep-clear') { season = 'Deep Winter'; depth = 'Deep'; }
      else { season = 'Cool Summer'; depth = 'Medium'; }
    } else {
      if (contrast === 'bright-clear') { season = 'Clear Winter'; depth = 'Medium'; }
      else if (contrast === 'deep-clear') { season = 'Deep Winter'; depth = 'Deep'; }
      else if (isOlive || warmScore > coolScore) { season = 'Soft Autumn'; depth = 'Medium'; }
      else { season = 'Soft Summer'; depth = 'Light'; }
    }

    sessionMedia.lastQuizResult = { undertone, season, depth, isOlive };

    const tEl = document.getElementById('quiz-result-title');
    if (tEl) tEl.textContent = `${undertone} Undertone · ${season}`;
    const oEl = document.getElementById('quiz-result-olive');
    if (oEl) oEl.textContent = isOlive ? 'Olive Nuance Detected · Foundation Caution' : `Standard ${undertone} Temperature`;
    const sEl = document.getElementById('quiz-result-summary');
    if (sEl) {
      sEl.textContent = isOlive
        ? `Your checks indicate ${undertone} with a green-gray olive cast. Look for olive-neutral foundations and avoid hyper-saturated cool pinks or orange pigments.`
        : `Your daylight vein, metal, and white-vs-cream checks align around ${undertone} temperature with ${season} chroma and depth.`;
    }
  }

  function applyQuizResultToProfile() {
    evaluateGuidedQuiz();
    const q = sessionMedia.lastQuizResult;
    if (!q) return;
    appState.profile.undertone = q.undertone;
    appState.profile.season = q.season;
    appState.profile.depth = q.depth;
    appState.profile.isOlive = q.isOlive;
    appState.profile.analysisSource = 'Guided 5-Step Daylight Check';
    sessionMedia.browsedSeason = q.season;
    updateHeaderBadge();
    persistState();
    showToast(`Applied ${q.season} from Guided Check`);
  }

  /* =========================================================================
     12. PAGE 3: MY COLOR PALETTE & VIRTUAL DRAPING STUDIO
     ========================================================================= */

  function renderPalettePage() {
    const sel = document.getElementById('season-browser-select');
    const seasonNames = [
      'Light Spring', 'Warm Spring', 'Clear Spring',
      'Light Summer', 'Cool Summer', 'Soft Summer',
      'Soft Autumn', 'Warm Autumn', 'Deep Autumn',
      'Deep Winter', 'Cool Winter', 'Clear Winter'
    ];
    if (sel && sel.options.length === 0) {
      sel.innerHTML = seasonNames.map((s) => `<option value="${s}">${s} (${SEASONS_DB[s].undertone})</option>`).join('');
    }
    const viewingSeason = sessionMedia.browsedSeason || appState.profile.season;
    if (sel) sel.value = viewingSeason;

    const sObj = SEASONS_DB[viewingSeason] || SEASONS_DB['Soft Autumn'];
    const isMine = viewingSeason === appState.profile.season;

    // Status pill
    const statusPill = document.getElementById('palette-status-pill');
    if (statusPill) {
      statusPill.textContent = isMine ? 'Active Profile' : 'Browsing Mode';
      statusPill.className = `status-badge ${isMine ? 'status-positive' : 'status-warning'}`;
    }

    const setMineBtn = document.getElementById('drape-set-mine-btn');
    if (setMineBtn) {
      setMineBtn.style.display = isMine ? 'none' : 'inline-flex';
    }

    const subEl = document.getElementById('palette-subtitle');
    if (subEl) {
      subEl.textContent = isMine
        ? `Your personalized ${viewingSeason} palette (${sObj.undertone} · ${sObj.value} · ${sObj.chroma}). Click any swatch to drape, copy HEX, or save.`
        : `Previewing ${viewingSeason} (${sObj.undertone} · ${sObj.value} · ${sObj.chroma}). Your active profile is ${appState.profile.season}.`;
    }

    const hEl = document.getElementById('palette-season-heading');
    if (hEl) hEl.textContent = `${viewingSeason} (${sObj.undertone})`;
    const dEl = document.getElementById('palette-season-desc');
    if (dEl) dEl.textContent = sObj.desc;

    // Beauty, Metals & Hair
    const beautyEl = document.getElementById('palette-beauty-list');
    if (beautyEl) {
      beautyEl.innerHTML = `
        <div><span class="label text-[var(--secondary)]">Jewelry Metals:</span> <span class="text-sm font-medium">${sObj.metals}</span></div>
        <div><span class="label text-[var(--secondary)]">Best Whites:</span> <span class="text-sm font-medium">${sObj.whites}</span></div>
        <div><span class="label text-[var(--secondary)]">Foundation Base:</span> <span class="text-sm">${sObj.makeup.foundation}</span></div>
        <div><span class="label text-[var(--secondary)]">Blush &amp; Lip:</span> <span class="text-sm">${sObj.makeup.blush} · ${sObj.makeup.lip}</span></div>
        <div><span class="label text-[var(--secondary)]">Eye &amp; Hair:</span> <span class="text-sm">${sObj.makeup.eye} · ${sObj.makeup.hair}</span></div>
      `;
    }

    // Swatch grids
    const nGrid = document.getElementById('palette-neutrals-grid');
    if (nGrid) nGrid.innerHTML = sObj.neutrals.map((c) => renderSwatchCardHtml(c, viewingSeason)).join('');

    const aGrid = document.getElementById('palette-accents-grid');
    if (aGrid) aGrid.innerHTML = sObj.accents.map((c) => renderSwatchCardHtml(c, viewingSeason)).join('');

    const avGrid = document.getElementById('palette-avoid-grid');
    if (avGrid) {
      avGrid.innerHTML = sObj.avoid.map((c) => `
        <div class="swatch-card">
          <div class="swatch-block" style="background-color:${c.hex};" onclick="window.AtelierApp.drapeColor('${c.hex}', '${c.name.replace(/'/g, '')}', true)" title="Test clash drape"></div>
          <div class="mt-1">
            <div class="text-sm font-medium">${c.name} <span class="mono text-xs text-[var(--error)]">${c.hex}</span></div>
            <div class="text-xs text-[var(--on-surface-variant)]">${c.reason}</div>
          </div>
        </div>
      `).join('');
    }

    if (!sessionMedia.activeDrapeHex) {
      sessionMedia.activeDrapeHex = sObj.accents[0].hex;
      sessionMedia.activeDrapeName = sObj.accents[0].name;
    }
    renderDrapePortraits(sObj);
  }

  function handleSeasonBrowse(seasonName) {
    sessionMedia.browsedSeason = seasonName;
    const sObj = SEASONS_DB[seasonName];
    if (sObj) {
      sessionMedia.activeDrapeHex = sObj.accents[0].hex;
      sessionMedia.activeDrapeName = sObj.accents[0].name;
    }
    renderPalettePage();
    if (window.lucide) window.lucide.createIcons();
  }

  function setActiveSeasonAsMine() {
    const viewing = sessionMedia.browsedSeason;
    if (!viewing || !SEASONS_DB[viewing]) return;
    appState.profile.season = viewing;
    appState.profile.undertone = SEASONS_DB[viewing].undertone;
    appState.profile.analysisSource = 'Manual 12-Season Selection';
    updateHeaderBadge();
    persistState();
    renderPalettePage();
    showToast(`${viewing} set as your active profile`);
  }

  function drapeColor(hex, name, isAvoid = false) {
    sessionMedia.activeDrapeHex = hex;
    sessionMedia.activeDrapeName = name;
    sessionMedia.activeDrapeIsAvoid = isAvoid;
    if (appState.activePage !== 'palette') {
      navigateTo('palette');
    } else {
      renderDrapePortraits(SEASONS_DB[sessionMedia.browsedSeason || appState.profile.season]);
    }
    showToast(`Draping ${name} (${hex})`);
  }

  function toggleDrapeCompare() {
    sessionMedia.compareDrape = !sessionMedia.compareDrape;
    const btn = document.getElementById('drape-compare-toggle');
    if (btn) btn.classList.toggle('active-filter', sessionMedia.compareDrape);
    renderDrapePortraits(SEASONS_DB[sessionMedia.browsedSeason || appState.profile.season]);
  }

  function renderDrapePortraits(sObj) {
    const root = document.documentElement;
    const activeHex = sessionMedia.activeDrapeHex || sObj.accents[0].hex;
    const avoidHex = sObj.avoid[0].hex;
    root.style.setProperty('--active-drape', activeHex);
    root.style.setProperty('--compare-drape', avoidHex);

    const lbl = document.getElementById('drape-active-label');
    if (lbl) lbl.textContent = `${sessionMedia.activeDrapeName || sObj.accents[0].name} · ${activeHex}`;

    const pill = document.getElementById('drape-verdict-pill');
    if (pill) {
      const isAvoid = sObj.avoid.some((a) => a.hex.toUpperCase() === activeHex.toUpperCase());
      pill.textContent = isAvoid ? 'Avoid Near Face' : 'Harmonic Palette Drape';
      pill.className = isAvoid ? 'label text-[var(--error)]' : 'label text-[var(--positive)]';
    }

    const singleV = document.getElementById('drape-single-view');
    const compV = document.getElementById('drape-compare-view');
    if (singleV && compV) {
      singleV.style.display = sessionMedia.compareDrape ? 'none' : 'flex';
      compV.style.display = sessionMedia.compareDrape ? 'grid' : 'none';
    }

    const leftName = document.getElementById('drape-left-name');
    const rightName = document.getElementById('drape-right-name');
    if (leftName) leftName.textContent = `${sessionMedia.activeDrapeName} (${activeHex})`;
    if (rightName) rightName.textContent = `${sObj.avoid[0].name} (Avoid)`;

    const skin = appState.profile.skinHex || '#D2A684';
    const portraitSvg = `
      <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
        <rect width="120" height="120" fill="${skin}" opacity="0.22"/>
        <ellipse cx="60" cy="48" rx="34" ry="40" fill="#3B2E26"/>
        <rect x="49" y="80" width="22" height="28" fill="${skin}"/>
        <ellipse cx="60" cy="54" rx="26" ry="33" fill="${skin}"/>
        <circle cx="50" cy="50" r="2.2" fill="#111111"/>
        <circle cx="70" cy="50" r="2.2" fill="#111111"/>
        <path d="M52 70 Q60 74 68 70" stroke="#7A4945" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </svg>
    `;
    ['drape-portrait-slot', 'drape-portrait-left', 'drape-portrait-right'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = portraitSvg;
    });
  }

  function copyHex(hex) {
    const rgb = hexToRgb(hex);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }
    showToast(`Copied ${hex} (RGB: ${rgb.r}, ${rgb.g}, ${rgb.b})`);
  }

  function toggleFavoriteColor(hex, name, seasonName) {
    const idx = appState.savedColors.findIndex((c) => c.hex.toUpperCase() === hex.toUpperCase());
    if (idx >= 0) {
      appState.savedColors.splice(idx, 1);
      showToast(`Removed ${name} from Saved Styles`);
    } else {
      appState.savedColors.unshift({ name, hex, season: seasonName });
      showToast(`Saved ${name} (${hex}) to wardrobe archive`);
    }
    persistState();
    renderActivePage(appState.activePage);
  }

  /* =========================================================================
     13. PAGE 4: CLOTHING COLOR SCANNER & FABRIC CLUSTERING
     ========================================================================= */

  function renderScannerPage() {
    setupDragDropZone('garment-canvas-frame', handleGarmentFile);

    const presetsEl = document.getElementById('scanner-presets');
    if (presetsEl) {
      presetsEl.innerHTML = SCANNER_PRESETS.map((pr) => `
        <button type="button" class="btn-ghost btn-sm" onclick="window.AtelierApp.selectPresetGarment('${pr.hex}', '${pr.name.replace(/'/g, '')}')">
          <span class="inline-block w-3 h-3 border border-black" style="background-color:${pr.hex};"></span>
          <span>${pr.name}</span>
        </button>
      `).join('');
    }

    if (!sessionMedia.currentScan) {
      selectPresetGarment(SCANNER_PRESETS[0].hex, SCANNER_PRESETS[0].name);
    } else {
      drawGarmentCanvas();
      scanHexColor(sessionMedia.currentScan.hex, sessionMedia.currentScan.garment);
    }
  }

  function selectPresetGarment(hex, name) {
    sessionMedia.garmentImg = createDemoGarmentCanvas(hex, name);
    const nameInput = document.getElementById('scanner-garment-name');
    if (nameInput) nameInput.value = name;
    drawGarmentCanvas();
    extractGarmentDominantHues();
    scanHexColor(hex, name);
  }

  function handleGarmentUpload(input) {
    if (!input || !input.files || !input.files[0]) return;
    handleGarmentFile(input.files[0]);
  }

  function handleGarmentFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please upload a valid garment image.');
      return;
    }
    const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    const nameInput = document.getElementById('scanner-garment-name');
    if (nameInput) nameInput.value = cleanName || 'Uploaded Garment';

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = function () {
      sessionMedia.garmentImg = img;
      drawGarmentCanvas();
      extractGarmentDominantHues();
      sampleGarmentAt(220, 150, cleanName);
      URL.revokeObjectURL(url);
      showToast('Garment loaded — click fabric or pick dominant hue');
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      showToast('Unable to decode garment image');
    };
    img.src = url;
  }

  function drawGarmentCanvas() {
    const canvas = document.getElementById('garment-canvas');
    const src = sessionMedia.garmentImg;
    if (!canvas || !src) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#EAE6DF';
    ctx.fillRect(0, 0, w, h);

    const sw = src.width || 440, sh = src.height || 300;
    const scale = Math.min(w / sw, h / sh);
    const dw = Math.round(sw * scale), dh = Math.round(sh * scale);
    const dx = Math.round((w - dw) / 2), dy = Math.round((h - dh) / 2);
    ctx.drawImage(src, dx, dy, dw, dh);
  }

  function handleGarmentCanvasClick(event) {
    const canvas = document.getElementById('garment-canvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.round((event.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.round((event.clientY - rect.top) * (canvas.height / rect.height));
    const gName = document.getElementById('scanner-garment-name')?.value || 'Sampled Garment';
    sampleGarmentAt(x, y, gName);
  }

  function handleGarmentMouseMove(event) {
    const canvas = document.getElementById('garment-canvas');
    const loupe = document.getElementById('garment-loupe');
    if (!canvas || !loupe) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.round((event.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.round((event.clientY - rect.top) * (canvas.height / rect.height));

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const pixel = ctx.getImageData(clamp(x, 0, canvas.width - 1), clamp(y, 0, canvas.height - 1), 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);

    loupe.style.display = 'block';
    loupe.style.left = `${event.clientX - rect.left + 15}px`;
    loupe.style.top = `${event.clientY - rect.top + 15}px`;
    loupe.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="w-4 h-4 border border-black inline-block" style="background-color:${hex};"></span>
        <span>${hex} · RGB(${pixel[0]},${pixel[1]},${pixel[2]})</span>
      </div>
    `;
  }

  function hideGarmentLoupe() {
    const loupe = document.getElementById('garment-loupe');
    if (loupe) loupe.style.display = 'none';
  }

  function sampleGarmentAt(x, y, label) {
    const canvas = document.getElementById('garment-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const px = clamp(x - 4, 0, canvas.width - 8);
    const py = clamp(y - 4, 0, canvas.height - 8);
    const patch = ctx.getImageData(px, py, 8, 8).data;
    let r = 0, g = 0, b = 0, cnt = 0;
    for (let i = 0; i < patch.length; i += 4) {
      r += patch[i]; g += patch[i + 1]; b += patch[i + 2]; cnt++;
    }
    const hex = rgbToHex(r / cnt, g / cnt, b / cnt);
    drawGarmentCanvas();

    // Sampler reticle
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x - 8, y - 8, 16, 16);

    scanHexColor(hex, label);
  }

  function handleScannerHexInput(val) {
    const clean = val.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(clean)) {
      const gName = document.getElementById('scanner-garment-name')?.value || 'Custom Garment';
      scanHexColor(clean.toUpperCase(), gName);
    }
  }

  function extractGarmentDominantHues() {
    const canvas = document.getElementById('garment-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const w = canvas.width, h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h).data;

    const samplePixels = [];
    for (let i = 0; i < imgData.length; i += 32) {
      const r = imgData[i], g = imgData[i + 1], b = imgData[i + 2];
      // Skip background frame greys
      const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      if (diff > 8 || (r < 235 && r > 25)) {
        samplePixels.push({ r, g, b });
      }
    }

    const clusters = runKMeansRGB(samplePixels, 4, 6);
    sessionMedia.dominantGarmentHues = clusters;

    const swatchesEl = document.getElementById('garment-dominant-swatches');
    if (swatchesEl) {
      swatchesEl.innerHTML = clusters.map((c) => {
        const hex = rgbToHex(c.r, c.g, c.b);
        return `
          <button type="button" class="btn-ghost btn-sm" onclick="window.AtelierApp.scanHexColor('${hex}', 'Dominant Cluster')">
            <span class="w-3.5 h-3.5 border border-black inline-block" style="background-color:${hex};"></span>
            <span class="mono">${hex} (${c.share}%)</span>
          </button>
        `;
      }).join('');
    }
  }

  function scanHexColor(hex, garmentLabel) {
    const normHex = hex.toUpperCase();
    const picker = document.getElementById('scanner-color-picker');
    const hexInput = document.getElementById('scanner-hex-input');
    if (picker) picker.value = normHex.toLowerCase();
    if (hexInput && document.activeElement !== hexInput) hexInput.value = normHex;

    const sObj = SEASONS_DB[appState.profile.season] || SEASONS_DB['Soft Autumn'];
    const targetRgb = hexToRgb(normHex);
    const targetLab = rgbToLab(targetRgb.r, targetRgb.g, targetRgb.b);
    const targetHsl = rgbToHsl(targetRgb.r, targetRgb.g, targetRgb.b);

    const allPalette = [...sObj.neutrals, ...sObj.accents];
    const ranked = allPalette.map((item) => {
      const rgb = hexToRgb(item.hex);
      const lab = rgbToLab(rgb.r, rgb.g, rgb.b);
      const de = labDeltaE(targetLab, lab);
      return { ...item, deltaE: Number(de.toFixed(1)) };
    }).sort((a, b) => a.deltaE - b.deltaE);

    const avoidRanked = sObj.avoid.map((item) => {
      const rgb = hexToRgb(item.hex);
      const lab = rgbToLab(rgb.r, rgb.g, rgb.b);
      return { ...item, deltaE: Number(labDeltaE(targetLab, lab).toFixed(1)) };
    }).sort((a, b) => a.deltaE - b.deltaE);

    const best = ranked[0];
    const closestAvoid = avoidRanked[0];

    // CIELAB compatibility calculation
    let score = clamp(Math.round(100 - best.deltaE * 1.85), 18, 99);
    let verdict = 'Harmonic Match';
    let badgeClass = 'status-positive';
    let advice = `Excellent harmony for ${appState.profile.season}. Its temperature and chroma coordinate tightly with ${best.name} (${best.hex}), brightening your natural undertone.`;

    if (closestAvoid && closestAvoid.deltaE < 14 && closestAvoid.deltaE < best.deltaE) {
      score = Math.min(score, 42);
      verdict = 'Palette Clash (Avoid Near Face)';
      badgeClass = 'status-error';
      advice = `Close to your avoid shade "${closestAvoid.name}" (ΔE ${closestAvoid.deltaE}) — ${closestAvoid.reason}. If you love this piece, wear it as trousers, skirt, or bag, or buffer your neckline with an ${sObj.neutrals[0].name} scarf.`;
    } else if (score < 70) {
      verdict = 'Acceptable Accent';
      badgeClass = 'status-warning';
      advice = `Moderately distant (ΔE ${best.deltaE}) from ${best.name}. Pair with ${sObj.accents[0].name} knitwear or ${sObj.metals.split('&')[0].trim()} jewelry to pull the outfit into balance.`;
    }

    sessionMedia.currentScan = {
      garment: garmentLabel || document.getElementById('scanner-garment-name')?.value || 'Scanned Garment',
      hex: normHex,
      score,
      verdict,
      nearestName: best.name,
      nearestHex: best.hex,
      deltaE: best.deltaE
    };

    // Update UI
    const badge = document.getElementById('scan-verdict-badge');
    if (badge) {
      badge.textContent = verdict;
      badge.className = `status-badge ${badgeClass}`;
    }
    const scoreEl = document.getElementById('scan-score-value');
    if (scoreEl) scoreEl.textContent = `${score}%`;
    const deltaEl = document.getElementById('scan-delta-label');
    if (deltaEl) deltaEl.textContent = `CIELAB ΔE = ${best.deltaE} · Nearest: ${best.name}`;

    const sBox = document.getElementById('scan-sample-box');
    if (sBox) sBox.style.backgroundColor = normHex;
    const sHex = document.getElementById('scan-sample-hex');
    if (sHex) sHex.textContent = normHex;

    const nBox = document.getElementById('scan-nearest-box');
    if (nBox) nBox.style.backgroundColor = best.hex;
    const nName = document.getElementById('scan-nearest-name');
    if (nName) nName.textContent = `${best.name} · ${best.hex}`;

    // Telemetry updates
    const tRgb = document.getElementById('scan-telem-rgb');
    if (tRgb) tRgb.textContent = `${normHex} · RGB(${targetRgb.r}, ${targetRgb.g}, ${targetRgb.b})`;
    const tHsl = document.getElementById('scan-telem-hsl');
    if (tHsl) tHsl.textContent = `H: ${targetHsl.h}° · S: ${targetHsl.s}% · L: ${targetHsl.l}%`;
    const tLab = document.getElementById('scan-telem-lab');
    if (tLab) tLab.textContent = `L* ${targetLab.L} · a* ${targetLab.a} · b* ${targetLab.b}`;

    const advEl = document.getElementById('scan-advice-text');
    if (advEl) advEl.textContent = advice;

    const topEl = document.getElementById('scan-top-matches');
    if (topEl) {
      topEl.innerHTML = ranked.slice(0, 3).map((m) => `
        <div class="ruled-stone">
          <div class="w-full h-10 border border-[var(--outline-variant)]" style="background-color:${m.hex};"></div>
          <div class="text-xs font-medium mt-1">${m.name}</div>
          <div class="mono text-xs text-[var(--on-surface-variant)]">${m.hex} · ΔE ${m.deltaE}</div>
        </div>
      `).join('');
    }
  }

  function saveCurrentScan() {
    const s = sessionMedia.currentScan;
    if (!s) return;
    const nameVal = document.getElementById('scanner-garment-name')?.value?.trim() || s.garment;
    const record = {
      ...s,
      garment: nameVal,
      id: `scan-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10)
    };
    appState.scanHistory.unshift(record);
    persistState();
    showToast(`Saved "${nameVal}" (${s.score}%) to Scan Log`);
  }

  function drapeScannedColor() {
    const s = sessionMedia.currentScan;
    if (!s) return;
    const nameVal = document.getElementById('scanner-garment-name')?.value?.trim() || s.garment;
    drapeColor(s.hex, nameVal);
  }

  /* =========================================================================
     14. PAGE 5: OUTFIT RECOMMENDATIONS CONTROLLER
     ========================================================================= */

  function setOutfitOccasion(occ) {
    appState.outfitOccasion = occ;
    document.querySelectorAll('[data-occ]').forEach((b) => {
      b.classList.toggle('active-filter', b.dataset.occ === occ);
    });
    renderOutfits();
  }

  function setOutfitHarmony(harm) {
    appState.outfitHarmony = harm;
    document.querySelectorAll('[data-harmony]').forEach((b) => {
      b.classList.toggle('active-filter', b.dataset.harmony === harm);
    });
    renderOutfits();
  }

  function handleOutfitSearch(query) {
    appState.outfitSearch = (query || '').toLowerCase().trim();
    renderOutfits();
  }

  function renderOutfits() {
    const grid = document.getElementById('outfits-grid');
    if (!grid) return;

    const occ = appState.outfitOccasion || 'all';
    const sil = document.getElementById('outfit-silhouette-filter')?.value || 'all';
    const harm = appState.outfitHarmony || 'all';
    const q = appState.outfitSearch || '';
    const sObj = SEASONS_DB[appState.profile.season] || SEASONS_DB['Soft Autumn'];

    const filtered = OUTFITS_CATALOG.filter((o) => {
      const occMatch = occ === 'all' || o.occasion === occ;
      const silMatch = sil === 'all' || o.silhouette === sil;
      const harmMatch = harm === 'all' || o.harmony === harm;
      const searchMatch = !q || o.title.toLowerCase().includes(q) || o.fabric.toLowerCase().includes(q) || o.note.toLowerCase().includes(q);
      return occMatch && silMatch && harmMatch && searchMatch;
    });

    if (!filtered.length) {
      grid.innerHTML = `
        <div class="panel-stone col-span-full">
          <p class="m-0 text-sm text-[var(--on-surface-variant)]">No outfits match that combination of filters. Try switching occasion, harmony, or clearing search query.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((o) => {
      const topColor = sObj.neutrals[o.topIdx % sObj.neutrals.length];
      const layerColor = o.layerIdx !== null ? sObj.neutrals[o.layerIdx % sObj.neutrals.length] : null;
      const bottomColor = sObj.neutrals[o.bottomIdx % sObj.neutrals.length];
      const accentColor = sObj.accents[o.accentIdx % sObj.accents.length];
      const isSaved = appState.savedOutfits.includes(o.id);

      return `
        <article class="ruled-top flex flex-col justify-between gap-4">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="tag-taupe">${o.occasion} · ${o.silhouette}</span>
              <span class="status-badge status-neutral">${o.harmony}</span>
            </div>

            <!-- Flat-Lay SVG Diagram -->
            <div class="p-4 bg-[var(--surface-container-low)] border border-[var(--outline-variant)]">
              <svg viewBox="0 0 260 150" width="100%" height="150" aria-hidden="true">
                <!-- Shirt / Top -->
                <path d="M40 25 L68 18 L82 28 L96 18 L124 25 L134 58 L114 64 L110 44 L110 112 L54 112 L54 44 L50 64 L30 58 Z" fill="${topColor.hex}" stroke="#111111" stroke-width="1"/>
                ${layerColor ? `<path d="M56 22 L76 22 L82 65 L88 22 L108 22 L114 116 L50 116 Z" fill="${layerColor.hex}" fill-opacity="0.85" stroke="#111111" stroke-width="1"/>` : ''}
                <!-- Trousers / Bottom -->
                <path d="M150 25 L208 25 L216 128 L184 128 L179 68 L174 128 L142 128 Z" fill="${bottomColor.hex}" stroke="#111111" stroke-width="1"/>
                <!-- Accent Scarf / Bag -->
                <rect x="224" y="45" width="24" height="32" fill="${accentColor.hex}" stroke="#111111" stroke-width="1"/>
                <path d="M229 45 Q236 30 243 45" fill="none" stroke="#111111" stroke-width="1.2"/>
              </svg>
            </div>

            <h3 class="subhead mt-4">${o.title}</h3>
            <p class="text-sm text-[var(--on-surface-variant)] mt-1">${o.note}</p>

            <div class="mt-3 space-y-1 text-xs">
              <div><span class="label text-[var(--on-surface-variant)]">Fabrics:</span> ${o.fabric}</div>
              <div class="flex flex-wrap items-center gap-2 pt-1">
                <span class="inline-flex items-center gap-1"><span class="w-3 h-3 border border-black inline-block" style="background-color:${topColor.hex};"></span> ${topColor.name}</span>
                ${layerColor ? `<span class="inline-flex items-center gap-1"><span class="w-3 h-3 border border-black inline-block" style="background-color:${layerColor.hex};"></span> ${layerColor.name}</span>` : ''}
                <span class="inline-flex items-center gap-1"><span class="w-3 h-3 border border-black inline-block" style="background-color:${bottomColor.hex};"></span> ${bottomColor.name}</span>
                <span class="inline-flex items-center gap-1"><span class="w-3 h-3 border border-black inline-block" style="background-color:${accentColor.hex};"></span> ${accentColor.name}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 pt-2">
            <button type="button" class="${isSaved ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="window.AtelierApp.toggleSaveOutfit('${o.id}')">
              <i data-lucide="bookmark" class="w-3.5 h-3.5" aria-hidden="true"></i>
              <span>${isSaved ? 'Saved in Archive' : 'Save Outfit'}</span>
            </button>
            <button type="button" class="btn-ghost btn-sm" onclick="window.AtelierApp.drapeColor('${accentColor.hex}', '${accentColor.name.replace(/'/g, '')}')">Drape Accent</button>
          </div>
        </article>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function toggleSaveOutfit(outfitId) {
    const idx = appState.savedOutfits.indexOf(outfitId);
    if (idx >= 0) {
      appState.savedOutfits.splice(idx, 1);
      showToast('Removed outfit from wardrobe archive');
    } else {
      appState.savedOutfits.unshift(outfitId);
      showToast('Saved outfit to your wardrobe archive');
    }
    persistState();
    renderOutfits();
  }

  /* =========================================================================
     15. PAGE 6: FABRIC & TEXTURE GUIDE CONTROLLER
     ========================================================================= */

  function setFabricFilter(f) {
    appState.fabricFilter = f;
    document.querySelectorAll('[data-fab]').forEach((b) => {
      b.classList.toggle('active-filter', b.dataset.fab === f);
    });
    renderFabrics();
  }

  function handleFabricSearch(query) {
    appState.fabricSearch = (query || '').toLowerCase().trim();
    renderFabrics();
  }

  function renderFabrics() {
    const grid = document.getElementById('fabrics-grid');
    if (!grid) return;

    const filter = appState.fabricFilter || 'all';
    const q = appState.fabricSearch || '';
    const userSeason = appState.profile.season;

    const list = FABRICS_DATA.filter((f) => {
      if (filter === 'recommended' && !f.bestSeasons.includes(userSeason)) return false;
      if (filter === 'matte' && f.category !== 'matte') return false;
      if (filter === 'luminous' && f.category !== 'luminous') return false;
      if (filter === 'smooth' && f.texture !== 'smooth') return false;
      if (filter === 'textured' && f.texture !== 'textured') return false;
      if (filter === 'warm' && f.weather !== 'warm' && f.weather !== 'all-season') return false;
      if (filter === 'cold' && f.weather !== 'cold' && f.weather !== 'all-season') return false;

      if (q) {
        const text = `${f.name} ${f.summary} ${f.pairings} ${f.drape} ${f.luster}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });

    const countBadge = document.getElementById('fabric-count-badge');
    if (countBadge) {
      countBadge.textContent = `Showing ${list.length} of ${FABRICS_DATA.length} Textiles`;
    }

    if (!list.length) {
      grid.innerHTML = `
        <div class="panel-stone col-span-full">
          <p class="m-0 text-sm text-[var(--on-surface-variant)]">No textiles match that filter criteria. Try clicking "All Textiles" or clearing the search field.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map((f) => {
      const isIdeal = f.bestSeasons.includes(userSeason);
      return `
        <article class="ruled-top flex flex-col justify-between gap-4">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="tag-taupe">${f.luster}</span>
              <span class="status-badge ${isIdeal ? 'status-positive' : 'status-neutral'}">${isIdeal ? `Ideal for ${userSeason}` : 'Selective Fit'}</span>
            </div>

            <!-- SVG Weave Diagram -->
            <div class="p-3 bg-[var(--surface-container-low)] border border-[var(--outline-variant)]">
              ${renderFabricWeaveSvg(f.weaveType)}
            </div>

            <h3 class="subhead mt-4">${f.name}</h3>
            <p class="text-sm text-[var(--on-surface-variant)] mt-2">${f.summary}</p>
          </div>

          <div class="ruled-stone text-xs space-y-1.5">
            <div><span class="label text-[var(--on-surface-variant)]">Drape &amp; Weight:</span> ${f.drape} · ${f.weight}</div>
            <div><span class="label text-[var(--on-surface-variant)]">Pairings:</span> ${f.pairings}</div>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderFabricWeaveSvg(weaveType) {
    let pattern = '';
    if (weaveType === 'twill') {
      pattern = '<path d="M0 10 L10 0 M0 20 L20 0 M0 30 L30 0 M10 30 L30 10 M20 30 L30 20" stroke="#7A5C48" stroke-width="1.4"/>';
    } else if (weaveType === 'satin') {
      pattern = '<path d="M0 6 H30 M0 16 H30 M0 26 H30" stroke="#111111" stroke-width="1.8" stroke-dasharray="18 4"/><path d="M8 0 V30 M22 0 V30" stroke="#A89C8C" stroke-width="0.9"/>';
    } else if (weaveType === 'slub') {
      pattern = '<path d="M0 8 H30 M0 18 H30 M0 27 H30" stroke="#7A5C48" stroke-width="1.3"/><path d="M6 0 V30 M16 0 V30 M25 0 V30" stroke="#5B5752" stroke-width="1.1" stroke-dasharray="9 3"/>';
    } else if (weaveType === 'sheer') {
      pattern = '<path d="M0 10 H30 M0 22 H30 M10 0 V30 M22 0 V30" stroke="#A89C8C" stroke-width="0.8"/>';
    } else if (weaveType === 'pile') {
      pattern = '<path d="M4 30 V8 M12 30 V6 M20 30 V8 M28 30 V6" stroke="#2B1F23" stroke-width="2"/><circle cx="12" cy="5" r="1.5" fill="#5B5752"/><circle cx="28" cy="5" r="1.5" fill="#5B5752"/>';
    } else if (weaveType === 'herringbone') {
      pattern = '<path d="M0 8 L15 0 L30 8 M0 22 L15 14 L30 22" stroke="#5B5752" stroke-width="1.3" fill="none"/>';
    } else if (weaveType === 'leather') {
      pattern = '<path d="M5 5 Q15 2 25 5 Q28 15 25 25 Q15 28 5 25 Q2 15 5 5 Z" stroke="#7A5C48" stroke-width="0.8" fill="rgba(122,92,72,0.12)"/>';
    } else {
      pattern = '<path d="M0 7 H30 M0 15 H30 M0 23 H30 M7 0 V30 M15 0 V30 M23 0 V30" stroke="#5B5752" stroke-width="1"/>';
    }
    const patId = `pat-${weaveType}-${Math.floor(Math.random() * 1000)}`;
    return `
      <svg viewBox="0 0 240 68" width="100%" height="68" aria-hidden="true">
        <defs>
          <pattern id="${patId}" width="30" height="30" patternUnits="userSpaceOnUse">${pattern}</pattern>
        </defs>
        <rect width="240" height="68" fill="url(#${patId})" opacity="0.88"/>
      </svg>
    `;
  }

  /* =========================================================================
     16. PAGE 7: SAVED STYLES & ARCHIVE CONTROLLER
     ========================================================================= */

  function renderSavedStyles() {
    const colorsEl = document.getElementById('saved-colors-container');
    const outfitsEl = document.getElementById('saved-outfits-container');
    const scansEl = document.getElementById('saved-scans-container');
    const countEl = document.getElementById('saved-scans-count');

    if (countEl) {
      countEl.textContent = `${appState.scanHistory.length} Recorded`;
    }

    if (colorsEl) {
      if (!appState.savedColors.length) {
        colorsEl.innerHTML = `
          <div class="panel-stone">
            <p class="m-0 text-sm text-[var(--on-surface-variant)]">No favorite color swatches saved yet. Heart any swatch inside My Color Palette to build your curated wardrobe card.</p>
          </div>
        `;
      } else {
        colorsEl.innerHTML = `
          <div class="swatch-grid">
            ${appState.savedColors.map((c) => renderSwatchCardHtml(c, c.season || appState.profile.season)).join('')}
          </div>
        `;
      }
    }

    if (outfitsEl) {
      const sObj = SEASONS_DB[appState.profile.season] || SEASONS_DB['Soft Autumn'];
      const savedList = OUTFITS_CATALOG.filter((o) => appState.savedOutfits.includes(o.id));
      if (!savedList.length) {
        outfitsEl.innerHTML = `
          <div class="panel-stone">
            <p class="m-0 text-sm text-[var(--on-surface-variant)]">No outfits saved yet. Explore Outfit Recommendations to bookmark looks for work, formal galas, or weekend studio wear.</p>
          </div>
        `;
      } else {
        outfitsEl.innerHTML = `
          <div class="card-grid">
            ${savedList.map((o) => {
              const topC = sObj.neutrals[o.topIdx % sObj.neutrals.length];
              const botC = sObj.neutrals[o.bottomIdx % sObj.neutrals.length];
              const accC = sObj.accents[o.accentIdx % sObj.accents.length];
              return `
                <div class="ruled-stone flex flex-col justify-between gap-3">
                  <div>
                    <span class="tag-taupe">${o.occasion} · ${o.silhouette}</span>
                    <h3 class="subhead mt-1">${o.title}</h3>
                    <p class="text-xs text-[var(--on-surface-variant)] mt-1">${o.fabric}</p>
                    <div class="flex gap-2 mt-3">
                      <span class="w-6 h-6 border border-black" style="background-color:${topC.hex};" title="${topC.name}"></span>
                      <span class="w-6 h-6 border border-black" style="background-color:${botC.hex};" title="${botC.name}"></span>
                      <span class="w-6 h-6 border border-black" style="background-color:${accC.hex};" title="${accC.name}"></span>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button type="button" class="btn-ghost btn-sm" onclick="window.AtelierApp.removeSavedOutfit('${o.id}')">Remove</button>
                    <button type="button" class="btn-ghost btn-sm" onclick="window.AtelierApp.drapeColor('${accC.hex}', '${accC.name.replace(/'/g, '')}')">Drape Look</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }
    }

    if (scansEl) {
      if (!appState.scanHistory.length) {
        scansEl.innerHTML = `
          <div class="panel-stone">
            <p class="m-0 text-sm text-[var(--on-surface-variant)]">Your clothing color scan log is empty. Use the Clothing Color Scanner to evaluate in-store garments before purchasing.</p>
          </div>
        `;
      } else {
        scansEl.innerHTML = `
          <div class="overflow-x-auto">
            <table class="atelier-table">
              <thead>
                <tr>
                  <th>Swatch</th>
                  <th>Garment</th>
                  <th>Match</th>
                  <th>Verdict</th>
                  <th>Nearest Shade</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${appState.scanHistory.map((item) => `
                  <tr>
                    <td><span class="inline-block w-7 h-7 border border-black" style="background-color:${item.hex};"></span></td>
                    <td>
                      <div class="text-sm font-medium">${item.garment}</div>
                      <div class="mono text-xs text-[var(--on-surface-variant)]">${item.hex} · ${item.date || ''}</div>
                    </td>
                    <td class="mono font-medium">${item.score}%</td>
                    <td><span class="status-badge ${item.score >= 70 ? 'status-positive' : (item.score >= 45 ? 'status-warning' : 'status-error')}">${item.verdict}</span></td>
                    <td class="text-sm">${item.nearestName} <span class="mono text-xs text-[var(--on-surface-variant)]">(ΔE ${item.deltaE})</span></td>
                    <td>
                      <div class="flex items-center gap-2">
                        <button type="button" class="btn-ghost btn-sm" onclick="window.AtelierApp.drapeColor('${item.hex}', '${item.garment.replace(/'/g, '')}')">Drape</button>
                        <button type="button" class="btn-ghost btn-sm" onclick="window.AtelierApp.deleteScanRecord('${item.id}')">Delete</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function removeSavedOutfit(id) {
    appState.savedOutfits = appState.savedOutfits.filter((o) => o !== id);
    persistState();
    renderSavedStyles();
    showToast('Removed saved outfit from archive');
  }

  function deleteScanRecord(id) {
    appState.scanHistory = appState.scanHistory.filter((s) => s.id !== id);
    persistState();
    renderSavedStyles();
    showToast('Scan record deleted');
  }

  function confirmClearHistory() {
    showAtelierModal(
      'Clear Scan History Log',
      'Are you sure you want to delete all saved in-store clothing scan records? This action cannot be undone.',
      () => {
        appState.scanHistory = [];
        persistState();
        renderSavedStyles();
        showToast('Clothing scan history cleared');
      }
    );
  }

  /* =========================================================================
     17. PAGE 8: PROFILE & SETTINGS CONTROLLER
     ========================================================================= */

  function renderProfilePage() {
    const p = appState.profile;
    const setVal = (id, v) => {
      const el = document.getElementById(id);
      if (el) el.value = v;
    };
    setVal('profile-name', p.name);
    setVal('profile-undertone', p.undertone);
    setVal('profile-depth', p.depth);
    setVal('profile-silhouette', p.silhouette || 'all');

    const oliveEl = document.getElementById('profile-olive');
    if (oliveEl) oliveEl.checked = Boolean(p.isOlive);

    syncSeasonOptionsForProfile(p.season);

    const tBody = document.getElementById('profile-telemetry-body');
    if (tBody) {
      const lab = p.skinLab || { L: 71.4, a: 11.2, b: 21.8 };
      const rgb = p.skinRgb || { r: 210, g: 166, b: 132 };
      tBody.innerHTML = `
        <tr><td>Active Season</td><td class="font-medium">${p.season}</td></tr>
        <tr><td>Undertone / Olive</td><td>${p.undertone}${p.isOlive ? ' (Olive Cast)' : ''}</td></tr>
        <tr><td>Dominant Skin Tone</td><td class="mono">${p.skinHex}</td></tr>
        <tr><td>Color Space Coordinates</td><td class="mono">RGB(${rgb.r},${rgb.g},${rgb.b}) · L*${lab.L} a*${lab.a} b*${lab.b}</td></tr>
        <tr><td>Confidence Metric</td><td class="mono">${p.confidence || 91}%</td></tr>
        <tr><td>Analysis Provenance</td><td class="text-sm text-[var(--on-surface-variant)]">${p.analysisSource}</td></tr>
      `;
    }
  }

  function syncSeasonOptionsForProfile(preferredSeason) {
    const sel = document.getElementById('profile-season');
    if (!sel) return;
    const allSeasons = [
      'Light Spring', 'Warm Spring', 'Clear Spring',
      'Light Summer', 'Cool Summer', 'Soft Summer',
      'Soft Autumn', 'Warm Autumn', 'Deep Autumn',
      'Deep Winter', 'Cool Winter', 'Clear Winter'
    ];
    sel.innerHTML = allSeasons.map((s) => `<option value="${s}">${s} (${SEASONS_DB[s].undertone})</option>`).join('');
    sel.value = preferredSeason || appState.profile.season;
  }

  function saveProfileForm(event) {
    if (event) event.preventDefault();
    const nameInput = document.getElementById('profile-name');
    const undertoneInput = document.getElementById('profile-undertone');
    const depthInput = document.getElementById('profile-depth');
    const seasonInput = document.getElementById('profile-season');
    const silInput = document.getElementById('profile-silhouette');
    const oliveInput = document.getElementById('profile-olive');

    appState.profile.name = nameInput?.value?.trim() || 'Elena Vance';
    appState.profile.undertone = undertoneInput?.value || 'Warm';
    appState.profile.depth = depthInput?.value || 'Medium';
    appState.profile.season = seasonInput?.value || 'Soft Autumn';
    appState.profile.silhouette = silInput?.value || 'all';
    appState.profile.isOlive = Boolean(oliveInput?.checked);
    appState.profile.analysisSource = 'Manual Profile Setting';

    sessionMedia.browsedSeason = appState.profile.season;
    updateHeaderBadge();
    persistState();
    renderProfilePage();
    showToast('Profile settings saved successfully');
  }

  function handleResetWorkspace(btn) {
    if (!btn) return;
    if (btn.dataset.armed !== 'true') {
      btn.dataset.armed = 'true';
      btn.textContent = 'Confirm Reset: Click Again';
      setTimeout(() => {
        if (btn.dataset.armed === 'true') {
          btn.dataset.armed = 'false';
          btn.textContent = 'Reset All Saved Data';
        }
      }, 4500);
      return;
    }
    btn.dataset.armed = 'false';
    btn.textContent = 'Reset All Saved Data';
    appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    sessionMedia.browsedSeason = appState.profile.season;
    sessionMedia.activeDrapeHex = SEASONS_DB[appState.profile.season].accents[0].hex;
    sessionMedia.activeDrapeName = SEASONS_DB[appState.profile.season].accents[0].name;
    persistState();
    renderActivePage(appState.activePage);
    updateHeaderBadge();
    showToast('Workspace reset to factory default baseline');
  }

  /* =========================================================================
     18. IMPORT & EXPORT: JSON DOSSIER & TXT REPORT
     ========================================================================= */

  function exportDossierJson() {
    const exportPayload = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      profile: appState.profile,
      savedColors: appState.savedColors,
      savedOutfits: appState.savedOutfits,
      scanHistory: appState.scanHistory,
      seasonDetails: SEASONS_DB[appState.profile.season]
    };

    const jsonStr = JSON.stringify(exportPayload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `atelier-chroma-${appState.profile.season.toLowerCase().replace(/\s+/g, '-')}-dossier.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast('Exported complete style dossier (JSON)');
  }

  function exportDossier() {
    exportDossierText();
  }

  function exportDossierText() {
    const p = appState.profile;
    const sObj = SEASONS_DB[p.season] || SEASONS_DB['Soft Autumn'];
    const lines = [
      `===================================================================`,
      `ATELIER CHROMA — PERSONAL COLOR & STYLE DOSSIER`,
      `Armocromia & Wardrobe Studio Architecture`,
      `===================================================================`,
      `Client Name: ${p.name}`,
      `Export Date: ${new Date().toISOString().slice(0, 10)}`,
      `Active Season: ${p.season}`,
      `Skin Undertone: ${p.undertone}${p.isOlive ? ' (Olive Nuance)' : ''}`,
      `Surface Depth: ${p.depth}`,
      `Dominant Tone: ${p.skinHex}`,
      `Confidence: ${p.confidence || 91}%`,
      `Analysis Source: ${p.analysisSource}`,
      ``,
      `BEAUTY & METALS SPECIFICATIONS:`,
      `  - Recommended Metals: ${sObj.metals}`,
      `  - Ideal Whites: ${sObj.whites}`,
      `  - Foundation Formula: ${sObj.makeup.foundation}`,
      `  - Blush & Lip: ${sObj.makeup.blush} | ${sObj.makeup.lip}`,
      `  - Eye & Hair: ${sObj.makeup.eye} | ${sObj.makeup.hair}`,
      ``,
      `POWER NEUTRALS (WARDROBE FOUNDATIONS):`,
      ...sObj.neutrals.map((c) => `  - ${c.name.padEnd(24)} ${c.hex}`),
      ``,
      `SIGNATURE & STATEMENT ACCENTS:`,
      ...sObj.accents.map((c) => `  - ${c.name.padEnd(24)} ${c.hex}`),
      ``,
      `COLORS TO AVOID NEAR THE JAWLINE:`,
      ...sObj.avoid.map((c) => `  - ${c.name.padEnd(24)} ${c.hex} -> ${c.reason}`),
      ``,
      `SAVED FAVORITE SWATCHES (${appState.savedColors.length}):`,
      ...appState.savedColors.map((c) => `  - ${c.name.padEnd(24)} ${c.hex} (${c.season || 'Palette'})`),
      ``,
      `CLOTHING COLOR SCAN LOG (${appState.scanHistory.length} ENTRIES):`,
      ...appState.scanHistory.map((s) => `  - [${s.score}% Match] ${s.garment.padEnd(26)} ${s.hex} -> ${s.verdict}`),
      `===================================================================`
    ];

    const textContent = lines.join('\n');
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `atelier-chroma-dossier-${p.season.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast('Exported style dossier (.txt)');
  }

  function importDossierJson(input) {
    if (!input || !input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed || typeof parsed !== 'object') {
          showToast('Invalid JSON file format');
          return;
        }

        if (parsed.profile) {
          appState.profile = { ...DEFAULT_STATE.profile, ...parsed.profile };
        }
        if (Array.isArray(parsed.savedColors)) {
          appState.savedColors = parsed.savedColors;
        }
        if (Array.isArray(parsed.savedOutfits)) {
          appState.savedOutfits = parsed.savedOutfits;
        }
        if (Array.isArray(parsed.scanHistory)) {
          appState.scanHistory = parsed.scanHistory;
        }

        sessionMedia.browsedSeason = appState.profile.season;
        persistState();
        renderActivePage(appState.activePage);
        updateHeaderBadge();
        showToast('Successfully imported style dossier backup');
      } catch (err) {
        console.error('Import parse error:', err);
        showToast('Failed to parse JSON file');
      }
    };
    reader.readAsText(file);
    input.value = '';
  }

  /* =========================================================================
     19. MODAL & DRAG-AND-DROP HELPERS
     ========================================================================= */

  let modalCallback = null;

  function showAtelierModal(title, desc, onConfirm) {
    const modal = document.getElementById('atelier-modal');
    const titleEl = document.getElementById('modal-title');
    const descEl = document.getElementById('modal-desc');
    const confirmBtn = document.getElementById('modal-confirm-btn');
    if (!modal) return;

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    modalCallback = onConfirm;

    if (confirmBtn) {
      confirmBtn.onclick = () => {
        if (typeof modalCallback === 'function') modalCallback();
        closeAtelierModal();
      };
    }

    modal.classList.add('is-open');
  }

  function closeAtelierModal() {
    const modal = document.getElementById('atelier-modal');
    if (modal) modal.classList.remove('is-open');
    modalCallback = null;
  }

  function setupDragDropZone(frameId, onFileDrop) {
    const frame = document.getElementById(frameId);
    if (!frame || frame.__dragSetupDone) return;
    frame.__dragSetupDone = true;

    ['dragenter', 'dragover'].forEach((eventName) => {
      frame.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        frame.classList.add('drag-over');
      }, false);
    });

    ['dragleave', 'drop'].forEach((eventName) => {
      frame.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        frame.classList.remove('drag-over');
      }, false);
    });

    frame.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files[0]) {
        onFileDrop(dt.files[0]);
      }
    }, false);
  }

  /* =========================================================================
     20. BOOTSTRAP APPLICATION
     ========================================================================= */

  function initApp() {
    loadPersistedState();
    sessionMedia.browsedSeason = appState.profile.season || 'Soft Autumn';
    const sObj = SEASONS_DB[sessionMedia.browsedSeason] || SEASONS_DB['Soft Autumn'];
    sessionMedia.activeDrapeHex = sObj.accents[0].hex;
    sessionMedia.activeDrapeName = sObj.accents[0].name;

    navigateTo(appState.activePage || 'dashboard');

    if (window.notebookAppApi && typeof window.notebookAppApi.notifyAppReady === 'function') {
      window.notebookAppApi.notifyAppReady();
    }
  }

  // Export functions to global scope for HTML onclick bindings
  window.AtelierApp = {
    navigateTo,
    toggleMobileNav,
    setAnalysisMode,
    loadDemoPortrait,
    handleSelfieUpload,
    handleSelfieCanvasClick,
    setCvLayer,
    applyCvResultToProfile,
    drapeDetectedSkinTone,
    evaluateGuidedQuiz,
    applyQuizResultToProfile,
    handleSeasonBrowse,
    setActiveSeasonAsMine,
    drapeColor,
    toggleDrapeCompare,
    copyHex,
    toggleFavoriteColor,
    selectPresetGarment,
    handleGarmentUpload,
    handleGarmentCanvasClick,
    handleGarmentMouseMove,
    hideGarmentLoupe,
    handleScannerHexInput,
    scanHexColor,
    extractGarmentDominantHues,
    saveCurrentScan,
    drapeScannedColor,
    setOutfitOccasion,
    setOutfitHarmony,
    handleOutfitSearch,
    renderOutfits,
    toggleSaveOutfit,
    setFabricFilter,
    handleFabricSearch,
    removeSavedOutfit,
    deleteScanRecord,
    confirmClearHistory,
    syncSeasonOptionsForProfile,
    saveProfileForm,
    exportDossier,
    exportDossierText,
    exportDossierJson,
    importDossierJson,
    handleResetWorkspace,
    closeAtelierModal
  };

  // Bridge top-level onclick functions to AtelierApp
  Object.keys(window.AtelierApp).forEach((fnName) => {
    window[fnName] = window.AtelierApp[fnName];
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
