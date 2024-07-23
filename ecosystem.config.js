module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npm',
      autorestart: true,
      cwd: './temanasn-fe',
      args: 'run start',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'backend',
      script: 'npm',
      autorestart: true,
      cwd: './temanasn-be',
      args: 'run start',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
