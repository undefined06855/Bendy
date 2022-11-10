# Bendy
Simple pendulum simulator

None of the physics are real, it's made using this calculation:
```js
Math.sin(curTime * (speed/300)) * (i*change*10)
```
where `curTime` is the current millisecond (given by `Date.now()`), `speed` is the speed slider, `i` is how far down the dot is and `change` is the change slider.

<sub><sup>psst: try clicking the pendulum!</sup></sub>
