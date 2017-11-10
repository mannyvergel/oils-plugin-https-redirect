module.exports = function (pluginConf, web, done) {

	web.app.enable('trust proxy');

	pluginConf = Object.assign(require('./conf.js'), pluginConf);

	if (pluginConf.isDebug) {
		console.debug("[plugin-https-redirect] settings:", pluginConf);
	}

	web.app.use(function(req, res, next) {

		var shouldRedirect = web.conf.isProd &&
							!req.secure &&
							(pluginConf.shouldRedirectOriginal() ||
							pluginConf.shouldRedirect());

		if (pluginConf.isDebug) {
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