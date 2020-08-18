//Dados
const proffys = [
    {
        name: "Daniel Pádua",
        avatar: "https://avatars2.githubusercontent.com/u/37667481?s=460&u=0dde191b74ad222c74f9b1d3ee045a5a0e3737f3&v=4",
        whatsapp: "63981188079",
        bio: "Estudante de tecnologia, apaixonado por desenvolvimento web & mobile.",
        subject: "Tecnologia da Informação",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "99123456789",
        bio: "Entusiasta das melhores tecnologias de química avançada.",
        subject: "Química",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
    "Tecnologia da informação",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

//Funcionalidades

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query

    //Adicionar dados a listagem de proffys
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {
        
        data.subject = getSubject (data.subject)
        
    //Adicionar data a listagem de proffys
     proffys.push(data)

    return res.redirect("/study")
}

//Se não mostrar...
    return res.render("give-classes.html", {subjects, weekdays})
}

//Servidor
const express = require('express')
const server = express()

// Configurações do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
// Configurações de arvios estáticos (CSS, Scripts, Imagens, etc...)
.use(express.static("public"))
// Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
//Inicio do servidor
.listen(5500)