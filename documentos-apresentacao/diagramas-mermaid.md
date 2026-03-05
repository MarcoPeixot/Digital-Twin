# Diagramas Mermaid - Sistema PIX com Gêmeo Digital

## DIAGRAMA 1: Arquitetura Conceitual Geral (Para Slide 3)

```mermaid
graph TB
    subgraph "ECOSSISTEMA DE ANÁLISE ARQUITETURAL"
        subgraph "SISTEMA ALVO"
            A[Sistema PIX<br/>Next.js + PostgreSQL]
            B[APIs REST]
            C[Interface Usuário]
            D[Banco de Dados<br/>Prisma ORM]
        end

        subgraph "EVENT STREAMING"
            E[Apache Kafka<br/>Message Broker]
            F[Topics:<br/>• user-events<br/>• pix-transfers<br/>• audit-logs]
        end

        subgraph "GÊMEO DIGITAL"
            G[CEP Processor<br/>Complex Event Processing]
            H[Pattern Detection]
            I[Anomaly Analysis]
            J[RNF Monitoring]
        end

        subgraph "OBSERVABILIDADE"
            K[Logs Estruturados<br/>Pino Logger]
            L[Auditoria<br/>AuditLog Table]
            M[Métricas RNF]
        end
    end

    A -->|Publica Eventos| E
    B -->|Transações| D
    C -->|Interações| B
    E -->|Stream Events| G
    G --> H
    G --> I
    G --> J
    A --> K
    A --> L
    H --> M
    I --> M
    J --> M

    classDef sistema fill:#2563EB,stroke:#1e40af,stroke-width:2px,color:#ffffff
    classDef kafka fill:#EA580C,stroke:#c2410c,stroke-width:2px,color:#ffffff
    classDef gemeo fill:#16A34A,stroke:#15803d,stroke-width:2px,color:#ffffff
    classDef observ fill:#6B7280,stroke:#4b5563,stroke-width:2px,color:#ffffff

    class A,B,C,D sistema
    class E,F kafka
    class G,H,I,J gemeo
    class K,L,M observ
```

## DIAGRAMA 2: Arquitetura Detalhada em Camadas (Para Slide 5)

```mermaid
graph TB
    subgraph "CAMADA DE APRESENTAÇÃO"
        A1[Login Page<br/>React Component]
        A2[Dashboard<br/>Balance + Transactions]
        A3[Transfer PIX<br/>Form Component]
        A4[Extract View<br/>Transaction History]
    end

    subgraph "CAMADA DE NEGÓCIO - Next.js API Routes"
        B1["/api/auth/[...nextauth]<br/>NextAuth.js"]
        B2["/api/account/balance<br/>Consulta Saldo"]
        B3["/api/account/transactions<br/>Extrato"]
        B4["/api/transfer/pix<br/>Transferência PIX"]
        B5["/api/register<br/>Cadastro Usuário"]

        subgraph "EVENT PUBLISHER"
            EP[Kafka Producer<br/>publishCepEvent()]
        end
    end

    subgraph "MIDDLEWARE"
        C1[Apache Kafka Cluster]
        C2[Topics:<br/>• user-login<br/>• pix-transfer<br/>• account-balance<br/>• audit-events]
    end

    subgraph "CAMADA DE DADOS"
        subgraph "PostgreSQL Database"
            D1[User<br/>CPF, Email, Password]
            D2[Account<br/>Balance, User Relation]
            D3[Transaction<br/>Amount, Sender, Receiver]
            D4[AuditLog<br/>Action, Entity, Details]
        end

        subgraph "ORM"
            D5[Prisma Client<br/>Type-safe Database Access]
        end
    end

    subgraph "GÊMEO DIGITAL - CEP PROCESSOR"
        E1[Kafka Consumer<br/>Event Listener]
        E2[Pattern Detection<br/>High Value Transfers]
        E3[Time Window Analysis<br/>Suspicious Behavior]
        E4[Alert System<br/>Anomaly Notification]
    end

    A1 --> B1
    A2 --> B2
    A2 --> B3
    A3 --> B4
    A4 --> B3
    B5 --> EP

    B1 --> D5
    B2 --> D5
    B3 --> D5
    B4 --> D5
    B4 --> EP
    B5 --> D5

    D5 --> D1
    D5 --> D2
    D5 --> D3
    D5 --> D4

    EP --> C1
    C1 --> C2
    C2 --> E1
    E1 --> E2
    E1 --> E3
    E2 --> E4
    E3 --> E4

    classDef frontend fill:#3B82F6,stroke:#2563EB,stroke-width:2px,color:#ffffff
    classDef api fill:#8B5CF6,stroke:#7C3AED,stroke-width:2px,color:#ffffff
    classDef kafka fill:#EA580C,stroke:#c2410c,stroke-width:2px,color:#ffffff
    classDef database fill:#10B981,stroke:#059669,stroke-width:2px,color:#ffffff
    classDef cep fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#ffffff

    class A1,A2,A3,A4 frontend
    class B1,B2,B3,B4,B5,EP api
    class C1,C2 kafka
    class D1,D2,D3,D4,D5 database
    class E1,E2,E3,E4 cep
```

