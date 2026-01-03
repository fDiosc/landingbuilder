# Documento de Especificação de Produto (PRD)
## Landing Builder - Plataforma de Validação de Micro-SaaS

**Versão:** 1.0  
**Data:** Janeiro 2026  
**Autor:** Felipe - CEO ProductLab  
**Status:** Aprovado para Desenvolvimento

---

## Índice

1. [Visão Geral do Produto](#1-visão-geral-do-produto)
2. [Objetivos e Métricas de Sucesso](#2-objetivos-e-métricas-de-sucesso)
3. [Personas e Casos de Uso](#3-personas-e-casos-de-uso)
4. [Arquitetura e Stack Técnica](#4-arquitetura-e-stack-técnica)
5. [Funcionalidades Detalhadas](#5-funcionalidades-detalhadas)
6. [Fluxos de Usuário](#6-fluxos-de-usuário)
7. [Especificações de Interface](#7-especificações-de-interface)
8. [Integrações e APIs](#8-integrações-e-apis)
9. [Modelo de Dados](#9-modelo-de-dados)
10. [Segurança e Compliance](#10-segurança-e-compliance)
11. [Plano de Desenvolvimento](#11-plano-de-desenvolvimento)
12. [Roadmap Futuro](#12-roadmap-futuro)
13. [Anexos Técnicos](#13-anexos-técnicos)

---

## 1. Project Overview

Landing Builder is a SaaS platform designed to solve the "Time to Validation" problem for indie hackers and developers. It allows users to go from a product idea to a live, professional, and integrated landing page in minutes, with the goal of validating demand before writing a single line of code for the product itself.

### 1.1 Value Proposition
- **Extreme Speed:** Deploy a landing page in under 5 minutes.
- **Native Integrations:** No need to configure Zapier or custom code for leads/payments.
- **Built-in Validation:** Native analytics focused on conversion (Waitlist, Fake Door, Pre-sale).
- **Aesthetic Excellence:** Modern, premium designs that inspire trust.
- 🌐 **Domínio custom fácil:** CNAME em 2 cliques

### 1.4 Diferenciação

| Aspecto | Landing Builder | Carrd | Webflow | MVPit |
|---------|----------------|-------|---------|-------|
| **Foco Micro-SaaS** | ✅ Sim | ❌ Genérico | ❌ Genérico | 🟡 Parcial |
| **Integrações Nativas** | ✅ Resend/Stripe/Cal | ❌ Manual | ❌ Manual | 🟡 Limitado |
| **AI Generator** | ✅ Copy automática | ❌ Não | ❌ Não | ❌ Não |
| **Setup < 5min** | ✅ Sim | 🟡 10-15min | ❌ 1-2h | 🟡 15min |
| **Preço MVP** | $19/mês | $19/ano | $14/mês | $29/mês |

---

## 2. Objetivos e Métricas de Sucesso

### 2.1 Objetivos de Negócio

**Curto Prazo (3 meses):**
- Lançar MVP funcional
- Validar com 100 usuários beta (incluindo uso próprio)
- Atingir $1K MRR

**Médio Prazo (6 meses):**
- 500 usuários ativos
- $5K MRR
- NPS > 50

**Longo Prazo (12 meses):**
- 2000 usuários ativos
- $20K MRR
- Expansão internacional (inglês)

### 2.2 KPIs Principais

| Métrica | Alvo MVP | Alvo 6M | Como Medir |
|---------|----------|---------|------------|
| **Time to First Landing** | < 5min | < 3min | Analytics evento "publish" |
| **Conversion Signup → Paid** | 15% | 25% | Stripe webhooks |
| **Churn Mensal** | < 10% | < 5% | Supabase queries |
| **Landings Publicadas/User** | 1.5 | 3.0 | DB aggregation |
| **CAC** | < $20 | < $10 | Ad spend / novos users |

### 2.3 Métricas Secundárias

- **Activation Rate:** % users que publicam 1ª landing em 24h (alvo: 60%)
- **Integration Adoption:** % landings com ≥1 plugin ativo (alvo: 70%)
- **Custom Domain Rate:** % users em plano Pro (alvo: 40%)
- **Referral Rate:** % users vindos de indicações (alvo: 20%)

---

## 3. Personas e Casos de Uso

## 2. Target Audience

1. **Indie Hackers:** Building multiple MVPs and needing fast validation.
2. **Software Developers:** Who want to launch products but aren't designers or copywriters.
3. **Product Managers/Consultants:** Needing to test market hypotheses quickly.
4. **Early-stage Startups:** Looking for a professional waitlist for launch.

**Cenários de Uso:**
1. Valida ideia de "CRM para dentistas" com fake door test
2. Lança waitlist para "Dashboard financeiro para freelancers"
3. Testa pré-venda de "Gerador de contratos jurídicos AI"

### 3.3 Anti-Personas (Fora do Escopo MVP)

❌ **Agências de Marketing:** Precisam white-label (roadmap futuro)  
❌ **Empresas Corporativas:** Orçamento alto, processo lento (não é micro-SaaS)  
❌ **Não-técnicos Totais:** Precisam handholding demais (futuro com templates ultra-simples)

---

## 4. Architecture and Technical Stack (2026)

The project uses a modern and performant stack, optimized for serverless environments and near-instant loading times.

### 4.1 Frontend Stack
- **Framework:** [NEW] Next.js 16.1.x (React 19)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.x + Shadcn/UI
- **Editor:** Craft.js 0.2.x (Internal)
- **Forms:** React Hook Form + Zod
- **State:** Zustand (local) + React Query (server)
- **Icons:** Lucide React

### 4.2 Backend & Infrastructure
- **Database:** [NEW] Neon Postgres (Serverless) - with DB branching support.
- **ORM:** [NEW] Drizzle ORM (Edge-ready)
- **Authentication:** [NEW] Clerk (Auth-as-a-Service)
- **Storage:** Uploadthing / AWS S3
- **Hosting:** Vercel (Edge Functions + Global CDN)
- **Analytics:** Plausible API + Vercel Web Analytics

#### **Hospedagem & Infraestrutura**
```json
{
  "hosting": "Vercel (Serverless/Edge Functions)",
  "cdn": "Vercel Edge Network",
  "domains": "Vercel Domains API",
  "ssl": "Automático",
  "caching": "Upstash Redis"
}
```

#### **Integrações**
```json
{
  "email": "Resend API v2",
  "payments": "Stripe API v2024-12-18",
  "scheduling": "Cal.com Embed v1",
  "ai": "OpenAI GPT-4o / GPT-5 Preview",
  "analytics": "Plausible API"
}
```

### 4.3 Decisões Arquiteturais

| Decisão | Escolha | Alternativa Rejeitada | Justificativa |
|---------|---------|----------------------|---------------|
| **Database** | Neon Postgres | Supabase / RDS | Serverless native, branches de DB, melhor performance em Vercel |
| **ORM** | Drizzle ORM | Prisma | Menor latência em serverless/edge, type-safe total, sem engine binário |
| **Auth** | Clerk | NextAuth / Supabase | Experiência de usuário premium, componentes UI prontos, alta escalabilidade |
| **Drafting** | Craft.js | Builder.io / Framer | Controle total sobre os componentes React e design system local |
| **Next.js** | v16.1.x | v15.x | Adoção das melhorias de cache e performance do React 19 estável |

### 4.4 Fluxo de Requisição

```
1. Usuário acessa: minhaapp.landingbuilder.com
   ↓
2. DNS resolve wildcard: *.landingbuilder.com → Vercel
   ↓
3. Next.js rota dinâmica: app/[domain]/page.tsx
   ↓
4. Query Supabase: SELECT * FROM landings WHERE subdomain = 'minhaapp'
   ↓
5. Renderiza componentes React com design_json + integrações
   ↓
6. Serve HTML + CSS inline (performance)
   ↓
7. Visitor submete form → POST /api/integrations/resend
   ↓
8. Backend envia email via Resend API (chave do usuário)
```

---

## 5. Detailed Features

### 5.1 Module: Authentication and Onboarding

#### **5.1.1 Signup/Login**

**Requirements:**
- [ ] Email/password login (Clerk)
- [ ] Social OAuth: Google, GitHub, Apple
- [ ] Passkeys and Magic links (Native Clerk)
- [ ] Mandatory email verification

**Flow:**
```
1. User clicks "Get Started for Free"
2. Clerk Signup modal opens
3. Method choice (Social or Email)
4. Automatic confirmation via Clerk
5. Redirect to /onboarding with active session
```

**UI:**
- Centered screen, logo at the top
- Minimalist form (email + button)
- "Already have an account? Login" link
- Loading indicator

**Validations:**
- Email: valid format + existing domain (MX record check)
- Password: min 8 characters, 1 number, 1 uppercase
- Rate limit: 5 attempts/hour per IP

#### **5.1.2 Onboarding (First-Time User Experience)**

**Steps:**

**Step 1: Welcome**
```
Title: "Welcome to Landing Builder! 👋"
Subtitle: "In 3 steps, you'll have your first landing page live."
CTA: "Start"
```

**Step 2: Profile Setup**
```
Fields:
- Full Name
- Project Type: [Micro-SaaS | Infoproduct | Consultancy | Other]
- Goal: [Capture leads | Pre-sale | Fake door test]

CTA: "Next"
```

**Step 3: Template Choice**
```
Template Cards:
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   SaaS      │  │  Waitlist   │  │  Presale    │
│   Hero +    │  │  Countdown  │  │  Stripe     │
│   Pricing   │  │  + Form     │  │  Checkout   │
└─────────────┘  └─────────────┘  └─────────────┘

Hover preview
CTA: "Create with this template"
```

**Step 4: Guided Edit (Tour)**
```
Sequential tooltips:
1. "Click any text to edit"
2. "Drag components from the sidebar"
3. "Configure integrations in the menu ⚙️"
4. "When ready, click 'Publish'"

Option: "Skip tour"
```

**Metrics:**
- % of users completing onboarding in < 10min (Target: 80%)
- % of users publishing their 1st landing in 24h (Target: 60%)

---

### 5.2 Module: Landing Page Editor

#### **5.2.1 Editor Interface**

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] Landing Builder      [Save] [Preview] [Publish]      │
├────────┬────────────────────────────────────────────┬───────┤
│        │                                            │       │
│ Compo- │            Canvas (Editing)                │ Sett- │
│ nents  │                                            │ ings  │
│        │  ┌───────────────────────────────────┐    │       │
│ • Hero │  │  [Hero Section]                   │    │ SEO   │
│ • Form │  │  Editable Title                   │    │ - Tit.│
│ • Price│  │  Editable Subtitle                │    │ - Desc│
│ • Test.│  │  [CTA Button]                     │    │ - OG  │
│ • FAQ  │  └───────────────────────────────────┘    │       │
│        │                                            │ Integ.│
│ + More │  ┌───────────────────────────────────┐    │ - Res.│
│        │  │  [Features Grid]                  │    │ - Str.│
│        │  │  Feature 1 | Feature 2 | Feature 3│    │ - Cal │
└────────┴──┴───────────────────────────────────┴────┴───────┘
```

**Components Available (MVP):**

| Component | Description | Editable Props |
|------------|-----------|-----------------|
| **Hero** | Hero section with title/subtitle/CTA | title, subtitle, ctaText, ctaLink, bgImage |
| **Features Grid** | 3-6 feature cards | icon, title, description (each) |
| **Pricing Table** | Side-by-side plans | planName, price, features[], ctaText |
| **Form (Lead Capture)** | Customizable fields | fields[], submitText, successMessage |
| **Testimonials** | Testimonials with photo | author, role, quote, avatar |
| **FAQ Accordion** | Expandable Q&A | question, answer (array) |
| **Footer** | Links and social media | links[], socialLinks[], copyright |

**Editing Features:**

✅ **Inline Editing:**
- Double click text → direct editing
- Esc to cancel, Enter to save
- Auto-save every 3 seconds (debounced)

✅ **Drag & Drop:**
- Drag component from sidebar → canvas
- Reorder components vertically
- Visual drop zone indicator

✅ **Responsiveness:**
- Desktop/tablet/mobile toggle
- Automatic adjustments (Tailwind breakpoints)
- Side-by-side preview

✅ **History (Undo/Redo):**
- Ctrl+Z / Ctrl+Shift+Z
- Last 20 actions
- Visual indicator of saved state

#### **5.2.2 Template System**

**Pre-configured Templates (MVP):**

**Template 1: "SaaS Classic"**
```yaml
sections:
  - hero:
      title: "Automate your [process]"
      subtitle: "Save 10h/week with AI"
      cta: "Start for free"
  - features:
      items:
        - "Feature 1"
        - "Feature 2"
        - "Feature 3"
  - pricing:
      plans:
        - name: "Free"
          price: "$0"
        - name: "Pro"
          price: "$19/mo"
  - form:
      fields: [email]
      submit: "Join waitlist"
  - faq
  - footer
```

**Template 2: "Waitlist Simple"**
```yaml
sections:
  - hero:
      title: "Coming soon: [Product Name]"
      subtitle: "Be one of the first to test"
      cta: "Secure my access"
  - countdown:
      launch_date: "2025-03-01"
  - form:
      fields: [name, email]
      submit: "Join VIP list"
  - social_proof:
      text: "47 people already signed up"
  - footer
```

**Template 3: "Presale MVP"**
```yaml
sections:
  - hero:
      title: "Buy now, pay 50% less"
      subtitle: "Early bird: $49 → $24 (100 spots)"
  - features_grid
  - stripe_checkout:
      price_id: "price_xxx"
  - testimonials
  - footer
```

**Template Customization:**
- Color palette (3 presets + custom)
- Fonts (Google Fonts: 5 options)
- Spacing (compact/normal/relaxed)

#### **5.2.3 AI Copy Generator**

**Functionality:**
- "✨ Generate with AI" button on each text field
- Modal with prompt:
  ```
  Describe your product:
  [Textarea: "e.g. CRM for dentists that automates scheduling"]
  
  Tone of voice: [Professional | Casual | Enthusiastic]
  [Generate copy]
  ```

**Prompt for GPT-4:**
```
You are an expert copywriter for SaaS landing pages.

Product: {user_input}
Tone: {tone}
Section: {section_type (hero/features/etc)}

Generate:
- Title (max 60 characters, impactful)
- Subtitle (max 120 characters, clear benefit)
- CTA (max 20 characters, actionable)

JSON format:
{
  "title": "",
  "subtitle": "",
  "cta": ""
}
```

**Behavior:**
- Loading spinner during generation (1-3s)
- Result shown in preview
- Buttons: [Use this] [Generate another version]
- History of the last 3 generations

**MVP Limitations:**
- 10 free generations/month (Free)
- Unlimited in Pro plan

---

### 5.3 Module: Publishing and Hosting

#### **5.3.1 Automatic Subdomain**

**Flow:**
```
1. User creates landing "my-saas"
2. System generates subdomain: "my-saas.landingbuilder.com"
3. Vercel automatically resolves wildcard DNS
4. Landing goes live in <10 seconds
```

**Subdomain Validation:**
- Lowercase, numbers, hyphens only
- Min 3 characters, max 30
- Cannot start/end with a hyphen
- Uniqueness check in the database

**UI:**
```
┌──────────────────────────────────────────┐
│  Choose your address:                    │
│  https://[________].landingbuilder.com   │
│                                          │
│  ✓ Available  |  ✗ Already exists        │
│                                          │
│  [Publish Landing]                       │
└──────────────────────────────────────────┘
```

#### **5.3.2 Custom Domain**

**Requirements (Pro Plan):**
- User has a domain registered with any provider
- Adds CNAME in the provider's DNS
- Waits for automatic verification

**Fluxo Técnico:**

```typescript
// 1. User adds domain in the dashboard
POST /api/domains/add
Body: { landing_id, custom_domain: "meuapp.com" }

// 2. Backend adiciona ao Vercel
await vercel.domains.create({
  name: "meuapp.com",
  projectId: VERCEL_PROJECT_ID
});

// 3. Retorna instruções CNAME
Response: {
  domain: "meuapp.com",
  cname_target: "cname.vercel-dns.com",
  status: "pending_verification",
  txt_verification: "_vercel=abc123xyz" // Opcional
}

// 4. Usuário adiciona CNAME no DNS
// GoDaddy/Namecheap/etc:
// Type: CNAME
// Name: www (ou @)
// Value: cname.vercel-dns.com
// TTL: 3600

// 5. Vercel verifica DNS (polling a cada 10s)
await vercel.domains.verify("meuapp.com");

// 6. SSL provisiona automaticamente (Let's Encrypt)
// Tempo total: 2-10 minutos

// 7. Webhook notifica usuário
POST /api/webhooks/domain-verified
Body: { domain: "meuapp.com", status: "active" }
```

**UI - Wizard de Custom Domain:**

**Passo 1: Adicionar Domínio**
```
┌────────────────────────────────────────────────┐
│  Adicionar Domínio Personalizado               │
│                                                │
│  Digite seu domínio:                           │
│  [meuapp.com________________]                  │
│                                                │
│  ⚠️  Certifique-se de ter acesso ao DNS       │
│                                                │
│  [Próximo]                                     │
└────────────────────────────────────────────────┘
```

**Passo 2: Configurar DNS**
```
┌────────────────────────────────────────────────┐
│  Configure o DNS do seu domínio                │
│                                                │
│  Adicione este registro CNAME:                 │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ Type:  CNAME                             │ │
│  │ Name:  www (ou @)                        │ │
│  │ Value: cname.vercel-dns.com              │ │
│  │ TTL:   3600                              │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  📺 [Ver tutorial GoDaddy] [Namecheap] [...]  │
│                                                │
│  🔄 Verificando DNS... (pode levar 10min)     │
│                                                │
│  [Verificar agora]                             │
└────────────────────────────────────────────────┘
```

**Passo 3: Confirmação**
```
┌────────────────────────────────────────────────┐
│  ✅ Domínio configurado com sucesso!           │
│                                                │
│  Seu site está live em:                        │
│  🔗 https://meuapp.com                         │
│                                                │
│  🔒 SSL ativo                                  │
│  ⚡ CDN global                                 │
│                                                │
│  [Ir para o site] [Voltar ao dashboard]       │
└────────────────────────────────────────────────┘
```

**Troubleshooting Automático:**
```
Se DNS não propaga em 30min:
- Exibe mensagem: "DNS ainda não propagou. Isso é normal e pode levar até 48h."
- Botão: "Verificar novamente"
- Link: "Problemas? Fale conosco"

Se CNAME incorreto:
- Detecta valor errado
- Exibe: "⚠️ Registro CNAME incorreto. Valor atual: xyz. Esperado: cname.vercel-dns.com"
```

#### **5.3.3 Publicação e Versionamento**

**Estados de Landing:**
- **Draft:** Editando, não publicada
- **Published:** Live no subdomain/custom domain
- **Archived:** Despublicada, mantém histórico

**Botão "Publicar":**
```
Se primeira vez:
  → Abre modal escolha de subdomain
  → Valida disponibilidade
  → Publica + exibe URL

Se já publicada:
  → Atualiza versão live (hot reload)
  → Notificação: "✓ Alterações publicadas"
  → Histórico: salva snapshot da versão anterior
```

**Versionamento (MVP Simplificado):**
```sql
-- Tabela: landing_versions
id, landing_id, version_number, design_json, created_at

-- Ao publicar:
INSERT INTO landing_versions (
  landing_id, 
  version_number, 
  design_json
) VALUES (
  $1,
  (SELECT COALESCE(MAX(version_number), 0) + 1 FROM landing_versions WHERE landing_id = $1),
  $2
);
```

**UI - Histórico de Versões (Futuro):**
```
[v3] Hoje, 14:23 - Atual
[v2] Ontem, 18:45 - [Restaurar]
[v1] 3 dias atrás - [Restaurar]
```

---

### 5.4 Module: Integrations

#### **5.4.1 Resend (Email)**

**Use Cases:**
- Lead capture via form
- Notify user when a new lead signs up
- Auto-responder for the lead

**Setup:**
1. User creates a Resend account (Free: 3k emails/mo)
2. Generat API key at resend.com/api-keys
3. Pastes it in Landing Builder under "Integrations > Resend"

**Configuration:**
```
┌────────────────────────────────────────────────┐
│  Resend Email Setup                            │
│                                                │
│  API Key:                                      │
│  [re_xxxxxxxxxxxxxxxxxxxx___________] [Test]  │
│                                                │
│  Sender Email (verified in Resend):           │
│  [noreply@myapp.com________________]          │
│                                                │
│  ✅ Notifications:                             │
│  □ Notify me when a new lead signs up        │
│     To: [your@email.com_____________]         │
│                                                │
│  □ Send welcome email to lead                 │
│     Template: [Choose template ▼]             │
│                                                │
│  [Save Configuration]                          │
└────────────────────────────────────────────────┘
```

**Fluxo Técnico:**
```typescript
// 1. Lead submete form na landing
POST /api/landings/[id]/submit
Body: { email: "lead@exemplo.com", name: "João" }

// 2. Backend busca config Resend do owner
const { data: landing } = await supabase
  .from('landings')
  .select('integrations')
  .eq('id', landingId)
  .single();

const resendConfig = landing.integrations.resend;

// 3. Salva lead no DB
await supabase
  .from('leads')
  .insert({ landing_id: landingId, email, name });

// 4. Envia emails via Resend
const resend = new Resend(resendConfig.api_key);

// 4a. Notifica owner
if (resendConfig.notify_owner) {
  await resend.emails.send({
    from: resendConfig.from_email,
    to: resendConfig.owner_email,
    subject: `Novo lead: ${name}`,
    html: `<p>${name} (${email}) se inscreveu na sua landing.</p>`
  });
}

// 4b. Auto-responder ao lead
if (resendConfig.welcome_email) {
  await resend.emails.send({
    from: resendConfig.from_email,
    to: email,
    subject: resendConfig.welcome_subject,
    html: resendConfig.welcome_template // HTML customizável
  });
}
```

**Templates de Email (Pré-configurados):**
```
Template 1: "Obrigado pela inscrição!"
---
Olá {name},

Obrigado por se interessar pelo {product_name}!

Estamos trabalhando duro para lançar em breve. 
Você receberá um email assim que estivermos prontos.

Abraços,
Equipe {product_name}
---

Template 2: "Você está na lista VIP"
---
...
```

**Teste de Integração:**
```
Botão "Testar" envia email para o próprio usuário:
- Verifica se API key válida
- Verifica se from_email verificado no Resend
- Exibe resultado: ✓ Sucesso | ✗ Erro (com detalhes)
```

#### **5.4.2 Stripe (Pagamentos)**

**Casos de Uso:**
- Pré-venda de produto (early bird pricing)
- Assinatura para waitlist paga
- Checkout one-time payment

**Setup (OAuth Connect):**
```
1. Usuário clica "Conectar Stripe"
2. Redireciona para OAuth Stripe:
   https://connect.stripe.com/oauth/authorize?
     client_id=ca_xxx
     &redirect_uri=https://landingbuilder.com/auth/stripe/callback
     &scope=read_write
3. Usuário autoriza acesso
4. Stripe retorna authorization_code
5. Backend troca code por access_token
6. Salva stripe_account_id criptografado no DB
```

**Configuração de Produto:**
```
┌────────────────────────────────────────────────┐
│  Stripe Checkout Setup                         │
│                                                │
│  ✅ Conta conectada: acc_xxxxxxxxxxxx          │
│  [Desconectar]                                 │
│                                                │
│  Produto/Preço:                                │
│  ○ Criar novo produto                          │
│    Nome: [Acesso Early Bird______________]    │
│    Preço: [$][49][USD ▼] [one-time ▼]        │
│                                                │
│  ○ Usar produto existente                     │
│    [Selecionar do Stripe ▼]                   │
│                                                │
│  Botão CTA na landing:                         │
│  [Comprar agora__________]                    │
│                                                │
│  Após compra, redirecionar para:              │
│  [https://___________________________]        │
│                                                │
│  [Salvar configuração]                         │
└────────────────────────────────────────────────┘
```

**Componente no Editor:**
```
Quando usuário arrasta "Stripe Checkout":
- Exibe botão CTA configurável
- Ao clicar, abre Stripe Checkout (embed ou redirect)
- Após pagamento, webhook notifica backend
```

**Fluxo Técnico:**
```typescript
// 1. Visitor clica "Comprar" na landing
onClick={() => {
  fetch('/api/stripe/create-checkout', {
    method: 'POST',
    body: JSON.stringify({ landing_id })
  })
  .then(res => res.json())
  .then(({ url }) => window.location.href = url);
}}

// 2. Backend cria Checkout Session
POST /api/stripe/create-checkout

const stripe = new Stripe(landing.integrations.stripe.secret_key);

const session = await stripe.checkout.sessions.create({
  mode: 'payment', // ou 'subscription'
  line_items: [{
    price: landing.integrations.stripe.price_id,
    quantity: 1
  }],
  success_url: landing.integrations.stripe.success_url,
  cancel_url: `https://${landing.subdomain}.landingbuilder.com`,
  metadata: { landing_id }
});

return { url: session.url };

// 3. Stripe processa pagamento
// 4. Webhook notifica sucesso
POST /api/webhooks/stripe

if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  
  // Salva conversão no DB
  await supabase.from('conversions').insert({
    landing_id: session.metadata.landing_id,
    email: session.customer_email,
    amount: session.amount_total,
    currency: session.currency
  });
  
  // Notifica owner (opcional)
  await resend.emails.send({
    to: landing.owner_email,
    subject: '💰 Nova venda!',
    html: `${session.customer_email} comprou por ${session.amount_total/100} ${session.currency.toUpperCase()}`
  });
}
```

**Importante:**
- Usuário recebe pagamento direto na conta Stripe dele
- Landing Builder NÃO toca no dinheiro
- Owner paga assinatura do Landing Builder separadamente

#### **5.4.3 Cal.com (Agendamento)**

**Caso de Uso:**
- Booking de demo/consultoria
- "Agende uma call" CTA

**Setup:**
```
┌────────────────────────────────────────────────┐
│  Cal.com Booking Setup                         │
│                                                │
│  Seu username Cal.com:                         │
│  [meunome_________________]                   │
│                                                │
│  Tipo de evento:                               │
│  [demo-15min ▼]                               │
│                                                │
│  Preview:                                      │
│  📅 https://cal.com/meunome/demo-15min        │
│                                                │
│  [Salvar configuração]                         │
└────────────────────────────────────────────────┘
```

**Componente no Editor:**
```jsx
<CalEmbed
  calLink="meunome/demo-15min"
  config={{
    theme: "light",
    layout: "month_view"
  }}
/>
```

**Render na Landing:**
- Embed inline (iframe) ou
- Botão que abre modal Cal.com

**Não requer API key** (embed público)

#### **5.4.4 Plausible Analytics**

**Métricas Capturadas:**
- Page views
- Unique visitors
- Conversions (form submits, checkouts)
- Traffic sources
- Device breakdown

**Setup (Automático):**
```typescript
// Injeta script no <head> de cada landing
<Script
  defer
  data-domain={landing.subdomain + '.landingbuilder.com'}
  src="https://plausible.io/js/script.js"
/>

// Events customizados
plausible('Signup', { props: { plan: 'pro' } });
plausible('Purchase', { props: { value: 49 } });
```

**Dashboard (Dentro do Landing Builder):**
```
┌────────────────────────────────────────────────┐
│  Analytics - meu-saas.landingbuilder.com       │
│                                                │
│  Últimos 7 dias:                               │
│  👁️  Visitas:        342                       │
│  👤  Visitantes:     289                       │
│  📝  Form submits:    47 (13.7% conv)          │
│  💰  Checkouts:        3 ($147)                │
│                                                │
│  Top sources:                                  │
│  1. Direct: 45%                                │
│  2. Twitter: 28%                               │
│  3. Reddit: 18%                                │
│                                                │
│  [Ver dashboard completo no Plausible →]      │
└────────────────────────────────────────────────┘
```

**Privacy-First:**
- Sem cookies
- GDPR compliant
- Não vende dados

---

### 5.5 Module: Dashboard and Management

#### **5.5.1 Dashboard Overview**

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  🏠 Dashboard  │  📄 My Landings  │  ⚙️ Settings         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Welcome, Felipe! 👋                                         │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │ 3 Active   │  │ 47 Leads   │  │ $147 MRR   │           │
│  │ Landings   │  │ Captured   │  │ (3 sales)  │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│                                                              │
│  Your Landings:                                             │
│  ┌────────────────────────────────────────────────────────┐│
│  │ 🟢 my-crm.landingbuilder.com               [Edit]     ││
│  │    👁️ 234 visits | 📝 28 leads | 12% conv             ││
│  │    Last edit: today, 10:23                             ││
│  └────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌────────────────────────────────────────────────────────┐│
│  │ 🟡 ai-waitlist.landingbuilder.com          [Edit]     ││
│  │    👁️ 89 visits | 📝 12 leads | 13% conv              ││
│  │    Last edit: yesterday                                ││
│  └────────────────────────────────────────────────────────┘│
│                                                              │
│  [+ Create New Landing]                                     │
```
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### **5.5.2 Lista de Landings**

**Funcionalidades:**
- [ ] Buscar por nome
- [ ] Filtrar por status (draft/published/archived)
- [ ] Ordenar (mais recente/mais visitada/mais conversões)
- [ ] Ações rápidas: Editar, Duplicar, Arquivar, Excluir

**Card de Landing:**
```typescript
interface LandingCard {
  id: string;
  name: string;
  subdomain: string;
  custom_domain?: string;
  status: 'draft' | 'published' | 'archived';
  thumbnail: string; // Screenshot automático
  stats: {
    views: number;
    leads: number;
    conversion_rate: number;
    revenue?: number; // Se Stripe ativo
  };
  last_edited: Date;
}
```

#### **5.5.3 Gerenciamento de Leads**

**Visualização:**
```
┌────────────────────────────────────────────────┐
│  Leads - meu-crm.landingbuilder.com            │
│                                                │
│  [Export CSV] [Integrar com...]               │
│                                                │
│  Nome          Email              Data         │
│  ─────────────────────────────────────────────│
│  João Silva    joao@email.com    Hoje, 14:23 │
│  Maria Costa   maria@email.com   Ontem        │
│  ...                                           │
│                                                │
│  47 leads no total                             │
└────────────────────────────────────────────────┘
```

**Funcionalidades:**
- [ ] Export CSV
- [ ] Filtrar por data
- [ ] Buscar por email/nome
- [ ] Marcar como "contatado"
- [ ] Integração futura: Enviar para CRM (Zapier)

**Schema:**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  landing_id UUID REFERENCES landings(id),
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  metadata JSONB, -- Campos custom do form
  created_at TIMESTAMP DEFAULT NOW(),
  contacted BOOLEAN DEFAULT FALSE
);
```

#### **5.5.4 Configurações de Conta**

**Seções:**

**Perfil:**
```
- Nome completo
- Email (não editável, contato support para mudar)
- Avatar (upload ou Gravatar)
- Senha (trocar)
```

**Plano e Billing:**
```
┌────────────────────────────────────────────────┐
│  Plano Atual: Pro ($19/mês)                    │
│  Próxima cobrança: 15/02/2026                  │
│                                                │
│  ✅ Landings ilimitadas                        │
│  ✅ Custom domains                             │
│  ✅ Integrações (Resend, Stripe, Cal)         │
│  ✅ AI copy generator ilimitado                │
│                                                │
│  [Gerenciar assinatura no Stripe]             │
│  [Cancelar plano]                              │
└────────────────────────────────────────────────┘
```

**Integrações Globais:**
```
- API keys salvas (Resend, OpenAI)
- Contas OAuth (Stripe, Google)
- Webhooks (para desenvolvedores)
```

**Preferências:**
```
- Notificações por email: [✓] Novos leads [✓] Vendas [ ] Updates do produto
- Idioma: [Português ▼]
- Timezone: [America/Sao_Paulo ▼]
```

---

## 6. Fluxos de Usuário

### 6.1 Fluxo Principal: Criar e Publicar Landing em 5 Minutos

```mermaid
graph TD
    A[Usuário acessa landingbuilder.com] --> B{Tem conta?}
    B -->|Não| C[Signup com email/OAuth]
    B -->|Sim| D[Login]
    C --> E[Onboarding: Escolhe template]
    D --> F[Dashboard]
    F --> G[+ Criar Nova Landing]
    G --> E
    E --> H[Editor carrega template]
    H --> I[Edita texto inline]
    I --> J[Arrasta componentes]
    J --> K[Configura integrações]
    K --> L[Clica 'Publicar']
    L --> M{Subdomain disponível?}
    M -->|Sim| N[Landing publicada]
    M -->|Não| O[Escolhe outro subdomain]
    O --> L
    N --> P[Exibe URL + compartilha]
    P --> Q[Fim]
```

**Tempo estimado:** 3-7 minutos (alvo: 5min)

### 6.2 Fluxo: Visitor Visita Landing e Converte

```mermaid
graph TD
    A[Visitor acessa minhaapp.landingbuilder.com] --> B[Vercel resolve DNS]
    B --> C[Next.js renderiza landing]
    C --> D[Visitor navega pela página]
    D --> E{Ação do visitor}
    E -->|Submete form| F[POST /api/landings/X/submit]
    E -->|Clica Stripe checkout| G[POST /api/stripe/create-checkout]
    E -->|Agenda Cal.com| H[Abre modal Cal embed]
    F --> I[Backend salva lead no DB]
    I --> J[Envia email via Resend]
    J --> K[Plausible registra evento 'Lead']
    K --> L[Exibe mensagem de sucesso]
    G --> M[Stripe Checkout]
    M --> N[Pagamento bem-sucedido]
    N --> O[Webhook notifica backend]
    O --> P[Salva conversão no DB]
    P --> Q[Owner recebe notificação]
    H --> R[Visitor agenda horário]
    R --> S[Confirmação por email]
```

### 6.3 Fluxo: Adicionar Custom Domain

```mermaid
graph TD
    A[User no dashboard] --> B[Clica 'Adicionar domínio custom']
    B --> C[Insere domínio: meuapp.com]
    C --> D[Backend valida formato]
    D --> E{Domínio válido?}
    E -->|Não| F[Exibe erro]
    F --> C
    E -->|Sim| G[POST Vercel API: adiciona domínio]
    G --> H[Retorna instruções CNAME]
    H --> I[Exibe wizard DNS]
    I --> J[User adiciona CNAME no provedor]
    J --> K[Polling: verifica DNS a cada 10s]
    K --> L{DNS propagou?}
    L -->|Não| M[Timeout 30min?]
    M -->|Não| K
    M -->|Sim| N[Exibe troubleshooting]
    L -->|Sim| O[Vercel provisiona SSL]
    O --> P[Domínio ativo]
    P --> Q[Notifica user: ✓ Sucesso]
```

### 6.4 Fluxo: Owner Visualiza Analytics

```mermaid
graph TD
    A[Owner no dashboard] --> B[Clica em landing específica]
    B --> C[Navega para aba 'Analytics']
    C --> D[Frontend faz GET /api/analytics/X]
    D --> E[Backend agrega dados de:]
    E --> F[Plausible API: views, visitors]
    E --> G[DB: leads count]
    E --> H[Stripe API: revenue]
    F --> I[Retorna JSON consolidado]
    G --> I
    H --> I
    I --> J[Frontend renderiza gráficos]
    J --> K[Owner analisa métricas]
    K --> L{Quer detalhes?}
    L -->|Sim| M[Clica 'Ver no Plausible']
    L -->|Não| N[Volta ao dashboard]
    M --> O[Abre Plausible em nova aba]
```

---

## 7. Especificações de Interface

### 7.1 Design System

**Paleta de Cores:**
```css
/* Primary */
--primary-50: #eff6ff;
--primary-500: #3b82f6; /* Botões principais */
--primary-600: #2563eb; /* Hover */
--primary-900: #1e3a8a; /* Texto destaque */

/* Secondary */
--secondary-500: #8b5cf6; /* Accent */

/* Neutral */
--neutral-50: #f9fafb; /* Background */
--neutral-100: #f3f4f6; /* Cards */
--neutral-500: #6b7280; /* Texto secundário */
--neutral-900: #111827; /* Texto principal */

/* Success/Error */
--success-500: #10b981;
--error-500: #ef4444;
```

**Tipografia:**
```css
/* Fontes */
--font-sans: 'Inter', sans-serif; /* UI */
--font-display: 'Cal Sans', sans-serif; /* Headings */

/* Tamanhos */
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */
--text-4xl: 2.25rem;  /* 36px */
```

**Espaçamento:**
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

**Componentes (Shadcn/UI):**
- Button (variants: default, outline, ghost, destructive)
- Input (com validação inline)
- Select/Dropdown
- Dialog/Modal
- Tabs
- Accordion
- Toast notifications
- Loading spinners

### 7.2 Responsividade

**Breakpoints:**
```css
/* Mobile-first */
sm: 640px   /* Tablet portrait */
md: 768px   /* Tablet landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

**Prioridade:**
1. Mobile (375px - iPhone SE)
2. Desktop (1440px - Macbook Pro)
3. Tablet (768px - iPad)

**Ajustes Específicos:**
- Editor: Oculta sidebar em mobile, usa bottom sheet
- Dashboard: Grid de 1 col em mobile, 2-3 cols em desktop
- Landing renderer: Stack vertical em mobile, side-by-side em desktop

### 7.3 Acessibilidade (WCAG 2.1 AA)

**Requisitos:**
- [ ] Contraste mínimo 4.5:1 para texto
- [ ] Navegação por teclado (Tab, Enter, Esc)
- [ ] Focus indicators visíveis
- [ ] Labels em todos inputs
- [ ] Alt text em imagens
- [ ] ARIA labels onde necessário
- [ ] Skip links para conteúdo principal

**Testes:**
- Lighthouse accessibility score > 90
- Screen reader friendly (VoiceOver/NVDA)

### 7.4 Animações e Microinterações

**Princípios:**
- Rápidas (100-300ms)
- Sutis (não distraem)
- Informativas (feedback visual)

**Exemplos:**
```css
/* Hover button */
transition: all 150ms ease;
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(0,0,0,0.1);

/* Loading skeleton */
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

/* Toast slide-in */
animation: slideIn 200ms ease-out;
```

---

## 8. Integrações e APIs

### 8.1 APIs Externas Utilizadas

| Serviço | Endpoint Base | Autenticação | Rate Limits |
|---------|---------------|--------------|-------------|
| **Resend** | https://api.resend.com/emails | API Key (Bearer) | 10 req/s |
| **Stripe** | https://api.stripe.com/v1 | Secret Key (Bearer) | 100 req/s |
| **Vercel** | https://api.vercel.com/v9 | Bearer Token | 3000 req/hora |
| **OpenAI** | https://api.openai.com/v1/chat/completions | API Key | 3500 req/min (GPT-4 Turbo) |
| **Plausible** | https://plausible.io/api/v1/stats | API Key (Bearer) | 600 req/hora |

### 8.2 Webhooks Recebidos

**Stripe:**
```typescript
POST /api/webhooks/stripe
Header: stripe-signature

Events suportados:
- checkout.session.completed
- customer.subscription.created
- customer.subscription.deleted
- invoice.payment_succeeded
- invoice.payment_failed

Validação:
const signature = req.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(
  req.body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

**Vercel (Domain Verification):**
```typescript
POST /api/webhooks/vercel
Header: x-vercel-signature

Events suportados:
- domain.verified
- domain.deleted

Body exemplo:
{
  type: 'domain.verified',
  payload: {
    domain: 'meuapp.com',
    projectId: 'prj_xxx'
  }
}
```

### 8.3 API Pública (Futura - Roadmap)

**Endpoints planejados:**
```
GET    /api/v1/landings          # Lista landings do user
POST   /api/v1/landings          # Cria landing
GET    /api/v1/landings/:id      # Detalhes
PATCH  /api/v1/landings/:id      # Atualiza
DELETE /api/v1/landings/:id      # Deleta

GET    /api/v1/leads             # Lista leads
POST   /api/v1/leads             # Adiciona lead manualmente

Authentication: Bearer token (generated in dashboard)
```

---

## 9. Data Model (Drizzle ORM)

### 9.1 Database Schema

```typescript
// db/schema.ts
import { pgTable, uuid, varchar, jsonb, timestamp, integer, boolean, text, date } from "drizzle-orm/pg-core";

// Profiles (Synced with Clerk via Webhooks)
export const profiles = pgTable("profiles", {
  id: varchar("id").primaryKey(), // Clerk ID
  fullName: varchar("full_name", { length: 255 }),
  avatarUrl: text("avatar_url"),
  subscriptionTier: varchar("subscription_tier", { length: 20 }).default("free"),
  stripeCustomerId: varchar("stripe_customer_id", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Landings
export const landings = pgTable("landings", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id").references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  subdomain: varchar("subdomain", { length: 63 }).unique().notNull(),
  customDomain: varchar("custom_domain", { length: 255 }).unique(),
  
  designJson: jsonb("design_json").notNull(),
  templateId: varchar("template_id", { length: 50 }),
  integrations: jsonb("integrations").default({}),
  
  seoTitle: varchar("seo_title", { length: 60 }),
  seoDescription: varchar("seo_description", { length: 160 }),
  ogImageUrl: text("og_image_url"),
  
  status: varchar("status", { length: 20 }).default("draft"), // 'draft', 'published', 'archived'
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Leads
export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  landingId: uuid("landing_id").references(() => landings.id, { onDelete: 'cascade' }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  metadata: jsonb("metadata"),
  
  contacted: boolean("contacted").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Analytics Daily
export const analyticsDaily = pgTable("analytics_daily", {
  id: uuid("id").defaultRandom().primaryKey(),
  landingId: uuid("landing_id").references(() => landings.id, { onDelete: 'cascade' }).notNull(),
  date: date("date").notNull(),
  pageViews: integer("page_views").default(0),
  uniqueVisitors: integer("unique_visitors").default(0),
  leadsCount: integer("leads_count").default(0),
  revenueCents: integer("revenue_cents").default(0),
}, (table) => ({
  pk: [table.landingId, table.date],
}));
```
```

### 9.2 Relacionamentos

```mermaid
erDiagram
    PROFILES ||--o{ LANDINGS : owns
    LANDINGS ||--o{ LANDING_VERSIONS : has
    LANDINGS ||--o{ LEADS : captures
    LANDINGS ||--o{ CONVERSIONS : generates
    LANDINGS ||--o| DOMAINS : has_custom
    LANDINGS ||--o{ ANALYTICS_DAILY : aggregates
    LEADS ||--o| CONVERSIONS : converts_to
```

### 9.3 Exemplo de JSON (Integrations)

```json
{
  "resend": {
    "api_key": "encrypted_re_xxxxxxxx",
    "from_email": "noreply@meuapp.com",
    "notify_owner": true,
    "owner_email": "owner@exemplo.com",
    "welcome_email": true,
    "welcome_subject": "Obrigado pela inscrição!",
    "welcome_template": "<p>HTML template</p>"
  },
  "stripe": {
    "account_id": "acct_xxxxxx",
    "publishable_key": "pk_live_xxxxxx",
    "price_id": "price_xxxxxx",
    "success_url": "https://meuapp.com/obrigado"
  },
  "cal": {
    "username": "meunome",
    "event_slug": "demo-15min"
  }
}
```

### 9.4 Row Level Security (RLS)

```sql
-- Users só acessam suas próprias landings
ALTER TABLE landings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own landings"
  ON landings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own landings"
  ON landings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own landings"
  ON landings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users delete own landings"
  ON landings FOR DELETE
  USING (auth.uid() = user_id);

-- Leads: owner da landing pode ver
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Landing owners view leads"
  ON leads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM landings
      WHERE landings.id = leads.landing_id
      AND landings.user_id = auth.uid()
    )
  );

-- Públic read para renderizar landings
CREATE POLICY "Public can view published landings"
  ON landings FOR SELECT
  USING (status = 'published');
```

---

## 10. Security and Compliance

### 10.1 Authentication and Authorization

**Clerk Auth (Server-side):**
```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/api/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

// Verify resource ownership (Server Action / Route Handler)
async function verifyOwnership(landingId: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const [landing] = await db
    .select({ userId: landings.userId })
    .from(landings)
    .where(eq(landings.id, landingId))
    .limit(1);
  
  if (landing?.userId !== userId) {
    throw new Error('Forbidden');
  }
}
```

### 10.2 Data Protection

**Encryption:**
- API keys (Resend, Stripe) → Supabase Vault (AES-256)
- Passwords → Bcrypt (Supabase Auth)
- Communication → HTTPS mandatory (TLS 1.3)

**PII (Personally Identifiable Information):**
- Lead emails → stored with hash for deduplication
- IPs → anonymized after 90 days (GDPR)
- User agents → sanitized

**Backup:**
- Supabase: daily automatic backup (7-day retention)
- Vercel: deployment history (30 days)

### 10.3 GDPR Compliance

**User Rights:**
- [ ] **Access:** Dashboard > Settings > "Download my data"
- [ ] **Rectification:** Inline profile/lead editing
- [ ] **Erasure:** "Delete account" → cascade deletes RLS
- [ ] **Portability:** Export CSV of leads

**Consent:**
```html
<!-- Cookie banner (MVP: opt-in for marketing) -->
<CookieBanner>
  We use essential cookies for the website's operation.
  <button>Got it</button>
  <a href="/privacy">Privacy Policy</a>
</CookieBanner>
```

**Transparency:**
- Privacy Policy (static page)
- Terms of Service (static page)
- Link in the footer of all pages

### 10.4 Rate Limiting

**Levels:**
```typescript
// Signup/Login: 5 attempts per IP/hour
rateLimiter({
  windowMs: 60 * 60 * 1000, // 1h
  max: 5,
  message: 'Too many attempts. Try again in 1 hour.'
});

// API calls: 100 req/min per user
rateLimiter({
  windowMs: 60 * 1000,
  max: 100,
  keyGenerator: (req) => req.user.id
});

// Form submissions: 10 per IP/minute (anti-spam)
rateLimiter({
  windowMs: 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true
});
```

**Implementation:**
- Upstash Redis (serverless KV store)
- Vercel Edge Middleware

### 10.5 Input Validation

**Sanitization:**
```typescript
import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

// Zod validation schema
const LandingSchema = z.object({
  name: z.string().min(3).max(100),
  subdomain: z.string()
    .regex(/^[a-z0-9]([a-z0-9-]{1,61}[a-z0-9])?$/)
    .min(3).max(63),
  seo_title: z.string().max(60).optional(),
  design_json: z.object({}).passthrough() // Validated by Craft.js
});

// Sanitize user-generated HTML
function sanitizeHtml(dirty: string) {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
    ALLOWED_ATTR: ['href']
  });
}
```

**SQL Injection:**
- Supabase uses prepared statements (native protection)
- Never concatenate strings in queries

**XSS:**
- React automatically escapes (JSX)
- Sanitize user HTML (DOMPurify)
- CSP headers:
  ```
  Content-Security-Policy: 
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.vercel-analytics.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
  ```

### 10.6 Monitoring and Logs

**Sentry (Error Tracking):**
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
});
```

**Structured Logs:**
```typescript
// Winston or Pino
logger.info('Landing published', {
  userId: user.id,
  landingId: landing.id,
  subdomain: landing.subdomain
});

logger.error('Stripe webhook failed', {
  error: err.message,
  eventId: event.id
});
```

**Alerts:**
- 5xx error > 10/min → Slack webhook
- Stripe webhook failure → Email owner
- Domain verification failed > 24h → In-app notification

---

## 11. Development Plan and Roadmap

### 11.1 Phases and Timeline

**PHASE 1: Setup and Foundation (Week 1)**
- [x] Repo Setup (Next.js 16 + TypeScript)
- [x] Configure Neon.db (project + branches)
- [x] Setup Drizzle ORM (schema and migrations)
- [x] Configure Clerk (project + API keys)
- [x] Design system (Tailwind + Shadcn/UI)
- [x] CI/CD with Vercel

**PHASE 2: Authentication and Onboarding (Week 1-2)**
- [x] Implement Clerk Middleware
- [x] Customize Clerk components (Login/Signup)
- [x] Onboarding flow (sync Clerk User to Neon DB)
- [x] Dashboard shell (layout)

**PHASE 3: Landing Page Editor (Week 2-3)**
- [ ] Craft.js Integration
- [ ] 3 MVP templates (SaaS, Waitlist, Presale)
- [ ] Basic components (Hero, Form, Features, Pricing)
- [ ] Inline editing + drag-drop
- [ ] Auto-save

**FASE 4: Publicação e Hospedagem (Semana 3)**
- [ ] Sistema de subdomínios (*.landingbuilder.com)
- [ ] Renderização dinâmica ([domain]/page.tsx)
- [ ] Vercel Domains API (custom domains)
- [ ] Wizard DNS + verificação

**FASE 5: Integrações (Semana 4)**
- [ ] Resend (email leads)
- [ ] Stripe OAuth + checkout
- [ ] Cal.com embed
- [ ] Plausible analytics

**FASE 6: Dashboard e Analytics (Semana 4)**
- [ ] Lista de landings
- [ ] Gerenciamento de leads (table + export CSV)
- [ ] Analytics agregados (cards de métricas)
- [ ] Configurações de conta

**FASE 7: AI Copy Generator (Semana 4 - se tempo permitir)**
- [ ] Integração OpenAI API
- [ ] Prompt engineering
- [ ] UI de geração (modal)

**FASE 8: Polish e Testing (Semana 5)**
- [ ] Testes end-to-end (Playwright)
- [ ] Testes de carga (landing rendering)
- [ ] Bugfixes
- [ ] Documentação (README, onboarding in-app)

**FASE 9: Beta Launch (Semana 5)**
- [ ] Landing do próprio Landing Builder (dogfooding!)
- [ ] Post em IndieHackers/Reddit
- [ ] Onboarding de 10-20 beta users
- [ ] Coletar feedback

**FASE 10: Iteração e Melhoria (Semana 6+)**
- [ ] Implementar feedback
- [ ] Otimizações de performance
- [ ] Adicionar features secundárias (histórico de versões, A/B test)

### 11.2 Estimativa de Esforço

| Fase | Horas | Prioridade |
|------|-------|-----------|
| 1. Setup | 8h | P0 |
| 2. Auth | 12h | P0 |
| 3. Editor | 30h | P0 |
| 4. Hospedagem | 16h | P0 |
| 5. Integrações | 24h | P0 |
| 6. Dashboard | 16h | P0 |
| 7. AI Generator | 12h | P1 |
| 8. Testing | 16h | P0 |
| 9. Beta Launch | 8h | P0 |
| **Total** | **142h** | **~4 semanas full-time** |

*Assumindo desenvolvedor experiente trabalhando 40h/semana*

### 11.3 Stack de Ferramentas de Desenvolvimento

**Code:**
- Editor: VSCode + Prettier + ESLint
- Version control: Git + GitHub
- Branches: `main` (prod), `develop` (staging), feature branches

**Projeto:**
- Tasks: Linear ou Notion
- Docs: Notion ou Markdown (repo)
- Design: Figma (wireframes básicos)

**Testing:**
- Unit: Vitest
- E2E: Playwright
- API: Postman/Insomnia

**Deploy:**
- Frontend: Vercel (auto-deploy from `main`)
- Database: Supabase (managed)
- Monitoring: Sentry + Vercel Analytics

### 11.4 Critérios de Aceitação (Definition of Done)

**Por Feature:**
- [ ] Código escrito e commitado
- [ ] Testes passando (se aplicável)
- [ ] Responsivo (mobile + desktop)
- [ ] Acessível (navegação por teclado)
- [ ] Documentado (comentários em código complexo)
- [ ] Aprovado em code review (se time)
- [ ] Deployado em staging
- [ ] Testado manualmente (smoke test)

**Para MVP Completo:**
- [ ] Todas features P0 implementadas
- [ ] Landing Builder usável para validar uma ideia em < 10min
- [ ] Zero bugs críticos (que impedem uso)
- [ ] Performance: Lighthouse score > 85
- [ ] Segurança: Sem vulnerabilidades críticas (npm audit)
- [ ] Documentação: README + FAQ básico

---

## 12. Roadmap Futuro

### 12.1 Versão 1.1 (Mês 2-3)

**Features:**
- [ ] A/B Testing
  - Cria 2 variantes de landing
  - Split traffic 50/50
  - Dashboard com winner declarado

- [ ] Templates Adicionais
  - E-commerce product launch
  - Newsletter signup
  - Event registration

- [ ] Histórico de Versões Melhorado
  - Preview de versões anteriores
  - Restaurar com 1 clique
  - Diff visual entre versões

- [ ] Notificações Push
  - Novo lead → push notification (Web Push API)
  - Nova venda → push notification

### 12.2 Versão 1.5 (Mês 4-6)

**Features:**
- [ ] White-Label para Agências
  - Remove branding "Landing Builder"
  - Custom logo/cores
  - Preço: $99/mês

- [ ] Integrações Adicionais
  - Zapier (automações)
  - Mailchimp (sync leads)
  - Google Sheets (export automático)
  - Slack (notificações)

- [ ] Advanced Analytics
  - Heatmaps (via Hotjar)
  - Session recordings
  - Funnel visualization

- [ ] Colaboração
  - Múltiplos usuários por conta
  - Permissões (editor/viewer)
  - Comentários no editor

### 12.3 Versão 2.0 (Mês 7-12)

**Features:**
- [ ] Marketplace de Templates
  - Comunidade cria templates
  - Venda/compra ($5-$50)
  - Revenue share (70/30)

- [ ] AI Features Avançados
  - AI geração de imagens (DALL-E)
  - AI otimização de conversão (sugestões automáticas)
  - AI chatbot incorporado na landing

- [ ] Hospedagem de MVPs (Apps Dinâmicos)
  - Deploy de Next.js apps
  - Database provisioning (Supabase)
  - Serverless functions

- [ ] Internacionalização
  - Multi-idioma (EN, ES, PT)
  - Detecção automática de locale
  - Templates específicos por região

### 12.4 Métricas de Sucesso por Versão

| Versão | Usuários Ativos | MRR | Churn |
|--------|-----------------|-----|-------|
| MVP (1.0) | 100 | $1K | <15% |
| 1.1 | 500 | $5K | <10% |
| 1.5 | 1500 | $15K | <8% |
| 2.0 | 5000 | $50K | <5% |

---

## 13. Anexos Técnicos

### 13.1 Exemplo de Código: Renderer de Landing

```typescript
// app/[domain]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { renderLanding } from '@/lib/renderer';
import { getLandingByDomain } from '@/lib/db';

type Props = {
  params: { domain: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const landing = await getLandingByDomain(params.domain);
  
  if (!landing) return {};
  
  return {
    title: landing.seo_title || landing.name,
    description: landing.seo_description,
    openGraph: {
      images: [landing.og_image_url],
    },
  };
}

export default async function LandingPage({ params }: Props) {
  const landing = await getLandingByDomain(params.domain);
  
  if (!landing || landing.status !== 'published') {
    notFound();
  }
  
  return (
    <>
      {/* Analytics */}
      <Script
        defer
        data-domain={`${landing.subdomain}.landingbuilder.com`}
        src="https://plausible.io/js/script.js"
      />
      
      {/* Renderiza componentes React a partir do JSON */}
      {renderLanding(landing.design_json, landing.integrations)}
    </>
  );
}

// lib/renderer.tsx
import { Hero } from '@/components/blocks/Hero';
import { Features } from '@/components/blocks/Features';
import { Pricing } from '@/components/blocks/Pricing';
import { Form } from '@/components/blocks/Form';

const COMPONENT_MAP = {
  hero: Hero,
  features: Features,
  pricing: Pricing,
  form: Form,
};

export function renderLanding(designJson: any, integrations: any) {
  return (
    <div className="landing-container">
      {designJson.sections.map((section: any, idx: number) => {
        const Component = COMPONENT_MAP[section.type];
        
        if (!Component) {
          console.warn(`Unknown component type: ${section.type}`);
          return null;
        }
        
        return (
          <Component
            key={idx}
            {...section.props}
            integrations={integrations}
          />
        );
      })}
    </div>
  );
}
```

### 13.2 Exemplo de Código: Form com Resend

```typescript
// components/blocks/Form.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type FormProps = {
  fields: Array<{ name: string; type: string; label: string }>;
  submitText: string;
  successMessage: string;
  integrations: any;
};

export function Form({ fields, submitText, successMessage, integrations }: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          landing_subdomain: window.location.hostname.split('.')[0],
          ...formData,
        }),
      });

      if (!res.ok) throw new Error('Falha ao enviar');

      setStatus('success');
      setFormData({}); // Reset
    } catch (err) {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center p-8">
        <h3 className="text-2xl font-bold mb-2">✅ {successMessage}</h3>
        <p className="text-neutral-600">Você receberá um email em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      {fields.map(field => (
        <div key={field.name}>
          <label className="block text-sm font-medium mb-1">
            {field.label}
          </label>
          <Input
            type={field.type}
            name={field.name}
            required
            value={formData[field.name] || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
          />
        </div>
      ))}

      <Button 
        type="submit" 
        className="w-full"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Enviando...' : submitText}
      </Button>

      {status === 'error' && (
        <p className="text-red-500 text-sm">Erro ao enviar. Tente novamente.</p>
      )}
    </form>
  );
}
```

```typescript
// app/api/leads/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { leads, landings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { landing_subdomain, email, name, ...metadata } = body;

  // 1. Busca landing pelo subdomain
  const [landing] = await db
    .select()
    .from(landings)
    .where(eq(landings.subdomain, landing_subdomain))
    .limit(1);

  if (!landing) {
    return NextResponse.json({ error: 'Landing não encontrada' }, { status: 404 });
  }

  // 2. Salva lead no DB via Drizzle
  const [newLead] = await db
    .insert(leads)
    .values({
      landingId: landing.id,
      email,
      name,
      metadata,
    })
    .returning();

  // 3. Envia emails via Resend (se configurado)
  const integrations = landing.integrations as any;
  if (integrations?.resend?.api_key) {
    const resend = new Resend(integrations.resend.api_key);
    // ... fluxo de envio de email similar ...
  }

  return NextResponse.json({ success: true });
}
```

### 13.3 Variáveis de Ambiente (.env.local)

```bash
# Neon.db (PostgreSQL)
DATABASE_URL=postgresql://user:pass@neon.db/dbname?sslmode=require

# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Vercel (Domains)
VERCEL_TOKEN=xxx
VERCEL_PROJECT_ID=prj_xxx

# OpenAI (AI Generator)
OPENAI_API_KEY=sk-xxx

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Plausible
PLAUSIBLE_API_KEY=xxx

# App
NEXT_PUBLIC_APP_URL=https://landingbuilder.com
```

### 13.4 Scripts Úteis (package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:e2e": "playwright test",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "db:generate": "drizzle-kit generate",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 14. Glossário

| Termo | Definição |
|-------|-----------|
| **Micro-SaaS** | Software as a Service de nicho, geralmente operado por 1-3 pessoas |
| **Indie Hacker** | Empreendedor solo construindo produtos digitais |
| **Landing Page** | Página web focada em conversão (leads ou vendas) |
| **Fake Door Test** | Landing que parece um produto real, mas apenas captura interesse (não existe backend) |
| **Waitlist** | Lista de interessados em produto antes do lançamento |
| **PMF (Product-Market Fit)** | Quando produto atende demanda clara de mercado |
| **MRR (Monthly Recurring Revenue)** | Receita recorrente mensal |
| **Churn** | Taxa de cancelamento de assinaturas |
| **CAC (Customer Acquisition Cost)** | Custo para adquirir 1 cliente |
| **CNAME** | Registro DNS que aponta domínio para outro endereço |
| **Serverless** | Arquitetura onde infraestrutura é gerenciada pelo provedor (ex: Vercel) |
| **OAuth** | Protocolo de autorização (ex: "Login com Google") |
| **Webhook** | HTTP callback para notificações de eventos |
| **Rate Limiting** | Limitação de número de requisições por tempo |
| **RLS (Row Level Security)** | Políticas de segurança a nível de linha no banco |

---

## 15. Contatos e Recursos

**Responsável pelo Produto:**
- Nome: Felipe
- Email: [seu_email]
- LinkedIn: [seu_linkedin]

**Repositório:**
- GitHub: [repo_url]
- Documentação técnica: [docs_url]

**Recursos Úteis:**
- Next.js Docs: https://nextjs.org/docs
- Neon Docs: https://neon.tech/docs
- Clerk Docs: https://clerk.com/docs
- Drizzle ORM: https://orm.drizzle.tech/
- Vercel Domains API: https://vercel.com/docs/rest-api/endpoints/domains
- Craft.js: https://craft.js.org/
- Shadcn/UI: https://ui.shadcn.com/

---
