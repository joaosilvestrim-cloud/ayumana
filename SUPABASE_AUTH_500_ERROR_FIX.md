
# Guia de Resolução: Erro 500 no Supabase Auth ("Database error querying schema")

Este documento detalha as estratégias para diagnosticar e resolver o erro crítico 500 no endpoint `/auth/v1/token` que está bloqueando as tentativas de login na aplicação.

## CAUSA RAIZ (Investigação)
O erro "Database error querying schema" durante a autenticação geralmente é causado por:
1. Triggers corrompidos ou mal configurados na tabela `auth.users`.
2. Políticas RLS (Row Level Security) bloqueando acesso ao schema.
3. Problemas de integridade na tabela `auth.users`.
4. Funções ou triggers que falham silenciosamente durante o evento de login.

---

## ESTRATÉGIAS DE RESOLUÇÃO

Como as permissões para modificar as tabelas do sistema (`auth.*`) diretamente são restritas, siga as opções abaixo na ordem apresentada.

### OPÇÃO 1: Reiniciar o Serviço de Autenticação (RECOMENDADO)
A forma mais segura de corrigir estados inconsistentes no serviço de Auth é reiniciando-o através do painel.

1. Acesse o **Supabase Dashboard**.
2. Vá para **Project Settings** (ícone de engrenagem) → **Auth**.
3. Procure por opções de configuração avançada ou simplesmente altere uma configuração inofensiva (ex: tempo de expiração do JWT de 3600 para 3601) e salve. Isso força o serviço de Auth a reiniciar.
4. Aguarde de 2 a 3 minutos para o serviço reiniciar completamente.
5. Tente realizar o login novamente. Se as contas não existirem mais, recrie os usuários de teste via SQL.

### OPÇÃO 2: Investigação via SQL (Diagnóstico)
Se o erro persistir, você pode rodar a query abaixo no **SQL Editor** do Supabase para identificar o problema exato. (O sistema também rodará automaticamente os comandos de leitura para verificação).

