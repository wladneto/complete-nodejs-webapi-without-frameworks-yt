import {parse} from 'node:url'
import { DEFAULT_HEADER } from './util/util.js'

const allRoutes = {
    '/heroes:get': async (request, response) => {
       // throw new Error('testsssss')
        response.write('GET')
        response.end()
    },

    //404 routes
    default: (request, response) => {
        response.writeHead(404, DEFAULT_HEADER)
        response.write(JSON.stringify({
            error: 'Opssss, not found!'
        }))
        response.end()
    }
}

function handler(request, response){
    const {
        url,
        method
    }= request

    const {
        pathname
    } = parse(url, true)
    //console.log({pathname, url, method})
    const key = `${pathname}:${method.toLowerCase()}`
    console.log('key: '+ key)
    const chosen = allRoutes[key] || allRoutes.default

    return Promise.resolve(chosen(request, response))
        .catch(handlerError(response))

    //response.end('Hello World')
}

function handlerError(response) {
    return error  => {
        console.log('Something bad has happened :(', error.stack)
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({
            error: 'Server error!'
        }))
        response.end()
    }
}

export default handler