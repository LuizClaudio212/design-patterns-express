# Atividade de Design Patterns com Express.js e TypeScript

Este repositório contém as resoluções dos exercícios da atividade de Design Patterns, utilizando Express.js e TypeScript.
## Alunos:
Luiz Claudio Vieira da Silva Junior
Jose Gouveia
## Como Executar o Projeto

1.  Clone este repositório:
    ```bash
    git clone https://github.com/LuizClaudio212/design-patterns-express
    cd design-patterns-express
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Inicie o servidor em modo de desenvolvimento:
    ```bash
    npm run dev
    ```

4.  O servidor estará rodando em `http://localhost:3000`.

---

## Parte 1: Padrões Criacionais

### Exercício 1.1: Singleton

**Descrição do Problema:** Implementar um serviço de logging que seja acessível globalmente, garantindo uma única instância para manter a ordem e a centralização dos logs.
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Singleton**. A classe `LoggerService` foi implementada com um construtor privado, uma instância estática privada e um método `getInstance()` público. Isso garante que, não importa quantas vezes ou de quantos lugares (`server.ts`, `LoggerRoutes.ts`) o serviço seja solicitado, apenas uma instância é criada e compartilhada.
Isso resolve o problema de centralizar todos os logs em um único array.
**Endpoints da API:**
    * `GET /singleton/logs`: Consulta os logs mais recentes.
    * `GET /singleton/log-teste`: Adiciona logs de exemplo para teste.

### Exercício 1.2: Factory Method

**Descrição do Problema:** Criar um sistema flexível de envio de notificações que suporte múltiplos canais (Email, SMS, Push).
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Factory Method**. Foi criada uma interface `NotificationService`  (o "contrato") e implementações concretas (`EmailService`, `SmsService`, `PushService`). A `NotificationFactory` atua como a "fábrica", recebendo um tipo (ex: "email") e decidindo qual classe concreta instanciar. Isso desacopla o *controller* (API) dos serviços: o controller não sabe como um email é enviado, ele apenas pede à fábrica um objeto que *sabe* enviar, tornando o sistema fácil de estender no futuro (ex: adicionar "Whatsapp") sem modificar o controller.
**Endpoints da API:**
    * `POST /factory-method/send`: Envia uma notificação.
         **Body (JSON):** `{ "type": "email", "recipient": "...", "subject": "...", "content": "..." }`
        **Body (JSON):** `{ "type": "sms", "recipient": "...", "subject": "...", "content": "..." }`

##  Parte 2: Padrões Estruturais

### Exercício 2.1: Adapter

**Descrição do Problema:** Integrar um novo sistema de pagamento com uma API incompatível (`executePayment(request)`) a um sistema legado que espera uma interface antiga (`processPayment(id, amount)`).
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Adapter**. A classe `PaymentAdapter` implementa a interface legada `LegacyPaymentProcessor`, mas internamente "embrulha" uma instância do `NewPaymentSystem`. O método `processPayment` do adaptador traduz os parâmetros antigos (orderId, amount) para o novo formato (`PaymentRequest`), chama o novo sistema e traduz a resposta de volta, permitindo que o `PaymentService` (código antigo) funcione sem modificações.
* **Endpoints da API:**
    * `POST /adapter/process-payment`: Simula uma chamada do sistema legado.
        * **Body (JSON):** `{ "orderId": "...", "amount": 0.00 }`

### Exercício 2.2: Decorator

**Descrição do Problema:** Criar um serviço de exportação de dados (JSON, XML) que possa ter funcionalidades (compressão, criptografia) adicionadas dinamicamente.
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Decorator**. Foi criada uma interface `DataExporter` e classes concretas (`JsonExporter`). A classe `BaseDecorator` permite "empilhar" responsabilidades. Os decoradores concretos (`CompressionDecorator`, `EncryptionDecorator`) herdam dela e adicionam sua lógica *antes* ou *depois* de chamar o método do objeto que estão "embrulhando".A API permite que o cliente escolha quais decoradores aplicar em tempo de execução.
* **Endpoints da API:**
    * `POST /decorator/export`: Exporta dados aplicando os decoradores selecionados.
        * **Body (JSON):** `{ "format": "json", "decorators": ["compress", "encrypt"] }`

### Exercício 2.3: Facade

