module.exports = {
	isDebug: false,
	shouldRedirectOriginal: function(req) {

		//included in all recommended not be overridden
		//but allows flexibility to do so
		return ( (req.subdomains.indexOf('www') != -1 && req.originalUrl == '/')
							|| req.originalUrl.indexOf('/login') == 0
							|| req.originalUrl.indexOf('/register') == 0);
	},

	shouldRedirect: function(req) {
		//override this function if needed
		return false;
	}
}