const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

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


router.get('/',(req,res,next)=>{
    res.json({place : DUMMY_PLACES});

}); 

router.get('/:pid',(req,res,next)=>{
    //console.log(req.params.pid);
    const place = DUMMY_PLACES.find(p =>{
        return p.id == req.params.pid;
    });
   // console.log(place);
    if(!place){
        const error =  new Error('lugar no existe para el id especificado');
        error.code = 404;
        next(error);
        //const error ='Lugar no existe';
        //res.json({error});
    }
    else{
        res.json({place});
    }
});

router.get('/users/:uid',(req,res,next)=>{
    const places = DUMMY_PLACES.find(p=>{
        return p.creator === req.params.uid
    });

    /*if(!places){
        throw new Error('lugar no existe para el id del ususario especificado');
    }

    res.json(places);*/

   if(!places){
        const error = new HttpError('lugar no existe para el id del ususarionpnm especificado',404);
        throw error;
    }
    res.json({places});
});

router.post('/', (req,res,next)=>{
    const { title, creator} = req.body;
    const createdPlace = {
        title,
        creator
    };
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({place:createdPlace});

});

module.exports = router;
