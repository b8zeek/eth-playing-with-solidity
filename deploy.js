// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    'mail bean dress suffer first deer wild sand ring blanket fame trick',
    'https://rinkeby.infura.io/v3/8ea4d43991a84ffc87d62594ceea37ab'
)
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ['Hi there!']
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        })

    console.log('Contract deployed to: ', result.options.address)
    provider.engine.stop()
}

deploy()
