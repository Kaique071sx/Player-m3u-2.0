# Meu Netflix Local 📺

Um aplicativo web de streaming pessoal, com uma interface inspirada na Netflix, para rodar localmente em seu dispositivo Android via Termux. Gerencie e assista suas próprias listas de reprodução `.m3u` de forma fácil e elegante.

![Screenshot do Player](https://i.imgur.com/E1rO1lb.png)
*(Você pode substituir o link acima pelo URL de uma screenshot real do seu app)*

---

### 🚀 Sobre o Projeto

Este projeto nasceu da ideia de criar um servidor de streaming leve, portátil e pessoal. Em vez de depender de serviços de terceiros, o **Meu Netflix Local** permite que você seja o dono do seu próprio catálogo.

O funcionamento é simples e poderoso:

-   **📱 Hospedagem Local:** Tudo roda diretamente no seu celular através do **Termux**, sem a necessidade de um servidor externo.
-   **📝 Baseado em Listas:** O coração do sistema são os arquivos de lista de reprodução `.m3u`. Você pode criar ou baixar essas listas da internet.
-   **🎬 Interface Intuitiva:** A aplicação oferece um menu principal para gerenciar suas listas e uma tela de player focada na experiência de assistir, com uma lista de episódios horizontal e interativa.
-   **✨ Fácil Atualização:** Cansou de uma lista ou quer adicionar uma nova? Basta usar a página de upload integrada para enviar um novo arquivo `.m3u`, e seu catálogo é atualizado instantaneamente.

---

### ✨ Principais Funcionalidades

-   **Interface Inspirada na Netflix:** Design escuro, moderno e responsivo para uma experiência de usuário familiar e agradável.
-   **Gerenciamento de Múltiplas Listas:** Organize seus vídeos em diferentes arquivos `.m3u` (ex: "Animes", "Séries", "Filmes") e escolha qual assistir no menu principal.
-   **Upload de Listas via Web:** Adicione novas listas de reprodução diretamente pelo navegador, sem precisar mexer em arquivos pelo terminal.
-   **Player de Vídeo Integrado:** Suporte para streaming de `.m3u8` com HLS.js, garantindo compatibilidade e performance.
-   **Atualização Dinâmica:** O título do episódio é exibido e a lista de episódios destaca o que está ativo no momento.
-   **Leve e Portátil:** Construído com Flask (Python), é extremamente leve e ideal para o ambiente limitado do Termux.

---

### 🛠️ Tecnologias Utilizadas

-   **Backend:** Python 3, Flask
-   **Frontend:** HTML5, CSS3, JavaScript
-   **Streaming:** HLS.js
-   **Ambiente de Execução:** Termux (Android)

---

### ⚙️ Instalação e Execução

Siga os passos abaixo em ordem para configurar e rodar o projeto no seu Termux.

**1. Preparar o Ambiente Termux**

Primeiro, atualize os pacotes do Termux e instale as dependências essenciais.

```bash
pkg update && pkg upgrade -y
pkg install python nano -y
```

**2. Instalar a Biblioteca Flask**

Use o `pip`, o gerenciador de pacotes do Python, para instalar o Flask.

```bash
pip install Flask
```

**3. Criar os Arquivos do Projeto**

Crie a estrutura de pastas e todos os arquivos (`app.py`, `style.css`, `player.js`, etc.) conforme os códigos que desenvolvemos.

**4. Executar o Servidor**

Com tudo pronto, navegue até a pasta do projeto e inicie o servidor Flask.

```bash
# Navegue até a pasta do projeto (se não estiver nela)
cd /path/to/meu-netflix

# Inicie o servidor
python app.py
```

**5. Acessar o Aplicativo**

Abra o navegador no seu celular e acesse o seguinte endereço:

```
http://localhost:5000
```

---

### ▶️ Como Usar

1.  Ao abrir o app pela primeira vez, você verá a tela **"Minhas Listas de Reprodução"**.
2.  Clique no botão **"Carregar Nova Lista"** para ir à página de upload.
3.  Selecione um arquivo `.m3u` do seu dispositivo e clique em **"Enviar e Atualizar Lista"**.
4.  Você será redirecionado para o menu principal, onde sua nova lista aparecerá como um "card".
5.  Clique no card da lista que deseja assistir.
6.  Você será levado à tela do player, onde poderá selecionar e assistir aos episódios.

---

### 📁 Estrutura de Arquivos

```
meu-netflix/
├── app.py              # O servidor Flask (cérebro do app)
├── README.md           # Este arquivo
├── static/
│   ├── style.css       # Folha de estilos principal
│   ├── player.js       # Lógica do player de vídeo
│   └── listas/
│       └── (Suas listas .m3u salvas ficam aqui)
└── templates/
    ├── index.html      # O menu principal de seleção de listas
    ├── player.html     # A tela do player de vídeo
    └── upload.html     # A página de upload de arquivos
```

---
Este projeto está licenciado sob a Licença MIT.

