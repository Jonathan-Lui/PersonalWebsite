CREATE TABLE IF NOT EXISTS events
(
    event_id UUID PRIMARY KEY,
    visit_id UUID NOT NULL REFERENCES visits(visit_id),
    action STRING NOT NULL,
    category STRING,
    detail STRING,
    time TIMESTAMPTZ NOT NULL DEFAULT current_timestamp()
);