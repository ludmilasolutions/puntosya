-- Usuarios (clientes)
CREATE TABLE usuarios (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  nombre text,
  telefono text UNIQUE,
  email text UNIQUE,
  avatar_url text,
  created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Comercios
CREATE TABLE comercios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  rubro text,
  descripcion text,
  logo_url text,
  color_primario text DEFAULT '#4f46e5',
  owner_id uuid REFERENCES usuarios(id),
  plan text DEFAULT 'free', -- free | premium
  activo boolean DEFAULT true,
  created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Programa de puntos por comercio
CREATE TABLE programas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comercio_id uuid REFERENCES comercios(id) ON DELETE CASCADE,
  puntos_por_peso numeric DEFAULT 1, -- 1 punto por cada $X
  valor_peso numeric DEFAULT 100, -- cada $100 = 1 punto
  nombre_puntos text DEFAULT 'puntos'
);

-- Niveles de membresía por comercio (o globales)
CREATE TABLE niveles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comercio_id uuid REFERENCES comercios(id) ON DELETE CASCADE, -- null = nivel global Puntoya
  nombre text NOT NULL, -- Standard, Silver, Gold, Black
  puntos_minimos integer NOT NULL,
  beneficios text,
  emoji text
);

-- Relación cliente-comercio (puntos acumulados)
CREATE TABLE cliente_comercio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  comercio_id uuid REFERENCES comercios(id) ON DELETE CASCADE,
  puntos_acumulados integer DEFAULT 0,
  puntos_canjeados integer DEFAULT 0,
  nivel_actual text,
  ultima_visita timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(cliente_id, comercio_id)
);

-- Movimientos de puntos
CREATE TABLE movimientos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  comercio_id uuid REFERENCES comercios(id) ON DELETE CASCADE,
  tipo text CHECK (tipo IN ('suma', 'canje', 'ajuste')),
  puntos integer NOT NULL,
  monto_compra numeric NULL,
  descripcion text,
  created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Premios
CREATE TABLE premios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comercio_id uuid REFERENCES comercios(id) ON DELETE CASCADE,
  nombre text NOT NULL,
  descripcion text,
  imagen_url text,
  tipo text CHECK (tipo IN ('fisico', 'descuento', 'experiencia', 'credito', 'otro')),
  puntos_necesarios integer NOT NULL,
  descuento_porcentaje numeric NULL,
  credito_monto numeric NULL,
  activo boolean DEFAULT true,
  nivel_requerido text NULL, -- solo para nivel Gold o superior
  stock integer NULL, -- null = ilimitado
  created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Canjes
CREATE TABLE canjes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  comercio_id uuid REFERENCES comercios(id) ON DELETE CASCADE,
  premio_id uuid REFERENCES premios(id) ON DELETE CASCADE,
  puntos_used integer NOT NULL,
  estado text DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'validado', 'rechazado')),
  codigo_canje text UNIQUE NOT NULL,
  created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  validado_at timestamp WITH TIME ZONE
);

-- Promociones
CREATE TABLE promociones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comercio_id uuid REFERENCES comercios(id) ON DELETE CASCADE,
  titulo text NOT NULL,
  mensaje text,
  tipo text CHECK (tipo IN ('puntos_dobles', 'descuento', 'informativa')),
  fecha_inicio timestamp WITH TIME ZONE,
  fecha_fin timestamp WITH TIME ZONE,
  activa boolean DEFAULT true,
  created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Notificaciones push
CREATE TABLE push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  endpoint text NOT NULL,
  p256dh text NOT NULL,
  auth text NOT NULL,
  created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE comercios ENABLE ROW LEVEL SECURITY;
ALTER TABLE programas ENABLE ROW LEVEL SECURITY;
ALTER TABLE niveles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cliente_comercio ENABLE ROW LEVEL SECURITY;
ALTER TABLE movimientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE premios ENABLE ROW LEVEL SECURITY;
ALTER TABLE canjes ENABLE ROW LEVEL SECURITY;
ALTER TABLE promociones ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Usuarios: Users can read and update their own data
CREATE POLICY "Users can view own data" ON usuarios FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON usuarios FOR UPDATE USING (auth.uid() = id);

-- Comercios: Everyone can see active shops, only owners can manage their own
CREATE POLICY "Public can view active comercios" ON comercios FOR SELECT USING (activo = true);
CREATE POLICY "Owners can manage own comercios" ON comercios FOR ALL USING (auth.uid() = owner_id);

-- Programas: Everyone can see programs, only owners can manage
CREATE POLICY "Everyone can view programs" ON programas FOR SELECT USING (true);
CREATE POLICY "Owners can manage own programs" ON programas FOR ALL USING (
  EXISTS (SELECT 1 FROM comercios WHERE id = programas.comercio_id AND owner_id = auth.uid())
);

-- Niveles: Everyone can see levels
CREATE POLICY "Everyone can view levels" ON niveles FOR SELECT USING (true);
CREATE POLICY "Owners can manage own levels" ON niveles FOR ALL USING (
  comercio_id IS NULL OR EXISTS (SELECT 1 FROM comercios WHERE id = niveles.comercio_id AND owner_id = auth.uid())
);

-- cliente_comercio: User can see their own points, owners can see their customers' points
CREATE POLICY "Users can view own points" ON cliente_comercio FOR SELECT USING (auth.uid() = cliente_id);
CREATE POLICY "Owners can view their customers points" ON cliente_comercio FOR SELECT USING (
  EXISTS (SELECT 1 FROM comercios WHERE id = cliente_comercio.comercio_id AND owner_id = auth.uid())
);

-- movimientos: Users can see own history, owners can see their shop's history
CREATE POLICY "Users can view own history" ON movimientos FOR SELECT USING (auth.uid() = cliente_id);
CREATE POLICY "Owners can manage their shop history" ON movimientos FOR ALL USING (
  EXISTS (SELECT 1 FROM comercios WHERE id = movimientos.comercio_id AND owner_id = auth.uid())
);

-- premios: Everyone can see active premios, owners can manage
CREATE POLICY "Everyone can view active premios" ON premios FOR SELECT USING (activo = true);
CREATE POLICY "Owners can manage own premios" ON premios FOR ALL USING (
  EXISTS (SELECT 1 FROM comercios WHERE id = premios.comercio_id AND owner_id = auth.uid())
);

-- canjes: Users can see/create their own canjes, owners can see/update their shop's canjes
CREATE POLICY "Users can manage own canjes" ON canjes FOR ALL USING (auth.uid() = cliente_id);
CREATE POLICY "Owners can manage their shop canjes" ON canjes FOR ALL USING (
  EXISTS (SELECT 1 FROM comercios WHERE id = canjes.comercio_id AND owner_id = auth.uid())
);

-- promociones: Everyone can see active promotions
CREATE POLICY "Everyone can view active promotions" ON promociones FOR SELECT USING (activa = true);
CREATE POLICY "Owners can manage own promotions" ON promociones FOR ALL USING (
  EXISTS (SELECT 1 FROM comercios WHERE id = promociones.comercio_id AND owner_id = auth.uid())
);

-- push_subscriptions: Users can manage their own subscriptions
CREATE POLICY "Users can manage own subscriptions" ON push_subscriptions FOR ALL USING (auth.uid() = usuario_id);
