/**
 * Manages the database connections and interactions with database
 */
let { Pool } = require('pg');
let constants = require('../../util/constants');
let dbScripts = require('../config/db.scripts');

var dbConfig = {
  user: 'cynclosdev',
  password: 'admin',
  database: 'personal',//global.DB_NAME,
  //host: 'localhost', //for unit testing
  host: 'docker.for.mac.localhost', // for SAM LOCAL (macOS)
  port: 5432,
  max: 2, // set pool max size to 20
  idleTimeoutMillis: 3000, // close idle clients after 30 second
  connectionTimeoutMillis: 2000, // return an error after 2 seconds if connection could not be established
};

let pool = new Pool(dbConfig);

exports.executeQuery = async (queryName, values) => {
    let client = await pool.connect();
    try {        
        let query = {
            text: dbScripts[queryName],
            values: values
        }
        let result = await client.query(query);
        let resultData = result.rows.length > 0? result.rows: result.rowCount;
        return resultData
    }catch (error){
        console.log(error);
        if(error.code == "23505") {
            throw new Error(constants.DUPLICATE);
        }else{
            throw new Error(error.detail);
        }
    }finally{
        client && await client.release();
    }
}

exports.executeTransaction = async (queryNamesList, valuesList, queryContext) => {
    let client = await pool.connect();
    try {
        await client.query('BEGIN');
        let allResults = [];
        for (var i = 0; i < queryNamesList.length; i++) {
            var queryName = queryNamesList[i];
            let query = {
                text: (queryContext && queryContext === 'riskscore') ? dbScriptsRiskScore[queryName] : dbScripts[queryName],
                values: valuesList[i]
            };
            let result = await client.query(query);
            allResults[i] = result.rows.length > 0? result.rows: result.rowCount;;  
        }
        await client.query('COMMIT');
        return allResults;
    }catch (error){
        await client.query('ROLLBACK');
        console.log(JSON.stringify(error));
        if(error.code == "23505") {
            throw new Error(constants.DUPLICATE);
        }else{
          throw new Error(error.detail);
        }       
    }finally{
        client && await client.release();
    }
}