// -----------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------

function initialise(_options) {
    const conf = {
        STORAGE: '/opt/storage/weather',
    };
    const config = {
        mqtt: {
            servers: [
                { server: 'mqtt://weather.local:1883', topics: ['weather/#', 'sensors/#', 'snapshots/#', 'server/#', 'system/#' ] },
                { server: 'mqtt://adsb-ostratakenebranna.local:1883', topics: ['adsb/#', 'server/#', 'system/#'] },
                { server: 'mqtt://badtuna.local:1883', topics: ['system/#' ] },
                { server: 'mqtt://localhost:1883', topics: ['devices/#', 'server/#', 'system/#'] },
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
