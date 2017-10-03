SHELL := /bin/bash
BUNDLE := bundle
NPM := npm
VENDOR_DIR = assets/js/vendor/
JEKYLL := $(BUNDLE) exec jekyll

PROJECT_DEPS := Gemfile package.json

.PHONY: all clean install update

all : serve

check:
	$(JEKYLL) doctor
	$(HTMLPROOF) --check-html \
		--http-status-ignore 999 \
		--internal-domains localhost:4000 \
		--assume-extension \
		_site

install: $(PROJECT_DEPS)
	$(BUNDLE) install --path vendor/bundler
	$(NPM) install

update: $(PROJECT_DEPS)
	$(BUNDLE) update
	$(NPM) update

include-npm-deps:
	mkdir -p $(VENDOR_DIR)
	cp node_modules/jquery/dist/jquery.min.js $(VENDOR_DIR)
	cp node_modules/tether/dist/js/tether.min.js $(VENDOR_DIR)
	cp node_modules/bootstrap/dist/js/bootstrap.min.js $(VENDOR_DIR)

build: install include-npm-deps
	npm run build:js
	$(JEKYLL) build

serve: install include-npm-deps
	npm run build:js
	JEKYLL_ENV=production $(JEKYLL) serve