const PlayFab = require('playfab-sdk')

const getCurrentValue = () => {
  const GetValue = {
    TitleId: PlayFab.settings.titleId,
    StatisticName: 'Money'
  }
  PlayFab.PlayFabClient.GetPlayerStatistics(GetValue, (e, r) => {
    if (r !== null) {
      return { isSuccess: true, balance: r?.data?.Statistics[0]?.Value }
      /*
        r.data.Statistics.forEach((entity) => {
          if (entity.StatisticName === 'Money') {
            DoUpdateValue(entity.Value)
          }
        })
        */
    } else if (e !== null) {
      return {
        isSuccess: false,
        message: String(PlayFab.GenerateErrorReport(e))
      }
    }
  })
}

const login = (email, password) => {
  PlayFab.settings.titleId = '54879'

  const loginRequest = {
    TitleId: PlayFab.settings.titleId,
    CustomId: '9DMX68ZWZC4J66B1PTEKYHBRMBDYX1I8E1ZO5CFW385HRDGO78',
    Email: email,
    Password: password
  }
  return PlayFab.PlayFabClient.LoginWithEmailAddress(loginRequest, (e, r) => {
    if (r !== null) {
      const currentValue = getCurrentValue()
      if (!currentValue?.isSuccess)
        return {
          statusCode: 400,
          data: null,
          error: { message: currentValue?.message }
        }

      return {
        statusCode: 200,
        data: { balance: currentValue?.balance },
        error: null
      }
    } else if (e !== null)
      return {
        statusCode: 400,
        data: null,
        error: { message: String(PlayFab.GenerateErrorReport(e)) }
      }
  })
}

function DoUpdateValue(currentValue) {
  const SubmitValueRequest = {
    TitleId: PlayFab.settings.titleId,

    Statistics: [
      {
        StatisticName: 'Money',
        // this the line u should change the 200
        Value: currentValue + 200
      }
    ]
  }

  return PlayFab.PlayFabClient.UpdatePlayerStatistics(
    SubmitValueRequest,
    (e, r) => {
      if (r !== null) {
        console.log('Congratulations :)')
      } else if (e !== null) {
        console.log(
          'Something went wrong with your first API call.\n' +
            "Here's some debug information:\n" +
            PlayFab.GenerateErrorReport(error)
        )
      }
    }
  )
}

//DoExampleLoginWithCustomID('TestMail@gmail.com', '12345678')

module.exports = { login }
