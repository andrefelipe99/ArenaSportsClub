const express = require('express')
const app = express()

const partidas = [
    {
        name: "Leonardo",
        nickName: "Leo",
        weapon: "Katana",
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/e/ed/Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg"
    },
    {
        name: "Donatello",
        nickName: "Don",
        weapon: "Bo staff",
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/5a/Donatello_%28Teenage_Mutant_Ninja_Turtles%29.jpg"
    },
    {
        name: "Michelangelo",
        nickName: "Mikey",
        weapon: "Nunchucks",
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/f/f3/Michelangelo_%28Teenage_Mutant_Ninja_Turtles%29.jpg"
    },
    {
        name: "Raphael",
        nickName: "Raph",
        weapon: "Sai",
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/7/72/Raphael_%28Teenage_Mutant_Ninja_Tutles%29.jpg"
    }
]

app.get("/api", (req,res) => {
    res.json({partidas})
})

app.listen(5000, () => {console.log('Server started on port 5000')})