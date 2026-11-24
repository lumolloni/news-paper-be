export interface Localized {
  en: string;
  sq: string;
}

export interface SeedSubcategory {
  slug: string;
  name: Localized;
  description: Localized;
}

export interface SeedCategory {
  slug: string;
  color: string;
  name: Localized;
  description: Localized;
  subcategories: SeedSubcategory[];
}

export interface SeedAuthor {
  name: string;
  slug: string;
  role: string;
  bio: string;
}

export interface SeedArticle {
  slug: string;
  categorySlug: string;
  subcategorySlug: string;
  authorSlug: string;
  tags: string[];
  featured?: boolean;
  breaking?: boolean;
  videoUrl?: string;
  title: Localized;
  excerpt: Localized;
  paragraphs: { en: string[]; sq: string[] };
}

export const categories: SeedCategory[] = [
  {
    slug: 'world',
    color: '#2563eb',
    name: { en: 'World', sq: 'Bota' },
    description: {
      en: 'Global affairs, conflicts and diplomacy.',
      sq: 'Çështje globale, konflikte dhe diplomaci.',
    },
    subcategories: [
      {
        slug: 'diplomacy',
        name: { en: 'Diplomacy', sq: 'Diplomacia' },
        description: {
          en: 'International negotiations and relations between states.',
          sq: 'Negociatat ndërkombëtare dhe marrëdhëniet midis shteteve.',
        },
      },
      {
        slug: 'climate',
        name: { en: 'Climate', sq: 'Klima' },
        description: {
          en: 'The politics and science of a warming planet.',
          sq: 'Politika dhe shkenca e një planeti që po ngrohet.',
        },
      },
    ],
  },
  {
    slug: 'politics',
    color: '#7c3aed',
    name: { en: 'Politics', sq: 'Politika' },
    description: {
      en: 'Elections, policy and power.',
      sq: 'Zgjedhje, politika dhe pushtet.',
    },
    subcategories: [
      {
        slug: 'elections',
        name: { en: 'Elections', sq: 'Zgjedhjet' },
        description: {
          en: 'Campaigns, candidates and the vote.',
          sq: 'Fushatat, kandidatët dhe votimi.',
        },
      },
      {
        slug: 'policy',
        name: { en: 'Policy', sq: 'Politikat' },
        description: {
          en: 'The decisions that shape public life.',
          sq: 'Vendimet që formësojnë jetën publike.',
        },
      },
    ],
  },
  {
    slug: 'technology',
    color: '#0891b2',
    name: { en: 'Technology', sq: 'Teknologjia' },
    description: {
      en: 'The companies and ideas shaping the future.',
      sq: 'Kompanitë dhe idetë që formësojnë të ardhmen.',
    },
    subcategories: [
      {
        slug: 'ai',
        name: { en: 'Artificial Intelligence', sq: 'Inteligjenca Artificiale' },
        description: {
          en: 'Models, chips and the systems that run them.',
          sq: 'Modelet, çipat dhe sistemet që i mbajnë në punë.',
        },
      },
      {
        slug: 'startups',
        name: { en: 'Startups', sq: 'Startup-et' },
        description: {
          en: 'The founders and funding behind new ventures.',
          sq: 'Themeluesit dhe financimi pas sipërmarrjeve të reja.',
        },
      },
      {
        slug: 'privacy',
        name: { en: 'Privacy', sq: 'Privatësia' },
        description: {
          en: 'Data, tracking and the rules around them.',
          sq: 'Të dhënat, gjurmimi dhe rregullat rreth tyre.',
        },
      },
    ],
  },
  {
    slug: 'business',
    color: '#059669',
    name: { en: 'Business', sq: 'Biznesi' },
    description: {
      en: 'Markets, economics and the world of work.',
      sq: 'Tregjet, ekonomia dhe bota e punës.',
    },
    subcategories: [
      {
        slug: 'markets',
        name: { en: 'Markets', sq: 'Tregjet' },
        description: {
          en: 'Equities, rates and the flow of capital.',
          sq: 'Aksionet, normat dhe rrjedha e kapitalit.',
        },
      },
      {
        slug: 'energy',
        name: { en: 'Energy', sq: 'Energjia' },
        description: {
          en: 'Power, fuels and the transition ahead.',
          sq: 'Energjia, lëndët djegëse dhe tranzicioni që vjen.',
        },
      },
    ],
  },
  {
    slug: 'science',
    color: '#d97706',
    name: { en: 'Science', sq: 'Shkenca' },
    description: {
      en: 'Discovery, research and the natural world.',
      sq: 'Zbulimi, kërkimi dhe bota natyrore.',
    },
    subcategories: [
      {
        slug: 'space',
        name: { en: 'Space', sq: 'Hapësira' },
        description: {
          en: 'Astronomy, cosmology and exploration.',
          sq: 'Astronomia, kozmologjia dhe eksplorimi.',
        },
      },
      {
        slug: 'research',
        name: { en: 'Research', sq: 'Kërkimi' },
        description: {
          en: 'Breakthroughs from the lab and the field.',
          sq: 'Përparime nga laboratori dhe terreni.',
        },
      },
    ],
  },
  {
    slug: 'culture',
    color: '#db2777',
    name: { en: 'Culture', sq: 'Kultura' },
    description: {
      en: 'Film, music, art and the conversation around them.',
      sq: 'Filmi, muzika, arti dhe bisedat rreth tyre.',
    },
    subcategories: [
      {
        slug: 'film',
        name: { en: 'Film & TV', sq: 'Film & TV' },
        description: {
          en: 'Cinema, television and the people who make it.',
          sq: 'Kinemaja, televizioni dhe njerëzit që i krijojnë.',
        },
      },
      {
        slug: 'music',
        name: { en: 'Music', sq: 'Muzika' },
        description: {
          en: 'Sounds, scenes and the artists behind them.',
          sq: 'Tingujt, skenat dhe artistët pas tyre.',
        },
      },
    ],
  },
  {
    slug: 'sports',
    color: '#ea580c',
    name: { en: 'Sports', sq: 'Sporti' },
    description: {
      en: 'Results, analysis and the human stories behind the game.',
      sq: 'Rezultate, analiza dhe historitë njerëzore pas lojës.',
    },
    subcategories: [
      {
        slug: 'football',
        name: { en: 'Football', sq: 'Futbolli' },
        description: {
          en: 'Matches, transfers and tactics.',
          sq: 'Ndeshjet, transferimet dhe taktikat.',
        },
      },
    ],
  },
  {
    slug: 'health',
    color: '#16a34a',
    name: { en: 'Health', sq: 'Shëndeti' },
    description: {
      en: 'Medicine, wellbeing and public health.',
      sq: 'Mjekësia, mirëqenia dhe shëndeti publik.',
    },
    subcategories: [
      {
        slug: 'public-health',
        name: { en: 'Public Health', sq: 'Shëndeti Publik' },
        description: {
          en: 'Disease, prevention and the systems that respond.',
          sq: 'Sëmundjet, parandalimi dhe sistemet që përgjigjen.',
        },
      },
      {
        slug: 'medicine',
        name: { en: 'Medicine', sq: 'Mjekësia' },
        description: {
          en: 'Treatments, trials and clinical research.',
          sq: 'Trajtimet, provat dhe kërkimi klinik.',
        },
      },
    ],
  },
];

