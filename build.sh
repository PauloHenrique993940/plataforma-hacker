#!/bin/bash

# 🚀 HACKER LABS - Build & Deploy Script

echo "╔═════════════════════════════════════════════╗"
echo "║     HACKER LABS - Build & Deploy Tool       ║"
echo "║     Plataforma de Segurança Ofensiva        ║"
echo "╚═════════════════════════════════════════════╝"
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para imprimir mensagens
log_info() {
    echo -e "${BLUE}ℹ ${1}${NC}"
}

log_success() {
    echo -e "${GREEN}✓ ${1}${NC}"
}

log_error() {
    echo -e "${RED}✗ ${1}${NC}"
}

# Menu principal
show_menu() {
    echo ""
    echo "Escolha uma opção:"
    echo "1) Instalar dependências"
    echo "2) Iniciar servidor de desenvolvimento"
    echo "3) Build para produção"
    echo "4) Preview do build"
    echo "5) Executar linting"
    echo "6) Limpar cache"
    echo "7) Sair"
    echo ""
    read -p "Opção: " option
}

# Instalação de dependências
install_deps() {
    log_info "Instalando dependências..."
    npm install
    if [ $? -eq 0 ]; then
        log_success "Dependências instaladas com sucesso!"
    else
        log_error "Erro ao instalar dependências"
        exit 1
    fi
}

# Desenvolvimento
dev_server() {
    log_info "Iniciando servidor de desenvolvimento..."
    log_info "Abra http://localhost:5173 no seu navegador"
    npm run dev
}

# Build
build_prod() {
    log_info "Iniciando build para produção..."
    npm run build
    if [ $? -eq 0 ]; then
        log_success "Build concluído com sucesso!"
        log_info "Arquivos em: ./dist"
    else
        log_error "Erro ao fazer build"
        exit 1
    fi
}

# Preview
preview_build() {
    log_info "Iniciando preview do build..."
    log_info "Abra http://localhost:4173 no seu navegador"
    npm run preview
}

# Linting
run_lint() {
    log_info "Executando linting..."
    npm run lint
}

# Limpar cache
clean_cache() {
    log_info "Limpando cache..."
    rm -rf node_modules
    rm -rf dist
    rm package-lock.json
    log_success "Cache limpo!"
}

# Loop principal
while true; do
    show_menu
    case $option in
        1)
            install_deps
            ;;
        2)
            dev_server
            ;;
        3)
            build_prod
            ;;
        4)
            preview_build
            ;;
        5)
            run_lint
            ;;
        6)
            clean_cache
            ;;
        7)
            log_info "Saindo..."
            exit 0
            ;;
        *)
            log_error "Opção inválida"
            ;;
    esac
done
