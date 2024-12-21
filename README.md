
## Discription
A new project ,including setting up the project directory, environment variables, and API keys. I demonstrates using Nextjs, TypeScript and Tailwind CSS, and explains configuring the Appwrite SDK for both client and server environments as Backend as a service.

### Technology utilization :
- Next.js(Client|Server side)
- TypeScript
- Tailwind CSS (Magic UI|Aceternity UI|Markdown githut)
- Appwrite SDK (node Sdk)
- Zustand (state Management)

### Modeling/Collection Database 


### Functionality as StackOver-Flow 
- Question post(text/image)
- Solution post(text/image)
- Vote|Comment on question|solution
- Authentication
-- 

## Zustand(State Management Liberay):
- [ ] why i use this middlewaare : as dbsetup or storageConfiguration done there so where we fireup them. as nextjs middleware is good options__ middleware just like puttting any things and when u need, where u need, use them in as routing,controller etc.
- configuring Zustand with immer for easy state updates and persistent storage to retain state across sessions. 
- It also explains how to create a store, define interfaces, and implement methods like login, create account, and logout. 
- The use of middleware in Next.js is highlighted for initializing the database and storage setup.
**In Statement management never change state instead always creating new states so we have list of states:**

1. IMMER -- liberay make stuff easier ,under the hood always its creating new states ,it should presistent state 
2. PERSISTEN STORE DATA --it allow to store presistencly state in our local storage
3. OnRehydrateStore --This option enables you to pass a listener function that will be called when the storage is **hydrated.**
4. **Hydrated -- we stored data in local storage and to comming in that local storage to my state is hydration**
[Adding Link ::https://zustand-demo.pmnd.rs/]
-- 
## Appwrite :
- creating collections : as sdk node server connection a
const result = await databases.**createCollection( '<DATABASE_ID>', **// **databaseId '<COLLECTION_ID>'**, // collectionId '',** // name ["read("any")"],**//permissions (optional) false, // documentSecurity (optional) false // enabled (optional) );

they give two type of Users as **any and usey**

- creating attribute :
- creating indexing : as sdk node server connections

  ## Typical Part : 
  ### Controllers :- votes ,question
--what was major idea of using appwrite backend as Service::all data manuplication done by appwrite, we just sending data/ doc ,filter ,query ,pagenate them etc.

BUT in Operflow project :eeryting has multiple tocuhes collection of db eg: any post a question and we might want to increase user reputation,sometime answer was post we just want to see how much upvote/downvote are present as such increaing reputation on upvote and vic-versa.

#### so best way to handing multiple touches of servers :handling with own custom servers,promises and so appwrite that do as MAGIC.
prefereences  :: key -value 

                       reputation --  0

[answer a question++ , upvote++ ,delete-- ,] couple test

++/-- upvote as < and > button as like as ....working 

### Handing by Custom Apis :
promise request @node-sdk appwrite 



