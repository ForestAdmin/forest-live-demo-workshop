DROP TABLE IF EXISTS "workshop" CASCADE;
DROP TABLE IF EXISTS "event" CASCADE;
DROP TABLE IF EXISTS "program" CASCADE;
DROP TABLE IF EXISTS "ambassador" CASCADE;
DROP TABLE IF EXISTS "location" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

CREATE TABLE IF NOT EXISTS "location" (
    id SERIAL PRIMARY KEY,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    number VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,
    picture VARCHAR NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    birthdate TIMESTAMP NOT NULL,
    role VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "program" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    owner_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

DROP TYPE IF EXISTS ambassador_entity;
DROP TYPE IF EXISTS ambassador_do_zone;
CREATE TYPE ambassador_entity AS ENUM ('communication', 'brand_commitment', 'digital');
CREATE TYPE ambassador_do_zone AS ENUM ('grand_ouest', 'nord', 'sud');
CREATE TABLE IF NOT EXISTS "ambassador" (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    professional_phone VARCHAR(255),
    picture VARCHAR NOT NULL,
    birthdate TIMESTAMP NOT NULL,
    manager_firstname VARCHAR(100) NOT NULL,
    manager_lastname VARCHAR(100) NOT NULL,
    manager_mail VARCHAR(100) NOT NULL,
    days_spent decimal(10,2),
    remaning_days decimal(10,2),
    professional_postal_code VARCHAR(100),
    professional_city VARCHAR(100),
    entity ambassador_entity,
    do_zone ambassador_do_zone,
    inerested_program_id INTEGER NOT NULL REFERENCES "program"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    comments VARCHAR(255),
    address VARCHAR(255),
    alternant BOOLEAN,
    animation_preferences VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "event" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    teaser VARCHAR(100) NOT NULL,
    program_id INTEGER NOT NULL REFERENCES "program"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    owner_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    requirements VARCHAR(250),
    price decimal(30,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

DROP TYPE IF EXISTS workshop_type;
DROP TYPE IF EXISTS workshop_status;
CREATE TYPE workshop_type AS ENUM ('online', 'on-site');
CREATE TYPE workshop_status AS ENUM ('pending-review', 'confirmed');
CREATE TABLE IF NOT EXISTS "workshop" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type workshop_type NOT NULL,
    status workshop_status NOT NULL,
    description VARCHAR(100) NOT NULL,
    ambassador_id INTEGER REFERENCES "ambassador"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    location_id INTEGER REFERENCES "location"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    event_id INTEGER REFERENCES "event"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    observator_id INTEGER REFERENCES "ambassador"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    occurring_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "user_workshop" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    workshop_id INTEGER NOT NULL REFERENCES "workshop"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
