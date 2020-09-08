const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    // Inserir dados
    proffyValue = {
        name: "Daniel Pádua", 
        avatar: "https://avatars2.githubusercontent.com/u/37667481?s=460&u=0dde191b74ad222c74f9b1d3ee045a5a0e3737f3&v=4", 
        whatsapp: "63981188079", 
        bio: "Estudande de tecnologia focado no desenvolvimento web & mobile!", 
    }

    classValue = {
        subject: 1, 
        cost: "20", 
        // O proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id Virá com banco de dados, após cadastramos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // Await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar os dados inseridos

    // Todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // Console.log(selectedProffys)

    // Consultar as classes de um determinado professor
    // E trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    // O horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // O horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // O time_to precisa acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)

    // console.log(selectClassesSchedules)

})