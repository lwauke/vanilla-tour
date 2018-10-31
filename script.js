const btnStart = document.querySelector('#start')
, next = document.querySelectorAll('.next')
, previous = document.querySelectorAll('.previous')
, finishBtn = document.querySelectorAll('.finish')
, steps = Array.from(document.querySelectorAll('.step'))
, body = document.querySelector('body')

let iterator

function Iterator(arr){
	this.index = -1;
	this.next = () => {
        return this.index < arr.length
            ? {value: arr[++this.index], done: false}
            : {done: true}
	};
	this.previous = () => {
        return this.index > 0
            ? {value: arr[--this.index], done: false}
            : {done: true}
    };
    this.actual = () => ({value: arr[this.index], done: false})
    this.reset = () => { this.index = -1 };
}

function finish() {
    iterator.reset()
    steps.forEach(s => s.classList.remove('showing'))
    body.classList.remove('ontour')
}

function toggleStep(active, inactive) {
    active && active.classList.remove('showing')
    inactive && inactive.classList.add('showing')
}

iterator = new Iterator(steps)

function iterateStep(target) {
    const actualStep = iterator.actual()
    , targetStep = iterator[target]()

    if (targetStep.done) {
        finish()
        return
    }

    toggleStep(actualStep.value, targetStep.value)
}

next.forEach(b => b.addEventListener('click', e => {
    e.preventDefault()
    body.classList.add('ontour')
    iterateStep('next')
}))

previous.forEach(b => b.addEventListener('click', e => {
    e.preventDefault()
    iterateStep('previous')
}))

finishBtn.forEach(b => b.addEventListener('click', finish))