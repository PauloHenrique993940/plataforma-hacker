# 🚀 HACKER LABS - Build & Deploy Script (PowerShell)

Write-Host "╔═════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     HACKER LABS - Build & Deploy Tool       ║" -ForegroundColor Cyan
Write-Host "║     Plataforma de Segurança Ofensiva        ║" -ForegroundColor Cyan
Write-Host "╚═════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Função para imprimir mensagens
function Log-Info {
    param([string]$message)
    Write-Host "ℹ $message" -ForegroundColor Blue
}

function Log-Success {
    param([string]$message)
    Write-Host "✓ $message" -ForegroundColor Green
}

function Log-Error {
    param([string]$message)
    Write-Host "✗ $message" -ForegroundColor Red
}

# Menu principal
function Show-Menu {
    Write-Host ""
    Write-Host "Escolha uma opção:" -ForegroundColor Yellow
    Write-Host "1) Instalar dependências"
    Write-Host "2) Iniciar servidor de desenvolvimento"
    Write-Host "3) Build para produção"
    Write-Host "4) Preview do build"
    Write-Host "5) Executar linting"
    Write-Host "6) Limpar cache"
    Write-Host "7) Sair"
    Write-Host ""
    $option = Read-Host "Opção"
    return $option
}

# Instalação de dependências
function Install-Deps {
    Log-Info "Instalando dependências..."
    npm install
    if ($LASTEXITCODE -eq 0) {
        Log-Success "Dependências instaladas com sucesso!"
    } else {
        Log-Error "Erro ao instalar dependências"
        exit 1
    }
}

# Desenvolvimento
function Dev-Server {
    Log-Info "Iniciando servidor de desenvolvimento..."
    Log-Info "Abra http://localhost:5173 no seu navegador"
    npm run dev
}

# Build
function Build-Prod {
    Log-Info "Iniciando build para produção..."
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Log-Success "Build concluído com sucesso!"
        Log-Info "Arquivos em: ./dist"
    } else {
        Log-Error "Erro ao fazer build"
        exit 1
    }
}

# Preview
function Preview-Build {
    Log-Info "Iniciando preview do build..."
    Log-Info "Abra http://localhost:4173 no seu navegador"
    npm run preview
}

# Linting
function Run-Lint {
    Log-Info "Executando linting..."
    npm run lint
}

# Limpar cache
function Clean-Cache {
    Log-Info "Limpando cache..."
    
    if (Test-Path "node_modules") {
        Remove-Item -Recurse -Force "node_modules"
    }
    
    if (Test-Path "dist") {
        Remove-Item -Recurse -Force "dist"
    }
    
    if (Test-Path "package-lock.json") {
        Remove-Item "package-lock.json"
    }
    
    Log-Success "Cache limpo!"
}

# Loop principal
do {
    $option = Show-Menu
    
    switch ($option) {
        "1" { Install-Deps }
        "2" { Dev-Server }
        "3" { Build-Prod }
        "4" { Preview-Build }
        "5" { Run-Lint }
        "6" { Clean-Cache }
        "7" {
            Log-Info "Saindo..."
            exit 0
        }
        default {
            Log-Error "Opção inválida"
        }
    }
} while ($true)
