# Guia de Configuração GA4 + Google Cloud (2026) 📊🚀

Para que o sistema de Analytics Nativo do ShipKit funcione, você precisa conectar o backend ao seu Google Analytics. Siga este passo a passo detalhado.

---

## 1. Google Analytics 4 (Portal Analytics)

### Criar uma Propriedade
1. Vá para o [Google Analytics](https://analytics.google.com/).
2. Crie uma nova **Propriedade GA4** chamada "ShipKit Central".
3. Nas configurações de Fluxo de Dados (Data Stream), ignore a parte de "instalação manual" (o ShipKit já faz isso via código).
4. **IMPORTANTE:** Anote o **Property ID** (fica em *Propriedade > Detalhes da Propriedade*). 518293627

### Configurar Dimensões Personalizadas (Custom Dimensions)
*O ShipKit precisa disso para separar os dados de cada landing page.*
1. Vá em **Administrador > Exibição de Dados > Definições Personalizadas**.
2. Clique em **Criar dimensões personalizadas** e adicione estas três (Escopo: **Evento**):
    - **landing_id** (Nome: `landing_id`, Parâmetro: `landing_id`)
    - **creator_id** (Nome: `creator_id`, Parâmetro: `creator_id`)
    - **subdomain** (Nome: `subdomain`, Parâmetro: `subdomain`)

---

## 2. Google Cloud Console (Backend Access)

### Criar Projeto e Ativar API
1. Vá para o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um novo projeto chamado "ShipKit-Analytics".
3. Vá em **APIs e Serviços > Biblioteca**.
4. Procure por **Google Analytics Data API** e clique em **Ativar**.

### Criar Conta de Serviço (Service Account)
1. Vá em **IAM e Administrador > Contas de Serviço**.
2. Clique em **+ Criar Conta de Serviço**.
3. Nome: `shipkit-analytics-service`.
4. Avance até o final (não precisa conceder papéis no Cloud).

### Gerar Chave JSON
1. Na lista de Contas de Serviço, clique na conta criada.
2. Vá na aba **Chaves > Adicionar Chave > Criar nova chave**.
3. Selecione o formato **JSON** e clique em Criar.
4. O arquivo será baixado. **Guarde-o bem!**

---

## 3. Conectando as Pontas

### Autorizar a Conta de Serviço no Analytics
1. Abra o arquivo JSON baixado e copie o `client_email`.
2. Volte ao [Google Analytics](https://analytics.google.com/).
3. Vá em **Administrador > Gerenciamento de Acesso à Propriedade**.
4. Clique em **+ > Adicionar usuários**.
5. Cole o e-mail da conta de serviço e conceda a permissão de **Visualizador** (Viewer).

---

## 4. Variáveis de Ambiente (.env.local)

Adicione as seguintes chaves ao seu arquivo `.env.local`:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX   # (O "ID de métrica" do seu Data Stream)
GA4_PROPERTY_ID=123456789                    # (O ID da Propriedade)
GA4_CLIENT_EMAIL=seu-email@projeto.iam.gserviceaccount.com
GA4_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..." # (A chave privada do seu JSON)

# Microsoft Clarity (Opcional)
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxx
```

> [!TIP]
> Ao colar a `GA4_PRIVATE_KEY` no `.env.local`, certifique-se de que as quebras de linha sejam representadas por `\n` em uma única linha, ou use aspas se o seu ambiente suportar.

---

## 5. Verificação ✅
Após configurar, acesse o Dashboard do ShipKit. Se as chaves estiverem corretas, a mensagem de erro no Analytics sumirá e, assim que as landings receberem as primeiras visitas, os gráficos começarão a ser populados!
