server '3.93.90.210', user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, forward_agent: true

set :branch, 'main'

set :default_env, {
  'ED_NODE_ENV' => 'production',
  'WRI_API_URL' => 'https://api.resourcewatch.org/v1',
  'CONTROL_TOWER_URL' => 'https://api.resourcewatch.org',
  'CALLBACK_URL' => 'https://earthhq.org/sign-in',
  'APPLICATIONS' => 'earthhq'
}
