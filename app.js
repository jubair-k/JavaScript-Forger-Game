document.addEventListener("DOMContentLoaded",function(){
    const squers=document.querySelectorAll('.grid div')
    const timeLeft=document.querySelector('#time-left')
    const results=document.querySelector('#result')
    const startBtn=document.querySelector('#button')
    const carsLeft=document.querySelectorAll('.car-left')
    const carsRight=document.querySelectorAll('.car-right')
    const logsLeft=document.querySelectorAll('.log-left')
    const logsRight=document.querySelectorAll('.log-right')
    const width=9
    let currentTime=20
    let currentIndex=76
    let timerId

    // render frog on starting block
    squers[currentIndex].classList.add('frog')

    // write a function that will move the frog
    function moveFrog(e) {
        squers[currentIndex].classList.add('frog')
        switch(e.keyCode){
            case 37:
                if(currentIndex % width !==0) currentIndex-=1
                break
            case 38:
                if(currentIndex -width >=0) currentIndex -=width
                break
            case 39:
                if(currentIndex % width < width -1) currentIndex+=1
                break
            case 40:
                if(currentIndex + width <width * width) currentIndex +=width
                break 
        }
        squers.forEach(item=>{item.classList.remove('frog')})
        squers[currentIndex].classList.add('frog')
        lose()
        win()
    }

    // moves cars
    function autoMoveCars(){
        carsLeft.forEach(carLeft=>moveCarLeft(carLeft))
        carsRight.forEach(carRight=>moveCarRight(carRight))
    }

    // move the car left on a loop
    function moveCarLeft(carLeft){
        switch(true){
            case carLeft.classList.contains('c1'):
                carLeft.classList.remove('c1')
                carLeft.classList.add('c2')
                break
            case carLeft.classList.contains('c2'):
                carLeft.classList.remove('c2')
                carLeft.classList.add('c3')
                break
            case carLeft.classList.contains('c3'):
                carLeft.classList.remove('c3')
                carLeft.classList.add('c1')
                break
        }
    }

    // move the car right on a loop
    function moveCarRight(carRight){
        switch(true){
            case carRight.classList.contains('c1'):
                carRight.classList.remove('c1')
                carRight.classList.add('c3')
                break
            case carRight.classList.contains('c2'):
                carRight.classList.remove('c2')
                carRight.classList.add('c1')
                break
            case carRight.classList.contains('c3'):
                carRight.classList.remove('c3')
                carRight.classList.add('c2')
                break
        }
    }

    // moves logs
    function autoMoveLogs(){
        logsLeft.forEach(logLeft=>moveLogLeft(logLeft))
        logsRight.forEach(logRight=>moveLogRight(logRight))
    }

    // move the log left on a loop
    function moveLogLeft(logLeft){
        switch(true){
            case logLeft.classList.contains('l1'):
                logLeft.classList.remove('l1')
                logLeft.classList.add('l2')
                break
            case logLeft.classList.contains('l2'):
                logLeft.classList.remove('l2')
                logLeft.classList.add('l3')
                break
            case logLeft.classList.contains('l3'):
                logLeft.classList.remove('l3')
                logLeft.classList.add('l4')
                break
            case logLeft.classList.contains('l4'):
                logLeft.classList.remove('l4')
                logLeft.classList.add('l5')
                break
            case logLeft.classList.contains('l5'):
                logLeft.classList.remove('l5')
                logLeft.classList.add('l1')
                break
        }
    }

    // move the log right on a loop
    function moveLogRight(logRight){
        switch(true){
            case logRight.classList.contains('l1'):
                logRight.classList.remove('l1')
                logRight.classList.add('l5')
                break 
            case logRight.classList.contains('l2'):
                logRight.classList.remove('l2')
                logRight.classList.add('l1')
                break
            case logRight.classList.contains('l3'):
                logRight.classList.remove('l3')
                logRight.classList.add('l2')
                break
            case logRight.classList.contains('l4'):
                logRight.classList.remove('l4')
                logRight.classList.add('l3')
                break
            case logRight.classList.contains('l5'):
                logRight.classList.remove('l5')
                logRight.classList.add('l4')
                break
        }
    }


    // rules to win forger
    function win(){
        if(squers[4].classList.contains('frog')){
            results.innerHTML="YOU WIN"
            squers[currentIndex].classList.remove('frog')
            clearInterval(timerId)
            document.removeEventListener('keyup',moveFrog)
        }
    }

    // rules to lose forger
    function lose(){
        if((currentIndex==0) || (squers[currentIndex].classList.contains('c1'))
        || (squers[currentIndex].classList.contains('l5'))
        || (squers[currentIndex].classList.contains('l4'))){
            results.innerHTML="YOU LOSE!"
            squers[currentIndex].classList.remove('frog')
            clearInterval(timerId)
            document.removeEventListener('keyup',moveFrog)
        }
    }


    // move the frog when its on the log moving left
    function moveWithLogLeft(){
        if(currentIndex >= 27 && currentIndex <35){
            squers[currentIndex].classList.remove('frog')
            currentIndex +=1
            squers[currentIndex].classList.add('frog')
        }
    }

    // move the frog when its on the log moving right
    function moveWithLogRight(){
        if(currentIndex > 18 && currentIndex <=26){
            squers[currentIndex].classList.remove('frog')
            currentIndex -=1
            squers[currentIndex].classList.add('frog')
        }
    }


    // all the function that move peices
    function movePeices(){
        currentTime--
        timeLeft.textContent=currentTime
        autoMoveCars()
        autoMoveLogs()
        moveWithLogLeft()
        moveWithLogRight()
        lose()
    }

    // to start and pause the game
    startBtn.addEventListener('click',()=>{
        if(timerId){
            clearInterval(timerId)
        }
        else{
            timerId=setInterval(movePeices,1000)
            document.addEventListener('keyup',moveFrog)
        }
    })


})
