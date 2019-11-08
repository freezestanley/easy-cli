const NODE_ENV = process.env.NODE_ENV;
const PRODUCTION = 'production'
const DEVELOPMENT = 'development'
env = {
    isPrd: process.env.NODE_ENV === PRODUCTION.toLowerCase(),
    isDev: process.env.NODE_ENV === DEVELOPMENT.toLowerCase(),
    DEVELOPMENT,
    PRODUCTION
}
module.exports = env