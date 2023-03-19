# innerCircle - API unit testing in nodejs

## steps 

1. Clone the repo
2. Install dependencies `npm install`
3. Start your local mongo server and create a collection called 'crud'
4. To run server `npm start`
5. To run unit test `npm test` 

## API documentation
https://documenter.getpostman.com/view/23120878/2s93JzMggN

###Debug
stop server before running test and stop test before running server, because both will run on same port.
If you are getting port already in use error, then run `kill -9 $(lsof -ti:3001)`   (linux machines only)

© avinashsudhanshu@gmail.com | 2023
