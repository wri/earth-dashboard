server '54.197.134.233', user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, forward_agent: true

set :branch, 'develop'

set :default_env, {
  'ED_NODE_ENV' => 'production',
  'WRI_API_URL' => 'https://api.resourcewatch.org',
  'CALLBACK_URL' => 'https://earthhq.org/sign-in',
  'APPLICATIONS' => 'earthhq'
}
