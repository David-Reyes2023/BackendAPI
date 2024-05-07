const express = require('express'); 

const app  = express();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Rotonda',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Centro Civico',
        creator: 'u2'
    }
];

app.get('/api/places',(req,res,next)=>{
    const places = DUMMY_PLACES;
    res.send(places);
    next();
});

app.get('/api/places/:pid',(req,res,next)=>{
    const places = DUMMY_PLACES.find(p =>{
        return p.id == req.params.pid;
    });
    res.send(places);
    next();
});


app.listen(3000);