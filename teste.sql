CREATE TABLE public.produtos (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	nome varchar NOT NULL,
	quantidades int4 DEFAULT 0 NOT NULL,
	defeitos int4 NULL,
	preco numeric NULL,
	CONSTRAINT produtos_pkey PRIMARY KEY (id)
);


CREATE TABLE public.vendas (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	comprador varchar NOT NULL,
	produto_id int4 NOT NULL,
	quantidades int4 NOT NULL,
	total_venda numeric NOT NULL,
	CONSTRAINT vendas_pk PRIMARY KEY (id)
);

ALTER TABLE public.vendas ADD CONSTRAINT vendas_produtos_fk FOREIGN KEY (produto_id) REFERENCES public.produtos(id);

CREATE OR REPLACE FUNCTION inserir_produtos(json_input JSON)
RETURNS VOID AS $$
BEGIN
    INSERT INTO produtos (nome, quantidades, defeitos, preco)
    SELECT 
        produto->>'nome',
        (produto->>'quantidades')::INTEGER,
        (produto->>'defeitos')::INTEGER,
        (produto->>'preco')::NUMERIC
    FROM 
        json_array_elements(json_input) AS produto;
END;
$$ LANGUAGE plpgsql;


SELECT inserir_produtos('[
  {"nome": "Sofá 3 Lugares", "quantidades": 10, "defeitos": 1, "preco": 1599.99},
  {"nome": "Cadeira de Jantar", "quantidades": 40, "defeitos": 2, "preco": 149.90},
  {"nome": "Mesa de Centro", "quantidades": 25, "defeitos": 0, "preco": 299.99},
  {"nome": "Estante para Livros", "quantidades": 15, "defeitos": 1, "preco": 499.50},
  {"nome": "Armário de Cozinha", "quantidades": 8, "defeitos": 0, "preco": 1199.00},
  {"nome": "Poltrona Reclinável", "quantidades": 12, "defeitos": 1, "preco": 799.90},
  {"nome": "Cama de Casal", "quantidades": 6, "defeitos": 0, "preco": 1799.00},
  {"nome": "Mesa de Cabeceira", "quantidades": 20, "defeitos": 0, "preco": 199.90},
  {"nome": "Luminária de Mesa", "quantidades": 30, "defeitos": 3, "preco": 89.99},
  {"nome": "Tapete Sala", "quantidades": 18, "defeitos": 1, "preco": 349.90},
  {"nome": "Prateleira de Parede", "quantidades": 35, "defeitos": 0, "preco": 79.90},
  {"nome": "Aparador Rústico", "quantidades": 7, "defeitos": 0, "preco": 899.00},
  {"nome": "Mesa de Jantar 6 Lugares", "quantidades": 5, "defeitos": 0, "preco": 2299.99},
  {"nome": "Banqueta Alta", "quantidades": 22, "defeitos": 1, "preco": 179.50},
  {"nome": "Criado-Mudo", "quantidades": 19, "defeitos": 0, "preco": 229.99},
  {"nome": "Cômoda 5 Gavetas", "quantidades": 10, "defeitos": 2, "preco": 999.00},
  {"nome": "Rack para TV", "quantidades": 13, "defeitos": 1, "preco": 649.90},
  {"nome": "Guarda-Roupa Casal", "quantidades": 4, "defeitos": 0, "preco": 1899.00},
  {"nome": "Espelho de Parede", "quantidades": 25, "defeitos": 2, "preco": 249.90},
  {"nome": "Puff Decorativo", "quantidades": 14, "defeitos": 0, "preco": 299.00},
  {"nome": "Banco Baú", "quantidades": 9, "defeitos": 1, "preco": 549.99},
  {"nome": "Relógio de Parede", "quantidades": 28, "defeitos": 3, "preco": 119.90},
  {"nome": "Porta-Temperos", "quantidades": 33, "defeitos": 0, "preco": 59.90},
  {"nome": "Fruteira de Chão", "quantidades": 11, "defeitos": 1, "preco": 149.00},
  {"nome": "Suporte para Micro-ondas", "quantidades": 10, "defeitos": 0, "preco": 229.90},
  {"nome": "Cadeira de Escritório", "quantidades": 17, "defeitos": 2, "preco": 479.00},
  {"nome": "Mesa Dobrável", "quantidades": 20, "defeitos": 0, "preco": 319.90},
  {"nome": "Organizador de Gaveta", "quantidades": 30, "defeitos": 0, "preco": 39.99},
  {"nome": "Porta-Toalhas", "quantidades": 18, "defeitos": 1, "preco": 79.90},
  {"nome": "Sapateira Compacta", "quantidades": 12, "defeitos": 0, "preco": 249.00}
]');
