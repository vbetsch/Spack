_STYLE_RESET := '\033[0m'
_STYLE_COLOR_GREEN := '\033[32m'
_STYLE_COLOR_ORANGE := '\033[33m'
_STYLE_OK := "[${_STYLE_COLOR_GREEN} OK ${_STYLE_RESET}]"
_STYLE_WARN := "[${_STYLE_COLOR_ORANGE} WARN ${_STYLE_RESET}]"

node_modules:
	npm install
	@ echo -e "${_STYLE_OK} Dependencies installed"

.env:
	cp .env.example .env
	@ echo -e "${_STYLE_WARN} The environment file has been created. Now you need to modify it with the right values."

init: node_modules .env
	@ echo -e "${_STYLE_OK} The application is ready to start"

run: node_modules .env
	npm run dev

.PHONY: run
