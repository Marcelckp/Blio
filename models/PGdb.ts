import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DB_URI,
})

interface poolType {
  query: (text: any, params: any, callback?: any) => any | void | Function
}

export const db: poolType = {
  query: (text, params, callback) => {
      console.log(`executing query: ${text}`)
      return pool.query(text, params, callback)
  },
}
