# Slides Oficiais - SIICUSP 2025

**Projeto:** Picos de Acessos Simultâneos e Digital Twin  
**Baseado no roteiro oficial obrigatório**  
**Total de Slides:** 9 slides conforme estrutura obrigatória  
**IMPORTANTE:** Usar template oficial do site SIICUSP

---

## 📋 ESTRUTURA OFICIAL DOS SLIDES

### SLIDE 1: ✓ APRESENTAÇÃO PESSOAL

**Seção obrigatória:** Apresentar-se com nome completo, orientador e instituição de origem/departamento  
**Duração no vídeo:** 30 segundos

#### Conteúdo:

**Cabeçalho:**

```
SIICUSP 2025 - Iniciação Científica
Escola Politécnica da Universidade de São Paulo
```

**Apresentação Principal:**

```
Marco Ruas
Engenharia de Software
Instituto de Tecnologia e Liderança - Inteli

ORIENTADORES:
• Prof. Dr. Reginaldo Arakaki
• Profa. Dra. Fabiana Martins Oliveira

Departamento de Engenharia de Computação
e Sistemas Digitais - EPUSP
```

#### Design:

- **Template:** Usar template oficial SIICUSP
- **Logos:** Inteli, EPUSP (com fonte identificada)
- **Foto:** Foto profissional do autor
- **Fonte:** "Fonte: Logos oficiais das instituições"

---

### SLIDE 2: ✓ TÍTULO E AUTORES

**Seção obrigatória:** Apresentar o título da pesquisa e os autores  
**Duração no vídeo:** 20 segundos

#### Conteúdo:

**Título Principal:**

```
Picos de Acessos Simultâneos trazem
Riscos para Negócios Digitais:

Como usar o Digital Twin no Controle
de Arquitetura de Sistemas
Codificados por IA
```

**Autores:**

```
Marco Ruas¹
Fabiana Martins Oliveira²
Reginaldo Arakaki²

¹Instituto de Tecnologia e Liderança - Inteli
²Escola Politécnica da Universidade de São Paulo - EPUSP
```

#### Design:

- **Template oficial SIICUSP**
- **Destaque visual** para palavras-chave: "Picos", "Digital Twin", "IA"

---

### SLIDE 3: ✓ MOTIVAÇÃO, IMPORTÂNCIA E OBJETIVOS

**Seção obrigatória:** Descrever a motivação, importância e objetivos da pesquisa  
**Duração no vídeo:** 1min 30s completos

#### Conteúdo:

**MOTIVAÇÃO:**

```
• Sistemas críticos apresentam padrões sazonais de demanda
• Picos de acessos simultâneos: fenômeno recorrente em domínios específicos
• Sistemas transacionais financeiros, plataformas governamentais,
  aplicações de comércio eletrônico
• Falhas arquiteturais resultam em indisponibilidade e perdas econômicas
• Necessidade de mecanismos de paralelismo e controle de concorrência
```

**IMPORTÂNCIA:**

```
• Fundamentos de Engenharia de Software (Arakaki, Hayashi, Ruggiero, 2020):
  Pilares arquiteturais devem suportar Requisitos Não Funcionais
• Limitação das ferramentas atuais de geração de código por IA:
  Prompts simplistas não capturam complexidade dos RNFs críticos
• Gap científico: ausência de métodos automatizados para
  avaliação arquitetural em tempo de execução
```

**OBJETIVOS:**

```
QUESTÃO DE PESQUISA:
"Como desenvolver gêmeos digitais para sistemas transacionais
críticos capazes de avaliar parâmetros arquiteturais durante
runtime e desenvolvimento, suportando cargas de acessos
simultâneos?"

OBJETIVO GERAL:
Propor uma arquitetura de gêmeo digital integrada para
monitoramento e análise comportamental de sistemas críticos
```

#### Design:

- **Layout:** Três seções bem definidas no mesmo slide
- **Ícones:** Sistemas críticos, alertas, objetivos
- **Fonte obrigatória:** "Fonte: Elaborado pelo autor baseado no resumo oficial"
- **Cores:** Azul (motivação), vermelho (importância), verde (objetivos)

---

### SLIDE 4: ✓ METODOLOGIA - ETAPA 1

**Seção obrigatória:** Breve descrição da metodologia empregada  
**Duração no vídeo:** Primeira parte dos 1min 20s

#### Conteúdo:

**Título:**

```
METODOLOGIA: Abordagem Experimental
```

**Etapa 1 - Desenvolvimento do Sistema Alvo:**

```
• Especificação formal de módulo transacional PIX
• Implementação de sistema de referência com:
  - Arquitetura baseada em camadas (Next.js)
  - Persistência relacional (PostgreSQL)
  - Containerização para isolamento (Docker)
• Instrumentação completa para rastreabilidade
• Registro estruturado de eventos de negócio
• Validação funcional do protótipo desenvolvido
```

#### Design:

- **Diagrama:** Arquitetura em camadas do sistema alvo
- **Fonte obrigatória:** "Fonte: Arquitetura desenvolvida pelo autor"
- **Elementos:** Separação clara de responsabilidades

