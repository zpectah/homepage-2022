import { src, dest, series, parallel, watch } from 'gulp';
import del from 'del';
import webpack_stream from 'webpack-stream';
import gulpReplace from 'gulp-replace';
import gulpRename from 'gulp-rename';

const _path = require('path');

const getNodeEnvironment = (env) => {
    if (env === 'test') return 'production';

    return env;
};

const source = {
    environment: './.envfile',
    core: [
        './src/**/.htaccess',
        './src/**/*.php',
        './src/**/*.xml',
        './src/**/*.txt',
    ],
    public: './src/public/**/*',
    reactApp_index: './src/app/index.js',
    reactApp: [
        './src/app/**/*.js',
        './src/app/**/*.jsx',
        './src/app/**/*.ts',
        './src/app/**/*.tsx',
    ],
};

const tasks = {
    clean: function (path, env, cb) {
        return del.sync(
            [
                `${path}**/*`,
                `!${path}logs/**`,
            ],
            cb(),
        );
    },
    environment: function (path, env, cb) {
        const date = new Date().getTime();
        src(source.environment)
            .pipe(gulpReplace('%%%%%ENV_ENV%%%%%', env))
            .pipe(gulpReplace('%%%%%ENV_TIMESTAMP%%%%%', date))
            .pipe(gulpRename('env.php'))
            .pipe(dest(`${path}core/`));
        cb();
    },
    core: function (path, env, cb) {
        src(source.core).pipe(dest(path));
        cb();
    },
    public: function (path, env, cb) {
        src(source.public).pipe(dest(`${path}assets/`));
        cb();
    },
    reactApp: function (path, env, cb) {
        webpack_stream({
            mode: getNodeEnvironment(env),
            optimization: {
                minimize: env !== 'development',
            },
            entry: {
                index: source.reactApp_index,
            },
            output: {
                path: '',
                filename: env === 'development' ? '[name].bundle.js' : '[name].bundle.min.js',
            },
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            module: {
                rules: [
                    {
                        test: /\.css$/i,
                        use: ['style-loader', 'css-loader'],
                    },
                    {
                        test: /\.(png|jp(e*)g|svg|gif)$/,
                        use: [
                            {
                                loader: 'file-loader',
                            },
                        ],
                    },
                    {
                        test: /\.(js|jsx|ts|tsx)$/,
                        include: _path.resolve(__dirname, 'src'),
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        '@babel/preset-env',
                                        '@babel/preset-react',
                                        '@babel/preset-typescript',
                                    ],
                                },
                            },
                        ],
                    },
                ],
            },
            performance: {
                hints: false,
            },
        }).pipe(dest(`${path}www/`));
        cb();
    },
};

const taskRun = {
    clean: {
        dev: (cb) => tasks.clean('./dev/', 'development', cb),
        test: (cb) => tasks.clean('./test/', 'test', cb),
        prod: (cb) => tasks.clean('./prod/', 'production', cb),
    },
    environment: {
        dev: (cb) => tasks.environment('./dev/', 'development', cb),
        test: (cb) => tasks.environment('./test/', 'test', cb),
        prod: (cb) => tasks.environment('./prod/', 'production', cb),
    },
    core: {
        dev: (cb) => tasks.core('./dev/', 'development', cb),
        test: (cb) => tasks.core('./test/', 'test', cb),
        prod: (cb) => tasks.core('./prod/', 'production', cb),
    },
    public: {
        dev: (cb) => tasks.public('./dev/', 'development', cb),
        test: (cb) => tasks.public('./test/', 'test', cb),
        prod: (cb) => tasks.public('./prod/', 'production', cb),
    },
    reactApp: {
        dev: (cb) => tasks.reactApp('./dev/', 'development', cb),
        test: (cb) => tasks.reactApp('./test/', 'test', cb),
        prod: (cb) => tasks.reactApp('./prod/', 'production', cb),
    },
};

export const dev_watch = (cb) => {
    watch([ ...source.core, './src/**/*.json' ], {}, taskRun.core.dev);
    watch(source.public, {}, taskRun.public.dev);
    watch(source.reactApp, {}, taskRun.reactApp.dev);
    cb();
};
export const dev = series(
    taskRun.clean.dev,
    parallel(
        taskRun.environment.dev,
        taskRun.core.dev,
        taskRun.public.dev,
        taskRun.reactApp.dev,
    ),
);
export const test = series(
    taskRun.clean.test,
    parallel(
        taskRun.environment.test,
        taskRun.core.test,
        taskRun.public.test,
        taskRun.reactApp.test,
    ),
);
export const prod = series(
    taskRun.clean.prod,
    parallel(
        taskRun.environment.prod,
        taskRun.core.prod,
        taskRun.public.prod,
        taskRun.reactApp.prod,
    ),
);

export const start = series(dev, dev_watch);

export default dev;