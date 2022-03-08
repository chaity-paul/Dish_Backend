const express = require('express')
const router = express.Router();
router.use(express.json())

const dishes = [
    {id: 1, name: 'Biriyani'},
    {id: 2, name: 'Noodles'},
    {id: 3, name: 'Coffee'},
    {id: 4, name: 'Juice'},
    {id: 5, name: 'Ice-cream'}
]

router.get('/', (req, res) => {
    res.send(dishes)
})
router.get('/:id', (req, res) => {
    const dish = dishes.find(d => d.id === parseInt(req.params.id))
    if (!dish) res.status(404).send('The Dish of this id was not found..!')
    else res.send(dish)
})
router.post('/', (req, res) => {

    const result = validateDish(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const dish = {
        id: dishes.length + 1,
        name: req.body.name
    }
    dishes.push(dish)
    res.send(dish)
})
router.put('/:id', (req, res) => {
    const dish = dishes.find(d => d.id === parseInt(req.params.id))
    if (!dish) {
        res.status(404).send('The Dish of this id was not found..!')
        return
    }

    const result = validateDish(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    dish.name = req.body.name
    res.send(dish)

})
router.delete('/:id', (req, res) => {
    const dish = dishes.find(d => d.id === parseInt(req.params.id))
    if (!dish) {
        res.status(404).send('The Dish of this id was not found..!')
        return
    }

    const index = dishes.indexOf(dish)
    dishes.splice(index, 1)

    res.send(dish)

})

module.exports = router