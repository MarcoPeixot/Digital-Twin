# Slides para Vídeo SIICUSP 2025

**Projeto:** Picos de Acessos Simultâneos e Digital Twin  
**Total de Slides:** 8 slides principais + slides de apoio  
**Ferramenta recomendada:** PowerPoint, Google Slides ou Canva

---

## SLIDE 1: APRESENTAÇÃO PESSOAL

**Duração no vídeo:** 30 segundos

### Conteúdo:

**Título Principal:**

```
SIICUSP 2025
Iniciação Científica - EPUSP
```

**Informações do Autor:**

```
Marco Ruas
Engenharia de Software - Inteli

Orientadores:
• Prof. Dr. Reginaldo Arakaki (EPUSP)
• Profa. Dra. Fabiana Martins Oliveira (EPUSP)

Departamento de Engenharia de Computação
e Sistemas Digitais - EPUSP
```

### Design:

- **Fundo:** Azul institucional ou branco
- **Logo:** Inteli (esquerda superior), EPUSP (direita superior)
- **Foto:** Sua foto profissional (lado direito)
- **Fonte:** Arial ou similar, títulos em negrito

---

## SLIDE 2: TÍTULO DO PROJETO

**Duração no vídeo:** 20 segundos

### Conteúdo:

**Título Principal (grande, destaque):**

```
Picos de Acessos Simultâneos trazem
Riscos para Negócios Digitais:

Como usar o Digital Twin no Controle
de Arquitetura de Sistemas
Codificados por IA
```

**Autores:**

```
Marco Ruas¹, Fabiana Martins Oliveira², Reginaldo Arakaki²

¹Instituto de Tecnologia e Liderança - Inteli
²Escola Politécnica da Universidade de São Paulo - EPUSP
```

### Design:

- **Fundo:** Gradiente azul/branco
- **Título:** Fonte grande, duas cores (destaque em vermelho para "Picos" e "Digital Twin")
- **Elemento visual:** Ícone de gráfico com pico de acesso

---

## SLIDE 3: MOTIVAÇÃO - PROBLEMA

**Duração no vídeo:** Primeira parte dos 1min 30s

### Conteúdo:

**Título:**

```
O Problema: Picos de Acessos Simultâneos
```

**Exemplos com ícones:**

```
🏦 Aplicativos Financeiros (PIX)
🎰 Plataformas de Apostas
🛒 E-commerce (Black Friday)
📄 Sistema da Receita Federal (IR)
```

**Texto principal:**

```
• Padrões de sazonalidade previsíveis
• Falhas custam milhões em prejuízos
• Sistemas não preparados para picos
• Consequências: multas, perda de receita, insatisfação
```

### Design:

- **Gráfico:** Linha temporal mostrando picos de acesso
- **Cores:** Vermelho para indicar problemas
- **Ícones:** Representando cada tipo de sistema

---

## SLIDE 4: MOTIVAÇÃO - LIMITAÇÕES DAS IAs

**Duração no vídeo:** Segunda parte dos 1min 30s

### Conteúdo:

**Título:**

```
Limitação das Ferramentas de IA Atuais
```

**Problema Central:**

```
❌ Prompts simplistas não capturam
   Requisitos Não Funcionais críticos

❌ Foco apenas em funcionalidades básicas

❌ Ignoram arquitetura para alta demanda
```

**Solução Proposta:**

```
✅ Gêmeo Digital inteligente

✅ Monitoramento em tempo real

✅ Prevenção de falhas antes que aconteçam
```

### Design:

- **Layout:** Duas colunas (Problema vs Solução)
- **Cores:** Vermelho para problemas, verde para soluções
- **Elemento visual:** Cérebro/IA com limitações vs Gêmeo Digital

---

## SLIDE 5: METODOLOGIA - ARQUITETURA

**Duração no vídeo:** Primeira parte dos 1min 20s

### Conteúdo:

**Título:**

```
Metodologia: Arquitetura Orientada a Eventos
```

**Diagrama Principal:**

```
[Sistema PIX]  →  [Apache Kafka]  →  [Gêmeo Digital]
   (Producer)      (Event Broker)      (CEP Consumer)
      ↓                  ↓                   ↓
  Transações        Eventos em         Análise de
  Simuladas        Tempo Real          Padrões
```

**Tecnologias:**

```
• Next.js + PostgreSQL + Docker
• Apache Kafka (Message Broker)
• Processamento de Eventos Complexos (CEP)
• Sistema de Auditoria completo
```

### Design:

- **Diagrama:** Fluxo horizontal com setas
- **Cores:** Azul para sistema, laranja para Kafka, verde para gêmeo
- **Ícones:** Logo das tecnologias

---

## SLIDE 6: METODOLOGIA - TRÊS ETAPAS

**Duração no vídeo:** Segunda parte dos 1min 20s

### Conteúdo:

**Título:**

```
Três Etapas de Desenvolvimento
```

**Etapa 1:**

```
1️⃣ Sistema PIX Simulado
• Transações com rastreabilidade completa
• Next.js, PostgreSQL, Docker
• Interface de usuário moderna
```

**Etapa 2:**

```
2️⃣ Gêmeo Digital Integrado
• Monitoramento em tempo real
• Arquitetura orientada a eventos
• Apache Kafka como ponte
```

**Etapa 3:**

