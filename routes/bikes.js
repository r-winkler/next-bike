import express from 'express';
import {MongoClient} from 'mongodb'

import * as geolib from 'geolib';

const router = express.Router();

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'heroku_51s2gcdv';
const mongo = new MongoClient(url);


const findDocuments = (db, dist, lon, lat) => new Promise((resolve, reject) => {
    db.collection('bikes')
        .find(
            {
                "geometry":
                    {
                        $near:
                            {
                                $geometry: {type: "Point", coordinates: [lon, lat]},
                                $minDistance: 0,
                                $maxDistance: dist
                            }
                    }
            }
        )
        .toArray((err, data) => err ? reject(err) : resolve(data));
});

router.get('/', async (req, res, next) => {

    const dist = parseInt(req.query.dist, 10);
    const lon = parseFloat(req.query.lon);
    const lat = parseFloat(req.query.lat);



    try {
        await mongo.connect();
        const db = mongo.db(dbName);
        const result = await findDocuments(db, dist, lon, lat);


        const res2 = result.map(res => {
            const dist = geolib.getDistance(
                {latitude: lat, longitude: lon},
                {latitude: res.geometry.coordinates[1], longitude: res.geometry.coordinates[0]});
            return {
            ...res, distance: dist
            }
        });

        res.json(res2);
    } catch (e) {
        next(e)
    }
});


module.exports = router;
