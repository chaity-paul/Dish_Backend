const express = require('express')
const router = express.Router();
router.use(express.json())

const promotions = [
    {id: 1, name: 'Get cold-drinks free on order 2 packet Biriyani'},
    {id: 2, name: '10% discount on Noodles'},
    {id: 3, name: 'Buy 1 Get 1 free'},
    {id: 4, name: '5% discount on Juice'},
    {id: 5, name: '2% discount on Ice-cream'}
]

router.get('/', (req, res) => {
    res.send(promotions)
})
router.get('/:id', (req, res) => {
    const promo = promotions.find(d => d.id === parseInt(req.params.id))
    if (!promo) res.status(404).send('The promotion with given id was not found..!')
    else res.send(promo)
})
router.post('/', (req, res) => {

    const result = validateDish(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const promo = {
        id: promotions.length + 1,
        name: req.body.name
    }
    promotions.push(promo)
    res.send(promo)
})
router.put('/:id', (req, res) => {
    const promo = promotions.find(d => d.id === parseInt(req.params.id))
    if (!promo) {
        res.status(404).send('The Promotion with given id was not found..!')
        return
    }

    const result = validateDish(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    promo.name = req.body.name
    res.send(promo)

})
router.delete('/:id', (req, res) => {
    const promo = promotions.find(d => d.id === parseInt(req.params.id))
    if (!promo) {
        res.status(404).send('The Promotion with given id was not found..!')
        return
    }

    const index = promotions.indexOf(promo)
    promotions.splice(index, 1)

    res.send(promo)

})

module.exports = router