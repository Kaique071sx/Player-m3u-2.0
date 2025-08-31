from flask import Flask, render_template, request, redirect, url_for, flash
import re
import os

app = Flask(__name__)
app.secret_key = 'sua-chave-secreta-pode-ser-qualquer-coisa'

# Define o caminho para a pasta que armazenará as listas .m3u
LISTAS_FOLDER = os.path.join(app.static_folder, 'listas')
ALLOWED_EXTENSIONS = {'m3u'}

# Garante que a pasta de listas exista ao iniciar
os.makedirs(LISTAS_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def parse_m3u(filepath):
    """Lê um arquivo .m3u e extrai os episódios."""
    if not os.path.exists(filepath):
        return []
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    matches = re.findall(r'#EXTINF:-1,(.*?)\n(.*?)\n', content)
    episodes = []
    for i, (title, url) in enumerate(matches):
        episodes.append({'id': i, 'title': title.strip(), 'url': url.strip()})
    return episodes

@app.route('/')
def index():
    """Página principal que agora mostra a lista de arquivos .m3u disponíveis."""
    # Lista todos os arquivos na pasta de listas
    try:
        files = [f for f in os.listdir(LISTAS_FOLDER) if f.endswith('.m3u')]
    except FileNotFoundError:
        files = []
    
    # Remove a extensão .m3u para mostrar nomes mais limpos
    available_lists = [os.path.splitext(f)[0] for f in files]
    
    return render_template('index.html', available_lists=available_lists)

@app.route('/player/<list_name>')
def player(list_name):
    """Página do player que carrega uma lista específica."""
    # Adiciona a extensão .m3u de volta ao nome do arquivo
    m3u_filename = f"{list_name}.m3u"
    m3u_path = os.path.join(LISTAS_FOLDER, m3u_filename)
    
    episode_list = parse_m3u(m3u_path)
    
    return render_template('player.html', episodes=episode_list, list_title=list_name)

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    """Página e lógica de upload em uma única rota."""
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('Nenhum arquivo enviado')
            return redirect(request.url)
        
        file = request.files['file']
        
        if file.filename == '':
            flash('Nenhum arquivo selecionado')
            return redirect(request.url)
        
        if file and allowed_file(file.filename):
            # Mantém o nome original do arquivo
            filename = file.filename
            # Salva o arquivo na pasta de listas
            file.save(os.path.join(LISTAS_FOLDER, filename))
            flash(f'Lista "{filename}" carregada com sucesso!')
            # Redireciona para a página principal para ver a nova lista
            return redirect(url_for('index'))
        else:
            flash('Tipo de arquivo não permitido! Por favor, envie um arquivo .m3u')
            return redirect(request.url)
            
    # Se for um GET, apenas mostra a página de upload
    return render_template('upload.html')
