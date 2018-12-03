//-----------------------------------
/*
Code still can't handle two cases:
1. It crashes whenever the user tries to search for available without having entered any input
2. It crashes whenever the user enters submit too many times without choosing anything
*/
//-----------------------------------
var express = require('express')
var router = express.Router()
//to interact with the databea and make queries
var dataB = require("../helpers/mysqlConnection").mysql_pool;

// define the home page route
//basically page response as in the layout, buttons, all html stuff, etc
router.get('/:id', function (req, res) {

<<<<<<< HEAD
  //=======================VARIABLES================================
  var layName = './Student/STUD_APP_HUB_PT2';  //sets up the name of the layout to be
  var titleName = 'Professor';  //sets up window
  const userName = req.cookies.graph_user_name;  //records userName again to display in the tab
  var profEmail = req.params.id;
  var parms = {title: titleName};    //sets up the names of the variables used in hbs
=======
  // ================= VARIABLES ==================
  var layName     = './Student/STUD_APP_HUB_PT2';       // Sets up the name of the layout to be
  var titleName   = 'Professor';  //sets up window
  const userName  = req.cookies.graph_user_name;        // Records user's Name.
  const userEmail = req.cookies.graph_user_email;       // Record user's Email.
  var profEmail   = req.params.id;
  var parms       = {title: titleName};                 // Sets up the names of the variables used in hbs
>>>>>>> db7cc10a7f6ccef2f565774fbda9116802e09f80


  //if a value exists in the username variable
  if(userName){

    //object that will be sent to the hbs fie for the variables to be displayed
    parms.user = userName;

    //defines the query i want to make
    let query = `SELECT name, email, start, end, Day
                 FROM Users NATURAL JOIN ProfHours
                 WHERE email = '${profEmail}'`;

    // establishes connection to database
    dataB.getConnection(function(err, connection){

      //to make the query to the dataBase
      connection.query(query, function(error, results, fields){

        if (error) throw error;

        // result of query is called results
        // it is an array
        // which the first index is given by
        // and the second is given by name
        // an example of how to call a similar array would be like
        // var array1 = {once: "once", twice: "twice"}
        // var array2 = [array1];
        // console.log(array2[0]["once"]);
        // example using the results array
        // console.log(results[0]["profName"]);

        // ==== Variables for frondEnd ====
        parms.profName  = results[0]["name"];
        parms.profEmail = results[0]["email"];
        parms.layout    = layName;

        res.render(layName, parms);
      });
    });
      //devines a variable in the object parms and defines it as the userName
  } else {
    res.redirect('/');
  }

  //res.send('Birds home page')
});

//POST REQUEST
router.post('/:id', function (req, res) {

  //===============VARIABLES====================
  var titleName  = 'Professor';  //sets up window

  var layName     = './Student/STUD_APP_HUB_PT2';       // Sets up the name of the layout to be.
  var titleName   = 'Professor';                        // Sets up window.
  const userName  = req.cookies.graph_user_name;        // Records user's Name.
  const userEmail = req.cookies.graph_user_email;       // Record user's Email.
  var profEmail   = req.params.id;
  var parms       = {title: titleName};                 // Sets u

  /* ======== VARAIBLES ======= */

  var date;
  var dateSearch;
  var id;
  var myID;
  var profID;
  var timeChoice;
  var dateChoice;
  var arr = [];
  var time = [];

  if(req.body.button != undefined) {
    dateSearch = req.body.button;
  }

  //just get the day
  if (dateSearch != undefined) {

    //get date
    if(req.body.date != undefined) {
      date  = req.body.date;

      parms.date = date;

      //fill up the array with date
      arr.push(date.split(","));
    }

    let day = arr[0][0].trim();

    // //query for
    let query = `SELECT name, email, start, end, Day
                 FROM Users NATURAL JOIN ProfHours
                 WHERE email = '${profEmail}' AND day = '${day}'`;

    dataB.getConnection(function(err, connection){

      if(err) throw err;

      connection.query(query, function(error, results, fields) {

        /*========= Variables for FrondEnd =========*/

        parms.results   = results;
        parms.user      = userName;
        parms.profName  = results[0]["name"];
        parms.profEmail = results[0]["email"];
        parms.layout    = layName;

        res.render(layName, parms);
      });
    });
    } else {

      dateChoice= req.body.btnSt;
      console.log(dateChoice);
      timeChoice = String(req.body.hourChoice);

      console.log(timeChoice);
      time.push(timeChoice.split(","));
      console.log(time[0]);



      let query_1 = `SELECT userID
                     FROM Users
                     WHERE email = '${userEmail}'`;
      let query_2 = `SELECT userID
                      FROM Users
                      WHERE email = '${profEmail}'`;



      dataB.getConnection(function(err, connection){
        if(err) throw err;

        connection.query(query_1, function(error, results, fields){

          myID = results[0]['userID'];
          console.log(myID);

          connection.query(query_2, function(error, results, fields){

            profID = results[0]['userID'];
            console.log(profID);

            console.log("Values are: " + myID + " " + time[0][0] + " " + time[0][1] + " " + dateChoice + " " + profID);

            let query_3 = `INSERT INTO Appointment(userID, start, end, date, status, profID) VALUES('${myID}','${time[0][0]}','${time[0][1]}','${dateChoice}','Pending','${profID}');`;

            console.log(query_3);

            connection.query(query_3, function(error, results, fields){
              console.log(results);

              console.log("Values are: " + myID + " " + time[0][0] + " " + time[0][1] + " " + dateChoice + " " + profID);

            });

          });

        });

      });

      res.redirect(`/home/appointment/${profEmail}`);
  }
});


module.exports = router