export const authors: SeedAuthor[] = [
  { name: 'Elena Marsh', slug: 'elena-marsh', role: 'Senior World Correspondent', bio: 'Elena reports on conflict, migration and diplomacy across three continents.' },
  { name: 'Daniel Cho', slug: 'daniel-cho', role: 'Technology Editor', bio: 'Daniel covers the platforms, chips and policies defining the digital age.' },
  { name: 'Amara Okafor', slug: 'amara-okafor', role: 'Political Analyst', bio: 'Amara unpacks elections and the institutions that shape democratic life.' },
  { name: 'Marcus Reuben', slug: 'marcus-reuben', role: 'Business & Markets', bio: 'Marcus follows central banks, equities and the economy that surrounds them.' },
  { name: 'Sofia Lindqvist', slug: 'sofia-lindqvist', role: 'Science Correspondent', bio: 'Sofia writes about space, climate and the frontiers of research.' },
  { name: 'Theo Almeida', slug: 'theo-almeida', role: 'Culture Critic', bio: 'Theo reviews cinema, music and the culture that defines a moment.' },
];

export const tags: string[] = [
  'Artificial Intelligence', 'Climate', 'Elections', 'Markets', 'Space',
  'Football', 'Startups', 'Cinema', 'Public Health', 'Diplomacy', 'Energy', 'Privacy',
];

