# Next POI

Quick and dirty MEAN Stack App. Zeigt die nächst gelegene Veloverleihstation an.

https://shielded-bastion-82542.herokuapp.com/


# Datenquellen

https://opendata.swiss/de/dataset/bikesharing-und-veloverleihsysteme2


# Mongo

```
mongo ds353457.mlab.com:53457/heroku_51s2gcdv -u ${username} -p ${password}
```

# Datenimport
Json runterladen und manuall zuschneiden. Datei befindet sich in Ordner 'data'.

lokal
```
mongoimport --db test --collection bikes --drop --file "C:\Users\René Winkler\IdeaProjects\next-poi\data\bikes.json" --jsonArray
```

heroku
```
mongoimport -h ds353457.mlab.com:53457 -d heroku_51s2gcdv -u ${username} -p ${password} --collection bikes --drop --file "C:\Users\René Winkler\IdeaProjects\next-poi\data\bikes.json" --jsonArray
```

# Index

Die geospatial Suche benötigt einen Index. Via mongo shell anlegen:

```
db.collection.createIndex( { geometry: "2dsphere" } 
```

# Standort simulieren

via F12 in Dev Tools / Tools/ Sensor

Thun
```
7.616276, 46.735265
```


# Geospatial query
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


# Deplyoment auf Heroku

Sehr mühsam :-(

* Verzeichnisstruktur muss genau dem Projekt hier entsprechen (backend und frontend zusammen, ein package.json...)
* Dieser Anleitung folgen: https://devcenter.heroku.com/articles/mean-apps-restful-api
* Obwohl man 'heroku login' macht wird beim git push heroku master ein username und passwort angefordert (username = email-adresse, password = api-key => In heroku-dashboard unter account-settings / account / api-key / reveal ersichtlich)
* Kreditkarte muss hinterlegt werden, damit 'heroku addons:create mongolab' funktioniert
* in mLab muss ein User angelegt werden, damit Verbindung funktioniert (Users / add database user)

