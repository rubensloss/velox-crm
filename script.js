/**
 * VELOX CRM - NEXT-GEN REAL ESTATE AI ENGINE
 * Handles Kanban, Speed to Lead SLA, WhatsApp 24/7 Simulator,
 * Matchmaker Reverso, XML Syndicator, Mobile Modo Visita, and Credit Desk.
 */

// ==========================================================================
// 1. STATE & DATABASE MOCKS
// ==========================================================================

const APP_STATE = {
  activeTab: 'dashboard',
  currentBroker: 'Roberto Mantovani',
  activeLeadId: 'lead-1',
  slaSecondsLeft: 258, // 04:18
  slaInterval: null,
  aiAutoPilot: true,
  isPlayingAudio: false,
};

// Properties Portfolio (Vila Velha - ES)
const PROPERTIES = [
  {
    id: 'prop-1',
    code: 'VV-8801',
    title: 'Mansão Frente Mar Praia da Costa',
    address: 'Av. Gil Veloso, 2100 - Praia da Costa, Vila Velha',
    bairro: 'Praia da Costa',
    price: 3800000,
    minSecretPrice: 3500000,
    area: 400,
    suites: 4,
    vagas: 4,
    condo: 2450,
    iptu: 4200,
    zelador: 'Sr. Sebastião (27) 99881-2233',
    chaves: 'Portaria principal - Caixa 42',
    image: 'assets/cena-1.jpg',
    ownerNote: 'Proprietário médico se mudando para SP. Aceita permuta até R$ 1.2M em apto 2 quartos em Itaparica para fechar este mês.',
    comissao: 228000,
    portais: ['ZAP Imóveis', 'VivaReal', 'Imovelweb']
  },
  {
    id: 'prop-2',
    code: 'VV-7720',
    title: 'Cobertura Duplex Praia de Itaparica',
    address: 'Av. Estudante José Júlio de Souza, 1400 - Praia de Itaparica',
    bairro: 'Praia de Itaparica',
    price: 3200000,
    minSecretPrice: 2950000,
    area: 320,
    suites: 3,
    vagas: 3,
    condo: 1850,
    iptu: 3100,
    zelador: 'Sr. Carlos (27) 99772-1144',
    chaves: 'Com o corretor de plantão na imobiliária',
    image: 'assets/cena-4.jpg',
    ownerNote: 'Não aceita permuta, mas dá R$ 250k de desconto à vista. Financiamento liberado com habite-se.',
    comissao: 192000,
    portais: ['ZAP Imóveis', 'VivaReal']
  },
  {
    id: 'prop-3',
    code: 'VV-5540',
    title: 'Apartamento Design Alto Padrão Itapuã',
    address: 'Rua Jair de Andrade, 850 - Itapuã, Vila Velha',
    bairro: 'Praia de Itapuã',
    price: 2400000,
    minSecretPrice: 2250000,
    area: 215,
    suites: 3,
    vagas: 3,
    condo: 1400,
    iptu: 2400,
    zelador: 'Dona Maria (27) 99655-3322',
    chaves: 'Fechadura eletrônica: senha 8842#',
    image: 'assets/cena-2.jpg',
    ownerNote: 'Imóvel 100% montado e decorado pela arquiteta Vivian Coser. Porteira fechada negociável.',
    comissao: 144000,
    portais: ['ZAP Imóveis', 'Meta Ads']
  },
  {
    id: 'prop-4',
    code: 'VV-9910',
    title: 'Edifício Frente ao Mar Itaparica Sunset',
    address: 'Av. José Júlio de Souza, 2900 - Praia de Itaparica',
    bairro: 'Praia de Itaparica',
    price: 1950000,
    minSecretPrice: 1800000,
    area: 175,
    suites: 3,
    vagas: 2,
    condo: 1100,
    iptu: 1900,
    zelador: 'Sr. Marcos (27) 99811-9090',
    chaves: 'Portaria 24h com crachá da imobiliária',
    image: 'assets/cena-5.jpg',
    ownerNote: 'Sol da manhã total. Aceita financiamento bancário imediato.',
    comissao: 117000,
    portais: ['ZAP Imóveis', 'VivaReal', 'Site Direto']
  },
  {
    id: 'prop-5',
    code: 'VV-3315',
    title: 'Residência Gourmet Praia da Costa',
    address: 'Rua Desembargador Augusto Botelho, 410 - Praia da Costa',
    bairro: 'Praia da Costa',
    price: 2850000,
    minSecretPrice: 2700000,
    area: 260,
    suites: 4,
    vagas: 3,
    condo: 1650,
    iptu: 2800,
    zelador: 'Sr. Renato (27) 99733-4411',
    chaves: 'Cofre na vaga de garagem 12',
    image: 'assets/cena-3.jpg',
    ownerNote: 'Excelente planta com varanda gourmet climatizada integrada. Aceita proposta rápida.',
    comissao: 171000,
    portais: ['ZAP Imóveis', 'Imovelweb']
  }
];

// Leads Database
let LEADS = [
  {
    id: 'lead-1',
    name: 'Dr. Eduardo Albuquerque',
    phone: '+55 (27) 99812-4400',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    origin: 'ZAP Imóveis',
    stage: 'visita-agendada',
    propertyInterest: 'Mansão Frente Mar Praia da Costa',
    budget: 3800000,
    bairros: ['Praia da Costa'],
    suitesDesejadas: 4,
    vagasDesejadas: 3,
    formaPagamento: '60% Entrada + Financiamento',
    urgencia: 'Alta (45 dias)',
    corretor: 'Roberto Mantovani',
    slaSeconds: 258,
    lastMsgTime: '09:42',
    unreadCount: 0
  },
  {
    id: 'lead-2',
    name: 'Mariana Vasconcelos',
    phone: '+55 (27) 99933-1122',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    origin: 'VivaReal',
    stage: 'contato',
    propertyInterest: 'Cobertura Duplex Praia de Itaparica',
    budget: 3200000,
    bairros: ['Praia de Itaparica'],
    suitesDesejadas: 3,
    vagasDesejadas: 2,
    formaPagamento: 'À Vista',
    urgencia: 'Média (90 dias)',
    corretor: 'Roberto Mantovani',
    slaSeconds: 0,
    lastMsgTime: 'Ontem',
    unreadCount: 0
  },
  {
    id: 'lead-3',
    name: 'Dr. Marcelo Fontes',
    phone: '+55 (27) 99888-5544',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    origin: 'Meta Ads',
    stage: 'novo',
    propertyInterest: 'Mansão Suspensa Praia da Costa',
    budget: 4000000,
    bairros: ['Praia da Costa'],
    suitesDesejadas: 4,
    vagasDesejadas: 4,
    formaPagamento: 'À Vista + Permuta',
    urgencia: 'Alta',
    corretor: 'Camila Siqueira',
    slaSeconds: 180,
    lastMsgTime: '08:15',
    unreadCount: 1
  },
  {
    id: 'lead-4',
    name: 'Fabiano & Carolina Guimarães',
    phone: '+55 (27) 99744-8800',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    origin: 'Site Scrollytelling',
    stage: 'proposta',
    propertyInterest: 'Apartamento Design Itapuã',
    budget: 2400000,
    bairros: ['Praia de Itapuã'],
    suitesDesejadas: 3,
    vagasDesejadas: 3,
    formaPagamento: 'Financiamento Caixa SAC',
    urgencia: 'Alta',
    corretor: 'Roberto Mantovani',
    slaSeconds: 0,
    lastMsgTime: '10:10',
    unreadCount: 0
  },
  {
    id: 'lead-5',
    name: 'Eng. Renato Sampaio',
    phone: '+55 (27) 99611-3322',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    origin: 'ZAP Imóveis',
    stage: 'visita-feita',
    propertyInterest: 'Edifício Frente Mar Itaparica Sunset',
    budget: 2000000,
    bairros: ['Praia de Itaparica'],
    suitesDesejadas: 3,
    vagasDesejadas: 2,
    formaPagamento: 'À Vista',
    urgencia: 'Média',
    corretor: 'Rodrigo Castro',
    slaSeconds: 0,
    lastMsgTime: 'Segunda',
    unreadCount: 0
  },
  {
    id: 'lead-6',
    name: 'Dra. Beatriz Meireles',
    phone: '+55 (27) 99555-9988',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    origin: 'VivaReal',
    stage: 'fechamento',
    propertyInterest: 'Residência Gourmet Praia da Costa',
    budget: 2850000,
    bairros: ['Praia da Costa'],
    suitesDesejadas: 4,
    vagasDesejadas: 3,
    formaPagamento: 'À Vista',
    urgencia: 'Fechamento Hoje',
    corretor: 'Roberto Mantovani',
    slaSeconds: 0,
    lastMsgTime: '09:00',
    unreadCount: 0
  }
];

