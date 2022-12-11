const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
require('dotenv').config()

app.use(cors())

app.use(logger('dev'))

app.use('*', (req, res) => {
  res.status(404).send({
    statusCode: 404,
    data: null,
    error: {
      message: '404 Not Found',
      message_locale: 'صفحه یافت نشد'
    }
  })
})

app.listen(process.env.PORT)

function DoExampleLoginWithCustomID() {
  PlayFab.settings.titleId = '54879'

  var email = document.getElementById('email').value
  var passwd = document.getElementById('password').value

  var loginRequest = {
    // Currently, you need to look up the required and optional keys for this object in the API reference for LoginWithCustomID. See the Request Headers and Request Body.
    TitleId: PlayFab.settings.titleId,
    CustomId: '9DMX68ZWZC4J66B1PTEKYHBRMBDYX1I8E1ZO5CFW385HRDGO78',
    Email: email,
    Password: passwd
  }
  PlayFabClientSDK.LoginWithEmailAddress(loginRequest, LoginCallback)
}

// callback functions take two parameters: result and error
// see callback functions in JavaScript if unclear
var LoginCallback = function (result, error) {
  if (result !== null) {
    document.getElementById('resultOutput').innerHTML =
      'Congratulations, you made your first successful API call!'
    GetCurrentValue()
  } else if (error !== null) {
    document.getElementById('resultOutput').innerHTML =
      'Something went wrong with your first API call.\n' +
      "Here's some debug information:\n" +
      PlayFab.GenerateErrorReport(error)
  }
}

function GetCurrentValue() {
  var GetValue = {
    TitleId: PlayFab.settings.titleId,
    StatisticName: 'Money'
  }

  PlayFabClientSDK.GetPlayerStatistics(GetValue, GetDataCallback)
}

var GetDataCallback = function (result, error) {
  if (result !== null) {
    document.getElementById('resultOutput').innerHTML =
      'Current Money : ' + result.data.Statistics[0].Value

    result.data.Statistics.forEach((element) => {
      if (element.StatisticName == 'Money') {
        DoUpdateValue(element.Value)
      }
    })
  } else if (error !== null) {
    document.getElementById('resultOutput').innerHTML =
      'Something went wrong with your first API call.\n' +
      "Here's some debug information:\n" +
      PlayFab.GenerateErrorReport(error)
  }
}

function DoUpdateValue(currentValue) {
  var SubmitValueRequest = {
    TitleId: PlayFab.settings.titleId,

    Statistics: [
      {
        StatisticName: 'Money',
        // this the line u should change the 200
        Value: currentValue + 200
      }
    ]
  }

  PlayFabClientSDK.UpdatePlayerStatistics(
    SubmitValueRequest,
    DataUpdateCallback
  )
}

var DataUpdateCallback = function (result, error) {
  if (result !== null) {
    document.getElementById('resultOutput').innerHTML = 'Congratulations :)'
  } else if (error !== null) {
    document.getElementById('resultOutput').innerHTML =
      'Something went wrong with your first API call.\n' +
      "Here's some debug information:\n" +
      PlayFab.GenerateErrorReport(error)
  }
}