export const articles: SeedArticle[] = [
  {
    slug: 'global-leaders-climate-financing-deal',
    categorySlug: 'world',
    subcategorySlug: 'climate',
    authorSlug: 'elena-marsh',
    tags: ['Climate', 'Diplomacy'],
    featured: true,
    breaking: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: {
      en: 'Global Leaders Reach Landmark Climate Financing Deal After Marathon Talks',
      sq: 'Liderët Botërorë Arrijnë Marrëveshje Historike për Financimin e Klimës pas Bisedimeve Maratonë',
    },
    excerpt: {
      en: 'Negotiators agreed a framework to triple adaptation funding for vulnerable nations, ending a tense week of brinkmanship.',
      sq: 'Negociatorët ranë dakord për një kornizë që trefishon financimin e përshtatjes për vendet e cenueshme, duke i dhënë fund një jave të tensionuar.',
    },
    paragraphs: {
      en: [
        'After a week of late-night negotiations that repeatedly threatened to collapse, delegates from more than 190 countries agreed early on Saturday to a framework that would triple climate adaptation financing for the world’s most vulnerable nations.',
        'The deal, brokered in the final hours of the summit, commits wealthier economies to a phased increase in contributions through the end of the decade, with independent monitoring of how the money is spent.',
        'Negotiators described the agreement as imperfect but historic. “This is the first time the language of obligation, not charity, has made it into the text,” said one delegate who asked not to be named.',
        'Civil society groups offered cautious praise, warning that the credibility of the deal now rests entirely on whether pledges translate into disbursed funds. Attention turns next to national parliaments, where ratification battles are expected.',
      ],
      sq: [
        'Pas një jave negociatash deri natën vonë, që disa herë rrezikuan të dështonin, delegatët nga më shumë se 190 vende ranë dakord të shtunën herët për një kornizë që do të trefishojë financimin e përshtatjes ndaj klimës për vendet më të cenueshme të botës.',
        'Marrëveshja, e ndërmjetësuar në orët e fundit të samitit, i detyron ekonomitë më të pasura të rrisin gradualisht kontributet deri në fund të dekadës, me monitorim të pavarur se si shpenzohen paratë.',
        'Negociatorët e përshkruan marrëveshjen si të papërsosur por historike. “Është hera e parë që gjuha e detyrimit, jo e bamirësisë, hyn në tekst,” tha një delegat që kërkoi të mos identifikohej.',
        'Grupet e shoqërisë civile dhanë lëvdata të kujdesshme, duke paralajmëruar se besueshmëria e marrëveshjes tani varet tërësisht nga fakti nëse premtimet kthehen në fonde të disbursuara. Vëmendja kalon te parlamentet kombëtare, ku priten beteja për ratifikimin.',
      ],
    },
  },
  {
    slug: 'race-next-generation-ai-chips',
    categorySlug: 'technology',
    subcategorySlug: 'ai',
    authorSlug: 'daniel-cho',
    tags: ['Artificial Intelligence', 'Startups'],
    featured: true,
    title: {
      en: 'The Quiet Race to Build the Next Generation of AI Chips',
      sq: 'Gara e Heshtur për të Ndërtuar Brezin e Ardhshëm të Çipave të IA-së',
    },
    excerpt: {
      en: 'A wave of well-funded startups is challenging incumbents with radically different silicon designs built for inference at scale.',
      sq: 'Një valë startup-esh të mirëfinancuar po sfidon gjigantët me dizajne silikoni rrënjësisht të ndryshme, të ndërtuara për përfundime në shkallë të gjerë.',
    },
    paragraphs: {
      en: [
        'For years the story of artificial intelligence hardware was a story about a single company. That is beginning to change.',
        'A cluster of startups, several emerging from stealth this quarter, are betting that the economics of running AI models — rather than training them — will define the next decade of computing.',
        'Their designs trade general-purpose flexibility for raw efficiency on the narrow set of operations that large language models repeat billions of times. Early benchmarks, while self-reported, suggest meaningful gains in performance per watt.',
        'Skeptics note that benchmarks rarely survive contact with production workloads, and that software ecosystems, not silicon, often decide winners. But investors are listening: funding into the category has more than doubled year over year.',
      ],
      sq: [
        'Për vite me radhë historia e harduerit të inteligjencës artificiale ishte historia e një kompanie të vetme. Kjo po fillon të ndryshojë.',
        'Një grup startup-esh, disa prej të cilëve dolën nga heshtja këtë tremujor, po vënë bast se ekonomia e ekzekutimit të modeleve të IA-së — më shumë se trajnimi i tyre — do të përcaktojë dekadën e ardhshme të kompjuterikës.',
        'Dizajnet e tyre shkëmbejnë fleksibilitetin e qëllimit të përgjithshëm me efikasitetin e pastër në grupin e ngushtë të operacioneve që modelet e mëdha gjuhësore përsërisin miliarda herë. Provat e para, ndonëse të vetëraportuara, sugjerojnë fitime të ndjeshme në performancë për watt.',
        'Skeptikët vërejnë se provat rrallë i mbijetojnë kontaktit me ngarkesat reale të punës, dhe se ekosistemet e softuerit, jo silikoni, shpesh vendosin fituesit. Por investitorët po dëgjojnë: financimi në këtë kategori është më shumë se dyfishuar nga viti në vit.',
      ],
    },
  },
  {
    slug: 'markets-steady-central-bank-patience',
    categorySlug: 'business',
    subcategorySlug: 'markets',
    authorSlug: 'marcus-reuben',
    tags: ['Markets', 'Energy'],
    breaking: true,
    title: {
      en: 'Markets Steady as Central Bank Signals Patience on Rate Cuts',
      sq: 'Tregjet të Qëndrueshme Ndërsa Banka Qendrore Sinjalizon Durim për Uljen e Normave',
    },
    excerpt: {
      en: 'Equities held their ground after policymakers indicated they were in no hurry to ease, citing sticky services inflation.',
      sq: 'Aksionet ruajtën pozicionin pasi vendimmarrësit treguan se nuk nguteshin të lehtësonin, duke përmendur inflacionin këmbëngulës të shërbimeve.',
    },
    paragraphs: {
      en: [
        'Global equities steadied on Thursday after the central bank left interest rates unchanged and signaled it would not rush to cut, pushing back against market expectations of imminent easing.',
        'In a carefully worded statement, policymakers acknowledged progress on headline inflation while warning that services prices remained “uncomfortably persistent.”',
        'Bond yields ticked higher and the currency firmed as traders pared bets on a near-term cut. Analysts said the message was designed to cool speculation without spooking markets.',
        'The reaction was notably calm — a sign, some argued, that investors have finally internalized a higher-for-longer regime after months of false dawns.',
      ],
      sq: [
        'Aksionet globale u qetësuan të enjten pasi banka qendrore i la të pandryshuara normat e interesit dhe sinjalizoi se nuk do të nxitonte t’i ulte, duke kundërshtuar pritshmëritë e tregut për lehtësim të afërt.',
        'Në një deklaratë me fjalë të kujdesshme, vendimmarrësit pranuan përparimin në inflacionin kryesor ndërsa paralajmëruan se çmimet e shërbimeve mbetën “në mënyrë shqetësuese këmbëngulëse.”',
        'Yield-et e obligacioneve u rritën lehtë dhe monedha u forcua ndërsa tregtarët ulën basat për një ulje afatshkurtër. Analistët thanë se mesazhi ishte hartuar për të ftohur spekulimet pa trembur tregjet.',
        'Reagimi ishte dukshëm i qetë — një shenjë, sipas disave, se investitorët më në fund e kanë përvetësuar një regjim “më të lartë për më gjatë” pas muajsh agimesh të rreme.',
      ],
    },
  },
  {
    slug: 'telescope-survey-maps-galaxies',
    categorySlug: 'science',
    subcategorySlug: 'space',
    authorSlug: 'sofia-lindqvist',
    tags: ['Space'],
    featured: true,
    title: {
      en: 'New Telescope Survey Maps Millions of Galaxies in Unprecedented Detail',
      sq: 'Vëzhgimi i Ri Teleskopik Harton Miliona Galaktika me Detaje të Paprecedenta',
    },
    excerpt: {
      en: 'The first data release offers astronomers a three-dimensional view of cosmic structure stretching back billions of years.',
      sq: 'Publikimi i parë i të dhënave u ofron astronomëve një pamje tredimensionale të strukturës kozmike që shtrihet miliarda vjet në të kaluarën.',
    },
    paragraphs: {
      en: [
        'Astronomers released the first tranche of data from an ambitious sky survey this week, offering a three-dimensional map of the universe more detailed than anything that came before.',
        'The survey charts the positions and distances of millions of galaxies, allowing researchers to trace the vast filaments and voids that make up the cosmic web.',
        'Scientists hope the data will sharpen measurements of dark energy, the mysterious force driving the universe’s accelerating expansion.',
        'The full catalogue, to be released over several years, is expected to keep cosmologists busy for a generation.',
      ],
      sq: [
        'Astronomët publikuan këtë javë pjesën e parë të të dhënave nga një vëzhgim ambicioz i qiellit, duke ofruar një hartë tredimensionale të universit më të detajuar se çdo gjë e mëparshme.',
        'Vëzhgimi paraqet pozicionet dhe distancat e miliona galaktikave, duke u lejuar studiuesve të gjurmojnë filamentet dhe zbrazëtirat e gjera që përbëjnë rrjetën kozmike.',
        'Shkencëtarët shpresojnë se të dhënat do të përmirësojnë matjet e energjisë së errët, forcës misterioze që shtyn zgjerimin e përshpejtuar të universit.',
        'Katalogu i plotë, që do të publikohet gjatë disa viteve, pritet t’i mbajë kozmologët të zënë për një brez të tërë.',
      ],
    },
  },
  {
    slug: 'election-redraw-political-map',
    categorySlug: 'politics',
    subcategorySlug: 'elections',
    authorSlug: 'amara-okafor',
    tags: ['Elections'],
    title: {
      en: 'Inside the Election That Could Redraw the Political Map',
      sq: 'Brenda Zgjedhjeve që Mund të Rivizatojnë Hartën Politike',
    },
    excerpt: {
      en: 'With turnout surging among younger voters, long-held assumptions about the electorate are being tested.',
      sq: 'Me rritjen e pjesëmarrjes së votuesve të rinj, supozimet e vjetra për elektoratin po vihen në provë.',
    },
    paragraphs: {
      en: [
        'In a campaign defined less by ideology than by generational divides, this election is shaping up to be one of the most consequential in a decade.',
        'Early voting figures point to a surge in participation among voters under thirty-five, a group whose preferences have proven difficult to poll accurately.',
        'Strategists in both major camps privately concede that their models are straining against an electorate that no longer behaves the way it did.',
        'Whatever the outcome, analysts say the result will be studied for years as a test of whether old coalitions can survive a changing demography.',
      ],
      sq: [
        'Në një fushatë të përcaktuar më pak nga ideologjia se nga ndarjet brezore, këto zgjedhje po dalin të jenë ndër më të rëndësishmet e dekadës.',
        'Shifrat e hershme të votimit tregojnë një rritje të pjesëmarrjes së votuesve nën tridhjetë e pesë vjeç, një grup preferencat e të cilit kanë qenë të vështira për t’u matur me saktësi.',
        'Strategët në të dyja kampet kryesore pranojnë privatisht se modelet e tyre po lëkunden përballë një elektorati që nuk sillet më siç sillej dikur.',
        'Cilido qoftë rezultati, analistët thonë se ai do të studiohet me vite si një provë nëse koalicionet e vjetra mund t’i mbijetojnë një demografie në ndryshim.',
      ],
    },
  },
  {
    slug: 'filmmaker-decade-gamble-screen',
    categorySlug: 'culture',
    subcategorySlug: 'film',
    authorSlug: 'theo-almeida',
    tags: ['Cinema'],
    title: {
      en: 'A Filmmaker’s Decade-Long Gamble Finally Reaches the Screen',
      sq: 'Basti Dhjetëvjeçar i një Regjisori Më në Fund Arrin në Ekran',
    },
    excerpt: {
      en: 'Shot across four countries and nearly abandoned twice, the result is a sprawling, flawed and unforgettable epic.',
      sq: 'I xhiruar në katër vende dhe pothuajse i braktisur dy herë, rezultati është një epope e gjerë, me të meta dhe e paharrueshme.',
    },
    paragraphs: {
      en: [
        'Some films arrive quietly. This one arrives having survived a decade of false starts, financing collapses and a near-mythical reputation among those who tracked its troubled production.',
        'The finished work is sprawling and uneven — too long by any reasonable measure, and yet impossible to look away from.',
        'What lingers is not the plot but the texture: faces held a beat too long, landscapes that seem to breathe, a soundtrack that refuses easy resolution.',
        'It is the kind of ambitious, imperfect cinema that the industry claims to want and rarely funds. On the evidence here, it should fund more of it.',
      ],
      sq: [
        'Disa filma vijnë në heshtje. Ky vjen pasi i ka mbijetuar një dekade nisjesh të rreme, kolapseve të financimit dhe një reputacioni gati mitik mes atyre që ndoqën prodhimin e tij të trazuar.',
        'Vepra e përfunduar është e gjerë dhe e pabarabartë — shumë e gjatë sipas çdo mase të arsyeshme, e megjithatë e pamundur t’i shmangësh sytë.',
        'Ajo që ngelet nuk është rrëfimi por tekstura: fytyra të mbajtura një çast më gjatë, peizazhe që duket sikur marrin frymë, një kolonë zanore që refuzon zgjidhjet e lehta.',
        'Është lloji i kinemasë ambicioze e të papërsosur që industria pretendon se e do dhe rrallë e financon. Sipas dëshmive këtu, duhet të financojë më shumë prej saj.',
      ],
    },
  },
  {
    slug: 'underdogs-stun-champions-extra-time',
    categorySlug: 'sports',
    subcategorySlug: 'football',
    authorSlug: 'elena-marsh',
    tags: ['Football'],
    title: {
      en: 'Underdogs Stun Champions in Extra-Time Thriller',
      sq: 'Të Dobëtit Mposhtin Kampionët në një Thriller të Kohës Shtesë',
    },
    excerpt: {
      en: 'A late equalizer and a nerveless penalty shootout sent the reigning champions crashing out in front of a stunned crowd.',
      sq: 'Një barazim i vonë dhe një seri penalltish gjakftohtë i dërguan kampionët në fuqi jashtë garës përpara një turme të shtangur.',
    },
    paragraphs: {
      en: [
        'For eighty-eight minutes it looked routine. Then it didn’t.',
        'A scrambled equalizer deep into stoppage time silenced the home support and dragged a contest the champions had controlled into extra time.',
        'When neither side could be separated, it fell to a penalty shootout — and to a goalkeeper who, moments earlier, had been a substitute.',
        'His two saves wrote the story. The underdogs march on; the champions go home, undone by a refusal to accept they had already won.',
      ],
      sq: [
        'Për tetëdhjetë e tetë minuta dukej rutinë. Pastaj nuk ishte më.',
        'Një barazim i ngatërruar thellë në kohën shtesë heshti tifozët vendas dhe e tërhoqi në kohë shtesë një përballje që kampionët e kishin kontrolluar.',
        'Kur asnjëra palë nuk mund të ndahej, gjithçka kaloi te seria e penalltive — dhe te një portier që, pak çaste më parë, kishte qenë zëvendësues.',
        'Dy pritjet e tij e shkruan historinë. Të dobëtit ecin përpara; kampionët kthehen në shtëpi, të shkatërruar nga refuzimi për të pranuar se kishin fituar tashmë.',
      ],
    },
  },
  {
    slug: 'privacy-rules-reshape-open-web',
    categorySlug: 'technology',
    subcategorySlug: 'privacy',
    authorSlug: 'daniel-cho',
    tags: ['Privacy', 'Artificial Intelligence'],
    title: {
      en: 'Why the New Privacy Rules Could Reshape the Open Web',
      sq: 'Pse Rregullat e Reja të Privatësisë Mund të Riformësojnë Uebin e Hapur',
    },
    excerpt: {
      en: 'Sweeping limits on tracking promise stronger protections — and a fundamental rethink of how the internet pays for itself.',
      sq: 'Kufizime të gjera mbi gjurmimin premtojnë mbrojtje më të forta — dhe një rimendim thelbësor se si interneti financon veten.',
    },
    paragraphs: {
      en: [
        'A new generation of privacy regulation is forcing the advertising-funded web to confront a question it has long avoided: what happens when you can no longer follow people around the internet?',
        'The rules, phased in over the coming year, sharply restrict the cross-site tracking that underpins much of digital advertising.',
        'Publishers welcome the protections but fear the revenue consequences. Advertisers are scrambling for alternatives, from contextual targeting to first-party data.',
        'The likely outcome, experts say, is not the end of the ad-funded web but its consolidation — with the largest platforms, which already own first-party relationships, best placed to adapt.',
      ],
      sq: [
        'Një brez i ri rregullash për privatësinë po e detyron uebin e financuar nga reklamat të përballet me një pyetje që e ka shmangur prej kohësh: çfarë ndodh kur nuk mund t’i ndjekësh më njerëzit nëpër internet?',
        'Rregullat, që do të zbatohen gradualisht gjatë vitit të ardhshëm, kufizojnë ashpër gjurmimin ndër-faqësor që mban shumicën e reklamave dixhitale.',
        'Botuesit i mirëpresin mbrojtjet por druhen nga pasojat te të ardhurat. Reklamuesit po kërkojnë me ngut alternativa, nga shënjestrimi kontekstual te të dhënat e palës së parë.',
        'Rezultati i mundshëm, thonë ekspertët, nuk është fundi i uebit të financuar nga reklamat por konsolidimi i tij — ku platformat më të mëdha, që tashmë zotërojnë marrëdhënie të palës së parë, janë në pozitën më të mirë për t’u përshtatur.',
      ],
    },
  },
  {
    slug: 'therapy-promise-drug-resistant-infections',
    categorySlug: 'health',
    subcategorySlug: 'medicine',
    authorSlug: 'sofia-lindqvist',
    tags: ['Public Health'],
    title: {
      en: 'Breakthrough Therapy Shows Promise Against Drug-Resistant Infections',
      sq: 'Terapia e Re Premtuese Tregon Shpresë Kundër Infeksioneve Rezistente ndaj Barnave',
    },
    excerpt: {
      en: 'An early-stage trial reports encouraging results against a class of bacteria that has long resisted treatment.',
      sq: 'Një provë në fazë të hershme raporton rezultate inkurajuese kundër një klase bakteresh që prej kohësh i ka rezistuar trajtimit.',
    },
    paragraphs: {
      en: [
        'In the slow, grinding fight against antibiotic resistance, good news is rare. This week brought a little.',
        'Researchers reported encouraging early-stage results for a therapy that targets a class of drug-resistant bacteria responsible for thousands of hospital infections each year.',
        'The trial was small and the findings preliminary, the authors stressed, with larger studies needed before any treatment reaches patients.',
        'Still, in a field starved of new tools, even a modest signal is enough to draw attention — and, its backers hope, funding.',
      ],
      sq: [
        'Në luftën e ngadaltë e rraskapitëse kundër rezistencës ndaj antibiotikëve, lajmet e mira janë të rralla. Kjo javë solli pak.',
        'Studiuesit raportuan rezultate inkurajuese të fazës së hershme për një terapi që shënjestron një klasë bakteresh rezistente ndaj barnave, përgjegjëse për mijëra infeksione spitalore çdo vit.',
        'Prova ishte e vogël dhe gjetjet paraprake, theksuan autorët, me nevojën për studime më të mëdha përpara se ndonjë trajtim t’u arrijë pacientëve.',
        'Megjithatë, në një fushë të uritur për mjete të reja, edhe një sinjal modest mjafton për të tërhequr vëmendjen — dhe, shpresojnë mbështetësit, financimin.',
      ],
    },
  },
  {
    slug: 'city-betting-future-clean-energy',
    categorySlug: 'business',
    subcategorySlug: 'energy',
    authorSlug: 'marcus-reuben',
    tags: ['Energy', 'Climate'],
    title: {
      en: 'The City Betting Its Future on Cheap, Clean Energy',
      sq: 'Qyteti që Po Vë Bast të Ardhmen e Tij mbi Energjinë e Lirë e të Pastër',
    },
    excerpt: {
      en: 'A former industrial hub is reinventing itself around abundant renewable power — and attracting an unlikely boom.',
      sq: 'Një ish-qendër industriale po rishpik veten rreth energjisë së ripërtëritshme me bollëk — duke tërhequr një bum të papritur.',
    },
    paragraphs: {
      en: [
        'A decade ago this was a city in managed decline, its factories shuttered and its young people leaving.',
        'Today it is the unlikely site of an industrial revival, powered by some of the cheapest renewable electricity in the region.',
        'Energy-hungry industries — data centers, green hydrogen, advanced manufacturing — are arriving to take advantage, bringing jobs and a cautious optimism.',
        'Officials are careful not to overpromise. But for the first time in a generation, the question here is about growth, not retreat.',
      ],
      sq: [
        'Një dekadë më parë ky ishte një qytet në rënie të menaxhuar, me fabrikat e mbyllura dhe të rinjtë që largoheshin.',
        'Sot është vendi i papritur i një ringjalljeje industriale, i mbështetur nga disa prej energjive elektrike të ripërtëritshme më të lira në rajon.',
        'Industritë e etura për energji — qendrat e të dhënave, hidrogjeni i gjelbër, prodhimi i përparuar — po vijnë për të përfituar, duke sjellë vende pune dhe një optimizëm të kujdesshëm.',
        'Zyrtarët janë të kujdesshëm të mos premtojnë tepër. Por për herë të parë në një brez, pyetja këtu është për rritjen, jo për tërheqjen.',
      ],
    },
  },
  {
    slug: 'diplomats-race-salvage-ceasefire',
    categorySlug: 'world',
    subcategorySlug: 'diplomacy',
    authorSlug: 'elena-marsh',
    tags: ['Diplomacy'],
    title: {
      en: 'Diplomats Race to Salvage Fragile Ceasefire',
      sq: 'Diplomatët në Garë për të Shpëtuar Armëpushimin e Brishtë',
    },
    excerpt: {
      en: 'Mediators worked through the night as sporadic violations threatened to unravel a truce barely a week old.',
      sq: 'Ndërmjetësit punuan gjithë natën ndërsa shkelje sporadike kërcënonin të shthurnin një armëpushim mezi një javë të vjetër.',
    },
    paragraphs: {
      en: [
        'A ceasefire barely a week old came under severe strain this weekend as mediators worked through the night to prevent its collapse.',
        'Sporadic violations along the line of contact tested a truce that had brought the first sustained calm to the region in months.',
        'International envoys shuttled between capitals, seeking guarantees that both sides appeared reluctant to give in public.',
        'For civilians who had begun to return home, the uncertainty was its own kind of cruelty — a fragile peace they could neither trust nor afford to abandon.',
      ],
      sq: [
        'Një armëpushim mezi një javë i vjetër u vu nën presion të rëndë këtë fundjavë, ndërsa ndërmjetësit punuan gjithë natën për të parandaluar shembjen e tij.',
        'Shkelje sporadike përgjatë vijës së kontaktit vunë në provë një armëpushim që i kishte sjellë rajonit qetësinë e parë të qëndrueshme pas muajsh.',
        'Të dërguarit ndërkombëtarë lëvizën mes kryeqyteteve, duke kërkuar garanci që të dyja palët dukeshin ngurruese t’i jepnin publikisht.',
        'Për civilët që kishin filluar të ktheheshin në shtëpi, pasiguria ishte një lloj i veçantë mizorie — një paqe e brishtë që as nuk mund ta besonin, as nuk mund të lejonin ta braktisnin.',
      ],
    },
  },
  {
    slug: 'startup-funding-rebounds-ai-wave',
    categorySlug: 'technology',
    subcategorySlug: 'startups',
    authorSlug: 'daniel-cho',
    tags: ['Startups', 'Markets', 'Artificial Intelligence'],
    title: {
      en: 'Startup Funding Rebounds as Investors Chase the AI Wave',
      sq: 'Financimi i Startup-eve Rikthehet Ndërsa Investitorët Ndjekin Valën e IA-së',
    },
    excerpt: {
      en: 'After two lean years, venture capital is flowing again — but almost entirely toward a single, crowded category.',
      sq: 'Pas dy vitesh të dobëta, kapitali sipërmarrës po rrjedh sërish — por pothuajse tërësisht drejt një kategorie të vetme e të mbingarkuar.',
    },
    paragraphs: {
      en: [
        'Venture funding rebounded sharply this quarter, ending a two-year drought that had forced founders into painful cuts and down rounds.',
        'The recovery, however, is narrow. The overwhelming share of new capital is flowing into companies that can credibly attach themselves to artificial intelligence.',
        'Founders in other sectors report a market that remains stubbornly closed, and warn of a widening gap between the haves and have-nots.',
        'Some investors privately worry the enthusiasm has run ahead of the fundamentals. Few, though, are willing to sit out the wave.',
      ],
      sq: [
        'Financimi sipërmarrës u rikthye fuqishëm këtë tremujor, duke i dhënë fund një thatësire dyvjeçare që i kishte detyruar themeluesit në shkurtime të dhimbshme dhe raunde me vlerësim më të ulët.',
        'Rimëkëmbja, megjithatë, është e ngushtë. Pjesa dërrmuese e kapitalit të ri po rrjedh te kompanitë që mund të lidhen në mënyrë të besueshme me inteligjencën artificiale.',
        'Themeluesit në sektorë të tjerë raportojnë një treg që mbetet kokëfortësisht i mbyllur, dhe paralajmërojnë për një hendek që po zgjerohet mes atyre që kanë dhe atyre që s’kanë.',
        'Disa investitorë druhen privatisht se entuziazmi ka vrapuar përpara themeleve. Pak, megjithatë, janë të gatshëm të rrinë jashtë valës.',
      ],
    },
  },
  {
    slug: 'small-town-global-supply-chain',
    categorySlug: 'business',
    subcategorySlug: 'markets',
    authorSlug: 'marcus-reuben',
    tags: ['Markets'],
    title: {
      en: 'How a Small Town Became the Center of a Global Supply Chain',
      sq: 'Si u Bë një Qytet i Vogël Qendra e një Zinxhiri Furnizimi Global',
    },
    excerpt: {
      en: 'A quirk of geography and a few stubborn entrepreneurs turned an overlooked region into an indispensable link.',
      sq: 'Një veçori e gjeografisë dhe pak sipërmarrës kokëfortë e kthyen një rajon të harruar në një hallkë të domosdoshme.',
    },
    paragraphs: {
      en: [
        'You will not find it on most maps of global trade. You should.',
        'Through a combination of geography, timing and a handful of stubborn entrepreneurs, this small town has become an indispensable link in a supply chain that spans continents.',
        'Its rise illustrates how globalization, often described in abstractions, ultimately runs through specific places and the people who live in them.',
        'It also illustrates the fragility of such arrangements — and how much the wider economy now depends on a place few have heard of.',
      ],
      sq: [
        'Nuk do ta gjeni në shumicën e hartave të tregtisë globale. Por duhet.',
        'Përmes një kombinimi gjeografie, kohe të përshtatshme dhe një grushti sipërmarrësish kokëfortë, ky qytet i vogël është bërë një hallkë e domosdoshme në një zinxhir furnizimi që përshkon kontinente.',
        'Ngritja e tij ilustron se si globalizimi, i përshkruar shpesh me abstraksione, në fund kalon nëpër vende të caktuara dhe njerëzit që jetojnë në to.',
        'Ai ilustron gjithashtu brishtësinë e marrëveshjeve të tilla — dhe sa shumë ekonomia më e gjerë varet tani nga një vend për të cilin pak kanë dëgjuar.',
      ],
    },
  },
  {
    slug: 'astronomers-detect-early-universe-signal',
    categorySlug: 'science',
    subcategorySlug: 'space',
    authorSlug: 'sofia-lindqvist',
    tags: ['Space'],
    title: {
      en: 'Astronomers Detect Signal From the Early Universe',
      sq: 'Astronomët Zbulojnë Sinjal nga Universi i Hershëm',
    },
    excerpt: {
      en: 'A faint radio signature may offer a window into the period when the first stars switched on.',
      sq: 'Një gjurmë e zbehtë radio mund të ofrojë një dritare drejt periudhës kur u ndezën yjet e parë.',
    },
    paragraphs: {
      en: [
        'Astronomers have reported the detection of a faint radio signal that may date to the cosmic dawn — the era when the first stars began to shine.',
        'If confirmed, the measurement would open a window onto one of the least understood chapters in the history of the universe.',
        'The signal is extraordinarily weak, buried beneath foregrounds thousands of times brighter, and independent confirmation will be essential.',
        'Researchers are already designing follow-up observations, aware that extraordinary claims demand extraordinary evidence.',
      ],
      sq: [
        'Astronomët kanë raportuar zbulimin e një sinjali të zbehtë radio që mund të datojë në agimin kozmik — epokën kur yjet e parë filluan të shkëlqejnë.',
        'Po u konfirmua, matja do të hapte një dritare drejt njërit prej kapitujve më pak të kuptuar në historinë e universit.',
        'Sinjali është jashtëzakonisht i dobët, i fshehur nën burime mijëra herë më të ndritshme, dhe konfirmimi i pavarur do të jetë thelbësor.',
        'Studiuesit po hartojnë tashmë vëzhgime vijuese, të vetëdijshëm se pretendimet e jashtëzakonshme kërkojnë dëshmi të jashtëzakonshme.',
      ],
    },
  },
  {
    slug: 'new-directors-rewriting-television',
    categorySlug: 'culture',
    subcategorySlug: 'film',
    authorSlug: 'theo-almeida',
    tags: ['Cinema'],
    title: {
      en: 'A New Wave of Directors Is Rewriting the Rules of Television',
      sq: 'Një Valë e Re Regjisorësh Po Rishkruan Rregullat e Televizionit',
    },
    excerpt: {
      en: 'Drawn from cinema, theater and the internet, a generation of filmmakers is treating the small screen as its canvas.',
      sq: 'Të ardhur nga kinemaja, teatri dhe interneti, një brez krijuesish po e trajton ekranin e vogël si kanavacën e tyre.',
    },
    paragraphs: {
      en: [
        'Television, long the medium of compromise, has become the medium of ambition.',
        'A new wave of directors — drawn from cinema, theater and the open chaos of the internet — is treating the small screen as a canvas for formal experiment.',
        'The results can be self-indulgent. They can also be thrilling, the kind of work that would never survive a studio’s risk assessment.',
        'What unites them is a refusal to condescend to the audience — a bet that viewers are hungrier and more patient than the industry has assumed.',
      ],
      sq: [
        'Televizioni, prej kohësh mjeti i kompromisit, është bërë mjeti i ambicies.',
        'Një valë e re regjisorësh — të ardhur nga kinemaja, teatri dhe kaosi i hapur i internetit — po e trajton ekranin e vogël si një kanavacë për eksperiment formal.',
        'Rezultatet mund të jenë të vetëkënaqura. Por mund të jenë edhe rrëqethëse, lloji i punës që nuk do t’i mbijetonte kurrë një vlerësimi rreziku të një studioje.',
        'Ajo që i bashkon është refuzimi për ta nënçmuar publikun — një bast se shikuesit janë më të uritur dhe më të durueshëm nga sa ka supozuar industria.',
      ],
    },
  },
  {
    slug: 'athletes-changing-how-sport-played',
    categorySlug: 'sports',
    subcategorySlug: 'football',
    authorSlug: 'amara-okafor',
    tags: ['Football'],
    title: {
      en: 'The Athletes Quietly Changing How Their Sport Is Played',
      sq: 'Atletët që në Heshtje Po Ndryshojnë Mënyrën se Si Luhet Sporti i Tyre',
    },
    excerpt: {
      en: 'Away from the headlines, a cohort of players is forcing a tactical rethink that may outlast their careers.',
      sq: 'Larg titujve, një grup lojtarësh po imponon një rimendim taktik që mund t’u mbijetojë karrierave të tyre.',
    },
    paragraphs: {
      en: [
        'Tactical revolutions in sport rarely announce themselves. They arrive quietly, in the habits of a few players, before becoming orthodoxy.',
        'A cohort of athletes is now forcing exactly such a rethink, blending roles that coaching manuals had long kept separate.',
        'Opponents are scrambling to adapt, and the data analysts who increasingly shape strategy are taking note.',
        'Whether the shift endures will depend on imitation. But the game, for now, looks subtly different than it did a season ago.',
      ],
      sq: [
        'Revolucionet taktike në sport rrallë e shpallin veten. Ato vijnë në heshtje, në zakonet e pak lojtarëve, përpara se të bëhen normë.',
        'Një grup atletësh tani po imponon pikërisht një rimendim të tillë, duke ndërthurur role që manualet e trajnimit i kishin mbajtur prej kohësh të ndara.',
        'Kundërshtarët po përpiqen me ngut të përshtaten, dhe analistët e të dhënave që gjithnjë e më shumë formësojnë strategjinë po e vërejnë.',
        'Nëse ndryshimi do të zgjasë, kjo do të varet nga imitimi. Por loja, për momentin, duket në mënyrë të hollë ndryshe nga sa ishte një sezon më parë.',
      ],
    },
  },
];

