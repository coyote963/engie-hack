<template>
  <div id="myApplication">
    <h1></h1>
    <p>{{this.electricityData}}</p>
  </div>
</template>

<script>
const {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

export default {
  data : function () {
    return {
      electricityData : []
    }
  },

  methods: {
    getData: function (query, rowlimit) {
      const client = Stitch.initializeDefaultAppClient('hackio-vgzck');
      const db = client.getServiceClient(RemoteMongoClient.factory, 'MongoDB-Stitch').db('EngieHack');
      client.auth.loginWithCredential(new AnonymousCredential()).then(() =>
        db.collection('buildingdata').find({}, { limit: rowlimit}).asArray()
      ).then((docs) => {
        this.electricityData = docs
      }).catch((err) => {
        this.electricityData = err
      })
    }
  },
  mounted: function () {
    this.getData({}, 100)
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>