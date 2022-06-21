import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

 const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default async function handler(req, res){
    const user = req.body.user;
    try {
      
     console.log(user);

      const updates = {
        name: user.name,
        address : user.address,
        citizen: user.role,
        pfp : user.fileUrl,
        walletAddress : user.wallet,
      }

      let { error } = await supabase.from('users').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })
     
      if (error) {
        throw error

      }
      else {
        res.send("success");
      }
    
    } catch (error) {
        res.send(error);
console.log(error)
    }
  }