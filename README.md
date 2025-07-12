Player M3U 2.0 - Guia de Instalação para Termux 📱
Este é um guia completo para baixar, instalar e executar o projeto "Player M3U 2.0" a partir do GitHub em um ambiente Termux.

⚠️ Correção Importante da Estrutura
O repositório do GitHub precisa de uma pequena organização para que o Flask funcione. Os passos abaixo já incluem os comandos para criar as pastas templates e static e mover os arquivos para os lugares corretos.

Pré-requisitos
Antes de começar, você precisa ter o Termux instalado no seu Android.

Passo a Passo da Instalação
Abra o Termux e execute os comandos abaixo, um de cada vez, na ordem em que aparecem.

1. Atualizar Pacotes do Termux

Garante que seu ambiente esteja atualizado para evitar erros.
bash     pkg update && pkg upgrade -y     

2. Instalar Dependências Base (Git e Python)

git é necessário para baixar o projeto do GitHub.

python é necessário para executar o aplicativo.
bash     pkg install git python -y     

3. Baixar (Clonar) seu Projeto do GitHub

Este comando vai baixar todos os arquivos do seu repositório para uma nova pasta chamada Player-m3u-2.0.
bash     git clone https://github.com/Kaique071sx/Player-m3u-2.0.git     

4. Entrar na Pasta do Projeto

Todos os próximos comandos devem ser executados de dentro desta pasta.
bash     cd Player-m3u-2.0     

5. Corrigir a Estrutura de Pastas

Este é o passo crucial que cria as pastas templates e static e move os arquivos para seus devidos lugares.
```bash
# Cria as pastas necessárias
mkdir templates
mkdir static

# Move os arquivos HTML para a pasta 'templates'
mv index.html player.html upload.html templates/

# Move os arquivos de estilo e script para a pasta 'static'
mv style.css player.js static/
```
6. Criar o Arquivo de Dependências do Python

Seu projeto precisa do Flask para funcionar. Este comando cria o arquivo requirements.txt que lista essa necessidade.
bash     echo "Flask" > requirements.txt     

7. Instalar as Dependências do Python

Este comando lê o arquivo requirements.txt e instala o Flask.
bash     pip install -r requirements.txt     

Como Executar o Aplicativo
Com tudo instalado e organizado, basta iniciar o servidor Flask:

Bash

python app.py
Você verá uma saída no terminal indicando que o servidor está rodando, algo como:
* Running on http://0.0.0.0:5000

Como Acessar
Abra o navegador no seu celular (Chrome, Firefox, etc.).

Digite o seguinte endereço na barra de URL:

http://localhost:5000
Seu aplicativo estará funcionando!

Resumo Rápido (Todos os Comandos em Ordem)
Para referência futura, aqui está a sequência completa de comandos para uma instalação do zero:

Bash

pkg update && pkg upgrade -y
pkg install git python -y
git clone https://github.com/Kaique071sx/Player-m3u-2.0.git
cd Player-m3u-2.0
mkdir templates
mkdir static
mv index.html player.html upload.html templates/
mv style.css player.js static/
echo "Flask" > requirements.txt
pip install -r requirements.txt
python app.py

