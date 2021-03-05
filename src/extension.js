const fs = require('fs');

function activate (content) {
    let config = goby.getConfiguration();

    goby.registerCommand('poc_scan', function (content) {

        let pocsuite3_path = config["pocsuite_location"]["default"];
        if (fs.existsSync(pocsuite3_path)) {
            const lines = fs.readFileSync(pocsuite3_path).toString()
            if (lines.includes("pocsuite3")) {
                console.log("[INFO] Load pocsuite3 success");
            } else {
                goby.showErrorMessage(`[ERROR] pocsuite3 path is error: ${pocsuite3_path}`);
                return false;
            }
        } else {
            goby.showErrorMessage(`[ERROR] pocsuite3 path is error: ${pocsuite3_path}`);
            return false;
        }

        // 获取各个参数
        let IP = content.ip;
        let Port = content.port;
        let targetUrl;
        // 判断协议头
        if (content.protocol == "https") {
            targetUrl = "https://" + content.hostinfo;
        } else {
            targetUrl = "http://" + content.hostinfo;
        }        
        // 指定扫描任务输出文件21
        let taskResult = __dirname + "/result/" + goby.getTaskId() + "_" + IP + "_" + Port + ".txt";
        let requires_install = "";
        // goby.showInformationMessage(taskResult);
        // 判断扫描结果以及是否进行扫描
        if (fs.existsSync(taskResult)) {
            const lines = fs.readFileSync(taskResult).toString()
            if (lines.includes("[*] shutting down at")) {
                if (lines.includes("[+]")) {
                    goby.showSuccessMessage(`[VULN] pocsuite scan completed and find vuln!`);
                } else if (lines.includes("[ERROR] try install with")){
                    requires_install = lines.match(/requires "[\S+]*" to be installed/)[0];
                    if (requires_install !== null){
                        goby.showWarningMessage(`[ERROR] pocsuite ${requires_install}`);
                    } else {
                        goby.showWarningMessage(`[ERROR] Match Error`);
                    }
                } else {
                    goby.showSuccessMessage(`[INFO] pocsuite scan completed and not find vuln ~`);
                }
                goby.showIframeDia(taskResult, "[INFO] pocsuite scan result", "900", "520");
            } else {
                goby.showWarningMessage(`Scanning: ${targetUrl} not to be done, plz wait~`);
                goby.showIframeDia(taskResult, "[INFO] pocsuite scan result", "900", "520");
            }
        } else {
            goby.showInformationMessage(`[INFO] Running pocsuite to scan: ${targetUrl}`);
            // 此时开启vulmap扫描
            runPocsuite3(targetUrl,taskResult);
        }
    });

    function runPocsuite3(targetUrl,taskResult){
        let child_process = require('child_process');
        let command  = config["pocsuite_location"]["default"] + " -u " + targetUrl + " --plugins poc_from_pocs,html_report > " + taskResult;
        // goby.showInformationMessage(command);
        child_process.exec(command, (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error) {
                console.error(`[ERROR COMMAND]: ${error}`);
                goby.showErrorMessage(`[ERROR COMMAND]: ${error}`);
                return;
            } else {
                // console.log(command)
                goby.showInformationMessage(`[TASK CREATE SUCCESS]: WAIT FOR A MOMENT`);
            }
        })
    }

}



exports.activate = activate;
