
SYSTEM=mqtt-archiver
TARGET=collector.js
INSTALL_FILES=""
INSTALL_LIBS="collector-functions.js collector-mqtt.js collector-messages.js collector-snapshots.js"

##

INSTALL_DIR=/opt/bin/$(SYSTEM)
NODE_MODULES_DIR=$(INSTALL_DIR)/node_modules

prettier:
	prettier --write *.js
lint:
	eslint *.js
test:
	node $(TARGET)
.PHONY: prettier lint test

##

SYSTEMD_DIR = /etc/systemd/system
define install_systemd_depend
	-systemctl disable $(1) 2>/dev/null || true
	cp $(2).service $(SYSTEMD_DIR)/$(1).service
	systemctl daemon-reload
	systemctl enable $(1)
endef
define install_systemd_service
	-systemctl stop $(1) 2>/dev/null || true
	-systemctl disable $(1) 2>/dev/null || true
	cp $(2).service $(SYSTEMD_DIR)/$(1).service
	systemctl daemon-reload
	systemctl enable $(1)
	systemctl start $(1) || echo "Warning: Failed to start $(1)"
endef

##

install_storage: storage.service
	$(call install_systemd_depend,$(SYSTEM)-storage,storage)
install_collector: collector.service
	$(call install_systemd_service,$(SYSTEM)-collector,collector)
restart_collector:
	-systemctl restart $(SYSTEM)-collector 2>/dev/null || true

##

install_service: install_storage install_collector
restart_service: restart_collector
install: install_service
restart: restart_service

##

.PHONY: install_service install_storage install_collector \
	restart_service restart_collector \
	install restart 
