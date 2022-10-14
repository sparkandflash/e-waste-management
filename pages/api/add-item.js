/*import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

 const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default async function handler(req, res)
{
    let items = JSON.parse(req.body.items); 
console.log(items.length);
    try {
      
        
     let { data, error, status } = await supabase
      .from('tokens')
      .select(`tokenid`)
      .eq('tokenid', items.length)
      .single()
      if (!data) {
        
        items.map(nft, items.length)
        const updates = {
          name: nft.name,
          
  
          uri : nft.image,
          tokenid : nft.id,
      
        }
  
        let { error } = await supabase.from('tokens').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
          
        })
        if (error) {
            throw error
           
          }
          else{
            res.send(
                "success"
              );
          }
       
      }
     


    } catch (error) {
        res.send(error);
console.log(error)
    }
}
*/