import * as oFs from 'fs/promises';

const sApplicationSourcePath = './src';
const sApplicationDistributionPath = './lib';
const sApplicationTestHarnessSourcePath = './testsrc';
const sApplicationTestHarnessPath = './testing';
const sLibPath = `${sApplicationTestHarnessPath}/lib`;

const oMkDirOptions = {
    recursive: true,
};

// copies all sources to application distribution path
const oSrcToDistCopyOptions = {
    recursive: true,
};

oFs.mkdir(sApplicationDistributionPath, oMkDirOptions)
    .then(() => {
        console.log(`[success] mkdir ${sApplicationDistributionPath}`);

        // copies src to distribution directory
        oFs.cp(
            sApplicationSourcePath,
            sApplicationDistributionPath,
            oSrcToDistCopyOptions,
        )
            .then(() => {
                console.log(`[success] copied dir ${sApplicationSourcePath}`);
            })
            .catch((oError) => {
                console.log(`  [error] details: ${oError}`);
            });
    })
    .catch((oError) => {
        console.log(`  [error] details: ${oError}`);
    });

oFs.mkdir(sApplicationTestHarnessPath, oMkDirOptions)
    .then(() => {
        console.log(`[success] mkdir ${sApplicationTestHarnessPath}`);

        // copies src to test harness directory
        oFs.cp(
            sApplicationTestHarnessSourcePath,
            sApplicationTestHarnessPath,
            oSrcToDistCopyOptions,
        )
            .then(() => {
                console.log(`[success] copied dir ${sApplicationTestHarnessSourcePath}`);
            })
            .catch((oError) => {
                console.log(`  [error] details: ${oError}`);
            });
    })
    .catch((oError) => {
        console.log(`  [error] details: ${oError}`);
    });

oFs.mkdir(sLibPath, oMkDirOptions)
    .then(() => {
        console.log(`[success] mkdir ${sLibPath}`);

        oFs.copyFile(
            './node_modules/learnhypertext/js/index.mjs',
            `${sLibPath}/learnhypertext.mjs`,
        )
            .then(() => {
                console.log(
                    `[success] copied file ${sLibPath}/learnhypertext.mjs`,
                );
            })
            .catch((oError) => {
                console.log(`  [error] details: ${oError}`);
            });
    })
    .catch((oError) => {
        console.log(`  [error] details: ${oError}`);
    });