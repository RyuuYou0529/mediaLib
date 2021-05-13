<template>
  <div>
    <a-button @click='refresh' style="margin-bottom: 10px">刷新</a-button>
    <a-row v-for="(items, index) in collection" :key="index" :gutter="[16,8]">
      <a-col v-for="(item, index) in  items" :key="index" :span="6">
        <!-- <div>
          <img :src="item">
          <a-icon type="delete" @click="deleteOne(item)" />
        </div> -->
        <a-card hoverable>
          <img slot="cover" :src="item" />
          {{item}}
          <a-card-meta :title="item" />
          <a-icon type="delete" @click="deleteOne(item)" style="font-size: 20px; color: red; margin: 5px" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const host = 'localhost:3000'
export default {
  name: 'library',
  data  () {
    return {
      collection: []
    }
  },
  methods: {
    refresh () {
      const that = this
      this.axios.get(`http://${host}/api/picture/getAll`)
        .then(function (response) {
          console.log(response.data.collection)
          that.collection.length = 0
          const tempArr = response.data.collection
          for (var i = 0; i < tempArr.length; i += 4) {
            that.collection.push(tempArr.slice(i, i + 4))
          }
          console.log(that.collection)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteOne (item) {
      const that = this
      item = item.split('/')
      console.log(item[item.length - 1])
      // path=${item[item.length - 1]}
      this.axios.delete(`http://${host}/api/picture/deleteOne`, {
        data: {
          name: item[item.length - 1]
        }
      }).then(function (response) {
        console.log(response)
        that.refresh()
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style>
</style>
