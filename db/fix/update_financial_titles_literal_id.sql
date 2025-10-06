-- !! ESTE CODIGO TOCA BORRARLO


-- 1. Agregar columna literal_id a financial_titles (si aún no existe)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'financial_titles' AND column_name = 'literal_id'
    ) THEN
        ALTER TABLE financial_titles ADD COLUMN literal_id INTEGER REFERENCES literals(id) ON DELETE SET NULL;
    END IF;
END $$;

-- 2. Asegurar que los literales existan (opcional, si no están creados)
INSERT INTO literals (id, name) VALUES
  (1, 'Activo'),
  (2, 'Pasivo'),
  (3, 'Patrimonio')
ON CONFLICT (id) DO NOTHING;

-- 3. Asignar literal_id a cada financial_title según su categoría
UPDATE financial_titles SET literal_id = 1 WHERE category_id = 1; -- Activos
UPDATE financial_titles SET literal_id = 2 WHERE category_id = 2; -- Pasivos
UPDATE financial_titles SET literal_id = 3 WHERE category_id = 3; -- Patrimonio

-- 4. (Opcional) Validar resultados
-- SELECT id, name, category_id, literal_id FROM financial_titles ORDER BY id;