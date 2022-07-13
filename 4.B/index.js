const express = require("express");

const db = require('./connection/db');
const upload = require('./middlewares/uploadFile');

const app = express();
const PORT = 6545;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});



app.set("view engine", "hbs"); 

app.use("/public", express.static(__dirname + "/public"));

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    db.connect(function (err, client, done){
      if (err) throw err;
  
      const query = 'SELECT * FROM provinsi_tb';
  
      client.query(query, function(err,result){
        if (err) throw err;
  
        const provinsiData = result.rows;
  
        const newProvinsi = provinsiData.map((provinsi)=>{
            provinsi.photo = provinsi.photo
            ? '/uploads/' + provinsi.photo : '/public/assets/picture.png';
            return provinsi;
          });
  
        res.render("index", { prov: newProvinsi });
  
      });
      done();
      
    });
  });

  app.get("/kabupaten", (req, res) => {
    db.connect(function (err, client, done){
      if (err) throw err;
  
      const query = 'SELECT * FROM kabupaten_tb';
  
      client.query(query, function(err,result){
        if (err) throw err;
  
        const kabupatenData = result.rows;
  
        res.render("kabupaten", { kab: kabupatenData });
  
      });
      done();
      
    });
  });

  app.get("/detail/:id", (req, res) => {
    const id = req.params.id;
  
    db.connect(function (err, client, done) {
      if (err) throw err;
      const query = `SELECT * FROM provinsi_tb WHERE id = ${id}`;
  
      client.query(query, function (err, result) {
        if (err) throw err;
  
        const prov = result.rows[0];
  
        prov.photo = prov.photo
        ? '/uploads/' + prov.photo
        : '/public/default.jpg';
  
        res.render('detail', { prov });
      });
  
      done();
    });
  });

  app.get("/delete-provinsi/:id", (req, res) => {
    const id = req.params.id;
  
    db.connect(function (err, client, done) {
      if (err) throw err;
  
      const query = `DELETE FROM provinsi_tb WHERE id = ${id};`;
  
      client.query(query, function (err, result) {
        if (err) throw err;
  
        res.redirect('/');
      });
  
      done();
    });
  });

  app.get("/delete-kabupaten/:id", (req, res) => {
    const id = req.params.id;
  
    db.connect(function (err, client, done) {
      if (err) throw err;
  
      const query = `DELETE FROM kabupaten_tb WHERE id = ${id};`;
  
      client.query(query, function (err, result) {
        if (err) throw err;
  
        res.redirect('/kabupaten');
      });
  
      done();
    });
  });

  app.get("/add-provinsi", (req, res) => {
    res.render("add-provinsi");
  });
  
  app.post("/add-provinsi", upload.single('image'), (req, res) => {
    const nama = req.body.nama;
    const diresmikan = req.body.diresmikan;
    const pulau = req.body.pulau;
    const fileName = req.file.filename;

    db.connect(function (err, client, done) {
      if (err) throw err;
  
      const query = `INSERT INTO provinsi_tb(nama,diresmikan,photo,pulau) VALUES('${nama}','${diresmikan}','${fileName}','${pulau}');`;
  
      client.query(query, function (err, result) {
        if (err) throw err;
  
        res.redirect('/');
      });
  
      done();
    });
  });

  app.get("/edit-provinsi/:id", (req, res) => {
    const id = req.params.id;
  
    db.connect(function (err, client, done) {
      if (err) throw err;
      const query = `SELECT * FROM provinsi_tb WHERE id = ${id}`;
  
      client.query(query, function (err, result) {
        if (err) throw err;
  
        const provinsi = result.rows[0];
  
        res.render('edit-provinsi', { prov:provinsi, id });
      });
  
      done();
    });
  });

  app.post("/edit-provinsi/:id", upload.single('image'), (req, res) => {
    const id = req.params.id;
    const nama = req.body.nama;
    const diresmikan = req.body.diresmikan;
    const pulau = req.body.pulau;
    const fileName = req.file.filename;
  
    db.connect(function (err, client, done) {
      if (err) throw err;
  
      const query = `UPDATE provinsi_tb SET nama='${nama}',diresmikan='${diresmikan}',photo='${fileName}',pulau='${pulau}' WHERE id='${id}';`;
  
      client.query(query, function (err, result) {
        if (err) throw err;
  
        res.redirect('/');
      });
  
      done();
    });
  });