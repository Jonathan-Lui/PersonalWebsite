CREATE TABLE IF NOT EXISTS visits
(
    visit_id UUID PRIMARY KEY,
    visitor_id UUID,
    ip_address INET,
    referrer STRING,
    custom_referrer STRING,
    browser STRING,
    browser_version STRING,
    platform STRING,
    platform_version STRING,
    screen_height INT,
    screen_width INT,
    start_time TIMESTAMPTZ NOT NULL DEFAULT current_timestamp(),
    end_time TIMESTAMPTZ
);