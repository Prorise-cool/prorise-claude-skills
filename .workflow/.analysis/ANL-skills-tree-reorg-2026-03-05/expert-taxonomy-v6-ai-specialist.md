# Expert Taxonomy V6 - AI Specialist Extraction

## Current Answer

Yes, AI-related skills/resources already exist, but are scattered.

Confirmed AI-relevant assets:

- Top-level skills:
  - `mcp-builder`
  - `prompt-enhancer`
  - `skill-tuning` (AI-assisted diagnosis workflow)
- References:
  - `backend-specialist/references/engineering_backend_ai-engineer.md`
  - `data-specialist/references/cursor_rules_{openai,langchain,langchain-js,llamaindex-js,vllm,smolagents,crewai}.md`
  - `mcp-builder/reference/{mcp_best_practices,python_mcp_server,node_mcp_server,evaluation}.md`
  - `documentation-specialist/references/deployment_prompt-engineer.md`

---

## Why There Was No AI Expert Before

- Existing taxonomy focused on engineering function domains (backend/data/product), not AI capability domains.
- AI content was embedded as sub-modules in backend/data/product.

This causes fragmented discoverability and weak AI entry points.

---

## New Top-Level Expert (Proposed)

- `ai-specialist` (new top-level expert)

Structure (aligned to SKILL_WRITING_GUIDE):

```text
.claude/skills/ai-specialist/
├── SKILL.md
├── references/
│   └── domains/
│       ├── mcp-server-engineering/
│       ├── prompt-engineering/
│       ├── ai-application-engineering/
│       ├── model-platforms/
│       └── agent-frameworks/
├── scripts/    (optional)
└── assets/     (optional)
```

---

## Precise Extraction Mapping

### Top-Level Skill Reclassification

| Source | Action | Target |
|---|---|---|
| `mcp-builder` | merge | `ai-specialist/references/domains/mcp-server-engineering/mcp-builder/` |
| `prompt-enhancer` | merge | `ai-specialist/references/domains/prompt-engineering/prompt-enhancer/` |
| `skill-tuning` | keep in `skill-engineering-specialist` by default | (optional dual-link from AI specialist) |

### File-Level AI Resource Extraction

| Source File | Target File |
|---|---|
| `backend-specialist/references/engineering_backend_ai-engineer.md` | `ai-specialist/references/domains/ai-application-engineering/ai-engineer.md` |
| `data-specialist/references/cursor_rules_openai.md` | `ai-specialist/references/domains/model-platforms/openai.md` |
| `data-specialist/references/cursor_rules_vllm.md` | `ai-specialist/references/domains/model-platforms/vllm.md` |
| `data-specialist/references/cursor_rules_langchain.md` | `ai-specialist/references/domains/agent-frameworks/langchain.md` |
| `data-specialist/references/cursor_rules_langchain-js.md` | `ai-specialist/references/domains/agent-frameworks/langchain-js.md` |
| `data-specialist/references/cursor_rules_llamaindex-js.md` | `ai-specialist/references/domains/agent-frameworks/llamaindex-js.md` |
| `data-specialist/references/cursor_rules_smolagents.md` | `ai-specialist/references/domains/agent-frameworks/smolagents.md` |
| `data-specialist/references/cursor_rules_crewai.md` | `ai-specialist/references/domains/agent-frameworks/crewai.md` |
| `mcp-builder/reference/mcp_best_practices.md` | `ai-specialist/references/domains/mcp-server-engineering/mcp_best_practices.md` |
| `mcp-builder/reference/python_mcp_server.md` | `ai-specialist/references/domains/mcp-server-engineering/python_mcp_server.md` |
| `mcp-builder/reference/node_mcp_server.md` | `ai-specialist/references/domains/mcp-server-engineering/node_mcp_server.md` |
| `mcp-builder/reference/evaluation.md` | `ai-specialist/references/domains/mcp-server-engineering/evaluation.md` |
| `documentation-specialist/references/deployment_prompt-engineer.md` | `ai-specialist/references/domains/prompt-engineering/deployment-prompt-engineer.md` |

---

## Condensed Tree After AI Extraction

```text
.claude/skills/
├── ai-specialist/                            # NEW
│   ├── SKILL.md
│   └── references/domains/
│       ├── mcp-server-engineering/
│       ├── prompt-engineering/
│       ├── ai-application-engineering/
│       ├── model-platforms/
│       └── agent-frameworks/
├── framework-specialist/
├── open-source-project-specialist/
├── backend-specialist/
├── data-specialist/
├── product-specialist/
├── documentation-specialist/
└── ... (other experts unchanged)
```

