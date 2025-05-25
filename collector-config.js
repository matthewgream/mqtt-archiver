// -----------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------

function initialise(options) {
    const conf = {
	STORAGE: '/opt/storage/weather',
	};
    const config = {
        mqtt: {
            servers: [
                { server: 'mqtt://weather.local:1883', topics: ['weather/#', 'sensors/#', 'snapshots/#', 'server/#'] },
                { server: 'mqtt://adsb-ostratakenebranna.local:1883', topics: ['adsb/#'] },
                { server: 'mqtt://localhost:1883', topics: ['devices/#'] },
            ],
            clientId: 'archiver-collector-' + Math.random().toString(16).slice(2, 8),
        },
        storage: {
            messages: conf.STORAGE + '/messages',
            snapshots: conf.STORAGE + '/snapshots',
            timelapse: conf.STORAGE + '/timelapse',
        },
        topics: {
            messages: ['weather/', 'sensors/', 'server/', 'adsb/', 'devices/'],
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
