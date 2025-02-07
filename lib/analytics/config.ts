// lib/analytics/config.ts
export const COUNTLY_CONFIG = {
    app_key: 'c71c948375ed28bf259afb76ad12f3ffc4b44201',
    url: 'https://analytics.serverplus.org',
    tracking_features: [
      'track_sessions',
      'track_pageview',
      'track_clicks',
      'track_scrolls',
      'track_errors',
      'track_links',
      'track_forms',
      'collect_from_forms'
    ]
  } as const;