import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default async function handler(req, res) {
  const txn = req.body.buyTxn;
  console.log(txn);
  try {



    const updates = {
      event: txn.event,
      price: txn.price,
      from: txn.from,
      to: txn.to,
      date: txn.date,
      hash: txn.hash,
      tokenid: txn.token,
      
    }

    let { error } = await supabase.from('txns').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })
    res.send("success");
    if (error) {
      throw error
    }

  } catch (error) {
    res.send(error);
    console.log(error);
  }
}