document.addEventListener('keypress', onKeyPress);

const KeyToSound = {
    'a': document.querySelector('#clap'),
    'A': document.querySelector('#clap'),
    's': document.querySelector('#boom'),
    'S': document.querySelector('#boom'),
    'd': document.querySelector('#hihat'),
    'D': document.querySelector('#hihat'),
    'f': document.querySelector('#kick'),
    'F': document.querySelector('#kick'),
    'g': document.querySelector('#openhat'),
    'G': document.querySelector('#openhat'),
    'h': document.querySelector('#ride'),
    'H': document.querySelector('#ride'),
    'j': document.querySelector('#snare'),
    'J': document.querySelector('#snare'),
    'k': document.querySelector('#tink'),
    'K': document.querySelector('#tink'),
    'l': document.querySelector('#tom'),
    'L': document.querySelector('#tom')
}


function onKeyPress(event){
    const sound = KeyToSound[event.key];
    playSound(sound);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}