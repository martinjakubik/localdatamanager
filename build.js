import * as oFs from 'fs/promises';

const sPackageSourcePath = './src';
const sPackageDistributionPath = './lib';
const sPackageTestHarnessSourcePath = './testsrc';
const sPackageTestHarnessPath = './testing';
const sLibPath = `${sPackageTestHarnessPath}/lib`;

const oMkDirOptions = {
    recursive: true,
};

// copies all sources to application distribution path
const oSrcToDistCopyOptions = {
    recursive: true,
};

oFs.mkdir(sPackageDistributionPath, oMkDirOptions)
    .then(() => {
        console.log(`[success] mkdir ${sPackageDistributionPath}`);

        // copies src to distribution directory
        oFs.cp(
            sPackageSourcePath,
            sPackageDistributionPath,
            oSrcToDistCopyOptions,
        )
            .then(() => {
                console.log(`[success] copied dir ${sPackageSourcePath}`);
            })
            .catch((oError) => {
                console.log(`  [error] details: ${oError}`);
            });
    })
    .catch((oError) => {
        console.log(`  [error] details: ${oError}`);
    });

oFs.mkdir(sPackageTestHarnessPath, oMkDirOptions)
    .then(() => {
        console.log(`[success] mkdir ${sPackageTestHarnessPath}`);

        // copies src to test harness directory
        oFs.cp(
            sPackageTestHarnessSourcePath,
            sPackageTestHarnessPath,
            oSrcToDistCopyOptions,
        )
            .then(() => {
                console.log(`[success] copied dir ${sPackageTestHarnessSourcePath}`);
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