const path = require('path')
const Configuration = require('../nodejs-sdk/packages/api/common/configuration').Configuration
Configuration.setConfig(path.join(__dirname, '/conf/config.json'));
const { Web3jService, ConsensusService, SystemConfigService } = require('../nodejs-sdk/packages/api/web3j')
const web3jService = new Web3jService();
const express = require('express')
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs');
const utils = require('../nodejs-sdk/packages/api/common/utils');
const {getAbi } = require('../nodejs-sdk/packages/cli/interfaces/base');
var urlencodedParser = bodyParser.urlencoded({ extended: true })

const ContractName = "Chain";
const ContractAddress = "0x11c1e8248f54398b6f8fbc9d28468dba222b75dd";
const abi = getAbi(ContractName);

app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get('/B_register', function(req, res){
    res.sendFile(path.join(__dirname, "/views/B_register.html"));
});

app.get('/C_register', function(req, res){
    res.sendFile(path.join(__dirname, "/views/C_register.html"));
});

app.get('/ChangeReceipt', function(req, res){
    res.sendFile(path.join(__dirname, "/views/ChangeReceipt.html"));
});

app.get('/details', function(req, res){
    res.sendFile(path.join(__dirname, "/views/details.html"));
});

app.get('/EndReceipt', function(req, res){
    res.sendFile(path.join(__dirname, "/views/EndReceipt.html"));
});

app.get('/Get_amount', function(req, res){
    res.sendFile(path.join(__dirname, "/views/Get_amount.html"));
});

app.get('/Get_credit', function(req, res){
    res.sendFile(path.join(__dirname, "/views/Get_credit.html"));
});

app.get('/Get_debt', function(req, res){
    res.sendFile(path.join(__dirname, "/views/Get_debt.html"));
});

app.get('/MkReceipt', function(req, res){
    res.sendFile(path.join(__dirname, "/views/MkReceipt.html"));
});

app.get('/LoanReceipt', function(req, res){
    res.sendFile(path.join(__dirname, "/views/LoanReceipt.html"));
});

app.post('/C_register', urlencodedParser, function (req, res) {
    argv = {
        functionName : "C_register",
        parameters : [req.body._company, req.body.amount]
    };
    call(argv).then(result => {
        res.status(200);
        res.render(path.join(__dirname, "/views/msg.ejs"), {
        output0: result.output[0],
        output1: "none",
        status: result.status,
        transactionHash: result.transactionHash});
    });
})

app.post('/B_register', urlencodedParser, function (req, res) {
    argv = {
        functionName : "B_register",
        parameters : [req.body._bank, req.body.creditline]
    };
    call(argv).then(result => {
        res.status(200);
        res.render(path.join(__dirname, "/views/msg.ejs"), {
        output0: result.output[0],
        output1: "none",
        status: result.status,
        transactionHash: result.transactionHash});
    });
})

app.post('/MkReceipt', urlencodedParser, function (req, res) {
    argv = {
        functionName : "MkReceipt",
        parameters : [req.body._from, req.body._to, req.body._value, req.body._credit, req.body._timelimit]
    };
    call(argv).then(result => {
        res.status(200);
        res.render(path.join(__dirname, "/views/msg.ejs"), {
        output0: result.output[0],
        output1: "none",
        status: result.status,
        transactionHash: result.transactionHash});
    });
})


app.post('/LoanReceipt', urlencodedParser, function (req, res) {
    argv = {
        functionName : "LoanReceipt",
        parameters : [req.body._company, req.body._bk, req.body._value, req.body._credit, req.body._timelimit]
    };
    call(argv).then(result => {
        res.status(200);
        res.render(path.join(__dirname, "/views/msg.ejs"), {
        output0: result.output[0],
        output1: "none",
        status: result.status,
        transactionHash: result.transactionHash});
    });
})


app.post('/EndReceipt', urlencodedParser, function (req, res) {
    argv = {
        functionName : "EndReceipt",
        parameters : [req.body._company, req.body._creditor, req.body._value]
    };
    call(argv).then(result => {
        res.status(200);
        res.render(path.join(__dirname, "/views/msg.ejs"), {
        output0: result.output[0],
        output1: "none",
        status: result.status,
        transactionHash: result.transactionHash});
    });
})


app.post('/ChangeReceipt', urlencodedParser, function (req, res) {
    argv = {
        functionName : "ChangeReceipt",
        parameters :  [req.body._company, req.body._creditor, req.body._to]
    };
    call(argv).then(result => {
        res.status(200);
        res.render(path.join(__dirname, "/views/msg.ejs"), {
        output0: result.output[0],
        output1: "none",
        status: result.status,
        transactionHash: result.transactionHash});
    });
})

app.post('/Get_amount', urlencodedParser, function (req, res) {
    argv = {
        functionName : "Get_amount",
        parameters :  [req.body._cpy]
    };
    call(argv).then(result => {
        res.status(200);
        res.render(path.join(__dirname, "/views/msg.ejs"), {
        output0: result.output[0],
        output1: result.output[1],
        status: result.status,
        transactionHash: result.transactionHash});
    });
})

app.post('/Get_credit', urlencodedParser, function (req, res) {
    console.log("Get_credit");
    argv = {
        functionName : "Get_credit",
        parameters :  [req.body._cpy]
    };
    call(argv).then(result => {
        res.status(200);
        res.render(path.join(__dirname, "/views/msg.ejs"), {
        output0: result.output[0],
        output1: result.output[1],
        status: result.status,
        transactionHash: result.transactionHash});
    });
})

app.post('/Get_debt', urlencodedParser, function (req, res) {
    console.log("Get_debt");
    argv = {
        functionName : "Get_debt",
        parameters :  [req.body._cpy]
    };
    call(argv).then(result => {
        res.status(200);
        res.render(path.join(__dirname, "/views/msg.ejs"), {
        output0: result.output[0],
        output1: result.output[1],
        status: result.status,
        transactionHash: result.transactionHash});
    });
})


function call(argv){
        contractName = ContractName;
        contractAddress = ContractAddress;
        functionName = argv.functionName;
        parameters = argv.parameters;

        for (let item of abi) {
            if (item.name === functionName && item.type === 'function') {
                if (item.inputs.length !== parameters.length) {
                    throw new Error(`wrong number of parameters for function \`${item.name}\`, expected ${item.inputs.length} but got ${parameters.length}`);
                }

                functionName = utils.spliceFunctionSignature(item);
                if (item.constant) {
                    return web3jService.call(contractAddress, functionName, parameters).then(result => {
                        let status = result.result.status;
                        let ret = {
                            status: status
                        };
                        let output = result.result.output;
                        console.log(parameters)
                        if (output !== '0x') {
                            ret.output = utils.decodeMethod(item, output);
                        }
                        return ret;
                    });
                } else {
                    return web3jService.sendRawTransaction(contractAddress, functionName, parameters).then(result => {
                        let txHash = result.transactionHash;
                        let status = result.status;
                        console.log(result);
                        let ret = {
                            transactionHash: txHash,
                            status: status
                        };
                        let output = result.output;
                        if (output !== '0x') {
                            ret.output = utils.decodeMethod(item, output);
                        }
                        return ret;
                    });
                }
            }
        }

        throw new Error(`no function named as \`${functionName}\` in contract \`${contractName}\``);
    }

app.listen(8080);
