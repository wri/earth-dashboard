server 'ec2-52-2-145-35.compute-1.amazonaws.com', user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, forward_agent: true
