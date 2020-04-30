//import * as express1 from 'express'
//import * as session1 from "express-session";
//import * as AerospikeStore2 from "aerospike-session-store";

const express = require('express')
const session = require('express-session')
const AerospikeStore = require('aerospike-session-store')(session)

var app = express()
app.use(session({
  secret: '123456789QWERTY',
  /*store: new AerospikeStore2({
    namespace: 'demo',
    set: 'session',
    ttl: 86400, // 1 day
    hosts: "172.26.11.48:3000"
  }),*/
  resave: false,
  saveUninitialized: false
}))

export default app;