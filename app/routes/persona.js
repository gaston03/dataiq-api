var ObjectID = require ('mongodb').ObjectID

module.exports = function(app, db) {
    app.get('/persona', (req, res) => {
        db.collection('persona').find({}).toArray(function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'})
            } else {
                res.send({ 'result': result })
            }
        })
    })

    app.get('/persona/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        db.collection('persona').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'})
            } else {
                console.log(item)
                res.send({ 'result': item })
            }
        })
    })

    app.delete('/persona/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        db.collection('persona').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'})
            } else {
                res.send({ 'result': id + ' deleted!' })
            }
        })
    })

    app.put('/persona/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const persona = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            edad: req.body.edad
        }
        db.collection('persona').update(details, persona, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'})
            } else {
                res.send({ 'result': persona })
            }
        })
    })

    app.post('/persona', (req, res) => {
        const persona = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            edad: req.body.edad
        }
        db.collection('persona').insert(persona, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' })
            } else {
                res.send({ 'result': result.ops[0] })
            }
        })
    })
}
