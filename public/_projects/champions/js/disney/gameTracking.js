var gamenametitle = 'insert_game_id';
document.title = "Insert Game Title";
               
var gn = gamenametitle.split("_");
 
var ctoAssetTypeCode='gam';
var ctoGameEvent='load';                            //'load' for now
var ctoGameBuCode='insert_bu_code';           //Replace** twds | dc | xd | djr
var ctoGameSeriesCode= gn[0];    //BU code
var ctoGameOwnerName='insert_owner_name';         //dol
var ctoGameTypeCode= gn[1];          //spl or mp
var ctoGameGenreCode= gn[2];         //Game Genre
var ctoGameName= gn[3];                          //Game Name
var ctoAssetId='insert_asset_id';               //Replace ** ID from CMS
 
function gameStart() {
// *@* Insert Game Start code to run the game if sitelocking does not fail
	flambe.embed(["targets/main-html.js"], "embedtarget");
}