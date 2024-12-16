import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

import { AppwriteException,ID,Models } from 'appwrite'

//client side config
import { account } from '@/models/client/config'

export interface userPerf{
    reputation :number
}

interface authStore{
    session :Models.Session |null,
    jwt :string |null,
    user :Models.User<userPerf> |null,
    hydrated :boolean,


    setHydrated() :void ,//checking comming back
    verifySession() :Promise<void>,
    login(
        email :string ,
        password :string 
    ):Promise<{
        success :boolean,
        error ?: AppwriteException |null
    }>
    createAccound(
        name:string,
        email :string ,
        password :string 
    ):Promise<{
        success :boolean,
        error ?: AppwriteException |null
    }>
    logout() :Promise<void>
}
//method then chain on it
//create method where provide interface ,just persist everything meant all stuff in locat storage that why wrapping all stuff in persist(),
export const useAuthStore =create<authStore>()(
    persist(
        //defineing function --ALERT sytnex
        immer((set)=>({
            session:null,
            jwt :null,
            user:null,
            hydrated :false,

            setHydrated({
                set({hydrated :true})
            }),

            async verifySession(){
                try {
                    const session =await account.getSession("current")
                    set({session})

                } catch (error) {
                    console.log(error,"storage in verify session")
                }
            }
            async login(email, password){
                try {
                    const session =await account.createEmailPasswordSession(email,password)
                    const [user,{jwt}] =await Promise.all([
                        account.get<userPerf>(),
                        account.createJWT()
                    ])
                    if(!user.prefs?.reputation)await account.updatePrefs<userPerf>({reputation :0})
                    set({session,user,jwt})
                } catch (error) {
                    console.log(error,"storage in login")
                    return {
                        success :false,
                        error:error instanceof AppwriteException ? error :null
                    }
                }
            }
            async createAccount(name,email,password){
                try {
                    await account.create(ID.unique(),name,email, password)
                    return {
                        success :true
                    }
                } catch (error) {
                    console.log(error,"storage in create account")
                    return {
                        success :false,
                        error:error instanceof AppwriteException ? error :null
                    }
                }
            }
            async logout(){
                try {
                    await account.deleteSessions()
                    set({session :null,jwt :null,user:null})
                } catch (error) {
                    console.log(error,"storage in logout")
                    return {
                        success :false,
                        error:error instanceof AppwriteException ? error :null
                    }
                }
            }
        })),
        {
            name :'auth',
            onRehydrateStorage(){
                return (state,error)=>{
                    if(!error) state?.setHydrated()
                }
            }
        }
    )
)