```
3️⃣ Geração por LLM + Auditoria
• Código gerado por IA com rastreabilidade
• Sistema de auditoria robusto
• Logs estruturados para análise
```

### Design:

- **Layout:** Três caixas numeradas
- **Cores:** Progressão de cores (azul → laranja → verde)
- **Ícones:** Engrenagens, conectores, código

---

## SLIDE 7: RESULTADOS - SISTEMA FUNCIONANDO

**Duração no vídeo:** Primeira parte do 1min

### Conteúdo:

**Título:**

```
Resultados: Ecossistema Funcional
```

**Screenshots lado a lado:**

```
[Dashboard PIX]        [Monitoramento Gêmeo Digital]
• Saldo e extratos     • Métricas em tempo real
• Transferências PIX   • Detecção de padrões
• Interface moderna    • Alertas automáticos
```

**Requisitos Não Funcionais Implementados:**

```
📊 Volumetria: Paginação e indexação otimizada
👥 Acessos Simultâneos: Transações atômicas
📋 Rastreabilidade: Auditoria completa
```

### Design:

- **Screenshots:** Capturas reais do sistema funcionando
- **Métricas:** Gráficos simples mostrando performance
- **Cores:** Verde para sucesso

---

## SLIDE 8: CONCLUSÕES

**Duração no vídeo:** Segunda parte do 1min

### Conteúdo:

**Título:**

```
Conclusões e Impacto
```

**Principais Conquistas:**

```
✅ Monitoramento arquitetural em tempo real
✅ Detecção precoce de problemas críticos
✅ Arquitetura desacoplada e escalável
✅ Prevenção de transações inconsistentes
```

**Diferencial vs Métodos Tradicionais:**

```
ATAM (Tradicional)    →    Gêmeo Digital (Inovação)
• Análise offline           • Análise em tempo real
• Avaliação estática       • Monitoramento dinâmico
• Detecção tardia          • Prevenção proativa
```

### Design:

- **Layout:** Comparação lado a lado
- **Cores:** Azul tradicional vs Verde inovação
- **Elemento visual:** Gráfico antes/depois

---

## SLIDE 9: AGRADECIMENTOS

**Duração no vídeo:** 20 segundos

### Conteúdo:

**Título:**

```
Agradecimentos
```

**Instituições e Apoio:**

```
Departamento de Engenharia de Computação
e Sistemas Digitais da EPUSP

Departamento de Engenharia de Software do Inteli

Fundo Amigos da Poli
(Apoio financeiro)
```

**Orientadores:**

```
Prof. Dr. Reginaldo Arakaki
Profa. Dra. Fabiana Martins Oliveira
```

### Design:

- **Logos:** EPUSP, Inteli, Fundo Amigos da Poli
- **Layout:** Centralizado, formal
- **Cores:** Institucional (azul/branco)

---

## SLIDES OPCIONAIS DE APOIO

### SLIDE EXTRA A: DIAGRAMA TÉCNICO DETALHADO

```
Sistema PIX (Next.js)
├── Frontend: Dashboard de usuário
├── Backend: APIs REST
├── Banco: PostgreSQL com auditoria
└── Eventos: Producer Kafka

↓ Apache Kafka Topics ↓
├── user-transactions
├── system-metrics
└── audit-logs

Gêmeo Digital (CEP)
├── Consumer: Processa eventos
├── Análise: Detecta padrões
└── Alertas: Notifica problemas
```

### SLIDE EXTRA B: MÉTRICAS E RESULTADOS

```
Métricas Alcançadas:
• Latência < 100ms para transações
• 100% de rastreabilidade implementada
• 0 transações perdidas em testes
• Detecção de anomalias em tempo real
```

---

## ORIENTAÇÕES DE DESIGN GERAL

### Paleta de Cores:

- **Azul institucional:** #003366 (EPUSP)
- **Laranja tech:** #FF6B35 (destaque)
- **Verde sucesso:** #28A745
- **Cinza neutro:** #6C757D
- **Vermelho alerta:** #DC3545

### Tipografia:

- **Títulos:** Arial/Helvetica Bold, 24-32pt
- **Subtítulos:** Arial/Helvetica Semibold, 18-24pt
- **Texto:** Arial/Helvetica Regular, 14-18pt
- **Códigos:** Courier New/Monaco, 12-14pt

### Layout:

- **Margens:** 2cm em todos os lados
- **Alinhamento:** Centralizado para títulos, esquerda para texto
- **Espaçamento:** Consistente entre elementos
- **Contraste:** Alto para legibilidade em vídeo

---

## CHECKLIST DE FINALIZAÇÃO

### Revisão de Conteúdo:

- [ ] Todos os slides seguem o roteiro
- [ ] Tempo estimado respeitado
- [ ] Informações técnicas corretas
- [ ] Nomes e instituições corretos

### Qualidade Visual:

- [ ] Legibilidade em diferentes tamanhos
- [ ] Consistência de design entre slides
- [ ] Imagens e diagramas nítidos
- [ ] Cores adequadas para vídeo

### Preparação Final:

- [ ] Slides exportados em alta resolução
- [ ] Backup dos arquivos
- [ ] Teste de apresentação
- [ ] Sincronização com roteiro

---

**Data de criação:** 9 de setembro de 2025  
**Prazo de envio do vídeo:** até 10 de setembro de 2025  
**Status:** Slides prontos para produção
