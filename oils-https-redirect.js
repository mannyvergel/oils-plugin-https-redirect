module.exports = function (pluginConf, web, done) { 

	web.app.enable('trust proxy');

	web.app.use(function(req, res, next) {


		var shouldRedirect = web.conf.isProd &&
							!req.secure &&
							( (req.subdomains.indexOf('www') != -1 && req.originalUrl == '/')
							|| req.originalUrl.indexOf('/login') == 0
							|| req.originalUrl.indexOf('/register') == 0);

		if (web.conf.isDebug) {
			console.debug("[plugin-https-redirect] secure", req.secure, "isProd", web.conf.isProd, req.subdomains, req.originalUrl);
		}

		if (shouldRedirect) {
			var fullUrl =  'https://' + req.get('host') + req.originalUrl;
			res.redirect(301, fullUrl);
			console.log('[plugin-https-redirect] Redirected to secure site: ' + fullUrl);
			//WARNING will return
			return;
		}


		next();
	});

	done();
}