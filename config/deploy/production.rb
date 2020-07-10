server 'ec2-100-26-157-165.compute-1.amazonaws.com', user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, forward_agent: true

set :default_env, {
  'NODE_ENV' => 'production',
  'WRI_API_URL' => 'https://api.resourcewatch.org/v1',
  'CONTROL_TOWER_URL' => 'https://api.resourcewatch.org',
  'CALLBACK_URL' => 'https://resourcewatch.org/auth'
}
