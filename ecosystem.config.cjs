module.exports = {
  apps: [
    {
      name: 'klimatrikk-strapi',
      cwd: __dirname,
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '500M',
      env_production: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: 1337,
      },
    },
  ],
};