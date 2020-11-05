var Quiz = function()
{
    this.curScreenID = "intro";
    this.eligible = true;
    this.totalQs = 10;
    this.answeredQs = 0;
    this.correctAnswers = 0;
    this.enemyPool = [{"name": "Roy", "type": "melee"},
    {"name": "Lemmy", "type": "melee"},
    {"name": "Morton", "type": "melee"},
    {"name": "Captain Goomba", "type": "melee"},
    {"name": "Chain Chomp", "type": "melee"},
    {"name": "Goomba", "type": "melee"},
    {"name": "Goomba Tower", "type": "melee"},
    {"name": "Koopa Troopa (Green)", "type": "melee"},
    {"name": "Private Goomp", "type": "melee"},
    {"name": "Big Tail Goomba", "type": "melee"},
    {"name": "Koopa Troopa (Red)", "type": "melee"},
    {"name": "Captain Koopa Troopa", "type": "melee"},
    {"name": "Buzzy Beetle", "type": "melee"},
    {"name": "Spike Top", "type": "melee"},
    {"name": "Spiny", "type": "melee"},
    {"name": "Mechakoopa", "type": "melee"},
    {"name": "Pokey", "type": "melee"},
    {"name": "Horned Ant Trooper", "type": "melee"},
    {"name": "Bob-ombs", "type": "melee"},
    {"name": "Bully", "type": "melee"},
    {"name": "Paragoomba", "type": "flying"},
    {"name": "Koopa Paratroopa (Green)", "type": "flying"},
    {"name": "Koopa Paratroopa (Red)", "type": "flying"},
    {"name": "Koopa Paratroopa Trio", "type": "flying"},
    {"name": "Corporal Paraplonk", "type": "flying"},
    {"name": "Para-Beetle", "type": "flying"},
    {"name": "Parabones", "type": "flying"},
    {"name": "Lakitu", "type": "flying"},
    {"name": "Boo", "type": "flying"},
    {"name": "Bomb Boo", "type": "flying"},
    {"name": "Tail Boo", "type": "flying"},
    {"name": "Big Boo", "type": "flying"},
    {"name": "Captain Boo", "type": "flying"},
    {"name": "Para-Biddybud (Red)", "type": "flying"},
    {"name": "Para-Biddybud (Green)", "type": "flying"},
    {"name": "Para-Biddybud (Yellow)", "type": "flying"},
    {"name": "Para-Biddybud (Purple)", "type": "flying"},
    {"name": "Swoop", "type": "flying"},
    {"name": "Fly Guy", "type": "flying"},
    {"name": "Larry", "type": "ranged"},
    {"name": "Ludwig", "type": "ranged"},
    {"name": "Dry Bones", "type": "ranged"},
    {"name": "Shy Guy (Red)", "type": "ranged"},
    {"name": "Shy Guy (Yellow)", "type": "ranged"},
    {"name": "Shy Guy (Pink)", "type": "ranged"},
    {"name": "Spear Guy", "type": "ranged"},
    {"name": "Captain Shy Guy", "type": "ranged"},
    {"name": "Sergeant Guy", "type": "ranged"},
    {"name": "Ninji", "type": "ranged"},
    {"name": "Hammer Bro", "type": "ranged"},
    {"name": "Ice Bro", "type": "ranged"},
    {"name": "Fire Bros.", "type": "ranged"},
    {"name": "Boomerang Bro", "type": "ranged"},
    {"name": "Fire Stalking Piranha Plant", "type": "ranged"},
    {"name": "Spike", "type": "ranged"},
    {"name": "Bandit", "type": "ranged"},
    {"name": "Magikoopa (White)", "type": "ranged"},
    {"name": "Magikoopa (Red)", "type": "ranged"},
    {"name": "Magikoopa (Green)", "type": "ranged"}];

    this.curEnemy;
    this.curAttackType;
    this.correctType;

    this.screenAnimating = false;
}

Quiz.prototype.winLoaded = function()
{
    // LISTENERS
    $(".progress-screen-btn").on("click", this.progressScreen.bind(this));

    //myNintendo Login
    MyNintendo.login();

    // TESTING
    // this.createIntro();
}

Quiz.prototype.progressScreen = function(e)
{
    var self = this;
    if (this.screenAnimating)
        return;
        
    this.screenAnimating = true;

    var nextScreen = $(e.target).closest(".wobbler-button").attr("data-next-screen-id");

    if (nextScreen == "question")
    {
        this.createQuestion();
    }
    else if (nextScreen == "answer")
    {
        this.answeredQs++;

        this.curAttackType = $(e.target).closest(".wobbler-button");

        // if (this.answeredQs == this.totalQs)
        // {
        //     this.checkAnswer();
        //     nextScreen = "results";
        //     $("#quiz #jr").addClass("results");
        //     this.createResults();
        // }
        // else
        // {
            this.checkAnswer();
            this.createAnswer();
        // }
    }
    else if (nextScreen == "results")
    {
        $("#quiz #jr").addClass("results");
        this.createResults();
    }

    $("#quiz .screen.show").addClass("hide");
    $("#quiz .screen.hide").on("transitionend", function() { 
        self.screenAnimating = false; 
        $("#quiz .screen.hide").removeClass("show").removeClass("hide"); 
    });
    $("#quiz .screen#" + nextScreen).addClass("show");
}

