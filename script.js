const btnStart = document.querySelector('#start')
const next = document.querySelectorAll('.next')
const finish = document.querySelector('.finish')

function nextStep (element) { 
    const sibling = element.nextElementSibling

    return sibling.classList.contains('step') 
        ? sibling
        : nextStep(sibling)
}    

function parentStep (element) { 
    const parent = element.parentElement

    return parent.classList.contains('step') 
        ? parent
        : parentStep(parent)
}    

btnStart.addEventListener('click', e => {
    e.preventDefault()
    const body = document.querySelector('body')
    const firstStep = document.querySelector('.step:first-of-type')

    body.classList.add('ontour')
    firstStep.classList.add('showing')
})

next.forEach(b => b.addEventListener('click', e => {
    e.preventDefault()
    const parent = parentStep(e.target)
    const brother = nextStep(parent)
    
    parent.classList.remove('showing')
    brother.classList.add('showing')
}))

finish.addEventListener('click', e => {
    e.preventDefault()    
    const body = document.querySelector('body')
    const steps = document.querySelectorAll('.step')

    steps.forEach(s => s.classList.remove('showing'))
    body.classList.remove('ontour')
})