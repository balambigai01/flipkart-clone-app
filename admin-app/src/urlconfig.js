const baseUrl="https://localhost:2000"//heroku-rest-server


export const api=`${baseUrl}/api`
export const generatePublicUrl=(fileName)=>{
    return `${baseUrl}/public/${fileName}`
}