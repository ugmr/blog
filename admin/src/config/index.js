const isProd = ['prod', 'production'].includes(process.env.NODE_ENV)
export default {
    axiosURL : isProd ? 
        'http://localhost:3000/api' : 
        'http://localhost:3000/api',
    bucketHost: ''
}