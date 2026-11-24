// -----------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------

function initialise(_options) {
    const conf = {
        STORAGE: '/opt/storage/weather',
    };
    const config = {
        mqtt: {
            servers: [
                // snapshots/# (the wide camera's stills) comes from vader over workshop's bridge, so it crosses the network once
                { server: 'mqtt://vader.local:1883', topics: ['weather/#', 'sensors/#', 'server/#', 'system/#' ] },
                { server: 'mqtt://adsb.local:1883', topics: ['adsb/#', 'server/#', 'system/#'] },
                { server: 'mqtt://badtuna.local:1883', topics: ['system/#' ] },
                { server: 'mqtt://localhost:1883', topics: ['devices/#', 'snapshots/#', 'server/#', 'system/#'] },
            ],
            clientId: 'archiver-collector-' + Math.random().toString(16).slice(2, 8),
        },
        storage: {
            messages: conf.STORAGE + '/messages',
            snapshots: conf.STORAGE + '/snapshots',
            timelapse: conf.STORAGE + '/timelapse',
        },
        topics: {
            messages: ['weather/', 'sensors/', 'server/', 'adsb/', 'devices/', 'system/'],
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
