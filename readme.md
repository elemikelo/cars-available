Calculate availability of cars according to two dates given (Start Date, End Date). But considering how many rented cars are going to be used, that is, you can use the same car for different rents always and when the dates dont overlap.

## How to start

Cloning repository
```
https://github.com/elemikelo/cars-avalaible
```

1) Enter to the folder of the project:

```
$ cd cars-available
```

2) Install Dependencies:

```
$ npm install
```

3) Run scripts 'Install_db' for add users and advertisements. (Note: Run Mongo DB previously):

```
$ npm run installDB 
```


4) Start with the project:
```
$ npm start
```

## Example

Cars stock = 10 🚕 🚗 🚙 🚙 🚕 🚕 🚗 🚗 🚗 🚙

Date cars rented: 📆 ✅
```
    STARTS DATE           ENDS DATE
['06/20/2017 16:00', '06/24/2017 16:00'],
['06/20/2017 16:00', '06/30/2017 16:00'],
['06/22/2017 16:00', '06/26/2017 16:00'],
['06/24/2017 16:01', '06/29/2017 16:00'],
['06/24/2017 17:00', '06/30/2017 16:00']
```

Date requested by the client:
```
    START DATE            END DATE
['06/19/2017 16:00','06/30/2017 16:00']

```

Return :

```
Cars available: 6 
Reserved Car, thanks

```





