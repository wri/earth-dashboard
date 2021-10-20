server '3.93.90.210', user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, forward_agent: true

set :branch, 'main'

set :default_env, {
  'ED_NODE_ENV' => 'production',
  'WRI_API_URL' => 'https://api.resourcewatch.org',
  'GCA_API_URL' => 'https://api.earthhq.org/api',
  'CALLBACK_URL' => 'https://earthhq.org/sign-in',
  'APPLICATIONS' => 'earthhq',
  'SENTRY_AUTH_TOKEN' => ENV['SENTRY_AUTH_TOKEN'],
  'GA4_ID' => 'GTM-W4WTJL2'
}
