import * as Sentry from '@sentry/react';

function init() {
    Sentry.init({ dsn: "https://c6ca8d16772c4f31bf2b16893a53b16d@o427575.ingest.sentry.io/5371772" });
}

function log(error) {
    Sentry.captureException(error);
}

export default { init, log };