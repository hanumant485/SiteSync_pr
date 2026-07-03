const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_URL,
    socket: {
        host: 'macrolight-cyan-stellar-65563.db.redis.io',
        port: 13352
    }
});

module.exports = redisClient;