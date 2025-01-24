-- CREATE DATABASE IF NOT EXISTS comedor -- 
SELECT 'CREATE DATABASE comedor'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'comedor')\gexec