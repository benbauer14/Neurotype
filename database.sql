
-- database name: neurosity

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

CREATE TABLE participant (
    id SERIAL PRIMARY KEY,
    name text,
    gender text,
    birthdate text,
    height text,
    weight integer,
    group_id integer REFERENCES researchgroup(id),
    disabled boolean DEFAULT false
);

CREATE TABLE pins (
    id SERIAL PRIMARY KEY,
    pin_number integer,
    group_id integer REFERENCES researchgroup(id)
);

CREATE TABLE researchgroup (
    id SERIAL PRIMARY KEY,
    name text,
    description text
);

CREATE TABLE session (
    id SERIAL PRIMARY KEY,
    time timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    notes text,
    user_id integer REFERENCES users(id),
    participant_id integer REFERENCES participant(id),
    group_id integer REFERENCES researchgroup(id)
);

CREATE TABLE surveyproc (
    id SERIAL PRIMARY KEY,
    cravingscore text,
    depressionscore text,
    anxietyscore text,
    usestatus text,
    session_id integer REFERENCES session(id)
);

CREATE TABLE surveyraw (
    id SERIAL PRIMARY KEY,
    variant text,
    json text,
    session_id integer REFERENCES session(id),
    csvlocation text
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email text,
    name text,
    password text,
    role text,
    group_id integer REFERENCES researchgroup(id),
    disabled boolean DEFAULT false
);

