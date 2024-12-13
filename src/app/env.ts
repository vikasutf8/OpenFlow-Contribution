const env ={
    appwrite :{
        endpoint :String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URI),
        projectId :String(process.env.NEXT_PUBLIC_APPWRITE_POREJECT_ID),
        apikey :String(process.env.NEXT_PUBLIC_APPWRITE_PRIVATE_KEY)
    },  
}
 
export default env;