// WhatsApp Mock Conversations
const WA_CONVERSATIONS = {
  'lead-1': [
    { sender: 'them', type: 'text', time: '09:30', text: 'Bom dia! Vi a foto da Mansão na Gil Veloso pelo Zap Imóveis. Ela ainda está disponível para visitas?' },
    { sender: 'ai', type: 'text', time: '09:30', text: 'Bom dia, Dr. Eduardo! Tudo bem? Sim, a Mansão Frente Mar está disponível com exclusividade em nossa carteira. O imóvel conta com 400m², 4 suítes e varanda gourmet cinematográfica. O senhor busca para moradia imediata ou investimento?' },
    { sender: 'them', type: 'text', time: '09:34', text: 'Moradia imediata da minha família. Nós temos dois labradores e duas SUVs, então preciso de espaço e segurança.' },
    { sender: 'ai', type: 'text', time: '09:35', text: 'Perfeito! O condomínio é 100% pet-friendly e o apartamento possui 4 vagas soltas e cobertas na garagem, ideais para SUVs grandes. Gostaria de agendar uma visita presencial para conhecer os detalhes?' },
    { sender: 'them', type: 'audio', time: '09:38', duration: '0:18', transcript: 'Olá Roberto, aqui é o Eduardo. Vi o anúncio da cobertura na Gil Veloso. Gostei muito da varanda, mas preciso saber se o proprietário analisa permuta por um apartamento meu de 3 quartos aqui mesmo na Praia da Costa. Se der negócio, posso visitar no sábado às 10h.' },
    { sender: 'ai', type: 'text', time: '09:39', text: 'Excelente áudio, Dr. Eduardo! O proprietário já nos sinalizou que avalia sim permuta por apartamento menor na Praia da Costa de até R$ 1.2M. Já pré-bloqueei na agenda do corretor Roberto Mantovani a sua visita para este Sábado às 10h. Posso confirmar o horário?' },
    { sender: 'them', type: 'text', time: '09:42', text: 'Pode confirmar sim! Sábado às 10h estou aí.' }
  ],
  'lead-2': [
    { sender: 'them', type: 'text', time: 'Ontem 15:20', text: 'Boa tarde! Qual é o valor do condomínio da cobertura em Itaparica?' },
    { sender: 'ai', type: 'text', time: 'Ontem 15:21', text: 'Boa tarde, Mariana! O condomínio da Cobertura Duplex em Itaparica é de R$ 1.850/mês, incluindo lazer completo e segurança 24h. O imóvel está desocupado e pronto para morar. Gostaria de receber o vídeo do tour virtual?' }
  ],
  'lead-3': [
    { sender: 'them', type: 'text', time: '08:14', text: 'Olá! Sou médico aqui em Vitória e procuro um apartamento de alto padrão na Praia da Costa de pelo menos 4 suítes. O que tem de exclusivo?' },
    { sender: 'ai', type: 'text', time: '08:15', text: 'Bom dia, Dr. Marcelo! É um prazer falar com o senhor. Temos exatamente 2 opções exclusivas "off-market" na orla da Praia da Costa com 4 e 5 suítes e vista definitiva para o mar. Qual faixa de investimento o senhor está priorizando?' }
  ]
};

// Digital Contracts Mock
const CONTRACTS = [
  {
    id: 'cnt-1',
    property: 'Residência Gourmet Praia da Costa',
    buyer: 'Dra. Beatriz Meireles',
    seller: 'Construtora Mantovani Empreendimentos',
    status: 'Aguardando Assinatura',
    badgeClass: 'badge-amber',
    value: 'R$ 2.850.000',
    platform: 'ZapSign Cloud',
    signers: '3 de 4 assinaram'
  },
  {
    id: 'cnt-2',
    property: 'Apartamento Design Itapuã',
    buyer: 'Fabiano & Carolina Guimarães',
    seller: 'Dr. Leonardo Aguiar',
    status: 'Em Análise Jurídica',
    badgeClass: 'badge-blue',
    value: 'R$ 2.400.000',
    platform: 'ZapSign Cloud',
    signers: 'Minuta Gerada'
  }
];

// ==========================================================================
// 2. INITIALIZATION & ROUTING
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  startSlaTimer();
  renderSlaTable();
  renderKanbanBoard();
  renderWhatsAppContacts();
  loadWhatsAppChat('lead-1');
  initMatchmaker();
  renderPropertiesCatalog();
  initModoVisita();
  calculateFinancing();
  renderContractsList();
});

// Sidebar navigation handler
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = item.getAttribute('data-tab');
      window.location.hash = tab;
      switchTab(tab);
    });
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) switchTab(hash);
  });

  const initialHash = window.location.hash.replace('#', '');
  if (initialHash) switchTab(initialHash);
}


function switchTab(tabId) {
  APP_STATE.activeTab = tabId;

  // Update nav highlight
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.mob-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-mob-tab') === tabId);
  });

  // Update panels
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `view-${tabId}`);
  });

  // Update header titles
  const titles = {
    'dashboard': { title: 'Dashboard Executivo', sub: 'Visão geral do pipeline de vendas, SLA de atendimento e velocidade de conversão' },
    'kanban': { title: 'Pipeline de Vendas (Kanban)', sub: 'Acompanhamento do ciclo de vida completo do cliente imobiliário' },
    'whatsapp': { title: 'Central WhatsApp IA (24/7)', sub: 'Atendimento instantâneo com qualificação autônoma e transcrição de áudios' },
    'matchmaker': { title: 'Matchmaker Inteligente & Reverso', sub: 'Cruzamento semântico bidirecional entre preferências de compradores e carteira' },
    'imoveis': { title: 'Gestão de Imóveis & Portais XML', sub: 'Catálogo sincronizado, gerador de copy persuasiva e exportação para ZAP/VivaReal' },
    'modo-visita': { title: 'Modo Visita (Campo)', sub: 'Ficha sigilosa para uso do corretor no celular durante a visita com o comprador' },
    'credito': { title: 'Esteira de Crédito & Financiamento', sub: 'Simulador financeiro Caixa / Itaú (SAC vs Price) e checklist de aprovação' },
    'documentos': { title: 'Gestão Documental & Assinatura Digital', sub: 'Auditoria de certidões e formalização via ZapSign' },
    'bi-avm': { title: 'BI, Análise de ROI & AVM m²', sub: 'Custo por lead por portal e precificação imobiliária baseada em inteligência de dados' }
  };

  const info = titles[tabId] || { title: 'VELOX CRM', sub: 'Gestão Imobiliária com IA' };
  document.getElementById('currentTabTitle').textContent = info.title;
  document.getElementById('currentTabSubtitle').textContent = info.sub;

  // Close mobile sidebar if open
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// ==========================================================================
// 3. SPEED TO LEAD & SLA ENGINE
// ==========================================================================

