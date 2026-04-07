-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── 1. PROFIS E AUTENTICAÇÃO (Auth & RBAC) ──────────────────────────────────
-- O Supabase gerencia usuários em auth.users. Criamos uma tabela atrelada para os perfis.

CREATE TYPE user_role AS ENUM ('owner', 'funcionario', 'tecnico');

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'funcionario',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política: Usuário pode ver seu próprio perfil
CREATE POLICY "Usuário vê o próprio perfil" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- ─── 2. TABELA DE CLIENTES (Para o Técnico) ──────────────────────────────────

CREATE TABLE public.clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id UUID REFERENCES public.profiles(id) NOT NULL,
  tecnico_id UUID REFERENCES public.profiles(id),  -- O técnico responsável pela auditoria
  compliance_score INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Política: Técnico pode ver clientes associados a ele
CREATE POLICY "Tecnico_view_assigned_clients" ON public.clients
  FOR SELECT USING (auth.uid() = tecnico_id);

-- Política: Owner tem acesso total ao seu "cliente"
CREATE POLICY "Criador_full_access" ON public.clients
  FOR ALL USING (auth.uid() = owner_id);

-- ─── 3. TABELA DE PLANTEL (Animais) ──────────────────────────────────────────

CREATE TABLE public.animals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  breed_code TEXT NOT NULL,
  sex TEXT CHECK (sex IN ('M', 'F')) NOT NULL,
  status TEXT NOT NULL,
  birth_date DATE,
  coi DECIMAL(5, 2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.animals ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para Animais
CREATE POLICY "Funcionario_manejo_only" ON public.animals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.clients c 
      WHERE c.id = public.animals.client_id AND c.owner_id = (SELECT owner_id FROM public.profiles WHERE id = auth.uid()) 
      -- Simplified for the sake of the prototype: employee belongs to owner
    )
  );

CREATE POLICY "Owner_full_animals" ON public.animals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.clients c WHERE c.id = public.animals.client_id AND c.owner_id = auth.uid()
    )
  );

-- ─── 4. OBSERVAÇÕES (Manejo & Alertas) ───────────────────────────────────────

CREATE TABLE public.observations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  animal_id UUID REFERENCES public.animals(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.profiles(id) NOT NULL,
  note TEXT NOT NULL,
  is_urgent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.observations ENABLE ROW LEVEL SECURITY;

-- Trigger para Edge Function no Supabase na Nuvem seria ativado num "AFTER INSERT"
-- CREATE TRIGGER on_urgent_observation
--   AFTER INSERT ON public.observations
--   FOR EACH ROW
--   WHEN (NEW.is_urgent = TRUE)
--   EXECUTE FUNCTION supabase_functions.http_request('http://localhost:54321/functions/v1/manejo-alert');
