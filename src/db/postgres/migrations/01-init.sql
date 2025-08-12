-- Uma migration é um script SQL que é executado para criar ou modificar a estrutura do banco de dados.
CREATE TABLE IF NOT EXISTS users(
    ID UUID PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,    
    last_name VARCHAR(50) NOT NULL,    
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Para criar o type:
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN
        CREATE TYPE transaction_type AS ENUM ('EARNING', 'EXPENSE', 'INVESTMENT');
    END IF;
END
$$ LANGUAGE plpgsql;


CREATE TABLE IF NOT EXISTS transactions(
    ID UUID PRIMARY KEY,
    user_id UUID REFERENCES users(ID) ON DELETE CASCADE, -- relacionamento com a tabela users
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL, -- pode ter 10 dígitos, 2 após a vírgula
    type transaction_type NOT NULL
);