const persona = require('./persona')

module.exports = function(app, db) {
    persona(app, db)
    // Otros grupos de rutas podrían ir aquí, en el futuro
}
