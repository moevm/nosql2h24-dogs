## mongo
`docker exec -it nosql2h24-dogs-mongodb-1 bash`    
`mongosh "mongodb://root:secret@llocalhost:27017" --username root --authenticationDatabase admin`    
`use cats`     
`db.breeds.find({"name":"Abyssinian"}, {"rare": 0})`
`db.breeds.find({name: {$in: ["Chartreux", "Abyssinian"]}})`
