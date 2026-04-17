const C2W_MOCK_WORKERS = [
  {
    id: "w-joao-silva",
    name: "Joao Silva",
    email: "joao.eletrica@servicosja.dev",
    phone: "(11) 98744-1200",
    city: "Sao Paulo, SP",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80",
    role: "worker",
    mainProfession: "Eletricista residencial",
    professions: ["eletricista", "instalador", "manutencao eletrica"],
    description: "Eletricista com foco em instalacoes residenciais, revisoes preventivas e atendimentos rapidos para apartamentos e casas.",
    basePrice: 90,
    rating: 4.9,
    reviewCount: 128,
    availability: "Hoje",
    experience: 9,
    badge: "Mais contratado",
    responseTime: "12 min",
    trust: 96,
    services: [
      { id: "s1", name: "Instalacao de chuveiro", price: 120, category: "Eletrica" },
      { id: "s2", name: "Troca de tomada", price: 35, category: "Eletrica" },
      { id: "s3", name: "Revisao eletrica residencial", price: 180, category: "Eletrica" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=640&q=80"
    ],
    reviews: [
      { author: "Marina Costa", rating: 5, text: "Excelente profissional, chegou no horario e explicou tudo com clareza." },
      { author: "Rafael Nunes", rating: 5, text: "Resolveu a instalacao do chuveiro rapido e cobrou justo." },
      { author: "Patricia Lima", rating: 4.8, text: "Servico muito bem feito e atendimento educado." }
    ]
  },
  {
    id: "w-ana-paula",
    name: "Ana Paula Ribeiro",
    email: "ana.design@servicosja.dev",
    phone: "(21) 99218-4409",
    city: "Rio de Janeiro, RJ",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
    role: "worker",
    mainProfession: "Designer grafica",
    professions: ["designer", "social media", "identidade visual"],
    description: "Crio marcas, posts e materiais digitais para pequenos negocios que precisam parecer maiores desde o primeiro contato.",
    basePrice: 150,
    rating: 4.8,
    reviewCount: 94,
    availability: "Esta semana",
    experience: 6,
    badge: "Bem avaliada",
    responseTime: "25 min",
    trust: 93,
    services: [
      { id: "s1", name: "Logo simples", price: 350, category: "Design" },
      { id: "s2", name: "Pacote 10 posts", price: 280, category: "Social media" },
      { id: "s3", name: "Cartao digital", price: 120, category: "Design" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=640&q=80"
    ],
    reviews: [
      { author: "Luana Freitas", rating: 5, text: "Entregou uma identidade visual linda e super alinhada com minha marca." },
      { author: "Caio Torres", rating: 4.7, text: "Rapida, criativa e muito profissional." }
    ]
  },
  {
    id: "w-carlos-mendes",
    name: "Carlos Mendes",
    email: "carlos.encanador@servicosja.dev",
    phone: "(31) 98451-3301",
    city: "Belo Horizonte, MG",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
    role: "worker",
    mainProfession: "Encanador",
    professions: ["encanador", "hidraulica", "desentupimento"],
    description: "Atendimento hidraulico residencial e comercial com diagnostico claro, garantia de servico e limpeza no acabamento.",
    basePrice: 85,
    rating: 4.7,
    reviewCount: 76,
    availability: "Hoje",
    experience: 11,
    badge: "Custo-beneficio",
    responseTime: "18 min",
    trust: 91,
    services: [
      { id: "s1", name: "Conserto de vazamento", price: 110, category: "Hidraulica" },
      { id: "s2", name: "Troca de torneira", price: 70, category: "Hidraulica" },
      { id: "s3", name: "Desentupimento simples", price: 140, category: "Hidraulica" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=640&q=80"
    ],
    reviews: [
      { author: "Denise Rocha", rating: 5, text: "Cobrou justo e resolveu rapido um vazamento complicado." },
      { author: "Helio Martins", rating: 4.6, text: "Pontual e deixou tudo limpo depois do reparo." }
    ]
  },
  {
    id: "w-bianca-lopes",
    name: "Bianca Lopes",
    email: "bianca.diarista@servicosja.dev",
    phone: "(41) 99710-2215",
    city: "Curitiba, PR",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=320&q=80",
    role: "worker",
    mainProfession: "Diarista",
    professions: ["diarista", "faxineira", "organizadora"],
    description: "Limpeza residencial detalhada, organizacao de ambientes e pos-obra leve para quem quer a casa pronta sem dor de cabeca.",
    basePrice: 160,
    rating: 4.9,
    reviewCount: 152,
    availability: "Amanha",
    experience: 7,
    badge: "Rapida resposta",
    responseTime: "8 min",
    trust: 97,
    services: [
      { id: "s1", name: "Diarista residencial", price: 180, category: "Limpeza" },
      { id: "s2", name: "Organizacao de armarios", price: 130, category: "Organizacao" },
      { id: "s3", name: "Limpeza pos-obra leve", price: 260, category: "Limpeza" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=640&q=80"
    ],
    reviews: [
      { author: "Sofia Carvalho", rating: 5, text: "Casa impecavel. Muito cuidadosa com detalhes." },
      { author: "Eduardo Pires", rating: 4.9, text: "Otima comunicacao e trabalho caprichado." }
    ]
  },
  {
    id: "w-felipe-araujo",
    name: "Felipe Araujo",
    email: "felipe.ti@servicosja.dev",
    phone: "(51) 98102-9032",
    city: "Porto Alegre, RS",
    avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=320&q=80",
    role: "worker",
    mainProfession: "Tecnico de informatica",
    professions: ["tecnico de informatica", "computadores", "redes"],
    description: "Manutencao de notebooks, formatacao, redes Wi-Fi e suporte para home office com atendimento remoto ou presencial.",
    basePrice: 100,
    rating: 4.8,
    reviewCount: 88,
    availability: "Hoje",
    experience: 8,
    badge: "Suporte express",
    responseTime: "10 min",
    trust: 94,
    services: [
      { id: "s1", name: "Formatacao com backup", price: 160, category: "TI" },
      { id: "s2", name: "Instalacao de roteador", price: 120, category: "Redes" },
      { id: "s3", name: "Limpeza preventiva notebook", price: 140, category: "TI" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80"
    ],
    reviews: [
      { author: "Andre Moreira", rating: 5, text: "Salvou meu notebook e ainda melhorou a rede de casa." },
      { author: "Nadia Ramos", rating: 4.7, text: "Muito paciente e didatico." }
    ]
  },
  {
    id: "w-marcos-pereira",
    name: "Marcos Pereira",
    email: "marcos.pedreiro@servicosja.dev",
    phone: "(61) 99342-7100",
    city: "Brasilia, DF",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=320&q=80",
    role: "worker",
    mainProfession: "Pedreiro",
    professions: ["pedreiro", "reforma", "alvenaria"],
    description: "Reformas pequenas e medias, reparos de alvenaria, contrapiso e assentamento com planejamento claro de prazo e material.",
    basePrice: 220,
    rating: 4.6,
    reviewCount: 64,
    availability: "Esta semana",
    experience: 14,
    badge: "Obra organizada",
    responseTime: "40 min",
    trust: 89,
    services: [
      { id: "s1", name: "Diaria de pedreiro", price: 280, category: "Reforma" },
      { id: "s2", name: "Assentamento por m2", price: 65, category: "Piso" },
      { id: "s3", name: "Reparo de parede", price: 180, category: "Alvenaria" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1590725121839-892b458a74fe?auto=format&fit=crop&w=640&q=80"
    ],
    reviews: [
      { author: "Bruno Sampaio", rating: 4.7, text: "Cumpriu prazo e deixou o acabamento muito bom." },
      { author: "Elisa Moraes", rating: 4.5, text: "Profissional serio e organizado." }
    ]
  },
  {
    id: "w-gabriela-nunes",
    name: "Gabriela Nunes",
    email: "gabriela.video@servicosja.dev",
    phone: "(85) 98861-4422",
    city: "Fortaleza, CE",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=320&q=80",
    role: "worker",
    mainProfession: "Editora de video",
    professions: ["editora de video", "reels", "motion"],
    description: "Edicao dinamica para redes sociais, videos institucionais e cortes para criadores que precisam publicar com consistencia.",
    basePrice: 180,
    rating: 4.9,
    reviewCount: 111,
    availability: "Esta semana",
    experience: 5,
    badge: "Criativa",
    responseTime: "30 min",
    trust: 95,
    services: [
      { id: "s1", name: "Reels com legenda", price: 90, category: "Video" },
      { id: "s2", name: "Video institucional curto", price: 480, category: "Video" },
      { id: "s3", name: "Pacote 8 cortes", price: 520, category: "Social media" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=640&q=80"
    ],
    reviews: [
      { author: "Tais Almeida", rating: 5, text: "Os videos ficaram modernos e aumentaram muito o engajamento." },
      { author: "Igor Campos", rating: 4.8, text: "Boa leitura de roteiro e entrega rapida." }
    ]
  },
  {
    id: "w-roberto-santos",
    name: "Roberto Santos",
    email: "roberto.mecanico@servicosja.dev",
    phone: "(71) 99133-8841",
    city: "Salvador, BA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=320&q=80",
    role: "worker",
    mainProfession: "Mecanico",
    professions: ["mecanico", "auto", "diagnostico veicular"],
    description: "Mecanico automotivo para manutencao preventiva, freios, troca de oleo e diagnostico com atendimento transparente.",
    basePrice: 130,
    rating: 4.7,
    reviewCount: 82,
    availability: "Amanha",
    experience: 12,
    badge: "Diagnostico claro",
    responseTime: "22 min",
    trust: 90,
    services: [
      { id: "s1", name: "Diagnostico veicular", price: 120, category: "Auto" },
      { id: "s2", name: "Troca de oleo", price: 80, category: "Auto" },
      { id: "s3", name: "Revisao de freios", price: 220, category: "Auto" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1632823469850-1b7b1e8b7e1e?auto=format&fit=crop&w=640&q=80"
    ],
    reviews: [
      { author: "Marcela Dias", rating: 4.8, text: "Explicou o problema sem empurrar servico desnecessario." },
      { author: "Vitor Leal", rating: 4.6, text: "Preco honesto e trabalho rapido." }
    ]
  },
  {
    id: "w-leticia-barros",
    name: "Leticia Barros",
    email: "leticia.dev@servicosja.dev",
    phone: "(19) 99674-2210",
    city: "Campinas, SP",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=320&q=80",
    role: "worker",
    mainProfession: "Desenvolvedora web",
    professions: ["desenvolvedora", "sites", "landing page"],
    description: "Desenvolvo sites institucionais, landing pages e pequenas automacoes para negocios locais venderem melhor online.",
    basePrice: 450,
    rating: 4.9,
    reviewCount: 67,
    availability: "Agenda aberta",
    experience: 4,
    badge: "Top portfolio",
    responseTime: "35 min",
    trust: 94,
    services: [
      { id: "s1", name: "Landing page", price: 900, category: "Web" },
      { id: "s2", name: "Site institucional", price: 1800, category: "Web" },
      { id: "s3", name: "Ajustes em site", price: 250, category: "Web" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=640&q=80"
    ],
    reviews: [
      { author: "Paulo Henrique", rating: 5, text: "Meu site ficou rapido, bonito e facil de atualizar." },
      { author: "Jussara Melo", rating: 4.9, text: "Entendeu o negocio e sugeriu melhorias muito boas." }
    ]
  },
  {
    id: "w-paulo-cesar",
    name: "Paulo Cesar Oliveira",
    email: "paulo.marceneiro@servicosja.dev",
    phone: "(47) 98439-6619",
    city: "Joinville, SC",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=320&q=80",
    role: "worker",
    mainProfession: "Marceneiro",
    professions: ["marceneiro", "moveis planejados", "montador de moveis"],
    description: "Projetos sob medida, pequenos reparos em moveis e montagem com acabamento limpo para ambientes residenciais.",
    basePrice: 190,
    rating: 4.8,
    reviewCount: 58,
    availability: "Proxima semana",
    experience: 16,
    badge: "Acabamento premium",
    responseTime: "55 min",
    trust: 92,
    services: [
      { id: "s1", name: "Montagem de guarda-roupa", price: 180, category: "Moveis" },
      { id: "s2", name: "Reparo em dobradicas", price: 90, category: "Moveis" },
      { id: "s3", name: "Prateleira sob medida", price: 260, category: "Marcenaria" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=640&q=80"
    ],
    reviews: [
      { author: "Nicolas Faria", rating: 4.9, text: "Montagem firme, acabamento limpo e pontualidade." },
      { author: "Helena Azevedo", rating: 4.7, text: "Fez uma prateleira linda para minha sala." }
    ]
  },
  {
    id: "w-renata-moura",
    name: "Renata Moura",
    email: "renata.cuidadora@servicosja.dev",
    phone: "(62) 99105-4027",
    city: "Goiania, GO",
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=320&q=80",
    role: "worker",
    mainProfession: "Cuidadora",
    professions: ["cuidadora", "idosos", "acompanhante"],
    description: "Cuidadora com experiencia em rotina de idosos, acompanhamento em consultas e suporte humanizado para familias.",
    basePrice: 220,
    rating: 4.9,
    reviewCount: 73,
    availability: "Plantao noturno",
    experience: 10,
    badge: "Alta confianca",
    responseTime: "16 min",
    trust: 98,
    services: [
      { id: "s1", name: "Plantao diurno", price: 240, category: "Cuidado" },
      { id: "s2", name: "Plantao noturno", price: 280, category: "Cuidado" },
      { id: "s3", name: "Acompanhamento em consulta", price: 130, category: "Cuidado" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=640&q=80"
    ],
    reviews: [
      { author: "Carmen Lins", rating: 5, text: "Muito carinhosa, responsavel e atenta aos detalhes." },
      { author: "Thiago Castro", rating: 4.9, text: "Passou muita seguranca para toda a familia." }
    ]
  },
  {
    id: "w-andre-lima",
    name: "Andre Lima",
    email: "andre.jardim@servicosja.dev",
    phone: "(81) 98220-1370",
    city: "Recife, PE",
    avatar: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&w=320&q=80",
    role: "worker",
    mainProfession: "Jardineiro",
    professions: ["jardineiro", "paisagismo", "poda"],
    description: "Manutencao de jardins, poda, vasos e pequenos projetos de paisagismo para casas, condominios e escritorios.",
    basePrice: 120,
    rating: 4.6,
    reviewCount: 49,
    availability: "Amanha",
    experience: 6,
    badge: "Verde em dia",
    responseTime: "45 min",
    trust: 87,
    services: [
      { id: "s1", name: "Poda simples", price: 100, category: "Jardim" },
      { id: "s2", name: "Manutencao mensal", price: 320, category: "Jardim" },
      { id: "s3", name: "Montagem de vasos", price: 160, category: "Paisagismo" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=640&q=80"
    ],
    reviews: [
      { author: "Rita Galvao", rating: 4.7, text: "Meu jardim ficou renovado e ele deu boas dicas de cuidado." },
      { author: "Matheus Brito", rating: 4.5, text: "Servico caprichado e preco justo." }
    ]
  }
];

const C2W_CATEGORIES = [
  { name: "Eletricista", icon: "fa-bolt", color: "#f5b800" },
  { name: "Diarista", icon: "fa-broom", color: "#20b486" },
  { name: "Encanador", icon: "fa-faucet-drip", color: "#2f80ed" },
  { name: "Designer", icon: "fa-pen-nib", color: "#8b5cf6" },
  { name: "Tecnico de informatica", icon: "fa-laptop-medical", color: "#06b6d4" },
  { name: "Pedreiro", icon: "fa-helmet-safety", color: "#f97316" },
  { name: "Editor de video", icon: "fa-clapperboard", color: "#ef4444" },
  { name: "Cuidadora", icon: "fa-hand-holding-heart", color: "#ec4899" }
];

const C2W_DEFAULT_CHATS = {
  "w-joao-silva": [
    { from: "worker", text: "Oi! Vi que voce precisa de ajuda eletrica. Posso te orientar no melhor servico.", time: "09:20" },
    { from: "me", text: "Preciso instalar um chuveiro novo ainda hoje.", time: "09:23" },
    { from: "worker", text: "Consigo atender no fim da tarde. Pode me mandar o modelo?", time: "09:24" }
  ],
  "w-bianca-lopes": [
    { from: "worker", text: "Tenho disponibilidade amanha pela manha para diaria.", time: "14:10" },
    { from: "me", text: "Perfeito, e limpeza pesada de cozinha?", time: "14:15" }
  ],
  "w-felipe-araujo": [
    { from: "worker", text: "Seu notebook liga mas nao inicia o sistema?", time: "18:02" },
    { from: "me", text: "Isso, fica numa tela preta.", time: "18:04" }
  ]
};

const C2W_TESTIMONIALS = [
  { name: "Camila Prado", city: "Sao Paulo", text: "Contratei um eletricista em minutos. A comparacao de perfis deixou tudo mais seguro.", rating: 5 },
  { name: "Marcos Teixeira", city: "Belo Horizonte", text: "Como prestador, consegui organizar meus servicos e responder clientes sem complicacao.", rating: 5 },
  { name: "Aline Duarte", city: "Curitiba", text: "Parece um app grande, mas simples de usar. Favoritos e chat ajudam muito.", rating: 4.8 }
];
