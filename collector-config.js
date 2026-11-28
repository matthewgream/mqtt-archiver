// -----------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------

function initialise(_options) {
    const conf = {
        STORAGE: '/opt/storage/weather',
    };
    const config = {
        mqtt: {
            servers: [
                // snapshots/# (the wide camera's stills) comes from vader over workshop's bridge, so it crosses the network once; and every
                // host's system/# comes over workshop's bridges (mosquitto's hostmon-bridge.conf), so it's taken from localhost only: read
                // from vader, adsb and badtuna directly as well, each of their messages was archived twice (from August 2026 to 2026-11-28)
                { server: 'mqtt://vader.local:1883', topics: ['weather/#', 'sensors/#', 'server/#'] },
                { server: 'mqtt://adsb.local:1883', topics: ['adsb/#', 'server/#'] },
                // sensors/#: the house's electricity meter (sensors/p1meter: p1metertomqtt, /opt/p1metertomqtt) and ventilation unit
                // (sensors/evoair: evoaira100sg3tomqtt, /opt/evoaira100sg3tomqtt)
                // thermia/#: the Thermia's values (thermia/values: thermia-log, /opt/thermia)
                // droplet-185C/: the water flow meter's state (volume, flow) and leak, on change - not its health, 'online' every second
                // plejd/#: the lighting - each device's state (retained), events, requests, the site (plejdtomqtt, /opt/plejdtomqtt)
                // zigbee2mqtt/+: the Zigbee devices' own topics (Förråd: temperature/humidity, smoke and heat detectors) - not bridge/... or .../availability
                // yale/#: the front door lock - its state (retained), events, requests (yaletomqtt, /opt/yaletomqtt)
                // lgthinq/#: the fridge and freezer - their state (retained), changes, alerts, requests (lgthinqtomqtt, /opt/lgthinqtomqtt)
                // smarthq/#: the dish drawers - their state (retained), changes, requests (smarthqtomqtt, /opt/smarthqtomqtt)
                {
                    server: 'mqtt://localhost:1883',
                    topics: ['devices/#', 'snapshots/#', 'server/#', 'system/#', 'sensors/#', 'thermia/#', 'droplet-185C/state', 'droplet-185C/leak', 'plejd/#', 'zigbee2mqtt/+', 'yale/#', 'lgthinq/#', 'smarthq/#'],
                },
                // the heating: the Caleon's decoded CAN (caleon/#: caleon2mqtt) and thermia-caleon's state (thermia/caleon/state); its
                // system/# comes over workshop's bridge
                { server: 'mqtt://caleon-canbus.local:1883', topics: ['caleon/#', 'thermia/#'] },
            ],
            clientId: 'archiver-collector-' + Math.random().toString(16).slice(2, 8),
        },
        storage: {
            messages: conf.STORAGE + '/messages',
            snapshots: conf.STORAGE + '/snapshots',
            timelapse: conf.STORAGE + '/timelapse',
        },
        topics: {
            messages: ['weather/', 'sensors/', 'server/', 'adsb/', 'devices/', 'system/', 'caleon/', 'thermia/', 'droplet-185C/', 'plejd/', 'zigbee2mqtt/', 'yale/', 'lgthinq/', 'smarthq/'],
            snapshots: ['snapshots/'],
        },
    };
    const configList = Object.entries(conf)
        .map(([k, v]) => k.toLowerCase() + '=' + v)
        .join(', ');
    console.log(`config: loaded: ${configList}`);
    return config;
}

// -----------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------

module.exports = function (options) {
    return initialise(options);
};

// -----------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------