Quiz.prototype.createIntro = function(user)
{
    console.log("createIntro ", user);

    $("#quiz #intro #waiting").css({"display":"none"});
    $("#quiz #intro #ready").css({"display":"block"});

    if (user != null)
    {
        var eligibleCountries = ["AG", "AI", "AN", "AR", "AW", "BB", "BM", "BO", "BR", "BS", "BZ", "CA", "CL", "CO", "CR", "DM", "DO", "EC", "GD", "GM", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MS", "MX", "NI", "PA", "PE", "PY", "SR", "SV", "TC", "TT", "US", "UY", "VC", "VE", "VG"];

        if (eligibleCountries.indexOf(user.country) < 0)
        {
            // INELIGIBLE
            console.log("ineligible for points");
            this.eligible = false;
            $("#quiz .eligible").css({"display":"none"});
            $("#quiz .ineligible").css({"display":"block"});
        }
        else
        {
            // ELIGIBLE
            $("#quiz .ineligible").css({"display":"none"});
            $("#quiz .eligible").css({"display":"block"});
        }
    }
    else if (user == null)
    {
        // POTENTIALLY ELIGIBLE (LOGGED OUT)
        $("#quiz .ineligible").css({"display":"none"});
        $("#quiz .eligible").css({"display":"block"});
    }
}

Quiz.prototype.createQuestion = function() 
{
    this.curEnemy = this.enemyPool.splice(Math.round(Math.random()*this.enemyPool.length), 1)[0];

    // console.log(this.curEnemy, this.curEnemy.name, this.curEnemy.type);

    // UPDATE IMAGE
    // todo

    // UPDATE COPY
    $(".modal #quiz #question #enemy").removeClass("flying").removeClass("ranged").removeClass("melee"); // reset
    $(".modal #quiz #question #enemy").addClass(this.curEnemy.type).text(this.curEnemy.name);
}

Quiz.prototype.createAnswer = function() 
{
    //reset
    $(".modal #quiz #answer h2:nth-of-type(2) span").removeClass("show");
    $(".modal #quiz #quiz-wrapper #answer .type").removeClass("flying").removeClass("ranged").removeClass("melee");
    $(".modal #quiz #quiz-wrapper #answer .wobbler-frame .type-img").removeClass("show");

    // SET ENEMY NAME
    $(".modal #quiz #quiz-wrapper #answer .wobbler-frame.curEnemy h3 .enemy-name").text(this.curEnemy.name);
    $(".modal #quiz #quiz-wrapper #answer .wobbler-frame.correctType .enemy-name").text(this.curEnemy.name);
    // SET ENEMY TYPE
    $(".modal #quiz #quiz-wrapper #answer .wobbler-frame.curEnemy .type").addClass(this.curEnemy.type).text(this.curEnemy.type.charAt(0).toUpperCase() + this.curEnemy.type.slice(1));
    // SET ENEMY IMAGE
    $(".modal #quiz #quiz-wrapper #answer .wobbler-frame.curEnemy .type-img."+ this.curEnemy.type).addClass("show");

    // console.log("enemy type = ", this.curEnemy.type);
    // console.log("selected type = ", this.curAttackType.attr("class"))

   // SET ATTACK TYPE
   $(".modal #quiz #quiz-wrapper #answer .wobbler-frame.correctType .type").addClass(this.correctType).text(this.correctType.charAt(0).toUpperCase() +  this.correctType.slice(1));
   // SET ATTACK IMAGE
   $(".modal #quiz #quiz-wrapper #answer .wobbler-frame.correctType .type-img." +  this.correctType).addClass("show");
   
   if (($(this.curAttackType).hasClass("melee") && this.curEnemy.type == "ranged") ||
      ($(this.curAttackType).hasClass("ranged") && this.curEnemy.type == "flying") ||
      ($(this.curAttackType).hasClass("flying") && this.curEnemy.type == "melee"))
   {
       // correct answer
       $(".modal #quiz #answer h2:nth-of-type(2) span.correct").addClass("show");
   }
   else 
   {
       // incorrect answer
       $(".modal #quiz #answer h2:nth-of-type(2) span.incorrect").addClass("show");
   }

   // UPDATE PROGRESS BUTTON
   if (this.answeredQs == this.totalQs)
   {
        $(".modal #quiz #answer .wobbler-button.next").removeClass("show");
        $(".modal #quiz #answer .wobbler-button.results").addClass("show");
   }

}

Quiz.prototype.checkAnswer = function()
{
    this.correctType;
    if (this.curEnemy.type == "melee")
         this.correctType = "flying";
    else if (this.curEnemy.type == "ranged")
         this.correctType = "melee";
    else if (this.curEnemy.type == "flying")
         this.correctType = "ranged";

    if (($(this.curAttackType).hasClass("melee") && this.curEnemy.type == "ranged") ||
      ($(this.curAttackType).hasClass("ranged") && this.curEnemy.type == "flying") ||
      ($(this.curAttackType).hasClass("flying") && this.curEnemy.type == "melee"))
    {
       // correct answer
       this.correctAnswers++;
    }
}

Quiz.prototype.createResults = function()
{
    // console.log("correct answers ", this.correctAnswers);
    $(".modal #quiz #quiz-wrapper #results h3 #count").text(this.correctAnswers);

    var alreadyPlayed = localStorage.getItem("mlbis-quiz-played"); 

    if (this.eligible && !alreadyPlayed)
        MyNintendo.missionStep();

    localStorage.setItem("mlbis-quiz-played", true)

    console.log(alreadyPlayed);
}

var quiz = new Quiz();