## DIAGRAMA 3: Fluxo de Eventos CEP (Para Slide 6)

```mermaid
sequenceDiagram
    participant U as Usuário
    participant API as Next.js API
    participant DB as PostgreSQL
    participant K as Kafka Broker
    participant CEP as CEP Processor
    participant A as Alert System

    Note over U,A: Fluxo de Transferência PIX com Monitoramento

    U->>API: POST /api/transfer/pix
    Note right of API: {receiverCpf, amount}

    API->>DB: Iniciar Transação ACID
    DB-->>API: Validar contas e saldo

    rect rgb(255, 245, 235)
        Note over API,DB: Transação Atômica
        API->>DB: Debitar conta origem
        API->>DB: Creditar conta destino
        API->>DB: Criar Transaction record
        API->>DB: Criar AuditLog entry
    end

    API->>K: Publicar CepEvent
    Note right of K: Topic: pix-transfer<br/>{type: PIX_TRANSFER_SUCCESS,<br/>userId, amount, timestamp}

    K->>CEP: Consumir evento

    rect rgb(240, 253, 244)
        Note over CEP: Análise de Padrões
        CEP->>CEP: Verificar valor > R$ 1000
        CEP->>CEP: Analisar janela temporal (60s)
        CEP->>CEP: Contar transferências por usuário
    end

    alt Padrão suspeito detectado
        CEP->>A: Gerar alerta
        A-->>API: Notificar sistema
        Note right of A: Anomalia: 3+ transferências<br/>alto valor em 1 minuto
    else Comportamento normal
        Note over CEP: Continuar monitoramento
    end

    API-->>U: Resposta de sucesso
```

## DIAGRAMA 4: Arquitetura de RNFs (Para Slide 7)

