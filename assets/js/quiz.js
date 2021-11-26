const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which player has the most appearances in Premier League history?',
        choice1: 'Ryan Giggs',
        choice2: 'James Milner',
        choice3: 'Gareth Barry',
        choice4: 'Frank Lampard',
        answer: 3,
    },
    {
        question:
            "Which Premier League stadium currently has the largest capacity?",
        choice1: "Old Trafford",
        choice2: "Emirates Stadium",
        choice3: "Queen Elisabeth Olympic Park",
        choice4: "Villa Park",
        answer: 4,
    },
    {
        question: "The top transfer fee received by a Premier League club is £106m – who was the player?",
        choice1: "Gareth Bale",
        choice2: "Philippe Coutinho",
        choice3: "Eden Hazard",
        choice4: "Cristiano Ronaldo",
        answer: 2,
    },
    {
        question: "What team won the first Premier League trophy?",
        choice1: "Manchester United",
        choice2: "Liverpool",
        choice3: "Everton",
        choice4: "Manchester City",
        answer: 1,
    },
    {
        question: "What’s the most goals scored by one player in a single Premier League season?",
        choice1: "32",
        choice2: "33",
        choice3: "34",
        choice4: "31",
        answer: 1,
    },
    {
        question: "Manchester United have won the Premier League 13 times, more than any other side – which club have the second most titles with 5?",
        choice1: "Liverpool",
        choice2: "Chelsea",
        choice3: "Arsenal",
        choice4: "Manchester City",
        answer: 2,
    },
    {
        question: "Which player has scored the most Premier League own goals?",
        choice1: "Phil Jagielka",
        choice2: "Rio Ferdinand",
        choice3: "Jamie Carragher",
        choice4: "Richard Dunne",
        answer: 4,
    },
    {
        question: "Which goalkeeper has recorded the most clean sheets in the league’s history?",
        choice1: "Peter Schmeichel",
        choice2: "David James",
        choice3: "Petr Cech",
        choice4: "David Seaman",
        answer: 3,
    },
    {
        question: "Who scored the fastest hat-trick in Premier League history?",
        choice1: "Robbie Fowler",
        choice2: "Sadio Mane",
        choice3: "Jermain Defoe",
        choice4: "Sergio Aguero",
        answer: 2,
    },
    {
        question: "Which Premier League team has conceded the most goals of all time?",
        choice1: "Tottenham Hotspurs ",
        choice2: "Everton",
        choice3: "West Ham",
        choice4: "Newcastle",
        answer: 2,
    },
    {
        question: "What team had the fewest points ever in a Premier League season?",
        choice1: "Sunderland",
        choice2: "Portsmouth",
        choice3: "Huddersfield",
        choice4: "Derby",
        answer: 4,
    },
    {
        question: "Who is the Premier Leagues most expensive signing of all time?",
        choice1: "Paul Pogba",
        choice2: "Jack Grealish",
        choice3: "Romelu Lukaku",
        choice4: "Virgil Van Dijk",
        answer: 2,
    },
    {
        question: "What manager has had the shortest reign in the Premiership?",
        choice1: "Les Reed",
        choice2: "Quique Sanchez Flores",
        choice3: "Frank De Boer",
        choice4: "Rene Meulensteen",
        answer: 1,
    },
    {
        question: "What player has the most assists in PRemier League history?",
        choice1: "Cesc Fabregas",
        choice2: "David Silva",
        choice3: "Ryan Giggs",
        choice4: "Frank Lampard",
        answer: 3,
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()