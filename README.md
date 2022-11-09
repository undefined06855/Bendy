# Bendy
Simple pendulum simulator

None of the physics are real, it's made using this calculation:
```js
Math.sin(Date.now() * (speed/300)) * (i\*change\*10)
```
where `speed` is the speed slider, `i` is how far down the dot is and `change` is the change slider.