**Descrição do Problema:** Simplificar a interação com um conjunto complexo de microsserviços (Cliente, Produto, Pedido, Pagamento) para uma operação de "Fazer Pedido".
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Facade**. A classe `EcommerceFacade` atua como uma "fachada" ou ponto de entrada único. [cite_start]Ela esconde a complexidade de orquestrar os múltiplos subsistemas (`CustomerService`, `ProductService`, etc.). O controller da API só precisa chamar *um* método (`facade.placeOrder()`) que encapsula todo o fluxo complexo, desde verificar o cliente até processar o pagamento.
* **Endpoints da API:**
    * `POST /facade/place-order`: Executa o fluxo completo de um pedido.
        * **Body (JSON):** `{ "customerId": "...", "productIds": ["...", "..."] }`
---

### Parte 3: Padrões Comportamentais

### Exercício 3.1: Observer

**Descrição do Problema:** Implementar um sistema de monitoramento de ações onde múltiplos "observadores" (SMS, Email)  são notificados quando o preço de uma ação muda.
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Observer**. O `StockMarket`   foi implementado como um `EventEmitter` (o sistema de eventos nativo do Node.js ). As classes `SmsObserver` e `EmailObserver` se "inscrevem" (usando `stockMarket.on`) no evento `priceChange`. Quando a API chama `updateStockPrice`, o `StockMarket` emite o evento, e todos os observadores inscritos são notificados e executam sua lógica independentemente.
**Endpoints da API:**
    * `POST /observer/update-price`: Simula a mudança de preço de uma ação, notificando os observadores.
        * **Body (JSON):** `{ "symbol": "...", "price": 0.00 }`

### Exercício 3.2: Strategy

**Descrição do Problema:** Criar um sistema de cálculo de preços que suporte múltiplas estratégias de desconto (percentual, valor fixo) que possam ser trocadas.
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Strategy**. A interface `DiscountStrategy` define o contrato `applyDiscount(amount)`. Classes concretas (`PercentageStrategy`, `FixedValueStrategy`) implementam essa interface. O `PricingService` (Contexto) recebe uma estratégia em seu construtor e a utiliza para calcular o preço final. A API atua como o cliente, selecionando e instanciando a estratégia correta com base na requisição, tornando o `PricingService` independente das regras de desconto.
**Endpoints da API:**
    * `POST /strategy/calculate-price`: Calcula o preço final aplicando uma estratégia de desconto.
        * **Body (JSON):** `{ "amount": 100.0, "discountType": "percentage", "discountValue": 10 }`

### Exercício 3.3: Chain of Responsibility

**Descrição do Problema:** Implementar um pipeline para processamento de pedidos com múltiplas validações (estoque, fraude) onde cada etapa pode interromper o processo.
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Chain of Responsibility**. Uma classe abstrata `AbstractOrderHandler`  gerencia a referência ao "próximo" handler. Handlers concretos (`InventoryValidator`, `FraudDetector`) herdam dela e implementam o método `handle`. Dentro do `handle`, eles executam sua lógica. Se a lógica falhar (ex: estoque insuficiente), eles param e retornam a ordem; se for bem-sucedida, eles chamam `super.handle(order)`, passando a responsabilidade para o próximo handler na cadeia.
 **Endpoints da API:**
    * `POST /chain/process-order`: Submete um pedido para processamento pela cadeia de handlers.
        * **Body (JSON):** `{ "orderId": "...", "items": [{"productId": "...", "quantity": 0}] }`

### Exercício 3.4: Template Method

**Descrição do Problema:** Criar um sistema de processamento de pagamentos [cite: 69] que defina um fluxo padrão (validar, processar, notificar), mas permita que diferentes métodos (Cartão, PayPal)  ]implementem as etapas de forma diferente.
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Template Method**.A classe abstrata `AbstractPaymentProcessor` define o método `processPayment` (o "template method"). Este método dita o esqueleto do algoritmo, chamando na ordem correta os métodos `validate`, `executeProcessing` (abstratos) e `sendNotification` (concreto, opcional). As classes concretas (`CreditCardProcessor`, `PaypalProcessor`) herdam da classe abstrata e são forçadas a implementar as etapas abstratas, cada uma com sua lógica específica, sem poder alterar o fluxo geral.
 **Endpoints da API:**
    * `POST /template-method/process`: Processa um pagamento usando o fluxo do template method.
        * **Body (JSON) (Cartão):** `{ "method": "credit_card", "amount": 0.0, "cardDetails": { ... } }`
        * **Body (JSON) (PayPal):** `{ "method": "paypal", "amount": 0.0, "paypalEmail": "..." }`