```mermaid
graph TB
    subgraph "REQUISITOS NÃO FUNCIONAIS IMPLEMENTADOS"
        subgraph "VOLUMETRIA"
            V1[Paginação Otimizada<br/>Limite por página]
            V2[Indexação PostgreSQL<br/>sender/receiver AccountId]
            V3[Query Optimization<br/>Prisma ORM]
        end

        subgraph "CONCORRÊNCIA"
            C1[Transações ACID<br/>prisma.$transaction]
            C2[Connection Pooling<br/>PostgreSQL Pool]
            C3[Concurrent Access Control<br/>Database Locks]
        end

        subgraph "RASTREABILIDADE"
            R1[Event Sourcing<br/>Kafka Topics]
            R2[Structured Logging<br/>Pino Logger]
            R3[Audit Trail<br/>AuditLog Table]
            R4[Correlation IDs<br/>Request Tracing]
        end

        subgraph "OBSERVABILIDADE"
            O1[Real-time Monitoring<br/>CEP Events]
            O2[Pattern Detection<br/>Behavioral Analysis]
            O3[Anomaly Alerts<br/>Suspicious Activity]
            O4[Performance Metrics<br/>Response Time, Throughput]
        end
    end

    subgraph "GÊMEO DIGITAL - ANÁLISE INTEGRADA"
        GD[Complex Event Processing<br/>Stream Analytics]

        subgraph "ANÁLISES REALIZADAS"
            A1[Análise Temporal<br/>Time Window Patterns]
            A2[Análise Comportamental<br/>User Activity Patterns]
            A3[Análise de Risco<br/>High Value Transfers]
            A4[Análise de Performance<br/>System Load Patterns]
        end
    end

    V1 --> GD
    V2 --> GD
    V3 --> GD
    C1 --> GD
    C2 --> GD
    C3 --> GD
    R1 --> GD
    R2 --> GD
    R3 --> GD
    R4 --> GD
    O1 --> GD
    O2 --> GD
    O3 --> GD
    O4 --> GD

    GD --> A1
    GD --> A2
    GD --> A3
    GD --> A4

    classDef volume fill:#3B82F6,stroke:#2563EB,stroke-width:2px,color:#ffffff
    classDef concor fill:#8B5CF6,stroke:#7C3AED,stroke-width:2px,color:#ffffff
    classDef rastrea fill:#10B981,stroke:#059669,stroke-width:2px,color:#ffffff
    classDef observ fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#ffffff
    classDef gemeo fill:#EF4444,stroke:#DC2626,stroke-width:2px,color:#ffffff
    classDef analise fill:#6B7280,stroke:#4B5563,stroke-width:2px,color:#ffffff

    class V1,V2,V3 volume
    class C1,C2,C3 concor
    class R1,R2,R3,R4 rastrea
    class O1,O2,O3,O4 observ
    class GD gemeo
    class A1,A2,A3,A4 analise
```

## DIAGRAMA 5: Integração LLM + Desenvolvimento (Para Slide 6 - Metodologia)

```mermaid
graph LR
    subgraph "DESENVOLVIMENTO ASSISTIDO POR IA"
        subgraph "LLM INTEGRATION"
            L1[GitHub Copilot<br/>Code Generation]
            L2[GPT-4 Integration<br/>Architecture Design]
            L3[Prompt Engineering<br/>RNF Requirements]
        end

        subgraph "CODE GENERATION"
            CG1[API Routes Generation<br/>TypeScript + Next.js]
            CG2[Database Schema<br/>Prisma Models]
            CG3[Event Structures<br/>Kafka Integration]
            CG4[Component Generation<br/>React UI]
        end

        subgraph "INSTRUMENTAÇÃO AUTOMÁTICA"
            I1[Logger Integration<br/>Pino Structured Logs]
            I2[Event Publishing<br/>Kafka Producer Calls]
            I3[Audit Trail Creation<br/>AuditLog Entries]
            I4[Error Handling<br/>Try-Catch Blocks]
        end

        subgraph "QUALITY ASSURANCE"
            Q1[Type Safety<br/>TypeScript Validation]
            Q2[Code Review<br/>AI-Assisted Analysis]
            Q3[Testing Generation<br/>Unit Test Creation]
            Q4[Documentation<br/>Auto-generated Docs]
        end
    end

    subgraph "SISTEMA GERADO"
        S1[Sistema PIX<br/>Fully Instrumented]
        S2[Event-Driven Architecture<br/>Kafka Integration]
        S3[Monitoring Ready<br/>Observability Built-in]
    end

    L1 --> CG1
    L1 --> CG2
    L2 --> CG3
    L3 --> CG4

    CG1 --> I1
    CG1 --> I2
    CG2 --> I3
    CG3 --> I4
    CG4 --> I1

    I1 --> Q1
    I2 --> Q2
    I3 --> Q3
    I4 --> Q4

    Q1 --> S1
    Q2 --> S1
    Q3 --> S2
    Q4 --> S3

    classDef llm fill:#9333EA,stroke:#7C3AED,stroke-width:2px,color:#ffffff
    classDef codegen fill:#3B82F6,stroke:#2563EB,stroke-width:2px,color:#ffffff
    classDef instru fill:#10B981,stroke:#059669,stroke-width:2px,color:#ffffff
    classDef quality fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#ffffff
    classDef sistema fill:#EF4444,stroke:#DC2626,stroke-width:2px,color:#ffffff

    class L1,L2,L3 llm
    class CG1,CG2,CG3,CG4 codegen
    class I1,I2,I3,I4 instru
    class Q1,Q2,Q3,Q4 quality
    class S1,S2,S3 sistema
```

