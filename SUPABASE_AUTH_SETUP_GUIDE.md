
# Guia de Configuração e Correção do Supabase Auth

Este documento fornece as instruções para corrigir os erros de autenticação no Supabase e criar os usuários de teste corretamente.

## 1. PROBLEMA IDENTIFICADO

Ao tentar criar usuários na tabela `auth.users` via SQL, você pode encontrar os seguintes erros:

*   **Erro 1:** `"must be owner of table users"` - Este erro ocorre porque não é possível usar o comando `ALTER TABLE` na tabela `auth.users` (que é uma tabela interna do sistema do Supabase).
*   **Erro 2:** `"there is no unique or exclusion constraint matching the ON CONFLICT specification"` - Este erro ocorre porque a constraint `UNIQUE` não existe diretamente na coluna `email` da forma como o comando `ON CONFLICT` espera em inserções diretas.

---

## 2. SOLUÇÃO SQL CORRETA (Sem usar ALTER TABLE)

Para criar os usuários de teste de forma segura, você deve executar o script SQL abaixo diretamente no SQL Editor do seu projeto Supabase.

