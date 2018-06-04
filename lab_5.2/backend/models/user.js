/**
 * Created by akv on 11.08.16.
 */
function Coin(json) {
	this.id = (json.id || "").toLowerCase();
	this.fullName = json.fullName;
	this.birthday = new Date(json.birthday);
	this.profession = json.profession;
	this.email = json.email;
	this.address = json.address;
	this.country = json.country;
	this.shortInfo = json.shortInfo;
	this.fullInfo = json.fullInfo;
}
Coin.prototype = {
	isSame: function(other) {
		return this.id === other.id;
	}
};
module.exports = Coin;