---

### SLIDE 5: ✓ METODOLOGIA - ETAPA 2

**Seção obrigatória:** Continuação da metodologia  
**Duração no vídeo:** Segunda parte dos 1min 20s

#### Conteúdo:

**Etapa 2 - Arquitetura do Gêmeo Digital:**

```
• Implementação de arquitetura orientada a eventos
• Apache Kafka como middleware de mensageria distribuída
• Padrão Producer-Consumer para desacoplamento
• Sistema alvo atua como produtor de eventos comportamentais
• Gêmeo digital implementa padrões de observabilidade
• Processamento de Eventos Complexos (CEP) para análise temporal
```

**Modelo Conceitual:**

```
Sistema_Alvo → Stream_Eventos → Gêmeo_Digital
    ↓              ↓               ↓
Transações → Kafka_Topics → Análise_CEP
```

#### Design:

- **Diagrama formal:** Arquitetura orientada a eventos
- **Fonte:** "Fonte: Modelo conceitual desenvolvido pelo autor baseado em Fujii et al (2022)"
- **Elementos:** Fluxo de dados e componentes arquiteturais

---

### SLIDE 6: ✓ METODOLOGIA - ETAPA 3

**Seção obrigatória:** Finalização da metodologia  
**Duração no vídeo:** Terceira parte dos 1min 20s

#### Conteúdo:

**Etapa 3 - Integração com Modelos de Linguagem:**

```
• Desenvolvimento assistido por Large Language Models (LLMs)
• Instrumentação de código para rastreabilidade completa
• Implementação de sistema de auditoria baseado em logs estruturados
• Aplicação de técnicas de Processamento de Eventos Complexos
• Detecção de padrões comportamentais através de análise temporal
• Estabelecimento de métricas de Requisitos Não Funcionais
```

**Contribuição Metodológica:**

```
Integração de três paradigmas:
1. Desenvolvimento orientado por IA (LLM-driven)
2. Arquiteturas orientadas a eventos (Event-driven)
3. Gêmeos digitais para sistemas transacionais (Digital Twin)
```

#### Design:

- **Diagrama conceitual:** Integração dos três paradigmas
- **Fonte:** "Fonte: Framework metodológico desenvolvido pelo autor"
- **Elementos:** Interseção de metodologias

---

### SLIDE 7: ✓ RESULTADOS

**Seção obrigatória:** Síntese dos principais resultados obtidos  
**Duração no vídeo:** Primeira parte do 1min

#### Conteúdo:

**Título:**

```
RESULTADOS EXPERIMENTAIS
```

**Arquitetura Implementada:**

```
• Ecossistema de software funcional para análise arquitetural
• Aplicação de padrões de observabilidade distribuída
• Sistema de monitoramento baseado em stream processing
• Implementação bem-sucedida do paradigma Producer-Consumer
• Validação da arquitetura orientada a eventos proposta
```

**Métricas de Requisitos Não Funcionais:**

```
• VOLUMETRIA: Implementação de paginação e indexação otimizada
• CONCORRÊNCIA: Controle de acessos simultâneos via transações ACID
• RASTREABILIDADE: Sistema de auditoria com logs estruturados
• OBSERVABILIDADE: Monitoramento comportamental em tempo real
```

#### Design:

- **Tabela/Gráfico:** Métricas quantitativas dos RNFs
- **Fonte:** "Fonte: Resultados experimentais coletados pelo autor"
- **Elementos:** Dados de performance e observabilidade

---

### SLIDE 8: ✓ CONCLUSÕES

**Seção obrigatória:** Síntese das conclusões obtidas  
**Duração no vídeo:** Segunda parte do 1min

#### Conteúdo:

**Título:**

```
CONCLUSÕES E CONTRIBUIÇÕES CIENTÍFICAS
```

**Contribuições Teóricas:**

```
• Proposta de framework para gêmeos digitais em sistemas transacionais
• Integração de técnicas de CEP com arquiteturas orientadas a eventos
• Metodologia para instrumentação de sistemas desenvolvidos por LLMs
• Abordagem híbrida: avaliação runtime + desenvolvimento
```

**Análise Comparativa com Estado da Arte:**

```
ATAM (Kazman et al, 2000)         →    FRAMEWORK PROPOSTO
• Avaliação estática              →    Avaliação dinâmica runtime
• Análise por especialistas       →    Monitoramento automatizado
• Coleta manual de dados         →    Stream processing contínuo
• Detecção post-mortem           →    Prevenção proativa
```

**Relevância Científica:**

```
• Alinhamento com fluxos críticos de negócio
• Detecção precoce de inconsistências transacionais
• Prevenção de ataques e transações fraudulentas
• Base para futuras pesquisas em Digital Twin arquitetural
```

#### Design:

- **Quadro comparativo:** Framework vs Estado da Arte
- **Fonte:** "Fonte: Análise comparativa baseada em Kazman et al (2000) e Fujii et al (2022)"
