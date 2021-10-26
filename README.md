# Tern blaster the sophisticated audio engine 

Tern blaster is sophisticated audio engine that comes with 3 dimensional audio system and 2 dimensional Synth, piano sampler and custom piano sample which allows you to add custom piano soudns.   

### Sprite player
The project doesn't currently have any audio builder therefor you have to build it manullay! You can use lib https://www.npmjs.com/package/audiosprite that can do most of the heavy lifting for you.

Running in development
```
npm run dev
```

# Examples

## Adding custom pianos

```js
const ternBlaster = new TernBlaster();

ternBlaster.pianoSampler.addCustomPiano('test', {
    A0: 'www.path.mp3',
})
```

## Playing piano sounds
```js
const ternBlaster = new TernBlaster();

ternBlaster.pianoSampler.keyDown('' /* piano type empty string is default*/, 'A5');
setTimeout(() => {
    ternBlaster.pianoSampler.keyUp('', 'A5');
}, 5000);
```


## Playing Synth
```js
const ternBlaster = new TernBlaster();

ternBlaster.synthEngine.keyDown('square' /* sawtooth | sine | triangle */, 'A0')
setTimeout(() => {
    ternBlaster.synthEngine.keyUp('', 'A5');
}, 5000);
```

## Playing Sprite 
```js
const ternBlaster = new TernBlaster();
ternBlaster.playOnPos('test', { x: 0, y: 0, z: 0 , distance:5});
ternBlaster.playStatic('test')
```


## Handle settings updates manually 
```js
const settings = {
    settings: {
        master: 100,
        ambient: 75,
        music: 50,
        sprite: 50,
        piano: 75,
        synth: 10,
    },
    onUpdate: () => {
        console.log('settings updated', settings.settings);
    }
};
const ternBlaster = new TernBlaster({settings});
```
