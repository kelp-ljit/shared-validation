concurrently --kill-others \
 "node_modules/nodemon/bin/nodemon.js src/backend/web.js --watch config --watch src/shared --watch src/backend" \
 "node_modules/webpack/bin/webpack.js serve"