function startSlaTimer() {
  const timerDisplay = document.getElementById('slaTimer');
  if (!timerDisplay) return;

  if (APP_STATE.slaInterval) clearInterval(APP_STATE.slaInterval);

  APP_STATE.slaInterval = setInterval(() => {
    if (APP_STATE.slaSecondsLeft > 0) {
      APP_STATE.slaSecondsLeft--;
      const mins = String(Math.floor(APP_STATE.slaSecondsLeft / 60)).padStart(2, '0');
      const secs = String(APP_STATE.slaSecondsLeft % 60).padStart(2, '0');
      timerDisplay.textContent = `${mins}:${secs}`;
    } else {
      clearInterval(APP_STATE.slaInterval);
      showToast('⚠️ Tempo SLA de 5 min expirado! Lead ZAP Imóveis redistribuído automaticamente para o próximo corretor online (Camila Siqueira).', 'urgent');
      timerDisplay.textContent = '00:00';
    }
  }, 1000);
}

function dismissSlaBanner() {
  const banner = document.getElementById('slaBanner');
  if (banner) banner.style.display = 'none';
}

function renderSlaTable() {
  const tbody = document.getElementById('slaTableBody');
  if (!tbody) return;

  const activeLeads = LEADS.filter(l => l.stage === 'novo' || l.stage === 'visita-agendada').slice(0, 4);

  tbody.innerHTML = activeLeads.map(lead => `
    <tr>
      <td>
        <div style="font-weight:700; color:#fff;">${lead.name}</div>
        <div style="font-size:0.75rem; color:#94a3b8;">${lead.phone}</div>
      </td>
      <td><span class="badge ${getOriginBadge(lead.origin)}">${lead.origin}</span></td>
      <td>${lead.propertyInterest}</td>
      <td><i class="fa-solid fa-user-tie text-gold"></i> ${lead.corretor}</td>
      <td><span class="text-red font-mono" style="font-weight:800;">${lead.slaSeconds > 0 ? '03:45' : 'Atendido'}</span></td>
      <td>
        <button class="btn-micro" onclick="openWhatsAppModal('${lead.id}')">
          <i class="fa-brands fa-whatsapp"></i> Chamar
        </button>
      </td>
    </tr>
  `).join('');
}

function getOriginBadge(origin) {
  if (origin.includes('ZAP')) return 'badge-blue';
  if (origin.includes('VivaReal')) return 'badge-amber';
  if (origin.includes('Meta')) return 'badge-purple';
  return 'badge-emerald';
}

function simulateNewLeadArrival() {
  openModal('newLeadModal');
}

function submitSimulatedLead() {
  const name = document.getElementById('simLeadName').value || 'Novo Cliente';
  const phone = document.getElementById('simLeadPhone').value || '(27) 99999-0000';
  const property = document.getElementById('simLeadProperty').value;

  const newLead = {
    id: `lead-${Date.now()}`,
    name,
    phone,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    origin: 'ZAP Imóveis',
    stage: 'novo',
    propertyInterest: property,
    budget: 3500000,
    bairros: ['Praia da Costa'],
    suitesDesejadas: 4,
    vagasDesejadas: 3,
    formaPagamento: 'Financiamento',
    urgencia: 'Alta',
    corretor: 'Roberto Mantovani',
    slaSeconds: 300,
    lastMsgTime: 'Agora',
    unreadCount: 1
  };

  LEADS.unshift(newLead);
  APP_STATE.slaSecondsLeft = 300;
  document.getElementById('slaLeadName').textContent = name;
  document.getElementById('slaBanner').style.display = 'block';

  // Add conversation
  WA_CONVERSATIONS[newLead.id] = [
    { sender: 'them', type: 'text', time: 'Agora', text: `Olá! Tenho interesse no imóvel "${property}". Gostaria de mais informações sobre as condições de pagamento e agendar uma visita.` },
    { sender: 'ai', type: 'text', time: 'Agora', text: `Olá, ${name}! Sou a assistente de atendimento exclusivo da imobiliária. Recebi seu pedido de contato via ZAP Imóveis sobre o ${property}. Como prefere receber os detalhes: por aqui no WhatsApp ou em uma rápida ligação?` }
  ];

  closeModal('newLeadModal');
  renderKanbanBoard();
  renderSlaTable();
  renderWhatsAppContacts();
  startSlaTimer();

  showToast(`⚡ Webhook ZAP Imóveis recebido! Lead "${name}" distribuído para Roberto Mantovani. Cronômetro de 5 minutos iniciado!`, 'gold');
}

// ==========================================================================
// 4. KANBAN PIPELINE ENGINE
// ==========================================================================

const STAGES = ['novo', 'contato', 'visita-agendada', 'visita-feita', 'proposta', 'fechamento'];

