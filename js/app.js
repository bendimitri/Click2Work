const C2W = {
  keys: {
    users: "c2w_users",
    session: "c2w_session",
    favorites: "c2w_favorites",
    chats: "c2w_chats",
    theme: "c2w_theme",
    searches: "c2w_searches",
    onboarding: "c2w_onboarding_done"
  },
  state: {
    route: "/",
    activeRole: "client",
    dashboardTab: "explore",
    selectedChat: "w-joao-silva",
    filters: {
      query: "",
      profession: "",
      city: "",
      price: "",
      rating: "",
      availability: ""
    }
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

document.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("hashchange", renderRoute);

function initApp() {
  seedStorage();
  applyTheme(localStorage.getItem(C2W.keys.theme) || "light");
  bindGlobalEvents();
  renderRoute();
}

function seedStorage() {
  const users = read(C2W.keys.users, []);
  const demoClient = {
    id: "client-demo",
    role: "client",
    name: "Camila Prado",
    email: "demo@contratante.com",
    password: "123456",
    phone: "(11) 90000-2020",
    city: "Sao Paulo, SP",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=320&q=80"
  };
  const seededWorkers = C2W_MOCK_WORKERS.map((worker) => ({ ...worker, password: worker.password || "123456" }));
  const seedUsers = [demoClient, ...seededWorkers];
  const missingUsers = seedUsers.filter((seedUser) => !users.some((user) => user.id === seedUser.id));
  const upgradedUsers = users.map((user) => user.role === "worker" && !user.password ? { ...user, password: "123456" } : user);
  if (missingUsers.length || upgradedUsers.some((user, index) => user !== users[index])) write(C2W.keys.users, [...upgradedUsers, ...missingUsers]);
  if (!localStorage.getItem(C2W.keys.chats)) write(C2W.keys.chats, C2W_DEFAULT_CHATS);
  if (!localStorage.getItem(C2W.keys.favorites)) write(C2W.keys.favorites, []);
}

function bindGlobalEvents() {
  $("#themeToggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    toast(next === "dark" ? "Modo escuro ativado." : "Modo claro ativado.", "success");
  });

  $("#menuToggle").addEventListener("click", () => $(".site-nav").classList.toggle("open"));
  $(".site-nav").addEventListener("click", () => $(".site-nav").classList.remove("open"));
  $("#modalRoot").addEventListener("click", (event) => {
    const closeTrigger = event.target.closest("[data-close-modal]");
    if (event.target.id === "modalRoot" || closeTrigger) {
      event.preventDefault();
      closeModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(C2W.keys.theme, theme);
  $("#themeToggle i").className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

function renderRoute() {
  C2W.state.route = location.hash.replace("#", "") || "/";
  const route = C2W.state.route.split("?")[0];
  updateHeader();

  if (route === "/") return renderLanding();
  if (route === "/explorar") return renderExplorePublic();
  if (route.startsWith("/auth/")) return renderAuth(route.includes("register") ? "register" : "login");
  if (route === "/app") return renderApp();
  if (route === "/logout") return logout();
  return render404();
}

function updateHeader() {
  const session = getSession();
  const nav = $(".site-nav");
  nav.innerHTML = session
    ? `
      <a href="#/app" data-route="/app">Dashboard</a>
      <a href="#/explorar" data-route="/explorar">Explorar</a>
      <a href="#/logout" data-route="/logout">Sair</a>
    `
    : `
      <a href="#/explorar" data-route="/explorar">Explorar</a>
      <a href="#/auth/login" data-route="/auth/login">Entrar</a>
      <a href="#/auth/register" data-route="/auth/register">Cadastrar-se</a>
    `;
  $$("[data-route]", nav).forEach((link) => {
    const linkRoute = link.getAttribute("data-route");
    link.classList.toggle("active", C2W.state.route.split("?")[0] === linkRoute);
  });
}

function renderLanding() {
  $("#app").innerHTML = `
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-copy">
          <span class="eyebrow"><i class="fa-solid fa-wand-magic-sparkles"></i> Marketplace local de servicos</span>
          <h1>Click2Work <span>conecta quem precisa com quem sabe fazer</span></h1>
          <p>Encontre profissionais confiaveis, compare perfis, converse pelo chat e contrate servicos com uma experiencia visual simples, moderna e segura.</p>
          <div class="hero-actions">
            <a class="button" href="#/auth/login"><i class="fa-solid fa-right-to-bracket"></i> Entrar</a>
            <a class="button secondary" href="#/auth/register"><i class="fa-solid fa-user-plus"></i> Cadastrar-se</a>
            <a class="button ghost" href="#/explorar"><i class="fa-solid fa-magnifying-glass"></i> Explorar profissionais</a>
          </div>
        </div>
      </div>
      <form class="floating-search" id="landingSearch">
        <label for="homeSearch">O que voce precisa hoje?</label>
        <div class="search-line">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input id="homeSearch" name="query" placeholder="Ex: eletricista, diarista, designer" autocomplete="off">
          <button class="button" type="submit" aria-label="Buscar"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
        <div class="search-pills">
          ${["Eletricista", "Diarista", "Tecnico", "Designer"].map((item) => `<button type="button" class="chip" data-home-chip="${item}">${item}</button>`).join("")}
        </div>
      </form>
    </section>

    <section class="band">
      <div class="section">
        <div class="section-head">
          <div>
            <h2>Funciona como pedir comida, so que para resolver a vida</h2>
            <p>O Click2Work organiza busca, confianca, chat e precos em uma jornada rapida para contratantes e trabalhadores.</p>
          </div>
          <a class="button subtle" href="#/explorar"><i class="fa-solid fa-compass"></i> Ver profissionais</a>
        </div>
        <div class="grid cols-3">
          ${[
            ["fa-magnifying-glass-location", "Busque por servico", "Digite o que precisa e filtre por cidade, preco, avaliacao e disponibilidade."],
            ["fa-id-badge", "Compare perfis completos", "Veja portfólios, badges, comentarios reais simulados e faixa de preco."],
            ["fa-comments", "Converse e contrate", "Abra chat, salve favoritos e combine detalhes como em um app moderno."]
          ].map(cardInfo).join("")}
        </div>
      </div>
    </section>

    <section class="band compact">
      <div class="section">
        <div class="section-head">
          <div>
            <h2>Categorias populares</h2>
            <p>Servicos do dia a dia e profissionais digitais no mesmo lugar.</p>
          </div>
        </div>
        <div class="grid cols-4">
          ${C2W_CATEGORIES.map(categoryCard).join("")}
        </div>
      </div>
    </section>

    <section class="band">
      <div class="section split-band">
        <article class="info-card">
          <div class="info-icon"><i class="fa-solid fa-house-laptop"></i></div>
          <h2>Para contratantes</h2>
          <div class="feature-list">
            ${["Busca visual com filtros uteis", "Favoritos salvos no navegador", "Chat simulado com historico", "Assistente IA para comparar opcoes"].map(featureItem).join("")}
          </div>
        </article>
        <article class="info-card">
          <div class="info-icon"><i class="fa-solid fa-briefcase"></i></div>
          <h2>Para trabalhadores</h2>
          <div class="feature-list">
            ${["Perfil publico completo", "Multiplos servicos com precos", "Sugestoes de descricao e categorias", "Painel para contatos, avaliacoes e mensagens"].map(featureItem).join("")}
          </div>
        </article>
      </div>
    </section>

    <section class="band compact">
      <div class="section">
        <div class="section-head">
          <div>
            <h2>Profissionais em destaque</h2>
            <p>Perfis ficticios com dados realistas para o produto parecer vivo desde o primeiro acesso.</p>
          </div>
        </div>
        <div class="workers-grid">
          ${getWorkers().slice(0, 3).map(workerCard).join("")}
        </div>
      </div>
    </section>

    <section class="band">
      <div class="section">
        <div class="section-head">
          <div>
            <h2>Quem testou, contratou melhor</h2>
            <p>Depoimentos ficticios para demonstrar a experiencia do marketplace.</p>
          </div>
        </div>
        <div class="grid cols-3">
          ${C2W_TESTIMONIALS.map((item) => `
            <article class="testimonial-card">
              <div class="stars">${stars(item.rating)}</div>
              <p>"${item.text}"</p>
              <strong>${item.name}</strong>
              <span class="muted">${item.city}</span>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="band compact">
      <div class="section">
        <div class="section-head">
          <div>
            <h2>Perguntas frequentes</h2>
            <p>O prototipo e local, mas a experiencia foi pensada para evoluir para um produto real.</p>
          </div>
        </div>
        <div class="grid cols-3">
          ${[
            ["Precisa de servidor?", "Nao. Funciona em GitHub Pages com HTML, CSS, JS e localStorage."],
            ["O chat e real?", "Ele simula conversas e salva novas mensagens localmente no navegador."],
            ["Posso cadastrar trabalhadores?", "Sim. O cadastro fake salva perfis e eles aparecem no marketplace."]
          ].map(([title, text]) => `<article class="faq-card"><h3>${title}</h3><p>${text}</p></article>`).join("")}
        </div>
      </div>
    </section>
    ${footerTemplate()}
  `;

  $("#landingSearch").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("query").trim();
    saveSearch(query);
    location.hash = `#/explorar?busca=${encodeURIComponent(query)}`;
  });
  $$("[data-home-chip]").forEach((button) => button.addEventListener("click", () => {
    location.hash = `#/explorar?busca=${encodeURIComponent(button.dataset.homeChip)}`;
  }));
  bindWorkerCardActions(true);
  maybeShowOnboarding();
}

function renderExplorePublic() {
  const params = new URLSearchParams((location.hash.split("?")[1] || ""));
  C2W.state.filters.query = params.get("busca") || C2W.state.filters.query || "";
  $("#app").innerHTML = `
    <section class="app-page">
      <div class="section main-stack">
        <div class="page-title">
          <div>
            <span class="eyebrow" style="color:var(--text);background:var(--surface);border-color:var(--line)"><i class="fa-solid fa-users-viewfinder"></i> Profissionais verificados por dados mockados</span>
            <h1>Explore profissionais</h1>
            <p>Use filtros dinamicos, veja cards completos e abra perfis detalhados. Para favoritar, conversar ou contratar, entre como contratante.</p>
          </div>
          <a class="button" href="#/auth/login"><i class="fa-solid fa-right-to-bracket"></i> Entrar para contratar</a>
        </div>
        ${searchPanelTemplate()}
        <div class="panel assistant-card">${aiTemplate(aiMessage(filterWorkers()))}</div>
        <div id="workersMount" class="workers-grid"></div>
      </div>
    </section>
  `;
  bindSearchPanel(false);
  renderWorkersMount(filterWorkers(), true);
}

function renderAuth(mode) {
  C2W.state.activeRole = "client";
  $("#app").innerHTML = `
    <section class="auth-page">
      <aside class="auth-visual">
        <h2>${mode === "login" ? "Bem-vindo de volta." : "Crie seu perfil Click2Work."}</h2>
        <p>${mode === "login" ? "Entre para buscar profissionais, responder clientes, favoritar perfis e continuar conversas." : "Escolha seu tipo de conta e use a plataforma como contratante ou trabalhador."}</p>
      </aside>
      <article class="auth-card">
        <span class="eyebrow" style="color:var(--text);background:var(--surface-2);border-color:var(--line)"><i class="fa-solid fa-shield-heart"></i> Autenticacao local</span>
        <h1>${mode === "login" ? "Entrar" : "Cadastrar-se"}</h1>
        <div class="role-tabs" role="tablist" aria-label="Tipo de usuario">
          <button type="button" class="active" data-role="client"><i class="fa-solid fa-user-tie"></i> Contratante</button>
          <button type="button" data-role="worker"><i class="fa-solid fa-screwdriver-wrench"></i> Trabalhador</button>
        </div>
        <form id="authForm">${mode === "login" ? loginFields() : registerFields("client")}</form>
        <p class="form-note">${mode === "login" ? `Ainda nao tem conta? <a href="#/auth/register">Cadastrar-se</a>` : `Ja tem conta? <a href="#/auth/login">Entrar</a>`}</p>
      </article>
    </section>
  `;
  bindAuth(mode);
}

function bindAuth(mode) {
  $$("[data-role]").forEach((button) => {
    button.addEventListener("click", () => {
      C2W.state.activeRole = button.dataset.role;
      $$("[data-role]").forEach((item) => item.classList.toggle("active", item === button));
      $("#authForm").innerHTML = mode === "login" ? loginFields() : registerFields(C2W.state.activeRole);
      bindAuthSubmit(mode);
    });
  });
  bindAuthSubmit(mode);
}

function bindAuthSubmit(mode) {
  $("#authForm").onsubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    mode === "login" ? loginUser(data) : registerUser(data, C2W.state.activeRole);
  };
}

function loginUser(data) {
  if (!data.email || !data.password) return toast("Preencha e-mail e senha.", "error");
  const users = read(C2W.keys.users, []);
  const user = users.find((item) => item.email.toLowerCase() === data.email.toLowerCase() && item.password === data.password && item.role === C2W.state.activeRole);
  if (!user) return toast("E-mail, senha ou tipo de conta nao conferem.", "error");
  write(C2W.keys.session, { userId: user.id });
  toast(`Ola, ${user.name.split(" ")[0]}!`, "success");
  location.hash = "#/app";
}

function registerUser(data, role) {
  const users = read(C2W.keys.users, []);
  const commonRequired = ["name", "email", "password", "city", "phone"];
  const workerRequired = ["description", "professions", "basePrice", "experience", "availability"];
  const missingCommon = commonRequired.some((fieldName) => !String(data[fieldName] || "").trim());
  const missingWorker = role === "worker" && workerRequired.some((fieldName) => !String(data[fieldName] || "").trim());
  if (missingCommon || missingWorker) return toast("Preencha todos os campos obrigatorios do cadastro.", "error");
  if (!isValidEmail(data.email)) return toast("Digite um e-mail valido.", "error");
  if ((data.password || "").length < 6) return toast("A senha deve ter pelo menos 6 caracteres.", "error");
  if (users.some((user) => user.email.toLowerCase() === data.email.toLowerCase())) return toast("Ja existe uma conta com esse e-mail.", "error");

  const id = `${role}-${Date.now()}`;
  const avatar = data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=145cff&color=fff&size=256`;
  const newUser = role === "worker"
    ? {
      id,
      role,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      city: data.city,
      avatar,
      mainProfession: normalizeServices(data.professions)[0] || "Profissional autonomo",
      professions: normalizeServices(data.professions),
      description: data.description,
      basePrice: Number(data.basePrice || 100),
      rating: 4.7,
      reviewCount: 8,
      availability: data.availability || "Agenda aberta",
      experience: Number(data.experience || 1),
      badge: "Novo talento",
      responseTime: "1 h",
      trust: 82,
      services: normalizeServices(data.professions).map((name, index) => ({ id: `s-${index}`, name, price: Number(data.basePrice || 100), category: "Servico" })),
      portfolio: (data.portfolio || "").split(",").map((item) => item.trim()).filter(Boolean),
      reviews: [{ author: "Cliente Click2Work", rating: 4.7, text: "Perfil novo com boa apresentacao e atendimento atencioso." }]
    }
    : {
      id,
      role,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      city: data.city,
      avatar
    };

  write(C2W.keys.users, [...users, newUser]);
  write(C2W.keys.session, { userId: id });
  toast("Cadastro criado com sucesso.", "success");
  location.hash = "#/app";
}

function renderApp() {
  const session = getSession();
  if (!session) {
    toast("Entre para acessar o dashboard.", "error");
    location.hash = "#/auth/login";
    return;
  }
  const user = getCurrentUser();
  if (!user) return logout();
  user.role === "worker" ? renderWorkerDashboard(user) : renderClientDashboard(user);
}

function renderClientDashboard(user) {
  const tab = C2W.state.dashboardTab;
  $("#app").innerHTML = `
    <section class="app-page">
      <div class="app-layout">
        ${sidebarTemplate(user, [
          ["explore", "fa-magnifying-glass", "Explorar"],
          ["favorites", "fa-heart", "Favoritos"],
          ["chat", "fa-comments", "Chat"],
          ["history", "fa-clock-rotate-left", "Buscas"],
          ["logout", "fa-right-from-bracket", "Sair"]
        ])}
        <div class="main-stack" id="dashboardMount"></div>
      </div>
    </section>
  `;
  bindSidebar();
  if (tab === "favorites") renderClientFavorites(user);
  else if (tab === "chat") renderChat(user);
  else if (tab === "history") renderSearchHistory();
  else renderClientExplore(user);
}

function renderClientExplore() {
  $("#dashboardMount").innerHTML = `
    <div class="page-title">
      <div>
        <h1>Encontre o profissional certo</h1>
        <p>Filtre por profissao, cidade, preco, avaliacao e disponibilidade. A IA simulada resume as melhores opcoes.</p>
      </div>
      <button class="button subtle" type="button" data-clear-filters><i class="fa-solid fa-filter-circle-xmark"></i> Limpar filtros</button>
    </div>
    ${statsTemplate()}
    ${searchPanelTemplate()}
    <div class="panel assistant-card">${aiTemplate(aiMessage(filterWorkers()))}</div>
    <div id="workersMount" class="workers-grid"></div>
  `;
  $("[data-clear-filters]").addEventListener("click", () => {
    C2W.state.filters = { query: "", profession: "", city: "", price: "", rating: "", availability: "" };
    renderClientExplore();
  });
  bindSearchPanel(true);
  renderWorkersMount(filterWorkers(), true);
}

function renderClientFavorites() {
  const favorites = getFavorites();
  const workers = getWorkers().filter((worker) => favorites.includes(worker.id));
  $("#dashboardMount").innerHTML = `
    <div class="page-title">
      <div>
        <h1>Favoritos</h1>
        <p>Profissionais salvos no navegador para comparar e chamar depois.</p>
      </div>
    </div>
    <div id="workersMount" class="workers-grid"></div>
  `;
  renderWorkersMount(workers, true, "Voce ainda nao favoritou profissionais.");
}

function renderSearchHistory() {
  const searches = read(C2W.keys.searches, []);
  $("#dashboardMount").innerHTML = `
    <div class="page-title">
      <div>
        <h1>Historico de buscas</h1>
        <p>Consultas recentes salvas localmente para acelerar sua proxima contratacao.</p>
      </div>
    </div>
    <div class="panel">
      ${searches.length ? `<div class="chips">${searches.map((item) => `<button class="chip" data-history="${item}"><i class="fa-solid fa-clock"></i> ${item}</button>`).join("")}</div>` : emptyTemplate("Nenhuma busca salva ainda.", "Busque por um servico para criar historico.")}
    </div>
  `;
  $$("[data-history]").forEach((button) => button.addEventListener("click", () => {
    C2W.state.dashboardTab = "explore";
    C2W.state.filters.query = button.dataset.history;
    renderApp();
  }));
}

function renderWorkerDashboard(user) {
  const tab = C2W.state.dashboardTab;
  $("#app").innerHTML = `
    <section class="app-page">
      <div class="app-layout">
        ${sidebarTemplate(user, [
          ["profile", "fa-user-gear", "Meu perfil"],
          ["services", "fa-tags", "Servicos"],
          ["public", "fa-eye", "Perfil publico"],
          ["chat", "fa-comments", "Mensagens"],
          ["ai", "fa-wand-magic-sparkles", "IA"],
          ["logout", "fa-right-from-bracket", "Sair"]
        ])}
        <div class="main-stack" id="dashboardMount"></div>
      </div>
    </section>
  `;
  bindSidebar();
  if (!["profile", "services", "public", "chat", "ai"].includes(tab)) C2W.state.dashboardTab = "profile";
  if (tab === "services") renderWorkerServices(user);
  else if (tab === "public") renderWorkerPublic(user);
  else if (tab === "chat") renderChat(user);
  else if (tab === "ai") renderWorkerAi(user);
  else renderWorkerProfile(user);
}

function renderWorkerProfile(user) {
  $("#dashboardMount").innerHTML = `
    <div class="page-title">
      <div>
        <h1>Editar perfil</h1>
        <p>Mantenha seu perfil completo para aparecer melhor nas buscas dos contratantes.</p>
      </div>
    </div>
    <div class="worker-editor">
      <form class="panel form-grid" id="profileForm">
        ${field("Nome completo", "name", user.name)}
        ${field("Telefone", "phone", user.phone || "")}
        ${field("Cidade", "city", user.city || "")}
        ${field("Foto por URL", "avatar", user.avatar || "")}
        ${field("Profissao principal", "mainProfession", user.mainProfession || "")}
        ${field("Disponibilidade", "availability", user.availability || "")}
        ${field("Anos de experiencia", "experience", user.experience || 1, "number")}
        ${field("Preco base", "basePrice", user.basePrice || 100, "number")}
        <label class="field full">Descricao profissional<textarea name="description">${user.description || ""}</textarea></label>
        <button class="button" type="submit"><i class="fa-solid fa-floppy-disk"></i> Salvar perfil</button>
      </form>
      <aside class="panel assistant-card">
        ${aiTemplate(workerProfileSuggestion(user))}
        <div class="button-row" style="margin-top:14px">
          <button class="button subtle" type="button" data-apply-description><i class="fa-solid fa-wand-magic-sparkles"></i> Usar sugestao</button>
        </div>
      </aside>
    </div>
  `;
  $("#profileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    updateCurrentUser(Object.fromEntries(new FormData(event.currentTarget).entries()));
    toast("Perfil atualizado.", "success");
    renderApp();
  });
  $("[data-apply-description]").addEventListener("click", () => {
    $("[name='description']").value = smartDescription(user);
  });
}

function renderWorkerServices(user) {
  $("#dashboardMount").innerHTML = `
    <div class="page-title">
      <div>
        <h1>Servicos e precos</h1>
        <p>Cadastre varios trabalhos, cada um com valor individual e categoria.</p>
      </div>
    </div>
    <form class="panel service-editor-row" id="serviceForm">
      <label class="field">Servico<input name="name" placeholder="Ex: instalacao de chuveiro" required></label>
      <label class="field">Preco<input name="price" type="number" min="1" placeholder="90" required></label>
      <button class="button" type="submit" aria-label="Adicionar servico"><i class="fa-solid fa-plus"></i></button>
    </form>
    <div class="panel">
      <div class="service-list">
        ${(user.services || []).map((service) => `
          <div class="service-item">
            <div>
              <strong>${service.name}</strong>
              <div class="muted">${service.category || "Servico"} · ${money(service.price)}</div>
            </div>
            <div class="button-row">
              <button class="button subtle" type="button" data-edit-service="${service.id}"><i class="fa-solid fa-pen"></i></button>
              <button class="button danger" type="button" data-remove-service="${service.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `).join("") || emptyTemplate("Nenhum servico cadastrado.", "Adicione seu primeiro servico acima.")}
      </div>
    </div>
  `;
  $("#serviceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const services = [...(user.services || []), { id: `s-${Date.now()}`, name: data.name, price: Number(data.price), category: user.mainProfession || "Servico" }];
    updateCurrentUser({ services, professions: unique([...(user.professions || []), data.name]), basePrice: Math.min(...services.map((item) => Number(item.price))) });
    toast("Servico adicionado.", "success");
    renderApp();
  });
  $$("[data-remove-service]").forEach((button) => button.addEventListener("click", () => {
    updateCurrentUser({ services: (user.services || []).filter((service) => service.id !== button.dataset.removeService) });
    toast("Servico removido.", "success");
    renderApp();
  }));
  $$("[data-edit-service]").forEach((button) => button.addEventListener("click", () => {
    const service = (user.services || []).find((item) => item.id === button.dataset.editService);
    openServiceEditModal(user, service);
  }));
}

function renderWorkerPublic(user) {
  $("#dashboardMount").innerHTML = `
    <div class="page-title">
      <div>
        <h1>Perfil publico</h1>
        <p>Essa e a visao que contratantes teriam do seu perfil no marketplace.</p>
      </div>
    </div>
    <div class="workers-grid">
      ${workerCard(user)}
    </div>
    <div class="panel">
      ${profileDetailsTemplate(user)}
    </div>
  `;
  bindWorkerCardActions();
}

function renderWorkerAi(user) {
  $("#dashboardMount").innerHTML = `
    <div class="page-title">
      <div>
        <h1>Assistente Click2Work IA</h1>
        <p>Sugestoes simuladas para melhorar perfil, precificacao e categorias relacionadas.</p>
      </div>
    </div>
    <div class="grid cols-3">
      <article class="panel assistant-card">${aiTemplate(workerProfileSuggestion(user))}</article>
      <article class="panel assistant-card">${aiTemplate(priceSuggestion(user))}</article>
      <article class="panel assistant-card">${aiTemplate(categorySuggestion(user))}</article>
    </div>
  `;
}

function renderChat(user) {
  const workers = getWorkers();
  const chats = read(C2W.keys.chats, {});
  const chatIds = unique([...Object.keys(chats), ...workers.slice(0, 3).map((worker) => worker.id)]);
  if (!chatIds.includes(C2W.state.selectedChat)) C2W.state.selectedChat = chatIds[0];
  const selectedWorker = workers.find((worker) => worker.id === C2W.state.selectedChat) || workers[0];
  const messages = chats[selectedWorker.id] || [];

  $("#dashboardMount").innerHTML = `
    <div class="page-title">
      <div>
        <h1>Mensagens</h1>
        <p>Chat simulado com historico persistido localmente.</p>
      </div>
    </div>
    <div class="panel chat-shell">
      <aside class="conversation-list">
        ${chatIds.map((id) => {
          const worker = workers.find((item) => item.id === id) || selectedWorker;
          return `
            <div class="conversation-item ${id === selectedWorker.id ? "active" : ""}" data-chat-id="${id}">
              <img class="avatar" src="${worker.avatar}" alt="">
              <div>
                <strong>${worker.name}</strong>
                <div class="muted">${worker.mainProfession}</div>
              </div>
            </div>
          `;
        }).join("")}
      </aside>
      <section class="chat-window">
        <div class="chat-header">
          <img class="avatar" src="${selectedWorker.avatar}" alt="">
          <div>
            <strong>${selectedWorker.name}</strong>
            <div class="muted"><i class="fa-solid fa-circle" style="color:var(--success);font-size:.55rem"></i> Responde em ${selectedWorker.responseTime || "1 h"}</div>
          </div>
        </div>
        <div class="messages" id="messagesMount">
          ${messages.map(messageBubble).join("") || emptyTemplate("Nenhuma mensagem ainda.", "Envie uma mensagem para iniciar a conversa.")}
        </div>
        <form class="chat-form" id="chatForm">
          <input name="message" placeholder="Digite sua mensagem" autocomplete="off" required>
          <button class="button" type="submit" aria-label="Enviar"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
      </section>
    </div>
  `;
  $$("[data-chat-id]").forEach((item) => item.addEventListener("click", () => {
    C2W.state.selectedChat = item.dataset.chatId;
    renderChat(user);
  }));
  $("#chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const currentChats = read(C2W.keys.chats, {});
    const next = [...(currentChats[selectedWorker.id] || []), { from: "me", text: data.message, time: nowTime() }];
    currentChats[selectedWorker.id] = next;
    write(C2W.keys.chats, currentChats);
    event.currentTarget.reset();
    renderChat(user);
    const messagesMount = $("#messagesMount");
    if (messagesMount) messagesMount.scrollTop = messagesMount.scrollHeight;
  });
}

function bindSidebar() {
  $$("[data-dash-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.dashTab === "logout") return logout();
      C2W.state.dashboardTab = button.dataset.dashTab;
      renderApp();
    });
  });
}

function bindSearchPanel(requiresAuth) {
  const form = $("#searchPanel");
  if (!form) return;
  form.addEventListener("input", () => {
    C2W.state.filters = Object.fromEntries(new FormData(form).entries());
    if (C2W.state.filters.query) saveSearch(C2W.state.filters.query);
    renderWorkersMount(filterWorkers(), requiresAuth);
    const ai = $(".assistant-card");
    if (ai) ai.innerHTML = aiTemplate(aiMessage(filterWorkers()));
  });
  form.addEventListener("submit", (event) => event.preventDefault());
}

function renderWorkersMount(workers, requiresAuth, emptyText = "Nenhum profissional encontrado com esses filtros.") {
  const mount = $("#workersMount");
  if (!mount) return;
  mount.innerHTML = workers.length ? workers.map(workerCard).join("") : emptyTemplate(emptyText, "Tente remover algum filtro ou buscar outra categoria.");
  bindWorkerCardActions(requiresAuth);
}

function bindWorkerCardActions(requiresAuth = false) {
  $$("[data-worker-profile]").forEach((button) => button.addEventListener("click", () => openWorkerModal(button.dataset.workerProfile, requiresAuth)));
  $$("[data-favorite]").forEach((button) => button.addEventListener("click", () => {
    if (requiresAuth && !getSession()) return demandLogin();
    toggleFavorite(button.dataset.favorite);
    renderRoute();
  }));
  $$("[data-contract]").forEach((button) => button.addEventListener("click", () => {
    if (requiresAuth && !getSession()) return demandLogin();
    startChat(button.dataset.contract);
  }));
}

function filterWorkers() {
  const filters = C2W.state.filters;
  const query = norm(filters.query || "");
  return getWorkers().filter((worker) => {
    const haystack = norm([worker.name, worker.mainProfession, worker.city, worker.description, ...(worker.professions || [])].join(" "));
    const byQuery = !query || haystack.includes(query);
    const byProfession = !filters.profession || haystack.includes(norm(filters.profession));
    const byCity = !filters.city || norm(worker.city).includes(norm(filters.city));
    const byPrice = !filters.price || Number(worker.basePrice) <= Number(filters.price);
    const byRating = !filters.rating || Number(worker.rating) >= Number(filters.rating);
    const byAvailability = !filters.availability || norm(worker.availability).includes(norm(filters.availability));
    return byQuery && byProfession && byCity && byPrice && byRating && byAvailability;
  });
}

function openWorkerModal(id, requiresAuth = false) {
  const worker = getWorkers().find((item) => item.id === id);
  if (!worker) return;
  openModal(`
    <div class="modal-head">
      <div>
        <h2>${worker.name}</h2>
        <p class="muted">${worker.mainProfession} · ${worker.city}</p>
      </div>
      <button class="icon-button close-modal" data-close-modal aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
    </div>
    ${profileDetailsTemplate(worker)}
    <div class="button-row" style="margin-top:18px">
      <button class="button" type="button" data-modal-contract="${worker.id}"><i class="fa-solid fa-handshake"></i> Contratar</button>
      <button class="button subtle" type="button" data-modal-chat="${worker.id}"><i class="fa-solid fa-comments"></i> Conversar</button>
      <button class="button subtle" type="button" data-modal-favorite="${worker.id}"><i class="fa-solid fa-heart"></i> Favoritar</button>
    </div>
  `);
  $("[data-modal-contract]").addEventListener("click", () => {
    if (requiresAuth && !getSession()) return demandLogin();
    startChat(worker.id);
  });
  $("[data-modal-chat]").addEventListener("click", () => {
    if (requiresAuth && !getSession()) return demandLogin();
    startChat(worker.id);
  });
  $("[data-modal-favorite]").addEventListener("click", () => {
    if (requiresAuth && !getSession()) return demandLogin();
    toggleFavorite(worker.id);
    closeModal();
  });
}

function openServiceEditModal(user, service) {
  openModal(`
    <div class="modal-head">
      <h2>Editar servico</h2>
      <button class="icon-button close-modal" data-close-modal aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <form id="editServiceForm" class="form-grid">
      ${field("Servico", "name", service.name)}
      ${field("Preco", "price", service.price, "number")}
      ${field("Categoria", "category", service.category || "Servico")}
      <button class="button" type="submit"><i class="fa-solid fa-floppy-disk"></i> Salvar alteracoes</button>
    </form>
  `);
  $("#editServiceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const services = (user.services || []).map((item) => item.id === service.id ? { ...item, ...data, price: Number(data.price) } : item);
    updateCurrentUser({ services, basePrice: Math.min(...services.map((item) => Number(item.price))) });
    closeModal();
    toast("Servico atualizado.", "success");
    renderApp();
  });
}

function startChat(workerId) {
  C2W.state.dashboardTab = "chat";
  C2W.state.selectedChat = workerId;
  const chats = read(C2W.keys.chats, {});
  if (!chats[workerId]) {
    const worker = getWorkers().find((item) => item.id === workerId);
    chats[workerId] = [{ from: "worker", text: `Oi! Sou ${worker.name.split(" ")[0]}. Me conte o que voce precisa e eu te ajudo com um orcamento.`, time: nowTime() }];
    write(C2W.keys.chats, chats);
  }
  closeModal();
  location.hash = "#/app";
  renderApp();
}

function demandLogin() {
  toast("Entre como contratante para usar esta acao.", "error");
  location.hash = "#/auth/login";
}

function toggleFavorite(workerId) {
  const favorites = getFavorites();
  const next = favorites.includes(workerId) ? favorites.filter((id) => id !== workerId) : [...favorites, workerId];
  write(C2W.keys.favorites, next);
  toast(favorites.includes(workerId) ? "Removido dos favoritos." : "Adicionado aos favoritos.", "success");
}

function openModal(content) {
  const root = $("#modalRoot");
  root.innerHTML = `<div class="modal-card" role="dialog" aria-modal="true">${content}</div>`;
  root.hidden = false;
  root.removeAttribute("aria-hidden");
  document.body.classList.add("modal-open");
}

function closeModal() {
  const root = $("#modalRoot");
  root.innerHTML = "";
  root.hidden = true;
  root.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function logout() {
  localStorage.removeItem(C2W.keys.session);
  C2W.state.dashboardTab = "explore";
  toast("Sessao encerrada.", "success");
  location.hash = "#/";
}

function getSession() {
  return read(C2W.keys.session, null);
}

function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  return read(C2W.keys.users, []).find((user) => user.id === session.userId);
}

function getWorkers() {
  return read(C2W.keys.users, []).filter((user) => user.role === "worker");
}

function getFavorites() {
  return read(C2W.keys.favorites, []);
}

function updateCurrentUser(patch) {
  const current = getCurrentUser();
  const users = read(C2W.keys.users, []);
  const normalized = { ...patch };
  ["basePrice", "experience"].forEach((key) => {
    if (key in normalized) normalized[key] = Number(normalized[key]);
  });
  write(C2W.keys.users, users.map((user) => user.id === current.id ? { ...user, ...normalized } : user));
}

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function saveSearch(query) {
  const clean = (query || "").trim();
  if (!clean) return;
  const searches = read(C2W.keys.searches, []);
  write(C2W.keys.searches, unique([clean, ...searches]).slice(0, 8));
}

function toast(message, type = "info") {
  const root = $("#toastRoot");
  const item = document.createElement("div");
  item.className = `toast ${type}`;
  item.innerHTML = `<i class="fa-solid ${type === "error" ? "fa-circle-exclamation" : "fa-circle-check"}"></i><div>${message}</div>`;
  root.appendChild(item);
  setTimeout(() => item.remove(), 3200);
}

function searchPanelTemplate() {
  const workers = getWorkers();
  const professions = unique(workers.flatMap((worker) => worker.professions || []));
  const cities = unique(workers.map((worker) => worker.city));
  const availability = unique(workers.map((worker) => worker.availability));
  const f = C2W.state.filters;
  return `
    <form class="panel search-panel" id="searchPanel">
      <label class="filter">Busca
        <input name="query" value="${escapeHtml(f.query)}" placeholder="Profissao, nome ou servico">
      </label>
      <label class="filter">Profissao
        <select name="profession">
          <option value="">Todas</option>
          ${professions.map((item) => `<option ${f.profession === item ? "selected" : ""} value="${item}">${capitalize(item)}</option>`).join("")}
        </select>
      </label>
      <label class="filter">Cidade
        <select name="city">
          <option value="">Todas</option>
          ${cities.map((item) => `<option ${f.city === item ? "selected" : ""} value="${item}">${item}</option>`).join("")}
        </select>
      </label>
      <label class="filter">Preco ate
        <select name="price">
          <option value="">Qualquer</option>
          ${[100, 180, 300, 600, 1000].map((item) => `<option ${String(f.price) === String(item) ? "selected" : ""} value="${item}">${money(item)}</option>`).join("")}
        </select>
      </label>
      <label class="filter">Nota
        <select name="rating">
          <option value="">Todas</option>
          ${[4.5, 4.7, 4.9].map((item) => `<option ${String(f.rating) === String(item) ? "selected" : ""} value="${item}">${item}+ estrelas</option>`).join("")}
        </select>
      </label>
      <label class="filter">Disponibilidade
        <select name="availability">
          <option value="">Todas</option>
          ${availability.map((item) => `<option ${f.availability === item ? "selected" : ""} value="${item}">${item}</option>`).join("")}
        </select>
      </label>
    </form>
  `;
}

function workerCard(worker) {
  const isFav = getFavorites().includes(worker.id);
  const portfolio = worker.portfolio && worker.portfolio[0] ? worker.portfolio[0] : worker.avatar;
  return `
    <article class="worker-card">
      <div class="worker-cover">
        <img src="${portfolio}" alt="">
        <button class="favorite-btn ${isFav ? "active" : ""}" type="button" data-favorite="${worker.id}" aria-label="Favoritar ${worker.name}">
          <i class="${isFav ? "fa-solid" : "fa-regular"} fa-heart"></i>
        </button>
      </div>
      <div class="worker-body">
        <div class="worker-top">
          <img class="avatar" src="${worker.avatar}" alt="Foto de ${worker.name}">
          <div>
            <h3>${worker.name}</h3>
            <div class="worker-meta">${worker.mainProfession}</div>
          </div>
        </div>
        <span class="badge"><i class="fa-solid fa-award"></i> ${worker.badge || "Profissional"}</span>
        <div class="worker-meta"><i class="fa-solid fa-star" style="color:var(--primary-3)"></i> ${worker.rating} (${worker.reviewCount}) · <i class="fa-solid fa-location-dot"></i> ${worker.city}</div>
        <p class="worker-desc">${worker.description}</p>
        <div class="chips">${(worker.professions || []).slice(0, 3).map((item) => `<span class="chip">${capitalize(item)}</span>`).join("")}</div>
        <div class="price-row">
          <span class="muted">A partir de</span>
          <strong>${money(worker.basePrice)}</strong>
        </div>
        <div class="card-actions">
          <button class="button" type="button" data-worker-profile="${worker.id}">Ver perfil</button>
          <button class="button subtle" type="button" data-contract="${worker.id}">Contratar</button>
          <button class="icon-button" type="button" data-worker-profile="${worker.id}" aria-label="Ver detalhes"><i class="fa-solid fa-eye"></i></button>
        </div>
      </div>
    </article>
  `;
}

function profileDetailsTemplate(worker) {
  return `
    <div class="profile-modal-grid">
      <aside class="profile-card">
        <img class="avatar xl" src="${worker.avatar}" alt="Foto de ${worker.name}">
        <h2>${worker.name}</h2>
        <p class="muted">${worker.mainProfession}</p>
        <div class="stars">${stars(worker.rating)} <strong>${worker.rating}</strong> (${worker.reviewCount} avaliacoes)</div>
        <div class="feature-list">
          <div class="feature-item"><i class="fa-solid fa-location-dot"></i> ${worker.city}</div>
          <div class="feature-item"><i class="fa-solid fa-briefcase"></i> ${worker.experience} anos de experiencia</div>
          <div class="feature-item"><i class="fa-solid fa-calendar-check"></i> ${worker.availability}</div>
          <div class="feature-item"><i class="fa-solid fa-shield-heart"></i> Indicador de confianca: ${worker.trust || 86}%</div>
          <div class="feature-item"><i class="fa-solid fa-clock"></i> Resposta media: ${worker.responseTime || "1 h"}</div>
        </div>
      </aside>
      <section class="main-stack">
        <article class="profile-card">
          <h3>Sobre</h3>
          <p class="muted">${worker.description}</p>
        </article>
        <article class="profile-card">
          <h3>Servicos e precos</h3>
          <div class="service-list">
            ${(worker.services || []).map((service) => `
              <div class="service-item">
                <div><strong>${service.name}</strong><div class="muted">${service.category || worker.mainProfession}</div></div>
                <strong>${money(service.price)}</strong>
              </div>
            `).join("")}
          </div>
        </article>
        <article class="profile-card">
          <h3>Portfolio</h3>
          <div class="gallery">
            ${(worker.portfolio || [worker.avatar]).map((image) => `<img src="${image}" alt="Portfolio de ${worker.name}">`).join("")}
          </div>
        </article>
        <article class="profile-card">
          <h3>Avaliacoes</h3>
          <div class="review-list">
            ${(worker.reviews || []).map((review) => `
              <div class="review-item">
                <strong>${review.author}</strong>
                <div class="stars">${stars(review.rating)}</div>
                <p>${review.text}</p>
              </div>
            `).join("")}
          </div>
        </article>
      </section>
    </div>
  `;
}

function sidebarTemplate(user, items) {
  const firstTab = items[0][0];
  if (!items.some(([id]) => id === C2W.state.dashboardTab)) C2W.state.dashboardTab = firstTab;
  return `
    <aside class="sidebar">
      <div class="user-mini">
        <img class="avatar" src="${user.avatar}" alt="Foto de ${user.name}">
        <div>
          <strong>${user.name}</strong>
          <small>${user.role === "worker" ? "Trabalhador" : "Contratante"}</small>
        </div>
      </div>
      <nav class="side-nav" aria-label="Menu do dashboard">
        ${items.map(([id, icon, label]) => `
          <button type="button" class="${C2W.state.dashboardTab === id ? "active" : ""}" data-dash-tab="${id}">
            <i class="fa-solid ${icon}"></i> ${label}
          </button>
        `).join("")}
      </nav>
    </aside>
  `;
}

function statsTemplate() {
  const workers = getWorkers();
  return `
    <div class="stats-grid">
      <div class="stat-card"><strong>${workers.length}</strong><span>profissionais ativos</span></div>
      <div class="stat-card"><strong>${unique(workers.flatMap((w) => w.professions || [])).length}</strong><span>categorias cadastradas</span></div>
      <div class="stat-card"><strong>${(workers.reduce((acc, item) => acc + Number(item.rating || 0), 0) / workers.length).toFixed(1)}</strong><span>nota media geral</span></div>
      <div class="stat-card"><strong>${getFavorites().length}</strong><span>favoritos salvos</span></div>
    </div>
  `;
}

function aiTemplate(message) {
  return `
    <div class="ai-head">
      <div class="ai-orb"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
      <div>
        <strong>Assistente Click2Work IA</strong>
        <div class="muted">Simulado com regras locais</div>
      </div>
    </div>
    <p class="ai-output">${message}</p>
  `;
}

function aiMessage(workers) {
  if (!workers.length) return "Nao encontrei profissionais com esses filtros. Tente ampliar preco, cidade ou disponibilidade para ter mais opcoes.";
  const best = [...workers].sort((a, b) => b.rating - a.rating)[0];
  const cheapest = [...workers].sort((a, b) => a.basePrice - b.basePrice)[0];
  const query = C2W.state.filters.query || C2W.state.filters.profession || "sua busca";
  return `Encontrei ${workers.length} profissional(is) para "${query}". O mais bem avaliado e ${best.name}, nota ${best.rating}. Melhor custo-beneficio inicial: ${cheapest.name}, a partir de ${money(cheapest.basePrice)}. Compare disponibilidade e avaliacoes antes de contratar.`;
}

function workerProfileSuggestion(user) {
  return `Sugestao de descricao: ${smartDescription(user)}`;
}

function smartDescription(user) {
  const profession = user.mainProfession || (user.professions || [])[0] || "profissional";
  const city = user.city || "sua regiao";
  const years = user.experience || 3;
  return `Sou ${profession} em ${city}, com ${years} anos de experiencia. Atendo com pontualidade, orcamento transparente e foco em resolver o problema com acabamento profissional.`;
}

function priceSuggestion(user) {
  const services = user.services || [];
  const avg = services.length ? services.reduce((acc, item) => acc + Number(item.price), 0) / services.length : user.basePrice || 100;
  return `Sua media atual e ${money(avg)}. Para aumentar conversao, mantenha um servico de entrada entre ${money(avg * 0.55)} e ${money(avg * 0.75)} e um pacote completo acima de ${money(avg * 1.35)}.`;
}

function categorySuggestion(user) {
  const base = norm(user.mainProfession || "");
  const suggestions = base.includes("eletric") ? ["instalacao", "manutencao preventiva", "emergencia residencial"] :
    base.includes("design") ? ["social media", "branding", "criativos para anuncio"] :
    base.includes("video") ? ["reels", "cortes para podcast", "motion simples"] :
    ["atendimento residencial", "manutencao", "consultoria rapida"];
  return `Categorias relacionadas recomendadas: ${suggestions.join(", ")}. Elas ajudam contratantes a encontrar seu perfil em buscas mais especificas.`;
}

function loginFields() {
  return `
    <div class="form-grid">
      ${field("E-mail", "email", "", "email")}
      ${field("Senha", "password", "", "password")}
      <button class="button full" type="submit"><i class="fa-solid fa-right-to-bracket"></i> Entrar</button>
    </div>
  `;
}

function registerFields(role) {
  const common = `
    ${field("Nome completo", "name")}
    ${field("E-mail", "email", "", "email")}
    ${field("Senha", "password", "", "password")}
    ${field("Cidade", "city")}
    ${field("Telefone", "phone")}
    ${field("Foto de perfil por URL", "avatar")}
  `;
  const worker = `
    <label class="field full">Descricao profissional<textarea name="description" placeholder="Conte como voce trabalha"></textarea></label>
    ${field("Profissoes/servicos separados por virgula", "professions")}
    ${field("Preco base", "basePrice", "", "number")}
    ${field("Anos de experiencia", "experience", "", "number")}
    ${field("Disponibilidade", "availability", "Agenda aberta")}
    ${field("Portfolio por URLs separadas por virgula", "portfolio")}
  `;
  return `<div class="form-grid">${common}${role === "worker" ? worker : ""}<button class="button" type="submit"><i class="fa-solid fa-user-plus"></i> Criar conta</button></div>`;
}

function field(label, name, value = "", type = "text") {
  return `<label class="field">${label}<input name="${name}" type="${type}" value="${escapeHtml(String(value))}" ${["name", "email", "password"].includes(name) ? "required" : ""}></label>`;
}

function cardInfo([icon, title, text]) {
  return `<article class="info-card"><div class="info-icon"><i class="fa-solid ${icon}"></i></div><h3>${title}</h3><p>${text}</p></article>`;
}

function categoryCard(category) {
  return `<a class="category-card" href="#/explorar?busca=${encodeURIComponent(category.name)}"><div class="category-icon" style="color:${category.color};background:color-mix(in srgb, ${category.color} 14%, var(--surface))"><i class="fa-solid ${category.icon}"></i></div><h3>${category.name}</h3><p class="muted">Ver profissionais</p></a>`;
}

function featureItem(text) {
  return `<div class="feature-item"><i class="fa-solid fa-check"></i> <span>${text}</span></div>`;
}

function messageBubble(message) {
  return `<div class="message-bubble ${message.from === "me" ? "me" : ""}">${message.text}<small>${message.time} · ${message.from === "me" ? "enviado" : "recebido"}</small></div>`;
}

function emptyTemplate(title, text) {
  return `<div class="empty-state"><h3>${title}</h3><p>${text}</p></div>`;
}

function footerTemplate() {
  return `
    <footer class="footer">
      <div class="footer-inner">
        <div>
          <a class="brand" href="#/"><span class="brand-mark">C2</span><span><strong>Click2Work</strong><small>Click Two Work</small></span></a>
          <p>Marketplace estatico para portfolio, com persistencia local e experiencia inspirada em aplicativos reais.</p>
        </div>
        <div><h4>Produto</h4><a href="#/explorar">Explorar</a><br><a href="#/auth/register">Cadastrar-se</a></div>
        <div><h4>Perfis</h4><a href="#/auth/register">Contratante</a><br><a href="#/auth/register">Trabalhador</a></div>
        <div><h4>Tecnologia</h4><p>HTML, CSS, JavaScript e localStorage. Pronto para GitHub Pages.</p></div>
      </div>
    </footer>
  `;
}

function maybeShowOnboarding() {
  if (localStorage.getItem(C2W.keys.onboarding)) return;
  setTimeout(() => {
    openModal(`
      <div class="modal-head">
        <div>
          <h2>Bem-vindo ao Click2Work</h2>
          <p class="muted">Um tour rapido para testar a experiencia completa.</p>
        </div>
        <button class="icon-button close-modal" data-close-modal aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="grid cols-3">
        ${cardInfo(["fa-user-plus", "Crie uma conta", "Escolha contratante ou trabalhador no cadastro local."])}
        ${cardInfo(["fa-magnifying-glass", "Explore e filtre", "Busque profissionais mockados por servico, cidade e preco."])}
        ${cardInfo(["fa-comments", "Teste chat e favoritos", "Tudo fica salvo no localStorage do navegador."])}
      </div>
      <div class="button-row" style="margin-top:18px">
        <button class="button" type="button" data-close-modal><i class="fa-solid fa-check"></i> Comecar</button>
      </div>
    `);
    localStorage.setItem(C2W.keys.onboarding, "1");
  }, 900);
}

function render404() {
  $("#app").innerHTML = `
    <section class="not-found">
      <div>
        <h1>404</h1>
        <p class="muted">Essa rota nao existe no Click2Work.</p>
        <a class="button" href="#/"><i class="fa-solid fa-house"></i> Voltar ao inicio</a>
      </div>
    </section>
  `;
}

function money(value) {
  return Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function stars(value) {
  const full = Math.round(Number(value || 0));
  return Array.from({ length: 5 }, (_, index) => `<i class="${index < full ? "fa-solid" : "fa-regular"} fa-star"></i>`).join("");
}

function norm(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function capitalize(value) {
  return String(value || "").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function normalizeServices(value) {
  return String(value || "").split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
}

function nowTime() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}
