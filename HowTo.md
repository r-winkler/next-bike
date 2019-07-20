# Datenquellen

# Datenimport

```
mongoimport --db test --collection bikes --drop --file "C:\Users\René Winkler\Desktop\bikes.json" --jsonArray
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