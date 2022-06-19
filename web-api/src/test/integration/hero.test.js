import test from  'node:test'
import assert from 'node:assert'
import {promisify} from 'node:util'

test ('Hero Integration Test Suite', async(t) =>{
    const testPort = 9009
    //bad pratice change the port because it mutates the environment
    process.env.PORT = testPort
    const {server} = await import('../../index.js')

    const testServerAddress = `http://localhost:${testPort}/heroes`

    await t.todo('It should create a new hero', async(t) =>{
        const data = {
                name:"Batman",
                age:"50",
                power:"rich"            
        }
        fetch
    })

    await promisify(server.close.bind(server))()


})