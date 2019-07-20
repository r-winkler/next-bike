# Datenquellen

# Index
```
```

# Mongo

```
mongo ds353457.mlab.com:53457/heroku_51s2gcdv -u rene -p rene123
```

# Datenimport

```
mongoimport --db test --collection bikes --drop --file "C:\Users\René Winkler\Desktop\data\bikes.json" --jsonArray

mongoimport -h ds353457.mlab.com:53457 -d heroku_51s2gcdv -u rene -p rene123 --collection bikes --drop --file "C:\Users\René Winkler\Desktop\data\bikes.json" --jsonArray
```

Thun
```
7.616276, 46.735265
```


```
db.bikes.find(
   {
     "geometry":
       { $near:
          {
            $geometry: { type: "Point",  coordinates: [ 7.616276, 46.735265 ] },
            $minDistance: 0,
            $maxDistance: 300
          }
       }
   }
).pretty()
```