export const siteSettings = {
  siteName: 'Meridian',
  logoUrl: '',
  backgroundColor: '#ffffff',
  accentColor: '#b91c1c',
  tagline: {
    en: 'Independent journalism for a connected world.',
    sq: 'Gazetari e pavarur për një botë të ndërlidhur.',
  },
  footerText: {
    en: 'Meridian is an independent news publication covering world affairs, technology, business, science, culture, sports and health.',
    sq: 'Meridian është një publikim i pavarur lajmesh që mbulon çështjet botërore, teknologjinë, biznesin, shkencën, kulturën, sportin dhe shëndetin.',
  },
  footerLinks: {
    en: [
      { label: 'About us', url: '/about' },
      { label: 'Contact', url: '/contact' },
      { label: 'Privacy policy', url: '/privacy' },
      { label: 'Terms of use', url: '/terms' },
    ],
    sq: [
      { label: 'Rreth nesh', url: '/about' },
      { label: 'Kontakt', url: '/contact' },
      { label: 'Politika e privatësisë', url: '/privacy' },
      { label: 'Kushtet e përdorimit', url: '/terms' },
    ],
  },
  socialLinks: [
    { platform: 'x', url: 'https://x.com' },
    { platform: 'facebook', url: 'https://facebook.com' },
    { platform: 'instagram', url: 'https://instagram.com' },
    { platform: 'linkedin', url: 'https://linkedin.com' },
  ] as { platform: 'x' | 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok'; url: string }[],
  // UI string catalogue consumed by the frontend `t(key)` helper. One JSON,
  // every locale — editable from the CMS so non-developers can adjust copy.
  translations: {
    en: {
      search: 'Search',
      searchResults: 'results',
      searchResult: 'result',
      searchEmpty: 'No stories matched your search. Try a different term.',
      searchPlaceholder: 'Search the news…',
      searchArticles: 'Search articles',
      newsletterTitle: 'The Daily Brief',
      newsletterText: 'Get the day’s essential stories in your inbox each morning.',
      subscribe: 'Subscribe',
      subscribeOk: 'Thanks — you’re on the list.',
      subscribeError: 'Something went wrong. Please try again.',
      emailInvalid: 'Please enter a valid email address.',
      emailPlaceholder: 'you@example.com',
      emailAddress: 'Email address',
      rights: 'All rights reserved.',
      subcategories: 'Subcategories',
      About: 'About',
      Contact: 'Contact',
      home: 'Home',
      footerDefault: 'Independent journalism for a connected world.',
      // Navigation / chrome
      toggleMenu: 'Toggle menu',
      language: 'Language',
      lightMode: 'Switch to light mode',
      darkMode: 'Switch to dark mode',
      // Article meta
      breaking: 'Breaking',
      breakingNews: 'Breaking news',
      minRead: 'min read',
      views: 'views',
      // Sharing
      share: 'Share',
      shareOnX: 'Share on X',
      shareOnFacebook: 'Share on Facebook',
      shareOnLinkedIn: 'Share on LinkedIn',
      copyLink: 'Copy link',
      // Home
      topStories: 'Top stories',
      latestNews: 'Latest news',
      latest: 'Latest',
      mostRead: 'Most Read',
      allCaughtUp: 'You’re all caught up.',
      // Author
      latestBy: 'Latest by',
      thisAuthor: 'this author',
      noArticlesYet: 'No articles yet.',
      // Category / Subcategory
      pageNotFound: 'Page not found',
      pageNotFoundText: 'The page you’re looking for doesn’t exist or has moved.',
      backToHome: 'Back to home',
      sectionNotExist: 'This section doesn’t exist or may have been moved.',
      noStoriesSection: 'No stories in this section yet.',
      endOfSection: 'End of section.',
      // Article
      articleNotFound: 'Article not found',
      articleNotFoundText: 'This story may have been moved or removed.',
      relatedStories: 'Related Stories',
      // About page
      aboutDefault: 'About Us',
      loading: 'Loading…',
      couldNotLoad: 'Could not load this page.',
      // Contact page
      fieldName: 'Name',
      fieldEmail: 'Email',
      fieldPhone: 'Phone',
      fieldAddress: 'Address',
      fieldSubject: 'Subject',
      fieldMessage: 'Message',
      sendMessage: 'Send message',
      sending: 'Sending…',
      contactSuccess: 'Thanks — your message has been sent.',
      contactFillError: 'Please fill in your name, email and message.',
      // Live notifications
      dismiss: 'Dismiss',
      newArticle: 'New article',
      newIn: 'New in',
      // Auth
      login: 'Log in',
      logout: 'Log out',
      register: 'Register',
      createAccount: 'Create account',
      account: 'Account',
      username: 'Username',
      password: 'Password',
      emailOrUsername: 'Email or username',
      noAccount: 'Don’t have an account?',
      haveAccount: 'Already have an account?',
      signingIn: 'Signing in…',
      authError: 'Invalid credentials. Please try again.',
      registerError: 'Could not create account. Try a different email.',
      // Live streaming
      live: 'Live',
      liveNow: 'Live now',
      upcoming: 'Upcoming',
      watchLive: 'Watch live',
      liveEmpty: 'No live streams right now. Check back soon.',
      loginRequired: 'Please log in to watch live streams.',
      loginToWatch: 'Log in to watch',
      // Reactions & polls
      reactionsTitle: 'What’s your reaction?',
      signInToReact: 'Sign in to react',
      signInToVote: 'Sign in to vote',
      pollThanks: 'Thanks for voting!',
      votesLabel: 'votes',
      reactLike: 'Like',
      reactLove: 'Love',
      reactInsightful: 'Insightful',
      reactSad: 'Sad',
      reactAngry: 'Angry',
    },
    sq: {
      search: 'Kërko',
      searchResults: 'rezultate',
      searchResult: 'rezultat',
      searchEmpty: 'Asnjë artikull nuk përputhet me kërkimin tuaj. Provoni një term tjetër.',
      searchPlaceholder: 'Kërko lajmet…',
      searchArticles: 'Kërko artikuj',
      newsletterTitle: 'Përmbledhja Ditore',
      newsletterText: 'Merrni çdo mëngjes lajmet thelbësore të ditës në email.',
      subscribe: 'Abonohu',
      subscribeOk: 'Faleminderit — jeni në listë.',
      subscribeError: 'Diçka shkoi keq. Ju lutemi provoni përsëri.',
      emailInvalid: 'Ju lutemi shkruani një adresë emaili të vlefshme.',
      emailPlaceholder: 'ju@shembull.com',
      emailAddress: 'Adresa e emailit',
      rights: 'Të gjitha të drejtat e rezervuara.',
      subcategories: 'Nënkategoritë',
      About: 'Rreth Nesh',
      Contact: 'Kontakt',
      home: 'Ballina',
      footerDefault: 'Gazetari e pavarur për një botë të lidhur.',
      // Navigation / chrome
      toggleMenu: 'Hap menunë',
      language: 'Gjuha',
      lightMode: 'Kalo në modalitetin e ndritshëm',
      darkMode: 'Kalo në modalitetin e errët',
      // Article meta
      breaking: 'Lajme të fundit',
      breakingNews: 'Lajme të fundit',
      minRead: 'min lexim',
      views: 'shikime',
      // Sharing
      share: 'Ndaj',
      shareOnX: 'Ndaj në X',
      shareOnFacebook: 'Ndaj në Facebook',
      shareOnLinkedIn: 'Ndaj në LinkedIn',
      copyLink: 'Kopjo lidhjen',
      // Home
      topStories: 'Lajmet kryesore',
      latestNews: 'Lajmet e fundit',
      latest: 'Më të fundit',
      mostRead: 'Më të lexuara',
      allCaughtUp: 'Jeni në rrjedhë me të gjitha.',
      // Author
      latestBy: 'Më të fundit nga',
      thisAuthor: 'ky autor',
      noArticlesYet: 'Ende nuk ka artikuj.',
      // Category / Subcategory
      pageNotFound: 'Faqja nuk u gjet',
      pageNotFoundText: 'Faqja që po kërkoni nuk ekziston ose është zhvendosur.',
      backToHome: 'Kthehu në ballina',
      sectionNotExist: 'Ky seksion nuk ekziston ose mund të jetë zhvendosur.',
      noStoriesSection: 'Ende nuk ka artikuj në këtë seksion.',
      endOfSection: 'Fundi i seksionit.',
      // Article
      articleNotFound: 'Artikulli nuk u gjet',
      articleNotFoundText: 'Ky artikull mund të jetë zhvendosur ose hequr.',
      relatedStories: 'Artikuj të ngjashëm',
      // About page
      aboutDefault: 'Rreth Nesh',
      loading: 'Duke u ngarkuar…',
      couldNotLoad: 'Nuk u ngarkua dot kjo faqe.',
      // Contact page
      fieldName: 'Emri',
      fieldEmail: 'Email',
      fieldPhone: 'Telefoni',
      fieldAddress: 'Adresa',
      fieldSubject: 'Subjekti',
      fieldMessage: 'Mesazhi',
      sendMessage: 'Dërgo mesazhin',
      sending: 'Duke dërguar…',
      contactSuccess: 'Faleminderit — mesazhi juaj u dërgua.',
      contactFillError: 'Ju lutemi plotësoni emrin, emailin dhe mesazhin.',
      // Live notifications
      dismiss: 'Mbyll',
      newArticle: 'Artikull i ri',
      newIn: 'I ri në',
      // Auth
      login: 'Hyr',
      logout: 'Dil',
      register: 'Regjistrohu',
      createAccount: 'Krijo llogari',
      account: 'Llogaria',
      username: 'Emri i përdoruesit',
      password: 'Fjalëkalimi',
      emailOrUsername: 'Email ose emër përdoruesi',
      noAccount: 'Nuk keni llogari?',
      haveAccount: 'Keni tashmë një llogari?',
      signingIn: 'Duke hyrë…',
      authError: 'Kredencialet janë të pavlefshme. Provoni përsëri.',
      registerError: 'Nuk u krijua dot llogaria. Provoni një email tjetër.',
      // Live streaming
      live: 'Drejtpërdrejt',
      liveNow: 'Tani drejtpërdrejt',
      upcoming: 'Së shpejti',
      watchLive: 'Shiko drejtpërdrejt',
      liveEmpty: 'Asnjë transmetim i drejtpërdrejtë tani. Kthehuni së shpejti.',
      loginRequired: 'Ju lutemi identifikohuni për të parë transmetimet.',
      loginToWatch: 'Identifikohu për të parë',
      // Reactions & polls
      reactionsTitle: 'Cili është reagimi juaj?',
      signInToReact: 'Hyni për të reaguar',
      signInToVote: 'Hyni për të votuar',
      pollThanks: 'Faleminderit për votën!',
      votesLabel: 'vota',
      reactLike: 'Pëlqej',
      reactLove: 'Dashuri',
      reactInsightful: 'Mendjehollë',
      reactSad: 'I trishtuar',
      reactAngry: 'I zemëruar',
    },
  } as Record<string, Record<string, string>>,
};
