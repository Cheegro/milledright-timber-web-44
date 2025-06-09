
-- Add location and device tracking fields to analytics tables
ALTER TABLE analytics_page_views 
ADD COLUMN country VARCHAR(100),
ADD COLUMN region VARCHAR(100), 
ADD COLUMN city VARCHAR(100),
ADD COLUMN latitude DECIMAL(10,8),
ADD COLUMN longitude DECIMAL(11,8),
ADD COLUMN device_type VARCHAR(50),
ADD COLUMN browser VARCHAR(100),
ADD COLUMN operating_system VARCHAR(100),
ADD COLUMN screen_resolution VARCHAR(20),
ADD COLUMN is_mobile BOOLEAN DEFAULT false,
ADD COLUMN timezone VARCHAR(100);

ALTER TABLE analytics_events
ADD COLUMN country VARCHAR(100),
ADD COLUMN region VARCHAR(100),
ADD COLUMN city VARCHAR(100), 
ADD COLUMN latitude DECIMAL(10,8),
ADD COLUMN longitude DECIMAL(11,8),
ADD COLUMN device_type VARCHAR(50),
ADD COLUMN browser VARCHAR(100),
ADD COLUMN operating_system VARCHAR(100),
ADD COLUMN screen_resolution VARCHAR(20),
ADD COLUMN is_mobile BOOLEAN DEFAULT false,
ADD COLUMN timezone VARCHAR(100);

-- Create indexes for better query performance
CREATE INDEX idx_analytics_page_views_country ON analytics_page_views(country);
CREATE INDEX idx_analytics_page_views_device_type ON analytics_page_views(device_type);
CREATE INDEX idx_analytics_page_views_is_mobile ON analytics_page_views(is_mobile);
CREATE INDEX idx_analytics_events_country ON analytics_events(country);
CREATE INDEX idx_analytics_events_device_type ON analytics_events(device_type);

-- Create a view for quick analytics overview
CREATE OR REPLACE VIEW analytics_overview AS
SELECT 
  COUNT(*) as total_page_views,
  COUNT(DISTINCT session_id) as unique_visitors,
  COUNT(CASE WHEN is_mobile = true THEN 1 END) as mobile_views,
  COUNT(CASE WHEN is_mobile = false THEN 1 END) as desktop_views,
  MODE() WITHIN GROUP (ORDER BY country) as top_country,
  MODE() WITHIN GROUP (ORDER BY device_type) as top_device,
  MODE() WITHIN GROUP (ORDER BY browser) as top_browser
FROM analytics_page_views 
WHERE created_at >= NOW() - INTERVAL '30 days';
