server '54.197.134.233', user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, forward_agent: true

set :branch, 'feature/update-deployments'

set :default_env, {
  'ED_NODE_ENV' => 'production',
  'WRI_API_URL' => 'https://api.resourcewatch.org',
  'GCA_API_URL' => 'https://staging.api.earthhq.org/api',
  'CALLBACK_URL' => 'https://earthhq.org/sign-in',
  'NULL_SCHOOL_IFRAME_BASE' => 'https://earthhq.nullschool.net',
  'APPLICATIONS' => 'earthhq',
  'SENTRY_AUTH_TOKEN' => ENV['SENTRY_AUTH_TOKEN'],
  'GA4_ID' => 'GTM-W4WTJL2'
}