function renderKanbanBoard() {
  const searchTerm = (document.getElementById('kanbanSearch')?.value || '').toLowerCase();
  const filterCorretor = document.getElementById('filterCorretor')?.value || 'todos';
  const filterOrigem = document.getElementById('filterOrigem')?.value || 'todos';

  STAGES.forEach(stage => {
    const area = document.getElementById(`cards-${stage}`);
    const counter = document.getElementById(`count-${stage}`);
    if (!area) return;

    const filtered = LEADS.filter(lead => {
      if (lead.stage !== stage) return false;
      if (filterCorretor !== 'todos' && lead.corretor !== filterCorretor) return false;
      if (filterOrigem !== 'todos' && lead.origin !== filterOrigem) return false;
      if (searchTerm) {
        const full = `${lead.name} ${lead.propertyInterest} ${lead.phone}`.toLowerCase();
        if (!full.includes(searchTerm)) return false;
      }
      return true;
    });

    if (counter) counter.textContent = filtered.length;

    area.innerHTML = filtered.map(lead => `
      <div class="kanban-card" draggable="true" ondragstart="handleDragStart(event, '${lead.id}')">
        <div class="card-origin-tag">
          <span class="badge ${getOriginBadge(lead.origin)}">${lead.origin}</span>
          <span class="text-muted"><i class="fa-regular fa-clock"></i> ${lead.lastMsgTime}</span>
        </div>
        <div class="lead-title-row">
          <h4 class="lead-name">${lead.name}</h4>
          <p class="lead-prop-interest" title="${lead.propertyInterest}">
            <i class="fa-solid fa-house-chimney text-muted"></i> ${lead.propertyInterest}
          </p>
        </div>
        <div class="lead-budget-tag">R$ ${(lead.budget / 1000000).toFixed(1)}M</div>
        <div class="lead-card-footer">
          <div class="lead-broker-avatar" title="${lead.corretor}">
            <img src="${lead.avatar}" alt="${lead.corretor}" />
            <span>${lead.corretor.split(' ')[0]}</span>
          </div>
          <div class="card-actions-quick">
            <button class="btn-card-action" title="Abrir WhatsApp" onclick="openWhatsAppModal('${lead.id}')">
              <i class="fa-brands fa-whatsapp text-emerald"></i>
            </button>
            <button class="btn-card-action" title="Ficha Modo Visita" onclick="openModoVisitaByLead('${lead.id}')">
              <i class="fa-solid fa-key text-gold"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  });
}

function filterKanban() {
  renderKanbanBoard();
}

let draggedLeadId = null;

function handleDragStart(e, leadId) {
  draggedLeadId = leadId;
  e.dataTransfer.setData('text/plain', leadId);
}

function allowDrop(e) {
  e.preventDefault();
}

function handleDrop(e, targetStage) {
  e.preventDefault();
  if (!draggedLeadId) return;

  const lead = LEADS.find(l => l.id === draggedLeadId);
  if (lead && lead.stage !== targetStage) {
    lead.stage = targetStage;
    renderKanbanBoard();
    showToast(`Lead "${lead.name}" movido para "${formatStageName(targetStage)}" com sucesso!`, 'emerald');
  }
  draggedLeadId = null;
}

function formatStageName(stage) {
  const map = {
    'novo': 'Novo Lead',
    'contato': 'Qualificado / IA',
    'visita-agendada': 'Visita Agendada',
    'visita-feita': 'Visita Realizada',
    'proposta': 'Proposta Comercial',
    'fechamento': 'Contrato / Assinatura'
  };
  return map[stage] || stage;
}

// ==========================================================================
// 5. WHATSAPP MULTI-AGENT SIMULATOR (24/7)
// ==========================================================================

function renderWhatsAppContacts() {
  const list = document.getElementById('waContactsList');
  if (!list) return;

  const search = (document.getElementById('waSearchInput')?.value || '').toLowerCase();

  const filtered = LEADS.filter(l => {
    if (!search) return true;
    return (l.name + l.phone + l.propertyInterest).toLowerCase().includes(search);
  });

  list.innerHTML = filtered.map(lead => {
    const msgs = WA_CONVERSATIONS[lead.id] || [];
    const last = msgs[msgs.length - 1];
    const lastText = last ? (last.type === 'audio' ? '🎵 Áudio gravado (0:18)' : last.text) : 'Nova conversa';
    const isActive = lead.id === APP_STATE.activeLeadId;

    return `
      <div class="wa-contact-item ${isActive ? 'active' : ''}" onclick="loadWhatsAppChat('${lead.id}')">
        <div class="avatar-ring online">
          <img src="${lead.avatar}" alt="${lead.name}" />
        </div>
        <div class="wa-contact-details">
          <div class="wa-contact-top">
            <span class="wa-name">${lead.name}</span>
            <span class="wa-time">${lead.lastMsgTime}</span>
          </div>
          <div class="wa-last-msg">${lastText}</div>
          <div class="wa-badge-row">
            <span class="badge ${getOriginBadge(lead.origin)}">${lead.origin}</span>
            <span class="badge badge-gold">${formatStageName(lead.stage)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterWhatsAppContacts() {
  renderWhatsAppContacts();
}

function loadWhatsAppChat(leadId) {
  APP_STATE.activeLeadId = leadId;
  const lead = LEADS.find(l => l.id === leadId);
  if (!lead) return;

  renderWhatsAppContacts();

  // Header
  document.getElementById('waChatName').textContent = lead.name;
  document.getElementById('waChatPhone').textContent = lead.phone;
  document.getElementById('waChatAvatar').src = lead.avatar;
  document.getElementById('waChatBadge').textContent = lead.propertyInterest;
  document.getElementById('waChatStage').innerHTML = `<i class="fa-solid fa-flag"></i> ${formatStageName(lead.stage)}`;

  // Messages Body
  const messages = WA_CONVERSATIONS[leadId] || [];
  const body = document.getElementById('waMessagesBody');
  if (!body) return;

  body.innerHTML = messages.map(msg => {
    if (msg.sender === 'them' && msg.type === 'audio') {
      return `
        <div class="wa-bubble incoming">
          <div class="wa-audio-box">
            <button class="btn-audio-play" onclick="playMockAudio(this)">
              <i class="fa-solid fa-play"></i>
            </button>
            <div class="waveform-container">
              ${Array(18).fill(0).map((_, i) => `<div class="waveform-bar" style="height:${[6,14,20,8,16,22,12,18,10,24,14,19,8,15,22,16,10,12][i]}px"></div>`).join('')}
            </div>
            <span class="audio-duration">${msg.duration}</span>
          </div>
          <div class="transcription-accordion">
            <div class="transcription-header">
              <i class="fa-solid fa-sparkles"></i> Transcrição Instantânea IA:
            </div>
            <div class="transcription-text">"${msg.transcript}"</div>
          </div>
          <div class="bubble-time">${msg.time}</div>
        </div>
      `;
    }

    const isOutgoing = msg.sender === 'me' || msg.sender === 'ai';
    const isAi = msg.sender === 'ai';

    return `
      <div class="wa-bubble ${isOutgoing ? (isAi ? 'outgoing ai-reply' : 'outgoing') : 'incoming'}">
        ${isAi ? `<div class="ai-agent-tag"><i class="fa-solid fa-robot"></i> Resposta Automática da IA (24/7)</div>` : ''}
        <div class="bubble-text">${msg.text}</div>
        <div class="bubble-time">
          ${msg.time}
          ${isOutgoing ? '<i class="fa-solid fa-check-double text-blue"></i>' : ''}
        </div>
      </div>
    `;
  }).join('');

  body.scrollTop = body.scrollHeight;

  // Update Dossier & AI Insights
  updateAiDossier(lead);
}

function updateAiDossier(lead) {
  const summaryBox = document.getElementById('aiSummaryContent');
  if (!summaryBox) return;

  summaryBox.innerHTML = `
    • <strong>Perfil Decisor:</strong> ${lead.name} — Intenção de compra em Vila Velha.<br/>
    • <strong>Interesse Primário:</strong> ${lead.propertyInterest} (${lead.bairros.join(', ')}).<br/>
    • <strong>Condição Comercial:</strong> ${lead.formaPagamento} com teto de R$ ${(lead.budget/1000000).toFixed(1)}M.<br/>
    • <strong>Status da Jornada:</strong> ${formatStageName(lead.stage)}.<br/>
    • <strong>Ação Recomendada pela IA:</strong> Apresentar simulação de entrada + agendar visita física no sábado.
  `;

  // Matched mini properties
  const miniList = document.getElementById('matchedMiniList');
  if (miniList) {
    const matched = PROPERTIES.slice(0, 2);
    miniList.innerHTML = matched.map(p => `
      <div class="match-mini-item">
        <img src="${p.image}" alt="${p.title}" />
        <div style="overflow:hidden;">
          <div style="font-weight:700; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${p.title}</div>
          <div class="text-gold">R$ ${(p.price/1000000).toFixed(1)}M • ${p.suites} suítes</div>
        </div>
      </div>
    `).join('');
  }
}

function playMockAudio(btn) {
  const container = btn.closest('.wa-bubble').querySelector('.waveform-container');
  const icon = btn.querySelector('i');

  if (APP_STATE.isPlayingAudio) {
    APP_STATE.isPlayingAudio = false;
    icon.className = 'fa-solid fa-play';
    container.classList.remove('playing');
  } else {
    APP_STATE.isPlayingAudio = true;
    icon.className = 'fa-solid fa-pause';
    container.classList.add('playing');
    showToast('Reproduzindo áudio do WhatsApp com análise em tempo real pela IA...', 'blue');

    setTimeout(() => {
      APP_STATE.isPlayingAudio = false;
      icon.className = 'fa-solid fa-play';
      container.classList.remove('playing');
    }, 4000);
  }
}

function generateExecutiveSummary() {
  const lead = LEADS.find(l => l.id === APP_STATE.activeLeadId);
  if (!lead) return;

  showToast('✨ Gemini 2.5 sintetizando histórico completo da conversa...', 'gold');

  setTimeout(() => {
    const summaryBox = document.getElementById('aiSummaryContent');
    summaryBox.innerHTML = `
      • <strong>SÍNTESE EXECUTIVA GEMINI 2.5:</strong><br/>
      • <strong>Motivação:</strong> Busca imediata de imóvel amplo para a família e pets.<br/>
      • <strong>Gargalo Superado:</strong> Já esclarecido que o condomínio aceita cães e possui 4 vagas livres.<br/>
      • <strong>Ponto Chave de Fechamento:</strong> Proprietário pré-aprovou analisar permuta de R$ 1.2M.<br/>
      • <strong>Próximo Passo Traçado:</strong> Visita presencial confirmada para Sábado às 10h com o corretor Roberto Mantovani.
    `;
    document.getElementById('summaryUpdatedTag').textContent = 'Acabou de atualizar';
    showToast('Resumo executivo atualizado no dossiê!', 'emerald');
  }, 1000);
}

function sendWaMessage() {
  const input = document.getElementById('waMessageInput');
  const text = (input?.value || '').trim();
  if (!text) return;

  const leadId = APP_STATE.activeLeadId;
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  if (!WA_CONVERSATIONS[leadId]) WA_CONVERSATIONS[leadId] = [];

  // Add outgoing broker message
  WA_CONVERSATIONS[leadId].push({
    sender: 'me',
    type: 'text',
    time,
    text
  });

  input.value = '';
  loadWhatsAppChat(leadId);

  // If customer responds after 2s
  setTimeout(() => {
    WA_CONVERSATIONS[leadId].push({
      sender: 'them',
      type: 'text',
      time,
      text: 'Obrigado pelo retorno rápido, Roberto! Perfeito, combinado.'
    });
    loadWhatsAppChat(leadId);
  }, 1800);
}

function handleWaEnter(e) {
  if (e.key === 'Enter') sendWaMessage();
}

function sendAiSuggestedReply(index) {
  const replies = {
    1: 'Perfeito! Já confirmei em nosso sistema a sua visita presencial para amanhã às 10h com o corretor Roberto Mantovani. Posso te enviar a localização no Waze?',
    2: 'Preparei um estudo financeiro com simulação pela Caixa (Tabela SAC com parcelas decrescentes) e Itaú. Vou te enviar o arquivo em PDF detalhado agora mesmo!',
    3: 'Acabei de subir no nosso servidor um vídeo exclusivo do living e da varanda gourmet para o senhor visualizar antes da nossa visita. Segue o link privativo.'
  };

  const input = document.getElementById('waMessageInput');
  if (input) {
    input.value = replies[index] || '';
    sendWaMessage();
  }
}

function simulateIncomingAudio() {
  const leadId = APP_STATE.activeLeadId;
  if (!WA_CONVERSATIONS[leadId]) WA_CONVERSATIONS[leadId] = [];

  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  WA_CONVERSATIONS[leadId].push({
    sender: 'them',
    type: 'audio',
    time,
    duration: '0:22',
    transcript: 'Roberto, passei na porta do prédio e achei a fachada espetacular. Quero fechar a proposta se o proprietário mantiver o valor à vista.'
  });

  loadWhatsAppChat(leadId);
  showToast('🎙️ Novo áudio do cliente recebido e transcrito instantaneamente pela IA!', 'gold');
}

function toggleAiAutoPilot(cb) {
  APP_STATE.aiAutoPilot = cb.checked;
  showToast(APP_STATE.aiAutoPilot ? '🤖 Agente de IA 24/7 ativado para qualificação autônoma no WhatsApp!' : 'Agente IA pausado. Modo manual ativado.', 'blue');
}

function openWhatsAppModal(leadId) {
  switchTab('whatsapp');
  loadWhatsAppChat(leadId);
}

// ==========================================================================
// 6. MATCHMAKER INTELIGENTE & REVERSO
// ==========================================================================

function initMatchmaker() {
  // Populate lead selector for direct mode
  const leadSelect = document.getElementById('matchLeadSelect');
  if (leadSelect) {
    leadSelect.innerHTML = LEADS.map(l => `
      <option value="${l.id}">${l.name} (Budget: R$ ${(l.budget/1000000).toFixed(1)}M - ${l.bairros[0]})</option>
    `).join('');
  }

  // Populate property selector for reverse mode
  const revSelect = document.getElementById('reversePropertySelect');
  if (revSelect) {
    revSelect.innerHTML = PROPERTIES.map(p => `
      <option value="${p.id}">${p.title} - R$ ${(p.price/1000000).toFixed(1)}M (${p.bairro})</option>
    `).join('');
  }

  runDirectMatchmaking();
}

function switchMatchmakerMode(mode) {
  const btnDirect = document.getElementById('tabMatchDirect');
  const btnReverse = document.getElementById('tabMatchReverse');
  const contDirect = document.getElementById('matchDirectContainer');
  const contReverse = document.getElementById('matchReverseContainer');

  if (mode === 'direct') {
    btnDirect.classList.add('active');
    btnReverse.classList.remove('active');
    contDirect.classList.remove('hidden');
    contReverse.classList.add('hidden');
    runDirectMatchmaking();
  } else {
    btnDirect.classList.remove('active');
    btnReverse.classList.add('active');
    contDirect.classList.add('hidden');
    contReverse.classList.remove('hidden');
    runReverseMatchmaking();
  }
}

function runDirectMatchmaking() {
  const leadId = document.getElementById('matchLeadSelect')?.value || 'lead-1';
  const lead = LEADS.find(l => l.id === leadId) || LEADS[0];

  // Render active preferences badge
  const prefsBox = document.getElementById('leadActivePrefs');
  if (prefsBox) {
    prefsBox.innerHTML = `
      <span class="badge badge-gold"><i class="fa-solid fa-wallet"></i> Até R$ ${(lead.budget/1000000).toFixed(1)}M</span>
      <span class="badge badge-emerald"><i class="fa-solid fa-location-dot"></i> ${lead.bairros.join(', ')}</span>
      <span class="badge badge-blue"><i class="fa-solid fa-bed"></i> Min. ${lead.suitesDesejadas} suítes</span>
      <span class="badge badge-purple"><i class="fa-solid fa-car"></i> ${lead.vagasDesejadas} vagas</span>
    `;
  }

  // Calculate scores
  const resultsGrid = document.getElementById('matchDirectResultsGrid');
  if (!resultsGrid) return;

  const scored = PROPERTIES.map(prop => {
    let score = 70;
    if (prop.price <= lead.budget) score += 15;
    if (lead.bairros.includes(prop.bairro)) score += 10;
    if (prop.suites >= lead.suitesDesejadas) score += 5;
    return { prop, score: Math.min(score, 98) };
  }).sort((a, b) => b.score - a.score);

  resultsGrid.innerHTML = scored.map(item => `
    <div class="match-card">
      <div class="match-card-img-wrap">
        <img src="${item.prop.image}" alt="${item.prop.title}" />
        <div class="match-score-badge">
          <i class="fa-solid fa-sparkles"></i> ${item.score}% Match
        </div>
      </div>
      <div class="match-card-body">
        <div class="match-card-price">R$ ${(item.prop.price / 1000000).toFixed(2)}M</div>
        <h4 class="match-card-title">${item.prop.title}</h4>
        <div class="match-card-features">
          <span><i class="fa-solid fa-bed"></i> ${item.prop.suites} Suítes</span>
          <span><i class="fa-solid fa-ruler-combined"></i> ${item.prop.area}m²</span>
          <span><i class="fa-solid fa-car"></i> ${item.prop.vagas} Vagas</span>
        </div>
        <div class="match-card-reasons">
          <i class="fa-solid fa-check text-emerald"></i> ${item.prop.bairro} • Sol da manhã • Varanda gourmet
        </div>
        <div class="match-card-footer">
          <button class="btn-primary" style="flex:1;" onclick="sharePropertyWithLead('${lead.id}', '${item.prop.id}')">
            <i class="fa-brands fa-whatsapp"></i> Enviar pelo WhatsApp
          </button>
          <button class="btn-secondary" onclick="openModoVisita('${item.prop.id}')" title="Modo Visita">
            <i class="fa-solid fa-key"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// MATCHMAKER REVERSO (NOVO IMÓVEL -> BASE DE LEADS PARADOS)
function runReverseMatchmaking() {
  const propId = document.getElementById('reversePropertySelect')?.value || 'prop-1';
  const prop = PROPERTIES.find(p => p.id === propId) || PROPERTIES[0];

  const matchedLeads = LEADS.map(lead => {
    let fit = 75;
    if (lead.budget >= prop.price * 0.9) fit += 15;
    if (lead.bairros.includes(prop.bairro)) fit += 8;
    return { lead, fit: Math.min(fit, 99) };
  }).sort((a, b) => b.fit - a.fit);

  document.getElementById('reverseCount').textContent = matchedLeads.length;

  const leadsList = document.getElementById('reverseLeadsList');
  if (leadsList) {
    leadsList.innerHTML = matchedLeads.map((item, idx) => `
      <div class="reverse-lead-card ${idx === 0 ? 'active' : ''}" onclick="selectReverseLead('${item.lead.id}', '${prop.id}', this)">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <strong style="color:#fff; font-size:0.92rem;">${item.lead.name}</strong>
          <span class="badge badge-emerald">${item.fit}% Fit</span>
        </div>
        <div style="font-size:0.78rem; color:#94a3b8;">
          Budget: R$ ${(item.lead.budget/1000000).toFixed(1)}M • Busca em ${item.lead.bairros[0]}
        </div>
        <div style="font-size:0.72rem; color:#d4af37; margin-top:4px;">
          <i class="fa-solid fa-clock-rotate-left"></i> Lead inativo há 45 dias na base
        </div>
      </div>
    `).join('');
  }

  // Load first pitch
  if (matchedLeads.length > 0) {
    loadReversePitch(matchedLeads[0].lead, prop);
  }
}

function selectReverseLead(leadId, propId, element) {
  document.querySelectorAll('.reverse-lead-card').forEach(el => el.classList.remove('active'));
  if (element) element.classList.add('active');

  const lead = LEADS.find(l => l.id === leadId);
  const prop = PROPERTIES.find(p => p.id === propId);
  if (lead && prop) loadReversePitch(lead, prop);
}

function loadReversePitch(lead, prop) {
  const pitchBox = document.getElementById('reversePitchText');
  if (!pitchBox) return;

  const firstName = lead.name.split(' ')[0];
  const pitch = `Olá, ${firstName}! Tudo bem? Me lembrei imediatamente de você porque acabou de entrar com exclusividade em nossa carteira a "${prop.title}", na ${prop.bairro}.\n\nO imóvel tem exatamente as características que você estava buscando: ${prop.area}m², ${prop.suites} suítes e ${prop.vagas} vagas de garagem soltas. O proprietário está disposto a negociar uma condição especial de lançamento nesta semana antes de abrirmos para todos os portais.\n\nPosso te enviar as fotos e a planta privativa em primeira mão aqui pelo WhatsApp?`;

  pitchBox.textContent = pitch;
}

function copyPitchText() {
  const pitch = document.getElementById('reversePitchText')?.textContent;
  if (pitch) {
    navigator.clipboard.writeText(pitch);
    showToast('Mensagem personalizada da IA copiada para a área de transferência!', 'emerald');
  }
}

function openWhatsAppWithPitch() {
  const pitch = document.getElementById('reversePitchText')?.textContent;
  switchTab('whatsapp');
  const input = document.getElementById('waMessageInput');
  if (input) input.value = pitch;
  showToast('Mensagem carregada na Central WhatsApp! Clique em Enviar.', 'gold');
}

function sharePropertyWithLead(leadId, propId) {
  const prop = PROPERTIES.find(p => p.id === propId);
  const lead = LEADS.find(l => l.id === leadId);
  switchTab('whatsapp');
  loadWhatsAppChat(leadId);

  const text = `Olá ${lead.name.split(' ')[0]}! Encontrei este imóvel na nossa carteira com 98% de afinidade com o seu perfil: ${prop.title} por R$ ${(prop.price/1000000).toFixed(1)}M. Segue o link com as fotos exclusivas!`;
  const input = document.getElementById('waMessageInput');
  if (input) {
    input.value = text;
    sendWaMessage();
  }
}

// ==========================================================================
// 7. IMÓVEIS & COPYWRITER IA COM FEED XML
// ==========================================================================

function renderPropertiesCatalog() {
  const grid = document.getElementById('propertiesCatalogGrid');
  const selectCopy = document.getElementById('copyPropertySelect');
  const selectModo = document.getElementById('modoVisitaPropertySelect');

  if (grid) {
    grid.innerHTML = PROPERTIES.map(prop => `
      <div class="property-catalog-card">
        <img src="${prop.image}" alt="${prop.title}" />
        <div class="prop-cat-body">
          <div class="prop-cat-price">R$ ${(prop.price / 1000000).toFixed(2)}M</div>
          <h4 class="prop-cat-title">${prop.title}</h4>
          <p class="prop-cat-address"><i class="fa-solid fa-location-dot"></i> ${prop.address}</p>
          <div class="portal-badges-row">
            ${prop.portais.map(p => `<span class="badge badge-blue">${p}</span>`).join('')}
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn-secondary" style="flex:1;" onclick="openModoVisita('${prop.id}')">
              <i class="fa-solid fa-key"></i> Modo Visita
            </button>
            <button class="btn-gold" onclick="selectPropertyForCopy('${prop.id}')">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Copy IA
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Populate copywriter select
  if (selectCopy) {
    selectCopy.innerHTML = PROPERTIES.map(p => `
      <option value="${p.id}">${p.title} - R$ ${(p.price/1000000).toFixed(1)}M</option>
    `).join('');
  }

  // Populate Modo Visita select
  if (selectModo) {
    selectModo.innerHTML = PROPERTIES.map(p => `
      <option value="${p.id}">${p.title} (${p.bairro})</option>
    `).join('');
  }
}

function selectPropertyForCopy(propId) {
  const select = document.getElementById('copyPropertySelect');
  if (select) select.value = propId;
  generateAiPropertyCopy();
  window.scrollTo({ top: document.querySelector('.ai-copywriter-card').offsetTop - 80, behavior: 'smooth' });
}

function generateAiPropertyCopy() {
  const propId = document.getElementById('copyPropertySelect')?.value || 'prop-1';
  const tone = document.getElementById('copyToneSelect')?.value || 'luxo';
  const prop = PROPERTIES.find(p => p.id === propId) || PROPERTIES[0];

  showToast('✨ Gemini 2.5 criando copy imobiliária persuasiva...', 'gold');

  setTimeout(() => {
    let title = '';
    let body = '';
    let social = '';

    if (tone === 'luxo') {
      title = `${prop.title} | ${prop.suites} Suítes, ${prop.area}m², Acabamento Nobre e Vista Indevassável`;
      body = `Exclusividade e sofisticação na localização mais desejada de ${prop.bairro}.\n\nEsta cinematográfica residência com ${prop.area}m² privativos traduz o mais elevado padrão construtivo. Com living monumental integrado à varanda panorâmica, acabamento em mármore importado e marcenaria de grife.\n\n• ${prop.suites} amplas suítes com closet e banheiros em mármore\n• ${prop.vagas} vagas privativas na garagem\n• Lazer de clube completo no condomínio\n• Segurança 24 horas e portaria blindada\n\nAgende sua visita privativa com atendimento exclusivo.`;
      social = `🌊 Viva o extraordinário em ${prop.bairro}.\n\n${prop.title} com ${prop.area}m² e ${prop.suites} suítes. O imóvel dos seus sonhos acaba de ficar disponível.\n\n📲 Solicite o book em PDF pelo WhatsApp.\n\n#ImoveisDeLuxo #${prop.bairro.replace(/ /g,'')} #VilaVelha #AltoPadrao`;
    } else if (tone === 'investidor') {
      title = `Oportunidade de Investimento em ${prop.bairro}: ${prop.title} (${prop.area}m²)`;
      body = `Excelente ativo patrimonial com alto potencial de valorização e liquidez no mercado imobiliário de ${prop.bairro}.\n\n• Valor por m² altamente competitivo com a média cartorial\n• Imóvel 100% regularizado com documentação em dia\n• Alta demanda de locação por temporada ou anual\n\nEstudo de rentabilidade disponível para investidores.`;
      social = `💼 Oportunidade para sua carteira de investimentos em ${prop.bairro}.\n\nRetorno estimado acima da média de mercado. Fale com nosso especialista.`;
    } else {
      title = `O Lar Perfeito para sua Família: ${prop.title} com ${prop.suites} Suítes e Lazer Completo`;
      body = `Crie momentos inesquecíveis com quem você mais ama.\n\nCom ${prop.area}m² de muito conforto, esta residência em ${prop.bairro} oferece ambientes amplos e integrados, sol da manhã e condomínio com lazer que seus filhos vão adorar.\n\nVenha conhecer de perto!`;
      social = `👨‍👩‍👧‍👦 Espaço, segurança e felicidade para sua família em ${prop.bairro}.\n\nAgende sua visita hoje mesmo!`;
    }

    document.getElementById('copyTitleResult').textContent = title;
    document.getElementById('copyBodyResult').innerHTML = body.replace(/\n/g, '<br/>');
    document.getElementById('copySocialResult').innerHTML = social.replace(/\n/g, '<br/>');

    showToast('Novos textos gerados pela IA com sucesso!', 'emerald');
  }, 800);
}

function openXmlModal() {
  const xml = generatePortalsXml();
  document.getElementById('xmlContentPreview').textContent = xml;
  openModal('xmlModal');
}

function generatePortalsXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<ListingDataFeed xmlns="http://www.vivareal.com/schemas/1.0/VRSync">
  <Header>
    <Provider>VELOX CRM Real Estate AI</Provider>
    <Email>contato@veloxcrm.com.br</Email>
    <ContactName>Roberto Mantovani</ContactName>
    <PublishDate>${new Date().toISOString()}</PublishDate>
  </Header>
  <Listings>
${PROPERTIES.map(p => `    <Listing>
      <ListingID>${p.code}</ListingID>
      <Title><![CDATA[${p.title}]]></Title>
      <TransactionType>For Sale</TransactionType>
      <ListPrice currency="BRL">${p.price}</ListPrice>
      <PropertyAdministrationFee currency="BRL">${p.condo}</PropertyAdministrationFee>
      <YearlyTax currency="BRL">${p.iptu}</YearlyTax>
      <DetailViewUrl>https://veloxcrm.com.br/imovel/${p.code}</DetailViewUrl>
      <Location displayAddress="All">
        <Country code="BR">Brasil</Country>
        <State code="ES">Espírito Santo</State>
        <City>Vila Velha</City>
        <Neighborhood>${p.bairro}</Neighborhood>
        <Address>${p.address}</Address>
      </Location>
      <Details>
        <PropertyType>Residential / Apartment</PropertyType>
        <LivingArea unit="square metres">${p.area}</LivingArea>
        <Bedrooms>${p.suites}</Bedrooms>
        <Suites>${p.suites}</Suites>
        <Garage type="Parking Space">${p.vagas}</Garage>
      </Details>
    </Listing>`).join('\n')}
  </Listings>
</ListingDataFeed>`;
}

function copyXmlFeed() {
  const xml = document.getElementById('xmlContentPreview')?.textContent;
  if (xml) {
    navigator.clipboard.writeText(xml);
    showToast('Feed XML copiado para a área de transferência!', 'emerald');
  }
}

function downloadXmlFeed() {
  const xml = document.getElementById('xmlContentPreview')?.textContent;
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'feed-portais-zap-vivareal.xml';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Arquivo feed-portais-zap-vivareal.xml baixado!', 'emerald');
}

// ==========================================================================
// 8. MODO VISITA (CAMPO & MOBILE FRAME)
// ==========================================================================

function initModoVisita() {
  updateModoVisitaView('prop-1');
}

function openModoVisita(propId) {
  switchTab('modo-visita');
  const select = document.getElementById('modoVisitaPropertySelect');
  if (select) select.value = propId;
  updateModoVisitaView(propId);
}

function openModoVisitaByLead(leadId) {
  const lead = LEADS.find(l => l.id === leadId);
  const prop = PROPERTIES.find(p => p.title.includes(lead.propertyInterest) || lead.propertyInterest.includes(p.title)) || PROPERTIES[0];
  openModoVisita(prop.id);
}

function openModoVisitaForActiveChat() {
  openModoVisitaByLead(APP_STATE.activeLeadId);
}

function updateModoVisitaView(targetId) {
  const propId = targetId || document.getElementById('modoVisitaPropertySelect')?.value || 'prop-1';
  const prop = PROPERTIES.find(p => p.id === propId) || PROPERTIES[0];

  document.getElementById('mvImage').src = prop.image;
  document.getElementById('mvTitle').textContent = prop.title;
  document.getElementById('mvAddress').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${prop.address}`;
  document.getElementById('mvPublicPrice').textContent = `R$ ${(prop.price/1000000).toFixed(2)}M (Valor de Anúncio)`;

  document.getElementById('mvMinPrice').textContent = `R$ ${(prop.minSecretPrice/1000000).toFixed(2)}M à vista`;
  document.getElementById('mvProprietarioNote').textContent = `"${prop.ownerNote}"`;
  document.getElementById('mvComissao').textContent = `R$ ${prop.comissao.toLocaleString('pt-BR')} (6%)`;
  document.getElementById('mvCondo').textContent = `R$ ${prop.condo.toLocaleString('pt-BR')}/mês`;
  document.getElementById('mvIptu').textContent = `R$ ${prop.iptu.toLocaleString('pt-BR')}/ano`;
}

function recordVisitFeedback(temp) {
  const tempTexts = {
    'quente': '🔥 Cliente Adorou! Lead movido para "Proposta Comercial".',
    'morno': '👍 Cliente Gostou, mas pediu para analisar condomínio.',
    'frio': '❄️ Cliente achou fora do perfil. IA ativada para sugerir novos imóveis.'
  };

  showToast(tempTexts[temp] || 'Feedback registrado!', 'emerald');

  if (temp === 'quente') {
    const lead = LEADS.find(l => l.id === APP_STATE.activeLeadId);
    if (lead) {
      lead.stage = 'proposta';
      renderKanbanBoard();
    }
  }
}

// ==========================================================================
// 9. SIMULADOR DE CRÉDITO & FINANCIAMENTO
// ==========================================================================

function syncEntradaRange(val) {
  document.getElementById('entradaPercentLabel').textContent = `${val}%`;
  calculateFinancing();
}

function calculateFinancing() {
  const valorImovel = parseFloat(document.getElementById('creditoValorImovel')?.value || 3500000);
  const entradaPercent = parseFloat(document.getElementById('creditoEntradaPercent')?.value || 20);
  const prazoAnos = parseInt(document.getElementById('creditoPrazoAnos')?.value || 30);
  const taxaAnual = parseFloat(document.getElementById('creditoTaxaJuros')?.value || 10.49);
  const sistema = document.getElementById('creditoSistema')?.value || 'SAC';

  const valorEntrada = valorImovel * (entradaPercent / 100);
  const valorFinanciado = valorImovel - valorEntrada;
  const meses = prazoAnos * 12;
  const taxaMensal = Math.pow(1 + (taxaAnual / 100), 1 / 12) - 1;

  document.getElementById('entradaValorLabel').textContent = `R$ ${valorEntrada.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
  document.getElementById('calcValorFinanciado').textContent = `R$ ${valorFinanciado.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;

  let primeiraParcela = 0;
  let ultimaParcela = 0;

  if (sistema === 'SAC') {
    const amortizacao = valorFinanciado / meses;
    const juros1 = valorFinanciado * taxaMensal;
    primeiraParcela = amortizacao + juros1;
    ultimaParcela = amortizacao + (amortizacao * taxaMensal);
  } else {
    // PRICE
    primeiraParcela = valorFinanciado * (taxaMensal * Math.pow(1 + taxaMensal, meses)) / (Math.pow(1 + taxaMensal, meses) - 1);
    ultimaParcela = primeiraParcela;
  }

  const rendaMinima = primeiraParcela / 0.30;

  document.getElementById('calcPrimeiraParcela').textContent = `R$ ${primeiraParcela.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
  document.getElementById('calcUltimaParcela').textContent = `R$ ${ultimaParcela.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
  document.getElementById('calcRendaMinima').textContent = `R$ ${rendaMinima.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
}

function sendFinancingViaWhatsApp() {
  const primeira = document.getElementById('calcPrimeiraParcela')?.textContent;
  const financiado = document.getElementById('calcValorFinanciado')?.textContent;
  const renda = document.getElementById('calcRendaMinima')?.textContent;

  const pitch = `Olá Dr. Eduardo! Acabei de rodar a sua simulação bancária de financiamento Caixa / Itaú:\n\n• Valor Financiado: ${financiado}\n• 1ª Parcela Estimada: ${primeira}\n• Renda Familiar Sugerida: ${renda}\n\nEnviei também o PDF analítico para o seu e-mail.`;

  switchTab('whatsapp');
  const input = document.getElementById('waMessageInput');
  if (input) {
    input.value = pitch;
    sendWaMessage();
  }
}

// ==========================================================================
// 10. GESTÃO DOCUMENTAL & ASSINATURA DIGITAL
// ==========================================================================

function renderContractsList() {
  const list = document.getElementById('contractsList');
  if (!list) return;

  list.innerHTML = CONTRACTS.map(cnt => `
    <div class="contract-item">
      <div class="contract-meta">
        <h5><i class="fa-solid fa-file-signature text-gold"></i> ${cnt.property}</h5>
        <p class="text-muted">Comprador: ${cnt.buyer} • <strong>${cnt.value}</strong></p>
        <span class="badge ${cnt.badgeClass}">${cnt.status}</span>
        <span style="font-size:0.72rem; color:#94a3b8; margin-left:8px;">(${cnt.signers})</span>
      </div>
      <div>
        <button class="btn-micro" onclick="copySignLink('${cnt.id}')">
          <i class="fa-solid fa-link"></i> Link ZapSign
        </button>
      </div>
    </div>
  `).join('');
}

function copySignLink(id) {
  navigator.clipboard.writeText(`https://app.zapsign.com.br/v/${id}-assinar-contrato-digital`);
  showToast('Link seguro de assinatura ZapSign copiado para envio pelo WhatsApp!', 'emerald');
}

function requestDocumentByWhatsApp(docName) {
  switchTab('whatsapp');
  const text = `Olá Dr. Eduardo! Para darmos andamento na formalização da minuta do contrato, poderia nos enviar uma foto da ${docName}? Obrigado!`;
  const input = document.getElementById('waMessageInput');
  if (input) {
    input.value = text;
    sendWaMessage();
  }
}

// ==========================================================================
// 11. UI MODALS & TOAST UTILITIES
// ==========================================================================

function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('active');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('active');
}

function openScheduleVisitModal() {
  openModal('scheduleModal');
}

function confirmScheduledVisit() {
  const date = document.getElementById('visitDate').value;
  const time = document.getElementById('visitTime').value;

  closeModal('scheduleModal');
  showToast(`📅 Visita agendada para ${date} às ${time} e sincronizada no Google Agenda!`, 'emerald');

  const lead = LEADS.find(l => l.id === APP_STATE.activeLeadId);
  if (lead) {
    lead.stage = 'visita-agendada';
    renderKanbanBoard();
    loadWhatsAppChat(lead.id);
  }
}

function openNewLeadModal() {
  openModal('newLeadModal');
}

function openNewContractModal() {
  showToast('Minuta de compra e venda gerada automaticamente com dados do comprador e do imóvel!', 'gold');
}

function toggleNotifications() {
  showToast('🔔 3 notificações: Lead ZAP Imóveis, Áudio recebido e Minuta assinada.', 'blue');
}

function showToast(message, type = 'gold') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-notification';

  const icons = {
    'gold': '<i class="fa-solid fa-sparkles text-gold"></i>',
    'emerald': '<i class="fa-solid fa-circle-check text-emerald"></i>',
    'blue': '<i class="fa-solid fa-bell text-blue"></i>',
    'urgent': '<i class="fa-solid fa-triangle-exclamation text-red"></i>'
  };

  toast.innerHTML = `${icons[type] || icons.gold} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
