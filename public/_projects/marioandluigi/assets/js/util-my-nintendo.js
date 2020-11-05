var MyNintendo = function() {
  // static class;
  throw new Error('Do not instantiate');
}

MyNintendo.login = function() {

  var testId = "3a50782a6d1c36f6";
  var productionId = "861e076b775cf6ec";

  MyNintendo.missionId = (_buildType === "production") ? productionId : testId;

  nclood.Accounts.ready(function() {

    console.info('User:', nclood.Accounts.currentUser);

    function setLoginState(loggedIn) {
      // loggedIn = true;
      if (loggedIn) {
        $(document.body).addClass('my-nintendo-logged-in');
        $(document.body).removeClass('my-nintendo-logged-out');
      } else {
        $(document.body).addClass('my-nintendo-logged-out');
        $(document.body).removeClass('my-nintendo-logged-in');
      }
    }

    // Getting the current user
    var user = nclood.Accounts.currentUser;
    if (user) {
        console.info(user.nickname + ' is logged in.');
      setLoginState(true);
      _loggedIn = true;
      quiz.createIntro(user);
    } else {
      console.info('User is not logged in.');
      setLoginState(false);
      _loggedIn = false;
      quiz.createIntro();
    }
    // Run code on login
    nclood.Accounts.onLogin(function(user) {
      console.info(user.nickname + ' is logging in.');
      _loggedIn = true;
      setLoginState(true);
      // _modal.onLoginStateChange();
      quiz.createIntro(user);
    });
    // Run code after logout
    nclood.Accounts.onLogout(function(user) {
      console.info(user.nickname + ' is logging out.');
      _loggedIn = false;
      setLoginState(false);
      quiz.createIntro();
      // _modal.onLoginStateChange();
    });
  });

}

MyNintendo.missionStep = function() {

  var missionId = MyNintendo.missionId;

  Alps.Api.progressMissionStatus(missionId, function(success, httpStatus, errorCode) {
    if (success) {
      // Mission was successfully progressed by 1
      console.info("Mission was successfully progressed by 1.");
    } else {
      // Mission has either been completed already or an error occurred
      if (errorCode)
        console.info("Mission error code: \n", errorCode)
      else
        console.info("Mission has been completed already.");
    }
  });
}
