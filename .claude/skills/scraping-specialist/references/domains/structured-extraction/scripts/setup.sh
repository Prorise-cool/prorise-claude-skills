#!/bin/bash
# =============================================================
# Web Scraper Extractor — Prerequisites Setup Script
# Run this once before your first scraping session.
# Usage: bash setup.sh
# =============================================================

set -e
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${BOLD}🕷️  Web Scraper Extractor — Setup${NC}"
echo "============================================"
echo ""

# ── 1. Python 3 ──────────────────────────────────────────────
echo -e "${BOLD}[1/5] Checking Python 3...${NC}"
if command -v python3 &>/dev/null; then
    PY_VERSION=$(python3 --version)
    echo -e "${GREEN}✅ $PY_VERSION found${NC}"
else
    echo -e "${RED}❌ Python 3 not found.${NC}"
    echo "   Install it from https://www.python.org/downloads/"
    echo "   Or via Homebrew: brew install python"
    exit 1
fi

# ── 2. pip packages ──────────────────────────────────────────
echo ""
echo -e "${BOLD}[2/5] Installing Python packages...${NC}"

PACKAGES=("openpyxl" "pandas")

for pkg in "${PACKAGES[@]}"; do
    if python3 -c "import $pkg" &>/dev/null; then
        echo -e "${GREEN}✅ $pkg already installed${NC}"
    else
        echo -e "${YELLOW}⬇️  Installing $pkg...${NC}"
        pip3 install "$pkg" --quiet
        echo -e "${GREEN}✅ $pkg installed${NC}"
    fi
done

# ── 3. Node.js (for Playwright) ───────────────────────────────
echo ""
echo -e "${BOLD}[3/5] Checking Node.js (required for Playwright MCP)...${NC}"
if command -v node &>/dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js $NODE_VERSION found${NC}"
else
    echo -e "${YELLOW}⚠️  Node.js not found.${NC}"
    echo "   Install it from https://nodejs.org/ (LTS version recommended)"
    echo "   Or via Homebrew: brew install node"
    echo ""
    echo "   ⚠️  Node.js is required for the Playwright MCP server."
    echo "   The skill will not work without it."
fi

# ── 4. Playwright MCP server ─────────────────────────────────
echo ""
echo -e "${BOLD}[4/5] Checking Playwright MCP server...${NC}"
if command -v npx &>/dev/null; then
    # Check if @playwright/mcp is available
    if npx --yes @playwright/mcp --version &>/dev/null 2>&1; then
        echo -e "${GREEN}✅ Playwright MCP server available${NC}"
    else
        echo -e "${YELLOW}⬇️  Installing Playwright MCP server...${NC}"
        npm install -g @playwright/mcp 2>/dev/null || npx @playwright/mcp --version &>/dev/null
        echo -e "${GREEN}✅ Playwright MCP server ready${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  npx not available — skipping Playwright MCP check.${NC}"
    echo "   Install Node.js first, then re-run this script."
fi

# ── 5. Claude Code MCP config check ─────────────────────────
echo ""
echo -e "${BOLD}[5/5] Checking Claude Code MCP configuration...${NC}"
MCP_CONFIG="$HOME/.claude/claude_desktop_config.json"
if [ -f "$MCP_CONFIG" ]; then
    if grep -q "playwright" "$MCP_CONFIG" 2>/dev/null; then
        echo -e "${GREEN}✅ Playwright MCP already configured in Claude Code${NC}"
    else
        echo -e "${YELLOW}⚠️  Playwright not found in $MCP_CONFIG${NC}"
        echo ""
        echo "   Add this to your Claude Code MCP config:"
        echo '   ─────────────────────────────────────────'
        echo '   {
     "mcpServers": {
       "playwright": {
         "command": "npx",
         "args": ["@playwright/mcp"]
       }
     }
   }'
        echo '   ─────────────────────────────────────────'
        echo ""
        echo "   Config file location: $MCP_CONFIG"
        echo "   Or run: claude mcp add playwright -- npx @playwright/mcp"
    fi
else
    echo -e "${YELLOW}⚠️  No Claude config found at $MCP_CONFIG${NC}"
    echo ""
    echo "   To add Playwright MCP to Claude Code, run:"
    echo -e "   ${BOLD}claude mcp add playwright -- npx @playwright/mcp${NC}"
    echo ""
    echo "   Then restart Claude Code."
fi

# ── Done ─────────────────────────────────────────────────────
echo ""
echo "============================================"
echo -e "${GREEN}${BOLD}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Make sure Playwright MCP is enabled in Claude Code"
echo "     (run: claude mcp add playwright -- npx @playwright/mcp)"
echo "  2. Restart Claude Code"
echo "  3. Start a new session and say:"
echo '     "Extract contacts from <URL> into a CSV"'
echo ""
