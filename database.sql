
-- database name: neurosity

CREATE TABLE "group" (
    id SERIAL PRIMARY KEY UNIQUE,
    name text,
    description text
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email text,
    name text,
    password text,
    role text,
    group_id integer REFERENCES "group"(id),
    disabled boolean DEFAULT false
);

CREATE TABLE participant (
    id SERIAL PRIMARY KEY,
    name text,
    gender text,
    birthdate text,
    height text,
    weight integer,
    group_id integer,
    disabled boolean DEFAULT false
);

CREATE TABLE session (
    id SERIAL PRIMARY KEY,
    time timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    notes text,
    user_id integer REFERENCES "user"(id),
    participant_id integer REFERENCES participant(id),
    group_id integer REFERENCES "group"(id)
);

CREATE TABLE eegproc (
    id SERIAL PRIMARY KEY UNIQUE,
    task text,
    acquired text,
    reactivityprofile text,
    reactivityscore text,
    session_id integer REFERENCES session(id)
);

CREATE TABLE eegraw (
    id SERIAL PRIMARY KEY,
    task text,
    acquired text,
    run text,
    json text,
    session_id integer REFERENCES session(id)
);

CREATE TABLE surveyproc (
    id SERIAL PRIMARY KEY,
    cravignscore text,
    depressionscore text,
    anxietyscore text,
    usestatus text,
    session_id integer REFERENCES session(id)
);

CREATE TABLE surveyraw (
    id SERIAL PRIMARY KEY,
    variant text,
    json text,
    session_id integer REFERENCES session(id)
);