## DIAGRAMA 6: Comparação ATAM vs Gêmeo Digital (Para Slide 8)

```mermaid
graph TB
    subgraph "MÉTODO TRADICIONAL - ATAM"
        subgraph "PROCESSO ATAM"
            A1[Coleta Manual<br/>Stakeholder Interviews]
            A2[Análise Estática<br/>Architecture Documentation]
            A3[Cenários de Qualidade<br/>Expert Definition]
            A4[Trade-off Analysis<br/>Specialist Review]
            A5[Relatório Final<br/>Risk Assessment]
        end

        subgraph "LIMITAÇÕES"
            AL1[Avaliação Offline<br/>Post-Development]
            AL2[Análise Pontual<br/>Snapshot in Time]
            AL3[Dependente de Especialistas<br/>Manual Process]
            AL4[Detecção Tardia<br/>Reactive Approach]
        end
    end

    subgraph "ABORDAGEM PROPOSTA - GÊMEO DIGITAL"
        subgraph "PROCESSO DIGITAL TWIN"
            D1[Coleta Automatizada<br/>Event Streaming]
            D2[Análise Dinâmica<br/>Runtime Monitoring]
            D3[Padrões Emergentes<br/>AI-Driven Detection]
            D4[Análise Contínua<br/>Real-time Processing]
            D5[Alertas Proativos<br/>Predictive Insights]
        end

        subgraph "VANTAGENS"
            DV1[Monitoramento Runtime<br/>Continuous Analysis]
            DV2[Análise Temporal<br/>Historical Patterns]
            DV3[Automatização Completa<br/>AI-Powered Process]
            DV4[Prevenção Proativa<br/>Predictive Approach]
        end
    end

    A1 --> A2
    A2 --> A3
    A3 --> A4
    A4 --> A5

    D1 --> D2
    D2 --> D3
    D3 --> D4
    D4 --> D5

    A1 -.->|Evolução| D1
    A2 -.->|Evolução| D2
    A3 -.->|Evolução| D3
    A4 -.->|Evolução| D4
    A5 -.->|Evolução| D5

    classDef atam fill:#DC2626,stroke:#B91C1C,stroke-width:2px,color:#ffffff
    classDef limits fill:#FCA5A5,stroke:#DC2626,stroke-width:1px,color:#000000
    classDef digital fill:#059669,stroke:#047857,stroke-width:2px,color:#ffffff
    classDef advant fill:#86EFAC,stroke:#059669,stroke-width:1px,color:#000000

    class A1,A2,A3,A4,A5 atam
    class AL1,AL2,AL3,AL4 limits
    class D1,D2,D3,D4,D5 digital
    class DV1,DV2,DV3,DV4 advant
```

---

## INSTRUÇÕES DE USO:

### Para gerar as imagens:

1. **Copie cada código Mermaid**
2. **Cole em ferramentas online:**
   - [Mermaid Live Editor](https://mermaid.live/)
   - [Draw.io](https://app.diagrams.net/) (suporta Mermaid)
   - VS Code com extensão Mermaid Preview

### Para cada slide:

- **Slide 3:** Diagrama 1 (Conceitual)
- **Slide 5:** Diagrama 2 (Camadas Detalhadas)
- **Slide 6:** Diagrama 3 (Fluxo CEP) + Diagrama 5 (LLM Integration)
- **Slide 7:** Diagrama 4 (RNFs)
- **Slide 8:** Diagrama 6 (Comparação ATAM)

### Fontes obrigatórias:

- "Fonte: Arquitetura desenvolvida pelo autor baseada no sistema implementado"
- "Fonte: Fluxo de eventos elaborado pelo autor"
- "Fonte: Framework metodológico proposto pelo autor"
- "Fonte: Análise comparativa elaborada pelo autor baseada em Kazman et al (2000)"
