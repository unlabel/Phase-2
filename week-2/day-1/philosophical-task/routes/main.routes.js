const router = require('express').Router();
const { Counter } = require('../db/models');
const Card = require('../components/Card');

router.route('/')
  .get(async (req, res) => {
    const [counter] = await Counter.findOrCreate({
      where: {},
      default: {
        counter: 0,
      },
    });
    counter.counter += 1;
    await counter.save();
    res.renderComponent(Card, { counter: counter.counter });
  });

module.exports = router;
