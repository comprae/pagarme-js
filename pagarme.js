// var mandatoryCardDataFields = ['card_number', 'card_holder_name', 'card_expiracy_date', 'card_cvv'];

function PagarMeCreditCard() {
	this.cardNumber = null;
	this.cardHolderName = null;
	this.cardExpiracyDate = null;
	this.cardCVV = null;
}

PagarMeCreditCard.prototype.stringifyParameters = function() {
	var encryptionHash = {
		'card_number': this.cardNumber,
		'card_holder_name': this.cardHolderName,
		'card_expiracy_date': this.cardExpiracyDate,
		'card_cvv': this.cardCVV,
	}

	var parametersArray = new Array();
	for(var key in encryptionHash) {
		parametersArray.push(key + "=" + encryptionHash[key]);
	}

	return parametersArray.join("&");
}

PagarMeCreditCard.prototype.generateHash = function() {
	var stringifiedParameters = this.stringifyParameters();
	console.log(stringifiedParameters);

	// Our public key
	var publicKey = "-----BEGIN PUBLIC KEY-----\
		MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3+L/5UB2xen6FnMjpQo7\
		ZOfoeYd4DFW7OtdQKqGRXdI4JYctZlbBbU5OoNH5clIZxUYi9sG15g8iieYxc77E\
		ZLSJFx+H7NuzeOBBQuCT7liYFiCm7LH0iyqPnFYQOoYHvibB+zVEm9/H5+qE3i1i\
		ZBuvT/5v0o4iemVLNzIGJs360atEHHnKjfqhpobzXQ0+BdqYu2VWEsCzhFRDt+yp\
		O8ZBcI+Fd0+SZYjOw0tyE1NousG5TvnST1SApucb44bD2PEIQ1RzTNRzhc+NVoTu\
		LYvotLGCm/SxJUkX/0RIMw6VJq1gXAGUdKE/W1ScFkGBbtyoqWvtlvvg9gQdmFLC\
		XwIDAQAB\
		-----END PUBLIC KEY-----";

	console.log(publicKey);

	var key = RSA.getPublicKey(publicKey);
	var encryptedString = RSA.encrypt(stringifiedParameters, publicKey);

	console.log(encryptedString);
}
