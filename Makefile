GITVER := $(shell git describe HEAD | tr '-' '+')
APPNAME := shopping-list

all:
	rm -rf dist/opt
	mkdir -p dist/opt/$(APPNAME)
	rsync -a --exclude __pycache__ app dist/opt/$(APPNAME)
	rsync -a --exclude __pycache__ migrations dist/opt/$(APPNAME)
	cp manage.py dist/opt/$(APPNAME)
	cp requirements.txt dist/opt/$(APPNAME)
	cd frontend; npm install; npm run build
	rsync -a frontend/build/* dist/opt/$(APPNAME)/app/static
	mkdir -p dist/etc/uwsgi/apps-available
	cp $(APPNAME).ini dist/etc/uwsgi/apps-available
	cp dist/DEBIAN/control.templ dist/DEBIAN/control
	mkdir -p dist/var/log/$(APPNAME)
	sed -i 's/%VERSION%/$(GITVER)-1/' dist/DEBIAN/control
	bin/git2debchangelog.sh > dist/DEBIAN/changelog
	dpkg-deb --root-owner-group --nocheck --build dist $(APPNAME)_$(GITVER)-1_all.deb
	echo "$(APPNAME)_$(GITVER)-1_all.deb custom optional" > dist/DEBIAN/files
	dpkg-genchanges -b -ldist/DEBIAN/changelog -cdist/DEBIAN/control -fdist/DEBIAN/files -u. -O$(APPNAME)_$(GITVER)-1_all.changes
