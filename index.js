const express = require("express")
const path = require("path")
const app = express()

// 以下の記述をすることで、postで受け取ったreqのbodｙを使えるようになる
app.use(express.urlencoded({extended: false}))

console.log(__dirname)

// 利用するフォルダを指定する.publicフォルダのコンテンツを参照できるようにしている
app.use(express.static(path.join(__dirname, "public")))

app.get("/about", function(req, res){
    res.send("about page")
})

app.get("/test", function(req, res){
    res.send({
        name: "mike",
        age: 30
    })
})

// ブラウザから入力されたものを受け付ける
// redirectする際は、カレントのパスを意識する
// 現状/correct,wrongと指定しているが、これはpublicがデフォルトパスだから
// ./correctとすると/api/v1/quiz/correctとなってしまい、エラーとなる
app.post("/api/v1/quiz",  function(req, res){
    const answer = req.body.answer
    if (answer === "2") {
        // res.send("正解")
        res.redirect("/correct.html")
    } else {
        // res.send("不正解")
        res.redirect("/wrong.html")
    }
})

// アプリ起動後のログ確認用
// heroku用のポートを参照、ローカルで動く際は3000を参照
const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log("runnning!")
})